import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
    ICON COMPONENT
========================================================= */
function Icon({ type, className = "w-6 h-6" }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
  };

  if (type === "shield") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeWidth="1.8" d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "gear") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 13.5l1.2 1 .-1.8 3.1-1.5-.6a7.4 7.4 0 01-1.7 1l-.2 1.6h-3.5l-.2-1.6a7.4 7.4 0 01-1.7-1l-1.5.6-1.8-3.1 1.2-1a7.2 7.2 0 010-2l-1.2-1 1.8-3.1 1.5.6a7.4 7.4 0 011.7-1l.2-1.6h3.5l.2 1.6a7.4 7.4 0 011.7 1l1.5-.6 1.8 3.1-1.2 1a7.2 7.2 0 010 2z" />
      </svg>
    );
  }

  if (type === "award") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4.5" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.5 12l-1 8 3.5-2 3.5 2-1-8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.5 8l1 1 2-2" />
      </svg>
    );
  }

  if (type === "weight") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 20h12l-1.5-12h-9L6 20z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 8a3 3 0 016 0" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 14h4" />
      </svg>
    );
  }

  if (type === "bucket") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 15h14l-2 4H7l-2-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 15l2-8h4l2 8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 7h4" />
      </svg>
    );
  }

  if (type === "engine") {
    return (
      <svg {...common}>
        <rect x="4" y="7" width="14" height="10" rx="2" strokeWidth="1.8" />
        <path strokeLinecap="round" strokeWidth="1.8" d="M18 10h3v4h-3M7 4v3M11 4v3M15 4v3M7 17v3M11 17v3M15 17v3" />
        <circle cx="11" cy="12" r="2" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "play") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  }

  if (type === "download") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4v11" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 11l4 4 4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 20h14" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H11l-5 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 10h8M8 13h5" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 11l9-8 9 8" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M5 10v10h14V10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 20v-6h6v6" />
      </svg>
    );
  }

  return null;
}

