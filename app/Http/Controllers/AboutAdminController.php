<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ManagementTeam;
use App\Models\CustomerRegion;
use App\Models\Customer;
use App\Models\AboutContent;
use App\Models\EsgContent;
use App\Models\HseContent;
use Illuminate\Support\Facades\File;

class AboutAdminController extends Controller
{
    // ==========================================
    // PUBLIC RENDERING METHODS
    // ==========================================

    public function publicIndex()
    {
        return Inertia::render('About/Index', [
            'contents' => AboutContent::pluck('value', 'key'),
            'managementTeams' => ManagementTeam::all(),
            'customers' => Customer::all(),
        ]);
    }

    public function publicEsg()
    {
        return Inertia::render('About/Esg', [
            'esgContents' => EsgContent::pluck('value', 'key'),
        ]);
    }

    public function publicHse()
    {
        return Inertia::render('About/Hse', [
            'hseContents' => HseContent::pluck('value', 'key'),
        ]);
    }

    // ==========================================
    // ADMIN PANEL / CMS METHODS
    // ==========================================

    public function index()
    {
        return Inertia::render('Admin/AboutManager', [
            'contents' => AboutContent::pluck('value', 'key'),
            'managementTeams' => ManagementTeam::all(),
            'regions' => CustomerRegion::with('customers')->get(),
            'customers' => Customer::all(),
            'esgContents' => EsgContent::pluck('value', 'key'),
            'hseContents' => HseContent::pluck('value', 'key'),
        ]);
    }

    public function updateText(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $destinationPath = public_path('about');
                
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $filename);
                AboutContent::updateOrCreate(['key' => $key], ['value' => '/about/' . $filename]);
            } else {
                AboutContent::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }
        return redirect()->back()->with('success', 'Konten Halaman About Us berhasil diperbarui!');
    }

    public function updateEsg(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            if ($request->hasFile($key)) {
                $folder = $key === 'report_pdf' ? 'esg/pdf' : 'esg';
                $file = $request->file($key);
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $destinationPath = public_path($folder);

                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $filename);
                EsgContent::updateOrCreate(['key' => $key], ['value' => '/' . $folder . '/' . $filename]);
            } else {
                EsgContent::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }
        return redirect()->back()->with('success', 'Konten Halaman ESG berhasil diperbarui!');
    }

    public function updateHse(Request $request)
    {
        foreach ($request->except('_token') as $key => $value) {
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $destinationPath = public_path('hse');

                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $filename);
                HseContent::updateOrCreate(['key' => $key], ['value' => '/hse/' . $filename]);
            } else {
                HseContent::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }
        return redirect()->back()->with('success', 'Konten Halaman HSE berhasil diperbarui!');
    }

    public function storeManagement(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'image' => 'nullable|image|max:2048',
        ]);

        $fileField = $request->hasFile('photo') ? 'photo' : 'image';
        $dbPath = null;

        if ($request->hasFile($fileField)) {
            $file = $request->file($fileField);
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('management');

            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $dbPath = '/management/' . $filename;
        }

        ManagementTeam::create([
            'name' => $request->name,
            'position' => $request->position,
            'category' => $request->category ?? 'manager',
            'linkedin' => $request->linkedin ?? null,
            'photo' => $dbPath,
            'image' => $dbPath,
        ]);

        return redirect()->back();
    }

    public function updateManagement(Request $request, $id)
    {
        $team = ManagementTeam::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'image' => 'nullable|image|max:2048',
        ]);

        $fileField = $request->hasFile('photo') ? 'photo' : 'image';

        if ($request->hasFile($fileField)) {
            if ($team->photo && File::exists(public_path($team->photo))) {
                File::delete(public_path($team->photo));
            }
            if ($team->image && File::exists(public_path($team->image))) {
                File::delete(public_path($team->image));
            }

            $file = $request->file($fileField);
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('management');

            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $dbPath = '/management/' . $filename;

            $team->photo = $dbPath;
            $team->image = $dbPath;
        }

        $team->name = $request->name;
        $team->position = $request->position;
        $team->category = $request->category ?? $team->category;
        $team->linkedin = $request->linkedin ?? $team->linkedin;
        $team->save();

        return redirect()->back();
    }

    public function destroyManagement($id)
    {
        $team = ManagementTeam::findOrFail($id);
        
        if ($team->photo && File::exists(public_path($team->photo))) {
            File::delete(public_path($team->photo));
        }
        if ($team->image && File::exists(public_path($team->image))) {
            File::delete(public_path($team->image));
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
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'gmaps_link' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('customers');

            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $data['image'] = '/customers/' . $filename;
        }

        Customer::create($data);
        return redirect()->back();
    }

    public function updateCustomer(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'nullable',
            'longitude' => 'nullable',
            'gmaps_link' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($customer->image && File::exists(public_path($customer->image))) {
                File::delete(public_path($customer->image));
            }

            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('customers');

            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $filename);
            $data['image'] = '/customers/' . $filename;
        }

        $customer->update($data);
        return redirect()->back();
    }

    public function destroyCustomer($id)
    {
        $customer = Customer::findOrFail($id);
        
        if ($customer->image && File::exists(public_path($customer->image))) {
            File::delete(public_path($customer->image));
        }
        
        $customer->delete();
        return redirect()->back();
    }
}