import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
   FADE REVEAL
========================================================= */
function FadeReveal({ children, className = "", delay = 0 }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        ${className}
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-4.35-4.35m2.1-5.15a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 4.5A2.5 2.5 0 017.5 2H20v17H7.5A2.5 2.5 0 015 16.5v-12z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 5h11M9 7.5h6M9 11h7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l4 4L19 6" />
    </svg>
  );
}

function PartsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M4 7h16M4 12h16M4 17h10" />
      <circle cx="18" cy="17" r="2" strokeWidth="1.7" />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SpareParts({ spare_parts, exploded_views, spare_setting }) {
  /* =======================================================
     DATA MAPPING DARI DATABASE
  ======================================================= */

  const partsCatalog = spare_parts && spare_parts.length > 0 ? spare_parts.map(p => ({
    id: p.id,
    code: p.code,
    name: p.name,
    category: p.category,
    unit: p.unit || '-',
    spec: p.spec || '-',
    stock: p.stock || 'Available',
    image: p.image_path ? `/${p.image_path}` : 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
  })) : [];

  const explodedList = exploded_views && exploded_views.length > 0 ? exploded_views : [];
  const [selectedSystem, setSelectedSystem] = useState(explodedList[0]?.id || null);

  const currentDiagram = explodedList.find(e => e.id === Number(selectedSystem)) || explodedList[0];

  /* =======================================================
     CATEGORY LIST
  ======================================================= */

  const categories = [
    "Semua",
    "Hydraulic System",
    "Filters & Maintenance",
    "Undercarriage",
    "Engine Parts",
    "Electrical System",
    "Transmission & Brake",
  ];

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [keyword, setKeyword] = useState("");

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredParts = partsCatalog.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" ||
      item.category.toLowerCase() === activeCategory.toLowerCase();

    const searchKeyword = keyword.toLowerCase().trim();

    const matchesKeyword =
      item.name.toLowerCase().includes(searchKeyword) ||
      item.code.toLowerCase().includes(searchKeyword) ||
      item.category.toLowerCase().includes(searchKeyword) ||
      item.unit.toLowerCase().includes(searchKeyword);

    return matchesCategory && matchesKeyword;
  });

  /* =======================================================
     DOWNLOAD CATALOG FILE DARI ADMIN
  ======================================================= */

  const handleDownloadCatalog = () => {
    if (spare_setting?.catalog_file_path) {
      const link = document.createElement("a");
      link.href = `/${spare_setting.catalog_file_path}`;
      link.download = spare_setting.catalog_file_path.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("File katalog belum di-upload oleh admin.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans overflow-x-hidden">
      <Navbar />

      {/* 1. HERO BANNER (DINAMIS DARI DATABASE) */}
      <section className="relative w-full min-h-[650px] lg:min-h-[720px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('${spare_setting?.hero_image_path ? `/${spare_setting.hero_image_path}` : 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=90'}')`,
          }}
        />
        <div className="absolute inset-0 bg-[#071b38]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071b38]/70 via-[#071b38]/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071b38]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-16 w-full py-24">
          <FadeReveal className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-[2px] bg-[#ffc107]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-[#ffc107] font-medium">
                Spare Parts & Components
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.05] tracking-tight font-medium text-white drop-shadow-md">
              {spare_setting?.hero_title ? (
                spare_setting.hero_title.includes('XCMG') ? (
                  <>
                    {spare_setting.hero_title.split('XCMG')[0]}
                    <span className="text-[#ffc107]">XCMG</span>
                    {spare_setting.hero_title.split('XCMG')[1]}
                  </>
                ) : (
                  spare_setting.hero_title
                )
              ) : (
                <>
                  Suku Cadang
                  <br />
                  <span className="text-[#ffc107]">Original XCMG</span>
                </>
              )}
            </h1>

            <div className="mt-7 w-16 h-[3px] bg-[#ffc107]" />

            <p className="mt-7 text-sm md:text-base leading-7 text-slate-100 max-w-2xl font-normal drop-shadow">
              {spare_setting?.hero_subtitle || "Temukan berbagai komponen dan suku cadang original untuk menjaga performa, keandalan, dan produktivitas alat berat Anda."}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ffc107] text-[#071b38] text-xs font-medium hover:bg-white transition-all duration-300 shadow-lg shadow-black/20"
              >
                <DownloadIcon />
                Download Katalog
              </button>

              <a
                href="#exploded-panel"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white hover:text-[#071b38] transition-all duration-300"
              >
                <EyeIcon />
                Exploded View
              </a>
            </div>

            
          </FadeReveal>
        </div>
      </section>

      

      {/* 2. CATALOG SECTION */}
      <section id="katalog-section" className="relative bg-[#f7f9fc] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <FadeReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 mb-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-[2px] bg-[#ffc107]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">Parts Catalog</span>
                </div>
                <h2 className="text-3xl md:text-4xl text-[#071b38] font-medium tracking-tight">Daftar Suku Cadang</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500 max-w-xl">
                  Cari komponen berdasarkan nama, kode part, kategori, atau unit alat berat yang digunakan.
                </p>
              </div>

              <div className="relative w-full lg:w-[300px]">
                <input
                  type="text"
                  placeholder="Cari kode atau nama part..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full h-11 pl-4 pr-11 rounded-xl bg-white border border-slate-200 text-xs text-[#071b38] outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107]/10 transition"
                />
                <span className="absolute right-4 top-3.5 text-slate-400"><SearchIcon /></span>
              </div>
            </div>
          </FadeReveal>

          <FadeReveal delay={100}>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-7 scrollbar-hide">
              {categories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-normal transition-all duration-300 border ${
                      active ? "bg-[#071b38] border-[#071b38] text-[#ffc107]" : "bg-white border-slate-200 text-slate-500 hover:border-[#071b38] hover:text-[#071b38]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </FadeReveal>

          <FadeReveal delay={150}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="hidden lg:grid grid-cols-[220px_1fr_180px] bg-[#071b38] text-white divide-x divide-white/10">
                <div className="px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-[#ffc107]">Nomor Part</div>
                <div className="px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300">Nama Component</div>
                <div className="px-6 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300 text-center">Foto</div>
              </div>

              <div className="divide-y divide-slate-200">
                {filteredParts.length > 0 ? (
                  filteredParts.map((item) => (
                    <div key={item.id} className="group relative grid grid-cols-1 lg:grid-cols-[220px_1fr_180px] divide-y lg:divide-y-0 lg:divide-x divide-slate-200 hover:bg-[#fffdf5] transition-all duration-300 items-center">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc107] opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="p-6">
                        <p className="lg:hidden text-[9px] uppercase tracking-[0.16em] text-[#b27b00] font-medium mb-1">Nomor Part</p>
                        <p className="text-xs font-mono font-bold text-[#071b38]">{item.code}</p>
                      </div>

                      <div className="p-6">
                        <p className="lg:hidden text-[9px] uppercase tracking-[0.16em] text-slate-400 mb-1">Nama Component</p>
                        <h3 className="text-sm text-[#071b38] font-medium leading-snug group-hover:text-[#b27b00] transition-colors">{item.name}</h3>
                        <p className="text-[11px] text-slate-400 mt-1">{item.category} • {item.unit}</p>
                      </div>

                      <div className="p-6 flex justify-center">
                        <div className="w-24 h-24 rounded-2xl border-2 border-slate-200 bg-slate-100 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center"><SearchIcon /></div>
                    <h3 className="mt-4 text-sm text-[#071b38] font-medium">Part tidak ditemukan</h3>
                    <p className="mt-1 text-xs text-slate-500">Coba gunakan kata kunci atau kategori lainnya.</p>
                    <button onClick={() => { setKeyword(""); setActiveCategory("Semua"); }} className="mt-4 px-4 py-2 rounded-lg bg-[#071b38] text-white text-xs hover:bg-[#ffc107] hover:text-[#071b38] transition">
                      Reset Pencarian
                    </button>
                  </div>
                )}
              </div>
            </div>
          </FadeReveal>

          <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3 text-[10px] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#fff6d6] text-[#a97800] flex items-center justify-center"><CheckIcon /></span>
              <span>Informasi katalog dapat dikonsultasikan dengan tim <strong className="text-[#071b38] ml-1">Servistama Pro Indonesia.</strong></span>
            </div>
            <a href="/contact" className="text-[#071b38] hover:text-[#b27b00] transition">Butuh bantuan mencari part? →</a>
          </div>
        </div>
      </section>

      {/* 3. DOWNLOAD + EXPLODED VIEW CARDS */}
      <section id="exploded-view" className="relative bg-white py-16 md:py-20 overflow-hidden">
        <div className="absolute -right-40 top-0 w-[400px] h-[400px] rounded-full border border-slate-100 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <FadeReveal>
            <div className="max-w-2xl mb-10">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">Digital Parts Reference</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-medium text-[#071b38]">Katalog & Exploded View</h2>
              <p className="mt-3 text-sm text-slate-500 leading-6">
                Akses informasi suku cadang langsung dari website. Pilih katalog untuk melihat daftar part atau gunakan exploded view untuk memahami posisi dan hubungan antar komponen.
              </p>
            </div>
          </FadeReveal>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeReveal delay={100}>
              <div className="h-full rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 hover:border-[#ffc107] hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#071b38] text-[#ffc107] flex items-center justify-center"><DownloadIcon /></div>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">Catalog</span>
                </div>
                <h3 className="mt-6 text-xl text-[#071b38] font-medium">Download Parts Catalog</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Simpan daftar referensi suku cadang untuk kebutuhan pengecekan kode, nama komponen, dan kompatibilitas unit.
                </p>
                <button onClick={handleDownloadCatalog} className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#071b38] text-white text-xs font-normal hover:bg-[#ffc107] hover:text-[#071b38] transition-all">
                  <DownloadIcon /> Download Catalog
                </button>
              </div>
            </FadeReveal>

            <FadeReveal delay={180}>
              <div className="h-full rounded-2xl border border-slate-200 bg-[#071b38] p-7 text-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#ffc107] text-[#071b38] flex items-center justify-center"><EyeIcon /></div>
                  <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">Interactive View</span>
                </div>
                <h3 className="mt-6 text-xl font-medium">Exploded View</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Lihat struktur komponen secara lebih detail untuk membantu identifikasi posisi, susunan, dan hubungan antar spare parts.
                </p>
                <a href="#exploded-panel" className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#071b38] text-xs font-normal hover:bg-[#ffc107] transition-all">
                  <EyeIcon /> Buka Exploded View
                </a>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* 4. EXPLODED VIEW PANEL (DINAMIS DARI DATABASE) */}
      <section id="exploded-panel" className="bg-[#f7f9fc] py-16 md:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <FadeReveal>
            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-5 mb-8">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-[2px] bg-[#ffc107]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">Exploded View</span>
                </div>
                <h2 className="text-3xl font-medium text-[#071b38]">Component Reference</h2>
                <p className="mt-2 text-sm text-slate-500">Pilih komponen untuk melihat detail part dan kompatibilitasnya.</p>
              </div>
              <div className="text-xs text-slate-400">Interactive Parts Reference</div>
            </div>
          </FadeReveal>

          <FadeReveal delay={100}>
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-[#071b38] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#ffc107]">Assembly</p>
                  <h3 className="mt-1 text-white text-lg font-medium">{currentDiagram?.system_name || 'System Assembly'}</h3>
                </div>

                {explodedList.length > 0 ? (
                  <select
                    className="bg-white/10 border border-white/15 text-white text-xs rounded-lg px-4 py-2.5 outline-none cursor-pointer"
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                  >
                    {explodedList.map(sys => (
                      <option key={sys.id} value={sys.id} className="text-[#071b38]">
                        {sys.system_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-xs text-slate-300 italic">Belum ada sistem diagram</span>
                )}
              </div>

              {/* FOTO UTUH DIAGRAM */}
              <div className="p-6 md:p-10">
                <div className="relative max-w-5xl mx-auto min-h-[380px] md:min-h-[460px] rounded-2xl bg-slate-900 border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
                  {currentDiagram?.image_path ? (
                    <img
                      src={`/${currentDiagram.image_path}`}
                      alt={currentDiagram.system_name}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : (
                    <div className="py-20 text-center text-slate-400 text-xs italic">
                      Belum ada gambar diagram exploded view yang diunggah.
                    </div>
                  )}

                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] text-white tracking-wider uppercase">
                    Diagram Preview
                  </div>
                </div>

                {/* COMPONENT TABLE PREVIEW */}
                <div className="mt-7 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">No.</th>
                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">Component</th>
                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">Part Number</th>
                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {partsCatalog.slice(0, 4).map((row, idx) => (
                        <tr key={row.id} className="hover:bg-[#fffdf5] transition">
                          <td className="py-3.5 px-3 text-xs text-[#b27b00]">0{idx + 1}</td>
                          <td className="py-3.5 px-3 text-xs text-[#071b38] font-medium">{row.name}</td>
                          <td className="py-3.5 px-3 text-xs font-mono text-slate-500">{row.code}</td>
                          <td className="py-3.5 px-3">
                            <span className="inline-flex items-center gap-1.5 text-[9px] text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Genuine Part
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </FadeReveal>

          <div className="mt-8 text-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-slate-500">
              Demikian rujukan struktur diagram komponen (*exploded view*) untuk memastikan kecocokan dan posisi pemasangan suku cadang unit Anda.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA (DINAMIS DARI DATABASE) */}
      <section className="relative bg-[#071b38] py-16 md:py-20 overflow-hidden">
        <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute left-10 bottom-10 w-20 h-20 rounded-full border border-[#ffc107]/20 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeReveal>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#ffc107] font-medium">Need Assistance?</span>
            <h2 className="mt-4 text-3xl md:text-4xl text-white font-medium">
              {spare_setting?.cta_title ? (
                spare_setting.cta_title.includes('suku cadang') ? (
                  <>
                    {spare_setting.cta_title.split('suku cadang')[0]}
                    <span className="text-[#ffc107]">suku cadang?</span>
                  </>
                ) : (
                  spare_setting.cta_title
                )
              ) : (
                <>
                  Butuh bantuan mencari<span className="text-[#ffc107]"> suku cadang?</span>
                </>
              )}
            </h2>
            <p className="mt-4 text-sm text-slate-300 leading-6 max-w-xl mx-auto">
              {spare_setting?.cta_subtitle || "Tim Servistama Pro Indonesia siap membantu Anda menemukan part yang sesuai berdasarkan kode, model unit, maupun kebutuhan teknis."}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ffc107] text-[#071b38] text-xs font-medium hover:bg-white transition">
                Hubungi Sales <span>→</span>
              </a>
              <a href={`https://wa.me/${spare_setting?.whatsapp_number || '6281122233344'}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white text-xs font-medium hover:bg-white hover:text-[#071b38] transition">
                WhatsApp Support
              </a>
            </div>
          </FadeReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}