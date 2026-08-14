import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
   PRODUCT DATA (KOMATSU EXACT STYLE)
========================================================= */
const productList = [
  {
    slug: "excavator-xe200",
    name: "Ekskavator Hidrolik",
    category: "Excavator",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    description:
      "Ekskavator yang mendukung sektor pembangunan, perhutanan, pertanian, dan pertambangan.",
  },
  {
    slug: "wheel-loader-zl50",
    name: "Dump Truck",
    category: "Wheel Loader",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    description:
      "Daya angkut besar, stabil, dan siap bekerja di berbagai medan operasional berat.",
  },
  {
    slug: "motor-grader-gr135",
    name: "Bulldozer",
    category: "Motor Grader",
    image:
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=85",
    description:
      "Bulldozer yang tangguh di berbagai macam sektor pertambangan dan konstruksi.",
  },
  {
    slug: "crane-xct25",
    name: "Motor Grader",
    category: "Crane",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Solusi presisi tinggi untuk perataan tanah dengan performa optimal.",
  },
  {
    slug: "dump-truck-nbe",
    name: "Dump Truck Mining",
    category: "Dump Truck",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Kapasitas muat dan ketahanan tinggi untuk operasional berat.",
  },
  {
    slug: "mining-equipment-ex",
    name: "Mining Equipment Heavy",
    category: "Mining Equipment",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=85",
    description:
      "Peralatan heavy equipment untuk kebutuhan operasional tambang.",
  },
  {
    slug: "road-roller-xs123",
    name: "Road Roller XS123",
    category: "Road",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    description:
      "Memberikan hasil pemadatan yang konsisten untuk jalan raya.",
  },
];

/* =========================================================
   CATEGORY DATA
========================================================= */
const categories = [
  {
    name: "All",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    name: "Excavator",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 19h18M5 19l2-7h5l2 7M7 12l3-7h4l2 7M14 5h3l3 7h-5" />
      </svg>
    ),
  },
  {
    name: "Wheel Loader",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17l2-7h7l4 7M14 10l3-4h3v4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Motor Grader",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17l2-6h7l3 6M14 11l3-4h3v4M8 8h4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Crane",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 20V5h13M5 6h13M8 20h8M18 6l3 7M21 13h-3M15 13v7" />
      </svg>
    ),
  },
  {
    name: "Dump Truck",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17V8h9l4 4h3v5M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Mining Equipment",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M4 18h16M6 18V8l6-4 6 4v10M9 18v-5h6v5M8 9h8" />
      </svg>
    ),
  },
  {
    name: "Road",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 4L6 20M15 4l3 16M12 5v3M12 11v3M12 17v2" />
      </svg>
    ),
  },
];

