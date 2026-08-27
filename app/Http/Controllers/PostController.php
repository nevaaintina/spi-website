<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    // Menampilkan daftar semua berita di halaman Knowledge publik
    public function index()
    {
        return Inertia::render('Knowledge', [ // Sesuaikan nama file React Knowledge kamu
            'posts' => Post::latest()->get(),
        ]);
    }

    // Menampilkan halaman baca detail berita berdasarkan slug
    public function show($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();

        return Inertia::render('KnowledgeDetail', [
            'post' => $post,
        ]);
    }
}