import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const categoryIcons = {
  "All": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  "Excavator": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 19h18M5 19l2-7h5l2 7M7 12l3-7h4l2 7M14 5h3l3 7h-5" />
    </svg>
  ),
  "Wheel Loader": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17l2-7h7l4 7M14 10l3-4h3v4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Motor Grader": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17l2-6h7l3 6M14 11l3-4h3v4M8 8h4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Crane": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 20V5h13M5 6h13M8 20h8M18 6l3 7M21 13h-3M15 13v7" />
    </svg>
  ),
  "Dump Truck": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 17h18M5 17V8h9l4 4h3v5M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Mining Equipment": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M4 18h16M6 18V8l6-4 6 4v10M9 18v-5h6v5M8 9h8" />
    </svg>
  ),
  "Road": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 4L6 20M15 4l3 16M12 5v3M12 11v3M12 17v2" />
    </svg>
  ),
};

const defaultCategoryIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

export default function ProductIndex({ categories = [], products = [], currentCategory = 'all', product_setting = null }) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const getCleanImageUrl = (path, fallback) => {
    if (!path) return fallback;
    if (path.startsWith('http')) return path;
    const cleaned = path.replace(/^storage\//, '');
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  };

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug);
    router.get('/products', { category: categorySlug }, { preserveState: true, preserveScroll: true });
  };

  const categoryList = [
    { name: "All", slug: "all", icon: categoryIcons["All"] },
    ...categories.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      icon: categoryIcons[cat.name] || defaultCategoryIcon
    }))
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Head title="Katalog Produk & Alat Berat - PT Servistama Pro Indonesia" />
      <Navbar />

      {/* HERO BANNER DINAMIS */}
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
                {product_setting?.hero_title_part1 || 'Solusi Alat Berat &'} <br />
                <span className="text-[#f9aa00]">{product_setting?.hero_title_part2 || 'Suku Cadang XCMG'}</span>
              </h1>

              <p className="mt-7 max-w-[620px] text-[15px] md:text-[16px] leading-7 text-slate-500 font-medium">
                {product_setting?.hero_description || 'Temukan berbagai lini produk berkualitas tinggi untuk mendukung efisiensi dan produktivitas proyek konstruksi serta pertambangan Anda.'}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-4 bg-[#0f2b5c] hover:bg-[#183b76] text-white px-7 py-4 rounded-xl text-sm font-bold shadow-lg shadow-[#0f2b5c]/20 transition-all duration-300 hover:-translate-y-1"
                >
                  LIHAT PRODUK
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-5-5l5 5-5 5" />
                  </svg>
                </a>

                {product_setting?.catalog_pdf && (
                  <a
                    href={`/${product_setting.catalog_pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-[#0f2b5c] border border-slate-200 px-7 py-4 rounded-xl text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 text-[#f9aa00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    DOWNLOAD KATALOG (PDF)
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-full lg:w-[63%] h-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center lg:bg-[center_right]"
              style={{
                backgroundImage: `url('${getCleanImageUrl(product_setting?.hero_image, '/images/internship.png')}')`,
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
      </section>

      {/* PRODUCT SECTION */}
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
            {categoryList.map((category) => {
              const active = selectedCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`
                    shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold transition-all duration-300 cursor-pointer
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

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <a
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative bg-[#fcfcfc] border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:bg-[#0b2348] transition-all duration-500 flex flex-col justify-between h-[340px] p-6 text-center"
              >
                <div className="my-auto flex flex-col items-center justify-center transition-all duration-500 group-hover:-translate-y-8">
                  <div className="relative w-full h-48 flex items-center justify-center mb-4">
                    <img
                      src={getCleanImageUrl(product.image, "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80")}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-base font-normal text-slate-700 group-hover:text-white transition-colors duration-300 tracking-wide">
                    {product.name}
                  </h3>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 bg-[#0b2348] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col items-center justify-end text-center z-20">
                  <h3 className="text-base font-normal text-white tracking-wide mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-2">
                    {product.overview || product.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffc107]">
                    Lihat Produk <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {products.length === 0 && (
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