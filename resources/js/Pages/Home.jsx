import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

// Komponen Helper untuk Counter yang Berputar Ulang Setiap Kali di-Scroll ke Layar
function AnimatedCounter({ targetNumber, suffix = "" }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0);
          let startTime;
          const duration = 2000;

          const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const currentCount = Math.min(Math.floor((progress / duration) * targetNumber), targetNumber);
            
            setCount(currentCount);

            if (progress < duration) {
              animationFrameId = requestAnimationFrame(updateCount);
            }
          };

          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetNumber]);

  return <span ref={counterRef}>{count}{suffix}</span>;
}

export default function Home({ hero, intro, statistics, strength, featured_section, featured_items, testimonial_section, testimonials, projects, posts, contact, branches }) {
  const [showAll, setShowAll] = useState(false);

  // Inisialisasi Peta Interaktif Leaflet Publik
  useEffect(() => {
    if (window.L) {
      const mapContainer = document.getElementById('public-leaflet-map');
      if (mapContainer && !mapContainer._leaflet_id) {
        
        // Buat peta berpusat di tengah wilayah Indonesia
        const map = window.L.map('public-leaflet-map', {
          scrollWheelZoom: false // Mencegah peta ikut zoom saat user scroll halaman utama
        }).setView([-2.5489, 118.0149], 5);

        // Menggunakan server peta OpenStreetMap standar yang bersih tanpa watermark
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Jika data cabang tersedia dari database, buatkan marker otomatis
        if (branches && branches.length > 0) {
          branches.forEach((b) => {
            if (b.latitude && b.longitude) {
              
              // Kustom ikon pin merah melingkar
              const customIcon = window.L.divIcon({
                className: 'custom-map-marker',
                html: `<div style="background-color: #d92323; width: 18px; height: 18px; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 10px rgba(217,35,35,0.5);"></div>`,
                iconSize: [18, 18],
                iconAnchor: [9, 9]
              });

              // Masukkan marker ke peta beserta popup informasi lengkap termasuk Hotline
              window.L.marker([b.latitude, b.longitude], { icon: customIcon })
                .addTo(map)
                .bindPopup(`
                  <div style="font-family: inherit; padding: 6px; min-width: 190px; color: #0b2348;">
                    <span style="font-size: 9px; font-weight: 900; text-transform: uppercase; color: #b27b00; letter-spacing: 0.1em; display: block; margin-bottom: 2px;">
                      ${b.category || 'Branch Office'}
                    </span>
                    <h4 style="font-weight: 900; color: #0b2348; margin-bottom: 4px; font-size: 13px;">
                      ${b.name} (${b.city})
                    </h4>
                    <p style="font-size: 11px; color: #475569; line-height: 1.4; margin-bottom: 8px;">
                      ${b.description}
                    </p>
                    ${b.phone ? `
                      <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 11px; color: #0b2348;">
                        <div><b>Hotline:</b> <a href="tel:${b.phone}" style="color: #d92323; font-weight: bold; text-decoration: none;">${b.phone}</a></div>
                      </div>
                    ` : ''}
                  </div>
                `);
            }
          });
        }
      }
    }
  }, [branches]);

  // Data statis cadangan jika database proyek masih kosong
  const staticProjects = [
    { id: 1, title: 'Pembangunan Gedung Perkantoran', location: 'Jakarta, DKI Jakarta', year: '2024', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Aktivitas Penambangan Batubara', location: 'Kalimantan Timur', year: '2024', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Pembangunan Jalan & Jembatan', location: 'Sulawesi Selatan', year: '2023', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Pengelolaan Area Quarry', location: 'Bangka Belitung', year: '2023', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Pembangunan Pabrik Industri', location: 'Cilegon, Banten', year: '2024', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Perawatan Alat Berat', location: 'Berbagai Lokasi', year: '2024', image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80' },
  ];

  // Gunakan data dari database jika ada, jika kosong gunakan data statis
  const activeProjects = projects && projects.length > 0 ? projects : staticProjects;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      
      {/* 1. NAVBAR HEADER */}
      <Navbar />

      {/* =========================================================
          HERO BANNER - DINAMIS (Mengambil dari Database)
      ========================================================= */}
      <section id="home" className="relative w-full min-h-[1050px] sm:min-h-[1000px] lg:min-h-[820px] bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent z-0 pointer-events-none" />
        <div className="absolute top-28 left-[35%] hidden lg:grid grid-cols-6 gap-3 opacity-30 z-10 pointer-events-none">
          {[...Array(30)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />)}
        </div>
        <div className="absolute -left-20 bottom-[-100px] w-[400px] h-[400px] rounded-full border border-slate-200 opacity-60 pointer-events-none" />
        <div className="absolute -left-10 bottom-[-60px] w-[330px] h-[330px] rounded-full border border-slate-200 opacity-50 pointer-events-none" />
        <div className="absolute left-10 bottom-[-20px] w-[250px] h-[250px] rounded-full border border-slate-200 opacity-40 pointer-events-none" />

        <div className="relative z-20 max-w-[1600px] mx-auto min-h-[1050px] sm:min-h-[1000px] lg:min-h-[820px]">
          
          <div className="absolute top-0 right-0 w-full lg:w-[68%] h-[480px] sm:h-[560px] lg:h-[700px] overflow-hidden bg-slate-900">
            {hero?.video_path ? (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                style={{ pointerEvents: 'none', transform: 'scale(1.1)' }}
                src={`/storage/${hero.video_path}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                ref={(video) => {
                  if (video) {
                    video.play().catch(error => {
                      console.log("Autoplay dicegah browser:", error);
                    });
                  }
                }}
              />
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none', width: '100%', height: '100%', transform: 'scale(1.1)' }}
                src={`${hero?.video_url}${hero?.video_url?.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${hero?.video_url?.split('/').pop()}&controls=0&showinfo=0`}
                title="Heavy Equipment Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/10 to-transparent" />
          </div>

          <div className="relative z-30 w-full lg:w-[53%] px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-24 sm:pt-28 lg:pt-32">
            <div className="flex items-center gap-3 mb-6 sm:mb-7">
              <span className="w-8 sm:w-10 h-[3px] bg-[#ffc107] rounded-full shrink-0" />
              <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.14em] sm:tracking-[0.18em] text-[#0f2b5c] uppercase">
                {hero?.badge_text}
              </span>
            </div>

            <h1 className="font-extrabold text-[#0f2b5c] leading-[1.02] tracking-[-0.035em] text-4xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px] max-w-[720px]">
              <span className="block">{hero?.title_line_1}</span>
              <span className="block text-[#ffc107] mt-1">{hero?.title_highlight}</span>
              <span className="block mt-1">{hero?.title_line_2}</span>
            </h1>

            <div className="flex items-center gap-2 mt-6 sm:mt-7 mb-5">
              <span className="w-10 sm:w-14 h-[3px] bg-[#ffc107] rounded-full" />
              <span className="w-2 h-2 rounded-full bg-[#ffc107]" />
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-6 sm:leading-7 max-w-[540px]">
              {hero?.description}
            </p>

            <div className="mt-7 sm:mt-8 w-full sm:w-auto">
              <a href="#services" className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#0f2b5c] text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-[#0f2b5c]/20 transition-all duration-300 hover:bg-[#ffc107] hover:text-[#0f2b5c] hover:-translate-y-1 active:translate-y-0">
                <span>LIHAT LAYANAN</span>
                <span className="text-lg sm:text-xl leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

        </div>

        {/* FLOATING INFORMATION CARDS */}
        <div className="absolute z-40 left-4 right-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10 xl:left-16 xl:right-16 bottom-6 lg:bottom-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            
            {/* CARD 1 */}
            <div className="group relative bg-white rounded-2xl border border-slate-200 px-5 py-5 shadow-[0_12px_40px_rgba(15,43,92,0.10)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]">
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="pt-1">
                  <div className="text-2xl font-black text-[#0f2b5c] leading-none">200+</div>
                  <h3 className="mt-1 text-sm font-extrabold text-[#0f2b5c]">Tenaga Ahli</h3>
                  <div className="w-7 h-[2px] bg-[#ffc107] my-2" />
                  <p className="text-[10px] leading-4 text-slate-500 max-w-[150px]">Berpengalaman dan kompeten di bidangnya.</p>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="group relative bg-white rounded-2xl border border-slate-200 px-5 py-5 shadow-[0_12px_40px_rgba(15,43,92,0.10)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]">
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="pt-1">
                  <div className="text-2xl font-black text-[#0f2b5c] leading-none">24/7</div>
                  <h3 className="mt-1 text-sm font-extrabold text-[#0f2b5c]">Layanan Responsif</h3>
                  <div className="w-7 h-[2px] bg-[#ffc107] my-2" />
                  <p className="text-[10px] leading-4 text-slate-500 max-w-[150px]">Siap mendukung kebutuhan Anda kapan saja.</p>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="group relative bg-white rounded-2xl border border-slate-200 px-5 py-5 shadow-[0_12px_40px_rgba(15,43,92,0.10)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]">
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="pt-1">
                  <div className="text-2xl font-black text-[#0f2b5c] leading-none">100%</div>
                  <h3 className="mt-1 text-sm font-extrabold text-[#0f2b5c]">Kualitas Terjamin</h3>
                  <div className="w-7 h-[2px] bg-[#ffc107] my-2" />
                  <p className="text-[10px] leading-4 text-slate-500 max-w-[150px]">Standar layanan terbaik untuk setiap proyek.</p>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="group relative bg-white rounded-2xl border border-slate-200 px-5 py-5 shadow-[0_12px_40px_rgba(15,43,92,0.10)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]">
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" />
                    <circle cx="12" cy="11" r="2.5" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="pt-1">
                  <div className="text-lg font-black text-[#0f2b5c] leading-tight">NASIONAL</div>
                  <h3 className="mt-1 text-sm font-extrabold text-[#0f2b5c]">Jangkauan Nasional</h3>
                  <div className="w-7 h-[2px] bg-[#ffc107] my-2" />
                  <p className="text-[10px] leading-4 text-slate-500 max-w-[150px]">Dukungan layanan di seluruh Indonesia.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ================= 3. COMPANY INTRODUCTION & SERVICES ================= */}
      <section id="about" className="relative w-full bg-[#f8fafc]/60 overflow-hidden pt-20 pb-16 border-b border-slate-200">
        
        <div className="absolute top-12 right-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-200/80 px-3.5 py-1.5 rounded-full border border-slate-300 uppercase tracking-wider">
                  {intro?.badge_text || "LAYANAN KAMI"}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0f2b5c] leading-[1.12] mb-5 tracking-tight">
                {intro?.title_main} <br />
                <span className="text-[#ffc107]">{intro?.title_highlight}</span>
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-normal max-w-xl">
                {intro?.description}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
                
                <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">{intro?.point_1_title}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{intro?.point_1_desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">{intro?.point_2_title}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{intro?.point_2_desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">{intro?.point_3_title}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{intro?.point_3_desc}</p>
                  </div>
                </div>

              </div>

            </div>

            <div className="lg:col-span-6 relative flex justify-center items-center">
              
              <div className="relative w-full h-[380px] sm:h-[440px] rounded-[40px] overflow-hidden shadow-xl border border-slate-200/60 group">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${intro?.image_path ? `/storage/${intro.image_path}` : '/images/layanan.png'}')`
                  }}
                ></div>
              </div>

              <div className="absolute right-4 bottom-8 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-black text-[#0f2b5c] leading-none">200+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 mb-1.5">Klien Puas</div>
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar 1" />
                    <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Avatar 2" />
                    <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" alt="Avatar 3" />
                    <img className="inline-block h-5 w-5 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Avatar 4" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================
              3 CARD LAYANAN BESAR
          ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* CARD 1 */}
            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${intro?.service_1_image ? `/storage/${intro.service_1_image}` : '/images/layanan-suku cadang.jpg'}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
                <h3 className="font-black text-xl text-white drop-shadow-md mb-1">
                  {intro?.service_1_title || 'Suku Cadang'}
                </h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">
                    {intro?.service_1_desc || 'Suku cadang original dengan kualitas terjamin dan bergaransi.'}
                  </p>
                  <a href="/spare-parts" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">
                    Selengkapnya <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${intro?.service_2_image ? `/storage/${intro.service_2_image}` : '/images/layanan-purna jual.jpg'}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
                <h3 className="font-black text-xl text-white drop-shadow-md mb-1">
                  {intro?.service_2_title || 'Layanan Purna Jual'}
                </h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">
                    {intro?.service_2_desc || 'Perawatan dan perbaikan alat berat oleh teknisi berpengalaman.'}
                  </p>
                  <a href="/services" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">
                    Selengkapnya <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${intro?.service_3_image ? `/storage/${intro.service_3_image}` : '/images/layanan-kemitraan.jpg'}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />
              <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
                <h3 className="font-black text-xl text-white drop-shadow-md mb-1">
                  {intro?.service_3_title || 'Kemitraan'}
                </h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
                  <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">
                    {intro?.service_3_desc || 'Bersinergi bersama mitra untuk pertumbuhan berkelanjutan.'}
                  </p>
                  <a href="/about" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">
                    Selengkapnya <span>→</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <a 
              href="/services" 
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white font-bold text-xs rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
              <span>Lihat Semua Layanan</span>
              <span>→</span>
            </a>
          </div>

          <div className="mt-14 p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-auto divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex items-center gap-3.5 pt-2 md:pt-0">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636l3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c]">Butuh Bantuan?</h4>
                  <p className="text-[10px] text-slate-500">Tim kami siap membantu Anda kapan pun Anda membutuhkan.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c]">24/7 Support</h4>
                  <p className="text-[10px] text-slate-500">Layanan support siap 24 jam setiap harinya.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-2 md:pt-0 md:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c]">Garansi Resmi</h4>
                  <p className="text-[10px] text-slate-500">Semua produk dan layanan dijamin resmi & terpercaya.</p>
                </div>
              </div>

            </div>

            <a 
              href="https://wa.me/6281100000000" 
              className="px-6 py-3 bg-[#0f2b5c] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-md shrink-0 flex items-center gap-2 transform hover:scale-105"
            >
              <span>Hubungi Kami</span>
              <span>→</span>
            </a>

          </div>

        </div>
      </section>

      {/* ================= 4. SECTION COMPANY STATISTICS ================= */}
      <section id="statistics" className="relative w-full bg-[#0f2b5c] text-white py-24 overflow-hidden">
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80 pointer-events-none"
          style={{ backgroundImage: `url('/images/statistik.jpg')` }}
        ></div>

        <div className="absolute top-12 right-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Rekam Jejak &{' '}
              <span className="relative inline-block mx-1">
                <span className="absolute inset-0 bg-gradient-to-r from-[#ffc107] via-amber-400 to-[#ffc107] -skew-x-6 -rotate-1 rounded-2xl shadow-sm shadow-amber-500/20"></span>
                <span className="relative text-[#0f2b5c] px-4 py-0.5 z-10 font-black">
                  Statistik
                </span>
              </span> <br />
              Perusahaan
            </h2>

            <p className="text-white text-xs md:text-sm mt-4 font-normal leading-relaxed max-w-2xl mx-auto">
              Komitmen kami dalam memberikan layanan terbaik bagi sektor pertambangan dan konstruksi di seluruh Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {statistics && statistics.length > 0 ? (
              statistics.map((item, idx) => (
                <div key={item.id || idx} className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-3 group">
                  <div className="relative w-44 h-44 rounded-full border-4 border-white/10 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-[#0f2b5c]/40 backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold mb-1 shadow-sm border-2 border-white/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div className="text-2xl font-black text-white leading-none mb-1">
                      <AnimatedCounter targetNumber={item.target} suffix={item.suffix || ""} />
                    </div>
                    <div className="text-[11px] font-bold text-[#ffc107]">{item.label}</div>
                  </div>
                  <p className="text-white text-[11px] leading-relaxed mt-4 max-w-[180px]">{item.desc}</p>
                </div>
              ))
            ) : (
              <p className="text-center col-span-5 text-slate-300 text-xs">Belum ada data statistik.</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {["Terpercaya & Profesional", "Layanan Cepat & Tepat", "Mitra Jangka Panjang"].map((text, i) => (
              <div key={i} className="px-5 py-2.5 bg-[#0f2b5c]/50 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2.5 shadow-sm transition-transform duration-300 hover:scale-105">
                <div className="w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shrink-0">
                   <div className="w-2 h-2 rounded-full bg-[#0f2b5c]"></div>
                </div>
                <span className="text-xs font-bold text-white">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. SECTION COMPANY STRENGTH ================= */}
      <section id="strength" className="relative w-full bg-[#f8fafc]/80 py-24 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">
                {strength?.badge_text || "COMPANY STRENGTH"}
              </span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              {strength?.title_main} <span className="text-[#ffc107]">{strength?.title_highlight}</span>
            </h2>

            <p className="text-slate-600 text-xs md:text-sm mt-4 font-normal leading-relaxed max-w-xl mx-auto">
              {strength?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            {statistics && statistics.map((stat, i) => (
              <div key={stat.id || i} className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0f2b5c]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
                <div className="w-full h-1 bg-[#0f2b5c] absolute bottom-0 left-0"></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-2xl font-black text-[#0f2b5c]">{stat.target}{stat.suffix}</span>
                  </div>
                  <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">{stat.label}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
            
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[360px] overflow-hidden group">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${strength?.banner_image_path ? `/storage/${strength.banner_image_path}` : '/images/strength.jpg'}')`,
                }}
              ></div>

              <div className="absolute bottom-0 left-0 right-0 lg:right-[15%] z-20 bg-[#0f2b5c] text-white p-5 border-b-4 border-[#ffc107] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#ffc107] text-[#ffc107] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white mb-0.5">{strength?.banner_title || 'Safety First'}</h4>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    {strength?.banner_desc || 'Keselamatan adalah nilai utama dalam setiap pekerjaan kami.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center bg-white pr-12">
              <h3 className="text-2xl font-black text-[#0f2b5c] mb-2">
                {strength?.heading_why || 'Mengapa Memilih Kami?'}
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8 max-w-xl">
                {strength?.desc_why || 'Kami tidak hanya menyediakan layanan, tetapi juga menghadirkan nilai tambah melalui kualitas, inovasi, dan komitmen berkelanjutan.'}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x divide-slate-200/60">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center text-center p-2 transition-transform duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100/60 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/80 shadow-2xs font-black text-xs">
                      {i === 4 ? '24/7' : `0${i}`}
                    </div>
                    <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">{strength?.[`point_${i}_title`] || `Poin ${i}`}</h4>
                    <p className="text-slate-500 text-[10px] leading-snug mb-3">{strength?.[`point_${i}_desc`] || 'Deskripsi poin keunggulan.'}</p>
                    <span className="w-6 h-[2px] bg-[#ffc107]"></span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 6. SECTION FEATURED SERVICES ================= */}
      <section id="services" className="relative w-full py-24 overflow-hidden border-b border-slate-800 bg-[#0f2b5c]">
        
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-right-top opacity-120 pointer-events-none z-0"
          style={{ backgroundImage: `url('${featured_section?.bg_image_path ? `/storage/${featured_section.bg_image_path}` : '/images/services.jpg'}')` }}
        ></div>

        <div className="absolute inset-0 bg-[#0f2b5c]/50 pointer-events-none z-0"></div>

        <div className="absolute top-12 left-10 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">
                {featured_section?.badge_text || "OUR SERVICES"}
              </span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {featured_section?.title_main || "Featured"} <span className="text-[#ffc107]">{featured_section?.title_highlight || "Services"}</span>
            </h2>

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>

            <p className="text-slate-200 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              {featured_section?.description || "Kami menyediakan berbagai layanan unggulan untuk mendukung kebutuhan proyek pertambangan dan konstruksi Anda."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured_items && featured_items.length > 0 ? (
              featured_items.map((srv, idx) => (
                <div key={srv.id || idx} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="relative h-36 overflow-hidden">
                      <div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${srv.image_path ? `/storage/${srv.image_path}` : 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'}')` }}
                      />
                    </div>
                    <div className="p-5 pt-7 text-center relative">
                      <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">
                        {srv.title}
                      </h3>
                      <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                        {srv.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 text-center">
                    <a href={srv.link_url || "/services"} className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition">
                      Learn More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-4 text-slate-300 text-xs">Belum ada data featured services.</p>
            )}
          </div>

          

        </div>
      </section>

      {/* ================= 7. SECTION CUSTOMER TESTIMONIALS ================= */}
      <section id="testimonials" className="relative w-full overflow-hidden bg-[#0f2b5c] pb-32 md:pb-40">
        
        {/* CONTAINER HEADER DENGAN BACKGROUND FOTO & GELOMBANG DI BAWAH */}
        <div className="relative w-full pt-28 pb-32 md:pt-36 md:pb-40 overflow-hidden bg-[#0f2b5c]">
            {/* Foto Latar */}
            <img 
                src="/images/testimoni.png" 
                alt="Testimonials Banner" 
                className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Overlay Gelap Tipis (Pas, tidak terlalu gelap) */}
            <div className="absolute inset-0 bg-[#0f2b5c]/20" />

            {/* Header Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <div className="mb-4 flex items-center justify-center gap-4">
                    <span className="h-[2px] w-9 bg-[#ffc107]"></span>
                    <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffc107]">
                        {testimonial_section?.badge_text || "CUSTOMER TESTIMONIALS"}
                    </span>
                    <span className="h-[2px] w-9 bg-[#ffc107]"></span>
                </div>

                <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-md">
                    {testimonial_section?.title_main || "Apa Kata"}{" "}
                    <span className="text-[#ffc107]">
                        {testimonial_section?.title_highlight || "Mereka?"}
                    </span>
                </h2>

                <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#ffc107]"></div>

                <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-100 drop-shadow">
                    {testimonial_section?.description || "Kepercayaan pelanggan adalah bagian penting dari perjalanan kami. Berikut pengalaman mereka bekerja sama dengan tim kami."}
                </p>
            </div>

            {/* Bentuk Gelombang SVG di Bagian Bawah Header */}
            <svg className="absolute bottom-0 left-0 w-full h-16 sm:h-24 text-[#0f2b5c]" fill="currentColor" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,160,576,138.7C672,117,768,117,864,138.7C960,160,1056,203,1152,213.3C1248,224,1344,203,1392,192L1440,181L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>

        {/* CONTAINER CARD TESTIMONI DI ATAS BACKGROUND BIRU SPI */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 xl:px-14 -mt-12 sm:-mt-16">

            {(() => {
                const [currentIndex, setCurrentIndex] = useState(0);
                const [fade, setFade] = useState(true);

                if (!testimonials || testimonials.length === 0) {
                    return <p className="text-center text-slate-300 text-xs mt-10">Belum ada testimoni klien.</p>;
                }

                const itemsPerPage = 3;
                const totalPages = Math.ceil(testimonials.length / itemsPerPage);

                const handlePrev = () => {
                    setFade(false);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
                        setFade(true);
                    }, 200);
                };

                const handleNext = () => {
                    setFade(false);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
                        setFade(true);
                    }, 200);
                };

                const visibleTestimonials = testimonials.slice(
                    currentIndex * itemsPerPage,
                    (currentIndex + 1) * itemsPerPage
                );

                return (
                    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center">
                        {testimonials.length > itemsPerPage && (
                            <button 
                                onClick={handlePrev} 
                                className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#0f2b5c] border border-slate-200 flex items-center justify-center shadow-xl hover:bg-[#ffc107] transition cursor-pointer"
                                aria-label="Previous"
                            >
                                ←
                            </button>
                        )}

                        {/* Grid Kotak Tetap Menyamping, Isi Teks Mengalir ke Bawah di dalam Kotak */}
                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 md:px-8 transition-opacity duration-300 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            {visibleTestimonials.map((t, idx) => (
                                <div 
                                    key={t.id || idx} 
                                    className="relative mx-auto w-full max-w-[380px] opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                                    style={{ animationDelay: `${idx * 0.15}s` }}
                                >
                                    <div className="group relative flex flex-col justify-between p-8 rounded-3xl bg-white shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:border-[#ffc107] hover:shadow-[0_20px_45px_rgba(255,193,7,0.3)] h-full min-h-[350px]">
                                        
                                        <div>
                                            {/* Icon Kutipan */}
                                            <div className="text-[#ffc107] mb-4">
                                                <svg className="w-8 h-8 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.999v10h-9.999z"/>
                                                </svg>
                                            </div>

                                            {/* Isi Testimoni (Mengalir rapi ke bawah di dalam kotak tanpa keluar batas) */}
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic mb-6 break-words">
                                                "{t.quote}"
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100">
                                            {/* Info Klien */}
                                            <div>
                                                <h4 className="font-black text-xs sm:text-sm text-[#0f2b5c]">
                                                    {t.client_name}
                                                </h4>
                                                <p className="text-[11px] font-bold text-[#b27b00] mt-0.5">
                                                    {t.client_title}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {testimonials.length > itemsPerPage && (
                            <button 
                                onClick={handleNext} 
                                className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white text-[#0f2b5c] border border-slate-200 flex items-center justify-center shadow-xl hover:bg-[#ffc107] transition cursor-pointer"
                                aria-label="Next"
                            >
                                →
                            </button>
                        )}

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12 z-20">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setFade(false);
                                            setTimeout(() => {
                                                setCurrentIndex(idx);
                                                setFade(true);
                                            }, 200);
                                        }}
                                        className={`h-2.5 rounded-full transition-all cursor-pointer ${currentIndex === idx ? 'w-8 bg-[#ffc107]' : 'w-2.5 bg-white/40'}`}
                                        aria-label={`Go to page ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })()}

        </div>

        

        {/* CSS Keyframes untuk Animasi Masuk (FadeIn Up) */}
        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}} />
      </section>

      {/* ================= 7. SECTION PROJECT GALLERY ================= */}
      <section id="projects" className="relative w-full text-slate-800 py-24 overflow-hidden border-b border-slate-200 bg-[#0f2b5c]">
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-500 pointer-events-none"
          style={{ backgroundImage: `url('/images/statistik.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2b5c]/80 via-[#0f2b5c]/70 to-[#0f2b5c]/80 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Proyek yang Telah <span className="text-[#ffc107]">Kami Kerjakan</span>
            </h2>

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-6 rounded-full"></div>

            <p className="text-slate-200 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Berbagai proyek konstruksi dan pertambangan yang telah kami selesaikan dengan standar kualitas tinggi dan komitmen terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {activeProjects.map((proj, idx) => {
              if (!showAll && idx >= 6) return null;

              const projectImage = proj.image 
                ? `/storage/${proj.image}` 
                : (staticProjects[idx % staticProjects.length]?.image || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80');

              return (
                <div key={proj.id || idx} className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
                  <div className="relative h-36 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('${projectImage}')` }}></div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">{proj.title}</h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{proj.location}</span>
                      <span>{proj.year}</span>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          <div className="text-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#ffc107] text-[#0f2b5c] hover:bg-amber-400 font-bold text-xs rounded-full transition-all duration-300 shadow-md transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{showAll ? "Tutup Sebagian Proyek" : "Lihat Semua Proyek"}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ================= 8. SECTION LATEST NEWS ================= */}
      <section id="news" className="relative w-full bg-white text-slate-800 py-24 overflow-hidden border-b border-slate-200">
        
        <div className="absolute top-12 left-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>
        <div className="absolute bottom-12 right-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">
                LATEST NEWS
              </span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Berita <span className="text-[#ffc107]">Terbaru</span>
            </h2>

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>

            <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Dapatkan informasi terbaru seputar kegiatan perusahaan, proyek, inovasi, dan berbagai update lainnya.
            </p>
          </div>

          <div className="flex justify-end mb-16 border-b border-slate-200/80 pb-6">
            <a href="/knowledge" className="text-xs font-extrabold text-[#0f2b5c] hover:text-amber-600 transition flex items-center gap-1.5 shrink-0">
              <span>Lihat Semua Berita</span>
              <span>→</span>
            </a>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-10 group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 z-0"
                  style={{ backgroundImage: `url('${posts[0].image ? `/storage/${posts[0].image}` : '/images/karir.jpg'}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-10"></div>

                <div className="relative z-20 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                      {new Date(posts[0].created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3">
                    {posts[0].title}
                  </h3>

                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 max-w-xl line-clamp-2">
                    {posts[0].content}
                  </p>

                  <a href={`/knowledge/${posts[0].slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#ffc107] hover:underline">
                    <span>Baca Selengkapnya</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 relative">
                <div className="absolute left-10 top-6 bottom-6 w-[2px] bg-amber-300/40 hidden sm:block pointer-events-none"></div>

                {posts.slice(1, 4).map((post) => (
                  <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="relative shrink-0">
                        <img 
                          src={post.image ? `/storage/${post.image}` : "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=200&q=80"} 
                          alt={post.title} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                            {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-xs text-[#0f2b5c] group-hover:text-amber-600 transition leading-snug line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-slate-500 text-[10px] line-clamp-1 mt-1">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    <a href={`/knowledge/${post.slug}`} className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                      →
                    </a>
                  </div>
                ))}

              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-10 group">
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 z-0"
                  style={{ backgroundImage: `url('/images/karir.jpg')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-10"></div>

                <div className="relative z-20 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-slate-300 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                      28 Mei 2024
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3">
                    Servistama Pro Indonesia Raih Penghargaan K3 Nasional 2024
                  </h3>

                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6 max-w-xl">
                    Penghargaan ini menjadi bukti komitmen kami dalam menerapkan standar keselamatan dan kesehatan kerja tertinggi di setiap proyek.
                  </p>

                  <a href="/knowledge" className="inline-flex items-center gap-2 text-xs font-bold text-[#ffc107] hover:underline">
                    <span>Baca Selengkapnya</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 relative">
                <div className="absolute left-10 top-6 bottom-6 w-[2px] bg-amber-300/40 hidden sm:block pointer-events-none"></div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=200&q=80" 
                        alt="Proyek Tol" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                          22 Mei 2024
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs text-[#0f2b5c] group-hover:text-amber-600 transition leading-snug">
                        Proyek Infrastruktur Jalan Tol Baru Capai 60%
                      </h4>
                      <p className="text-slate-500 text-[10px] line-clamp-1 mt-1">
                        Progress pembangunan berjalan sesuai rencana dengan fokus pada kualitas dan ketepatan waktu penyelesaian proyek.
                      </p>
                    </div>
                  </div>

                  <a href="/knowledge" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                    →
                  </a>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80" 
                        alt="Inovasi Alat" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                          15 Mei 2024
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs text-[#0f2b5c] group-hover:text-amber-600 transition leading-snug">
                        Inovasi Alat Berat Ramah Lingkungan untuk Masa Depan
                      </h4>
                      <p className="text-slate-500 text-[10px] line-clamp-1 mt-1">
                        Kami terus berinovasi menghadirkan teknologi alat berat yang lebih efisien dan ramah lingkungan untuk mendukung keberlanjutan.
                      </p>
                    </div>
                  </div>

                  <a href="/knowledge" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                    →
                  </a>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="relative shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=200&q=80" 
                        alt="Kerja Sama" 
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                          10 Mei 2024
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs text-[#0f2b5c] group-hover:text-amber-600 transition leading-snug">
                        Servistama Pro Jalin Kerja Sama Strategis dengan Mitra Global
                      </h4>
                      <p className="text-slate-500 text-[10px] line-clamp-1 mt-1">
                        Kolaborasi ini menjadi langkah penting dalam memperluas kapabilitas dan jangkauan layanan kami di tingkat internasional.
                      </p>
                    </div>
                  </div>

                  <a href="/knowledge" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                    →
                  </a>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* ================= 9. SECTION KONTAK & ALAMAT KAMI ================= */}
      <section 
        id="contact"
        className="relative w-full py-24 overflow-hidden border-b border-slate-200 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(7,27,56,0.10), rgba(7,27,56,0.95)), url('/images/kontak.jpg')"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">
                GET IN TOUCH
              </span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Kontak & <span className="text-[#ffc107]">Alamat Kami</span>
            </h2>

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-6 rounded-full"></div>

            <p className="text-white text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Kunjungi kantor pusat kami atau hubungi tim layanan pelanggan kami untuk informasi lebih lanjut mengenai produk dan layanan alat berat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Alamat Kantor Pusat</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-line">
                  {contact?.address || 'Foresta Business Loft 7, Unit 6-7\nJl. BSD Boulevard Utara, Lengkong Kulon, Tangerang, Banten 15331'}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a href={contact?.map_url || "https://maps.google.com"} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">
                  Lihat Maps →
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Jam Operasional</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed whitespace-pre-line">
                  {contact?.operational_hours || 'Senin - Jumat: 08.00 - 17.00'}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400">Dukungan 24/7 Darurat</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Informasi Kontak</h3>
                <div className="space-y-1.5 text-[11px] text-slate-600">
                  <p>Hotline: <span className="font-medium text-[#0f2b5c]">{contact?.phone || '+62 811-0000-0000'}</span></p>
                  <p>Email: <span className="font-medium text-[#0f2b5c]">{contact?.email || 'info@servistamapro.co.id'}</span></p>
                  {contact?.parts_email && (
                    <p>Parts: <span className="font-medium text-[#0f2b5c]">{contact.parts_email}</span></p>
                  )}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <a href={`mailto:${contact?.email || 'info@servistamapro.co.id'}`} className="text-[11px] font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">
                  Kirim Email →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          10. SECTION BRANCH OFFICE (DENGAN PETA LEAFLET PUBLIK)
      ========================================================= */}
      <section
        id="operational-area"
        className="relative w-full bg-white text-[#0b2348] overflow-hidden border-b border-slate-200"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/branch.png"
            alt="Operational Area Background"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/85" />
        </div>

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 md:px-10 xl:px-14 py-20 md:py-24">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="max-w-[720px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-[2px] bg-[#ffc107]" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-[#b27b00]">
                  BRANCH OFFICE & NETWORK
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.05] text-[#0b2348]">
                Operational Area
                <br />
                <span className="text-[#b27b00]">
                  & Branch Distribution
                </span>
              </h2>

              <div className="flex items-center gap-2 mt-5">
                <span className="w-12 h-[3px] bg-[#ffc107] rounded-full" />
                <span className="w-2 h-2 rounded-full bg-[#ffc107]" />
              </div>

              <p className="mt-5 text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-[650px]">
                Dengan pengalaman lebih dari 10 tahun, kami terus memperluas jaringan layanan, workshop, dan dukungan teknis ke berbagai wilayah strategis di Indonesia.
              </p>
            </div>
          </div>

          <div className="relative w-full min-h-[500px] md:min-h-[580px] lg:min-h-[630px] flex items-center justify-center my-6">
            <div className="absolute w-[60%] max-w-[850px] h-[260px] rounded-[50%] bg-[#ffc107]/10 blur-[80px] pointer-events-none" />

            <div className="relative w-full max-w-[1200px] h-[500px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <div id="public-leaflet-map" className="w-full h-full z-0"></div>
            </div>
          </div>

          <div className="mt-6 md:hidden">
            <div className="bg-white text-[#0b2348] border border-slate-200 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#b27b00]">Operational Coverage</p>
                <span className="w-2 h-2 rounded-full bg-[#ffc107]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {branches && branches.length > 0 ? (
                  branches.map((b, i) => (
                    <div key={b.id || i}>
                      <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">{b.category}</p>
                      <p className="text-[10px] font-black text-[#0b2348] mt-1">{b.name} ({b.city})</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-500 col-span-2">Belum ada data cabang.</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 mt-10 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="relative flex w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-red-500/25 animate-ping" />
                <span className="relative w-3 h-3 rounded-full bg-[#d92323] shadow-[0_0_0_4px_rgba(217,35,35,0.10)]" />
              </span>
              <span className="text-[9px] font-bold">Active Location (GPS Pin)</span>
            </div>

            <div className="w-px h-4 bg-slate-200" />

            <p className="text-[9px] text-slate-500">Peta interaktif berbasis GPS. Anda dapat melakukan zoom dan klik pada pin untuk melihat detail cabang dan nomor hotline.</p>
          </div>

        </div>
      </section>

      {/* 11. FOOTER */}
      <Footer />

    </div>
  );
}