/* =========================================================
   STAT ICONS
========================================================= */
function PeopleIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" strokeWidth="1.7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 7v5l3 2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="2.5" strokeWidth="1.7" />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function ProductIndex() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? productList
      : productList.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Navbar />

      {/* =====================================================
          HERO BANNER
      ===================================================== */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute left-0 top-20 w-[330px] h-[250px] opacity-40 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
              maskImage: "linear-gradient(to right, black, transparent)",
              WebkitMaskImage: "linear-gradient(to right, black, transparent)",
            }}
          />
        </div>

        <div className="relative min-h-[500px] lg:min-h-[535px]">
          <div className="relative z-20 w-full lg:w-[55%] min-h-[500px] lg:min-h-[535px] flex items-center">
            <div className="w-full max-w-[1380px] mx-auto px-7 sm:px-10 lg:px-16 xl:px-20 py-20 lg:py-24">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-[3px] bg-[#ffc107]" />
                <span className="text-sm md:text-[15px] font-extrabold tracking-[0.08em] text-[#0f2b5c] uppercase">
                  KATALOG ALAT BERAT & PRODUK
                </span>
              </div>

              <h1 className="max-w-[700px] text-[44px] sm:text-[52px] md:text-[62px] xl:text-[68px] leading-[1.02] tracking-[-0.035em] font-black text-[#102f62]">
                Solusi Alat Berat & <br />
                Suku Cadang <span className="text-[#f9aa00]">XCMG</span>
              </h1>

              <p className="mt-7 max-w-[620px] text-[15px] md:text-[16px] leading-7 text-slate-500 font-medium">
                Temukan berbagai lini produk berkualitas tinggi untuk mendukung efisiensi dan produktivitas proyek konstruksi serta pertambangan Anda.
              </p>

              <div className="mt-7">
                <a
                  href="#products"
                  className="inline-flex items-center gap-4 bg-[#0f2b5c] hover:bg-[#183b76] text-white px-7 py-4 rounded-xl text-sm font-extrabold shadow-lg shadow-[#0f2b5c]/20 transition-all duration-300 hover:-translate-y-1"
                >
                  LIHAT PRODUK
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-5-5l5 5-5 5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-full lg:w-[63%] h-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center lg:bg-[center_right]"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=90')",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.96) 13%, rgba(255,255,255,0.78) 27%, rgba(255,255,255,0.20) 48%, rgba(255,255,255,0) 65%)",
              }}
            />
          </div>
        </div>

        {/* STATISTICS FLOATING CARD */}
        <div className="relative z-30 -mt-2 lg:-mt-7 px-5 sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-[1380px] mx-auto">
            <div className="relative bg-white rounded-2xl lg:rounded-[22px] border border-slate-200 shadow-[0_15px_45px_rgba(15,43,92,0.12)] overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffc107]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative flex items-center gap-5 px-7 lg:px-8 py-6 lg:py-7">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-md">
                    <PeopleIcon />
                  </div>
                  <div>
                    <div className="text-[25px] font-black leading-none text-[#102f62]">200+</div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#102f62]">Tenaga Ahli</div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">Berpengalaman dan kompeten</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-5 px-7 lg:px-8 py-6 lg:py-7">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-md">
                    <ClockIcon />
                  </div>
                  <div>
                    <div className="text-[25px] font-black leading-none text-[#102f62]">24/7</div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#102f62]">Layanan Responsif</div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">Siap mendukung kebutuhan Anda.</p>
                  </div>
                </div>
                <div className="relative flex items-center gap-5 px-7 lg:px-8 py-6 lg:py-7">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-md">
                    <ShieldIcon />
                  </div>
                  <div>
                    <div className="text-[25px] font-black leading-none text-[#102f62]">100%</div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#102f62]">Kualitas Terjamin</div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">Standar layanan terbaik untuk proyek.</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 px-7 lg:px-8 py-6 lg:py-7">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-md">
                    <LocationIcon />
                  </div>
                  <div>
                    <div className="text-[21px] font-black leading-tight text-[#102f62]">Nasional</div>
                    <div className="mt-1 text-[14px] font-extrabold text-[#102f62]">Jangkauan Layanan</div>
                    <p className="mt-1 text-[11px] leading-5 text-slate-500">Dukungan layanan di berbagai wilayah.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCT SECTION (EXACT KOMATSU STYLE: WHITE CARD, HOVER NAVY + SLIDE UP TEXT)
      ===================================================== */}
      <section id="products" className="relative bg-white py-16 lg:py-20">
        <div className="relative max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-[2px] bg-[#ffc107]" />
                <span className="text-[11px] font-black tracking-[0.16em] uppercase text-[#0f2b5c]">
                  OUR PRODUCTS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f2b5c] tracking-tight">
                Pilihan Alat Berat <span className="text-[#ffc107]">Berkualitas</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500 font-light">
              Pilih kategori untuk menemukan produk yang sesuai dengan kebutuhan proyek Anda.
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide">
            {categories.map((category) => {
              const active = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`
                    shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold transition-all duration-300
                    ${
                      active
                        ? "bg-[#0f2b5c] border-[#0f2b5c] text-[#ffc107]"
                        : "bg-white border-slate-200 text-slate-600 hover:border-[#0f2b5c]"
                    }
                  `}
                >
                  <span className={active ? "text-[#ffc107]" : "text-[#0f2b5c]"}>{category.icon}</span>
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* PRODUCT GRID - KOMATSU STYLE EXACT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <a
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative bg-[#fcfcfc] border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:bg-[#0b2348] transition-all duration-500 flex flex-col justify-between h-[340px] p-6 text-center"
              >
                {/* DEFAULT STATE: CLEAN WHITE CARD WITH CENTERED IMAGE & NAME AT BOTTOM */}
                <div className="my-auto flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-8">
                  <div className="relative w-full h-48 flex items-center justify-center mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-base font-normal text-slate-700 group-hover:text-white transition-colors duration-300 tracking-wide">
                    {product.name}
                  </h3>
                </div>

                {/* HOVER REVEAL: SLIDE UP BLUE/NAVY BOX WITH NAME, DESCRIPTION, AND "LIHAT PRODUK" REDIRECTING TO SHOW */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-[#0b2348] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col items-center justify-end text-center z-20">
                  <h3 className="text-base font-normal text-white tracking-wide mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffc107]">
                    Lihat Produk <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="text-base font-bold text-[#0f2b5c]">Produk tidak ditemukan</h3>
              <p className="mt-1 text-xs text-slate-400 font-light">Belum ada produk pada kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}