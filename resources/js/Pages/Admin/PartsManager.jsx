import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function PartsManager({ spare_parts, exploded_views, spare_setting }) {
  const catalogFileForm = useForm({ catalog_file: null });
  const explodedViewForm = useForm({ system_name: '', image: null });
  
  // FORM SPARE PART (Disesuaikan hanya Nomor Part, Nama Component, Kategori & Foto)
  const sparePartForm = useForm({ 
    code: '', 
    name: '', 
    category: 'Hydraulic System', 
    image: null 
  });

  // FORM EDIT HERO & CTA
  const contentForm = useForm({
    hero_title: spare_setting?.hero_title || 'Suku Cadang Original XCMG',
    hero_subtitle: spare_setting?.hero_subtitle || 'Temukan berbagai komponen dan suku cadang original untuk menjaga performa, keandalan, dan produktivitas alat berat Anda.',
    hero_image: null,
    cta_title: spare_setting?.cta_title || 'Butuh bantuan mencari suku cadang?',
    cta_subtitle: spare_setting?.cta_subtitle || 'Tim Servistama Pro Indonesia siap membantu Anda menemukan part yang sesuai berdasarkan kode, model unit, maupun kebutuhan teknis.',
    whatsapp_number: spare_setting?.whatsapp_number || '6281122233344',
  });
  
  const [editingSpareId, setEditingSpareId] = useState(null);

  const handleCatalogFileSubmit = (e) => {
    e.preventDefault();
    catalogFileForm.post('/admin/spare-catalog-file', {
      forceFormData: true,
      onSuccess: () => {
        alert('File dokumen katalog berhasil di-upload!');
        catalogFileForm.reset();
      },
      onError: (err) => console.log(err)
    });
  };

  const handleExplodedViewSubmit = (e) => {
    e.preventDefault();
    explodedViewForm.post('/admin/exploded-views', {
      forceFormData: true,
      onSuccess: () => {
        alert('Diagram Exploded View berhasil ditambahkan!');
        explodedViewForm.reset();
      },
      onError: (err) => console.log(err)
    });
  };

  const handleContentSubmit = (e) => {
    e.preventDefault();
    contentForm.post('/admin/spare-parts-content', {
      forceFormData: true,
      onSuccess: () => alert('Konten Hero Banner & CTA berhasil diperbarui!'),
      onError: (err) => console.log(err)
    });
  };

  const handleSparePartSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('code', sparePartForm.data.code);
    formData.append('name', sparePartForm.data.name);
    formData.append('category', sparePartForm.data.category);

    if (sparePartForm.data.image) {
      formData.append('image', sparePartForm.data.image);
    }

    if (editingSpareId) {
      formData.append('_method', 'PUT');
      router.post(`/admin/spare-parts/${editingSpareId}`, formData, {
        forceFormData: true,
        onSuccess: () => {
          alert('Suku cadang berhasil diperbarui!');
          sparePartForm.reset();
          setEditingSpareId(null);
        },
        onError: (err) => console.log(err)
      });
    } else {
      router.post('/admin/spare-parts', formData, {
        forceFormData: true,
        onSuccess: () => {
          alert('Suku cadang berhasil ditambahkan!');
          sparePartForm.reset();
        },
        onError: (err) => console.log(err)
      });
    }
  };

  const handleEditSparePart = (item) => {
    setEditingSpareId(item.id);
    sparePartForm.setData({
      code: item.code || '',
      name: item.name || '',
      category: item.category || 'Hydraulic System',
      image: null,
    });
  };

  return (
    <AdminLayout currentPage="parts-manager">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-[#0f2b5c]">Kelola Spare Parts, Exploded View & Konten</h2>
          <p className="text-xs text-slate-500 mt-1">Halaman manajemen khusus untuk mengontrol seluruh data suku cadang, file unduhan, dan teks banner publik.</p>
        </div>

        {/* 0. EDIT HERO BANNER & CTA */}
        <form onSubmit={handleContentSubmit} className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4">
          <h3 className="font-bold text-xs text-[#0f2b5c]">Pengaturan Teks Hero Banner & CTA Publik</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul Hero Banner</label>
              <input type="text" value={contentForm.data.hero_title} onChange={e => contentForm.setData('hero_title', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Background Hero Banner (Foto)</label>
              <input type="file" accept="image/*" onChange={e => contentForm.setData('hero_image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Subjudul Hero Banner</label>
              <textarea value={contentForm.data.hero_subtitle} onChange={e => contentForm.setData('hero_subtitle', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" rows="2" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul CTA Bawah</label>
              <input type="text" value={contentForm.data.cta_title} onChange={e => contentForm.setData('cta_title', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">No. WhatsApp Support (Cth: 62811...)</label>
              <input type="text" value={contentForm.data.whatsapp_number} onChange={e => contentForm.setData('whatsapp_number', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi CTA Bawah</label>
              <textarea value={contentForm.data.cta_subtitle} onChange={e => contentForm.setData('cta_subtitle', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" rows="2" required />
            </div>
          </div>
          <button type="submit" disabled={contentForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
            {contentForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Teks'}
          </button>
        </form>

        {/* 1. UPLOAD FILE KATALOG */}
        <form onSubmit={handleCatalogFileSubmit} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="font-bold text-xs text-[#0f2b5c]">Upload Dokumen File Katalog (PDF / TXT) untuk Tombol Download</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <input 
                type="file" 
                accept=".pdf,.txt,.doc,.docx"
                onChange={e => catalogFileForm.setData('catalog_file', e.target.files[0])} 
                className="w-full text-xs border p-2 bg-white rounded-xl" 
              />
              {spare_setting?.catalog_file_path && (
                <p className="text-[10px] text-emerald-600 mt-1 font-bold">
                  File aktif: {spare_setting.catalog_file_path.split('/').pop()}
                </p>
              )}
            </div>
            <div>
              <button type="submit" disabled={catalogFileForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
                {catalogFileForm.processing ? 'Meng-upload...' : 'Upload File Katalog'}
              </button>
            </div>
          </div>
        </form>

        {/* 2. UPLOAD & LIST EXPLODED VIEW */}
        <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-4">
          <h3 className="font-bold text-xs text-[#0f2b5c]">Kelola Diagram Exploded View</h3>
          <form onSubmit={handleExplodedViewSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Sistem / Assembly</label>
              <input 
                type="text" 
                value={explodedViewForm.data.system_name || ''} 
                onChange={e => explodedViewForm.setData('system_name', e.target.value)} 
                className="w-full border p-2.5 rounded-xl text-xs bg-white" 
                placeholder="Cth: Hydraulic System Assembly" 
                required 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">File Gambar Diagram</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => explodedViewForm.setData('image', e.target.files[0])} 
                className="w-full border p-1.5 bg-white rounded-xl text-xs" 
                required 
              />
            </div>
            <div className="flex items-end">
              <button type="submit" disabled={explodedViewForm.processing} className="w-full py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
                Tambah Diagram
              </button>
            </div>
          </form>

          {/* List Exploded View Aktif */}
          <div className="mt-4 space-y-2">
            <p className="text-[11px] font-bold text-slate-600">Daftar Diagram Terunggah:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exploded_views && exploded_views.map((ev) => (
                <div key={ev.id} className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <img src={`/${ev.image_path}`} alt={ev.system_name} className="w-10 h-10 object-cover rounded-lg border" />
                    <div>
                      <p className="text-xs font-bold text-[#0f2b5c]">{ev.system_name}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => {
                    if (confirm('Yakin ingin menghapus diagram ini?')) {
                      router.delete(`/admin/exploded-views/${ev.id}`, { onSuccess: () => alert('Diagram berhasil dihapus!') });
                    }
                  }} className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-lg">Hapus</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. FORM CRUD SPARE PARTS (Hanya Nomor Part, Nama Component, Kategori & Foto) */}
        <form onSubmit={handleSparePartSubmit} className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xs text-[#0f2b5c]">
              {editingSpareId ? 'Edit Data Suku Cadang' : 'Tambah Suku Cadang Baru'}
            </h3>
            {editingSpareId && (
              <button type="button" onClick={() => { setEditingSpareId(null); sparePartForm.reset(); }} className="text-[10px] text-red-500 font-bold hover:underline">
                Batal Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Nomor Part / Part No.</label>
              <input type="text" value={sparePartForm.data.code || ''} onChange={e => sparePartForm.setData('code', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white font-mono" placeholder="Cth: XCMG-HYD-092" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Component</label>
              <input type="text" value={sparePartForm.data.name || ''} onChange={e => sparePartForm.setData('name', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Hydraulic Pump Assembly" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Kategori</label>
              <select value={sparePartForm.data.category || 'Hydraulic System'} onChange={e => sparePartForm.setData('category', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required>
                <option value="Hydraulic System">Hydraulic System</option>
                <option value="Filters & Maintenance">Filters & Maintenance</option>
                <option value="Undercarriage">Undercarriage</option>
                <option value="Engine Parts">Engine Parts</option>
                <option value="Electrical System">Electrical System</option>
                <option value="Transmission & Brake">Transmission & Brake</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Foto Suku Cadang</label>
            <input type="file" accept="image/*" onChange={e => sparePartForm.setData('image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs md:w-1/2" />
          </div>

          <button type="submit" disabled={sparePartForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
            {sparePartForm.processing ? 'Menyimpan...' : (editingSpareId ? 'Perbarui Suku Cadang' : 'Tambah Suku Cadang')}
          </button>
        </form>

        {/* LIST DATA */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Suku Cadang Aktif</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {spare_parts && spare_parts.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                <div className="flex items-center gap-3">
                  <img src={item.image_path ? `/${item.image_path}` : 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=200&q=80'} alt={item.name} className="w-12 h-12 rounded-xl object-cover border" />
                  <div>
                    <p className="text-xs font-bold text-[#0f2b5c] font-mono">{item.code}</p>
                    <p className="text-xs text-slate-700 font-medium">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEditSparePart(item)} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg">Edit</button>
                  <button type="button" onClick={() => {
                    if (confirm('Yakin ingin menghapus item ini?')) {
                      router.delete(`/admin/spare-parts/${item.id}`, { onSuccess: () => alert('Berhasil dihapus!') });
                    }
                  }} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}