<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ManagementTeam;
use App\Models\CustomerRegion;
use App\Models\Customer;
use App\Models\AboutContent;
use App\Models\EsgContent;
use Illuminate\Support\Facades\Storage;

class AboutAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AboutManager', [
            'contents' => AboutContent::pluck('value', 'key'),
            'managementTeams' => ManagementTeam::all(),
            'regions' => CustomerRegion::with('customers')->get(),
            'customers' => Customer::all(),
            'esgContents' => EsgContent::pluck('value', 'key'),
        ]);
    }

    // Method untuk menyimpan/memperbarui konten teks & gambar halaman About Us
    public function updateText(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            if ($request->hasFile($key)) {
                $path = $request->file($key)->store('about', 'public');
                AboutContent::updateOrCreate(['key' => $key], ['value' => '/storage/' . $path]);
            } else {
                AboutContent::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }
        return redirect()->back()->with('success', 'Konten Halaman About Us berhasil diperbarui!');
    }

    // Method untuk menyimpan/memperbarui konten teks & file PDF halaman ESG
    public function updateEsg(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            if ($request->hasFile($key)) {
                $folder = $key === 'report_pdf' ? 'esg/pdf' : 'esg';
                $path = $request->file($key)->store($folder, 'public');
                EsgContent::updateOrCreate(['key' => $key], ['value' => '/storage/' . $path]);
            } else {
                EsgContent::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }
        return redirect()->back()->with('success', 'Konten Halaman ESG berhasil diperbarui!');
    }

    public function storeManagement(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'image' => 'nullable|image|max:2048', // Menjaga kompatibilitas nama field foto/image
        ]);

        $fileField = $request->hasFile('photo') ? 'photo' : 'image';
        $path = null;
        if ($request->hasFile($fileField)) {
            $path = $request->file($fileField)->store('management', 'public');
        }

        ManagementTeam::create([
            'name' => $request->name,
            'position' => $request->position,
            'category' => $request->category ?? 'manager',
            'linkedin' => $request->linkedin ?? null,
            'photo' => $path ? '/storage/' . $path : null,
            'image' => $path ? '/storage/' . $path : null,
        ]);

        return redirect()->back();
    }

    public function destroyManagement($id)
    {
        $team = ManagementTeam::findOrFail($id);
        if ($team->photo) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $team->photo));
        }
        if ($team->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $team->image));
        }
        $team->delete();
        
        return redirect()->back();
    }

    public function storeCustomer(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'gmaps_link' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('customers', 'public');
        }

        Customer::create($data);
        return redirect()->back();
    }

    public function destroyCustomer($id)
    {
        $customer = Customer::findOrFail($id);
        if ($customer->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $customer->image));
        }
        $customer->delete();
        
        return redirect()->back();
    }
}