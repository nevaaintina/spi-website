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

        $mediaItems = $query->orderBy('position', 'asc')->latest()->get();
        
        // Ambil 3 gambar secara random dari tabel media_galleries (khusus tipe image) untuk Featured Story
        $randomStoryImages = MediaGallery::where('type', 'image')->inRandomOrder()->take(3)->get();

        // Ambil data Drone Video Highlight dari database
        $droneVideos = DB::table('drone_videos')->latest()->get();

        $statistics = DB::table('media_statistics')->get();
        $hero = DB::table('media_hero')->first();

        return Inertia::render('Media', [
            'mediaItems' => $mediaItems,
            'randomStoryImages' => $randomStoryImages,
            'droneVideos' => $droneVideos,
            'statistics' => $statistics,
            'hero' => $hero,
            'selectedCategory' => $category ?? 'All Media',
        ]);
    }

    // 2. Admin CMS Media Gallery
    public function adminIndex()
    {
        $mediaItems = MediaGallery::orderBy('position', 'asc')->latest()->get();
        $droneVideos = DB::table('drone_videos')->latest()->get();
        $statistics = DB::table('media_statistics')->get();
        $hero = DB::table('media_hero')->first();

        return Inertia::render('Admin/Media', [
            'mediaItems' => $mediaItems,
            'droneVideos' => $droneVideos,
            'statistics' => $statistics,
            'hero' => $hero,
        ]);
    }

    // 3. Simpan Media Baru (Foto/Video + Kategori + Posisi + Display Style + Crop Data)
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string|max:255',
            'type' => 'required|in:image,video',
            'file' => 'required|file|mimes:jpeg,png,jpg,webp,mp4,mov,mkv,webm|max:102400',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'position' => 'nullable|integer',
            'display_style' => 'nullable|string|in:cover,contain',
            'crop_data' => 'nullable|array',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('images/media');
            if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
            $file->move($destinationPath, $filename);
            $filePath = 'images/media/' . $filename;
        }

        MediaGallery::create([
            'title' => $request->title,
            'category' => $request->category,
            'type' => $request->type,
            'file_path' => $filePath,
            'description' => $request->description,
            'position' => $request->position ?? 0,
            'display_style' => $request->display_style ?? 'cover',
            'crop_data' => $request->crop_data,
        ]);

        return redirect()->back()->with('success', 'Media berhasil ditambahkan!');
    }

    // 4. Update Posisi / Urutan Letak Media (Admin)
    public function updatePosition(Request $request, $id)
    {
        $request->validate([
            'position' => 'required|integer',
        ]);

        $media = MediaGallery::findOrFail($id);
        $media->position = $request->position;
        $media->save();

        return redirect()->back()->with('success', 'Urutan posisi berhasil diperbarui!');
    }

    // 5. Update Bentuk Tampilan Foto / Display Style (Admin)
    public function updateStyle(Request $request, $id)
    {
        $request->validate([
            'display_style' => 'required|in:cover,contain',
        ]);

        $media = MediaGallery::findOrFail($id);
        $media->display_style = $request->display_style;
        $media->save();

        return redirect()->back()->with('success', 'Bentuk tampilan foto berhasil diubah!');
    }

    // 6. Update Titik Fokus Posisi Foto / Crop Data Interaktif (Admin)
    public function updateCrop(Request $request, $id)
    {
        $request->validate([
            'crop_data' => 'nullable|array',
        ]);

        $media = MediaGallery::findOrFail($id);
        $media->crop_data = $request->crop_data;
        $media->save();

        return redirect()->back()->with('success', 'Area pas foto berhasil disimpan!');
    }

    // 7. Hapus Media
    public function destroy($id)
    {
        $media = MediaGallery::findOrFail($id);
        if ($media->file_path && file_exists(public_path($media->file_path))) {
            @unlink(public_path($media->file_path));
        }
        $media->delete();

        return redirect()->back()->with('success', 'Media berhasil dihapus!');
    }

    // 8. Update Hero Media (Mendukung Teks, Deskripsi, dan Gambar Latar Belakang)
    public function updateHero(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'required|string',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
        ]);

        $hero = DB::table('media_hero')->first();
        $bgPath = $hero ? $hero->background_image : null;

        if ($request->hasFile('background_image')) {
            if ($bgPath && file_exists(public_path($bgPath))) {
                @unlink(public_path($bgPath));
            }
            $file = $request->file('background_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('images/media');
            if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
            $file->move($destinationPath, $filename);
            $bgPath = 'images/media/' . $filename;
        }

        DB::table('media_hero')->updateOrInsert(
            ['id' => 1],
            [
                'title' => $request->title,
                'subtitle' => $request->subtitle ?? 'MEDIA GALLERY',
                'description' => $request->description,
                'background_image' => $bgPath,
                'updated_at' => now(),
                'created_at' => $hero ? $hero->created_at : now(),
            ]
        );

        return redirect()->back()->with('success', 'Hero media berhasil diperbarui!');
    }

    // 9. Update Statistik Media (Admin)
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

    // 10. Simpan Drone Video Highlight (Admin)
    public function storeDroneVideo(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'duration' => 'nullable|string|max:50',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'video_url' => 'nullable|string',
        ]);

        $thumbPath = null;
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('images/drone');
            if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
            $file->move($destinationPath, $filename);
            $thumbPath = 'images/drone/' . $filename;
        }

        DB::table('drone_videos')->insert([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'duration' => $request->duration,
            'thumbnail_path' => $thumbPath,
            'video_url' => $request->video_url,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Drone video berhasil ditambahkan!');
    }

    // 11. Hapus Drone Video Highlight (Admin)
    public function destroyDroneVideo($id)
    {
        $video = DB::table('drone_videos')->where('id', $id)->first();
        if ($video && $video->thumbnail_path && file_exists(public_path($video->thumbnail_path))) {
            @unlink(public_path($video->thumbnail_path));
        }
        DB::table('drone_videos')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Drone video berhasil dihapus!');
    }
}