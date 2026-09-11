import React, { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AboutManager() {
  const { managementTeams, contents, customers = [], esgContents = {}, hseContents = {} } = usePage().props;
  const [activeTab, setActiveTab] = useState('text');

  // State untuk Dynamic List "Why Choose Us" items (Dengan Mode Edit)
  const [whyItems, setWhyItems] = useState(
    contents?.why_items ? JSON.parse(contents.why_items) : [
      { title: 'Authorized XCMG Partner', desc: 'Official partner of XCMG.' },
      { title: 'Professional Engineers', desc: 'Certified & experienced team.' },
      { title: 'Nationwide Service', desc: 'Coverage across Indonesia.' },
      { title: 'Genuine Spare Parts', desc: '100% original & quality assured.' },
      { title: '24/7 Support', desc: 'Always ready to support you.' },
    ]
  );
  const [editingWhyIndex, setEditingWhyIndex] = useState(null);
  const [whyTitle, setWhyTitle] = useState('');
  const [whyDesc, setWhyDesc] = useState('');

  const saveWhyItem = () => {
    if (!whyTitle) return;
    let updated;
    if (editingWhyIndex !== null) {
      updated = whyItems.map((item, idx) => idx === editingWhyIndex ? { title: whyTitle, desc: whyDesc } : item);
      setEditingWhyIndex(null);
    } else {
      updated = [...whyItems, { title: whyTitle, desc: whyDesc }];
    }
    setWhyItems(updated);
    textForm.setData('why_items', JSON.stringify(updated));
    setWhyTitle('');
    setWhyDesc('');
  };

  const editWhyItem = (index) => {
    setEditingWhyIndex(index);
    setWhyTitle(whyItems[index].title);
    setWhyDesc(whyItems[index].desc);
  };

  const removeWhyItem = (index) => {
    const updated = whyItems.filter((_, i) => i !== index);
    setWhyItems(updated);
    textForm.setData('why_items', JSON.stringify(updated));
  };

  // State untuk Dynamic List "CSR Activities"
  const [csrItems, setCsrItems] = useState(
    esgContents?.csr_items ? JSON.parse(esgContents.csr_items) : [
      { category: 'Edukasi', title: 'Pelatihan Teknisi Gratis', desc: 'Program pembekalan keterampilan mekanik alat berat gratis bagi pemuda lokal...', image: null },
      { category: 'Infrastruktur', title: 'Bantuan Fasilitas Umum', desc: 'Perbaikan dan dukungan sarana publik bagi warga sekitar area kerja.', image: null },
      { category: 'Kemanusiaan', title: 'Tanggap Bencana & Sembako', desc: 'Aksi cepat tanggap penyerahan bantuan logistik dan sembako bagi masyarakat terdampak.', image: null },
    ]
  );
  const [editingCsrIndex, setEditingCsrIndex] = useState(null);
  const [csrCat, setCsrCat] = useState('Edukasi');
  const [csrTitle, setCsrTitle] = useState('');
  const [csrDesc, setCsrDesc] = useState('');
  const [csrImage, setCsrImage] = useState(null);

  const saveCsrItem = () => {
    if (!csrTitle) return;
    let updated;
    if (editingCsrIndex !== null) {
      updated = csrItems.map((item, idx) => idx === editingCsrIndex ? { category: csrCat, title: csrTitle, desc: csrDesc, image: csrImage || item.image } : item);
      setEditingCsrIndex(null);
    } else {
      updated = [...csrItems, { category: csrCat, title: csrTitle, desc: csrDesc, image: csrImage }];
    }
    setCsrItems(updated);
    esgForm.setData('csr_items', JSON.stringify(updated));
    setCsrTitle('');
    setCsrDesc('');
    setCsrImage(null);
  };

  const editCsrItem = (index) => {
    setEditingCsrIndex(index);
    setCsrCat(csrItems[index].category);
    setCsrTitle(csrItems[index].title);
    setCsrDesc(csrItems[index].desc);
  };

  const removeCsrItem = (index) => {
    const updated = csrItems.filter((_, i) => i !== index);
    setCsrItems(updated);
    esgForm.setData('csr_items', JSON.stringify(updated));
  };

  // Form Management Team
  const teamForm = useForm({
    id: null,
    name: '',
    position: '',
    category: 'manager',
    linkedin: '',
    image: null,
  });
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    if (isEditingTeam) {
      teamForm.post(`/admin/about/management/update/${teamForm.data.id}`, {
        preserveScroll: true,
        onSuccess: () => { teamForm.reset(); setIsEditingTeam(false); alert('Tim berhasil diperbarui!'); },
      });
    } else {
      teamForm.post('/admin/about/management/store', {
        preserveScroll: true,
        onSuccess: () => { teamForm.reset(); alert('Anggota tim berhasil ditambahkan!'); },
      });
    }
  };

  const editTeamMember = (member) => {
    setIsEditingTeam(true);
    teamForm.setData({
      id: member.id,
      name: member.name,
      position: member.position,
      category: member.category || 'manager',
      linkedin: member.linkedin || '',
      image: null,
    });
  };

  const deleteMember = (id) => {
    if (confirm('Yakin ingin menghapus anggota tim ini?')) {
      router.delete(`/admin/about/management/destroy/${id}`, { preserveScroll: true });
    }
  };

  // Form Nationwide Customer
  const customerForm = useForm({
    id: null,
    name: '',
    region: 'Central Kalimantan',
    description: '',
    gmaps_link: '',
    image: null,
  });
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (isEditingCustomer) {
      customerForm.post(`/admin/about/customer/update/${customerForm.data.id}`, {
        preserveScroll: true,
        onSuccess: () => { customerForm.reset(); setIsEditingCustomer(false); alert('Data klien berhasil diperbarui!'); },
      });
    } else {
      customerForm.post('/admin/about/customer/store', {
        preserveScroll: true,
        onSuccess: () => { customerForm.reset(); alert('Klien & Peta berhasil ditambahkan!'); },
      });
    }
  };

  const editCustomerItem = (c) => {
    setIsEditingCustomer(true);
    customerForm.setData({
      id: c.id,
      name: c.name,
      region: c.region,
      description: c.description || '',
      gmaps_link: c.gmaps_link || '',
      image: null,
    });
  };

  const deleteCustomer = (id) => {
    if (confirm('Yakin ingin menghapus klien ini?')) {
      router.delete(`/admin/about/customer/destroy/${id}`, { preserveScroll: true });
    }
  };

  const getEmbedMapUrl = (linkOrAddress) => {
    if (!linkOrAddress) return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.287134376517!2d106.824964!3d-6.175392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTAnMzEuNCJTIDEwNMKwNDknMjkuOSJF!5e0!3m2!1sid!2sid!4f1625000000000!5m2!1sid!2sid';
    if (linkOrAddress.includes('<iframe')) {
      const match = linkOrAddress.match(/src="([^"]+)"/);
      return match ? match[1] : linkOrAddress;
    }
    const encoded = encodeURIComponent(linkOrAddress);
    return `https://maps.google.com/maps?q=${encoded}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  // Form untuk Seluruh Teks & Section Halaman About Us (1-11)
  const textForm = useForm({
    hero_title: contents?.hero_title || 'Building Trust Through Professional Heavy Equipment Services',
    hero_desc: contents?.hero_desc || "PT Servistama Pro Indonesia is committed to delivering reliable, innovative, and high-quality heavy equipment services to support Indonesia's industrial growth.",
    hero_image: null,
    who_we_are_title: contents?.who_we_are_title || 'Trusted Heavy Equipment Service Company',
    who_we_are_desc: contents?.who_we_are_desc || 'Founded with a strong commitment to reliability and excellence...',
    why_section_title: contents?.why_section_title || 'WHY CHOOSE US',
    why_items: contents?.why_items || JSON.stringify(whyItems),
    company_name: contents?.company_name || 'PT Servistama Pro Indonesia',
    company_established: contents?.company_established || '2022',
    company_industry: contents?.company_industry || 'Heavy Equipment Support & Services',
    company_focus: contents?.company_focus || 'Service, Maintenance, Warranty, Spare Parts, & Support',
    company_partner: contents?.company_partner || 'XCMG (Xuzhou Construction Machinery Group)',
    company_coverage: contents?.company_coverage || 'Nationwide - Indonesia',
    company_address: contents?.company_address || 'Tangerang, Banten, Indonesia',
    history_2022: contents?.history_2022 || 'Authorized XCMG Dealer Indonesia',
    history_2023: contents?.history_2023 || 'FMC Launch & Jakarta Warehouses',
    history_2024: contents?.history_2024 || 'XCMG Award & Regional Expansion',
    history_2025: contents?.history_2025 || '2 Balikpapan Warehouses & Integrated Asset Management System',
    history_2026: contents?.history_2026 || 'Full New ERP System for Operational Efficiency & Integration',
    vision_text: contents?.vision_text || 'Menjadi perusahaan penyedia jasa servis dan suku cadang alat berat terlengkap dan terbesar.',
    mission_1: contents?.mission_1 || 'Menyediakan jasa servis dan suku cadang alat berat terbaik serta terlengkap.',
    mission_2: contents?.mission_2 || 'Membangun layanan berbasis konsumen dan memberikan solusi sesuai kebutuhan pelanggan.',
    mission_3: contents?.mission_3 || 'Menjaga dan meningkatkan kualitas pelayanan secara berkesinambungan.',
    philosophy_text: contents?.philosophy_text || 'Delivering excellence in heavy equipment support...',
    stat_experience: contents?.stat_experience || '15+',
    stat_engineers: contents?.stat_engineers || '100+',
    stat_projects: contents?.stat_projects || '500+',
    stat_satisfaction: contents?.stat_satisfaction || '98%',
    milestone_title: contents?.milestone_title || 'OUR JOURNEY & ACHIEVEMENTS',
    org_ceo: contents?.org_ceo || 'CEO',
    org_director: contents?.org_director || 'DIRECTOR',
    org_op_director: contents?.org_op_director || 'OPERATIONS DIRECTOR',
    culture_title: contents?.culture_title || 'COMPANY CULTURE',
    governance_intro: contents?.governance_intro || 'Kami berkomitmen menerapkan prinsip Good Corporate Governance (GCG)...',
  });

  // Form khusus Halaman ESG & CSR
  const esgForm = useForm({
    esg_hero_title: esgContents?.esg_hero_title || 'Environment, Social & Governance (ESG)',
    esg_hero_desc: esgContents?.esg_hero_desc || 'Membangun pertumbuhan bisnis jangka panjang...',
    esg_hero_image: null,
    esg_vision_title: esgContents?.esg_vision_title || 'Komitmen Keberlanjutan Dalam Setiap Operasional',
    esg_vision_desc: esgContents?.esg_vision_desc || 'Di PT Servistama Pro Indonesia...',
    esg_vision_image: null,
    env_title: esgContents?.env_title || 'Environmental Program',
    env_desc: esgContents?.env_desc || 'Inisiatif hijau dalam menekan jejak karbon...',
    soc_title: esgContents?.soc_title || 'Social Responsibility',
    soc_desc: esgContents?.soc_desc || 'Prioritas utama kami terletak pada keselamatan kerja...',
    gov_title: esgContents?.gov_title || 'Good Governance',
    gov_desc: esgContents?.gov_desc || 'Menjaga kepercayaan klien melalui tata kelola perusahaan...',
    csr_section_title: esgContents?.csr_section_title || 'CSR Activities',
    csr_section_desc: esgContents?.csr_section_desc || 'Aksi nyata perusahaan dalam memberikan manfaat langsung...',
    csr_items: esgContents?.csr_items || JSON.stringify(csrItems),
    report_title: esgContents?.report_title || 'Sustainability Report Terbaru',
    report_desc: esgContents?.report_desc || 'Unduh dokumen laporan resmi mengenai pencapaian...',
    report_pdf: null,
  });

  // Form khusus Halaman HSE
  const hseForm = useForm({
    hse_hero_title: hseContents?.hse_hero_title || 'Health, Safety & Environment (HSE)',
    hse_hero_desc: hseContents?.hse_hero_desc || 'Prioritas utama kami adalah keselamatan setiap pekerja...',
    hse_hero_image: null,
    standar_title: hseContents?.standar_title || 'Standar Keselamatan Tanpa Kompromi',
    standar_desc: hseContents?.standar_desc || 'Operasional pemeliharaan alat berat...',
    standar_image: null,
    pilar_1_title: hseContents?.pilar_1_title || 'Zero Accident Culture',
    pilar_1_desc: hseContents?.pilar_1_desc || 'Menerapkan standar prosedur...',
    pilar_2_title: hseContents?.pilar_2_title || 'Environmental Protection',
    pilar_2_desc: hseContents?.pilar_2_desc || 'Pengelolaan limbah B3...',
    pilar_3_title: hseContents?.pilar_3_title || 'Health & Safety Compliance',
    pilar_3_desc: hseContents?.pilar_3_desc || 'Mematuhi seluruh regulasi K3...',
    campaign_title: hseContents?.campaign_title || 'Safety Campaign (Kampanye K3)',
    campaign_desc: hseContents?.campaign_desc || 'Inisiatif harian...',
    lti_hours: hseContents?.lti_hours || '1.250.000+',
    lti_rate: hseContents?.lti_rate || '0.00',
    lti_compliance: hseContents?.lti_compliance || '100%',
  });

  const handleTextSubmit = (e) => {
    e.preventDefault();
    textForm.post('/admin/about/text/update', {
      preserveScroll: true,
      onSuccess: () => alert('Seluruh Konten Halaman About Us berhasil diperbarui!'),
    });
  };

  const handleEsgSubmit = (e) => {
    e.preventDefault();
    esgForm.post('/admin/about/esg/update', {
      preserveScroll: true,
      onSuccess: () => alert('Seluruh Konten Halaman ESG berhasil diperbarui!'),
    });
  };

  const handleHseSubmit = (e) => {
    e.preventDefault();
    hseForm.post('/admin/about/hse/update', {
      preserveScroll: true,
      onSuccess: () => alert('Seluruh Konten Halaman HSE berhasil diperbarui!'),
    });
  };

  return (
    <AdminLayout currentPage="about">
      <div className="space-y-6 font-sans pb-12">
        
        {/* HEADER & TAB NAVIGASI */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0f2b5c]">CMS Management: Halaman Perusahaan</h1>
            <p className="text-xs text-slate-500 mt-0.5">Kelola teks About Us, ESG, CSR Activities, HSE, Why Choose Us, Management Team, hingga Nationwide Customers.</p>
          </div>
          
          <div className="flex bg-slate-200 p-1 rounded-xl gap-1 overflow-x-auto">
            <button onClick={() => setActiveTab('text')} className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${activeTab === 'text' ? 'bg-[#0f2b5c] text-white shadow' : 'text-slate-600 hover:text-[#0f2b5c]'}`}>Kelola About Us</button>
            <button onClick={() => setActiveTab('esg')} className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${activeTab === 'esg' ? 'bg-[#0f2b5c] text-white shadow' : 'text-slate-600 hover:text-[#0f2b5c]'}`}>Kelola Halaman ESG & CSR</button>
            <button onClick={() => setActiveTab('hse')} className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${activeTab === 'hse' ? 'bg-[#0f2b5c] text-white shadow' : 'text-slate-600 hover:text-[#0f2b5c]'}`}>Kelola Halaman HSE</button>
            <button onClick={() => setActiveTab('why')} className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${activeTab === 'why' ? 'bg-[#0f2b5c] text-white shadow' : 'text-slate-600 hover:text-[#0f2b5c]'}`}>Why Choose Us</button>
            <button onClick={() => setActiveTab('team')} className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${activeTab === 'team' ? 'bg-[#0f2b5c] text-white shadow' : 'text-slate-600 hover:text-[#0f2b5c]'}`}>Management Team</button>
            <button onClick={() => setActiveTab('customers')} className={`px-4 py-2 text-xs font-bold rounded-lg transition shrink-0 ${activeTab === 'customers' ? 'bg-[#0f2b5c] text-white shadow' : 'text-slate-600 hover:text-[#0f2b5c]'}`}>Nationwide Customers & Map</button>
          </div>
        </div>

        {/* TAB 1: KELOLA ABOUT US */}
        {activeTab === 'text' && (
          <form onSubmit={handleTextSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">1. Hero Banner Section</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Hero Title</label><input type="text" value={textForm.data.hero_title} onChange={e => textForm.setData('hero_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Hero Description</label><textarea rows="2" value={textForm.data.hero_desc} onChange={e => textForm.setData('hero_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Ganti Foto Background Hero</label><input type="file" onChange={e => textForm.setData('hero_image', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">2. Who We Are Section</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Who We Are Title</label><input type="text" value={textForm.data.who_we_are_title} onChange={e => textForm.setData('who_we_are_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Who We Are Description</label><textarea rows="3" value={textForm.data.who_we_are_desc} onChange={e => textForm.setData('who_we_are_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">3. Company Profile Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label><input type="text" value={textForm.data.company_name} onChange={e => textForm.setData('company_name', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Established</label><input type="text" value={textForm.data.company_established} onChange={e => textForm.setData('company_established', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Industry</label><input type="text" value={textForm.data.company_industry} onChange={e => textForm.setData('company_industry', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Business Focus</label><input type="text" value={textForm.data.company_focus} onChange={e => textForm.setData('company_focus', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Authorized Partner</label><input type="text" value={textForm.data.company_partner} onChange={e => textForm.setData('company_partner', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Coverage Area</label><input type="text" value={textForm.data.company_coverage} onChange={e => textForm.setData('company_coverage', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">Head Office</label><input type="text" value={textForm.data.company_address} onChange={e => textForm.setData('company_address', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">4. Company History</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Tahun 2022</label><input type="text" value={textForm.data.history_2022} onChange={e => textForm.setData('history_2022', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Tahun 2023</label><input type="text" value={textForm.data.history_2023} onChange={e => textForm.setData('history_2023', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Tahun 2024</label><input type="text" value={textForm.data.history_2024} onChange={e => textForm.setData('history_2024', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Tahun 2025</label><input type="text" value={textForm.data.history_2025} onChange={e => textForm.setData('history_2025', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Tahun 2026</label><input type="text" value={textForm.data.history_2026} onChange={e => textForm.setData('history_2026', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">5. Visi, Misi & Philosophy</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Our Vision</label><textarea rows="2" value={textForm.data.vision_text} onChange={e => textForm.setData('vision_text', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Mission 1</label><input type="text" value={textForm.data.mission_1} onChange={e => textForm.setData('mission_1', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Mission 2</label><input type="text" value={textForm.data.mission_2} onChange={e => textForm.setData('mission_2', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                  <div><label className="block text-xs font-bold text-slate-700 mb-1">Mission 3</label><input type="text" value={textForm.data.mission_3} onChange={e => textForm.setData('mission_3', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                </div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Business Philosophy</label><textarea rows="2" value={textForm.data.philosophy_text} onChange={e => textForm.setData('philosophy_text', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">6. Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Years Experience</label><input type="text" value={textForm.data.stat_experience} onChange={e => textForm.setData('stat_experience', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Professional Engineers</label><input type="text" value={textForm.data.stat_engineers} onChange={e => textForm.setData('stat_engineers', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Projects Completed</label><input type="text" value={textForm.data.stat_projects} onChange={e => textForm.setData('stat_projects', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Customer Satisfaction</label><input type="text" value={textForm.data.stat_satisfaction} onChange={e => textForm.setData('stat_satisfaction', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">7. Company Milestones</h2>
              <div className="space-y-6">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Milestone Section Title</label><input type="text" value={textForm.data.milestone_title} onChange={e => textForm.setData('milestone_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="p-4 bg-slate-50 rounded-xl border grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">M{num} Year</label><input type="text" value={textForm.data[`m${num}_year`]} onChange={e => textForm.setData(`m${num}_year`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">M{num} Title</label><input type="text" value={textForm.data[`m${num}_title`]} onChange={e => textForm.setData(`m${num}_title`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">M{num} Desc</label><input type="text" value={textForm.data[`m${num}_desc`]} onChange={e => textForm.setData(`m${num}_desc`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">M{num} Image</label><input type="file" onChange={e => textForm.setData(`m${num}_image`, e.target.files[0])} className="w-full border rounded-lg p-1 text-[10px]" /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">8. Organization Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">CEO</label><input type="text" value={textForm.data.org_ceo} onChange={e => textForm.setData('org_ceo', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Director</label><input type="text" value={textForm.data.org_director} onChange={e => textForm.setData('org_director', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Operations Director</label><input type="text" value={textForm.data.org_op_director} onChange={e => textForm.setData('org_op_director', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n}><label className="block text-xs font-bold text-slate-700 mb-1">Divisi {n}</label><input type="text" value={textForm.data[`org_dept_${n}`]} onChange={e => textForm.setData(`org_dept_${n}`, e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">9. Company Culture (6 Poin)</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label><input type="text" value={textForm.data.culture_title} onChange={e => textForm.setData('culture_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border">
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Culture {num} Title</label><input type="text" value={textForm.data[`culture_${num}_title`]} onChange={e => textForm.setData(`culture_${num}_title`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Culture {num} Desc</label><input type="text" value={textForm.data[`culture_${num}_desc`]} onChange={e => textForm.setData(`culture_${num}_desc`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">10. Corporate Governance (4 Poin)</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Governance Intro Description</label><textarea rows="2" value={textForm.data.governance_intro} onChange={e => textForm.setData('governance_intro', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border">
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Governance {num} Title</label><input type="text" value={textForm.data[`gov_${num}_title`]} onChange={e => textForm.setData(`gov_${num}_title`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                    <div><label className="block text-xs font-bold text-slate-700 mb-1">Governance {num} Desc</label><input type="text" value={textForm.data[`gov_${num}_desc`]} onChange={e => textForm.setData(`gov_${num}_desc`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">11. Bottom CTA & Promo Video Section</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">CTA Left Title</label><input type="text" value={textForm.data.cta_title} onChange={e => textForm.setData('cta_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">CTA Left Subtitle</label><input type="text" value={textForm.data.cta_subtitle} onChange={e => textForm.setData('cta_subtitle', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">CTA Right Title</label><input type="text" value={textForm.data.cta_right_title} onChange={e => textForm.setData('cta_right_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">CTA Right Description</label><textarea rows="2" value={textForm.data.cta_right_desc} onChange={e => textForm.setData('cta_right_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Upload Promo / Background Video (MP4)</label><input type="file" accept="video/mp4" onChange={e => textForm.setData('promo_video', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" /></div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={textForm.processing} className="bg-[#ffc107] text-[#0f2b5c] font-black px-8 py-3 rounded-xl shadow text-sm">
                Simpan Seluruh Perubahan Teks & Section
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: KELOLA HALAMAN ESG & CSR */}
        {activeTab === 'esg' && (
          <form onSubmit={handleEsgSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">1. ESG Hero Banner & Foto</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Title</label><input type="text" value={esgForm.data.esg_hero_title} onChange={e => esgForm.setData('esg_hero_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Description</label><textarea rows="2" value={esgForm.data.esg_hero_desc} onChange={e => esgForm.setData('esg_hero_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Foto Background ESG Hero</label><input type="file" onChange={e => esgForm.setData('esg_hero_image', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">2. Visi Masa Depan (Komitmen Keberlanjutan)</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama</label><input type="text" value={esgForm.data.esg_vision_title} onChange={e => esgForm.setData('esg_vision_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Komitmen</label><textarea rows="3" value={esgForm.data.esg_vision_desc} onChange={e => esgForm.setData('esg_vision_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Foto Ilustrasi Samping</label><input type="file" onChange={e => esgForm.setData('esg_vision_image', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">3. Pilar 01 - Environment Program</h2>
              <div className="space-y-4">
                <input type="text" value={esgForm.data.env_title} onChange={e => esgForm.setData('env_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm font-bold" />
                <textarea rows="2" value={esgForm.data.env_desc} onChange={e => esgForm.setData('env_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="p-3 bg-slate-50 rounded-xl border space-y-2">
                      <input type="text" placeholder={`Poin ${n} Title`} value={esgForm.data[`env_${n}_title`]} onChange={e => esgForm.setData(`env_${n}_title`, e.target.value)} className="w-full border rounded-lg p-2 text-xs font-bold" />
                      <textarea rows="3" placeholder={`Poin ${n} Desc`} value={esgForm.data[`env_${n}_desc`]} onChange={e => esgForm.setData(`env_${n}_desc`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">4. Pilar 02 - Social Responsibility</h2>
              <div className="space-y-4">
                <input type="text" value={esgForm.data.soc_title} onChange={e => esgForm.setData('soc_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm font-bold" />
                <textarea rows="2" value={esgForm.data.soc_desc} onChange={e => esgForm.setData('soc_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="p-3 bg-slate-50 rounded-xl border space-y-2">
                      <input type="text" placeholder={`Social ${n} Title`} value={esgForm.data[`soc_${n}_title`]} onChange={e => esgForm.setData(`soc_${n}_title`, e.target.value)} className="w-full border rounded-lg p-2 text-xs font-bold" />
                      <textarea rows="3" placeholder={`Social ${n} Desc`} value={esgForm.data[`soc_${n}_desc`]} onChange={e => esgForm.setData(`soc_${n}_desc`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">5. Pilar 03 - Good Governance</h2>
              <div className="space-y-4">
                <input type="text" value={esgForm.data.gov_title} onChange={e => esgForm.setData('gov_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm font-bold" />
                <textarea rows="2" value={esgForm.data.gov_desc} onChange={e => esgForm.setData('gov_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="p-3 bg-slate-50 rounded-xl border space-y-2">
                      <input type="text" placeholder={`Gov ${n} Title`} value={esgForm.data[`gov_${n}_title`]} onChange={e => esgForm.setData(`gov_${n}_title`, e.target.value)} className="w-full border rounded-lg p-2 text-xs font-bold" />
                      <textarea rows="3" placeholder={`Gov ${n} Desc`} value={esgForm.data[`gov_${n}_desc`]} onChange={e => esgForm.setData(`gov_${n}_desc`, e.target.value)} className="w-full border rounded-lg p-2 text-xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CSR ACTIVITIES */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">6. CSR Activities (Inisiatif Sosial)</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label><input type="text" value={esgForm.data.csr_section_title} onChange={e => esgForm.setData('csr_section_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Section Description</label><textarea rows="2" value={esgForm.data.csr_section_desc} onChange={e => esgForm.setData('csr_section_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>

                <div className="space-y-3 mt-4">
                  <p className="text-xs font-bold text-slate-600">Daftar Program CSR Saat Ini ({csrItems.length}):</p>
                  {csrItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border gap-3">
                      <div className="overflow-hidden flex items-center gap-3">
                        <img src={item.image ? (typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image)) : "https://via.placeholder.com/80"} alt="" className="w-12 h-12 object-cover rounded-lg border shrink-0" />
                        <div>
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">{item.category}</span>
                          <p className="font-extrabold text-xs text-[#0f2b5c] mt-1">{item.title}</p>
                          <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button type="button" onClick={() => editCsrItem(index)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-600">Edit</button>
                        <button type="button" onClick={() => removeCsrItem(index)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600">Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 mt-4 space-y-3">
                  <p className="text-xs font-extrabold text-[#0f2b5c]">{editingCsrIndex !== null ? '✏️ Edit Program CSR' : '+ Tambah Program CSR Baru'}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select value={csrCat} onChange={e => setCsrCat(e.target.value)} className="border rounded-lg p-2 text-xs bg-white">
                      <option value="Edukasi">Edukasi</option>
                      <option value="Infrastruktur">Infrastruktur</option>
                      <option value="Kemanusiaan">Kemanusiaan</option>
                      <option value="Lingkungan">Lingkungan</option>
                    </select>
                    <input type="text" placeholder="Judul Program" value={csrTitle} onChange={e => setCsrTitle(e.target.value)} className="border rounded-lg p-2 text-xs bg-white" />
                    <input type="file" onChange={e => setCsrImage(e.target.files[0])} className="border rounded-lg p-1 text-[10px] bg-white" />
                  </div>
                  <textarea rows="2" placeholder="Deskripsi Program CSR..." value={csrDesc} onChange={e => setCsrDesc(e.target.value)} className="w-full border rounded-lg p-2 text-xs bg-white" />
                  <div className="flex gap-2">
                    <button type="button" onClick={saveCsrItem} className="bg-[#0f2b5c] text-white text-xs font-bold px-4 py-2 rounded-lg">{editingCsrIndex !== null ? 'Simpan Perubahan CSR' : 'Tambah ke Daftar CSR'}</button>
                    {editingCsrIndex !== null && <button type="button" onClick={() => { setEditingCsrIndex(null); setCsrTitle(''); setCsrDesc(''); }} className="bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg">Batal</button>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">7. Sustainability Report (Unduh PDF)</h2>
              <div className="space-y-4">
                <input type="text" value={esgForm.data.report_title} onChange={e => esgForm.setData('report_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                <textarea rows="2" value={esgForm.data.report_desc} onChange={e => esgForm.setData('report_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Upload File PDF Laporan ESG</label>
                  <input type="file" accept="application/pdf" onChange={e => esgForm.setData('report_pdf', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={esgForm.processing} className="bg-[#ffc107] text-[#0f2b5c] font-black px-8 py-3 rounded-xl shadow text-sm">
                Simpan Perubahan Halaman ESG & CSR
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: KELOLA HALAMAN HSE */}
        {activeTab === 'hse' && (
          <form onSubmit={handleHseSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">1. HSE Hero Banner Section</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">HSE Hero Title</label><input type="text" value={hseForm.data.hse_hero_title} onChange={e => hseForm.setData('hse_hero_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">HSE Hero Description</label><textarea rows="2" value={hseForm.data.hse_hero_desc} onChange={e => hseForm.setData('hse_hero_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Foto Background HSE Hero</label><input type="file" onChange={e => hseForm.setData('hse_hero_image', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">2. Standar Keselamatan Tanpa Kompromi</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama</label><input type="text" value={hseForm.data.standar_title} onChange={e => hseForm.setData('standar_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Standar</label><textarea rows="3" value={hseForm.data.standar_desc} onChange={e => hseForm.setData('standar_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Foto Ilustrasi Samping</label><input type="file" onChange={e => hseForm.setData('standar_image', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">3. Safety Policy & Komitmen K3 (3 Pilar)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
                  <label className="text-xs font-bold text-slate-700">Pilar K3 #1</label>
                  <input type="text" value={hseForm.data.pilar_1_title} onChange={e => hseForm.setData('pilar_1_title', e.target.value)} className="w-full border rounded-lg p-2 text-xs font-bold" />
                  <textarea rows="3" value={hseForm.data.pilar_1_desc} onChange={e => hseForm.setData('pilar_1_desc', e.target.value)} className="w-full border rounded-lg p-2 text-xs" />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
                  <label className="text-xs font-bold text-slate-700">Pilar K3 #2</label>
                  <input type="text" value={hseForm.data.pilar_2_title} onChange={e => hseForm.setData('pilar_2_title', e.target.value)} className="w-full border rounded-lg p-2 text-xs font-bold" />
                  <textarea rows="3" value={hseForm.data.pilar_2_desc} onChange={e => hseForm.setData('pilar_2_desc', e.target.value)} className="w-full border rounded-lg p-2 text-xs" />
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
                  <label className="text-xs font-bold text-slate-700">Pilar K3 #3</label>
                  <input type="text" value={hseForm.data.pilar_3_title} onChange={e => hseForm.setData('pilar_3_title', e.target.value)} className="w-full border rounded-lg p-2 text-xs font-bold" />
                  <textarea rows="3" value={hseForm.data.pilar_3_desc} onChange={e => hseForm.setData('pilar_3_desc', e.target.value)} className="w-full border rounded-lg p-2 text-xs" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">4. Safety Campaign</h2>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Campaign Title</label><input type="text" value={hseForm.data.campaign_title} onChange={e => hseForm.setData('campaign_title', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Campaign Description</label><textarea rows="2" value={hseForm.data.campaign_desc} onChange={e => hseForm.setData('campaign_desc', e.target.value)} className="w-full border rounded-xl p-3 text-sm" /></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#FFC107] mb-4 pb-2 border-b">5. Safety Metrics & LTI</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Safe Working Hours</label><input type="text" value={hseForm.data.lti_hours} onChange={e => hseForm.setData('lti_hours', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">LTIFR Rate</label><input type="text" value={hseForm.data.lti_rate} onChange={e => hseForm.setData('lti_rate', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
                <div><label className="block text-xs font-bold text-slate-700 mb-1">Kepatuhan SMK3 (%)</label><input type="text" value={hseForm.data.lti_compliance} onChange={e => hseForm.setData('lti_compliance', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" /></div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={hseForm.processing} className="bg-[#ffc107] text-[#0f2b5c] font-black px-8 py-3 rounded-xl shadow text-sm">
                Simpan Perubahan Halaman HSE
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: WHY CHOOSE US */}
        {activeTab === 'why' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-base font-extrabold text-[#0f2b5c] mb-1">Kelola Section "Why Choose Us"</h2>
              <div className="space-y-3 mt-4">
                <p className="text-xs font-bold text-slate-600">Daftar Poin Keunggulan ({whyItems.length}):</p>
                {whyItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border gap-3">
                    <div className="overflow-hidden">
                      <p className="font-extrabold text-xs text-[#0f2b5c]">{item.title}</p>
                      <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button type="button" onClick={() => editWhyItem(index)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-600">Edit</button>
                      <button type="button" onClick={() => removeWhyItem(index)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 mt-4 space-y-3">
                <p className="text-xs font-extrabold text-[#0f2b5c]">{editingWhyIndex !== null ? '✏️ Edit Poin Keunggulan' : '+ Tambah Poin Why Choose Us Baru'}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Judul" value={whyTitle} onChange={e => setWhyTitle(e.target.value)} className="border rounded-lg p-2 text-xs bg-white" />
                  <input type="text" placeholder="Deskripsi Singkat" value={whyDesc} onChange={e => setWhyDesc(e.target.value)} className="border rounded-lg p-2 text-xs bg-white" />
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={saveWhyItem} className="bg-[#0f2b5c] text-white text-xs font-bold px-4 py-2 rounded-lg">{editingWhyIndex !== null ? 'Simpan Perubahan' : 'Tambah ke Daftar'}</button>
                  {editingWhyIndex !== null && <button type="button" onClick={() => { setEditingWhyIndex(null); setWhyTitle(''); setWhyDesc(''); }} className="bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg">Batal</button>}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="button" onClick={handleTextSubmit} className="bg-[#ffc107] text-[#0f2b5c] font-black px-6 py-2.5 rounded-xl text-sm shadow">Simpan Perubahan Why Choose Us</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MANAGEMENT TEAM */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-base font-extrabold text-[#0f2b5c] mb-4">{isEditingTeam ? '✏️ Edit Anggota Tim' : 'Tambah Anggota Management Team'}</h2>
              <form onSubmit={handleTeamSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Nama Lengkap" value={teamForm.data.name} onChange={e => teamForm.setData('name', e.target.value)} className="border rounded-xl p-2.5 text-sm" required />
                <input type="text" placeholder="Jabatan" value={teamForm.data.position} onChange={e => teamForm.setData('position', e.target.value)} className="border rounded-xl p-2.5 text-sm" required />
                <select value={teamForm.data.category} onChange={e => teamForm.setData('category', e.target.value)} className="border rounded-xl p-2.5 text-sm bg-white">
                  <option value="ceo">CEO</option>
                  <option value="director">Director</option>
                  <option value="manager">Manager</option>
                </select>
                <input type="file" onChange={e => teamForm.setData('image', e.target.files[0])} className="border rounded-xl p-2 text-xs" />
                <div className="flex gap-2 md:col-span-3 justify-end">
                  {isEditingTeam && <button type="button" onClick={() => { setIsEditingTeam(false); teamForm.reset(); }} className="bg-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold">Batal</button>}
                  <button type="submit" className="bg-[#ffc107] text-[#0f2b5c] font-bold px-6 py-2.5 rounded-xl text-sm">{isEditingTeam ? 'Simpan Perubahan Tim' : '+ Tambah Anggota'}</button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-base font-extrabold text-[#0f2b5c] mb-4">Daftar Tim Terdaftar ({managementTeams.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {managementTeams.map((member) => (
                  <div key={member.id} className="border p-4 rounded-xl text-center relative group bg-slate-50">
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => editTeamMember(member)} className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px]" title="Edit">✎</button>
                      <button onClick={() => deleteMember(member.id)} className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px]" title="Hapus">✕</button>
                    </div>
                    <img src={member.image || member.photo || "https://via.placeholder.com/150"} alt={member.name} className="w-16 h-16 object-cover mx-auto rounded-full mb-2 border" />
                    <p className="font-bold text-xs text-[#0f2b5c] truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: NATIONWIDE CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-base font-extrabold text-[#0f2b5c] mb-1">
                {isEditingCustomer ? '✏️ Edit Data Klien' : 'Tambah Klien Wilayah & Preview Peta Otomatis'}
              </h2>
              <form onSubmit={handleCustomerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Perusahaan Klien</label>
                  <input type="text" placeholder="Nama Klien" value={customerForm.data.name} onChange={e => customerForm.setData('name', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Wilayah</label>
                  <select value={customerForm.data.region} onChange={e => customerForm.setData('region', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm bg-white">
                    <option value="Central Kalimantan">Central Kalimantan</option>
                    <option value="East & North Kalimantan">East & North Kalimantan</option>
                    <option value="South Sulawesi">South Sulawesi</option>
                    <option value="South-East Sulawesi">South-East Sulawesi</option>
                    <option value="South Kalimantan">South Kalimantan</option>
                    <option value="South Sumatera">South Sumatera</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap / Link Google Maps</label>
                  <input type="text" placeholder="Contoh: Jl. Jend. Sudirman No.123, Jakarta atau Link Google Maps" value={customerForm.data.gmaps_link} onChange={e => customerForm.setData('gmaps_link', e.target.value)} className="w-full border rounded-xl p-2.5 text-sm" required />
                  <p className="text-[11px] text-slate-400 mt-1">Peta akan otomatis mendeteksi lokasi berdasarkan alamat atau link yang Anda masukkan di atas.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Foto / Logo Klien</label>
                  <input type="file" onChange={e => customerForm.setData('image', e.target.files[0])} className="w-full border rounded-xl p-2 text-xs" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Klien</label>
                  <textarea rows="2" placeholder="Deskripsi Klien..." value={customerForm.data.description} onChange={e => customerForm.setData('description', e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
                </div>

                {/* PREVIEW GAMBARAN MAPS OTOMATIS */}
                <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border">
                  <label className="block text-xs font-bold text-[#0f2b5c] mb-2">Preview Gambaran Peta Otomatis:</label>
                  <div className="w-full h-48 rounded-lg overflow-hidden border bg-slate-200">
                    <iframe
                      title="Map Preview"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={getEmbedMapUrl(customerForm.data.gmaps_link)}
                      allowFullScreen=""
                    ></iframe>
                  </div>
                </div>

                <div className="md:col-span-2 flex gap-2 justify-end">
                  {isEditingCustomer && <button type="button" onClick={() => { setIsEditingCustomer(false); customerForm.reset(); }} className="bg-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold">Batal</button>}
                  <button type="submit" className="bg-[#ffc107] text-[#0f2b5c] font-black px-6 py-2.5 rounded-xl text-sm shadow">
                    {isEditingCustomer ? 'Simpan Perubahan Klien' : '+ Simpan Klien & Peta'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <h2 className="text-base font-extrabold text-[#0f2b5c] mb-4">Daftar Klien Wilayah Nasional ({customers.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {customers.map((c) => (
                  <div key={c.id} className="border p-4 rounded-xl relative bg-slate-50 space-y-3 group">
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
                      <button onClick={() => editCustomerItem(c)} className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]" title="Edit">✎</button>
                      <button onClick={() => deleteCustomer(c.id)} className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]" title="Hapus">✕</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src={c.image || "https://via.placeholder.com/150"} alt={c.name} className="w-12 h-12 object-cover rounded-lg border shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-extrabold text-xs text-[#0f2b5c] truncate">{c.name}</p>
                        <span className="mt-0.5 inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-amber-100 text-amber-800">{c.region}</span>
                      </div>
                    </div>
                    {/* Preview Mini Maps Klien */}
                    <div className="w-full h-28 rounded-lg overflow-hidden border">
                      <iframe
                        title={c.name}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={getEmbedMapUrl(c.gmaps_link)}
                        allowFullScreen=""
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}