<?php

namespace App\Http\Controllers;

use App\Models\HeroContent;
use App\Models\IntroSection;
use App\Models\Service;
use App\Models\Statistic;
use App\Models\StrengthSection;
use App\Models\FeaturedServiceSection;
use App\Models\FeaturedServiceItem;
use App\Models\TestimonialSection;
use App\Models\Testimonial;
use App\Models\Project;
use App\Models\Branch;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomeController extends Controller
{
    // 1. HALAMAN PUBLIK
    public function index()
    {
        return Inertia::render('Home', [
            'hero'                => HeroContent::first() ?? [],
            'intro'               => IntroSection::first() ?? [],
            'services'            => Service::all(),
            'statistics'          => Statistic::all(),
            'strength'            => StrengthSection::first() ?? [],
            'featured_section'    => FeaturedServiceSection::first() ?? [],
            'featured_items'      => FeaturedServiceItem::orderBy('id')->get(),
            'testimonial_section' => TestimonialSection::first() ?? [],
            'testimonials'        => Testimonial::all(),
            'projects'            => Project::latest()->get(),
            'posts'               => DB::table('knowledge_articles')->latest()->take(4)->get(), 
            'branches'            => Branch::all(),
            'contact'             => Contact::first() ?? [],
        ]);
    }

    // 2. HALAMAN ADMIN
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'hero' => HeroContent::firstOrCreate([], [
                'badge_text' => 'PT. SERVISTAMA PRO INDONESIA',
                'title_line_1' => 'DENGAN KONSEP',
                'title_highlight' => 'BRIGHT FUTURE',
                'title_line_2' => 'UNTUK ANDA',
                'description' => 'Kami berkomitmen menghadirkan layanan konstruksi terbaik dengan teknologi modern, peralatan berkualitas, dan sumber daya profesional untuk mendukung keberhasilan setiap proyek Anda.',
                'video_url' => 'https://www.youtube.com/embed/Bao6hyf28NM',
            ]),
            'intro' => IntroSection::firstOrCreate([], [
                'badge_text' => 'LAYANAN KAMI',
                'title_main' => 'Solusi Tepat untuk',
                'title_highlight' => 'Setiap Kebutuhan Anda',
                'description' => 'Kami hadir dengan berbagai layanan untuk mendukung produktivitas alat berat Anda agar tetap optimal di setiap pekerjaan.',
                'point_1_title' => 'Berpengalaman',
                'point_1_desc' => 'Lebih dari 10 tahun melayani berbagai industri',
                'point_2_title' => 'Profesional',
                'point_2_desc' => 'Tim ahli dan bersertifikasi di bidangnya',
                'point_3_title' => 'Terpercaya',
                'point_3_desc' => 'Layanan berkualitas dengan komitmen terbaik',
            ]),
            'strength' => StrengthSection::firstOrCreate([], [
                'badge_text' => 'COMPANY STRENGTH',
                'title_main' => 'Kekuatan Kami,',
                'title_highlight' => 'Komitmen Kami',
                'description' => 'Dengan pengalaman, sumber daya, dan dedikasi tinggi, kami siap menjadi mitra terbaik dalam setiap proyek Anda.',
                'banner_title' => 'Safety First',
                'banner_desc' => 'Keselamatan adalah nilai utama dalam setiap pekerjaan kami.',
                'heading_why' => 'Mengapa Memilih Kami?',
                'desc_why' => 'Kami tidak hanya menyediakan layanan, tetapi juga menghadirkan nilai tambah melalui kualitas, inovasi, dan komitmen berkelanjutan.',
                'point_1_title' => 'Kualitas Terjamin', 'point_1_desc' => 'Standar kualitas tinggi di setiap proses kerja.',
                'point_2_title' => 'Inovasi Berkelanjutan', 'point_2_desc' => 'Selalu berkembang dengan teknologi terbaru.',
                'point_3_title' => 'Integritas Tinggi', 'point_3_desc' => 'Bekerja dengan jujur, transparan, dan profesional.',
                'point_4_title' => 'Layanan 24/7', 'point_4_desc' => 'Siap melayani kapan pun Anda membutuhkan.',
            ]),
            'featured_section' => FeaturedServiceSection::firstOrCreate([], [
                'badge_text' => 'OUR SERVICES',
                'title_main' => 'Featured',
                'title_highlight' => 'Services',
                'description' => 'Kami menyediakan berbagai layanan unggulan untuk mendukung kebutuhan proyek pertambangan dan konstruksi Anda.',
            ]),
            'featured_items'      => FeaturedServiceItem::all(),
            'testimonial_section' => TestimonialSection::firstOrCreate([], [
                'badge_text' => 'CUSTOMER TESTIMONIALS',
                'title_main' => 'Apa Kata',
                'title_highlight' => 'Mereka?',
                'description' => 'Kepercayaan pelanggan adalah bagian penting dari perjalanan kami. Berikut pengalaman mereka bekerja sama dengan tim kami.',
            ]),
            'contact' => Contact::firstOrCreate([], [
                'address' => 'Foresta Business Loft 7, Unit 6-7, Jl. BSD Boulevard Utara, Lengkong Kulon, Tangerang, Banten 15331',
                'phone' => '+62 811-0000-0000',
                'email' => 'info@servistamapro.co.id',
                'parts_email' => 'parts@servistamapro.co.id',
                'map_url' => 'https://maps.google.com',
                'operational_hours' => 'Senin - Jumat: 08.00 - 17.00',
            ]),
            'services'            => Service::all(),
            'statistics'          => Statistic::all(),
            'testimonials'        => Testimonial::all(),
            'projects'            => Project::latest()->get(),
            'posts'               => DB::table('knowledge_articles')->latest()->get(),
            'branches'            => Branch::all(),
        ]);
    }

    // 3. UPDATE HERO BANNER
    public function updateHero(Request $request, $id)
    {
        $request->validate([
            'badge_text' => 'required|string|max:255',
            'title_line_1' => 'required|string|max:255',
            'title_highlight' => 'required|string|max:255',
            'title_line_2' => 'required|string|max:255',
            'description' => 'required|string',
            'video_url' => 'nullable|string', 
            'video' => 'nullable|file|mimes:mp4,mov,avi|max:102400',
        ]);

        $hero = HeroContent::findOrFail($id);
        $data = $request->only(['badge_text', 'title_line_1', 'title_highlight', 'title_line_2', 'description']);

        if ($request->filled('video_url')) {
            $url = $request->video_url;
            if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/', $url, $match)) {
                $data['video_url'] = "https://www.youtube.com/embed/{$match[1]}";
            } else {
                $data['video_url'] = $url;
            }
        } else {
            $data['video_url'] = $hero->video_url ?? '';
        }

        if ($request->hasFile('video')) {
            if ($hero->video_path && file_exists(public_path($hero->video_path))) {
                @unlink(public_path($hero->video_path));
            }
            $file = $request->file('video');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/hero-videos'), $filename);
            $data['video_path'] = 'images/hero-videos/' . $filename;
        }

        $hero->update($data);
        return redirect()->back()->with('success', 'Hero banner berhasil diperbarui!');
    }

    public function destroyHeroVideo($id)
    {
        $hero = HeroContent::findOrFail($id);
        if ($hero->video_path && file_exists(public_path($hero->video_path))) {
            @unlink(public_path($hero->video_path));
            $hero->video_path = null;
            $hero->save();
        }
        return redirect()->back()->with('success', 'Video lokal berhasil dihapus!');
    }

    // 3c. UPDATE INTRO / LAYANAN (Disimpan ke public/images/intro-images)
    public function updateIntro(Request $request, $id)
    {
        $request->validate([
            'badge_text' => 'required|string|max:255',
            'title_main' => 'required|string|max:255',
            'title_highlight' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'point_1_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'point_2_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'point_3_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'service_1_image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'service_2_image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            'service_3_image' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        $intro = IntroSection::findOrFail($id);
        $data = $request->except([
            'image', 
            'point_1_image', 'point_2_image', 'point_3_image',
            'service_1_image', 'service_2_image', 'service_3_image'
        ]);

        $destinationPath = public_path('images/intro-images');
        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        if ($request->hasFile('image')) {
            if ($intro->image_path && file_exists(public_path($intro->image_path))) {
                @unlink(public_path($intro->image_path));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move($destinationPath, $filename);
            $data['image_path'] = 'images/intro-images/' . $filename;
        }

        foreach ([1, 2, 3] as $i) {
            $field = "point_{$i}_image";
            if ($request->hasFile($field)) {
                if ($intro->$field && file_exists(public_path($intro->$field))) {
                    @unlink(public_path($intro->$field));
                }
                $file = $request->file($field);
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move($destinationPath, $filename);
                $data[$field] = 'images/intro-images/' . $filename;
            }
        }

        foreach ([1, 2, 3] as $i) {
            $field = "service_{$i}_image";
            if ($request->hasFile($field)) {
                if ($intro->$field && file_exists(public_path($intro->$field))) {
                    @unlink(public_path($intro->$field));
                }
                $file = $request->file($field);
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move($destinationPath, $filename);
                $data[$field] = 'images/intro-images/' . $filename;
            }
        }

        $intro->update($data);
        return redirect()->back()->with('success', 'Intro & Layanan berhasil diperbarui!');
    }

    // 4. STATISTIK
    public function storeStatistic(Request $request)
    {
        $request->validate([
            'target' => 'required|numeric',
            'suffix' => 'nullable|string|max:10',
            'label'  => 'required|string|max:255',
            'desc'   => 'nullable|string',
        ]);

        Statistic::create($request->only(['target', 'suffix', 'label', 'desc']));
        return redirect()->back()->with('success', 'Statistik berhasil ditambahkan!');
    }

    public function updateStatistic(Request $request, $id)
    {
        $request->validate([
            'target' => 'required|numeric',
            'suffix' => 'nullable|string|max:10',
            'label'  => 'required|string|max:255',
            'desc'   => 'nullable|string',
        ]);

        $statistic = Statistic::findOrFail($id);
        $statistic->update($request->only(['target', 'suffix', 'label', 'desc']));

        return redirect()->back()->with('success', 'Statistik berhasil diperbarui!');
    }

    public function destroyStatistic($id)
    {
        Statistic::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Statistik berhasil dihapus!');
    }

    // 4b. STRENGTH SECTION (Disimpan ke public/images/strength-images)
    public function updateStrength(Request $request, $id)
    {
        $request->validate([
            'badge_text' => 'required|string|max:255',
            'title_main' => 'required|string|max:255',
            'title_highlight' => 'required|string|max:255',
            'description' => 'required|string',
            'banner_title' => 'required|string|max:255',
            'banner_desc' => 'required|string',
            'banner_image' => 'nullable|image|mimes:jpg,jpeg,png|max:30480',
            'heading_why' => 'required|string|max:255',
            'desc_why' => 'required|string',
        ]);

        $strength = StrengthSection::findOrFail($id);
        $data = $request->except(['banner_image']);

        if ($request->hasFile('banner_image')) {
            if ($strength->banner_image_path && file_exists(public_path($strength->banner_image_path))) {
                @unlink(public_path($strength->banner_image_path));
            }
            $file = $request->file('banner_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/strength-images'), $filename);
            $data['banner_image_path'] = 'images/strength-images/' . $filename;
        }

        $strength->update($data);
        return redirect()->back()->with('success', 'Company Strength berhasil diperbarui!');
    }

    // 4c. FEATURED SERVICES SECTION & ITEMS (Disimpan ke public/images/featured-services)
    public function updateFeaturedSection(Request $request, $id)
    {
        $request->validate([
            'badge_text' => 'required|string|max:255',
            'title_main' => 'required|string|max:255',
            'title_highlight' => 'required|string|max:255',
            'description' => 'required|string',
            'bg_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20480',
        ]);

        $section = FeaturedServiceSection::findOrFail($id);
        $data = $request->except(['bg_image']);

        if ($request->hasFile('bg_image')) {
            if ($section->bg_image_path && file_exists(public_path($section->bg_image_path))) {
                @unlink(public_path($section->bg_image_path));
            }
            $file = $request->file('bg_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/featured-services'), $filename);
            $data['bg_image_path'] = 'images/featured-services/' . $filename;
        }

        $section->update($data);
        return redirect()->back()->with('success', 'Header Featured Services berhasil diperbarui!');
    }

    public function storeFeaturedItem(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
            'link_url' => 'nullable|string',
        ]);

        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $file->move(public_path('images/featured-services'), $filename);
        $imagePath = 'images/featured-services/' . $filename;

        FeaturedServiceItem::create([
            'title' => $request->title,
            'description' => $request->description,
            'image_path' => $imagePath,
            'link_url' => $request->link_url ?? '/services',
        ]);

        return redirect()->back()->with('success', 'Layanan berhasil ditambahkan!');
    }

    public function updateFeaturedItem(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'link_url' => 'nullable|string',
        ]);

        $item = FeaturedServiceItem::findOrFail($id);
        $data = $request->except(['image']);

        if ($request->hasFile('image')) {
            if ($item->image_path && file_exists(public_path($item->image_path))) {
                @unlink(public_path($item->image_path));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/featured-services'), $filename);
            $data['image_path'] = 'images/featured-services/' . $filename;
        }

        $item->update($data);
        return redirect()->back()->with('success', 'Layanan berhasil diperbarui!');
    }

    public function destroyFeaturedItem($id)
    {
        $item = FeaturedServiceItem::findOrFail($id);
        if ($item->image_path && file_exists(public_path($item->image_path))) {
            @unlink(public_path($item->image_path));
        }
        $item->delete();

        return redirect()->back()->with('success', 'Layanan berhasil dihapus!');
    }

    // 5. TESTIMONIAL
    public function updateTestimonialSection(Request $request, $id)
    {
        $request->validate([
            'badge_text' => 'required|string|max:255',
            'title_main' => 'required|string|max:255',
            'title_highlight' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        TestimonialSection::findOrFail($id)->update($request->all());
        return redirect()->back()->with('success', 'Header Testimoni berhasil diperbarui!');
    }

    public function storeTestimonial(Request $request)
    {
        $request->validate(['client_name' => 'required', 'client_title' => 'required', 'quote' => 'required']);
        Testimonial::create($request->only(['client_name', 'client_title', 'quote']));
        return redirect()->back()->with('success', 'Testimoni ditambahkan!');
    }

    public function updateTestimonial(Request $request, $id)
    {
        $request->validate([
            'client_name' => 'required|string|max:255',
            'client_title' => 'required|string|max:255',
            'quote' => 'required|string',
        ]);

        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($request->only(['client_name', 'client_title', 'quote']));

        return redirect()->back()->with('success', 'Testimoni berhasil diperbarui!');
    }

    public function destroyTestimonial($id)
    {
        Testimonial::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Testimoni dihapus!');
    }

    // 6. PROJECT (Disimpan langsung ke public/images/projects)
    public function storeProject(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/projects'), $filename);
            $imagePath = 'images/projects/' . $filename;
        }

        Project::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'year' => $request->year,
            'image' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Proyek berhasil ditambahkan!');
    }

    public function updateProject(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $project = Project::findOrFail($id);
        $data = $request->only(['title', 'description', 'location', 'year']);

        if ($request->hasFile('image')) {
            if ($project->image && file_exists(public_path($project->image))) {
                @unlink(public_path($project->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/projects'), $filename);
            $data['image'] = 'images/projects/' . $filename;
        }

        $project->update($data);

        return redirect()->back()->with('success', 'Proyek berhasil diperbarui!');
    }

    public function destroyProject($id)
    {
        $project = Project::findOrFail($id);
        if ($project->image && file_exists(public_path($project->image))) {
            @unlink(public_path($project->image));
        }
        $project->delete();
        
        return redirect()->back()->with('success', 'Proyek berhasil dihapus!');
    }

    // 7. POSTS / NEWS (Disimpan ke public/images/knowledge)
    public function storePost(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10120',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/knowledge'), $filename);
            $imagePath = 'images/knowledge/' . $filename;
        }

        DB::table('knowledge_articles')->insert([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(),
            'category' => 'General News',
            'excerpt' => Str::limit(strip_tags($request->content), 100),
            'content' => $request->content,
            'image' => $imagePath,
            'read_time' => '5 Menit',
            'published_date' => now()->format('Y-m-d'),
            'is_featured' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Berita berhasil dipublikasikan ke Knowledge Center!');
    }

    public function updatePost(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        $article = DB::table('knowledge_articles')->where('id', $id)->first();
        if (!$article) {
            abort(404, 'Artikel tidak ditemukan.');
        }

        $imagePath = $article->image;
        if ($request->hasFile('image')) {
            if ($article->image && file_exists(public_path($article->image))) {
                @unlink(public_path($article->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/knowledge'), $filename);
            $imagePath = 'images/knowledge/' . $filename;
        }

        DB::table('knowledge_articles')->where('id', $id)->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(),
            'excerpt' => Str::limit(strip_tags($request->content), 100),
            'content' => $request->content,
            'image' => $imagePath,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Berita berhasil diperbarui!');
    }

    public function destroyPost($id)
    {
        $article = DB::table('knowledge_articles')->where('id', $id)->first();
        if ($article && $article->image && file_exists(public_path($article->image))) {
            @unlink(public_path($article->image));
        }
        DB::table('knowledge_articles')->where('id', $id)->delete();
        
        return redirect()->back()->with('success', 'Berita berhasil dihapus!');
    }

    // 8. BRANCHES
    public function storeBranch(Request $request)
    {
        $request->validate([
            'name' => 'required', 
            'category' => 'required', 
            'city' => 'required', 
            'description' => 'required',
            'phone' => 'nullable|string',
            'latitude' => 'nullable',
            'longitude' => 'nullable',
        ]);

        Branch::create([
            'name' => $request->name,
            'category' => $request->category,
            'city' => $request->city,
            'description' => $request->description,
            'phone' => $request->phone,
            'latitude' => $request->latitude ?? -0.7893,
            'longitude' => $request->longitude ?? 113.9213,
            'map_left' => '47.0', 
            'map_top' => '73.0',
        ]);

        return redirect()->back()->with('success', 'Cabang dan nomor hotline berhasil disimpan!');
    }

    public function updateBranch(Request $request, $id)
    {
        $request->validate([
            'name' => 'required', 
            'category' => 'required', 
            'city' => 'required', 
            'description' => 'required',
            'phone' => 'nullable|string',
            'latitude' => 'nullable',
            'longitude' => 'nullable',
        ]);

        $branch = Branch::findOrFail($id);
        
        $branch->update([
            'name' => $request->name,
            'category' => $request->category,
            'city' => $request->city,
            'description' => $request->description,
            'phone' => $request->phone,
            'latitude' => $request->latitude ?? $branch->latitude,
            'longitude' => $request->longitude ?? $branch->longitude,
        ]);

        return redirect()->back()->with('success', 'Data cabang berhasil diperbarui!');
    }

    public function destroyBranch($id)
    {
        Branch::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Cabang berhasil dihapus!');
    }

    // 9. CONTACT INFO
    public function updateContact(Request $request, $id)
    {
        $request->validate([
            'address' => 'required|string',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:100',
            'parts_email' => 'nullable|email|max:100',
            'map_url' => 'nullable|string',
            'operational_hours' => 'nullable|string',
        ]);

        $contact = Contact::findOrFail($id);
        $contact->update($request->all());

        return redirect()->back()->with('success', 'Informasi kontak berhasil diperbarui!');
    }
}