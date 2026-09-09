import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ProductsManager({ categories = [], products = [], product_setting = null }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        if (categories && categories.length > 0 && !selectedCategoryId) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [categories]);

    const [editingProductId, setEditingProductId] = useState(null);

    // 1. FORM PENGATURAN HERO BANNER & KATALOG PDF
    const contentForm = useForm({
        hero_title_part1: product_setting?.hero_title_part1 || 'Solusi Alat Berat &',
        hero_title_part2: product_setting?.hero_title_part2 || 'Suku Cadang XCMG',
        hero_description: product_setting?.hero_description || 'Temukan berbagai lini produk berkualitas tinggi untuk mendukung efisiensi dan produktivitas proyek konstruksi serta pertambangan Anda.',
        hero_image: null,
        catalog_pdf: null,
    });

    // 2. FORM CRUD PRODUK LENGKAP
    const productForm = useForm({
        product_category_id: '',
        name: '',
        description: '',
        overview: '',
        image: null,
        gallery_images: [],
        brochure_file: null,
        video_type: 'url',
        video_url: '',
        video_file: null,
        specifications: [{ label: '', value: '' }],
        key_features: [''],
    });

    useEffect(() => {
        if (selectedCategoryId) {
            productForm.setData('product_category_id', selectedCategoryId);
        }
    }, [selectedCategoryId]);

    const handleContentSubmit = (e) => {
        e.preventDefault();
        contentForm.post('/admin/products-content', {
            forceFormData: true,
            onSuccess: () => alert('Pengaturan Hero Banner & Katalog PDF berhasil diperbarui!'),
            onError: (err) => console.log(err)
        });
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...productForm.data.specifications];
        newSpecs[index][field] = value;
        productForm.setData('specifications', newSpecs);
    };

    const addSpecRow = () => {
        productForm.setData('specifications', [...productForm.data.specifications, { label: '', value: '' }]);
    };

    const removeSpecRow = (index) => {
        const newSpecs = productForm.data.specifications.filter((_, i) => i !== index);
        productForm.setData('specifications', newSpecs);
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...productForm.data.key_features];
        newFeatures[index] = value;
        productForm.setData('key_features', newFeatures);
    };

    const addFeatureRow = () => {
        productForm.setData('key_features', [...productForm.data.key_features, '']);
    };

    const removeFeatureRow = (index) => {
        const newFeatures = productForm.data.key_features.filter((_, i) => i !== index);
        productForm.setData('key_features', newFeatures);
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();

        if (editingProductId) {
            productForm.post(`/admin/products/${editingProductId}`, {
                forceFormData: true,
                onSuccess: () => {
                    alert('Produk berhasil diperbarui!');
                    productForm.reset();
                    setEditingProductId(null);
                    productForm.setData('product_category_id', selectedCategoryId);
                },
                onError: (err) => console.log(err)
            });
        } else {
            productForm.post('/admin/products', {
                forceFormData: true,
                onSuccess: () => {
                    alert('Produk berhasil ditambahkan!');
                    productForm.reset();
                    productForm.setData('product_category_id', selectedCategoryId);
                },
                onError: (err) => console.log(err)
            });
        }
    };

    const handleEdit = (item) => {
        setEditingProductId(item.id);
        setSelectedCategoryId(item.product_category_id);
        
        productForm.setData({
            product_category_id: item.product_category_id,
            name: item.name || '',
            description: item.description || '',
            overview: item.overview || '',
            image: null,
            gallery_images: [],
            brochure_file: null,
            video_type: item.video_file || (item.video_url && !item.video_url.includes('embed')) ? 'upload' : 'url',
            video_url: item.video_url || '',
            video_file: null,
            specifications: item.specifications && item.specifications.length > 0 ? item.specifications : [{ label: '', value: '' }],
            key_features: item.key_features && item.key_features.length > 0 ? item.key_features : [''],
        });
    };

    const activeCategory = categories?.find(c => c.id === Number(selectedCategoryId)) || categories?.[0];
    const filteredProducts = products.filter(p => p.product_category_id === Number(selectedCategoryId));

    return (
        <AdminLayout currentPage="products">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
                <div>
                    <h2 className="text-2xl font-black text-[#0f2b5c]">Kelola Katalog Produk, Hero Banner & Kategori</h2>
                    <p className="text-xs text-slate-500 mt-1">Kelola konten halaman utama produk, tambah produk baru dengan galeri foto multi-pilih, spesifikasi, dan video.</p>
                </div>

                {/* FORM PENGATURAN HERO BANNER */}
                <form onSubmit={handleContentSubmit} className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4">
                    <h3 className="font-bold text-xs text-[#0f2b5c]">Pengaturan Hero Banner & Download Katalog Publik Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul Hero Bagian 1 (Normal)</label>
                            <input type="text" value={contentForm.data.hero_title_part1} onChange={e => contentForm.setData('hero_title_part1', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul Hero Bagian 2 (Kuning/XCMG)</label>
                            <input type="text" value={contentForm.data.hero_title_part2} onChange={e => contentForm.setData('hero_title_part2', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Hero Banner</label>
                            <textarea value={contentForm.data.hero_description} onChange={e => contentForm.setData('hero_description', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" rows="2" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Background Foto Hero Banner</label>
                            <input type="file" accept="image/*" onChange={e => contentForm.setData('hero_image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">File PDF Katalog Tombol Download</label>
                            <input type="file" accept=".pdf" onChange={e => contentForm.setData('catalog_pdf', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
                        </div>
                    </div>
                    <button type="submit" disabled={contentForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow cursor-pointer">
                        {contentForm.processing ? 'Menyimpan...' : 'Simpan Pengaturan Hero & Katalog PDF'}
                    </button>
                </form>

                {/* Pilih Kategori Utama */}
                <div className="space-y-3">
                    <label className="block text-xs font-bold text-[#0f2b5c]">Pilih Kategori Produk Utama</label>
                    <select
                        value={selectedCategoryId}
                        onChange={(e) => {
                            setSelectedCategoryId(e.target.value);
                            setEditingProductId(null);
                            productForm.reset();
                            productForm.setData('product_category_id', e.target.value);
                        }}
                        className="w-full md:w-1/3 border border-slate-300 p-3 rounded-xl text-xs font-bold bg-white text-[#0f2b5c] shadow-xs focus:ring-2 focus:ring-[#0f2b5c] focus:outline-none"
                    >
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name} ({products.filter(p => p.product_category_id === cat.id).length} Produk)
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-2 overflow-x-auto pb-2 pt-1 border-b border-slate-100">
                        {categories?.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                    setSelectedCategoryId(cat.id);
                                    setEditingProductId(null);
                                    productForm.reset();
                                    productForm.setData('product_category_id', cat.id);
                                }}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
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

                {/* FORM TAMBAH / EDIT PRODUK */}
                <form onSubmit={handleProductSubmit} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <div>
                            <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">Kategori Aktif:</span>
                            <h3 className="font-extrabold text-sm text-[#0f2b5c]">
                                {activeCategory?.name || 'Pilih Kategori'}
                            </h3>
                        </div>
                        {editingProductId && (
                            <button
                                type="button"
                                onClick={() => { 
                                    setEditingProductId(null); 
                                    productForm.reset(); 
                                    productForm.setData('product_category_id', selectedCategoryId);
                                }}
                                className="text-[10px] text-red-500 font-bold hover:underline cursor-pointer"
                            >
                                Batal Edit
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Produk / Model</label>
                            <input
                                type="text"
                                value={productForm.data.name}
                                onChange={e => productForm.setData('name', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                placeholder="Cth: Mining Excavator XE 1250"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Foto Utama Produk</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => productForm.setData('image', e.target.files[0])}
                                className="w-full border p-1.5 bg-white rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Galeri Foto Tambahan (Bisa Pilih Banyak Sekaligus)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={e => productForm.setData('gallery_images', Array.from(e.target.files))}
                                className="w-full border p-1.5 bg-white rounded-xl text-xs"
                            />
                            <span className="text-[10px] text-slate-400 mt-1 block">Tahan tombol CTRL/CMD untuk memilih beberapa foto sekaligus.</span>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">File Brosur (PDF)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={e => productForm.setData('brochure_file', e.target.files[0])}
                                className="w-full border p-1.5 bg-white rounded-xl text-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Sumber Video Demo</label>
                            <select
                                value={productForm.data.video_type}
                                onChange={e => productForm.setData('video_type', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white font-bold"
                            >
                                <option value="url">Link YouTube (URL / Embed)</option>
                                <option value="upload">Upload File Video Sendiri (MP4/MKV)</option>
                            </select>
                        </div>

                        {productForm.data.video_type === 'url' ? (
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-slate-600 mb-1">Link YouTube (Bisa URL biasa atau Embed)</label>
                                <input
                                    type="text"
                                    value={productForm.data.video_url}
                                    onChange={e => productForm.setData('video_url', e.target.value)}
                                    className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                    placeholder="Cth: https://www.youtube.com/watch?v=xxxx atau https://www.youtube.com/embed/xxxx"
                                />
                            </div>
                        ) : (
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-slate-600 mb-1">Upload File Video (Ukuran Besar/Luas)</label>
                                <input
                                    type="file"
                                    accept="video/mp4,video/mkv,video/webm"
                                    onChange={e => productForm.setData('video_file', e.target.files[0])}
                                    className="w-full border p-1.5 bg-white rounded-xl text-xs"
                                />
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Overview Singkat</label>
                            <textarea
                                value={productForm.data.overview}
                                onChange={e => productForm.setData('overview', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                rows="2"
                                placeholder="Ringkasan singkat produk..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Lengkap Produk</label>
                            <textarea
                                value={productForm.data.description}
                                onChange={e => productForm.setData('description', e.target.value)}
                                className="w-full border p-2.5 rounded-xl text-xs bg-white"
                                rows="3"
                                placeholder="Penjelasan lengkap mengenai produk..."
                            />
                        </div>
                    </div>

                    {/* Spesifikasi Teknis Dinamis */}
                    <div className="space-y-3 border-t border-slate-200 pt-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-xs font-bold text-[#0f2b5c]">Spesifikasi Teknis (Label & Nilai)</label>
                            <button type="button" onClick={addSpecRow} className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg cursor-pointer">
                                + Tambah Baris Spesifikasi
                            </button>
                        </div>
                        {productForm.data.specifications.map((spec, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Label (Cth: Berat Operasi)"
                                    value={spec.label}
                                    onChange={e => handleSpecChange(index, 'label', e.target.value)}
                                    className="w-1/2 border p-2 rounded-xl text-xs bg-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Nilai (Cth: 115.000 kg)"
                                    value={spec.value}
                                    onChange={e => handleSpecChange(index, 'value', e.target.value)}
                                    className="w-1/2 border p-2 rounded-xl text-xs bg-white"
                                />
                                {productForm.data.specifications.length > 1 && (
                                    <button type="button" onClick={() => removeSpecRow(index)} className="px-2.5 py-2 bg-red-500 text-white rounded-xl text-xs">✕</button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Fitur Unggulan Dinamis */}
                    <div className="space-y-3 border-t border-slate-200 pt-4">
                        <div className="flex justify-between items-center">
                            <label className="block text-xs font-bold text-[#0f2b5c]">Fitur Unggulan (Poin Keunggulan)</label>
                            <button type="button" onClick={addFeatureRow} className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg cursor-pointer">
                                + Tambah Poin Fitur
                            </button>
                        </div>
                        {productForm.data.key_features.map((feature, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    placeholder="Deskripsi fitur unggulan..."
                                    value={feature}
                                    onChange={e => handleFeatureChange(index, e.target.value)}
                                    className="w-full border p-2 rounded-xl text-xs bg-white"
                                />
                                {productForm.data.key_features.length > 1 && (
                                    <button type="button" onClick={() => removeFeatureRow(index)} className="px-2.5 py-2 bg-red-500 text-white rounded-xl text-xs">✕</button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={productForm.processing}
                        className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition cursor-pointer"
                    >
                        {productForm.processing ? 'Menyimpan...' : (editingProductId ? 'Perbarui Produk' : '+ Tambah Produk ke Kategori Ini')}
                    </button>
                </form>

                {/* List Produk Aktif */}
                <div className="space-y-3">
                    <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Produk di Kategori: {activeCategory?.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredProducts && filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={item.image ? `/${item.image}` : 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=200&q=80'} 
                                            alt={item.name} 
                                            className="w-12 h-12 rounded-xl object-cover border" 
                                        />
                                        <div>
                                            <p className="text-xs font-bold text-[#0f2b5c]">{item.name}</p>
                                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{item.overview || item.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(item)}
                                            className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Yakin ingin menghapus produk ini?')) {
                                                    router.delete(`/admin/products/${item.id}`, {
                                                        onSuccess: () => alert('Produk berhasil dihapus!'),
                                                    });
                                                }
                                            }}
                                            className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition cursor-pointer"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 py-8 text-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
                                Belum ada produk pada kategori ini. Silakan tambahkan melalui form di atas.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}