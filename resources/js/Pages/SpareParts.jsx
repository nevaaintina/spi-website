import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
   ANIMASI REVEAL SAAT SCROLL
========================================================= */
function FadeReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
        transition-all
        duration-700
        ease-out
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   SPARE PARTS CATALOG
========================================================= */
export default function SpareParts() {
  const partsCatalog = [
    {
      id: 1,
      code: "XCMG-HYD-092",
      name: "Hydraulic Pump Assembly",
      category: "Hydraulic System",
      unit: "Excavator XE210 / XE370",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85",
      spec: "High pressure tolerance, original factory grade, optimal flow rate.",
    },
    {
      id: 2,
      code: "XCMG-FLT-401",
      name: "Original Engine Oil Filter",
      category: "Filters & Maintenance",
      unit: "All XCMG Heavy Units",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=85",
      spec: "Advanced micro-filtration, extended engine lifecycle protection.",
    },
    {
      id: 3,
      code: "XCMG-UND-112",
      name: "Track Shoe & Chain Assembly",
      category: "Undercarriage",
      unit: "Crawler Crane & Excavator",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1000&q=85",
      spec: "Heavy-duty forged steel, extreme terrain resistance.",
    },
    {
      id: 4,
      code: "XCMG-ENG-550",
      name: "Turbocharger Complete",
      category: "Engine Parts",
      unit: "Wheel Loader LW500KL",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85",
      spec: "Optimized air intake boost, fuel efficiency enhancement.",
    },
    {
      id: 5,
      code: "XCMG-ELC-780",
      name: "Control Monitor Display Panel",
      category: "Electrical System",
      unit: "Grader & Heavy Roller",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      spec: "Digital multi-function screen, real-time diagnostic indicators.",
    },
    {
      id: 6,
      code: "XCMG-BRK-332",
      name: "Brake Friction Disc Kit",
      category: "Transmission & Brake",
      unit: "XCMG Off-Highway Truck",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      spec: "High thermal stability, anti-slip friction compound.",
    },
  ];

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

  const filteredParts = partsCatalog.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" ||
      item.category === activeCategory;

    const searchKeyword = keyword.toLowerCase().trim();

    const matchesKeyword =
      item.name.toLowerCase().includes(searchKeyword) ||
      item.code.toLowerCase().includes(searchKeyword) ||
      item.category.toLowerCase().includes(searchKeyword);

    return matchesCategory && matchesKeyword;
  });

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      <Navbar />

      {/* =========================================================
          HERO SECTION (Lebih Kompak & Rapi)
      ========================================================= */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full border border-slate-100 pointer-events-none" />
        <div className="absolute top-16 right-20 w-20 h-20 rounded-full bg-[#ffc107]/5 blur-xl pointer-events-none" />
        <div className="absolute left-0 top-1/2 w-24 h-px bg-[#ffc107]/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 py-12 md:py-16 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT CONTENT */}
            <FadeReveal className="lg:col-span-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-6 h-[2px] bg-[#ffc107]" />
                <span className="text-[9px] font-black tracking-[0.2em] uppercase text-[#b27b00]">
                  OFFICIAL CATALOG
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black text-[#0b2348] tracking-tight leading-[1.1] mb-5">
                Katalog Suku Cadang
                <br />
                <span className="text-[#b27b00]">
                  Original XCMG.
                </span>
              </h1>

              <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-lg mb-7">
                Jelajahi spesifikasi lengkap suku cadang original untuk menjamin keandalan dan umur panjang alat berat Anda. Hubungi tim pemasaran kami untuk informasi ketersediaan stok dan konsultasi teknis.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#katalog-section"
                  className="inline-flex items-center gap-2 px-5.5 py-3 rounded-xl bg-[#0b2348] text-white font-black text-[11px] tracking-wide shadow-md shadow-[#0b2348]/15 hover:bg-[#ffc107] hover:text-[#0b2348] transition-all duration-300"
                >
                  LIHAT DAFTAR PART
                  <span>↓</span>
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5.5 py-3 rounded-xl bg-white border border-slate-300 text-[#0b2348] font-bold text-[11px] hover:border-[#ffc107] hover:bg-[#fffdf5] transition-all duration-300"
                >
                  Hubungi Sales
                  <span>→</span>
                </a>
              </div>
            </FadeReveal>

            {/* RIGHT IMAGE */}
            <FadeReveal delay={150} className="lg:col-span-6">
              <div className="relative max-w-[480px] mx-auto">
                <div className="absolute -right-2 -bottom-2 w-full h-full rounded-[26px] bg-[#ffc107]/20" />

                <div className="relative rounded-[24px] overflow-hidden bg-slate-900 border border-white shadow-[0_20px_45px_rgba(11,35,72,0.14)]">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=90"
                    alt="Warehouse Spare Parts"
                    className="w-full h-[240px] md:h-[310px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#06162d]/90 via-[#06162d]/20 to-transparent" />

                  <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[#ffc107] text-[8px] font-black uppercase tracking-[0.18em] mb-0.5">
                        100% GENUINE PARTS
                      </p>
                      <h3 className="text-white text-sm font-black">
                        Original XCMG Components
                      </h3>
                      <p className="text-slate-300 text-[9px] mt-0.5 max-w-xs">
                        Standar pabrikan global untuk performa maksimal di setiap medan.
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#ffc107] text-[#0b2348] flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </FadeReveal>

          </div>
        </div>
      </section>

      {/* =========================================================
          INFORMATION BANNER
      ========================================================= */}
      <section className="bg-[#0b2348] text-white border-y border-[#ffc107]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">
          <div className="min-h-[64px] flex flex-col md:flex-row items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffc107]/15 border border-[#ffc107]/30 text-[#ffc107] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div>
                <p className="text-[#ffc107] text-[9px] uppercase tracking-[0.18em] font-black">
                  INFORMASI KATALOG
                </p>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Pemesanan dan pengecekan stok dilayani melalui kontak langsung tim kami.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ffc107]/50 text-[#ffc107] text-[10px] font-black hover:bg-[#ffc107] hover:text-[#0b2348] transition-all shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.1-4.5A8.5 8.5 0 113 11.5" />
              </svg>
              <span>Konsultasi Part</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATALOG SECTION (DENGAN TABEL BERSEKAT GARIS TEGAS)
      ========================================================= */}
      <section
        id="katalog-section"
        className="relative py-16 md:py-20 bg-[#f8fafc] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">

          {/* HEADER & SEARCH */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-6 h-[2px] bg-[#ffc107]" />
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#b27b00]">
                  PRODUCT SPECIFICATIONS
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-[#0b2348] leading-tight">
                Daftar & Spesifikasi <span className="text-[#b27b00]">Suku Cadang</span>
              </h2>

              <p className="mt-2 text-xs md:text-sm text-slate-500 leading-relaxed">
                Temukan komponen yang Anda butuhkan berdasarkan kategori, nama produk, maupun kode part.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[280px] shrink-0">
              <input
                type="text"
                placeholder="Cari nama atau kode part..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-full bg-white border border-slate-200 text-xs text-[#0b2348] outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107]/10 shadow-2xs transition-all"
              />
              <span className="absolute right-3.5 top-3 text-slate-400 text-xs">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-3.5 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap transition-all duration-300
                  ${
                    activeCategory === cat
                      ? "bg-[#0b2348] text-[#ffc107] shadow-sm"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-[#ffc107] hover:text-[#0b2348]"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* TABLE CONTAINER DENGAN SEKAT GARIS TEGAS ANTAR KOLOM */}
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xs overflow-hidden">
            {/* TABLE HEADER */}
            <div className="hidden lg:grid grid-cols-[110px_1.3fr_1.4fr_1.1fr_130px] items-center divide-x divide-slate-700 bg-[#0b2348] text-white">
              <span className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#ffc107]">Part</span>
              <span className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-200">Component</span>
              <span className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-200">Specification</span>
              <span className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-200">Compatible Unit</span>
              <span className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.18em] text-slate-200 text-right">Action</span>
            </div>

            {/* ROWS DENGAN DIVIDE-Y DAN DIVIDE-X UNTUK SEKAT GRID */}
            <div className="divide-y divide-slate-200">
              {filteredParts.length > 0 ? (
                filteredParts.map((item, index) => (
                  <FadeReveal key={item.id} delay={index * 60}>
                    <div className="
                      group relative grid grid-cols-1 lg:grid-cols-[110px_1.3fr_1.4fr_1.1fr_130px] items-center divide-x-0 lg:divide-x divide-slate-200 hover:bg-[#fffdf5] transition-all duration-300
                    ">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc107] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                      {/* IMAGE & CODE */}
                      <div className="flex lg:flex-col items-center lg:items-start gap-3 p-4 lg:p-5">
                        <div className="w-16 h-14 lg:w-20 lg:h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="lg:mt-1">
                          <p className="text-[8px] font-black text-[#b27b00] uppercase tracking-widest">PART</p>
                          <p className="text-[10px] font-mono font-bold text-[#0b2348] mt-0.5">{item.code}</p>
                        </div>
                      </div>

                      {/* COMPONENT */}
                      <div className="p-4 lg:p-5">
                        <div className="mb-1">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#fff8dc] text-[#a97800] text-[8px] font-black uppercase tracking-wide">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-xs md:text-sm font-black text-[#0b2348] leading-snug group-hover:text-[#a97800] transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-bold text-emerald-700">Original XCMG Part</span>
                        </div>
                      </div>

                      {/* SPECIFICATION */}
                      <div className="p-4 lg:p-5">
                        <p className="text-[8px] uppercase tracking-widest font-black text-slate-400 mb-0.5 lg:hidden">Spesifikasi</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.spec}</p>
                      </div>

                      {/* COMPATIBLE UNIT */}
                      <div className="p-4 lg:p-5">
                        <p className="text-[8px] uppercase tracking-widest font-black text-slate-400 mb-0.5 lg:hidden">Compatible Unit</p>
                        <p className="text-[10px] font-bold text-[#0b2348]">{item.unit}</p>
                      </div>

                      {/* ACTION */}
                      <div className="flex lg:justify-end items-center p-4 lg:p-5">
                        <a
                          href="/contact"
                          className="
                            inline-flex
                            items-center
                            justify-center
                            gap-1.5
                            px-4
                            py-2
                            rounded-xl
                            bg-[#0b2348]
                            text-white
                            text-[10px]
                            font-black
                            whitespace-nowrap
                            hover:bg-[#ffc107]
                            hover:text-[#0b2348]
                            transition-all
                            duration-300
                            shadow-2xs
                          "
                        >
                          <span>Tanya Part</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  </FadeReveal>
                ))
              ) : (
                <div className="py-16 text-center bg-white rounded-2xl">
                  <h3 className="text-sm font-black text-[#0b2348]">Suku cadang tidak ditemukan</h3>
                  <p className="text-xs text-slate-500 mt-1">Coba gunakan kata kunci atau kategori lainnya.</p>
                  <button
                    onClick={() => { setKeyword(""); setActiveCategory("Semua"); }}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#0b2348] text-white text-[11px] font-bold hover:bg-[#ffc107] hover:text-[#0b2348] transition"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER NOTE (IKON CENTANG PROFESIONAL TETAP ADA) */}
          <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#fff4c7] text-[#b27b00] flex items-center justify-center font-bold text-xs">✓</span>
              <span className="text-slate-500">Seluruh komponen merupakan katalog suku cadang <strong className="text-[#0b2348]">Original XCMG.</strong></span>
            </div>
            <a href="/contact" className="font-black text-[#0b2348] hover:text-[#b27b00] transition">
              Butuh bantuan mencari part? →
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================
          INFORMASI PEMESANAN (FULL WIDTH + BACKGROUND IMAGE)
      ========================================================= */}
      <section className="relative min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=2000&q=90"
          alt="Heavy Equipment"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#06162d]/88" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06162d] via-[#06162d]/90 to-[#06162d]/50" />

        <div className="absolute -right-20 -top-20 w-[350px] h-[350px] rounded-full border border-[#ffc107]/15 pointer-events-none" />
        <div className="absolute right-16 bottom-10 w-24 h-24 rounded-full border border-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-16 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">

            <FadeReveal>
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="w-6 h-[2px] bg-[#ffc107]" />
                  <span className="text-[9px] font-black tracking-[0.25em] uppercase text-[#ffc107]">
                    INFORMASI PEMESANAN
                  </span>
                  <span className="w-6 h-[2px] bg-[#ffc107]" />
                </div>

                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                  Butuh Suku Cadang <span className="text-[#ffc107]">Original XCMG?</span>
                </h2>

                <p className="max-w-xl mx-auto mt-3 text-xs md:text-sm text-slate-300 leading-relaxed">
                  Temukan part yang Anda butuhkan dari katalog kami, kemudian hubungi tim resmi Servistama Pro Indonesia untuk informasi harga dan ketersediaan.
                </p>
              </div>
            </FadeReveal>

            {/* THREE STEPS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xs">
              <FadeReveal delay={100}>
                <div className="h-full p-5 md:p-6 bg-[#06162d]/75 hover:bg-[#0b2348]/80 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#ffc107]">STEP</span>
                    <span className="text-2xl font-black text-white/10">01</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#ffc107] text-[#0b2348] flex items-center justify-center font-black text-xs mb-3">
                    01
                  </div>
                  <h3 className="text-xs font-black text-white mb-1.5">Catat Kode Part</h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Catat kode part atau nama komponen yang Anda inginkan dari katalog suku cadang.
                  </p>
                </div>
              </FadeReveal>

              <FadeReveal delay={180}>
                <div className="h-full p-5 md:p-6 bg-[#06162d]/75 hover:bg-[#0b2348]/80 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#ffc107]">STEP</span>
                    <span className="text-2xl font-black text-white/10">02</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-9 8.5 8.5 8.5 0 01-4.1-1.05L3 20l1.1-4.5A8.5 8.5 0 113 11.5" />
                    </svg>
                  </div>
                  <h3 className="text-xs font-black text-white mb-1.5">Hubungi Tim Kami</h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Kirim kode part melalui WhatsApp, email, atau hubungi sales resmi Servistama Pro Indonesia.
                  </p>
                </div>
              </FadeReveal>

              <FadeReveal delay={260}>
                <div className="h-full p-5 md:p-6 bg-[#06162d]/75 hover:bg-[#0b2348]/80 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#ffc107]">STEP</span>
                    <span className="text-2xl font-black text-white/10">03</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white text-[#0b2348] flex items-center justify-center font-black text-xs mb-3">
                    ✓
                  </div>
                  <h3 className="text-xs font-black text-white mb-1.5">Konfirmasi</h3>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Tim kami akan memberikan informasi mengenai harga, stok, kompatibilitas, dan proses selanjutnya.
                  </p>
                </div>
              </FadeReveal>
            </div>

            {/* BOTTOM CTA */}
            <FadeReveal delay={350}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3
                    rounded-xl
                    bg-[#ffc107]
                    text-[#0b2348]
                    font-black text-xs
                    uppercase tracking-wider
                    shadow-md shadow-black/20
                    hover:bg-white
                    transition-all duration-300
                  "
                >
                  <span>Hubungi Sales Sekarang</span>
                  <span>→</span>
                </a>

                <a
                  href="https://wa.me/6281122233344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3
                    rounded-xl
                    border border-white/20
                    bg-white/5
                    text-white
                    font-bold text-xs
                    backdrop-blur-sm
                    hover:bg-white
                    hover:text-[#0b2348]
                    transition-all duration-300
                  "
                >
                  <span>WhatsApp Support</span>
                  <span className="text-emerald-400">↗</span>
                </a>
              </div>
            </FadeReveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}