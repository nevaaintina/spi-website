import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
   FADE REVEAL
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
      {
        threshold: 0.1,
      }
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
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
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
   ICONS
========================================================= */

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M21 21l-4.35-4.35m2.1-5.15a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        d="M5 4.5A2.5 2.5 0 017.5 2H20v17H7.5A2.5 2.5 0 015 16.5v-12z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        d="M5 5h11M9 7.5h6M9 11h7"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
      />
      <circle cx="12" cy="12" r="2.5" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12l4 4L19 6"
      />
    </svg>
  );
}

function PartsIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        d="M4 7h16M4 12h16M4 17h10"
      />
      <circle cx="18" cy="17" r="2" strokeWidth="1.7" />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SpareParts() {
  /* =======================================================
     DATA PARTS
  ======================================================= */

  const partsCatalog = [
    {
      id: 1,
      code: "XCMG-HYD-092",
      name: "Hydraulic Pump Assembly",
      category: "Hydraulic System",
      unit: "Excavator XE210 / XE370",
      spec:
        "High pressure tolerance, original factory grade, optimal hydraulic flow rate.",
      stock: "Available",
    },
    {
      id: 2,
      code: "XCMG-FLT-401",
      name: "Original Engine Oil Filter",
      category: "Filters & Maintenance",
      unit: "All XCMG Heavy Units",
      spec:
        "Advanced micro-filtration technology with extended engine lifecycle protection.",
      stock: "Available",
    },
    {
      id: 3,
      code: "XCMG-UND-112",
      name: "Track Shoe & Chain Assembly",
      category: "Undercarriage",
      unit: "Crawler Crane & Excavator",
      spec:
        "Heavy-duty forged steel construction with high resistance for extreme terrain.",
      stock: "Available",
    },
    {
      id: 4,
      code: "XCMG-ENG-550",
      name: "Turbocharger Complete",
      category: "Engine Parts",
      unit: "Wheel Loader LW500KL",
      spec:
        "Optimized air intake boost designed to improve engine efficiency and performance.",
      stock: "Available",
    },
    {
      id: 5,
      code: "XCMG-ELC-780",
      name: "Control Monitor Display Panel",
      category: "Electrical System",
      unit: "Grader & Heavy Roller",
      spec:
        "Digital multifunction display with real-time operational and diagnostic indicators.",
      stock: "Available",
    },
    {
      id: 6,
      code: "XCMG-BRK-332",
      name: "Brake Friction Disc Kit",
      category: "Transmission & Brake",
      unit: "XCMG Off-Highway Truck",
      spec:
        "High thermal stability with durable anti-slip friction compound for heavy operation.",
      stock: "Available",
    },
    {
      id: 7,
      code: "XCMG-HYD-217",
      name: "Hydraulic Cylinder Seal Kit",
      category: "Hydraulic System",
      unit: "Excavator XE215 / XE305",
      spec:
        "Premium sealing components engineered for reliable hydraulic pressure retention.",
      stock: "Available",
    },
    {
      id: 8,
      code: "XCMG-FLT-520",
      name: "Hydraulic Return Filter",
      category: "Filters & Maintenance",
      unit: "Wheel Loader / Excavator",
      spec:
        "Fine filtration performance designed to protect hydraulic components.",
      stock: "Available",
    },
  ];

  /* =======================================================
     CATEGORY
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

  /* =======================================================
     STATE
  ======================================================= */

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [keyword, setKeyword] = useState("");

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredParts = partsCatalog.filter((item) => {
    const matchesCategory =
      activeCategory === "Semua" ||
      item.category === activeCategory;

    const searchKeyword = keyword.toLowerCase().trim();

    const matchesKeyword =
      item.name.toLowerCase().includes(searchKeyword) ||
      item.code.toLowerCase().includes(searchKeyword) ||
      item.category.toLowerCase().includes(searchKeyword) ||
      item.unit.toLowerCase().includes(searchKeyword);

    return matchesCategory && matchesKeyword;
  });

  /* =======================================================
     DOWNLOAD CATALOG
  ======================================================= */

  const handleDownloadCatalog = () => {
    const catalogText = `
PT. SERVISTAMA PRO INDONESIA
SPARE PARTS CATALOG

========================================

HYDRAULIC SYSTEM

- XCMG-HYD-092
  Hydraulic Pump Assembly
  Excavator XE210 / XE370

- XCMG-HYD-217
  Hydraulic Cylinder Seal Kit
  Excavator XE215 / XE305


FILTERS & MAINTENANCE

- XCMG-FLT-401
  Original Engine Oil Filter
  All XCMG Heavy Units

- XCMG-FLT-520
  Hydraulic Return Filter
  Wheel Loader / Excavator


UNDERCARRIAGE

- XCMG-UND-112
  Track Shoe & Chain Assembly
  Crawler Crane & Excavator


ENGINE PARTS

- XCMG-ENG-550
  Turbocharger Complete
  Wheel Loader LW500KL


ELECTRICAL SYSTEM

- XCMG-ELC-780
  Control Monitor Display Panel
  Grader & Heavy Roller


TRANSMISSION & BRAKE

- XCMG-BRK-332
  Bridge Friction Disc Kit
  XCMG Off-Highway Truck


For quotation and availability:

PT. SERVISTAMA PRO INDONESIA
`;

    const blob = new Blob([catalogText], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "SPI-Spare-Parts-Catalog.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans overflow-x-hidden">
      <Navbar />

      {/* =====================================================
         HERO BANNER (FULL SECTION BACKGROUND IMAGE)
      ===================================================== */}

      <section className="relative w-full min-h-[650px] lg:min-h-[720px] flex items-center overflow-hidden">

        {/* BACKGROUND IMAGE - FULL 1 SECTION */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=90')`,
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#071b38]/75" />

        {/* LEFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071b38] via-[#071b38]/80 to-transparent" />

        {/* BOTTOM GRADIENT */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071b38]/90 to-transparent" />

        {/* DECORATIVE DOTS */}
        <div className="absolute top-32 right-[38%] hidden lg:grid grid-cols-6 gap-2 opacity-25 pointer-events-none">
          {Array.from({ length: 30 }).map((_, index) => (
            <span
              key={index}
              className="w-1 h-1 rounded-full bg-[#ffc107]"
            />
          ))}
        </div>

        {/* DECORATIVE CIRCLES */}
        <div className="absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -right-20 top-32 w-[360px] h-[360px] rounded-full border border-[#ffc107]/15 pointer-events-none" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 xl:px-16 w-full py-24">

          <FadeReveal className="max-w-3xl">

            {/* LABEL */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-[2px] bg-[#ffc107]" />

              <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-[#ffc107] font-medium">
                Spare Parts & Components
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] leading-[1.05] tracking-tight font-medium text-white">
              Suku Cadang
              <br />
              <span className="text-[#ffc107]">
                Original XCMG
              </span>
            </h1>

            <div className="mt-7 w-16 h-[3px] bg-[#ffc107]" />

            {/* DESCRIPTION */}
            <p className="mt-7 text-sm md:text-base leading-7 text-slate-200 max-w-2xl font-normal">
              Temukan berbagai komponen dan suku cadang original
              untuk menjaga performa, keandalan, dan produktivitas
              alat berat Anda.
            </p>

            {/* BUTTONS */}
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

            {/* HERO INFO */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[11px] text-slate-200">

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#ffc107]/15 text-[#ffc107] flex items-center justify-center">
                  <CheckIcon />
                </span>
                Original XCMG Parts
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#ffc107]/15 text-[#ffc107] flex items-center justify-center">
                  <CheckIcon />
                </span>
                Technical Support
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#ffc107]/15 text-[#ffc107] flex items-center justify-center">
                  <CheckIcon />
                </span>
                Genuine Components
              </div>

            </div>

          </FadeReveal>

        </div>

        {/* BOTTOM LINE */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ffc107] z-20" />

      </section>

      {/* =====================================================
         QUICK ACTION BAR
      ===================================================== */}

      <section className="relative bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

          <div className="grid grid-cols-1 sm:grid-cols-3">

            <div className="flex items-center gap-4 py-5 sm:px-5 border-b sm:border-b-0 sm:border-r border-slate-200">

              <div className="w-10 h-10 rounded-xl bg-[#071b38] text-[#ffc107] flex items-center justify-center shrink-0">
                <PartsIcon />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Product Range
                </p>

                <p className="text-sm text-[#071b38] font-medium mt-0.5">
                  Genuine XCMG Parts
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 py-5 sm:px-5 border-b sm:border-b-0 sm:border-r border-slate-200">

              <div className="w-10 h-10 rounded-xl bg-[#fff8dc] text-[#b27b00] flex items-center justify-center shrink-0">
                <BookIcon />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Catalog
                </p>

                <p className="text-sm text-[#071b38] font-medium mt-0.5">
                  Part Specification
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 py-5 sm:px-5">

              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#071b38] flex items-center justify-center shrink-0">
                <CheckIcon />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Support
                </p>

                <p className="text-sm text-[#071b38] font-medium mt-0.5">
                  Technical Assistance
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
         CATALOG SECTION
      ===================================================== */}

      <section
        id="katalog-section"
        className="relative bg-[#f7f9fc] py-16 md:py-20"
      >

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

          {/* HEADER */}
          <FadeReveal>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 mb-8">

              <div className="max-w-2xl">

                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-7 h-[2px] bg-[#ffc107]" />

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">
                    Parts Catalog
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl text-[#071b38] font-medium tracking-tight">
                  Daftar Suku Cadang
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 max-w-xl">
                  Cari komponen berdasarkan nama, kode part,
                  kategori, atau unit alat berat yang digunakan.
                </p>

              </div>

              {/* SEARCH */}
              <div className="relative w-full lg:w-[300px]">

                <input
                  type="text"
                  placeholder="Cari kode atau nama part..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full h-11 pl-4 pr-11 rounded-xl bg-white border border-slate-200 text-xs text-[#071b38] outline-none focus:border-[#ffc107] focus:ring-2 focus:ring-[#ffc107]/10 transition"
                />

                <span className="absolute right-4 top-3.5 text-slate-400">
                  <SearchIcon />
                </span>

              </div>

            </div>

          </FadeReveal>

          {/* FILTER */}
          <FadeReveal delay={100}>

            <div className="flex gap-2 overflow-x-auto pb-3 mb-7 scrollbar-hide">

              {categories.map((category) => {

                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                      shrink-0
                      px-4
                      py-2.5
                      rounded-lg
                      text-xs
                      font-normal
                      transition-all
                      duration-300
                      border
                      ${
                        active
                          ? "bg-[#071b38] border-[#071b38] text-[#ffc107]"
                          : "bg-white border-slate-200 text-slate-500 hover:border-[#071b38] hover:text-[#071b38]"
                      }
                    `}
                  >
                    {category}
                  </button>
                );

              })}

            </div>

          </FadeReveal>

          {/* TABLE */}
          <FadeReveal delay={150}>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

              {/* TABLE HEADER */}
              <div className="hidden lg:grid grid-cols-[120px_1.45fr_1.6fr_1.25fr_120px] bg-[#071b38] text-white divide-x divide-white/10">

                <div className="px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-[#ffc107]">
                  Part
                </div>

                <div className="px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                  Component
                </div>

                <div className="px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                  Specification
                </div>

                <div className="px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                  Compatible Unit
                </div>

                <div className="px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-slate-300 text-right">
                  Action
                </div>

              </div>

              {/* TABLE BODY */}
              <div className="divide-y divide-slate-200">

                {filteredParts.length > 0 ? (

                  filteredParts.map((item) => (

                    <div
                      key={item.id}
                      className="group relative grid grid-cols-1 lg:grid-cols-[120px_1.45fr_1.6fr_1.25fr_120px] divide-y lg:divide-y-0 lg:divide-x divide-slate-200 hover:bg-[#fffdf5] transition-all duration-300"
                    >

                      {/* HOVER LINE */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffc107] opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* PART CODE */}
                      <div className="p-5">

                        <p className="text-[9px] uppercase tracking-[0.16em] text-[#b27b00] font-medium">
                          Part No.
                        </p>

                        <p className="mt-1.5 text-[11px] font-mono text-[#071b38]">
                          {item.code}
                        </p>

                      </div>

                      {/* COMPONENT */}
                      <div className="p-5">

                        <div className="flex items-start gap-3">

                          <div className="w-9 h-9 rounded-lg bg-[#071b38] text-[#ffc107] flex items-center justify-center shrink-0">
                            <PartsIcon />
                          </div>

                          <div>

                            <p className="text-[9px] text-[#b27b00] mb-1">
                              {item.category}
                            </p>

                            <h3 className="text-sm text-[#071b38] font-medium leading-snug group-hover:text-[#b27b00] transition-colors">
                              {item.name}
                            </h3>

                            <div className="flex items-center gap-1.5 mt-2">

                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                              <span className="text-[9px] text-emerald-700">
                                Original XCMG Part
                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* SPECIFICATION */}
                      <div className="p-5">

                        <p className="lg:hidden text-[9px] uppercase tracking-wider text-slate-400 mb-1">
                          Specification
                        </p>

                        <p className="text-xs text-slate-500 leading-5">
                          {item.spec}
                        </p>

                      </div>

                      {/* UNIT */}
                      <div className="p-5">

                        <p className="lg:hidden text-[9px] uppercase tracking-wider text-slate-400 mb-1">
                          Compatible Unit
                        </p>

                        <p className="text-xs text-[#071b38]">
                          {item.unit}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-1.5 text-[9px] text-emerald-700">

                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                          {item.stock}

                        </div>

                      </div>

                      {/* ACTION */}
                      <div className="p-5 flex lg:items-center lg:justify-end">

                        <a
                          href="/contact"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#071b38] text-white text-[10px] font-normal hover:bg-[#ffc107] hover:text-[#071b38] transition-all duration-300"
                        >
                          Tanya Part
                          <ChevronIcon />
                        </a>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="py-20 text-center">

                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                      <SearchIcon />
                    </div>

                    <h3 className="mt-4 text-sm text-[#071b38] font-medium">
                      Part tidak ditemukan
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Coba gunakan kata kunci atau kategori lainnya.
                    </p>

                    <button
                      onClick={() => {
                        setKeyword("");
                        setActiveCategory("Semua");
                      }}
                      className="mt-4 px-4 py-2 rounded-lg bg-[#071b38] text-white text-xs hover:bg-[#ffc107] hover:text-[#071b38] transition"
                    >
                      Reset Pencarian
                    </button>

                  </div>

                )}

              </div>

            </div>

          </FadeReveal>

          {/* FOOTNOTE */}
          <div className="mt-5 flex flex-col sm:flex-row justify-between gap-3 text-[10px] text-slate-500">

            <div className="flex items-center gap-2">

              <span className="w-5 h-5 rounded-full bg-[#fff6d6] text-[#a97800] flex items-center justify-center">
                <CheckIcon />
              </span>

              <span>
                Informasi katalog dapat dikonsultasikan dengan tim
                <strong className="text-[#071b38] ml-1">
                  Servistama Pro Indonesia.
                </strong>
              </span>

            </div>

            <a
              href="/contact"
              className="text-[#071b38] hover:text-[#b27b00] transition"
            >
              Butuh bantuan mencari part? →
            </a>

          </div>

        </div>

      </section>

      {/* =====================================================
         DOWNLOAD + EXPLODED VIEW CARDS
      ===================================================== */}

      <section
        id="exploded-view"
        className="relative bg-white py-16 md:py-20 overflow-hidden"
      >

        <div className="absolute -right-40 top-0 w-[400px] h-[400px] rounded-full border border-slate-100 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

          <FadeReveal>

            <div className="max-w-2xl mb-10">

              <div className="flex items-center gap-2.5 mb-3">

                <span className="w-7 h-[2px] bg-[#ffc107]" />

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">
                  Digital Parts Reference
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-medium text-[#071b38]">
                Katalog & Exploded View
              </h2>

              <p className="mt-3 text-sm text-slate-500 leading-6">
                Akses informasi suku cadang langsung dari website.
                Pilih katalog untuk melihat daftar part atau gunakan
                exploded view untuk memahami posisi dan hubungan
                antar komponen.
              </p>

            </div>

          </FadeReveal>

          {/* TWO ACTION CARDS */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* DOWNLOAD */}
            <FadeReveal delay={100}>

              <div className="h-full rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 hover:border-[#ffc107] hover:shadow-xl transition-all duration-300">

                <div className="flex items-start justify-between gap-5">

                  <div className="w-12 h-12 rounded-xl bg-[#071b38] text-[#ffc107] flex items-center justify-center">
                    <DownloadIcon />
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    Catalog
                  </span>

                </div>

                <h3 className="mt-6 text-xl text-[#071b38] font-medium">
                  Download Parts Catalog
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Simpan daftar referensi suku cadang untuk kebutuhan
                  pengecekan kode, nama komponen, dan kompatibilitas
                  unit.
                </p>

                <button
                  onClick={handleDownloadCatalog}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#071b38] text-white text-xs font-normal hover:bg-[#ffc107] hover:text-[#071b38] transition-all"
                >
                  <DownloadIcon />
                  Download Catalog
                </button>

              </div>

            </FadeReveal>

            {/* EXPLODED VIEW */}
            <FadeReveal delay={180}>

              <div className="h-full rounded-2xl border border-slate-200 bg-[#071b38] p-7 text-white hover:shadow-xl transition-all duration-300">

                <div className="flex items-start justify-between gap-5">

                  <div className="w-12 h-12 rounded-xl bg-[#ffc107] text-[#071b38] flex items-center justify-center">
                    <EyeIcon />
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    Interactive View
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-medium">
                  Exploded View
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Lihat struktur komponen secara lebih detail untuk
                  membantu identifikasi posisi, susunan, dan hubungan
                  antar spare parts.
                </p>

                <a
                  href="#exploded-panel"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#071b38] text-xs font-normal hover:bg-[#ffc107] transition-all"
                >
                  <EyeIcon />
                  Buka Exploded View
                </a>

              </div>

            </FadeReveal>

          </div>

        </div>

      </section>

      {/* =====================================================
         EXPLODED VIEW PANEL (DENGAN KALIMAT PENUTUP)
      ===================================================== */}

      <section
        id="exploded-panel"
        className="bg-[#f7f9fc] py-16 md:py-20 scroll-mt-24"
      >

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

          <FadeReveal>

            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-5 mb-8">

              <div>

                <div className="flex items-center gap-2.5 mb-3">

                  <span className="w-7 h-[2px] bg-[#ffc107]" />

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a97800] font-medium">
                    Exploded View
                  </span>

                </div>

                <h2 className="text-3xl font-medium text-[#071b38]">
                  Component Reference
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Pilih komponen untuk melihat detail part dan
                  kompatibilitasnya.
                </p>

              </div>

              <div className="text-xs text-slate-400">
                Interactive Parts Reference
              </div>

            </div>

          </FadeReveal>

          {/* EXPLODED VIEW UI */}
          <FadeReveal delay={100}>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">

              {/* TOP HEADER */}
              <div className="bg-[#071b38] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#ffc107]">
                    Assembly
                  </p>

                  <h3 className="mt-1 text-white text-lg font-medium">
                    Hydraulic System Assembly
                  </h3>

                </div>

                <select
                  className="bg-white/10 border border-white/15 text-white text-xs rounded-lg px-4 py-2.5 outline-none"
                  defaultValue="hydraulic"
                >

                  <option
                    value="hydraulic"
                    className="text-[#071b38]"
                  >
                    Hydraulic System
                  </option>

                  <option
                    value="engine"
                    className="text-[#071b38]"
                  >
                    Engine System
                  </option>

                  <option
                    value="undercarriage"
                    className="text-[#071b38]"
                  >
                    Undercarriage
                  </option>

                  <option
                    value="electrical"
                    className="text-[#071b38]"
                  >
                    Electrical System
                  </option>

                </select>

              </div>

              {/* COMPONENT DIAGRAM */}
              <div className="p-6 md:p-10">

                <div className="relative max-w-5xl mx-auto min-h-[390px] rounded-2xl bg-[#f8fafc] border border-slate-200 overflow-hidden">

                  {/* CENTER MACHINE */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-[#071b38]/15 flex items-center justify-center">

                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-[#ffc107] flex items-center justify-center">

                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#071b38] text-[#ffc107] flex items-center justify-center">
                          <PartsIcon />
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* CONNECTION LINES */}
                  <div className="absolute left-[22%] top-[30%] w-[28%] h-px bg-[#ffc107]" />

                  <div className="absolute right-[22%] top-[30%] w-[28%] h-px bg-[#ffc107]" />

                  <div className="absolute left-[22%] bottom-[30%] w-[28%] h-px bg-[#ffc107]" />

                  <div className="absolute right-[22%] bottom-[30%] w-[28%] h-px bg-[#ffc107]" />

                  {/* PART 01 */}
                  <div className="absolute left-5 md:left-10 top-10 w-40 md:w-52">

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] text-[#b27b00]">
                          01
                        </span>

                        <span className="w-2 h-2 rounded-full bg-emerald-500" />

                      </div>

                      <p className="mt-2 text-xs font-medium text-[#071b38]">
                        Hydraulic Pump
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400">
                        XCMG-HYD-092
                      </p>

                    </div>

                  </div>

                  {/* PART 02 */}
                  <div className="absolute right-5 md:right-10 top-10 w-40 md:w-52">

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] text-[#b27b00]">
                          02
                        </span>

                        <span className="w-2 h-2 rounded-full bg-emerald-500" />

                      </div>

                      <p className="mt-2 text-xs font-medium text-[#071b38]">
                        Control Valve
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400">
                        XCMG-HYD-104
                      </p>

                    </div>

                  </div>

                  {/* PART 03 */}
                  <div className="absolute left-5 md:left-10 bottom-10 w-40 md:w-52">

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] text-[#b27b00]">
                          03
                        </span>

                        <span className="w-2 h-2 rounded-full bg-emerald-500" />

                      </div>

                      <p className="mt-2 text-xs font-medium text-[#071b38]">
                        Hydraulic Hose
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400">
                        XCMG-HYD-125
                      </p>

                    </div>

                  </div>

                  {/* PART 04 */}
                  <div className="absolute right-5 md:right-10 bottom-10 w-40 md:w-52">

                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">

                      <div className="flex items-center justify-between">

                        <span className="text-[9px] text-[#b27b00]">
                          04
                        </span>

                        <span className="w-2 h-2 rounded-full bg-emerald-500" />

                      </div>

                      <p className="mt-2 text-xs font-medium text-[#071b38]">
                        Seal Kit
                      </p>

                      <p className="mt-1 text-[9px] text-slate-400">
                        XCMG-HYD-217
                      </p>

                    </div>

                  </div>

                  {/* CENTER LABEL */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[95px]">

                    <span className="px-3 py-1.5 rounded-full bg-[#ffc107] text-[#071b38] text-[9px] font-medium whitespace-nowrap">
                      Assembly Overview
                    </span>

                  </div>

                </div>

                {/* COMPONENT TABLE */}
                <div className="mt-7 overflow-x-auto">

                  <table className="w-full text-left border-collapse">

                    <thead>

                      <tr className="border-b border-slate-200">

                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                          No.
                        </th>

                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                          Component
                        </th>

                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                          Part Number
                        </th>

                        <th className="py-3 px-3 text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-100">

                      {[
                        [
                          "01",
                          "Hydraulic Pump",
                          "XCMG-HYD-092",
                        ],
                        [
                          "02",
                          "Control Valve",
                          "XCMG-HYD-104",
                        ],
                        [
                          "03",
                          "Hydraulic Hose",
                          "XCMG-HYD-125",
                        ],
                        [
                          "04",
                          "Seal Kit",
                          "XCMG-HYD-217",
                        ],
                      ].map((row) => (

                        <tr
                          key={row[0]}
                          className="hover:bg-[#fffdf5] transition"
                        >

                          <td className="py-3.5 px-3 text-xs text-[#b27b00]">
                            {row[0]}
                          </td>

                          <td className="py-3.5 px-3 text-xs text-[#071b38] font-medium">
                            {row[1]}
                          </td>

                          <td className="py-3.5 px-3 text-xs font-mono text-slate-500">
                            {row[2]}
                          </td>

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

          {/* PENUTUP SETELAH MELIHAT EXPLODED VIEW */}
          <div className="mt-8 text-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-slate-500">
              Demikian rujukan struktur diagram komponen (*exploded view*) untuk memastikan kecocokan dan posisi pemasangan suku cadang unit Anda.
            </p>
          </div>

        </div>

      </section>

      {/* =====================================================
         CTA
      ===================================================== */}

      <section className="relative bg-[#071b38] py-16 md:py-20 overflow-hidden">

        <div className="absolute -right-32 -top-32 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />

        <div className="absolute left-10 bottom-10 w-20 h-20 rounded-full border border-[#ffc107]/20 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">

          <FadeReveal>

            <span className="text-[10px] uppercase tracking-[0.22em] text-[#ffc107] font-medium">
              Need Assistance?
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl text-white font-medium">
              Butuh bantuan mencari
              <span className="text-[#ffc107]">
                {" "}suku cadang?
              </span>
            </h2>

            <p className="mt-4 text-sm text-slate-300 leading-6 max-w-xl mx-auto">
              Tim Servistama Pro Indonesia siap membantu Anda
              menemukan part yang sesuai berdasarkan kode,
              model unit, maupun kebutuhan teknis.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              {/* HUBUNGI SALES */}
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ffc107] text-[#071b38] text-xs font-medium hover:bg-white transition"
              >
                Hubungi Sales
                <span>→</span>
              </a>

              {/* WHATSAPP SUPPORT (TANPA EMBEL-EMBEL EMOTICON WARNA BIRU) */}
              <a
                href="https://wa.me/6281122233344"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white text-xs font-medium hover:bg-white hover:text-[#071b38] transition"
              >
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