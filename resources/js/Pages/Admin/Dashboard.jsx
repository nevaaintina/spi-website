import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ hero, intro, statistics, strength, featured_section, featured_items, testimonial_section, testimonials, projects, posts, branches, contact }) {
  const [homeSubTab, setHomeSubTab] = useState('hero');

  // 1. Hero Form
  const heroForm = useForm({
    _method: 'PUT',
    badge_text: hero?.badge_text || '',
    title_line_1: hero?.title_line_1 || '',
    title_highlight: hero?.title_highlight || '',
    title_line_2: hero?.title_line_2 || '',
    description: hero?.description || '',
    video_url: hero?.video_url || '',
    video: null,
  });

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    heroForm.post(`/admin/hero/${hero?.id || 1}`, { 
      forceFormData: true,
      onSuccess: () => alert('Video hero banner berhasil diperbarui!'),
      onError: (errors) => {
        console.log(errors);
        alert('Gagal memperbarui video hero. Cek console browser untuk detail error.');
      }
    });
  };

  const handleDeleteVideo = () => {
    if (confirm('Yakin ingin menghapus video lokal ini dan kembali ke YouTube?')) {
      router.delete(`/admin/hero/delete-video/${hero?.id || 1}`, {
        onSuccess: () => alert('Video lokal berhasil dihapus!'),
      });
    }
  };

  // 2. Intro / Layanan Form
  const introForm = useForm({
    _method: 'PUT',
    badge_text: intro?.badge_text || '',
    title_main: intro?.title_main || '',
    title_highlight: intro?.title_highlight || '',
    description: intro?.description || '',
    image: null,
    
    point_1_title: intro?.point_1_title || '',
    point_1_desc: intro?.point_1_desc || '',
    point_2_title: intro?.point_2_title || '',
    point_2_desc: intro?.point_2_desc || '',
    point_3_title: intro?.point_3_title || '',
    point_3_desc: intro?.point_3_desc || '',

    service_1_title: intro?.service_1_title || '',
    service_1_desc: intro?.service_1_desc || '',
    service_1_image: null,
    
    service_2_title: intro?.service_2_title || '',
    service_2_desc: intro?.service_2_desc || '',
    service_2_image: null,

    service_3_title: intro?.service_3_title || '',
    service_3_desc: intro?.service_3_desc || '',
    service_3_image: null,
  });

  const handleIntroSubmit = (e) => {
    e.preventDefault();
    introForm.post(`/admin/intro/${intro?.id || 1}`, {
      forceFormData: true,
      onSuccess: () => alert('Intro & Layanan berhasil diperbarui!'),
      onError: (errors) => {
        console.log(errors);
        alert('Gagal memperbarui intro. Cek console.');
      }
    });
  };

  // 3. Statistik Form & State Edit
  const statisticForm = useForm({ target: '', suffix: '', label: '', desc: '' });
  const [editingStatisticId, setEditingStatisticId] = useState(null);

  const handleStatisticSubmit = (e) => {
    e.preventDefault();
    if (editingStatisticId) {
      statisticForm.put(`/admin/statistics/${editingStatisticId}`, {
        onSuccess: () => { 
          alert('Statistik berhasil diperbarui!'); 
          statisticForm.reset(); 
          setEditingStatisticId(null); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal memperbarui statistik.');
        }
      });
    } else {
      statisticForm.post('/admin/statistics', { 
        onSuccess: () => { alert('Statistik berhasil ditambahkan!'); statisticForm.reset(); },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal menambahkan statistik.');
        }
      });
    }
  };

  const handleEditStatistic = (stat) => {
    setEditingStatisticId(stat.id);
    statisticForm.setData({
      target: stat.target,
      suffix: stat.suffix || '',
      label: stat.label,
      desc: stat.desc || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingStatisticId(null);
    statisticForm.reset();
  };

  const handleDeleteStatistic = (id) => {
    if (confirm('Yakin ingin menghapus statistik ini?')) {
      router.delete(`/admin/statistics/${id}`, {
        onSuccess: () => alert('Statistik berhasil dihapus!'),
      });
    }
  };

  // 4. Strength Form
  const strengthForm = useForm({
    _method: 'PUT',
    badge_text: strength?.badge_text || '',
    title_main: strength?.title_main || '',
    title_highlight: strength?.title_highlight || '',
    description: strength?.description || '',
    banner_title: strength?.banner_title || '',
    banner_desc: strength?.banner_desc || '',
    banner_image: null,
    heading_why: strength?.heading_why || '',
    desc_why: strength?.desc_why || '',
    point_1_title: strength?.point_1_title || '', point_1_desc: strength?.point_1_desc || '',
    point_2_title: strength?.point_2_title || '', point_2_desc: strength?.point_2_desc || '',
    point_3_title: strength?.point_3_title || '', point_3_desc: strength?.point_3_desc || '',
    point_4_title: strength?.point_4_title || '', point_4_desc: strength?.point_4_desc || '',
  });

  const handleStrengthSubmit = (e) => {
    e.preventDefault();
    strengthForm.post(`/admin/strength/${strength?.id || 1}`, {
      forceFormData: true,
      onSuccess: () => alert('Company Strength berhasil diperbarui!'),
      onError: (errors) => {
        console.log(errors);
        alert('Gagal memperbarui Company Strength.');
      }
    });
  };

  // 5. Featured Services Form
  const featuredSectionForm = useForm({
    _method: 'PUT',
    badge_text: featured_section?.badge_text || '',
    title_main: featured_section?.title_main || '',
    title_highlight: featured_section?.title_highlight || '',
    description: featured_section?.description || '',
    bg_image: null,
  });

  const featuredItemForm = useForm({ 
    title: '', 
    description: '', 
    image: null, 
    link_url: '/services' 
  });
  
  const [editingFeaturedId, setEditingFeaturedId] = useState(null);

  const handleFeaturedItemSubmit = (e) => {
    e.preventDefault();
    if (editingFeaturedId) {
      router.post(`/admin/featured-items/${editingFeaturedId}`, {
        _method: 'PUT',
        title: featuredItemForm.data.title,
        description: featuredItemForm.data.description,
        link_url: featuredItemForm.data.link_url,
        image: featuredItemForm.data.image,
      }, {
        forceFormData: true,
        onSuccess: () => { 
          alert('Layanan berhasil diperbarui!'); 
          featuredItemForm.reset(); 
          setEditingFeaturedId(null); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal memperbarui layanan.');
        }
      });
    } else {
      featuredItemForm.post('/admin/featured-items', {
        forceFormData: true,
        onSuccess: () => { 
          alert('Layanan berhasil ditambahkan!'); 
          featuredItemForm.reset(); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal menambahkan layanan.');
        }
      });
    }
  };

  const handleEditFeaturedItem = (item) => {
    setEditingFeaturedId(item.id);
    featuredItemForm.setData({
      title: item.title,
      description: item.description || '',
      link_url: item.link_url || '/services',
      image: null,
    });
  };

  // 6. Testimonials Form
  const testimonialSectionForm = useForm({
    _method: 'PUT',
    badge_text: testimonial_section?.badge_text || '',
    title_main: testimonial_section?.title_main || '',
    title_highlight: testimonial_section?.title_highlight || '',
    description: testimonial_section?.description || '',
  });

  const testimonialForm = useForm({ client_name: '', client_title: '', quote: '' });
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (editingTestimonialId) {
      testimonialForm.put(`/admin/testimonials/${editingTestimonialId}`, {
        onSuccess: () => { 
          alert('Testimoni berhasil diperbarui!'); 
          testimonialForm.reset(); 
          setEditingTestimonialId(null); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal memperbarui testimoni.');
        }
      });
    } else {
      testimonialForm.post('/admin/testimonials', { 
        onSuccess: () => { 
          alert('Testimoni berhasil ditambahkan!'); 
          testimonialForm.reset(); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal menambahkan testimoni.');
        }
      });
    }
  };

  const handleEditTestimonial = (t) => {
    setEditingTestimonialId(t.id);
    testimonialForm.setData({
      client_name: t.client_name,
      client_title: t.client_title,
      quote: t.quote,
    });
  };

  const handleDeleteTestimonial = (id) => {
    if (confirm('Yakin ingin menghapus testimoni ini?')) {
      router.delete(`/admin/testimonials/${id}`, {
        onSuccess: () => alert('Testimoni berhasil dihapus!'),
      });
    }
  };

  // 7. Projects Form
  const projectForm = useForm({ title: '', description: '', location: '', year: '', image: null });
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (editingProjectId) {
      router.post(`/admin/projects/${editingProjectId}`, {
        _method: 'PUT',
        title: projectForm.data.title,
        description: projectForm.data.description,
        location: projectForm.data.location,
        year: projectForm.data.year,
        image: projectForm.data.image,
      }, {
        forceFormData: true,
        onSuccess: () => { 
          alert('Proyek berhasil diperbarui!'); 
          projectForm.reset(); 
          setEditingProjectId(null); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal memperbarui proyek.');
        }
      });
    } else {
      projectForm.post('/admin/projects', { 
        forceFormData: true,
        onSuccess: () => { 
          alert('Proyek berhasil ditambahkan!'); 
          projectForm.reset(); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal menambahkan proyek.');
        }
      });
    }
  };

  const handleEditProject = (p) => {
    setEditingProjectId(p.id);
    projectForm.setData({
      title: p.title,
      description: p.description || '',
      location: p.location,
      year: p.year,
      image: null,
    });
  };

  const handleDeleteProject = (id) => {
    if (confirm('Yakin ingin menghapus proyek ini?')) {
      router.delete(`/admin/projects/${id}`, {
        onSuccess: () => alert('Proyek berhasil dihapus!'),
      });
    }
  };

  // 7b. Posts Form
  const postForm = useForm({ title: '', content: '', image: null });
  const [editingPostId, setEditingPostId] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (editingPostId) {
      router.post(`/admin/posts/${editingPostId}`, {
        _method: 'PUT',
        title: postForm.data.title,
        content: postForm.data.content,
        image: postForm.data.image,
      }, {
        forceFormData: true,
        onSuccess: () => { 
          alert('Berita berhasil diperbarui!'); 
          postForm.reset(); 
          setEditingPostId(null); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal memperbarui berita.');
        }
      });
    } else {
      postForm.post('/admin/posts', { 
        forceFormData: true,
        onSuccess: () => { 
          alert('Berita berhasil dipublikasikan!'); 
          postForm.reset(); 
        },
        onError: (errors) => {
          console.log(errors);
          alert('Gagal mempublikasikan berita.');
        }
      });
    }
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    postForm.setData({
      title: post.title,
      content: post.content,
      image: null,
    });
  };

  const handleDeletePost = (id) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      router.delete(`/admin/posts/${id}`, {
        onSuccess: () => alert('Berita berhasil dihapus!'),
      });
    }
  };

  // 8. Branches Form
  const branchForm = useForm({ 
    name: '', 
    category: 'Branch Office', 
    city: '', 
    description: '', 
    phone: '',
    map_url: '',
    latitude: -0.7893,  
    longitude: 113.9213 
  });

  const [editingBranchId, setEditingBranchId] = useState(null);
  const [adminMap, setAdminMap] = useState(null);
  const [adminMarker, setAdminMarker] = useState(null);

  useEffect(() => {
    if (homeSubTab === 'branches' && window.L) {
      const mapContainer = document.getElementById('admin-map');
      if (mapContainer && !mapContainer._leaflet_id) {
        const map = window.L.map('admin-map').setView([branchForm.data.latitude, branchForm.data.longitude], 5);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        const marker = window.L.marker([branchForm.data.latitude, branchForm.data.longitude], {
          draggable: true
        }).addTo(map);

        map.on('click', (e) => {
          marker.setLatLng(e.latlng);
          branchForm.setData(prev => ({
            ...prev,
            latitude: e.latlng.lat.toFixed(6),
            longitude: e.latlng.lng.toFixed(6)
          }));
        });

        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          branchForm.setData(prev => ({
            ...prev,
            latitude: pos.lat.toFixed(6),
            longitude: pos.lng.toFixed(6)
          }));
        });

        setAdminMap(map);
        setAdminMarker(marker);
      }
    }
  }, [homeSubTab]);

  const handleAutoDetectLocation = async (queryValue) => {
    if (!queryValue || queryValue.length < 3) return;

    try {
      let searchTerm = queryValue;
      if (queryValue.includes('maps') || queryValue.includes('goo.gl')) {
        searchTerm = branchForm.data.city || branchForm.data.name || 'Indonesia';
      }

      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const newLat = parseFloat(data[0].lat);
        const newLng = parseFloat(data[0].lon);

        branchForm.setData(prev => ({
          ...prev,
          latitude: newLat.toFixed(6),
          longitude: newLng.toFixed(6)
        }));

        if (adminMap && adminMarker) {
          adminMap.setView([newLat, newLng], 12);
          adminMarker.setLatLng([newLat, newLng]);
        }
      }
    } catch (error) {
      console.log('Gagal mendeteksi lokasi otomatis:', error);
    }
  };

  const handleBranchSubmit = (e) => {
    e.preventDefault();
    if (editingBranchId) {
      branchForm.put(`/admin/branches/${editingBranchId}`, {
        onSuccess: () => { 
          alert('Data cabang berhasil diperbarui!'); 
          branchForm.reset(); 
          setEditingBranchId(null); 
        }
      });
    } else {
      branchForm.post('/admin/branches', { 
        onSuccess: () => { 
          alert('Cabang berhasil ditambahkan!'); 
          branchForm.reset(); 
        } 
      });
    }
  };

  // 9. Contact Info Form
  const contactForm = useForm({
    _method: 'PUT',
    address: contact?.address || '',
    phone: contact?.phone || '',
    email: contact?.email || '',
    parts_email: contact?.parts_email || '',
    map_url: contact?.map_url || '',
    operational_hours: contact?.operational_hours || '',
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    contactForm.post(`/admin/contact/${contact?.id || 1}`, {
      onSuccess: () => alert('Informasi kontak berhasil diperbarui!'),
      onError: (errors) => {
        console.log(errors);
        alert('Gagal memperbarui informasi kontak.');
      }
    });
  };

  return (
    <AdminLayout currentPage="homepage">
      
      {/* Sub-Navigasi 9 Bagian Homepage */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
        {[
          { id: 'hero', label: '1. Hero Banner' },
          { id: 'about_sec', label: '2. Intro / Layanan' },
          { id: 'statistics', label: '3. Statistik' },
          { id: 'strength', label: '4. Strength' },
          { id: 'featured_srv', label: '5. Featured Services' },
          { id: 'testimonials', label: '6. Testimonials' },
          { id: 'projects', label: '7. Projects' },
          { id: 'posts', label: '7b. Berita / Knowledge' },
          { id: 'branches', label: '8. Branch Office' },
          { id: 'contact_sec', label: '9. Kontak & Alamat' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setHomeSubTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${homeSubTab === tab.id ? 'bg-[#0f2b5c] text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. HERO BANNER */}
      {homeSubTab === 'hero' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4">
          <h2 className="text-xl font-black text-[#0f2b5c] mb-2">Kelola Video Hero Banner Homepage</h2>
          <p className="text-xs text-slate-500 mb-6">Teks pada hero banner telah disembunyikan di halaman utama. Anda dapat mengatur video latar belakang di sini.</p>
          
          <form onSubmit={handleHeroSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">URL Video YouTube (Opsional)</label>
                <input 
                  type="text" 
                  value={heroForm.data.video_url} 
                  onChange={e => heroForm.setData('video_url', e.target.value)} 
                  className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" 
                  placeholder="https://www.youtube.com/embed/..." 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Upload File Video (MP4)</label>
                <input 
                  type="file" 
                  accept="video/mp4,mov,avi" 
                  onChange={e => heroForm.setData('video', e.target.files[0])} 
                  className="w-full border border-slate-200 p-2.5 rounded-xl text-sm bg-slate-50" 
                />
                
                {hero?.video_path && (
                  <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between">
                    <p className="text-[10px] text-red-700 font-bold truncate">File aktif: {hero.video_path.split('/').pop()}</p>
                    <button type="button" onClick={handleDeleteVideo} className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded-lg transition">
                      Hapus Video
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" disabled={heroForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {heroForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Video'}
            </button>
          </form>
        </div>
      )}

      {/* 2. INTRO / LAYANAN SECTION */}
      {homeSubTab === 'about_sec' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Intro & Layanan Perusahaan</h2>
          <form onSubmit={handleIntroSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Teks</label>
                <input type="text" value={introForm.data.badge_text} onChange={e => introForm.setData('badge_text', e.target.value)} className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama</label>
                <input type="text" value={introForm.data.title_main} onChange={e => introForm.setData('title_main', e.target.value)} className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Highlight</label>
                <input type="text" value={introForm.data.title_highlight} onChange={e => introForm.setData('title_highlight', e.target.value)} className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Perkenalan</label>
              <textarea rows="3" value={introForm.data.description} onChange={e => introForm.setData('description', e.target.value)} className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-slate-50" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Foto Ilustrasi Samping</label>
              <input type="file" accept="image/*" onChange={e => introForm.setData('image', e.target.files[0])} className="w-full border border-slate-200 p-2.5 rounded-xl text-sm bg-slate-50" />
              {intro?.image_path && <p className="text-[10px] text-slate-500 mt-1">File aktif: {intro.image_path.split('/').pop()}</p>}
            </div>

            <hr className="border-slate-200" />
            <h3 className="font-bold text-sm text-[#0f2b5c]">3 Indikator Keunggulan di Bawah Deskripsi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-600">Poin {i}</label>
                  <input type="text" value={introForm.data[`point_${i}_title`]} onChange={e => introForm.setData(`point_${i}_title`, e.target.value)} className="w-full border p-2 rounded-lg text-xs bg-white" placeholder={`Judul Poin ${i}`} />
                  <textarea rows="2" value={introForm.data[`point_${i}_desc`]} onChange={e => introForm.setData(`point_${i}_desc`, e.target.value)} className="w-full border p-2 rounded-lg text-xs bg-white" placeholder={`Deskripsi Poin ${i}`} />
                </div>
              ))}
            </div>

            <hr className="border-slate-200" />
            <h3 className="font-bold text-sm text-[#0f2b5c]">3 Card Layanan Besar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
                  <span className="text-xs font-bold text-[#0f2b5c] block">Card Layanan {i}</span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Upload Foto Latar Card</label>
                    <input type="file" accept="image/*" onChange={e => introForm.setData(`service_${i}_image`, e.target.files[0])} className="w-full text-xs border p-1 bg-white rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul Card</label>
                    <input type="text" value={introForm.data[`service_${i}_title`]} onChange={e => introForm.setData(`service_${i}_title`, e.target.value)} className="w-full border p-2 rounded-lg text-xs bg-white" placeholder="Contoh: Suku Cadang" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Card</label>
                    <textarea rows="2" value={introForm.data[`service_${i}_desc`]} onChange={e => introForm.setData(`service_${i}_desc`, e.target.value)} className="w-full border p-2 rounded-lg text-xs bg-white" placeholder="Deskripsi singkat..." />
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" disabled={introForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {introForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Intro & Layanan'}
            </button>
          </form>
        </div>
      )}

      {/* 3. STATISTIK SECTION */}
      {homeSubTab === 'statistics' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Statistik Perusahaan</h2>
          
          <form onSubmit={handleStatisticSubmit} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-[#0f2b5c]">
                {editingStatisticId ? 'Edit Item Statistik' : 'Tambah Item Statistik Baru'}
              </h3>
              {editingStatisticId && (
                <button type="button" onClick={handleCancelEdit} className="text-[10px] text-red-500 font-bold hover:underline">
                  Batal Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Target Angka</label>
                <input type="number" value={statisticForm.data.target} onChange={e => statisticForm.setData('target', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: 10, 500" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Simbol / Suffix</label>
                <input type="text" value={statisticForm.data.suffix} onChange={e => statisticForm.setData('suffix', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: + atau %" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Label Statistik</label>
                <input type="text" value={statisticForm.data.label} onChange={e => statisticForm.setData('label', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Tahun Pengalaman" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
                <input type="text" value={statisticForm.data.desc} onChange={e => statisticForm.setData('desc', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Keterangan pendukung..." />
              </div>
            </div>

            <button type="submit" disabled={statisticForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {statisticForm.processing ? 'Menyimpan...' : (editingStatisticId ? 'Perbarui Statistik' : 'Tambah Statistik')}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Statistik Aktif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statistics && statistics.map((stat) => (
                <div key={stat.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-slate-50/50 shadow-xs">
                  <div>
                    <p className="text-xl font-black text-[#0f2b5c]">{stat.target}{stat.suffix}</p>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">{stat.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{stat.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEditStatistic(stat)} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition">Edit</button>
                    <button type="button" onClick={() => handleDeleteStatistic(stat.id)} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. STRENGTH SECTION */}
      {homeSubTab === 'strength' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Company Strength</h2>
          <form onSubmit={handleStrengthSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Teks</label>
                <input type="text" value={strengthForm.data.badge_text} onChange={e => strengthForm.setData('badge_text', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama</label>
                <input type="text" value={strengthForm.data.title_main} onChange={e => strengthForm.setData('title_main', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Highlight</label>
                <input type="text" value={strengthForm.data.title_highlight} onChange={e => strengthForm.setData('title_highlight', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Atas</label>
              <textarea rows="2" value={strengthForm.data.description} onChange={e => strengthForm.setData('description', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
            </div>

            <hr className="border-slate-200" />
            <h3 className="font-bold text-sm text-[#0f2b5c]">Banner Safety First (Kiri Bawah)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Banner</label>
                <input type="text" value={strengthForm.data.banner_title} onChange={e => strengthForm.setData('banner_title', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Foto Latar Banner</label>
                <input type="file" accept="image/*" onChange={e => strengthForm.setData('banner_image', e.target.files[0])} className="w-full border p-2 bg-slate-50 rounded-xl text-xs" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Banner</label>
              <textarea rows="2" value={strengthForm.data.banner_desc} onChange={e => strengthForm.setData('banner_desc', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
            </div>

            <hr className="border-slate-200" />
            <h3 className="font-bold text-sm text-[#0f2b5c]">Bagian Mengapa Memilih Kami (4 Poin)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Heading Bagian Bawah</label>
                <input type="text" value={strengthForm.data.heading_why} onChange={e => strengthForm.setData('heading_why', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Bagian Bawah</label>
                <input type="text" value={strengthForm.data.desc_why} onChange={e => strengthForm.setData('desc_why', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border space-y-2">
                  <label className="block text-xs font-bold text-slate-600">Poin {i}</label>
                  <input type="text" value={strengthForm.data[`point_${i}_title`]} onChange={e => strengthForm.setData(`point_${i}_title`, e.target.value)} className="w-full border p-2 rounded-lg text-xs bg-white" placeholder="Judul Poin" />
                  <textarea rows="2" value={strengthForm.data[`point_${i}_desc`]} onChange={e => strengthForm.setData(`point_${i}_desc`, e.target.value)} className="w-full border p-2 rounded-lg text-xs bg-white" placeholder="Deskripsi Poin" />
                </div>
              ))}
            </div>

            <button type="submit" disabled={strengthForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {strengthForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Strength'}
            </button>
          </form>
        </div>
      )}

      {/* 5. FEATURED SERVICES SECTION */}
      {homeSubTab === 'featured_srv' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Featured Services</h2>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            featuredSectionForm.post(`/admin/featured-section/${featured_section?.id || 1}`, {
              forceFormData: true,
              onSuccess: () => alert('Header Featured Services berhasil diperbarui!'),
            });
          }} className="p-5 bg-slate-50 rounded-2xl border space-y-4">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Ubah Judul & Latar Belakang Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Teks</label>
                <input type="text" value={featuredSectionForm.data.badge_text} onChange={e => featuredSectionForm.setData('badge_text', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama</label>
                <input type="text" value={featuredSectionForm.data.title_main} onChange={e => featuredSectionForm.setData('title_main', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Highlight</label>
                <input type="text" value={featuredSectionForm.data.title_highlight} onChange={e => featuredSectionForm.setData('title_highlight', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi</label>
              <textarea rows="2" value={featuredSectionForm.data.description} onChange={e => featuredSectionForm.setData('description', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Foto Latar Belakang Section (Opsional)</label>
              <input type="file" accept="image/*" onChange={e => featuredSectionForm.setData('bg_image', e.target.files[0])} className="w-full border p-2 bg-white rounded-xl text-xs" />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">Simpan Header</button>
          </form>

          <form onSubmit={handleFeaturedItemSubmit} className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-[#0f2b5c]">
                {editingFeaturedId ? 'Edit Card Layanan' : 'Tambah Card Layanan Baru'}
              </h3>
              {editingFeaturedId && (
                <button type="button" onClick={() => { setEditingFeaturedId(null); featuredItemForm.reset(); }} className="text-[10px] text-red-500 font-bold hover:underline">
                  Batal Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul Layanan</label>
                <input type="text" value={featuredItemForm.data.title} onChange={e => featuredItemForm.setData('title', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Suku Cadang Original" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Foto Card Layanan</label>
                <input type="file" accept="image/*" onChange={e => featuredItemForm.setData('image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Link URL</label>
                <input type="text" value={featuredItemForm.data.link_url} onChange={e => featuredItemForm.setData('link_url', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: /services" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
              <textarea rows="2" value={featuredItemForm.data.description} onChange={e => featuredItemForm.setData('description', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Deskripsi layanan..." required />
            </div>

            <button type="submit" disabled={featuredItemForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {featuredItemForm.processing ? 'Menyimpan...' : (editingFeaturedId ? 'Perbarui Layanan' : 'Tambah Layanan')}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Layanan Aktif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featured_items && featured_items.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-[#0f2b5c]">{item.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEditFeaturedItem(item)} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition">Edit</button>
                    <button type="button" onClick={() => {
                      if (confirm('Yakin ingin menghapus layanan ini?')) {
                        router.delete(`/admin/featured-items/${item.id}`, {
                          onSuccess: () => alert('Layanan berhasil dihapus!'),
                        });
                      }
                    }} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TESTIMONIALS SECTION */}
      {homeSubTab === 'testimonials' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Customer Testimonials</h2>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            testimonialSectionForm.put(`/admin/testimonial-section/${testimonial_section?.id || 1}`, {
              onSuccess: () => alert('Header Testimoni berhasil diperbarui!'),
              onError: () => alert('Gagal memperbarui header testimoni.'),
            });
          }} className="p-5 bg-slate-50 rounded-2xl border space-y-4">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Ubah Judul & Deskripsi Section Testimoni</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Teks</label>
                <input type="text" value={testimonialSectionForm.data.badge_text} onChange={e => testimonialSectionForm.setData('badge_text', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama</label>
                <input type="text" value={testimonialSectionForm.data.title_main} onChange={e => testimonialSectionForm.setData('title_main', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Highlight</label>
                <input type="text" value={testimonialSectionForm.data.title_highlight} onChange={e => testimonialSectionForm.setData('title_highlight', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi</label>
              <textarea rows="2" value={testimonialSectionForm.data.description} onChange={e => testimonialSectionForm.setData('description', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" />
            </div>
            <button type="submit" className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">Simpan Header</button>
          </form>

          <form onSubmit={handleTestimonialSubmit} className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-[#0f2b5c]">
                {editingTestimonialId ? 'Edit Testimoni Klien' : 'Tambah Testimoni Baru'}
              </h3>
              {editingTestimonialId && (
                <button type="button" onClick={() => { setEditingTestimonialId(null); testimonialForm.reset(); }} className="text-[10px] text-red-500 font-bold hover:underline">
                  Batal Edit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Klien</label>
                <input type="text" value={testimonialForm.data.client_name} onChange={e => testimonialForm.setData('client_name', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Andi Rahman" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Jabatan / Perusahaan</label>
                <input type="text" value={testimonialForm.data.client_title} onChange={e => testimonialForm.setData('client_title', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Project Manager" required />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Kutipan / Testimoni</label>
              <textarea rows="2" value={testimonialForm.data.quote} onChange={e => testimonialForm.setData('quote', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Tuliskan ulasan klien..." required />
            </div>
            <button type="submit" disabled={testimonialForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
              {testimonialForm.processing ? 'Menyimpan...' : (editingTestimonialId ? 'Perbarui Testimoni' : 'Tambah Testimoni')}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Testimoni Aktif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {testimonials && testimonials.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col justify-between bg-white shadow-xs space-y-3">
                  <div>
                    <p className="text-xs font-bold text-[#0f2b5c]">{t.client_name} <span className="font-normal text-slate-500">({t.client_title})</span></p>
                    <p className="text-[10px] text-slate-500 mt-1 italic break-words">"{t.quote}"</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 shrink-0">
                    <button type="button" onClick={() => handleEditTestimonial(t)} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition">Edit</button>
                    <button type="button" onClick={() => handleDeleteTestimonial(t.id)} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. PROJECTS SECTION */}
      {homeSubTab === 'projects' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Galeri Proyek</h2>
          
          <form onSubmit={handleProjectSubmit} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-[#0f2b5c]">
                {editingProjectId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h3>
              {editingProjectId && (
                <button type="button" onClick={() => { setEditingProjectId(null); projectForm.reset(); }} className="text-[10px] text-red-500 font-bold hover:underline">
                  Batal Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul Proyek</label>
                <input type="text" value={projectForm.data.title} onChange={e => projectForm.setData('title', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Pembangunan Gedung" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Foto Proyek</label>
                <input type="file" accept="image/*" onChange={e => projectForm.setData('image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Lokasi</label>
                <input type="text" value={projectForm.data.location} onChange={e => projectForm.setData('location', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Jakarta" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Tahun</label>
                <input type="text" value={projectForm.data.year} onChange={e => projectForm.setData('year', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: 2024" required />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
              <textarea rows="2" value={projectForm.data.description} onChange={e => projectForm.setData('description', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Deskripsi proyek..." />
            </div>

            <button type="submit" disabled={projectForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {projectForm.processing ? 'Menyimpan...' : (editingProjectId ? 'Perbarui Proyek' : 'Tambah Proyek')}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Proyek Aktif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects && projects.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-[#0f2b5c]">{p.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{p.location} • {p.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEditProject(p)} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition">Edit</button>
                    <button type="button" onClick={() => handleDeleteProject(p.id)} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7b. POSTS SECTION */}
      {homeSubTab === 'posts' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Berita / Knowledge</h2>
          
          <form onSubmit={handlePostSubmit} className="p-5 bg-slate-50 rounded-2xl border space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-[#0f2b5c]">
                {editingPostId ? 'Edit Berita' : 'Tambah Berita Baru'}
              </h3>
              {editingPostId && (
                <button type="button" onClick={() => { setEditingPostId(null); postForm.reset(); }} className="text-[10px] text-red-500 font-bold hover:underline">
                  Batal Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Judul Berita</label>
                <input type="text" value={postForm.data.title} onChange={e => postForm.setData('title', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Penghargaan K3" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Gambar Utama</label>
                <input type="file" accept="image/*" onChange={e => postForm.setData('image', e.target.files[0])} className="w-full border p-1.5 bg-white rounded-xl text-xs" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Konten Berita</label>
              <textarea rows="3" value={postForm.data.content} onChange={e => postForm.setData('content', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Isi berita..." required />
            </div>

            <button type="submit" disabled={postForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
              {postForm.processing ? 'Menyimpan...' : (editingPostId ? 'Perbarui Berita' : 'Publikasikan Berita')}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Berita Aktif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {posts && posts.map((post) => (
                <div key={post.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-[#0f2b5c]">{post.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{post.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleEditPost(post)} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition">Edit</button>
                    <button type="button" onClick={() => handleDeletePost(post.id)} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. BRANCHES SECTION */}
      {homeSubTab === 'branches' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Branch Office</h2>
          
          <form onSubmit={handleBranchSubmit} className="p-5 bg-slate-50 rounded-2xl border space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xs text-[#0f2b5c]">
                {editingBranchId ? 'Edit Data Cabang / Area Operasional' : 'Tambah Cabang / Area Operasional Baru'}
              </h3>
              {editingBranchId && (
                <button type="button" onClick={() => { setEditingBranchId(null); branchForm.reset(); }} className="text-[10px] text-red-500 font-bold hover:underline">
                  Batal Edit
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Nama Wilayah</label>
                <input type="text" value={branchForm.data.name} onChange={e => branchForm.setData('name', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Cth: Kalimantan Timur" required />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Kategori / Jenis Lokasi</label>
                <select value={branchForm.data.category} onChange={e => branchForm.setData('category', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" required>
                  <option value="Head Office">Head Office</option>
                  <option value="Branch Office">Branch Office</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Service Point">Service Point</option>
                  <option value="Engineer Coverage">Engineer Coverage</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Kota / Lokasi</label>
                <input 
                  type="text" 
                  value={branchForm.data.city} 
                  onChange={e => {
                    const val = e.target.value;
                    branchForm.setData('city', val);
                    handleAutoDetectLocation(val);
                  }} 
                  className="w-full border p-2.5 rounded-xl text-xs bg-white" 
                  placeholder="Cth: Balikpapan" 
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Hotline / No. Telepon Cabang</label>
                <input 
                  type="text" 
                  value={branchForm.data.phone} 
                  onChange={e => branchForm.setData('phone', e.target.value)} 
                  className="w-full border p-2.5 rounded-xl text-xs bg-white" 
                  placeholder="Cth: +62 811-xxxx-xxxx" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 mb-1">Link Google Maps (Opsional / Deteksi Cepat)</label>
                <input 
                  type="text" 
                  value={branchForm.data.map_url} 
                  onChange={e => {
                    const val = e.target.value;
                    branchForm.setData('map_url', val);
                    handleAutoDetectLocation(val);
                  }} 
                  className="w-full border p-2.5 rounded-xl text-xs bg-white" 
                  placeholder="Cth: https://maps.app.goo.gl/..." 
                />
              </div>
            </div>

            {/* WIDGET PETA INTERAKTIF DI ADMIN */}
            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Peta Penyesuaian (Klik atau geser pin merah jika ingin lebih presisi):</label>
              <div id="admin-map" className="w-full h-72 rounded-2xl border-2 border-slate-300 shadow-inner z-0"></div>
              <p className="text-[10px] text-slate-400 mt-1">✨ Koordinat GPS Terpilih: Lat: {branchForm.data.latitude}, Lng: {branchForm.data.longitude}</p>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 mb-1">Deskripsi Cabang</label>
              <textarea rows="2" value={branchForm.data.description} onChange={e => branchForm.setData('description', e.target.value)} className="w-full border p-2.5 rounded-xl text-xs bg-white" placeholder="Deskripsi layanan, fasilitas, dll..." required />
            </div>

            <button type="submit" disabled={branchForm.processing} className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow">
              {editingBranchId ? 'Perbarui Cabang' : 'Tambah Cabang'}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="font-bold text-xs text-[#0f2b5c]">Daftar Cabang Aktif</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {branches && branches.map((b) => (
                <div key={b.id} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between bg-white shadow-xs">
                  <div>
                    <p className="text-xs font-bold text-[#0f2b5c]">{b.name} <span className="text-slate-500 font-normal">({b.city})</span></p>
                    <p className="text-[10px] text-slate-500 mt-0.5"><span className="font-semibold text-amber-600">{b.category}</span> • Hotline: <span className="font-medium text-slate-700">{b.phone || '-'}</span></p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => {
                      setEditingBranchId(b.id);
                      branchForm.setData({
                        name: b.name,
                        category: b.category,
                        city: b.city,
                        description: b.description,
                        phone: b.phone || '',
                        map_url: b.map_url || '',
                        latitude: b.latitude || -0.7893,
                        longitude: b.longitude || 113.9213,
                      });
                      if (adminMap && adminMarker && b.latitude && b.longitude) {
                        adminMap.setView([b.latitude, b.longitude], 12);
                        adminMarker.setLatLng([b.latitude, b.longitude]);
                      }
                    }} className="px-3 py-1.5 bg-amber-500 text-white text-[10px] font-bold rounded-lg hover:bg-amber-600 transition">Edit</button>

                    <button type="button" onClick={() => {
                      if (confirm('Yakin ingin menghapus cabang ini?')) {
                        router.delete(`/admin/branches/${b.id}`, {
                          onSuccess: () => alert('Cabang berhasil dihapus!'),
                        });
                      }
                    }} className="px-3 py-1.5 bg-red-500 text-white text-[10px] font-bold rounded-lg hover:bg-red-600 transition">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. CONTACT SECTION */}
      {homeSubTab === 'contact_sec' && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mt-4 space-y-6">
          <h2 className="text-xl font-black text-[#0f2b5c]">Kelola Informasi Kontak & Alamat</h2>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nomor Telepon / Hotline</label>
                <input type="text" value={contactForm.data.phone} onChange={e => contactForm.setData('phone', e.target.value)} className="w-full border p-3 rounded-xl text-xs bg-slate-50" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Utama</label>
                <input type="email" value={contactForm.data.email} onChange={e => contactForm.setData('email', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Suku Cadang (Parts)</label>
                <input type="email" value={contactForm.data.parts_email} onChange={e => contactForm.setData('parts_email', e.target.value)} className="w-full border p-3 rounded-xl text-xs bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">URL Google Maps</label>
                <input type="text" value={contactForm.data.map_url} onChange={e => contactForm.setData('map_url', e.target.value)} className="w-full border p-3 rounded-xl text-sm bg-slate-50" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Alamat Lengkap Kantor</label>
              <textarea rows="3" value={contactForm.data.address} onChange={e => contactForm.setData('address', e.target.value)} className="w-full border p-3 rounded-xl text-xs bg-slate-50" required />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Jam Operasional</label>
              <input type="text" value={contactForm.data.operational_hours} onChange={e => contactForm.setData('operational_hours', e.target.value)} className="w-full border p-3 rounded-xl text-slate-50" placeholder="Cth: Senin - Jumat: 08.00 - 17.00" />
            </div>

            <button type="submit" disabled={contactForm.processing} className="px-6 py-3 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition">
              {contactForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Kontak'}
            </button>
          </form>
        </div>
      )}

    </AdminLayout>
  );
}