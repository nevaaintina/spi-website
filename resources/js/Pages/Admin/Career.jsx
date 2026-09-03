import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function AdminCareer({ hero, jobs = [], cultures = [], cultureSection = null, jobSection = null, devSection = null, storySection = null, internship = null, applicationSection = null, paths = [], stories = [], testimonials = [] }) {
    const { flash } = usePage().props;

    const [activeSection, setActiveSection] = useState('hero');
    const [editingJob, setEditingJob] = useState(null);

    // Helper untuk membersihkan path gambar di admin dari awalan storage/ lama
    const getCleanImageUrl = (path, fallback = '/images/default.jpg') => {
        if (!path) return fallback;
        if (path.startsWith('http')) return path;
        const cleaned = path.replace(/^storage\//, '').replace(/^storage\//, '');
        return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    };

    // State untuk Form Hero Banner
    const [heroData, setHeroData] = useState({
        badge_text: hero ? hero.badge_text : '',
        title_line1: hero ? hero.title_line1 : '',
        title_line2: hero ? hero.title_line2 : '',
        description: hero ? hero.description : '',
        sub_badge: hero ? hero.sub_badge : '',
        sub_title: hero ? hero.sub_title : '',
        image: null,
    });

    const [processingHero, setProcessingHero] = useState(false);
    const [heroErrors, setHeroErrors] = useState({});

    const handleUpdateHero = (e) => {
        e.preventDefault();
        if (!hero || !hero.id) {
            alert('Data hero banner belum tersedia di database.');
            return;
        }

        setProcessingHero(true);
        setHeroErrors({});

        const formData = new FormData();
        formData.append('badge_text', heroData.badge_text);
        formData.append('title_line1', heroData.title_line1);
        formData.append('title_line2', heroData.title_line2);
        formData.append('description', heroData.description);
        formData.append('sub_badge', heroData.sub_badge || '');
        formData.append('sub_title', heroData.sub_title || '');
        if (heroData.image) {
            formData.append('image', heroData.image);
        }

        router.post(`/admin/career/hero/${hero.id}`, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setProcessingHero(false);
                setHeroData(prev => ({ ...prev, image: null }));
            },
            onError: (errors) => {
                setProcessingHero(false);
                setHeroErrors(errors);
            },
        });
    };

    // State untuk Our Culture Section
    const [cultureSecData, setCultureSecData] = useState({
        badge: cultureSection?.badge || 'OUR CULTURE',
        title_part1: cultureSection?.title_part1 || 'Where People',
        title_part2: cultureSection?.title_part2 || 'Grow Together.',
        description: cultureSection?.description || 'Di SPI, kami percaya bahwa kesuksesan perusahaan dibangun oleh manusia yang bertumbuh bersama.',
        image: null,
        stat_text: cultureSection?.stat_text || 'mari tumbuh, berinovasi, dan memberikan dampak yang lebih besar.',
        stat_1_num: cultureSection?.stat_1_num || '1.500+',
        stat_1_label: cultureSection?.stat_1_label || 'Talenta Profesional',
        stat_2_num: cultureSection?.stat_2_num || '0',
        stat_2_label: cultureSection?.stat_2_label || 'Kecelakaan Kerja',
        stat_3_num: cultureSection?.stat_3_num || '10+',
        stat_3_label: cultureSection?.stat_3_label || 'Tahun Pengalaman',
    });

    const [cultureCards, setCultureCards] = useState([
        { id: cultures[0]?.id || null, title: cultures[0]?.title || 'Integritas', description: cultures[0]?.description || 'Selalu bertindak jujur.' },
        { id: cultures[1]?.id || null, title: cultures[1]?.title || 'Safety First', description: cultures[1]?.description || 'Penerapan standar K3.' },
        { id: cultures[2]?.id || null, title: cultures[2]?.title || 'Innovation', description: cultures[2]?.description || 'Mendorong ide kreatif.' },
    ]);

    const handleCultureCardChange = (index, field, value) => {
        const updated = [...cultureCards];
        updated[index][field] = value;
        setCultureCards(updated);
    };

    const handleSaveCultureSection = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('badge', cultureSecData.badge);
        formData.append('title_part1', cultureSecData.title_part1);
        formData.append('title_part2', cultureSecData.title_part2);
        formData.append('description', cultureSecData.description);
        if (cultureSecData.image) {
            formData.append('image', cultureSecData.image);
        }
        formData.append('stat_text', cultureSecData.stat_text);
        formData.append('stat_1_num', cultureSecData.stat_1_num);
        formData.append('stat_1_label', cultureSecData.stat_1_label);
        formData.append('stat_2_num', cultureSecData.stat_2_num);
        formData.append('stat_2_label', cultureSecData.stat_2_label);
        formData.append('stat_3_num', cultureSecData.stat_3_num);
        formData.append('stat_3_label', cultureSecData.stat_3_label);

        router.post('/admin/career/culture-section', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                cultureCards.forEach((card) => {
                    if (card.id) {
                        router.put(`/admin/cultures/${card.id}`, { title: card.title, description: card.description }, { preserveScroll: true });
                    } else {
                        router.post('/admin/cultures', { title: card.title, description: card.description }, { preserveScroll: true });
                    }
                });
                alert('Semua konten Our Culture berhasil diperbarui!');
            },
        });
    };

    // State untuk Job Vacancy
    const [jobData, setJobData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        education: '',
        description: '',
        requirements: '',
        image: null,
        is_active: true,
    });

    const [jobSectionData, setJobSectionData] = useState({
        badge: jobSection?.badge || 'JOB VACANCY',
        title_part1: jobSection?.title_part1 || 'Find Your',
        title_part2: jobSection?.title_part2 || 'Next Role.',
        description: jobSection?.description || 'Temukan posisi yang sesuai...',
        banner_title: jobSection?.banner_title || 'Tidak menemukan posisi yang sesuai?',
        banner_desc: jobSection?.banner_desc || 'Kirimkan CV Anda...',
    });
    
    const [jobErrors, setJobErrors] = useState({});

    const handleOpenEditJob = (job) => {
        setEditingJob(job);
        setJobData({
            title: job.title,
            department: job.department,
            location: job.location,
            type: job.type,
            education: job.education || '',
            description: job.description,
            requirements: job.requirements,
            image: null,
            is_active: job.is_active,
        });
        setActiveSection('jobs');
    };

    const handleCancelEditJob = () => {
        setEditingJob(null);
        setJobData({
            title: '',
            department: '',
            location: '',
            type: 'Full-time',
            education: '',
            description: '',
            requirements: '',
            image: null,
            is_active: true,
        });
        setJobErrors({});
    };

    const handleSubmitJob = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', jobData.title);
        formData.append('department', jobData.department);
        formData.append('location', jobData.location);
        formData.append('type', jobData.type);
        formData.append('education', jobData.education);
        formData.append('description', jobData.description);
        formData.append('requirements', jobData.requirements);
        formData.append('is_active', jobData.is_active ? 1 : 0);
        if (jobData.image) {
            formData.append('image', jobData.image);
        }

        if (editingJob) {
            router.post(`/admin/jobs/${editingJob.id}`, formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => handleCancelEditJob(),
                onError: (err) => setJobErrors(err),
            });
        } else {
            router.post('/admin/jobs', formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => handleCancelEditJob(),
                onError: (err) => setJobErrors(err),
            });
        }
    };

    const handleDeleteJob = (id) => {
        if (confirm('Yakin ingin menghapus lowongan pekerjaan ini?')) {
            router.delete(`/admin/jobs/${id}`, { preserveScroll: true });
        }
    };

    // State untuk Career Development Section Teks Atas & Path Journey
    const [devSectionData, setDevSectionData] = useState({
        badge: devSection?.badge || 'Career Development',
        title_part1: devSection?.title_part1 || 'Your Career',
        title_part2: devSection?.title_part2 || 'Journey.',
        description: devSection?.description || 'Kami menyediakan jalur pengembangan karier yang transparan dan terstruktur bagi setiap karyawan.',
    });

    const [editingPath, setEditingPath] = useState(null);
    const [pathData, setPathData] = useState({
        level: '',
        title: '',
        description: '',
    });

    const handleOpenEditPath = (path) => {
        setEditingPath(path);
        setPathData({
            level: path.level,
            title: path.title,
            description: path.description,
        });
    };

    const handleCancelEditPath = () => {
        setEditingPath(null);
        setPathData({ level: '', title: '', description: '' });
    };

    const handleSubmitPath = (e) => {
        e.preventDefault();
        if (editingPath) {
            router.put(`/admin/career-paths/${editingPath.id}`, pathData, {
                preserveScroll: true,
                onSuccess: () => handleCancelEditPath(),
            });
        } else {
            router.post('/admin/career-paths', pathData, {
                preserveScroll: true,
                onSuccess: () => handleCancelEditPath(),
            });
        }
    };

    const handleDeletePath = (id) => {
        if (confirm('Yakin ingin menghapus tahapan karier ini?')) {
            router.delete(`/admin/career-paths/${id}`, { preserveScroll: true });
        }
    };

    // State untuk Employee Stories Header Teks
    const [storySecData, setStorySecData] = useState({
        badge: storySection?.badge || 'Employee Stories',
        title_part1: storySection?.title_part1 || 'Hear From',
        title_part2: storySection?.title_part2 || 'Our People.',
        description: storySection?.description || 'Pengalaman dan cerita dari orang-orang yang menjadi bagian dari perjalanan SPI.',
    });

    // State untuk Employee Stories Item CRUD
    const [editingStory, setEditingStory] = useState(null);
    const [storyData, setStoryData] = useState({
        name: '',
        role: '',
        quote: '',
        image: null,
    });

    const handleOpenEditStory = (story) => {
        setEditingStory(story);
        setStoryData({
            name: story.name,
            role: story.role,
            quote: story.quote,
            image: null,
        });
    };

    const handleCancelEditStory = () => {
        setEditingStory(null);
        setStoryData({ name: '', role: '', quote: '', image: null });
    };

    const handleSubmitStory = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', storyData.name);
        formData.append('role', storyData.role);
        formData.append('quote', storyData.quote);
        if (storyData.image) {
            formData.append('image', storyData.image);
        }

        if (editingStory) {
            formData.append('_method', 'PUT');
            router.post(`/admin/employee-stories/${editingStory.id}`, formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => handleCancelEditStory(),
            });
        } else {
            router.post('/admin/employee-stories', formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => handleCancelEditStory(),
            });
        }
    };

    const handleDeleteStory = (id) => {
        if (confirm('Yakin ingin menghapus cerita karyawan ini?')) {
            router.delete(`/admin/employee-stories/${id}`, { preserveScroll: true });
        }
    };

    // State untuk Internship Program Banner & Fitur Poin Bawah
    const [internshipData, setInternshipData] = useState({
        badge_text: internship?.badge_text || 'INTERNSHIP PROGRAM',
        title_line1: internship?.title_line1 || 'Start Your Career',
        title_line2: internship?.title_line2 || 'With Real Experience.',
        description: internship?.description || 'Buka kesempatan bagi mahasiswa/i SMK atau Perguruan Tinggi untuk merasakan pengalaman kerja nyata...',
        feature1_title: internship?.feature1_title || 'Real Work',
        feature1_desc: internship?.feature1_desc || 'Experience',
        feature2_title: internship?.feature2_title || 'Professional',
        feature2_desc: internship?.feature2_desc || 'Mentorship',
        image: null,
    });

    // State untuk Testimoni Mahasiswa Magang (Internship Testimonials)
    const [editingTesti, setEditingTesti] = useState(null);
    const [testiData, setTestiData] = useState({
        name: '',
        university: '',
        role: '',
        quote: '',
        image: null,
    });

    const handleOpenEditTesti = (testi) => {
        setEditingTesti(testi);
        setTestiData({
            name: testi.name,
            university: testi.university,
            role: testi.role,
            quote: testi.quote,
            image: null,
        });
    };

    const handleCancelEditTesti = () => {
        setEditingTesti(null);
        setTestiData({ name: '', university: '', role: '', quote: '', image: null });
    };

    const handleSubmitTesti = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', testiData.name);
        formData.append('university', testiData.university);
        formData.append('role', testiData.role);
        formData.append('quote', testiData.quote);
        if (testiData.image) {
            formData.append('image', testiData.image);
        }

        if (editingTesti) {
            formData.append('_method', 'PUT');
            router.post(`/admin/internship-testimonials/${editingTesti.id}`, formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => handleCancelEditTesti(),
            });
        } else {
            router.post('/admin/internship-testimonials', formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => handleCancelEditTesti(),
            });
        }
    };

    const handleDeleteTesti = (id) => {
        if (confirm('Yakin ingin menghapus testimoni ini?')) {
            router.delete(`/admin/internship-testimonials/${id}`, { preserveScroll: true });
        }
    };

    // State untuk Online Application Section
    const [appSecData, setAppSecData] = useState({
        badge_text: applicationSection?.badge_text || 'Online Application',
        title: applicationSection?.title || 'Ready to Join Us?',
        description: applicationSection?.description || 'Lengkapi data berikut untuk mengirimkan lamaran Anda.',
        security_title: applicationSection?.security_title || 'Data Anda Aman',
        security_desc: applicationSection?.security_desc || 'Informasi yang Anda berikan akan kami jaga kerahasiaannya dan hanya digunakan untuk proses rekrutmen.',
        button_text: applicationSection?.button_text || 'Kirim Lamaran',
    });

    return (
        <AdminLayout currentPage="career">
            <Head title="Kelola Halaman Karir" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-black text-[#0f2b5c]">Manajemen Halaman Career</h1>
                    <p className="text-xs text-slate-500 mt-1">Pilih section di bawah ini untuk mengelola konten bagian per bagian.</p>
                </div>

                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-bold shadow-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs font-bold shadow-sm">
                        {flash.error}
                    </div>
                )}

                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-2">
                    {[
                        { id: 'hero', label: '1. Hero Banner' },
                        { id: 'culture', label: '2. Our Culture' },
                        { id: 'jobs', label: '3. Job Vacancy' },
                        { id: 'development', label: '4. Career Development' },
                        { id: 'stories', label: '5. Employee Stories' },
                        { id: 'internship', label: '6. Internship Program' },
                        { id: 'testimonials', label: '7. Testimoni Magang' },
                        { id: 'applications', label: '8. Online Application' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveSection(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                activeSection === tab.id
                                    ? 'bg-[#0f2b5c] text-white shadow-md'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* KONTEN SECTION 1: HERO */}
                {activeSection === 'hero' && (
                    <form onSubmit={handleUpdateHero} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                            <h2 className="text-base font-bold text-slate-800">Kelola Hero Banner Career</h2>
                            <p className="text-xs text-slate-500">Ubah teks utama dan gambar banner bagian atas halaman karir publik.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Badge Atas</label>
                                <input 
                                    type="text" 
                                    value={heroData.badge_text} 
                                    onChange={e => setHeroData({ ...heroData, badge_text: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                                {heroErrors.badge_text && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.badge_text}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Baris 1</label>
                                <input 
                                    type="text" 
                                    value={heroData.title_line1} 
                                    onChange={e => setHeroData({ ...heroData, title_line1: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                                {heroErrors.title_line1 && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.title_line1}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Baris 2 (Kuning)</label>
                                <input 
                                    type="text" 
                                    value={heroData.title_line2} 
                                    onChange={e => setHeroData({ ...heroData, title_line2: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                                {heroErrors.title_line2 && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.title_line2}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Sub-Badge (Dalam Kotak Foto)</label>
                                <input 
                                    type="text" 
                                    value={heroData.sub_badge} 
                                    onChange={e => setHeroData({ ...heroData, sub_badge: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                                {heroErrors.sub_badge && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.sub_badge}</span>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Sub-Title (Dalam Kotak Foto)</label>
                                <input 
                                    type="text" 
                                    value={heroData.sub_title} 
                                    onChange={e => setHeroData({ ...heroData, sub_title: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                                />
                                {heroErrors.sub_title && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.sub_title}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Hero</label>
                            <textarea 
                                value={heroData.description} 
                                onChange={e => setHeroData({ ...heroData, description: e.target.value })} 
                                className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                                rows="2"
                            ></textarea>
                            {heroErrors.description && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.description}</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Upload Foto Hero Kanan</label>
                            <input 
                                type="file" 
                                onChange={e => setHeroData({ ...heroData, image: e.target.files[0] })} 
                                className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-slate-50 cursor-pointer" 
                            />
                            {hero?.image && (
                                <div className="mt-2">
                                    <p className="text-[10px] text-slate-400 mb-1">Foto saat ini:</p>
                                    <img src={getCleanImageUrl(hero.image)} alt="Hero Preview" className="w-32 h-20 object-cover rounded-lg border" />
                                </div>
                            )}
                            {heroErrors.image && <span className="text-red-500 text-[10px] mt-1 block">{heroErrors.image}</span>}
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={processingHero} 
                                className="bg-amber-500 hover:bg-amber-600 text-[#0f2b5c] px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer disabled:opacity-50"
                            >
                                {processingHero ? 'Menyimpan...' : 'Simpan Perubahan Hero'}
                            </button>
                        </div>
                    </form>
                )}

                {/* KONTEN SECTION 2: OUR CULTURE */}
                {activeSection === 'culture' && (
                    <form onSubmit={handleSaveCultureSection} className="space-y-6">
                        <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div>
                                <h2 className="text-base font-black text-[#0b2348]">Kelola Section Our Culture (Lengkap)</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Ubah teks judul, deskripsi kiri, foto workshop, 3 kartu budaya kanan, dan banner statistik bawah.</p>
                            </div>
                            <button type="submit" className="bg-[#0f2b5c] hover:bg-[#ffc107] hover:text-[#0b2348] text-white px-6 py-3 rounded-xl text-xs font-black transition shadow-md cursor-pointer">
                                Simpan Semua Our Culture →
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="text-sm font-extrabold text-[#0b2348] border-b pb-2">1. Bagian Teks & Foto Kiri</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Label Badge Atas</label>
                                    <input type="text" value={cultureSecData.badge} onChange={e => setCultureSecData({ ...cultureSecData, badge: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Baris 1</label>
                                    <input type="text" value={cultureSecData.title_part1} onChange={e => setCultureSecData({ ...cultureSecData, title_part1: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Baris 2 (Kuning)</label>
                                    <input type="text" value={cultureSecData.title_part2} onChange={e => setCultureSecData({ ...cultureSecData, title_part2: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Teks di Bawah Judul</label>
                                <textarea rows="3" value={cultureSecData.description} onChange={e => setCultureSecData({ ...cultureSecData, description: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Upload Foto Workshop / Karyawan (Di bawah deskripsi)</label>
                                <input type="file" onChange={e => setCultureSecData({ ...cultureSecData, image: e.target.files[0] })} className="w-full border rounded-xl p-2 text-xs bg-slate-50 cursor-pointer" />
                                {cultureSection?.image && (
                                    <div className="mt-2">
                                        <img src={getCleanImageUrl(cultureSection.image)} alt="Preview" className="w-32 h-20 object-cover rounded-lg border" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="text-sm font-extrabold text-[#0b2348] border-b pb-2">2. Tiga Kartu Budaya (Kanan)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {cultureCards.map((card, index) => (
                                    <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-amber-600">CARD 0{index + 1}</span>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 mb-1">Judul Card</label>
                                            <input type="text" value={card.title} onChange={e => handleCultureCardChange(index, 'title', e.target.value)} className="w-full border rounded-lg p-2 text-xs bg-white outline-none font-bold" required />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 mb-1">Deskripsi Card</label>
                                            <textarea rows="3" value={card.description} onChange={e => handleCultureCardChange(index, 'description', e.target.value)} className="w-full border rounded-lg p-2 text-xs bg-white outline-none resize-none" required></textarea>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <h3 className="text-sm font-extrabold text-[#0b2348] border-b pb-2">3. Banner Statistik Biru (Paling Bawah Section)</h3>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Slogan / Ajakan</label>
                                <input type="text" value={cultureSecData.stat_text} onChange={e => setCultureSecData({ ...cultureSecData, stat_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-3 border rounded-xl bg-slate-50">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Statistik 1 (Angka & Label)</label>
                                    <input type="text" value={cultureSecData.stat_1_num} onChange={e => setCultureSecData({ ...cultureSecData, stat_1_num: e.target.value })} className="w-full border rounded-lg p-1.5 text-xs bg-white mb-2 font-bold" />
                                    <input type="text" value={cultureSecData.stat_1_label} onChange={e => setCultureSecData({ ...cultureSecData, stat_1_label: e.target.value })} className="w-full border rounded-lg p-1.5 text-xs bg-white" />
                                </div>
                                <div className="p-3 border rounded-xl bg-slate-50">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Statistik 2 (Angka & Label)</label>
                                    <input type="text" value={cultureSecData.stat_2_num} onChange={e => setCultureSecData({ ...cultureSecData, stat_2_num: e.target.value })} className="w-full border rounded-lg p-1.5 text-xs bg-white mb-2 font-bold" />
                                    <input type="text" value={cultureSecData.stat_2_label} onChange={e => setCultureSecData({ ...cultureSecData, stat_2_label: e.target.value })} className="w-full border rounded-lg p-1.5 text-xs bg-white" />
                                </div>
                                <div className="p-3 border rounded-xl bg-slate-50">
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Statistik 3 (Angka & Label)</label>
                                    <input type="text" value={cultureSecData.stat_3_num} onChange={e => setCultureSecData({ ...cultureSecData, stat_3_num: e.target.value })} className="w-full border rounded-lg p-1.5 text-xs bg-white mb-2 font-bold" />
                                    <input type="text" value={cultureSecData.stat_3_label} onChange={e => setCultureSecData({ ...cultureSecData, stat_3_label: e.target.value })} className="w-full border rounded-lg p-1.5 text-xs bg-white" />
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* KONTEN SECTION 3: JOB VACANCY */}
                {activeSection === 'jobs' && (
                    <div className="space-y-8">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            router.post('/admin/career/job-section', jobSectionData, { 
                                preserveScroll: true, 
                                onSuccess: () => alert('Pengaturan teks dan banner Job Vacancy berhasil diperbarui!') 
                            });
                        }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">Pengaturan Teks & Banner Job Vacancy</h2>
                                <p className="text-xs text-slate-500">Ubah teks "Find Your Next Role", deskripsi, serta banner ajakan di bawah.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Badge Atas</label>
                                    <input 
                                        type="text" 
                                        value={jobSectionData.badge} 
                                        onChange={e => setJobSectionData({ ...jobSectionData, badge: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 1</label>
                                    <input 
                                        type="text" 
                                        value={jobSectionData.title_part1} 
                                        onChange={e => setJobSectionData({ ...jobSectionData, title_part1: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 2 (Kuning)</label>
                                    <input 
                                        type="text" 
                                        value={jobSectionData.title_part2} 
                                        onChange={e => setJobSectionData({ ...jobSectionData, title_part2: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Bagian Atas</label>
                                <textarea 
                                    rows="2" 
                                    value={jobSectionData.description} 
                                    onChange={e => setJobSectionData({ ...jobSectionData, description: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                    required
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Banner Bawah</label>
                                    <input 
                                        type="text" 
                                        value={jobSectionData.banner_title} 
                                        onChange={e => setJobSectionData({ ...jobSectionData, banner_title: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Banner Bawah</label>
                                    <input 
                                        type="text" 
                                        value={jobSectionData.banner_desc} 
                                        onChange={e => setJobSectionData({ ...jobSectionData, banner_desc: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    Simpan Perubahan Teks & Banner
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitJob} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">
                                    {editingJob ? `Edit Lowongan: ${editingJob.title}` : 'Tambah Lowongan Pekerjaan Baru'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Posisi</label>
                                    <input type="text" value={jobData.title} onChange={e => setJobData({ ...jobData, title: e.target.value })} className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" required />
                                    {jobErrors.title && <span className="text-red-500 text-[10px] mt-1 block">{jobErrors.title}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Departemen</label>
                                    <input type="text" value={jobData.department} onChange={e => setJobData({ ...jobData, department: e.target.value })} className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" required />
                                    {jobErrors.department && <span className="text-red-500 text-[10px] mt-1 block">{jobErrors.department}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Lokasi</label>
                                    <input type="text" value={jobData.location} onChange={e => setJobData({ ...jobData, location: e.target.value })} placeholder="Contoh: Tangerang / On-Site" className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" required />
                                    {jobErrors.location && <span className="text-red-500 text-[10px] mt-1 block">{jobErrors.location}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Kualifikasi Pendidikan</label>
                                    <input type="text" value={jobData.education} onChange={e => setJobData({ ...jobData, education: e.target.value })} placeholder="Contoh: Pendidikan min. D3 Teknik" className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" required />
                                    {jobErrors.education && <span className="text-red-500 text-[10px] mt-1 block">{jobErrors.education}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Tipe Pekerjaan</label>
                                    <select value={jobData.type} onChange={e => setJobData({ ...jobData, type: e.target.value })} className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none">
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Internship">Internship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Foto Lowongan (Kiri Card)</label>
                                    <input type="file" onChange={e => setJobData({ ...jobData, image: e.target.files[0] })} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-slate-50 cursor-pointer" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Singkat Pekerjaan</label>
                                <textarea value={jobData.description} onChange={e => setJobData({ ...jobData, description: e.target.value })} className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" rows="2" required></textarea>
                                {jobErrors.description && <span className="text-red-500 text-[10px] mt-1 block">{jobErrors.description}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Persyaratan (Pisahkan dengan koma)</label>
                                <textarea value={jobData.requirements} onChange={e => setJobData({ ...jobData, requirements: e.target.value })} placeholder="Pengalaman min. 3 tahun, Memahami mesin..." className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" rows="3" required></textarea>
                                {jobErrors.requirements && <span className="text-red-500 text-[10px] mt-1 block">{jobErrors.requirements}</span>}
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    {editingJob ? 'Simpan Perubahan' : 'Simpan Lowongan'}
                                </button>
                                {editingJob && (
                                    <button type="button" onClick={handleCancelEditJob} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700 uppercase tracking-wider">Daftar Lowongan Tersedia</div>
                            <table className="min-w-full divide-y divide-slate-100 text-xs">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-bold">Posisi</th>
                                        <th className="px-6 py-3 text-left font-bold">Departemen</th>
                                        <th className="px-6 py-3 text-left font-bold">Lokasi</th>
                                        <th className="px-6 py-3 text-right font-bold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {jobs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">Belum ada data lowongan pekerjaan.</td>
                                        </tr>
                                    ) : (
                                        jobs.map((job) => (
                                            <tr key={job.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4 font-bold text-slate-800">{job.title}</td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{job.department}</td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{job.location}</td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button onClick={() => handleOpenEditJob(job)} className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer">Edit</button>
                                                    <button onClick={() => handleDeleteJob(job.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* KONTEN SECTION 4: CAREER DEVELOPMENT */}
                {activeSection === 'development' && (
                    <div className="space-y-8">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            router.post('/admin/career/development-section', devSectionData, { 
                                preserveScroll: true, 
                                onSuccess: () => alert('Pengaturan teks Career Development berhasil diperbarui!') 
                            });
                        }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">Pengaturan Teks Utama Career Development</h2>
                                <p className="text-xs text-slate-500">Ubah label badge, judul bagian, dan deskripsi atas untuk Your Career Journey.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Label Badge Atas</label>
                                    <input 
                                        type="text" 
                                        value={devSectionData.badge} 
                                        onChange={e => setDevSectionData({ ...devSectionData, badge: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 1</label>
                                    <input 
                                        type="text" 
                                        value={devSectionData.title_part1} 
                                        onChange={e => setDevSectionData({ ...devSectionData, title_part1: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 2 (Kuning)</label>
                                    <input 
                                        type="text" 
                                        value={devSectionData.title_part2} 
                                        onChange={e => setDevSectionData({ ...devSectionData, title_part2: e.target.value })} 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Bagian Atas</label>
                                <textarea 
                                    rows="2" 
                                    value={devSectionData.description} 
                                    onChange={e => setDevSectionData({ ...devSectionData, description: e.target.value })} 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    Simpan Perubahan Teks Utama
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitPath} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">
                                    {editingPath ? `Edit Tahapan: ${editingPath.title}` : 'Tambah Tahapan Career Development Baru'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Level / Nomor (Contoh: 01, 02)</label>
                                    <input 
                                        type="text" 
                                        value={pathData.level} 
                                        onChange={e => setPathData({ ...pathData, level: e.target.value })} 
                                        placeholder="01" 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Posisi / Level Karier</label>
                                    <input 
                                        type="text" 
                                        value={pathData.title} 
                                        onChange={e => setPathData({ ...pathData, title: e.target.value })} 
                                        placeholder="Junior / Staff" 
                                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Tahapan</label>
                                <textarea 
                                    rows="3" 
                                    value={pathData.description} 
                                    onChange={e => setPathData({ ...pathData, description: e.target.value })} 
                                    placeholder="Periode orientasi, pelatihan dasar keahlian..." 
                                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs outline-none resize-none" 
                                    required
                                ></textarea>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    {editingPath ? 'Simpan Perubahan Tahapan' : 'Tambah Tahapan Karier'}
                                </button>
                                {editingPath && (
                                    <button type="button" onClick={handleCancelEditPath} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700 uppercase tracking-wider">Daftar Tahapan Career Journey</div>
                            <table className="min-w-full divide-y divide-slate-100 text-xs">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-bold w-16">Level</th>
                                        <th className="px-6 py-3 text-left font-bold">Judul</th>
                                        <th className="px-6 py-3 text-left font-bold">Deskripsi</th>
                                        <th className="px-6 py-3 text-right font-bold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {paths.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">Belum ada data tahapan karier.</td>
                                        </tr>
                                    ) : (
                                        paths.map((path) => (
                                            <tr key={path.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4 font-black text-amber-600">{path.level}</td>
                                                <td className="px-6 py-4 font-bold text-slate-800">{path.title}</td>
                                                <td className="px-6 py-4 text-slate-600">{path.description}</td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button onClick={() => handleOpenEditPath(path)} className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer">Edit</button>
                                                    <button onClick={() => handleDeletePath(path.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* KONTEN SECTION 5: EMPLOYEE STORIES */}
                {activeSection === 'stories' && (
                    <div className="space-y-8">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            router.post('/admin/career/story-section', storySecData, { 
                                preserveScroll: true, 
                                onSuccess: () => alert('Pengaturan judul Employee Stories berhasil diperbarui!') 
                            });
                        }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">Pengaturan Judul & Teks Employee Stories</h2>
                                <p className="text-xs text-slate-500">Ubah label badge, judul utama, dan deskripsi bagian atas.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Label Badge Atas</label>
                                    <input type="text" value={storySecData.badge} onChange={e => setStorySecData({ ...storySecData, badge: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 1</label>
                                    <input type="text" value={storySecData.title_part1} onChange={e => setStorySecData({ ...storySecData, title_part1: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Judul Bagian 2 (Kuning)</label>
                                    <input type="text" value={storySecData.title_part2} onChange={e => setStorySecData({ ...storySecData, title_part2: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Bagian Atas</label>
                                <textarea rows="2" value={storySecData.description} onChange={e => setStorySecData({ ...storySecData, description: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                            </div>
                            <div>
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    Simpan Perubahan Judul Utama
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitStory} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">
                                    {editingStory ? `Edit Story: ${editingStory.name}` : 'Tambah Employee Story Baru'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Nama Karyawan</label>
                                    <input type="text" value={storyData.name} onChange={e => setStoryData({ ...storyData, name: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Jabatan & Tahun Bergabung (Role)</label>
                                    <input type="text" value={storyData.role} onChange={e => setStoryData({ ...storyData, role: e.target.value })} placeholder="Lead Service Mechanic · Join 2019" className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Foto Karyawan</label>
                                <input type="file" onChange={e => setStoryData({ ...storyData, image: e.target.files[0] })} className="w-full border rounded-xl p-2 text-xs bg-slate-50 cursor-pointer" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Kutipan / Testimoni (Quote)</label>
                                <textarea rows="3" value={storyData.quote} onChange={e => setStoryData({ ...storyData, quote: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none resize-none" required></textarea>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    {editingStory ? 'Simpan Perubahan Story' : 'Tambah Story'}
                                </button>
                                {editingStory && (
                                    <button type="button" onClick={handleCancelEditStory} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700 uppercase tracking-wider">Daftar Employee Stories</div>
                            <table className="min-w-full divide-y divide-slate-100 text-xs">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-bold">Foto</th>
                                        <th className="px-6 py-3 text-left font-bold">Nama & Role</th>
                                        <th className="px-6 py-3 text-left font-bold">Quote</th>
                                        <th className="px-6 py-3 text-right font-bold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {stories.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">Belum ada data employee stories.</td>
                                        </tr>
                                    ) : (
                                        stories.map((story) => (
                                            <tr key={story.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4">
                                                    <img src={getCleanImageUrl(story.image, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800")} alt="" className="w-10 h-10 rounded-full object-cover border" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800">{story.name}</div>
                                                    <div className="text-[10px] text-amber-600 font-medium">{story.role}</div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 max-w-xs truncate">"{story.quote}"</td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button onClick={() => handleOpenEditStory(story)} className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer">Edit</button>
                                                    <button onClick={() => handleDeleteStory(story.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* KONTEN SECTION 6: INTERNSHIP PROGRAM */}
                {activeSection === 'internship' && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append('badge_text', internshipData.badge_text);
                        formData.append('title_line1', internshipData.title_line1);
                        formData.append('title_line2', internshipData.title_line2);
                        formData.append('description', internshipData.description);
                        formData.append('feature1_title', internshipData.feature1_title);
                        formData.append('feature1_desc', internshipData.feature1_desc);
                        formData.append('feature2_title', internshipData.feature2_title);
                        formData.append('feature2_desc', internshipData.feature2_desc);
                        if (internshipData.image) formData.append('image', internshipData.image);

                        router.post('/admin/career/internship-section', formData, {
                            forceFormData: true,
                            preserveScroll: true,
                            onSuccess: () => alert('Pengaturan Internship Program berhasil diperbarui!'),
                        });
                    }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                            <h2 className="text-base font-bold text-slate-800">Kelola Internship Program Banner</h2>
                            <p className="text-xs text-slate-500">Ubah teks, deskripsi, fitur poin bawah, dan foto banner program magang.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Atas</label>
                                <input type="text" value={internshipData.badge_text} onChange={e => setInternshipData({ ...internshipData, badge_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Baris 1</label>
                                <input type="text" value={internshipData.title_line1} onChange={e => setInternshipData({ ...internshipData, title_line1: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Baris 2 (Kuning)</label>
                                <input type="text" value={internshipData.title_line2} onChange={e => setInternshipData({ ...internshipData, title_line2: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Banner</label>
                            <textarea rows="3" value={internshipData.description} onChange={e => setInternshipData({ ...internshipData, description: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                        </div>

                        {/* INPUT FITUR POIN BAWAH */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                            <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
                                <h4 className="text-xs font-extrabold text-[#0b2348]">Fitur Poin 1 (Kiri)</h4>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Baris Teks 1</label>
                                    <input type="text" value={internshipData.feature1_title} onChange={e => setInternshipData({ ...internshipData, feature1_title: e.target.value })} className="w-full border rounded-lg p-2 text-xs bg-white outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Baris Teks 2</label>
                                    <input type="text" value={internshipData.feature1_desc} onChange={e => setInternshipData({ ...internshipData, feature1_desc: e.target.value })} className="w-full border rounded-lg p-2 text-xs bg-white outline-none" required />
                                </div>
                            </div>
                            <div className="p-4 border rounded-xl bg-slate-50 space-y-3">
                                <h4 className="text-xs font-extrabold text-[#0b2348]">Fitur Poin 2 (Kanan)</h4>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Baris Teks 1</label>
                                    <input type="text" value={internshipData.feature2_title} onChange={e => setInternshipData({ ...internshipData, feature2_title: e.target.value })} className="w-full border rounded-lg p-2 text-xs bg-white outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Baris Teks 2</label>
                                    <input type="text" value={internshipData.feature2_desc} onChange={e => setInternshipData({ ...internshipData, feature2_desc: e.target.value })} className="w-full border rounded-lg p-2 text-xs bg-white outline-none" required />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Foto Banner Kanan</label>
                            <input type="file" onChange={e => setInternshipData({ ...internshipData, image: e.target.files[0] })} className="w-full border rounded-xl p-2 text-xs bg-slate-50 cursor-pointer" />
                            {internship?.image && (
                                <div className="mt-2">
                                    <img src={getCleanImageUrl(internship.image)} alt="Preview" className="w-32 h-20 object-cover rounded-lg border" />
                                </div>
                            )}
                        </div>
                        <div>
                            <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                Simpan Perubahan Internship Program
                            </button>
                        </div>
                    </form>
                )}

                {/* KONTEN SECTION 7: TESTIMONI MAHASISWA MAGANG */}
                {activeSection === 'testimonials' && (
                    <div className="space-y-8">
                        <form onSubmit={handleSubmitTesti} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                            <div className="border-b border-slate-100 pb-3">
                                <h2 className="text-base font-bold text-slate-800">
                                    {editingTesti ? `Edit Testimoni: ${editingTesti.name}` : 'Tambah Testimoni Magang Baru'}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Nama Mahasiswa</label>
                                    <input type="text" value={testiData.name} onChange={e => setTestiData({ ...testiData, name: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Asal Universitas / Kampus</label>
                                    <input type="text" value={testiData.university} onChange={e => setTestiData({ ...testiData, university: e.target.value })} placeholder="Universitas Brawijaya" className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1">Posisi / Peran Magang (Role)</label>
                                    <input type="text" value={testiData.role} onChange={e => setTestiData({ ...testiData, role: e.target.value })} placeholder="Web Development Intern" className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Foto Profil Mahasiswa</label>
                                <input type="file" onChange={e => setTestiData({ ...testiData, image: e.target.files[0] })} className="w-full border rounded-xl p-2 text-xs bg-slate-50 cursor-pointer" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Kutipan / Testimoni (Quote)</label>
                                <textarea rows="3" value={testiData.quote} onChange={e => setTestiData({ ...testiData, quote: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none resize-none" required></textarea>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                    {editingTesti ? 'Simpan Perubahan Testimoni' : 'Tambah Testimoni'}
                                </button>
                                {editingTesti && (
                                    <button type="button" onClick={handleCancelEditTesti} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700 uppercase tracking-wider">Daftar Testimoni Mahasiswa Magang</div>
                            <table className="min-w-full divide-y divide-slate-100 text-xs">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-bold">Foto</th>
                                        <th className="px-6 py-3 text-left font-bold">Nama & Kampus</th>
                                        <th className="px-6 py-3 text-left font-bold">Role & Quote</th>
                                        <th className="px-6 py-3 text-right font-bold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {testimonials.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">Belum ada data testimoni magang.</td>
                                        </tr>
                                    ) : (
                                        testimonials.map((testi) => (
                                            <tr key={testi.id} className="hover:bg-slate-50/50 transition">
                                                <td className="px-6 py-4">
                                                    <img src={getCleanImageUrl(testi.image, "/images/testimonial-1.jpg")} alt="" className="w-10 h-10 rounded-full object-cover border" />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800">{testi.name}</div>
                                                    <div className="text-[10px] text-slate-500">{testi.university}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-amber-600 text-[10px]">{testi.role}</div>
                                                    <div className="text-slate-600 max-w-xs truncate">"{testi.quote}"</div>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button onClick={() => handleOpenEditTesti(testi)} className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer">Edit</button>
                                                    <button onClick={() => handleDeleteTesti(testi.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer">Hapus</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* KONTEN SECTION 8: ONLINE APPLICATION */}
                {activeSection === 'applications' && (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        router.post('/admin/career/application-section', appSecData, {
                            preserveScroll: true,
                            onSuccess: () => alert('Pengaturan Online Application berhasil diperbarui!'),
                        });
                    }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                            <h2 className="text-base font-bold text-slate-800">Kelola Teks Online Application</h2>
                            <p className="text-xs text-slate-500">Ubah teks banner atas, kotak info keamanan data, dan tombol kirim.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Badge Atas</label>
                                <input type="text" value={appSecData.badge_text} onChange={e => setAppSecData({ ...appSecData, badge_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Utama</label>
                                <input type="text" value={appSecData.title} onChange={e => setAppSecData({ ...appSecData, title: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Banner Atas</label>
                            <textarea rows="2" value={appSecData.description} onChange={e => setAppSecData({ ...appSecData, description: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Judul Kotak Informasi Keamanan (Data Anda Aman)</label>
                                <input type="text" value={appSecData.security_title} onChange={e => setAppSecData({ ...appSecData, security_title: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Teks Tombol Kirim</label>
                                <input type="text" value={appSecData.button_text} onChange={e => setAppSecData({ ...appSecData, button_text: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi Kotak Informasi Keamanan</label>
                            <textarea rows="2" value={appSecData.security_desc} onChange={e => setAppSecData({ ...appSecData, security_desc: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs outline-none" required></textarea>
                        </div>

                        <div>
                            <button type="submit" className="bg-[#0f2b5c] hover:bg-[#153a79] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer">
                                Simpan Perubahan Online Application
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
}