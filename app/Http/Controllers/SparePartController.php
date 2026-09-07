<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SparePart;
use App\Models\ExplodedView;
use App\Models\SparePartSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SparePartController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PartsManager', [
            'spare_parts' => SparePart::all(),
            'exploded_views' => ExplodedView::all(),
            'spare_setting' => SparePartSetting::first() ?? [],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'nullable|string|max:255',
            'spec' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('images/spare-parts');
            if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
            $file->move($destinationPath, $filename);
            $imagePath = 'images/spare-parts/' . $filename;
        }

        SparePart::create([
            'code' => $request->code,
            'name' => $request->name,
            'category' => $request->category,
            'unit' => $request->unit,
            'spec' => $request->spec,
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Suku cadang berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'unit' => 'nullable|string|max:255',
            'spec' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $part = SparePart::findOrFail($id);
        $data = $request->except(['image']);

        if ($request->hasFile('image')) {
            if ($part->image_path && file_exists(public_path($part->image_path))) {
                @unlink(public_path($part->image_path));
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('images/spare-parts');
            if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
            $file->move($destinationPath, $filename);
            $data['image_path'] = 'images/spare-parts/' . $filename;
        }

        $part->update($data);
        return redirect()->back()->with('success', 'Suku cadang berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $part = SparePart::findOrFail($id);
        if ($part->image_path && file_exists(public_path($part->image_path))) {
            @unlink(public_path($part->image_path));
        }
        $part->delete();
        return redirect()->back()->with('success', 'Suku cadang berhasil dihapus!');
    }

    public function storeExplodedView(Request $request)
    {
        $request->validate([
            'system_name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        $file = $request->file('image');
        $filename = time() . '_' . $file->getClientOriginalName();
        $destinationPath = public_path('images/exploded-views');
        if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
        $file->move($destinationPath, $filename);

        ExplodedView::create([
            'system_name' => $request->system_name,
            'image_path' => 'images/exploded-views/' . $filename,
        ]);

        return redirect()->back()->with('success', 'Diagram Exploded View berhasil ditambahkan!');
    }

    public function destroyExplodedView($id)
    {
        $view = ExplodedView::findOrFail($id);
        if ($view->image_path && file_exists(public_path($view->image_path))) {
            @unlink(public_path($view->image_path));
        }
        $view->delete();
        return redirect()->back()->with('success', 'Diagram berhasil dihapus!');
    }

    public function updateCatalogFile(Request $request)
    {
        $request->validate([
            'catalog_file' => 'required|file|mimes:pdf,txt,doc,docx|max:20480',
        ]);

        $setting = SparePartSetting::firstOrCreate([]);

        if ($request->hasFile('catalog_file')) {
            if ($setting->catalog_file_path && file_exists(public_path($setting->catalog_file_path))) {
                @unlink(public_path($setting->catalog_file_path));
            }
            $file = $request->file('catalog_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('files/catalogs');
            if (!file_exists($destinationPath)) mkdir($destinationPath, 0755, true);
            $file->move($destinationPath, $filename);
            
            $setting->catalog_file_path = 'files/catalogs/' . $filename;
            $setting->save();
        }

        return redirect()->back()->with('success', 'File katalog berhasil di-upload!');
    }
}