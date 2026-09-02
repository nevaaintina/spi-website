<?php

namespace App\Http\Controllers;

use App\Models\CareerJob;
use App\Models\CareerHero;
use App\Models\CareerCulture;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $hero = CareerHero::first() ?? CareerHero::create([
            'badge_text' => 'CAREER AT SPI',
            'title_line1' => 'Build Your',
            'title_line2' => 'Future With Us.',
            'description' => 'Temukan kesempatan untuk berkembang, berkolaborasi, dan membangun karier bersama perusahaan penyedia layanan alat berat terkemuka di Indonesia.',
            'sub_badge' => 'JOIN OUR TEAM',
            'sub_title' => 'Grow. Contribute. Make an Impact.',
        ]);

        $cultureSection = CareerCulture::first();
        $jobSection = DB::table('career_job_sections')->first();
        $devSection = DB::table('career_development_sections')->first();
        $storySection = DB::table('employee_story_sections')->first();
        $internship = DB::table('career_internship_sections')->first();
        $applicationSection = DB::table('career_application_sections')->first();
        $paths = DB::table('career_paths')->orderBy('level')->get();
        $stories = DB::table('employee_stories')->latest()->get();
        $testimonials = DB::table('internship_testimonials')->latest()->get();

        return Inertia::render('Career', [
            'hero' => $hero,
            'jobs' => CareerJob::where('is_active', true)->latest()->get(),
            'cultures' => CareerCulture::all(),
            'cultureSection' => $cultureSection,
            'jobSection' => $jobSection,
            'devSection' => $devSection,
            'storySection' => $storySection,
            'internship' => $internship,
            'applicationSection' => $applicationSection,
            'paths' => $paths,
            'stories' => $stories,
            'testimonials' => $testimonials,
        ]);
    }

    public function adminIndex()
    {
        $hero = CareerHero::first() ?? CareerHero::create([
            'badge_text' => 'CAREER AT SPI',
            'title_line1' => 'Build Your',
            'title_line2' => 'Future With Us.',
            'description' => 'Temukan kesempatan untuk berkembang, berkolaborasi, dan membangun karier bersama perusahaan penyedia layanan alat berat terkemuka di Indonesia.',
            'sub_badge' => 'JOIN OUR TEAM',
            'sub_title' => 'Grow. Contribute. Make an Impact.',
        ]);

        $cultureSection = CareerCulture::first();
        $jobSection = DB::table('career_job_sections')->first();
        $devSection = DB::table('career_development_sections')->first();
        $storySection = DB::table('employee_story_sections')->first();
        $internship = DB::table('career_internship_sections')->first();
        $applicationSection = DB::table('career_application_sections')->first();
        $paths = DB::table('career_paths')->orderBy('level')->get();
        $stories = DB::table('employee_stories')->latest()->get();
        $testimonials = DB::table('internship_testimonials')->latest()->get();

        return Inertia::render('Admin/Career', [
            'hero' => $hero,
            'jobs' => CareerJob::latest()->get(),
            'cultures' => CareerCulture::all(),
            'cultureSection' => $cultureSection,
            'jobSection' => $jobSection,
            'devSection' => $devSection,
            'storySection' => $storySection,
            'internship' => $internship,
            'applicationSection' => $applicationSection,
            'paths' => $paths,
            'stories' => $stories,
            'testimonials' => $testimonials,
        ]);
    }

    public function updateHero(Request $request, $id)
    {
        $request->validate([
            'badge_text' => 'required|string|max:255',
            'title_line1' => 'required|string|max:255',
            'title_line2' => 'required|string|max:255',
            'description' => 'required|string',
            'sub_badge' => 'nullable|string|max:255',
            'sub_title' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $hero = CareerHero::findOrFail($id);
        
        $data = $request->only([
            'badge_text', 
            'title_line1', 
            'title_line2', 
            'description', 
            'sub_badge', 
            'sub_title'
        ]);

        if ($request->hasFile('image')) {
            if ($hero->image) {
                $oldPath = str_replace('/storage/', '', $hero->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('image')->store('career', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $hero->update($data);

        return redirect()->back()->with('success', 'Hero banner career beserta gambar berhasil diperbarui!');
    }

    public function updateCultureSection(Request $request)
    {
        $request->validate([
            'badge' => 'nullable|string|max:255',
            'title_part1' => 'nullable|string|max:255',
            'title_part2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stat_text' => 'nullable|string|max:255',
            'stat_1_num' => 'nullable|string|max:50',
            'stat_1_label' => 'nullable|string|max:100',
            'stat_2_num' => 'nullable|string|max:50',
            'stat_2_label' => 'nullable|string|max:100',
            'stat_3_num' => 'nullable|string|max:50',
            'stat_3_label' => 'nullable|string|max:100',
        ]);

        $section = CareerCulture::first();
        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('career/culture_section', 'public');
            $data['image'] = '/storage/' . $path;

            if ($section && $section->image) {
                $oldPath = str_replace('/storage/', '', $section->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
        }

        if ($section) {
            $section->update($data);
        } else {
            CareerCulture::create($data);
        }

        return redirect()->back()->with('success', 'Semua konten Our Culture berhasil diperbarui!');
    }

    public function updateJobSection(Request $request)
    {
        $request->validate([
            'badge' => 'nullable|string|max:255',
            'title_part1' => 'nullable|string|max:255',
            'title_part2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'banner_title' => 'nullable|string|max:255',
            'banner_desc' => 'nullable|string',
        ]);

        $section = DB::table('career_job_sections')->first();
        
        $data = [
            'badge' => $request->badge,
            'title_part1' => $request->title_part1,
            'title_part2' => $request->title_part2,
            'description' => $request->description,
            'banner_title' => $request->banner_title,
            'banner_desc' => $request->banner_desc,
            'updated_at' => now(),
        ];

        if ($section) {
            DB::table('career_job_sections')->where('id', $section->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('career_job_sections')->insert($data);
        }

        return redirect()->back()->with('success', 'Pengaturan teks dan banner Job Vacancy berhasil diperbarui!');
    }

    public function updateDevelopmentSection(Request $request)
    {
        $request->validate([
            'badge' => 'nullable|string|max:255',
            'title_part1' => 'nullable|string|max:255',
            'title_part2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $section = DB::table('career_development_sections')->first();
        
        $data = [
            'badge' => $request->badge,
            'title_part1' => $request->title_part1,
            'title_part2' => $request->title_part2,
            'description' => $request->description,
            'updated_at' => now(),
        ];

        if ($section) {
            DB::table('career_development_sections')->where('id', $section->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('career_development_sections')->insert($data);
        }

        return redirect()->back()->with('success', 'Pengaturan teks Career Development berhasil diperbarui!');
    }

    public function updateStorySection(Request $request)
    {
        $request->validate([
            'badge' => 'nullable|string|max:255',
            'title_part1' => 'nullable|string|max:255',
            'title_part2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $section = DB::table('employee_story_sections')->first();
        
        $data = [
            'badge' => $request->badge,
            'title_part1' => $request->title_part1,
            'title_part2' => $request->title_part2,
            'description' => $request->description,
            'updated_at' => now(),
        ];

        if ($section) {
            DB::table('employee_story_sections')->where('id', $section->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('employee_story_sections')->insert($data);
        }

        return redirect()->back()->with('success', 'Pengaturan judul Employee Stories berhasil diperbarui!');
    }

    public function updateInternshipSection(Request $request)
    {
        $request->validate([
            'badge_text' => 'nullable|string|max:255',
            'title_line1' => 'nullable|string|max:255',
            'title_line2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'feature1_title' => 'nullable|string|max:255',
            'feature1_desc' => 'nullable|string|max:255',
            'feature2_title' => 'nullable|string|max:255',
            'feature2_desc' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $section = DB::table('career_internship_sections')->first();
        
        $data = [
            'badge_text' => $request->badge_text,
            'title_line1' => $request->title_line1,
            'title_line2' => $request->title_line2,
            'description' => $request->description,
            'feature1_title' => $request->feature1_title,
            'feature1_desc' => $request->feature1_desc,
            'feature2_title' => $request->feature2_title,
            'feature2_desc' => $request->feature2_desc,
            'updated_at' => now(),
        ];

        if ($request->hasFile('image')) {
            if ($section && $section->image) {
                $oldPath = str_replace('/storage/', '', $section->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $path = $request->file('image')->store('career/internship', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($section) {
            DB::table('career_internship_sections')->where('id', $section->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('career_internship_sections')->insert($data);
        }

        return redirect()->back()->with('success', 'Pengaturan Internship Program berhasil diperbarui!');
    }

    public function updateApplicationSection(Request $request)
    {
        $request->validate([
            'badge_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'security_title' => 'nullable|string|max:255',
            'security_desc' => 'nullable|string',
            'button_text' => 'nullable|string|max:255',
        ]);

        $section = DB::table('career_application_sections')->first();
        
        $data = [
            'badge_text' => $request->badge_text,
            'title' => $request->title,
            'description' => $request->description,
            'security_title' => $request->security_title,
            'security_desc' => $request->security_desc,
            'button_text' => $request->button_text,
            'updated_at' => now(),
        ];

        if ($section) {
            DB::table('career_application_sections')->where('id', $section->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('career_application_sections')->insert($data);
        }

        return redirect()->back()->with('success', 'Pengaturan Online Application berhasil diperbarui!');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'education' => 'nullable|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(),
            'department' => $request->department,
            'location' => $request->location,
            'type' => $request->type,
            'education' => $request->education,
            'description' => $request->description,
            'requirements' => $request->requirements,
            'is_active' => true,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('career/jobs', 'public');
            $data['image'] = '/storage/' . $path;
        }

        CareerJob::create($data);

        return redirect()->back()->with('success', 'Lowongan pekerjaan berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'education' => 'nullable|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $job = CareerJob::findOrFail($id);
        
        $data = $request->only([
            'title', 
            'department', 
            'location', 
            'type', 
            'education', 
            'description', 
            'requirements', 
            'is_active'
        ]);

        if ($request->hasFile('image')) {
            if ($job->image) {
                $oldPath = str_replace('/storage/', '', $job->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('image')->store('career/jobs', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $job->update($data);

        return redirect()->back()->with('success', 'Lowongan pekerjaan berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $job = CareerJob::findOrFail($id);
        
        if ($job->image) {
            $oldPath = str_replace('/storage/', '', $job->image);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        $job->delete();
        
        return redirect()->back()->with('success', 'Lowongan pekerjaan berhasil dihapus!');
    }

    public function storeCulture(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        CareerCulture::create($request->only(['title', 'description']));

        return redirect()->back()->with('success', 'Poin culture berhasil ditambahkan!');
    }

    public function updateCulture(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $culture = CareerCulture::findOrFail($id);
        $culture->update($request->only(['title', 'description']));

        return redirect()->back()->with('success', 'Poin culture berhasil diperbarui!');
    }

    public function destroyCulture($id)
    {
        CareerCulture::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Poin culture berhasil dihapus!');
    }

    public function storePath(Request $request)
    {
        $request->validate([
            'level' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        DB::table('career_paths')->insert([
            'level' => $request->level,
            'title' => $request->title,
            'description' => $request->description,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Jalur karier berhasil ditambahkan!');
    }

    public function updatePath(Request $request, $id)
    {
        $request->validate([
            'level' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        DB::table('career_paths')->where('id', $id)->update([
            'level' => $request->level,
            'title' => $request->title,
            'description' => $request->description,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Jalur karier berhasil diperbarui!');
    }

    public function destroyPath($id)
    {
        DB::table('career_paths')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Jalur karier berhasil dihapus!');
    }

    public function storeStory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'quote' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'role' => $request->role,
            'quote' => $request->quote,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('career/stories', 'public');
            $data['image'] = '/storage/' . $path;
        }

        DB::table('employee_stories')->insert($data);

        return redirect()->back()->with('success', 'Employee story berhasil ditambahkan!');
    }

    public function updateStory(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'quote' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $story = DB::table('employee_stories')->where('id', $id)->first();

        $data = [
            'name' => $request->name,
            'role' => $request->role,
            'quote' => $request->quote,
            'updated_at' => now(),
        ];

        if ($request->hasFile('image')) {
            if ($story && $story->image) {
                $oldPath = str_replace('/storage/', '', $story->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $path = $request->file('image')->store('career/stories', 'public');
            $data['image'] = '/storage/' . $path;
        }

        DB::table('employee_stories')->where('id', $id)->update($data);

        return redirect()->back()->with('success', 'Employee story berhasil diperbarui!');
    }

    public function destroyStory($id)
    {
        $story = DB::table('employee_stories')->where('id', $id)->first();
        if ($story && $story->image) {
            $oldPath = str_replace('/storage/', '', $story->image);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        DB::table('employee_stories')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Employee story berhasil dihapus!');
    }

    public function storeInternshipTestimonial(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'quote' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $data = [
            'name' => $request->name,
            'university' => $request->university,
            'role' => $request->role,
            'quote' => $request->quote,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('career/testimonials', 'public');
            $data['image'] = '/storage/' . $path;
        }

        DB::table('internship_testimonials')->insert($data);

        return redirect()->back()->with('success', 'Testimoni magang berhasil ditambahkan!');
    }

    public function updateInternshipTestimonial(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'quote' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $testi = DB::table('internship_testimonials')->where('id', $id)->first();

        $data = [
            'name' => $request->name,
            'university' => $request->university,
            'role' => $request->role,
            'quote' => $request->quote,
            'updated_at' => now(),
        ];

        if ($request->hasFile('image')) {
            if ($testi && $testi->image) {
                $oldPath = str_replace('/storage/', '', $testi->image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            $path = $request->file('image')->store('career/testimonials', 'public');
            $data['image'] = '/storage/' . $path;
        }

        DB::table('internship_testimonials')->where('id', $id)->update($data);

        return redirect()->back()->with('success', 'Testimoni magang berhasil diperbarui!');
    }

    public function destroyInternshipTestimonial($id)
    {
        $testi = DB::table('internship_testimonials')->where('id', $id)->first();
        if ($testi && $testi->image) {
            $oldPath = str_replace('/storage/', '', $testi->image);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }

        DB::table('internship_testimonials')->where('id', $id)->delete();

        return redirect()->back()->with('success', 'Testimoni magang berhasil dihapus!');
    }
}