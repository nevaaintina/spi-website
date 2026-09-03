<?php

namespace App\Http\Controllers;

use App\Models\MediaGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MediaController extends Controller
{
    // 1. Halaman Publik Media Gallery
    public function index(Request $request)
    {
        $category = $request->get('category');

        $query = MediaGallery::query();
        if ($category && $category !== 'All Media') {
            $query->where('category', $category);
        }

        $mediaItems = $query->latest()->get();
        
        // Ambil gambar secara random dari tabel media_galleries (khusus tipe image) untuk Featured Story
        $randomStoryImages = MediaGallery::where('type', 'image')->inRandomOrder()->take(3)->get();

        $statistics = DB::table('media_statistics')->get();
        $hero = DB::table('media_hero')->first();

        return Inertia::render('Media', [
            'mediaItems' => $mediaItems,
            'randomStoryImages' => $randomStoryImages,
            'statistics' => $statistics,
            'hero' => $hero,
            'selectedCategory' => $category ?? 'All Media',
        ]);
    }

    // 2. Admin CMS Media Gallery
    public function adminIndex()
    {
        $mediaItems = MediaGallery::latest()->get();
        $statistics = DB::table('media_statistics')->get();
        $hero = DB::table('media_hero')->first();

        return Inertia::render('Admin/Media', [
            'mediaItems' => $mediaItems,
            'statistics' => $statistics,
            'hero' => $hero,
        ]);
    }

    // 3. Simpan Media Baru (Foto/Video + Kategori)
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'type' => 'required|in:image,video',
            'file' => 'required|file|mimes:jpeg,png,jpg,webp,mp4,mov|max:51200',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/media'), $filename);
            $filePath = 'images/media/' . $filename;
        }

        MediaGallery::create([
            'title' => $request->title,
            'category' => $request->category,
            'type' => $request->type,
            'file_path' => $filePath,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Media berhasil ditambahkan!');
    }

    // 4. Hapus Media
    public function destroy($id)
    {
        $media = MediaGallery::findOrFail($id);
        if ($media->file_path && file_exists(public_path($media->file_path))) {
            @unlink(public_path($media->file_path));
        }
        $media->delete();

        return redirect()->back()->with('success', 'Media berhasil dihapus!');
    }

    // 5. Update Hero Media
    public function updateHero(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        DB::table('media_hero')->updateOrInsert(
            ['id' => 1],
            [
                'title' => $request->title,
                'description' => $request->description,
                'updated_at' => now(),
            ]
        );

        return redirect()->back()->with('success', 'Hero media berhasil diperbarui!');
    }

    // 6. Update Statistik Media (Admin)
    public function updateStatistic(Request $request, $id)
    {
        $request->validate([
            'value' => 'required|string|max:50',
            'label' => 'required|string|max:255',
        ]);

        DB::table('media_statistics')->where('id', $id)->update([
            'value' => $request->value,
            'label' => $request->label,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Statistik media berhasil diperbarui!');
    }
}