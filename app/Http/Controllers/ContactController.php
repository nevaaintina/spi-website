<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageMail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $hero = DB::table('contact_heroes')->first();
        $cards = DB::table('contact_cards')->get();
        $infoSection = DB::table('contact_info_sections')->first();

        return Inertia::render('Contact', [
            'hero' => $hero,
            'cards' => $cards,
            'infoSection' => $infoSection,
        ]);
    }

    public function adminIndex()
    {
        $hero = DB::table('contact_heroes')->first();
        $cards = DB::table('contact_cards')->get();
        $infoSection = DB::table('contact_info_sections')->first();
        $messages = DB::table('contact_messages')->latest()->get();

        return Inertia::render('Admin/Contact', [
            'hero' => $hero,
            'cards' => $cards,
            'infoSection' => $infoSection,
            'messages' => $messages,
        ]);
    }

    public function updateHero(Request $request)
    {
        $request->validate([
            'badge_text' => 'nullable|string|max:255',
            'title_part1' => 'nullable|string|max:255',
            'title_part2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'button1_text' => 'nullable|string|max:255',
            'button2_text' => 'nullable|string|max:255',
        ]);

        $hero = DB::table('contact_heroes')->first();
        $data = $request->only(['badge_text', 'title_part1', 'title_part2', 'description', 'button1_text', 'button1_link', 'button2_text', 'button2_link']);
        $data['updated_at'] = now();

        if ($hero) {
            DB::table('contact_heroes')->where('id', $hero->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('contact_heroes')->insert($data);
        }

        return redirect()->back()->with('success', 'Hero Contact berhasil diperbarui!');
    }

    public function updateCards(Request $request)
    {
        $cards = $request->input('cards', []);
        
        foreach ($cards as $index => $cardData) {
            if (isset($cardData['id'])) {
                $updateData = [
                    'title' => $cardData['title'] ?? null,
                    'subtitle' => $cardData['subtitle'] ?? null,
                    'detail' => $cardData['detail'] ?? null,
                    'updated_at' => now(),
                ];

                if ($request->hasFile("cards.{$index}.image")) {
                    $file = $request->file("cards.{$index}.image");
                    $filename = time() . '_' . $file->getClientOriginalName();
                    $file->move(public_path('images/contact'), $filename);
                    $updateData['image'] = '/images/contact/' . $filename;
                }

                DB::table('contact_cards')->where('id', $cardData['id'])->update($updateData);
            }
        }

        return redirect()->back()->with('success', 'Informasi 4 Contact Cards beserta gambar berhasil diperbarui!');
    }

    public function updateInfoSection(Request $request)
    {
        $request->validate([
            'badge_text' => 'nullable|string|max:255',
            'title_part1' => 'nullable|string|max:255',
            'title_part2' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'maps_link' => 'nullable|string|max:255',
            'qr_title' => 'nullable|string|max:255',
            'qr_subtitle' => 'nullable|string',
            'qr_data' => 'nullable|string|max:255',
            'qr_image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'notification_email' => 'nullable|email|max:255',
        ]);

        $section = DB::table('contact_info_sections')->first();
        $data = $request->only([
            'badge_text', 'title_part1', 'title_part2', 'description', 
            'address', 'maps_link', 'qr_title', 'qr_subtitle', 
            'qr_data', 'notification_email'
        ]);
        $data['updated_at'] = now();

        if ($request->hasFile('qr_image')) {
            $file = $request->file('qr_image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/contact'), $filename);
            $data['qr_image'] = '/images/contact/' . $filename;
        }

        if ($section) {
            DB::table('contact_info_sections')->where('id', $section->id)->update($data);
        } else {
            $data['created_at'] = now();
            DB::table('contact_info_sections')->insert($data);
        }

        return redirect()->back()->with('success', 'Informasi lokasi & Email Notifikasi berhasil diperbarui!');
    }

    public function storeMessage(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $msgData = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        // Simpan pesan ke database agar tetap muncul di list admin
        DB::table('contact_messages')->insert($msgData);

        // Kirim email notifikasi jika admin sudah mengisi email tujuannya
        $infoSection = DB::table('contact_info_sections')->first();
        if ($infoSection && !empty($infoSection->notification_email)) {
            try {
                Mail::to($infoSection->notification_email)->send(new ContactMessageMail($msgData));
            } catch (\Exception $e) {
                // Tangkap error email jika SMTP belum diatur, sehingga proses form tetap sukses
            }
        }

        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.');
    }

    public function destroyMessage($id)
    {
        DB::table('contact_messages')->where('id', $id)->delete();
        return redirect()->back()->with('success', 'Pesan berhasil dihapus.');
    }
}