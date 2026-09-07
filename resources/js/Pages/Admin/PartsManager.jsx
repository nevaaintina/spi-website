import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function PartsManager({ spare_parts, exploded_views, spare_setting }) {
  const catalogFileForm = useForm({ catalog_file: null });
  const explodedViewForm = useForm({ system_name: '', image: null });
  const sparePartForm = useForm({ code: '', name: '', category: 'Hydraulic System', unit: '', spec: '', image: null });
  
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

  const handleSparePartSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('code', sparePartForm.data.code);
    formData.append('name', sparePartForm.data.name);
    formData.append('category', sparePartForm.data.category);
    formData.append('unit', sparePartForm.data.unit || '');
    formData.append('spec', sparePartForm.data.spec || '');

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
      code: item.code,
      name: item.name,
      category: item.category,
      unit: item.unit || '',
      spec: item.spec || '',
      image: null,
    });
  };

  return (
    <AdminLayout currentPage="parts-manager">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-[#0f2b5c]">Kelola Spare Parts, Exploded View & Katalog</h2>
          <p className="text-xs text-slate-500 mt-1">Halaman manajemen khusus untuk mengontrol seluruh data suku cadang dan file unduhan publik.</p>
        </div>

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

        {/* 2. UPLOAD EXPLODED VIEW */}
        <form onSubmit={handleExplodedViewSubmit} className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 space-y-3">
          <h3 className="font-bold text-xs text-[#0f2b5c]">Tambah Gambar Diagram Exploded View Baru</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Sistem / Assembly</label>
              <input 
                type="text" 
                value={explodedViewForm.data.system_name} 
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
          </div>
        </form>

        {/* 3. FORM CRUD SPARE PARTS */}
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
              <input type="text" value={sparePartForm.data.code} onChange={e => sparePartForm.setData('code', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white font-mono" placeholder="Cth: XCMG-HYD-092" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Component</label>
              <input type="text" value={sparePartForm.data.name} onChange={e => sparePartForm.setData('name', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Hydraulic Pump Assembly" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Kategori</label>
              <select value={sparePartForm.data.category} onChange={e => sparePartForm.setData('category', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required>
                <option value="Hydraulic System">Hydraulic System</option>
                <option value="Filters & Maintenance">Filters & Maintenance</option>
                <option value="Undercarriage">Undercarriage</option>
                <option value="Engine Parts">Engine Parts</option>
                <option value="Electrical System">Electrical System</option>
                <option value="Transmission & Brake">Transmission & Brake</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Compatible Unit</label>
              <input type="text" value={sparePartForm.data.unit} onChange={e => sparePartForm.setData('unit', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Excavator XE210" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Foto Suku Cadang</label>
              <input type="file" accept="image/*" onChange={e => sparePartForm.setData('image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Spesifikasi Singkat</label>
              <input type="text" value={sparePartForm.data.spec} onChange={e => sparePartForm.setData('spec', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Keterangan spesifikasi..." />
            </div>
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