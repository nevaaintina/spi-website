import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminKnowledgeIndex({ articles, hero }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Form untuk Artikel
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        image: null,
        read_time: '5 Menit',
        is_featured: false,
    });

    // Form khusus untuk Hero Banner (Termasuk 2 Kotak Badge Statistik)
    const heroForm = useForm({
        title: hero?.title || '',
        subtitle: hero?.subtitle || '',
        description: hero?.description || '',
        stat_number: hero?.stat_number || '500+',
        stat_label: hero?.stat_label || 'Technical Articles',
        stat_box_title: hero?.stat_box_title || 'Expert',
        stat_box_subtitle: hero?.stat_box_subtitle || 'Verified Content',
        image: null,
    });

    const openModalCreate = () => {
        reset();
        clearErrors();
        setEditMode(false);
        setCurrentId(null);
        setIsModalOpen(true);
    };

    const openModalEdit = (article) => {
        clearErrors();
        setEditMode(true);
        setCurrentId(article.id);
        setData({
            title: article.title,
            category: article.category,
            excerpt: article.excerpt,
            content: article.content,
            image: null,
            read_time: article.read_time || '5 Menit',
            is_featured: Boolean(article.is_featured),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            post(`/admin/knowledge/${currentId}`, {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/knowledge', {
                forceFormData: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleUpdateHero = (e) => {
        e.preventDefault();
        heroForm.post('/admin/knowledge/hero', {
            forceFormData: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah kamu yakin ingin menghapus artikel ini?')) {
            router.delete(`/admin/knowledge/${id}`);
        }
    };

    return (
        <AdminLayout currentPage="knowledge">
            <Head title="Kelola Knowledge Center - Admin Panel" />

            <div className="mx-auto max-w-7xl space-y-8">
                
                {/* Section Form Pengaturan Hero Banner */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                    <h2 className="text-xl font-black text-[#0F2B5C] mb-1">Pengaturan Hero Banner</h2>
                    <p className="text-sm text-slate-500 mb-6">Ubah teks utama, deskripsi, gambar latar, serta teks dua kotak badge di bawah hero.</p>
                    
                    <form onSubmit={handleUpdateHero} className="space-y-4">
                        {/* 1. Judul Paling Atas */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Utama (Title)</label>
                            <input
                                type="text"
                                value={heroForm.data.title}
                                onChange={(e) => heroForm.setData('title', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500"
                                required
                            />
                        </div>

                        {/* 2. Sub Judul di Bawahnya */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sub Judul (Subtitle)</label>
                            <input
                                type="text"
                                value={heroForm.data.subtitle}
                                onChange={(e) => heroForm.setData('subtitle', e.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500"
                                required
                            />
                        </div>

                        {/* 3. Kotak 2 Kolom (Deskripsi Singkat & Ganti Gambar Background) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Singkat</label>
                                <textarea
                                    rows="3"
                                    value={heroForm.data.description}
                                    onChange={(e) => heroForm.setData('description', e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ganti Gambar Background (Excavator)</label>
                                <input
                                    type="file"
                                    onChange={(e) => heroForm.setData('image', e.target.files[0])}
                                    className="w-full rounded-xl border border-slate-300 p-2 text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                />
                            </div>
                        </div>

                        {/* 4. Pengaturan Teks 2 Kotak Badge di Bawah Hero */}
                        <div className="pt-4 border-t border-slate-200 mt-4">
                            <h3 className="text-sm font-black text-[#0F2B5C] mb-3 uppercase tracking-wider">Pengaturan 2 Kotak Badge (Statistik)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                {/* Kotak Badge 1 */}
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-slate-600">Kotak Badge 1 (Kiri)</p>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Angka / Teks Utama</label>
                                        <input
                                            type="text"
                                            value={heroForm.data.stat_number}
                                            onChange={(e) => heroForm.setData('stat_number', e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Label Keterangan</label>
                                        <input
                                            type="text"
                                            value={heroForm.data.stat_label}
                                            onChange={(e) => heroForm.setData('stat_label', e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Kotak Badge 2 */}
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-slate-600">Kotak Badge 2 (Kanan)</p>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Angka / Teks Utama</label>
                                        <input
                                            type="text"
                                            value={heroForm.data.stat_box_title}
                                            onChange={(e) => heroForm.setData('stat_box_title', e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Label Keterangan</label>
                                        <input
                                            type="text"
                                            value={heroForm.data.stat_box_subtitle}
                                            onChange={(e) => heroForm.setData('stat_box_subtitle', e.target.value)}
                                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={heroForm.processing}
                                className="bg-[#0F2B5C] text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-900 transition disabled:opacity-50 cursor-pointer shadow"
                            >
                                {heroForm.processing ? 'Menyimpan Hero...' : 'Simpan Perubahan Hero'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Header Section Tabel Artikel */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-200">
                    <div>
                        <h1 className="text-2xl font-black text-[#0F2B5C]">Kelola Knowledge Center</h1>
                        <p className="text-sm text-slate-500">Tambah, edit, atau hapus artikel teknis dan berita perusahaan.</p>
                    </div>
                    <button
                        onClick={openModalCreate}
                        className="bg-[#FFC107] text-[#0F2B5C] font-bold px-5 py-2.5 rounded-xl shadow hover:bg-amber-400 transition cursor-pointer"
                    >
                        + Tambah Artikel Baru
                    </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b">
                                    <th className="p-4">No</th>
                                    <th className="p-4">Thumbnail</th>
                                    <th className="p-4">Judul Artikel</th>
                                    <th className="p-4">Kategori</th>
                                    <th className="p-4">Featured</th>
                                    <th className="p-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {articles && articles.length > 0 ? (
                                    articles.map((art, idx) => (
                                        <tr key={art.id} className="hover:bg-slate-50/50">
                                            <td className="p-4 text-slate-500 font-semibold">{idx + 1}</td>
                                            <td className="p-4">
                                                <img
                                                    src={art.image ? `/storage/${art.image}` : '/images/c1.jpg'}
                                                    alt={art.title}
                                                    className="w-16 h-12 object-cover rounded-lg border"
                                                />
                                            </td>
                                            <td className="p-4 font-bold text-[#0F2B5C] max-w-xs truncate">{art.title}</td>
                                            <td className="p-4">
                                                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                                                    {art.category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {art.is_featured ? (
                                                    <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">Featured</span>
                                                ) : (
                                                    <span className="text-slate-400 text-xs">-</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center space-x-2">
                                                <button
                                                    onClick={() => openModalEdit(art)}
                                                    className="bg-sky-50 text-sky-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-sky-100 transition cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(art.id)}
                                                    className="bg-rose-50 text-rose-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-rose-100 transition cursor-pointer"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-slate-400">
                                            Belum ada artikel yang ditambahkan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Form Tambah / Edit Artikel */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl my-8 max-h-[85vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-[#0F2B5C] mb-4">
                            {editMode ? 'Edit Artikel Knowledge' : 'Tambah Artikel Knowledge Baru'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Artikel</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                />
                                {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Maintenance Tips"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500"
                                        required
                                    />
                                    {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estimasi Waktu Baca</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: 5 Menit"
                                        value={data.read_time}
                                        onChange={(e) => setData('read_time', e.target.value)}
                                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-amber-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ringkasan (Excerpt)</label>
                                <textarea
                                    rows="2"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                />
                                {errors.excerpt && <p className="text-rose-500 text-xs mt-1">{errors.excerpt}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Isi Konten Lengkap</label>
                                <textarea
                                    rows="5"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-amber-500 focus:ring-amber-500"
                                    required
                                />
                                {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Upload Foto Thumbnail</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="w-full rounded-xl border border-slate-300 p-2 text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                />
                                {errors.image && <p className="text-rose-500 text-xs mt-1">{errors.image}</p>}
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                                />
                                <label htmlFor="is_featured" className="text-xs font-bold text-slate-700 uppercase cursor-pointer">
                                    Jadikan Artikel Utama (Featured di Banner Besar)
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white py-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl bg-[#0F2B5C] text-white text-sm font-bold hover:bg-blue-900 transition disabled:opacity-50 cursor-pointer"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Artikel'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}