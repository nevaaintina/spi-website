<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KnowledgeController extends Controller
{
    // Menampilkan Halaman Index Knowledge Center (Publik)
    public function index(Request $request)
    {
        $category = $request->get('category');

        // Ambil data pengaturan hero banner
        $hero = DB::table('knowledge_hero')->first();

        // Ambil artikel utama (Featured Article)
        $featuredArticle = DB::table('knowledge_articles')
            ->where('is_featured', true)
            ->first() ?? DB::table('knowledge_articles')->latest()->first();

        // Ambil daftar artikel untuk Grid
        $query = DB::table('knowledge_articles');
        
        if ($category) {
            $query->where('category', 'LIKE', '%' . $category . '%');
        }

        $articles = $query->latest()->get();

        // Ambil daftar kategori unik untuk navigasi kategori
        $categories = DB::table('knowledge_articles')
            ->select('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Knowledge/Index', [
            'hero' => $hero,
            'featuredArticle' => $featuredArticle,
            'articles' => $articles,
            'categories' => $categories,
            'selectedCategory' => $category,
        ]);
    }

    // Menampilkan Halaman Detail Artikel (Show) saat foto/judul dipencet
    public function show($slug)
    {
        $article = DB::table('knowledge_articles')->where('slug', $slug)->first();

        if (!$article) {
            abort(404, 'Artikel tidak ditemukan.');
        }

        // Ambil artikel lainnya untuk rekomendasi bacaan di bawah (3 artikel terbaru)
        $relatedArticles = DB::table('knowledge_articles')
            ->where('id', '!=', $article->id)
            ->latest()
            ->limit(3)
            ->get();

        return Inertia::render('Knowledge/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    // ==========================================
    // ADMIN CMS METHODS
    // ==========================================

    // Menampilkan daftar artikel & data hero di Panel Admin
    public function adminIndex()
    {
        $articles = DB::table('knowledge_articles')->latest()->get();
        $hero = DB::table('knowledge_hero')->first();

        return Inertia::render('Admin/Knowledge/Index', [
            'articles' => $articles,
            'hero' => $hero,
        ]);
    }

    // Mengupdate pengaturan Hero Banner dari Admin
    public function updateHero(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'stat_number' => 'nullable|string|max:100',
            'stat_label' => 'nullable|string|max:255',
            'stat_box_title' => 'nullable|string|max:100',
            'stat_box_subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $hero = DB::table('knowledge_hero')->first();
        $imagePath = $hero ? $hero->image : null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('knowledge_hero', 'public');
        }

        DB::table('knowledge_hero')->updateOrInsert(
            ['id' => 1],
            [
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'description' => $request->description,
                'stat_number' => $request->stat_number ?? '500+',
                'stat_label' => $request->stat_label ?? 'Technical Articles',
                'stat_box_title' => $request->stat_box_title ?? 'Expert',
                'stat_box_subtitle' => $request->stat_box_subtitle ?? 'Verified Content',
                'image' => $imagePath,
                'updated_at' => now(),
            ]
        );

        return redirect()->back()->with('success', 'Hero Banner berhasil diperbarui.');
    }

    // Menyimpan artikel baru dari Admin
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('knowledge_images', 'public');
        }

        DB::table('knowledge_articles')->insert([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(),
            'category' => $request->category,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'image' => $imagePath,
            'read_time' => $request->read_time ?? '5 Menit',
            'published_date' => now()->format('Y-m-d'),
            'is_featured' => $request->has('is_featured') ? true : false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Artikel berhasil ditambahkan.');
    }

    // Mengupdate artikel yang sudah ada
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $article = DB::table('knowledge_articles')->where('id', $id)->first();

        if (!$article) {
            abort(404, 'Artikel tidak ditemukan.');
        }

        $imagePath = $article->image;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('knowledge_images', 'public');
        }

        DB::table('knowledge_articles')->where('id', $id)->update([
            'title' => $request->title,
            'category' => $request->category,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'image' => $imagePath,
            'read_time' => $request->read_time ?? $article->read_time,
            'is_featured' => $request->has('is_featured') ? true : false,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Artikel berhasil diperbarui.');
    }

    // Menghapus artikel
    public function destroy($id)
    {
        DB::table('knowledge_articles')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Artikel berhasil dihapus.');
    }
}