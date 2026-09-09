<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $service_setting = DB::table('service_settings')->first();

        return Inertia::render('Services/Index', [
            'categories' => ServiceCategory::withCount('services')->get(),
            'service_setting' => $service_setting,
        ]);
    }

    public function show($slug)
    {
        $category = ServiceCategory::with('services')->where('slug', $slug)->firstOrFail();
        
        return Inertia::render('Services/Show', [
            'category' => $category,
            'services' => $category->services,
            'allCategories' => ServiceCategory::all(),
        ]);
    }

    public function adminIndex()
    {
        $service_setting = DB::table('service_settings')->first();

        return Inertia::render('Admin/ServicesManager', [
            'categories' => ServiceCategory::with('services')->get(),
            'service_setting' => $service_setting,
        ]);
    }

    public function updateContent(Request $request)
    {
        $request->validate([
            'hero_title_part1' => 'nullable|string|max:255',
            'hero_title_part2' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string',
            'hero_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'cta_title' => 'nullable|string|max:255',
            'cta_subtitle' => 'nullable|string',
            'whatsapp_number' => 'nullable|string|max:50',
        ]);

        $setting = DB::table('service_settings')->first();

        $data = [
            'hero_title_part1' => $request->hero_title_part1 ?? '',
            'hero_title_part2' => $request->hero_title_part2 ?? '',
            'hero_description' => $request->hero_description ?? '',
            'cta_title' => $request->cta_title ?? '',
            'cta_subtitle' => $request->cta_subtitle ?? '',
            'whatsapp_number' => $request->whatsapp_number ?? '',
            'updated_at' => now(),
        ];

        if ($request->hasFile('hero_image')) {
            if ($setting && $setting->hero_image && file_exists(public_path($setting->hero_image))) {
                @unlink(public_path($setting->hero_image));
            }
            $file = $request->file('hero_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/services'), $filename);
            $data['hero_image'] = 'images/services/' . $filename;
        }

        if ($setting) {
            DB::table('service_settings')->where('id', $setting->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('service_settings')->insert($data);
        }

        return redirect()->back()->with('success', 'Konten Hero Banner & CTA Services berhasil diperbarui!');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_category_id' => 'required|exists:service_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'what_we_do' => 'nullable',
            'key_benefits' => 'nullable',
        ]);

        $whatWeDo = is_string($validated['what_we_do'] ?? null) 
            ? array_values(array_filter(array_map('trim', explode("\n", $validated['what_we_do'])))) 
            : (is_array($validated['what_we_do'] ?? null) ? $validated['what_we_do'] : []);

        $keyBenefits = is_string($validated['key_benefits'] ?? null) 
            ? array_values(array_filter(array_map('trim', explode("\n", $validated['key_benefits'])))) 
            : (is_array($validated['key_benefits'] ?? null) ? $validated['key_benefits'] : []);

        Service::create([
            'service_category_id' => (int) $validated['service_category_id'],
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'description' => $validated['description'],
            'what_we_do' => $whatWeDo,
            'key_benefits' => $keyBenefits,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'service_category_id' => 'required|exists:service_categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'what_we_do' => 'nullable',
            'key_benefits' => 'nullable',
        ]);

        $whatWeDo = is_string($validated['what_we_do'] ?? null) 
            ? array_values(array_filter(array_map('trim', explode("\n", $validated['what_we_do'])))) 
            : (is_array($validated['what_we_do'] ?? null) ? $validated['what_we_do'] : []);

        $keyBenefits = is_string($validated['key_benefits'] ?? null) 
            ? array_values(array_filter(array_map('trim', explode("\n", $validated['key_benefits'])))) 
            : (is_array($validated['key_benefits'] ?? null) ? $validated['key_benefits'] : []);

        $service = Service::findOrFail($id);
        $service->update([
            'service_category_id' => (int) $validated['service_category_id'],
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
            'description' => $validated['description'],
            'what_we_do' => $whatWeDo,
            'key_benefits' => $keyBenefits,
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();
        return redirect()->back();
    }
}