<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroContent;
use App\Models\Service;
use App\Models\Statistic;
use App\Models\Testimonial;
use App\Models\Project;
use App\Models\Post;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminHomeController extends Controller
{
    // 1. Menampilkan Semua Data Homepage di Dashboard Admin
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'hero'         => HeroContent::first(),
            'services'     => Service::all(),
            'statistics'   => Statistic::all(),
            'testimonials' => Testimonial::all(),
            'projects'     => Project::latest()->get(),
            'posts'        => Post::latest()->get(),
            'branches'     => Branch::all(),
        ]);
    }

    // 2. Update Hero Banner
    public function updateHero(Request $request, $id)
    {
        $hero = HeroContent::findOrFail($id);
        $hero->update($request->only([
            'badge_text',
            'title_line_1',
            'title_highlight',
            'title_line_2',
            'description',
            'video_url'
        ]));

        return redirect()->back()->with('success', 'Hero banner berhasil diperbarui!');
    }

    // 3. Tambah / Simpan Data Proyek Baru (Project Gallery)
    public function storeProject(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'year' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imagePath = $request->file('image')->store('projects', 'public');

        Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'year' => $request->year,
            'image' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Proyek baru berhasil ditambahkan!');
    }

    // 4. Hapus Proyek
    public function destroyProject($id)
    {
        $project = Project::findOrFail($id);
        
        // Hapus file gambar dari storage publik jika ada
        if ($project->image && Storage::disk('public')->exists($project->image)) {
            Storage::disk('public')->delete($project->image);
        }
        
        $project->delete();

        return redirect()->back()->with('success', 'Proyek berhasil dihapus!');
    }

    // 5. Tambah / Update Statistik
    public function updateStatistic(Request $request, $id)
    {
        $stat = Statistic::findOrFail($id);
        $stat->update($request->only(['value', 'label', 'description']));

        return redirect()->back()->with('success', 'Statistik berhasil diperbarui!');
    }
}