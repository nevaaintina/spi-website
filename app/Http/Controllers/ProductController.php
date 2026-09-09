<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Helper otomatis untuk mengonversi link YouTube ke format embed
    private function convertYoutubeUrl($url)
    {
        if (empty($url)) return '';
        if (str_contains($url, 'embed')) return $url;
        
        if (str_contains($url, 'youtu.be/')) {
            $id = basename(parse_url($url, PHP_URL_PATH));
            return "https://www.youtube.com/embed/{$id}";
        }
        
        if (str_contains($url, 'watch?v=')) {
            parse_str(parse_url($url, PHP_URL_QUERY), $params);
            if (isset($params['v'])) {
                return "https://www.youtube.com/embed/{$params['v']}";
            }
        }
        return $url;
    }

    // Halaman Publik: Index
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');
        
        $categories = ProductCategory::withCount('products')->get();
        $product_setting = DB::table('product_settings')->first();
        
        $query = Product::with('category');
        if ($categorySlug && $categorySlug !== 'all') {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        return Inertia::render('Products/Index', [
            'categories' => $categories,
            'products' => $query->latest()->get(),
            'currentCategory' => $categorySlug ?? 'all',
            'product_setting' => $product_setting,
        ]);
    }

    // Halaman Publik: Show Detail Produk Lengkap
    public function show($slug)
    {
        $product = Product::with('category')->where('slug', $slug)->firstOrFail();
        
        $relatedProducts = Product::where('product_category_id', $product->product_category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    // Halaman Admin: Manajemen Produk
    public function adminIndex()
    {
        $product_setting = DB::table('product_settings')->first();

        return Inertia::render('Admin/ProductsManager', [
            'categories' => ProductCategory::with('products')->get(),
            'products' => Product::with('category')->latest()->get(),
            'product_setting' => $product_setting,
        ]);
    }

    // Update Hero Banner & Katalog PDF (Admin)
    public function updateContent(Request $request)
    {
        $request->validate([
            'hero_title_part1' => 'nullable|string|max:255',
            'hero_title_part2' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'catalog_pdf' => 'nullable|mimes:pdf|max:20480',
        ]);

        $setting = DB::table('product_settings')->first();

        $data = [
            'hero_title_part1' => $request->hero_title_part1 ?? '',
            'hero_title_part2' => $request->hero_title_part2 ?? '',
            'hero_description' => $request->hero_description ?? '',
            'updated_at' => now(),
        ];

        if ($request->hasFile('hero_image')) {
            if ($setting && $setting->hero_image && file_exists(public_path($setting->hero_image))) {
                @unlink(public_path($setting->hero_image));
            }
            $file = $request->file('hero_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $filename);
            $data['hero_image'] = 'images/products/' . $filename;
        }

        if ($request->hasFile('catalog_pdf')) {
            if ($setting && $setting->catalog_pdf && file_exists(public_path($setting->catalog_pdf))) {
                @unlink(public_path($setting->catalog_pdf));
            }
            $file = $request->file('catalog_pdf');
            $filename = time() . '_catalog_' . $file->getClientOriginalName();
            $file->move(public_path('documents/products'), $filename);
            $data['catalog_pdf'] = 'documents/products/' . $filename;
        }

        if ($setting) {
            DB::table('product_settings')->where('id', $setting->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('product_settings')->insert($data);
        }

        return redirect()->back()->with('success', 'Pengaturan Hero & Katalog berhasil diperbarui!');
    }

    // Simpan Produk Baru (Admin)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'overview' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'brochure_file' => 'nullable|mimes:pdf|max:20480',
            'video_type' => 'nullable|string',
            'video_url' => 'nullable|string',
            'video_file' => 'nullable|mimes:mp4,mkv,webm|max:102400',
            'specifications' => 'nullable|array',
            'key_features' => 'nullable|array',
        ]);

        $videoUrl = '';
        if ($request->video_type === 'url' && $request->filled('video_url')) {
            $videoUrl = $this->convertYoutubeUrl($request->video_url);
        }

        $data = [
            'product_category_id' => $validated['product_category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . uniqid(),
            'description' => $validated['description'] ?? '',
            'overview' => $validated['overview'] ?? '',
            'video_url' => $videoUrl,
            'specifications' => $request->specifications ?? [],
            'key_features' => $request->key_features ?? [],
        ];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $filename);
            $data['image'] = 'images/products/' . $filename;
        }

        if ($request->hasFile('gallery_images')) {
            $galleryPaths = [];
            foreach ($request->file('gallery_images') as $img) {
                $filename = time() . '_' . uniqid() . '_' . $img->getClientOriginalName();
                $img->move(public_path('images/products/gallery'), $filename);
                $galleryPaths[] = 'images/products/gallery/' . $filename;
            }
            $data['gallery_images'] = $galleryPaths;
        }

        if ($request->hasFile('brochure_file')) {
            $file = $request->file('brochure_file');
            $filename = time() . '_brochure_' . $file->getClientOriginalName();
            $file->move(public_path('documents/products'), $filename);
            $data['brochure_file'] = 'documents/products/' . $filename;
        }

        if ($request->hasFile('video_file') && $request->video_type === 'upload') {
            $file = $request->file('video_file');
            $filename = time() . '_video_' . $file->getClientOriginalName();
            $file->move(public_path('videos/products'), $filename);
            $data['video_url'] = 'videos/products/' . $filename;
        }

        Product::create($data);

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan!');
    }

    // Update Produk (Admin)
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'product_category_id' => 'required|exists:product_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'overview' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'gallery_images.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:10240',
            'brochure_file' => 'nullable|mimes:pdf|max:20480',
            'video_type' => 'nullable|string',
            'video_url' => 'nullable|string',
            'video_file' => 'nullable|mimes:mp4,mkv,webm|max:102400',
            'specifications' => 'nullable|array',
            'key_features' => 'nullable|array',
        ]);

        $videoUrl = $product->video_url;
        if ($request->video_type === 'url' && $request->filled('video_url')) {
            $videoUrl = $this->convertYoutubeUrl($request->video_url);
        }

        $data = [
            'product_category_id' => $validated['product_category_id'],
            'name' => $validated['name'],
            'description' => $validated['description'] ?? '',
            'overview' => $validated['overview'] ?? '',
            'video_url' => $videoUrl,
            'specifications' => $request->specifications ?? $product->specifications,
            'key_features' => $request->key_features ?? $product->key_features,
        ];

        if ($request->hasFile('image')) {
            if ($product->image && file_exists(public_path($product->image))) {
                @unlink(public_path($product->image));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/products'), $filename);
            $data['image'] = 'images/products/' . $filename;
        }

        if ($request->hasFile('gallery_images')) {
            $galleryPaths = $product->gallery_images ?? [];
            foreach ($request->file('gallery_images') as $img) {
                $filename = time() . '_' . uniqid() . '_' . $img->getClientOriginalName();
                $img->move(public_path('images/products/gallery'), $filename);
                $galleryPaths[] = 'images/products/gallery/' . $filename;
            }
            $data['gallery_images'] = $galleryPaths;
        }

        if ($request->hasFile('brochure_file')) {
            if ($product->brochure_file && file_exists(public_path($product->brochure_file))) {
                @unlink(public_path($product->brochure_file));
            }
            $file = $request->file('brochure_file');
            $filename = time() . '_brochure_' . $file->getClientOriginalName();
            $file->move(public_path('documents/products'), $filename);
            $data['brochure_file'] = 'documents/products/' . $filename;
        }

        if ($request->hasFile('video_file') && $request->video_type === 'upload') {
            $file = $request->file('video_file');
            $filename = time() . '_video_' . $file->getClientOriginalName();
            $file->move(public_path('videos/products'), $filename);
            $data['video_url'] = 'videos/products/' . $filename;
        }

        $product->update($data);

        return redirect()->back()->with('success', 'Produk berhasil diperbarui!');
    }

    // Hapus Produk (Admin)
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image && file_exists(public_path($product->image))) {
            @unlink(public_path($product->image));
        }
        if ($product->brochure_file && file_exists(public_path($product->brochure_file))) {
            @unlink(public_path($product->brochure_file));
        }
        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus!');
    }
}