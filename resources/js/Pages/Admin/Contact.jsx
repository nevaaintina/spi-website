import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminContact({ hero, cards = [], infoSection = null, messages = [] }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('hero');

    // State Hero Banner
    const [heroData, setHeroData] = useState({
        badge_text: hero?.badge_text || 'GET IN TOUCH',
        title_part1: hero?.title_part1 || "Let's Build",
        title_part2: hero?.title_part2 || 'Something Great.',
        description: hero?.description || '',
        button1_text: hero?.button1_text || 'Office Hotline',
        button1_link: hero?.button1_link || '#',
        button2_text: hero?.button2_text || 'WhatsApp Support',
        button2_link: hero?.button2_link || '#',
    });

    // State 4 Cards
    const [cardsData, setCardsData] = useState(
        cards.length > 0 ? cards : [
            { id: 1, card_number: '01', title: 'Office Hotline', subtitle: '', detail: '', image: '' },
            { id: 2, card_number: '02', title: 'WhatsApp Support', subtitle: '', detail: '', image: '' },
            { id: 3, card_number: '03', title: 'Official Email', subtitle: '', detail: '', image: '' },
            { id: 4, card_number: '04', title: 'Emergency Service', subtitle: '', detail: '', image: '' },
        ]
    );

    const handleCardChange = (index, field, val) => {
        const updated = [...cardsData];
        updated[index][field] = val;
        setCardsData(updated);
    };

    // State Info Section, Maps, QR Data, QR Image & Notification Email
    const [infoData, setInfoData] = useState({
        badge_text: infoSection?.badge_text || 'SEND MESSAGE',
        title_part1: infoSection?.title_part1 || 'Kirimkan Pesan',
        title_part2: infoSection?.title_part2 || 'Kepada Kami',
        description: infoSection?.description || '',
        address: infoSection?.address || '',
        maps_link: infoSection?.maps_link || '',
        qr_title: infoSection?.qr_title || 'Simpan Kontak Kami',
        qr_subtitle: infoSection?.qr_subtitle || '',
        qr_data: infoSection?.qr_data || 'https://servistamapro.co.id',
        qr_image: infoSection?.qr_image || '',
        notification_email: infoSection?.notification_email || '',
        qrImageFile: null,
    });

    const handleSaveHero = (e) => {
        e.preventDefault();
        router.post('/admin/contact/hero', heroData, {
            preserveScroll: true,
            onSuccess: () => alert('Hero Contact berhasil diperbarui!'),
        });
    };

    const handleSaveCards = (e) => {
        e.preventDefault();
        const formData = new FormData();
        cardsData.forEach((card, index) => {
            formData.append(`cards[${index}][id]`, card.id);
            formData.append(`cards[${index}][title]`, card.title || '');
            formData.append(`cards[${index}][subtitle]`, card.subtitle || '');
            formData.append(`cards[${index}][detail]`, card.detail || '');
            if (card.imageFile) {
                formData.append(`cards[${index}][image]`, card.imageFile);
            }
        });

        router.post('/admin/contact/cards', formData, {
            preserveScroll: true,
            onSuccess: () => alert('4 Contact Cards beserta gambar berhasil diperbarui!'),
        });
    };

    const handleSaveInfo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('badge_text', infoData.badge_text);
        formData.append('title_part1', infoData.title_part1);
        formData.append('title_part2', infoData.title_part2);
        formData.append('description', infoData.description);
        formData.append('address', infoData.address);
        formData.append('maps_link', infoData.maps_link);
        formData.append('qr_title', infoData.qr_title);
        formData.append('qr_subtitle', infoData.qr_subtitle);
        formData.append('qr_data', infoData.qr_data);
        formData.append('notification_email', infoData.notification_email || '');
        if (infoData.qrImageFile) {
            formData.append('qr_image', infoData.qrImageFile);
        }

        router.post('/admin/contact/info-section', formData, {
            preserveScroll: true,
            onSuccess: () => alert('Informasi lokasi & Email Notifikasi berhasil diperbarui!'),
        });
    };

    const handleDeleteMessage = (id) => {
        if (confirm('Yakin ingin menghapus pesan ini?')) {
            router.delete(`/admin/contact/messages/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout currentPage="contact">
            <Head title="Kelola Halaman Contact" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-black text-[#0f2b5c]">Manajemen Halaman Contact Us</h1>
                    <p className="text-xs text-slate-500 mt-1">Kelola banner, kartu kontak, informasi lokasi, serta pesan masuk dari pengunjung.</p>
                </div>

                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold shadow-sm">
                        {flash.success}
                    </div>
                )}

                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
                    {[
                        { id: 'hero', label: '1. Hero Banner' },
                        { id: 'cards', label: '2. 4 Info Cards' },
                        { id: 'info', label: '3. Lokasi & Form Section' },
                        { id: 'messages', label: `4. Pesan Masuk (${messages.length})` },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                activeTab === tab.id
                                    ? 'bg-[#0f2b5c] text-white shadow-md'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB 1: HERO */}
                {activeTab === 'hero' && (
                    <form onSubmit={handleSaveHero} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                            <h2 className="text-base font-bold text-slate-800">Kelola Hero Banner Contact</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Atas</label>
                                <input type="text" value={heroData.badge_text} onChange={e => setHeroData({ ...heroData, badge_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 1</label>
                                <input type="text" value={heroData.title_part1} onChange={e => setHeroData({ ...heroData, title_part1: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 2 (Kuning)</label>
                                <input type="text" value={heroData.title_part2} onChange={e => setHeroData({ ...heroData, title_part2: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Hero</label>
                            <textarea rows="3" value={heroData.description} onChange={e => setHeroData({ ...heroData, description: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Tombol 1 & Link</label>
                                <input type="text" value={heroData.button1_text} onChange={e => setHeroData({ ...heroData, button1_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none mb-2" required />
                                <input type="text" value={heroData.button1_link} onChange={e => setHeroData({ ...heroData, button1_link: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" placeholder="Link / #href" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Tombol 2 & Link</label>
                                <input type="text" value={heroData.button2_text} onChange={e => setHeroData({ ...heroData, button2_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none mb-2" required />
                                <input type="text" value={heroData.button2_link} onChange={e => setHeroData({ ...heroData, button2_link: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" placeholder="Link / #href" required />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                Simpan Perubahan Hero
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 2: 4 INFO CARDS */}
                {activeTab === 'cards' && (
                    <form onSubmit={handleSaveCards} className="space-y-6">
                        <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div>
                                <h2 className="text-base font-black text-[#0b2348]">Kelola 4 Kartu Informasi Kontak & Gambar</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Ubah judul, sub-judul keterangan, detail kontak, serta gambar latar kartu.</p>
                            </div>
                            <button type="submit" className="bg-[#0f2b5c] hover:bg-[#ffc107] hover:text-[#0b2348] text-white px-6 py-3 rounded-xl text-xs font-black transition shadow-md cursor-pointer">
                                Simpan Semua Kartu →
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cardsData.map((card, idx) => (
                                <div key={card.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black text-amber-600">CARD {card.card_number || `0${idx + 1}`}</span>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Judul Card</label>
                                        <input type="text" value={card.title || ''} onChange={e => handleCardChange(idx, 'title', e.target.value)} className="w-full border rounded-lg p-2 text-xs outline-none font-bold" required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Sub-Judul / Keterangan</label>
                                        <input type="text" value={card.subtitle || ''} onChange={e => handleCardChange(idx, 'subtitle', e.target.value)} className="w-full border rounded-lg p-2 text-xs outline-none" required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Detail Kontak (No Telp / Email)</label>
                                        <input type="text" value={card.detail || ''} onChange={e => handleCardChange(idx, 'detail', e.target.value)} className="w-full border rounded-lg p-2 text-xs outline-none font-bold text-[#0f2b5c]" required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Upload Gambar Card</label>
                                        {card.image && (
                                            <div className="mb-2">
                                                <img src={card.image} alt="Preview" className="w-24 h-14 object-cover rounded-lg border" />
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={e => {
                                                const updated = [...cardsData];
                                                updated[idx]['imageFile'] = e.target.files[0];
                                                setCardsData(updated);
                                            }} 
                                            className="w-full border rounded-lg p-1.5 text-[10px] bg-slate-50 outline-none file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-[#0f2b5c] file:text-white cursor-pointer" 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </form>
                )}

                {/* TAB 3: INFO SECTION & MAPS */}
                {activeTab === 'info' && (
                    <form onSubmit={handleSaveInfo} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                            <h2 className="text-base font-bold text-slate-800">Kelola Lokasi & Informasi QR/Maps</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Atas Form</label>
                                <input type="text" value={infoData.badge_text} onChange={e => setInfoData({ ...infoData, badge_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 1</label>
                                <input type="text" value={infoData.title_part1} onChange={e => setInfoData({ ...infoData, title_part1: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 2 (Kuning)</label>
                                <input type="text" value={infoData.title_part2} onChange={e => setInfoData({ ...infoData, title_part2: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Form</label>
                            <textarea rows="2" value={infoData.description} onChange={e => setInfoData({ ...infoData, description: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Alamat Kantor / Warehouse</label>
                                <textarea rows="3" value={infoData.address} onChange={e => setInfoData({ ...infoData, address: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Link Google Maps (Tombol "Buka di Maps")</label>
                                <input type="text" value={infoData.maps_link} onChange={e => setInfoData({ ...infoData, maps_link: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Kartu QR Code</label>
                                <input type="text" value={infoData.qr_title} onChange={e => setInfoData({ ...infoData, qr_title: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Sub-Judul / Keterangan QR Code</label>
                                <input type="text" value={infoData.qr_subtitle} onChange={e => setInfoData({ ...infoData, qr_subtitle: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Link / Data yang Disematkan ke QR Code</label>
                            <input type="text" value={infoData.qr_data} onChange={e => setInfoData({ ...infoData, qr_data: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none font-bold text-[#0f2b5c]" placeholder="https://..." required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Upload Gambar QR Code Kustom</label>
                            {infoData.qr_image && (
                                <div className="mb-2">
                                    <img src={infoData.qr_image} alt="Preview QR" className="w-20 h-20 object-contain rounded-lg border bg-white p-1" />
                                </div>
                            )}
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={e => setInfoData({ ...infoData, qrImageFile: e.target.files[0] })} 
                                className="w-full border rounded-lg p-1.5 text-[10px] bg-slate-50 outline-none file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-[#0f2b5c] file:text-white cursor-pointer" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Email Tujuan Penerima Pesan (Notifikasi)</label>
                            <input type="email" value={infoData.notification_email} onChange={e => setInfoData({ ...infoData, notification_email: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none font-bold text-[#0f2b5c]" placeholder="admin@servistamapro.co.id" />
                        </div>
                        <div>
                            <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                Simpan Perubahan Lokasi & Email Notifikasi
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 4: PESAN MASUK */}
                {activeTab === 'messages' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700 uppercase tracking-wider">Daftar Pesan Masuk dari Pengunjung</div>
                        <table className="min-w-full divide-y divide-slate-100 text-xs">
                            <thead className="bg-slate-50 text-slate-500">
                                <tr>
                                    <th className="px-6 py-3 text-left font-bold">Pengirim</th>
                                    <th className="px-6 py-3 text-left font-bold">Kontak</th>
                                    <th className="px-6 py-3 text-left font-bold">Subjek & Pesan</th>
                                    <th className="px-6 py-3 text-left font-bold">Waktu</th>
                                    <th className="px-6 py-3 text-right font-bold">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {messages.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-slate-400 font-medium">Belum ada pesan masuk.</td>
                                    </tr>
                                ) : (
                                    messages.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-slate-50/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-800">{msg.name}</div>
                                                <div className="text-[10px] text-slate-400">{msg.email}</div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-600">{msg.phone}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-extrabold text-[#0f2b5c]">{msg.subject}</div>
                                                <div className="text-slate-600 mt-0.5 max-w-sm">{msg.message}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">{new Date(msg.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer">Hapus</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}