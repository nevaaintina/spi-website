<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Services/Index', [
            'categories' => ServiceCategory::withCount('services')->get()
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
        return Inertia::render('Admin/ServicesManager', [
            'categories' => ServiceCategory::with('services')->get()
        ]);
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