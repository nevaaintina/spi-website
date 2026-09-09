import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminMedia({ mediaItems, droneVideos = [], statistics, hero }) {
  const [activeTab, setActiveTab] = useState('media');

  // 1. Form Upload Media Baru (Dengan field position & display_style)
  const mediaForm = useForm({
    title: '',
    category: 'Photo Gallery',
    type: 'image',
    file: null,
    description: '',
    position: 0,
    display_style: 'cover',
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
    subtitle: hero?.subtitle || '',
    description: hero?.description || '',
    background_image: null,
  });

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    heroForm.post('/admin/media-hero', {
      forceFormData: true,
      onSuccess: () => alert('Hero media berhasil diperbarui!'),
      onError: (errors) => console.log(errors)
    });
  };

  // 3. Form Upload Drone Video Highlight
  const droneForm = useForm({
    title: '',
    subtitle: '',
    duration: '',
    thumbnail: null,
    video_url: '',
  });

  const handleDroneSubmit = (e) => {
    e.preventDefault();
    droneForm.post('/admin/drone-videos', {
      forceFormData: true,
      onSuccess: () => {
        alert('Drone video berhasil ditambahkan!');
        droneForm.reset();
      },
      onError: (errors) => console.log(errors)
    });
  };

  const handleDeleteDrone = (id) => {
    if (confirm('Yakin ingin menghapus drone video ini?')) {
      router.delete(`/admin/drone-videos/${id}`, {
        onSuccess: () => alert('Drone video berhasil dihapus!'),
      });
    }
  };

  return (
    <AdminLayout currentPage="media">
      
      {/* Sub-Navigasi Tab Admin */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 mb-6">
        {[
          { id: 'media', label: '1. Kelola Galeri Media' },
          { id: 'hero', label: '2. Edit Hero Banner' },
          { id: 'drone', label: '3. Drone Video Highlight' },
          { id: 'stats', label: '4. Edit Statistik Media' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${activeTab === tab.id ? 'bg-[#0f2b5c] text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: KELOLA MEDIA & UPLOAD */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-black text-[#0f2b5c] mb-4">Unggah Foto atau Video Baru</h2>
            
            <form onSubmit={handleMediaSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-600 mb-1">Judul / Keterangan</label>
                  <input 
                    type="text" 
                    value={mediaForm.data.title} 
                    onChange={e => mediaForm.setData('title', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                    placeholder="Contoh: Aktivitas Tambang" 
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

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Bentuk Tampilan</label>
                  <select 
                    value={mediaForm.data.display_style} 
                    onChange={e => mediaForm.setData('display_style', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50"
                  >
                    <option value="cover">Cover (Penuh)</option>
                    <option value="contain">Contain (Utuh)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nomor Urut Posisi</label>
                  <input 
                    type="number" 
                    value={mediaForm.data.position} 
                    onChange={e => mediaForm.setData('position', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                    placeholder="0" 
                  />
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

              <button type="submit" disabled={mediaForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition cursor-pointer">
                {mediaForm.processing ? 'Mengunggah...' : 'Unggah Media'}
              </button>
            </form>
          </div>

          {/* Daftar Media Aktif dengan Fitur Adjust Bentuk & Posisi */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-sm text-[#0f2b5c] mb-4">Daftar Media Tersimpan ({mediaItems.length})</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mediaItems && mediaItems.map((item) => (
                <MediaItemCard key={item.id} item={item} onDelete={handleDeleteMedia} />
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
              <label className="block text-xs font-bold text-slate-600 mb-1">Sub Judul (Kecil di Atas)</label>
              <input 
                type="text" 
                value={heroForm.data.subtitle} 
                onChange={e => heroForm.setData('subtitle', e.target.value)} 
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" 
              />
            </div>

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

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Gambar Latar Belakang (Opsional)</label>
              <input 
                type="file" 
                onChange={e => heroForm.setData('background_image', e.target.files[0])} 
                className="w-full border border-slate-200 p-2.5 rounded-xl text-xs bg-slate-50" 
              />
            </div>

            <button type="submit" disabled={heroForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition cursor-pointer">
              {heroForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Hero'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: DRONE VIDEO HIGHLIGHT */}
      {activeTab === 'drone' && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-black text-[#0f2b5c] mb-4">Tambah Drone Video Highlight Baru</h2>
            
            <form onSubmit={handleDroneSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Judul Video</label>
                  <input 
                    type="text" 
                    value={droneForm.data.title} 
                    onChange={e => droneForm.setData('title', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                    placeholder="Contoh: Mining Site Overview" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Sub Judul / Lokasi</label>
                  <input 
                    type="text" 
                    value={droneForm.data.subtitle} 
                    onChange={e => droneForm.setData('subtitle', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                    placeholder="Contoh: East Kalimantan Project" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Durasi Video</label>
                  <input 
                    type="text" 
                    value={droneForm.data.duration} 
                    onChange={e => droneForm.setData('duration', e.target.value)} 
                    className="w-full border border-slate-200 p-3 rounded-xl text-xs bg-slate-50" 
                    placeholder="Contoh: 03:45" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Thumbnail Gambar</label>
                <input 
                  type="file" 
                  onChange={e => droneForm.setData('thumbnail', e.target.files[0])} 
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-xs bg-slate-50" 
                />
              </div>

              <button type="submit" disabled={droneForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition cursor-pointer">
                {droneForm.processing ? 'Menyimpan...' : 'Tambah Drone Video'}
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-sm text-[#0f2b5c] mb-4">Daftar Drone Video ({droneVideos.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {droneVideos && droneVideos.map((vid) => (
                <div key={vid.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-20 bg-slate-200 rounded-lg overflow-hidden shrink-0">
                      {vid.thumbnail_path && <img src={`/${vid.thumbnail_path}`} alt={vid.title} className="h-full w-full object-cover" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0f2b5c]">{vid.title}</p>
                      <p className="text-[10px] text-slate-500">{vid.subtitle} &middot; {vid.duration}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteDrone(vid.id)} 
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-xl transition cursor-pointer shrink-0"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EDIT STATISTIK MEDIA */}
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

// Komponen Card Media dengan Input Pengaturan Posisi & Bentuk Tampilan Foto
function MediaItemCard({ item, onDelete }) {
  const form = useForm({
    position: item.position || 0,
    display_style: item.display_style || 'cover',
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    form.put(`/admin/media-style/${item.id}`, {
      onSuccess: () => alert('Pengaturan media berhasil diperbarui!'),
    });
  };

  const handleUpdatePosition = (e) => {
    e.preventDefault();
    form.put(`/admin/media-position/${item.id}`, {
      onSuccess: () => alert('Urutan posisi berhasil diperbarui!'),
    });
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs flex flex-col justify-between">
      <div>
        <div className="h-36 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          {item.type === 'video' ? (
            <video src={`/${item.file_path}`} className="h-full w-full object-cover" muted />
          ) : (
            <img 
              src={`/${item.file_path}`} 
              alt={item.title} 
              className={`h-full w-full ${item.display_style === 'contain' ? 'object-contain' : 'object-cover'}`} 
            />
          )}
        </div>
        <div className="p-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            {item.category}
          </span>
          <p className="text-xs font-bold text-[#0f2b5c] mt-1.5 truncate">{item.title || 'Tanpa Judul'}</p>
        </div>
      </div>

      <div className="p-3 pt-0 border-t border-slate-100 mt-2 space-y-2">
        {/* Form Atur Bentuk Foto (Cover / Contain) */}
        <form onSubmit={handleUpdate} className="flex items-center gap-2 mt-2">
          <div className="w-1/2">
            <label className="block text-[9px] font-bold text-slate-500 mb-0.5">Bentuk Foto</label>
            <select 
              value={form.data.display_style} 
              onChange={e => form.setData('display_style', e.target.value)} 
              className="w-full border p-1.5 rounded-lg text-xs bg-white font-bold"
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </div>
          <div className="w-1/2 flex items-end">
            <button type="submit" disabled={form.processing} className="w-full py-1.5 bg-[#0f2b5c] hover:bg-slate-800 text-white text-[10px] font-bold rounded-lg transition cursor-pointer">
              Simpan Style
            </button>
          </div>
        </form>

        {/* Form Atur Urutan Posisi */}
        <form onSubmit={handleUpdatePosition} className="flex items-center gap-2">
          <div className="w-1/2">
            <label className="block text-[9px] font-bold text-slate-500 mb-0.5">Urutan Posisi</label>
            <input 
              type="number" 
              value={form.data.position} 
              onChange={e => form.setData('position', e.target.value)} 
              className="w-full border p-1.5 rounded-lg text-xs bg-white text-center font-bold" 
            />
          </div>
          <div className="w-1/2 flex items-end">
            <button type="submit" disabled={form.processing} className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-bold rounded-lg transition cursor-pointer">
              Atur Posisi
            </button>
          </div>
        </form>

        <button 
          type="button" 
          onClick={() => onDelete(item.id)} 
          className="mt-1 w-full py-1.5 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-xl transition cursor-pointer"
        >
          Hapus Media
        </button>
      </div>
    </div>
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
      <button type="submit" disabled={form.processing} className="px-4 py-2 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow cursor-pointer">
        Perbarui Statistik
      </button>
    </form>
  );
}