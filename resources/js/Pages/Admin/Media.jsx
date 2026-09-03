import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminMedia({ mediaItems, statistics, hero }) {
  const [activeTab, setActiveTab] = useState('media');

  // 1. Form Upload Media Baru
  const mediaForm = useForm({
    title: '',
    category: 'Photo Gallery',
    type: 'image',
    file: null,
    description: '',
  });

  const handleMediaSubmit = (e) => {
    e.preventDefault();
    mediaForm.post('/admin/media', {
      forceFormData: true,
      onSuccess: () => {
        alert('Media baru berhasil diunggah!');
        mediaForm.reset();
      },
      onError: (errors) => {
        console.log(errors);
        alert('Gagal mengunggah media. Pastikan format file sesuai.');
      }
    });
  };

  const handleDeleteMedia = (id) => {
    if (confirm('Yakin ingin menghapus media ini?')) {
      router.delete(`/admin/media/${id}`, {
        onSuccess: () => alert('Media berhasil dihapus!'),
      });
    }
  };

  // 2. Form Edit Hero Media
  const heroForm = useForm({
    title: hero?.title || '',
    description: hero?.description || '',
  });

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    heroForm.put('/admin/media-hero', {
      onSuccess: () => alert('Hero media berhasil diperbarui!'),
    });
  };

  return (
    <AdminLayout currentPage="media">
      
      {/* Sub-Navigasi Tab Admin */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 mb-6">
        {[
          { id: 'media', label: '1. Kelola Galeri Media' },
          { id: 'hero', label: '2. Edit Hero Banner' },
          { id: 'stats', label: '3. Edit Statistik Media' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === tab.id ? 'bg-[#0f2b5c] text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: KELOLA MEDIA & UPLOAD */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          
          {/* Form Upload */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-black text-[#0f2b5c] mb-4">Unggah Foto atau Video Baru</h2>
            
            <form onSubmit={handleMediaSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Judul / Keterangan Singkat</label>
                  <input 
                    type="text" 
                    value={mediaForm.data.title} 
                    onChange={e => mediaForm.setData('title', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                    placeholder="Contoh: Aktivitas Tambang XCMG" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Pilih Kategori</label>
                  <select 
                    value={mediaForm.data.category} 
                    onChange={e => mediaForm.setData('category', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50"
                  >
                    <option value="Photo Gallery">Photo Gallery</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Mining Site">Mining Site</option>
                    <option value="Customer Visit">Customer Visit</option>
                    <option value="Training">Training</option>
                    <option value="CSR">CSR</option>
                    <option value="Company Event">Company Event</option>
                    <option value="Drone Video">Drone Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Tipe Media</label>
                  <select 
                    value={mediaForm.data.type} 
                    onChange={e => mediaForm.setData('type', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50"
                  >
                    <option value="image">Foto (Image)</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Pilih File (Foto / Video)</label>
                <input 
                  type="file" 
                  onChange={e => mediaForm.setData('file', e.target.files[0])} 
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-xs bg-slate-50" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Tambahan (Opsional)</label>
                <textarea 
                  rows="2" 
                  value={mediaForm.data.description} 
                  onChange={e => mediaForm.setData('description', e.target.value)} 
                  className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                  placeholder="Keterangan lengkap..." 
                />
              </div>

              <button type="submit" disabled={mediaForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
                {mediaForm.processing ? 'Mengunggah...' : 'Unggah Media'}
              </button>
            </form>
          </div>

          {/* Daftar Media Aktif */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-sm text-[#0f2b5c] mb-4">Daftar Media Tersimpan ({mediaItems.length})</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems && mediaItems.map((item) => (
                <div key={item.id} className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
                  <div className="h-36 w-full overflow-hidden bg-slate-900">
                    {item.type === 'video' ? (
                      <video src={`/${item.file_path}`} className="h-full w-full object-cover" muted />
                    ) : (
                      <img src={`/${item.file_path}`} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
                    )}
                  </div>
                  <div className="p-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <p className="text-xs font-bold text-[#0f2b5c] mt-1.5 truncate">{item.title || 'Tanpa Judul'}</p>
                    <button 
                      type="button" 
                      onClick={() => handleDeleteMedia(item.id)} 
                      className="mt-3 w-full py-1.5 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-xl transition"
                    >
                      Hapus Media
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EDIT HERO BANNER */}
      {activeTab === 'hero' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-black text-[#0f2b5c] mb-6">Kelola Hero Banner Media Gallery</h2>
          
          <form onSubmit={handleHeroSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama Hero</label>
              <input 
                type="text" 
                value={heroForm.data.title} 
                onChange={e => heroForm.setData('title', e.target.value)} 
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Hero</label>
              <textarea 
                rows="3" 
                value={heroForm.data.description} 
                onChange={e => heroForm.setData('description', e.target.value)} 
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" 
                required 
              />
            </div>

            <button type="submit" disabled={heroForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {heroForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Hero'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: EDIT STATISTIK MEDIA */}
      {activeTab === 'stats' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-black text-[#0f2b5c] mb-6">Kelola Statistik Media Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statistics && statistics.map((stat) => (
              <StatEditCard key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      )}

    </AdminLayout>
  );
}

// Komponen Pendukung untuk Edit Statistik
function StatEditCard({ stat }) {
  const form = useForm({
    value: stat.value,
    label: stat.label,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.put(`/admin/media-statistics/${stat.id}`, {
      onSuccess: () => alert('Statistik berhasil diperbarui!'),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
      <div>
        <label className="block text-[10px] font-bold text-slate-600 mb-1">Label Statistik</label>
        <input type="text" value={form.data.label} onChange={e => form.setData('label', e.target.value)} className="w-full border p-2 rounded-xl text-xs bg-white" required />
      </div>
      <div>
        <label className="block text-[10px] font-bold text-slate-600 mb-1">Nilai / Angka</label>
        <input type="text" value={form.data.value} onChange={e => form.setData('value', e.target.value)} className="w-full border p-2 rounded-xl text-xs bg-white" required />
      </div>
      <button type="submit" disabled={form.processing} className="px-4 py-2 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
        Perbarui Statistik
      </button>
    </form>
  );
}