/* =========================================================
    MAIN COMPONENT (DINAMIS DARI DATABASE)
========================================================= */
export default function ProductShow({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Deskripsi");

  const tabs = ["Deskripsi", "Spesifikasi", "Fitur Unggulan", "Galeri", "Dokumen", "Video"];

  const getCleanUrl = (path, fallback) => {
    if (!path) return fallback;
    if (path.startsWith('http')) return path;
    const cleaned = path.replace(/^storage\//, '');
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  };

  const mainImage = getCleanUrl(product.image, "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80");
  
  // Menggabungkan foto utama dan galeri tambahan
  const galleryList = [
    mainImage,
    ...(product.gallery_images ? product.gallery_images.map(img => getCleanUrl(img, mainImage)) : [])
  ];

  const specifications = product.specifications && product.specifications.length > 0 
    ? product.specifications 
    : [{ label: "Model", value: product.name }, { label: "Kategori", value: product.category?.name || "Alat Berat" }];

  const features = product.key_features && product.key_features.length > 0 
    ? product.key_features 
    : [product.overview || product.description];

  const stats = [
    { title: "Kategori", value: product.category?.name || "XCMG", icon: "weight" },
    { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    { title: "Dukungan Teknis", value: "24 / 7", icon: "clock" },
    { title: "Layanan", value: "Tersedia", icon: "gear" },
  ];

  const benefits = [
    { title: "Mesin Handal", subtitle: "Performa Tinggi", icon: "award" },
    { title: "Fitur Keselamatan", subtitle: "Standar Internasional", icon: "shield" },
    { title: "Perawatan Mudah", subtitle: "Sistem Terpusat", icon: "gear" },
    { title: "Layanan 24/7", subtitle: "Dukungan Ahli", icon: "clock" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Head title={`${product.name} - PT Servistama Pro Indonesia`} />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* BREADCRUMB */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mb-6">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-400 overflow-x-auto whitespace-nowrap">
            <a href="/" className="flex items-center gap-1.5 hover:text-[#0f2b5c] transition">
              <Icon type="home" className="w-3.5 h-3.5" />
              Home
            </a>
            <span>›</span>
            <a href="/products" className="hover:text-[#0f2b5c] transition">
              Products
            </a>
            <span>›</span>
            <span>{product.category?.name || "Katalog"}</span>
            <span>›</span>
            <span className="font-bold text-[#0f2b5c]">{product.name}</span>
          </div>
        </div>

        {/* HERO PRODUCT */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[28px] bg-slate-100 border border-slate-200 shadow-sm">
                <div className="relative h-[390px] sm:h-[470px] lg:h-[500px] overflow-hidden">
                  <img
                    src={galleryList[activeImage] || mainImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#071b38]/80 to-transparent pointer-events-none" />

                  <div className="absolute top-5 left-5">
                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#0f2b5c] text-xs font-black shadow-md">
                      {String(activeImage + 1).padStart(2, "0")} / {String(galleryList.length).padStart(2, "0")}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveImage(activeImage === 0 ? galleryList.length - 1 : activeImage - 1)}
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#0f2b5c] flex items-center justify-center shadow-lg hover:bg-[#ffc107] transition cursor-pointer"
                  >
                    <span className="text-xl">‹</span>
                  </button>

                  <button
                    onClick={() => setActiveImage(activeImage === galleryList.length - 1 ? 0 : activeImage + 1)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#0f2b5c] flex items-center justify-center shadow-lg hover:bg-[#ffc107] transition cursor-pointer"
                  >
                    <span className="text-xl">›</span>
                  </button>

                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-5">
                    <div className="flex justify-center gap-2.5 overflow-x-auto pb-1">
                      {galleryList.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`
                            shrink-0 w-[72px] h-[54px] sm:w-[88px] sm:h-[62px] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer
                            ${activeImage === index ? "border-[#ffc107] scale-105 shadow-lg" : "border-white/80 opacity-90 hover:opacity-100"}
                          `}
                        >
                          <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#fff4ce] border border-[#ffc107]/50 text-[11px] font-black text-[#0f2b5c] uppercase tracking-wide">
                {product.category?.name || "XCMG Product"}
              </span>

              <h1 className="mt-4 text-[38px] sm:text-[48px] xl:text-[52px] leading-[0.98] font-black tracking-[-0.035em]">
                {product.name}
              </h1>

              <p className="mt-5 text-sm sm:text-[15px] leading-7 text-slate-600 max-w-2xl">
                {product.overview || product.description}
              </p>

              <div className="mt-7 grid grid-cols-2 xl:grid-cols-4 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="min-h-[112px] rounded-2xl border border-slate-200 bg-white px-3 py-4 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-[#f4f7fb] text-[#0f2b5c] flex items-center justify-center mb-3">
                      <Icon type={benefit.icon} className="w-6 h-6" />
                    </div>
                    <h3 className="text-[11px] sm:text-xs font-black text-[#0f2b5c] leading-tight">{benefit.title}</h3>
                    <p className="mt-1 text-[9px] sm:text-[10px] text-slate-500 leading-tight">{benefit.subtitle}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div key={stat.title} className={`min-h-[125px] px-4 py-5 flex flex-col items-center justify-center text-center ${index !== stats.length - 1 ? "border-b md:border-b-0 md:border-r border-slate-200" : ""}`}>
                      <div className="text-[#0f2b5c] mb-3">
                        <Icon type={stat.icon} className="w-7 h-7" />
                      </div>
                      <p className="text-[10px] text-slate-500">{stat.title}</p>
                      <p className="mt-1 text-sm font-black text-[#0f2b5c]">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/6281122233344?text=Halo%20SPI,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[58px] rounded-xl bg-[#ffc107] hover:bg-[#eaae00] text-[#0f2b5c] font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Icon type="chat" className="w-5 h-5" />
                  Minta Penawaran
                </a>
                <a
                  href="/contact-us"
                  className="min-h-[58px] rounded-xl border-2 border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white font-black text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Konsultasi Produk
                  <Icon type="arrow" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TABS NAVIGATION */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 sm:px-8 py-5 text-sm font-bold transition-all cursor-pointer ${activeTab === tab ? "text-[#0f2b5c]" : "text-slate-500 hover:text-[#0f2b5c]"}`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute left-5 right-5 bottom-0 h-[3px] rounded-full bg-[#ffc107]" />}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CONTENT TABS */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mt-4">
          {activeTab === "Deskripsi" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#ffc107] rounded-r-full" />
                <div className="pl-3">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-7 h-[2px] bg-[#ffc107]" />
                    <span className="text-[11px] font-black tracking-widest text-[#0f2b5c] uppercase">Product Overview</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0f2b5c] mb-4">Deskripsi Produk</h2>
                  <p className="text-sm text-slate-600 leading-7">{product.description}</p>
                  
                  <div className="mt-6 space-y-3">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center text-[11px] font-black">✓</span>
                        <span className="text-xs sm:text-sm text-slate-600 leading-5">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 bg-[#ffc107] rounded-full" />
                  <h2 className="text-lg font-black text-[#0f2b5c]">Spesifikasi Utama</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {specifications.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="py-3 flex flex-col gap-1">
                      <span className="text-[10px] text-slate-400">{item.label}</span>
                      <strong className="text-xs text-[#0f2b5c]">{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-6 bg-[#ffc107] rounded-full" />
                  <h2 className="text-lg font-black text-[#0f2b5c]">Video Demonstrasi</h2>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#071b38]">
                  {product.video_url ? (
                    product.video_url.includes('youtube.com') || product.video_url.includes('youtu.be') ? (
                      <iframe className="absolute inset-0 w-full h-full" src={product.video_url} title="Demo" frameBorder="0" allowFullScreen />
                    ) : (
                      <video className="absolute inset-0 w-full h-full object-cover" controls src={`/${product.video_url}`} />
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-slate-400">Video belum tersedia</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Spesifikasi" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Spesifikasi Teknis Lengkap
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-slate-100 text-sm">
                    <span className="text-slate-500 font-medium">{spec.label}</span>
                    <span className="font-bold text-[#0f2b5c] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Fitur Unggulan" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Fitur Unggulan & Keunggulan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-black shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f2b5c] text-base mb-1">Fitur Utama #{idx + 1}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Galeri" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Galeri Foto Produk
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryList.map((imgUrl, index) => (
                  <div key={index} onClick={() => setActiveImage(index)} className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 aspect-[4/3] bg-slate-100">
                    <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Dokumen" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Brosur & Dokumen Teknis
              </h2>
              <div className="space-y-4 max-w-xl">
                {product.brochure_file ? (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs">PDF</div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0f2b5c]">Brosur Katalog {product.name}</h4>
                        <p className="text-[11px] text-slate-400">Dokumen Resmi PDF</p>
                      </div>
                    </div>
                    <a href={`/${product.brochure_file}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-[#ffc107] hover:bg-[#eaae00] text-[#0f2b5c] transition">
                      <Icon type="download" className="w-5 h-5" />
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Dokumen brosur PDF belum diunggah untuk produk ini.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "Video" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Video Media
              </h2>
              <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                {product.video_url ? (
                  product.video_url.includes('youtube.com') || product.video_url.includes('youtu.be') ? (
                    <iframe className="w-full h-full" src={product.video_url} title="Video" frameBorder="0" allowFullScreen />
                  ) : (
                    <video className="w-full h-full object-cover" controls src={`/${product.video_url}`} />
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-slate-400">Video belum tersedia</div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}