import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ServicesManager({ categories }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        if (categories && categories.length > 0 && !selectedCategoryId) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [categories]);

    const [editingServiceId, setEditingServiceId] = useState(null);

    const serviceForm = useForm({
        service_category_id: '',
        title: '',
        description: '',
        what_we_do: '',
        key_benefits: '',
    });

    useEffect(() => {
        if (selectedCategoryId) {
            serviceForm.setData('service_category_id', selectedCategoryId);
        }
    }, [selectedCategoryId]);

    const handleServiceSubmit = (e) => {
        e.preventDefault();

        const processedData = {
            title: serviceForm.data.title,
            description: serviceForm.data.description,
            service_category_id: Number(selectedCategoryId),
            what_we_do: serviceForm.data.what_we_do 
                ? serviceForm.data.what_we_do.split('\n').map(item => item.trim()).filter(Boolean) 
                : [],
            key_benefits: serviceForm.data.key_benefits 
                ? serviceForm.data.key_benefits.split('\n').map(item => item.trim()).filter(Boolean) 
                : [],
        };

        if (editingServiceId) {
            router.put(`/admin/services/${editingServiceId}`, processedData, {
                onSuccess: () => {
                    alert('Sub-layanan berhasil diperbarui!');
                    serviceForm.reset();
                    setEditingServiceId(null);
                    serviceForm.setData('service_category_id', selectedCategoryId);
                },
                onError: (errors) => {
                    console.log(errors);
                    alert('Gagal memperbarui sub-layanan. Periksa kembali inputan Anda.');
                }
            });
        } else {
            router.post('/admin/services', processedData, {
                onSuccess: () => {
                    alert('Sub-layanan berhasil ditambahkan!');
                    serviceForm.reset();
                    serviceForm.setData('service_category_id', selectedCategoryId);
                },
                onError: (errors) => {
                    console.log(errors);
                    alert('Gagal menambahkan sub-layanan. Periksa kembali inputan Anda.');
                }
            });
        }
    };

    const handleEdit = (item) => {
        setEditingServiceId(item.id);
        setSelectedCategoryId(item.service_category_id);
        serviceForm.setData({
            service_category_id: item.service_category_id,
            title: item.title || '',
            description: item.description || '',
            what_we_do: Array.isArray(item.what_we_do) ? item.what_we_do.join('\n') : (item.what_we_do || ''),
            key_benefits: Array.isArray(item.key_benefits) ? item.key_benefits.join('\n') : (item.key_benefits || ''),
        });
    };

    const activeCategory = categories?.find(c => c.id === Number(selectedCategoryId)) || categories?.[0];

    return (
        <AdminLayout currentPage="services">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
                <div>
                    <h2 className="text-2xl font-black text-[#0f2b5c]">Kelola Layanan & Sub-Layanan</h2>
                    <p className="text-xs text-slate-500 mt-1">Pilih kategori utama di bawah, lalu masukkan rincian sub-layanan sesuai dengan struktur modul perusahaan.</p>
                </div>

                {/* Pilih Kategori Utama (Dropdown Select & Tombol Tab Kategori) */}
                <div className="space-y-3">
                    <label className="block text-xs font-bold text-[#0f2b5c]">Pilih Kategori Layanan Utama</label>
                    <select
                        value={selectedCategoryId}
                        onChange={(e) => {
                            setSelectedCategoryId(e.target.value);
                            setEditingServiceId(null);
                            serviceForm.reset();
                            serviceForm.setData('service_category_id', e.target.value);
                        }}
                        className="w-full md:w-1/3 border border-slate-300 p-3 rounded-xl text-xs font-bold bg-white text-[#0f2b5c] shadow-xs focus:ring-2 focus:ring-[#0f2b5c] focus:outline-none"
                    >
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name} ({cat.services?.length || 0} Sub-Layanan)
                            </option>
                        ))}
                    </select>

                    {/* Quick Tab Kategori */}
                    <div className="flex gap-2 overflow-x-auto pb-2 pt-1 border-b border-slate-100">
                        {categories?.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                    setSelectedCategoryId(cat.id);
                                    setEditingServiceId(null);
                                    serviceForm.reset();
                                    serviceForm.setData('service_category_id', cat.id);
                                }}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                    Number(selectedCategoryId) === cat.id
                                        ? 'bg-[#0f2b5c] text-white shadow'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Tambah / Edit Sub-Layanan */}
                <form onSubmit={handleServiceSubmit} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <div>
                            <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">Kategori Aktif:</span>
                            <h3 className="font-extrabold text-sm text-[#0f2b5c]">
                                {activeCategory?.name || 'Pilih Kategori'}
                            </h3>
                        </div>
                        {editingServiceId && (
                            <button
                                type="button"
                                onClick={() => { 
                                    setEditingServiceId(null); 
                                    serviceForm.reset(); 
                                    serviceForm.setData('service_category_id', selectedCategoryId);
                                }}
                                className="text-[10px] text-red-500 font-bold hover:underline"
                            >
                                Batal Edit
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Sub-Layanan</label>
                            <input
                                type="text"
                                value={serviceForm.data.title}
                                onChange={e => serviceForm.setData('title', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                placeholder="Cth: Preventive Maintenance, Corrective Maintenance, dll."
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Sub-Layanan</label>
                            <textarea
                                value={serviceForm.data.description}
                                onChange={e => serviceForm.setData('description', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                rows="3"
                                placeholder="Penjelasan lengkap mengenai sub-layanan..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">What We Do (1 baris = 1 poin)</label>
                            <textarea
                                value={serviceForm.data.what_we_do}
                                onChange={e => serviceForm.setData('what_we_do', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                rows="4"
                                placeholder="Inspeksi Komponen&#10;Penggantian Fluid & Filter"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Key Benefits (1 baris = 1 poin)</label>
                            <textarea
                                value={serviceForm.data.key_benefits}
                                onChange={e => serviceForm.setData('key_benefits', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                rows="4"
                                placeholder="Meningkatkan reliability unit&#10;Memperpanjang usia komponen"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={serviceForm.processing}
                        className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition"
                    >
                        {serviceForm.processing ? 'Menyimpan...' : (editingServiceId ? 'Perbarui Sub-Layanan' : '+ Tambah Sub-Layanan ke Kategori Ini')}
                    </button>
                </form>

                {/* List Sub-Layanan Aktif */}
                <div className="space-y-3">
                    <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Sub-Layanan di Kategori: {activeCategory?.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeCategory?.services && activeCategory.services.length > 0 ? (
                            activeCategory.services.map((item) => (
                                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                                    <div>
                                        <p className="text-xs font-bold text-[#0f2b5c]">{item.title}</p>
                                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(item)}
                                            className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Yakin ingin menghapus sub-layanan ini?')) {
                                                    router.delete(`/admin/services/${item.id}`, {
                                                        onSuccess: () => alert('Sub-layanan berhasil dihapus!'),
                                                    });
                                                }
                                            }}
                                            className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 py-8 text-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
                                Belum ada sub-layanan pada kategori ini. Silakan tambahkan melalui form di atas.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}