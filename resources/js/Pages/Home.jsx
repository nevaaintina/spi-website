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
          // Reset count ke 0 agar animasi mulai dari awal setiap kali discroll ke view
          setCount(0);
          let startTime;
          const duration = 2000; // Durasi 2 detik

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
          // Batalkan animasi jika keluar layar agar bersih
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      
      {/* 1. NAVBAR HEADER */}
      <Navbar />

      {/* ================= 2. HERO BANNER PERSIS FOTO ACUAN ================= */}
      <section className="relative w-full min-h-[92vh] bg-white overflow-hidden pt-16 md:pt-20 border-b border-slate-200">
        
        {/* AKSEN GARIS LINGKARAN HALUS KIRI BAWAH */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-slate-100 pointer-events-none z-0"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-slate-100 pointer-events-none z-0"></div>

        {/* DOTTED PATTERN ABU-ABU DI LATAR TEKS KIRI */}
        <div className="absolute top-28 left-[38%] z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-30 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
          ))}
        </div>

        <div className="w-full mx-auto min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* SISI KIRI: KONTEN TEKS DENGAN ANIMASI FADE-IN */}
          <div className="lg:col-span-5 px-6 md:px-12 xl:px-16 py-12 lg:py-20 flex flex-col justify-center z-30 bg-white relative animate-fade-in duration-700">
            
            {/* Tagline dengan Garis Kuning Kecil */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-5 h-[3px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#0f2b5c] uppercase">
                PT. SERVISTAMA PRO INDONESIA
              </span>
            </div>

            {/* Judul Utama Persis Foto */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[62px] font-black text-[#0f2b5c] leading-[1.08] mb-6 tracking-tight">
              Bright Future <br />
              untuk <span className="text-[#ffc107]">Anda</span>
            </h1>

            {/* Deskripsi Singkat */}
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-normal max-w-lg">
              Kami menyediakan alat berat berkualitas, suku cadang original, serta layanan terbaik untuk mendukung setiap kebutuhan dan keberhasilan proyek Anda.
            </p>

            {/* Tombol Utama dengan Efek Interaktif */}
            <div className="mb-14">
              <a 
                href="#about" 
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#0f2b5c] hover:bg-[#ffc107] text-white hover:text-[#0f2b5c] font-bold text-xs md:text-sm rounded-xl transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-amber-500/20 group transform hover:-translate-y-1"
              >
                <span>Tentang Kami</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>

            {/* 3 Kartu Fitur Kecil di Kiri Bawah */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-0.5">Produk Berkualitas</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">Suku cadang original dan terjamin.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-0.5">Tim Profesional</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">Tenaga ahli berpengalaman dan siap membantu.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-0.5">Layanan Prima</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">Respon cepat dan solusi tepat untuk Anda.</p>
                </div>
              </div>
            </div>

          </div>

          {/* SISI KANAN: BENTUK POLIGON LENGKAP & FOTO ALAT BERAT */}
          <div className="lg:col-span-7 relative min-h-[480px] lg:min-h-full flex items-center justify-center overflow-hidden">
            
            {/* Shape 1: Biru Muda Transparan Atas */}
            <div 
              className="absolute inset-0 bg-[#3b82f6]/20 z-0 hidden lg:block"
              style={{
                clipPath: 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            ></div>

            {/* Shape 2: Navy Solid Utama */}
            <div 
              className="absolute inset-0 bg-[#0f2b5c] z-10 hidden lg:block"
              style={{
                clipPath: 'polygon(32% 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            ></div>

            {/* Shape 3: Garis Kuning Aksen Diagonal */}
            <div 
              className="absolute inset-0 bg-[#ffc107] z-20 hidden lg:block"
              style={{
                clipPath: 'polygon(32% 0%, 36% 0%, 11% 100%, 7% 100%)'
              }}
            ></div>

            {/* Area Gambar Utama Alat Berat & Teknisi */}
            <div 
              className="absolute inset-0 z-20 overflow-hidden"
              style={{
                clipPath: window.innerWidth >= 1024 ? 'polygon(36% 0%, 100% 0%, 100% 100%, 11% 100%)' : 'none'
              }}
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-out transform hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80')`
                }}
              ></div>
            </div>

            {/* Dotted Pattern Kuning Melayang di Area Navy Bawah */}
            <div className="absolute bottom-24 left-[28%] z-30 opacity-60 hidden lg:grid grid-cols-6 gap-2">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#ffc107] animate-pulse"></div>
              ))}
            </div>

            {/* FLOATING STATISTICS BAR (NAVY GELAP PERSIS FOTO ACUAN) */}
            <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-8 z-40 bg-[#0f2b5c] text-white p-5 rounded-2xl border border-slate-700/50 shadow-2xl max-w-xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-700/60">
                
                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-3">
                  <div className="text-[#ffc107]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black leading-none text-white">200+</div>
                    <div className="text-[10px] text-slate-300 font-medium mt-1">Karyawan Profesional</div>
                  </div>
                </div>

                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-3">
                  <div className="text-[#ffc107]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black leading-none text-white">24 <span className="text-xs font-normal text-slate-300">Jam</span></div>
                    <div className="text-[10px] text-slate-300 font-medium mt-1">Respon Cepat</div>
                  </div>
                </div>

                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-3">
                  <div className="text-[#ffc107]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-black leading-none text-white">100%</div>
                    <div className="text-[10px] text-slate-300 font-medium mt-1">Layanan Terpercaya</div>
                  </div>
                </div>

                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-3">
                  <div className="text-[#ffc107]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-black leading-tight text-white">Seluruh Indonesia</div>
                    <div className="text-[10px] text-slate-300 font-medium mt-1">Jangkauan Layanan</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 3. COMPANY INTRODUCTION & SERVICES ================= */}
      <section className="relative w-full bg-[#f8fafc]/60 overflow-hidden pt-20 pb-16 border-b border-slate-200">
        
        {/* DOTTED PATTERN ABU-ABU DI LATAR KANAN ATAS */}
        <div className="absolute top-12 right-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION + IMAGE HERO PERKENALAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* SISI KIRI: TEKS DESKRIPSI & 3 INDIKATOR */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Badge Pill "LAYANAN KAMI" */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-200/80 px-3.5 py-1.5 rounded-full border border-slate-300 uppercase tracking-wider">
                  LAYANAN KAMI
                </span>
              </div>

              {/* Judul Utama */}
              <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#0f2b5c] leading-[1.12] mb-5 tracking-tight">
                Solusi Tepat untuk <br />
                Setiap <span className="text-[#ffc107]">Kebutuhan Anda</span>
              </h2>

              {/* Sub-deskripsi */}
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-normal max-w-xl">
                Kami hadir dengan berbagai layanan untuk mendukung produktivitas alat berat Anda agar tetap optimal di setiap pekerjaan.
              </p>

              {/* 3 Indikator Keunggulan Horizontal */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
                
                <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">Berpengalaman</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Lebih dari 10 tahun melayani berbagai industri</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">Profesional</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Tim ahli dan bersertifikasi di bidangnya</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 transition-transform duration-300 hover:scale-105">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center shrink-0 border border-slate-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0f2b5c]">Terpercaya</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">Layanan berkualitas dengan komitmen terbaik</p>
                  </div>
                </div>

              </div>

            </div>

            {/* SISI KANAN: FOTO ALAT BERAT & FLOATING BADGE KLIEN */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              
              <div className="relative w-full h-[380px] sm:h-[440px] rounded-[40px] overflow-hidden shadow-xl border border-slate-200/60 group">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80')`
                  }}
                ></div>
              </div>

              {/* CARD FLOATING: 200+ KLIEN PUAS + AVATAR */}
              <div className="absolute right-4 bottom-8 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0f2b5c] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-black text-[#0f2b5c] leading-none">200+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5 mb-1.5">Klien Puas</div>
                  {/* Avatar Stacking */}
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

          {/* GRID 4 KARTU LAYANAN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Suku Cadang */}
            <div className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm transition-all duration-300 hover:border-2 hover:border-[#ffc107] hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0f2b5c] group-hover:bg-[#ffc107] group-hover:text-[#0f2b5c] flex items-center justify-center text-xl mb-5 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#0f2b5c] mb-2">Suku Cadang</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Suku cadang original XCMG dengan kualitas terjamin dan bergaransi.
                </p>
              </div>
              <a href="/spare-parts" className="text-xs font-bold text-slate-700 hover:text-[#ffc107] transition flex items-center gap-1 mt-6 group-hover:translate-x-1">
                Selengkapnya <span>→</span>
              </a>
            </div>

            {/* Card 2: Layanan Purna Jual */}
            <div className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm transition-all duration-300 hover:border-2 hover:border-[#ffc107] hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0f2b5c] group-hover:bg-[#ffc107] group-hover:text-[#0f2b5c] flex items-center justify-center text-xl mb-5 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#0f2b5c] mb-2">Layanan Purna Jual</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Perawatan dan perbaikan alat berat oleh teknisi berpengalaman.
                </p>
              </div>
              <a href="/services" className="text-xs font-bold text-slate-700 hover:text-[#ffc107] transition flex items-center gap-1 mt-6 group-hover:translate-x-1">
                Selengkapnya <span>→</span>
              </a>
            </div>

            {/* Card 3: Pelatihan Operator */}
            <div className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm transition-all duration-300 hover:border-2 hover:border-[#ffc107] hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0f2b5c] group-hover:bg-[#ffc107] group-hover:text-[#0f2b5c] flex items-center justify-center text-xl mb-5 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#0f2b5c] mb-2">Pelatihan Operator</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Program pelatihan untuk operator alat berat secara profesional.
                </p>
              </div>
              <a href="/services" className="text-xs font-bold text-slate-700 hover:text-[#ffc107] transition flex items-center gap-1 mt-6 group-hover:translate-x-1">
                Selengkapnya <span>→</span>
              </a>
            </div>

            {/* Card 4: Kemitraan */}
            <div className="p-7 bg-white border border-slate-200/90 rounded-3xl shadow-sm transition-all duration-300 hover:border-2 hover:border-[#ffc107] hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0f2b5c] group-hover:bg-[#ffc107] group-hover:text-[#0f2b5c] flex items-center justify-center text-xl mb-5 transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#0f2b5c] mb-2">Kemitraan</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Bersinergi bersama mitra untuk pertumbuhan berkelanjutan.
                </p>
              </div>
              <a href="/about" className="text-xs font-bold text-slate-700 hover:text-[#ffc107] transition flex items-center gap-1 mt-6 group-hover:translate-x-1">
                Selengkapnya <span>→</span>
              </a>
            </div>

          </div>

          {/* Tombol Lihat Semua Layanan */}
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

          {/* BOTTOM CALLOUT BAR: BUTUH BANTUAN */}
          <div className="mt-14 p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full md:w-auto divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex items-center gap-3.5 pt-2 md:pt-0">
                <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

      {/* ================= 4. SECTION COMPANY STATISTICS (DENGAN HIGHLIGHT MIRING ELEGAN) ================= */}
      <section className="relative w-full bg-white text-slate-800 py-24 overflow-hidden border-b border-slate-200">
        
        {/* AKSEN LINGKARAN WAVY KUNING & ABU-ABU DI KIRI ATAS */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border-[18px] border-amber-300/40 pointer-events-none z-0"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[12px] border-slate-200/50 pointer-events-none z-0"></div>

        {/* DOTTED PATTERN ABU-ABU DI KANAN ATAS */}
        <div className="absolute top-12 right-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-25 pointer-events-none">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>

        {/* AKSEN GELOMBANG NAVY DI KANAN BAWAH */}
        <div className="absolute -bottom-28 -right-28 w-96 h-96 rounded-full bg-[#0f2b5c] pointer-events-none z-0"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-[16px] border-[#ffc107] pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION STATISTICS */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            
            {/* Badge Pill Simple Clean Latar Polos */}
            <div className="mb-4 inline-block">
              <span className="text-xs font-bold text-[#0f2b5c] border border-slate-300/80 px-4 py-1.5 rounded-full flex items-center gap-2 bg-slate-50/50 shadow-2xs">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Pencapaian Kami
              </span>
            </div>

            {/* Judul Utama dengan Block Highlight Kuning Miring Elegan */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Rekam Jejak &{' '}
              <span className="relative inline-block mx-1">
                <span className="absolute inset-0 bg-gradient-to-r from-[#ffc107] via-amber-400 to-[#ffc107] -skew-x-6 -rotate-1 rounded-2xl shadow-sm shadow-amber-500/20"></span>
                <span className="relative text-[#0f2b5c] px-4 py-0.5 z-10">
                  Statistik
                </span>
              </span> <br />
              Perusahaan
            </h2>

            <p className="text-slate-600 text-xs md:text-sm mt-4 font-normal leading-relaxed max-w-2xl mx-auto">
              Komitmen kami dalam memberikan layanan terbaik bagi sektor pertambangan dan konstruksi di seluruh Indonesia.
            </p>
          </div>

          {/* GRID 4 CIRCULAR STATISTIC CARDS (ANIMATED COUNTER) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
            
            {/* Card Stat 1: 10+ Tahun Pengalaman */}
            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-4 group">
              <div className="relative w-48 h-48 rounded-full border-4 border-[#ffc107]/20 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-11 h-11 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold mb-1 shadow-sm border-2 border-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-[#0f2b5c] leading-none mb-1">
                  <AnimatedCounter targetNumber={10} suffix="+" />
                </div>
                <div className="text-xs font-bold text-[#0f2b5c]">Tahun Pengalaman</div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed mt-4 max-w-[200px]">
                Melayani kebutuhan alat berat di berbagai proyek nasional.
              </p>
            </div>

            {/* Card Stat 2: 500+ Unit Terawat */}
            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-4 group">
              <div className="relative w-48 h-48 rounded-full border-4 border-[#ffc107]/20 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-11 h-11 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold mb-1 shadow-sm border-2 border-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-[#0f2b5c] leading-none mb-1">
                  <AnimatedCounter targetNumber={500} suffix="+" />
                </div>
                <div className="text-xs font-bold text-[#0f2b5c]">Unit Terawat</div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed mt-4 max-w-[200px]">
                Alat berat yang ditangani dengan standar garansi prima jual.
              </p>
            </div>

            {/* Card Stat 3: 200+ Mekanik Bersertifikat */}
            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-4 group">
              <div className="relative w-48 h-48 rounded-full border-4 border-[#ffc107]/20 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-11 h-11 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold mb-1 shadow-sm border-2 border-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-[#0f2b5c] leading-none mb-1">
                  <AnimatedCounter targetNumber={200} suffix="+" />
                </div>
                <div className="text-xs font-bold text-[#0f2b5c]">Mekanik Bersertifikat</div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed mt-4 max-w-[200px]">
                Teknisi profesional siap diterjunkan langsung ke jobsite.
              </p>
            </div>

            {/* Card Stat 4: 99% Kepuasan Pelanggan */}
            <div className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-4 group">
              <div className="relative w-48 h-48 rounded-full border-4 border-[#ffc107]/20 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="w-11 h-11 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold mb-1 shadow-sm border-2 border-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="text-3xl font-black text-[#0f2b5c] leading-none mb-1">
                  <AnimatedCounter targetNumber={99} suffix="%" />
                </div>
                <div className="text-xs font-bold text-[#0f2b5c]">Kepuasan Pelanggan</div>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed mt-4 max-w-[200px]">
                Tingkat kepuasan atas ketepatan penanganan dan dukungan teknis.
              </p>
            </div>

          </div>

          {/* THREE BOTTOM PILL HIGHLIGHTS (VEKTOR IKON CLEAN & PRO) */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            
            <div className="px-5 py-2.5 bg-amber-50/80 border border-amber-200/80 rounded-full flex items-center gap-2.5 shadow-xs transition-transform duration-300 hover:scale-105">
              <div className="w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[#0f2b5c]">Terpercaya & Profesional</span>
            </div>

            <div className="px-5 py-2.5 bg-amber-50/80 border border-amber-200/80 rounded-full flex items-center gap-2.5 shadow-xs transition-transform duration-300 hover:scale-105">
              <div className="w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[#0f2b5c]">Layanan Cepat & Tepat</span>
            </div>

            <div className="px-5 py-2.5 bg-amber-50/80 border border-amber-200/80 rounded-full flex items-center gap-2.5 shadow-xs transition-transform duration-300 hover:scale-105">
              <div className="w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[#0f2b5c]">Mitra Jangka Panjang</span>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 5. SECTION COMPANY STRENGTH PERSIS FOTO ACUAN ================= */}
      <section className="relative w-full bg-[#f8fafc]/80 py-24 overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION COMPANY STRENGTH */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            
            {/* Tagline Badge dengan Garis Kiri & Kanan */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">
                COMPANY STRENGTH
              </span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>

            {/* Judul Utama */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Kekuatan Kami, <span className="text-[#ffc107]">Komitmen Kami</span>
            </h2>

            <p className="text-slate-600 text-xs md:text-sm mt-4 font-normal leading-relaxed max-w-xl mx-auto">
              Dengan pengalaman, sumber daya, dan dedikasi tinggi, kami siap menjadi <span className="font-bold text-[#0f2b5c]">mitra terbaik</span> dalam setiap proyek Anda.
            </p>
          </div>

          {/* 5 KARTU FITUR DENGAN POTONGAN CORNER UNIK & COLOR ACCENT (VERSUS NAVY & KUNING) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            
            {/* Card 1: 10+ Tahun Pengalaman (Navy) */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0f2b5c]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              <div className="w-full h-1 bg-[#0f2b5c] absolute bottom-0 left-0"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-[#0f2b5c]">10+</span>
                </div>
                <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">Tahun Pengalaman</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Lebih dari satu dekade pengalaman di berbagai proyek nasional.
                </p>
              </div>
            </div>

            {/* Card 2: 200+ Profesional (Kuning) */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#ffc107]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              <div className="w-full h-1 bg-[#ffc107] absolute bottom-0 left-0"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-[#0f2b5c]">200+</span>
                </div>
                <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">Profesional</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Tim ahli dan berpengalaman siap memberikan solusi terbaik.
                </p>
              </div>
            </div>

            {/* Card 3: 500+ Unit Terawat (Navy) */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0f2b5c]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              <div className="w-full h-1 bg-[#0f2b5c] absolute bottom-0 left-0"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-[#0f2b5c]">500+</span>
                </div>
                <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">Unit Terawat</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Armada dan peralatan terawat dengan standar tertinggi.
                </p>
              </div>
            </div>

            {/* Card 4: 100+ Sertifikasi (Kuning) */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#ffc107]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              <div className="w-full h-1 bg-[#ffc107] absolute bottom-0 left-0"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-[#0f2b5c]">100+</span>
                </div>
                <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">Sertifikasi</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Didukung sertifikasi dan standar keselamatan berkelas dunia.
                </p>
              </div>
            </div>

            {/* Card 5: 99% Kepuasan Klien (Navy) */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#0f2b5c]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
              <div className="w-full h-1 bg-[#0f2b5c] absolute bottom-0 left-0"></div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h47m0 0l-3-3m3 3l-3 3M3 21v-4a4 4 0 014-4h4a4 4 0 014 4v4" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-[#0f2b5c]">99%</span>
                </div>
                <h3 className="font-bold text-xs text-[#0f2b5c] uppercase tracking-wider mb-3">Kepuasan Klien</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Kepercayaan klien adalah prioritas dan kebanggaan kami.
                </p>
              </div>
            </div>

          </div>

          {/* BANNER MENGAPA MEMILIH KAMI DENGAN BENTUK POLIGON CHAMFERED PERIS FOTO ACUAN */}
          <div 
            className="bg-white border border-slate-200/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl"
            style={{
              clipPath: window.innerWidth >= 1024 ? 'polygon(0 0, 96% 0, 100% 50%, 96% 100%, 0 100%)' : 'none'
            }}
          >
            
            {/* SISI KIRI: FOTO EXCAVATOR DENGAN POTONGAN CLIP PATH DIAGONAL & SAFETY FIRST CARD */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[360px] overflow-hidden group">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80')`,
                  clipPath: window.innerWidth >= 1024 ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' : 'none'
                }}
              ></div>

              {/* Garis Aksen Kuning Pemotong Di Sepanjang Foto */}
              <div 
                className="absolute inset-0 bg-[#ffc107] z-10 hidden lg:block"
                style={{ clipPath: 'polygon(85% 0, 87% 0, 72% 100%, 70% 100%)' }}
              ></div>

              {/* CARD SAFETY FIRST (FILL FULL BAWAH FOTO - PERSIS FOTO ACUAN) */}
              <div className="absolute bottom-0 left-0 right-0 lg:right-[15%] z-20 bg-[#0f2b5c] text-white p-5 border-b-4 border-[#ffc107] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#ffc107] text-[#ffc107] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white mb-0.5">Safety First</h4>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    Keselamatan adalah nilai utama dalam setiap pekerjaan kami.
                  </p>
                </div>
              </div>
            </div>

            {/* SISI KANAN: TEKS HEADER MENGAPA MEMILIH KAMI & 4 PILAR INDIKATOR HEKSAGON */}
            <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center bg-white pr-12">
              
              <h3 className="text-2xl font-black text-[#0f2b5c] mb-2">
                Mengapa Memilih Kami?
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8 max-w-xl">
                Kami tidak hanya menyediakan layanan, tetapi juga menghadirkan nilai tambah melalui kualitas, inovasi, dan komitmen berkelanjutan.
              </p>

              {/* 4 PILAR LAYANAN HORIZONTAL DENGAN IKON HEKSAGON KUNING LEMBUT */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x-0 md:divide-x divide-slate-200/60">
                
                {/* Pilar 1 */}
                <div className="flex flex-col items-center text-center p-2 transition-transform duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/60 text-[#0f2b5c] flex items-center justify-center mb-3 border border-amber-200/80 shadow-2xs">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Kualitas Terjamin</h4>
                  <p className="text-slate-500 text-[10px] leading-snug mb-3">Standar kualitas tinggi di setiap proses kerja.</p>
                  <span className="w-6 h-[2px] bg-[#ffc107]"></span>
                </div>

                {/* Pilar 2 */}
                <div className="flex flex-col items-center text-center p-2 transition-transform duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/60 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/80 shadow-2xs">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Inovasi Berkelanjutan</h4>
                  <p className="text-slate-500 text-[10px] leading-snug mb-3">Selalu berkembang dengan teknologi terbaru.</p>
                  <span className="w-6 h-[2px] bg-[#ffc107]"></span>
                </div>

                {/* Pilar 3 */}
                <div className="flex flex-col items-center text-center p-2 transition-transform duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/60 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/80 shadow-2xs">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Integritas Tinggi</h4>
                  <p className="text-slate-500 text-[10px] leading-snug mb-3">Bekerja dengan jujur, transparan, dan profesional.</p>
                  <span className="w-6 h-[2px] bg-[#ffc107]"></span>
                </div>

                {/* Pilar 4 */}
                <div className="flex flex-col items-center text-center p-2 transition-transform duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/60 text-amber-600 flex items-center justify-center mb-3 border border-amber-200/80 shadow-2xs font-black text-xs">
                    24/7
                  </div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Layanan 24/7</h4>
                  <p className="text-slate-500 text-[10px] leading-snug mb-3">Siap melayani kapan pun Anda membutuhkan.</p>
                  <span className="w-6 h-[2px] bg-[#ffc107]"></span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= 6. SECTION FEATURED SERVICES ================= */}
      <section className="relative w-full py-24 overflow-hidden border-b border-slate-200 bg-slate-50">
        
        {/* SILUET WATERMARK FOTO MEMBENTANG FULL 1 SECTION */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-right-top opacity-10 pointer-events-none z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80')` }}
        ></div>

        {/* DOTTED PATTERN ABU-ABU HALUS */}
        <div className="absolute top-12 left-10 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION FEATURED SERVICES */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
              <span className="text-[11px] font-black tracking-widest text-[#ffc107] uppercase">
                OUR SERVICES
              </span>
              <span className="w-8 h-[2px] bg-[#ffc107]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Featured <span className="text-[#ffc107]">Services</span>
            </h2>

            {/* Strip Garis Kuning Bawah Title */}
            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>

            <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Kami menyediakan berbagai layanan unggulan untuk mendukung kebutuhan proyek pertambangan dan konstruksi Anda.
            </p>
          </div>

          {/* GRID 5 KARTU LAYANAN DENGAN FOTO HEADER DI KELIMA KARTU & OVERLAY IKON HEKSAGON */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-16">
            
            {/* Card 1: Suku Cadang Original */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-36 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80')` }}
                  ></div>
                </div>

                <div className="p-5 pt-7 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-lg z-30 border border-slate-700 transition-transform duration-300 group-hover:rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <svg className="w-5 h-5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">Suku Cadang Original</h3>
                  <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                    Menyediakan suku cadang original XCMG dengan kualitas terjamin dan performa terbaik.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-center">
                <a href="/spare-parts" className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition inline-flex items-center gap-1 group-hover:translate-x-1">
                  <span>Learn More</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 2: Layanan Purna Jual */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-36 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80')` }}
                  ></div>
                </div>

                <div className="p-5 pt-7 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-lg z-30 border border-slate-700 transition-transform duration-300 group-hover:rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <svg className="w-5 h-5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>

                  <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">Layanan Purna Jual</h3>
                  <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                    Perawatan dan perbaikan alat berat oleh teknisi berpengalaman menggunakan standar XCMG.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-center">
                <a href="/services" className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition inline-flex items-center gap-1 group-hover:translate-x-1">
                  <span>Learn More</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 3: Pelatihan Operator */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-36 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80')` }}
                  ></div>
                </div>

                <div className="p-5 pt-7 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-lg z-30 border border-slate-700 transition-transform duration-300 group-hover:rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <svg className="w-5 h-5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>

                  <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">Pelatihan Operator</h3>
                  <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                    Program pelatihan operator alat berat untuk meningkatkan kompetensi dan keselamatan kerja.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-center">
                <a href="/services" className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition inline-flex items-center gap-1 group-hover:translate-x-1">
                  <span>Learn More</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 4: Layanan On-Site */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-36 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80')` }}
                  ></div>
                </div>

                <div className="p-5 pt-7 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-lg z-30 border border-slate-700 transition-transform duration-300 group-hover:rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <svg className="w-5 h-5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-5l1-3m1 3l1-3m-4 3h6" />
                    </svg>
                  </div>

                  <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">Layanan On-Site</h3>
                  <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                    Tim service siap membantu langsung di lokasi proyek untuk memastikan operasional optimal.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-center">
                <a href="/services" className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition inline-flex items-center gap-1 group-hover:translate-x-1">
                  <span>Learn More</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 5: Solusi Terintegrasi */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative h-36 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80')` }}
                  ></div>
                </div>

                <div className="p-5 pt-7 text-center relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-11 h-11 bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shadow-lg z-30 border border-slate-700 transition-transform duration-300 group-hover:rotate-12" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <svg className="w-5 h-5 text-[#ffc107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>

                  <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">Solusi Terintegrasi</h3>
                  <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                    Solusi menyeluruh mulai dari konsultasi, penyediaan unit, hingga after-sales support.
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 text-center">
                <a href="/services" className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition inline-flex items-center gap-1 group-hover:translate-x-1">
                  <span>Learn More</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM BANNER "BUTUH LAYANAN LEBIH LANJUT?" TRANSPARAN ELEGAN */}
          <div className="bg-[#0f2b5c]/80 backdrop-blur-md border border-slate-700/60 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 transition-transform duration-300 hover:scale-[1.01]">
            
            {/* Background Wave Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 20 Q 50 80 100 20 T 200 20" strokeWidth="0.5" />
                <path d="M0 40 Q 50 100 100 40 T 200 40" strokeWidth="0.5" />
              </svg>
            </div>

            {/* SISI KIRI: ICON HEADPHONE & JUDUL */}
            <div className="flex items-center gap-4 relative z-10 w-full lg:w-auto">
              <div className="w-14 h-14 rounded-full border border-[#ffc107]/40 flex items-center justify-center shrink-0 text-[#ffc107] bg-slate-800/60 animate-pulse">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="border-l-0 lg:border-l border-slate-700/80 lg:pl-5">
                <h3 className="font-extrabold text-base md:text-lg text-white leading-tight">
                  Butuh Layanan <br />
                  Lebih Lanjut?
                </h3>
              </div>
            </div>

            {/* SISI TENGAH: TEKS DESKRIPSI */}
            <div className="relative z-10 text-slate-300 text-xs md:text-sm max-w-md text-center lg:text-left">
              Tim kami siap membantu Anda menemukan solusi terbaik sesuai kebutuhan proyek Anda.
            </div>

            {/* SISI KANAN: TOMBOL CALL TO ACTION & ILLUSTRASI VECTOR CS */}
            <div className="flex items-center gap-5 relative z-10 shrink-0">
              <a 
                href="https://wa.me/6281100000000" 
                className="px-7 py-3 bg-white hover:bg-slate-100 text-[#0f2b5c] font-black text-xs rounded-full transition duration-300 shadow-md flex items-center gap-2 transform hover:scale-105"
              >
                <span>Hubungi Kami</span>
                <span>→</span>
              </a>

              {/* Vector CS Line Art Icon */}
              <div className="hidden sm:block text-[#ffc107] opacity-80">
                <svg className="w-12 h-12 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 7. SECTION PROJECT GALLERY ================= */}
      <section className="relative w-full bg-white text-slate-800 py-24 overflow-hidden border-b border-slate-200">
        
        {/* DOTTED PATTERN ABU-ABU DI LATAR BELAKANG */}
        <div className="absolute top-12 left-10 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>
        <div className="absolute top-12 right-10 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION PROJECT GALLERY */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            
            <div className="mb-3 inline-block">
              <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 uppercase tracking-widest">
                PROJECT GALLERY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2b5c] tracking-tight leading-tight">
              Proyek <span className="text-[#ffc107]">yang Telah Kami Kerjakan</span>
            </h2>

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>

            <p className="text-slate-600 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Berbagai proyek konstruksi dan pertambangan yang telah kami selesaikan dengan standar kualitas tinggi dan komitmen terbaik.
            </p>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap justify-center items-center gap-2.5 mb-14">
            <button className="px-5 py-2.5 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow-sm transition hover:bg-[#ffc107] hover:text-[#0f2b5c]">
              Semua Proyek
            </button>
            <button className="px-5 py-2.5 bg-slate-100/80 hover:bg-[#0f2b5c] hover:text-white text-slate-700 font-bold text-xs rounded-xl transition">
              Konstruksi
            </button>
            <button className="px-5 py-2.5 bg-slate-100/80 hover:bg-[#0f2b5c] hover:text-white text-slate-700 font-bold text-xs rounded-xl transition">
              Pertambangan
            </button>
            <button className="px-5 py-2.5 bg-slate-100/80 hover:bg-[#0f2b5c] hover:text-white text-slate-700 font-bold text-xs rounded-xl transition">
              Infrastruktur
            </button>
            <button className="px-5 py-2.5 bg-slate-100/80 hover:bg-[#0f2b5c] hover:text-white text-slate-700 font-bold text-xs rounded-xl transition">
              Maintenance
            </button>
          </div>

          {/* GRID 6 KARTU PROYEK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Card Proyek 1 */}
            <div className="bg-white rounded-3xl border border-slate-200/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80')` }}
                ></div>
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-[#0f2b5c]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                  Konstruksi
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-5l1-3m1 3l1-3m-4 3h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-1">Pembangunan Gedung Perkantoran</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Jakarta, DKI Jakarta
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                        2024
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#ffc107] hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shrink-0 transform group-hover:translate-x-1">
                  ›
                </button>
              </div>
            </div>

            {/* Card Proyek 2 */}
            <div className="bg-white rounded-3xl border border-slate-200/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80')` }}
                ></div>
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-[#0f2b5c]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                  Pertambangan
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-1">Aktivitas Penambangan Batubara</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Kalimantan Timur
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                        2024
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#ffc107] hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shrink-0 transform group-hover:translate-x-1">
                  ›
                </button>
              </div>
            </div>

            {/* Card Proyek 3 */}
            <div className="bg-white rounded-3xl border border-slate-200/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80')` }}
                ></div>
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-[#0f2b5c]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                  Infrastruktur
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-1">Pembangunan Jalan & Jembatan</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Sulawesi Selatan
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                        2023
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#ffc107] hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shrink-0 transform group-hover:translate-x-1">
                  ›
                </button>
              </div>
            </div>

            {/* Card Proyek 4 */}
            <div className="bg-white rounded-3xl border border-slate-200/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80')` }}
                ></div>
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-[#0f2b5c]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                  Pertambangan
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-1">Pengelolaan Area Quarry</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Bangka Belitung
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                        2023
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#ffc107] hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shrink-0 transform group-hover:translate-x-1">
                  ›
                </button>
              </div>
            </div>

            {/* Card Proyek 5 */}
            <div className="bg-white rounded-3xl border border-slate-200/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80')` }}
                ></div>
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-[#0f2b5c]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                  Konstruksi
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-5l1-3m1 3l1-3m-4 3h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-1">Pembangunan Pabrik Industri</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Cilegon, Banten
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                        2024
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#ffc107] hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shrink-0 transform group-hover:translate-x-1">
                  ›
                </button>
              </div>
            </div>

            {/* Card Proyek 6 */}
            <div className="bg-white rounded-3xl border border-slate-200/95 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80')` }}
                ></div>
                <span className="absolute top-4 left-4 text-[10px] font-bold text-white bg-[#0f2b5c]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                  Maintenance
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-1">Perawatan Alat Berat</h3>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Berbagai Lokasi
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/><line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/></svg>
                        2024
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#ffc107] hover:bg-[#ffc107] hover:text-[#0f2b5c] transition-all duration-300 shrink-0 transform group-hover:translate-x-1">
                  ›
                </button>
              </div>
            </div>

          </div>

          {/* TOMBOL LIHAT SEMUA PROYEK */}
          <div className="text-center mb-16">
            <a 
              href="/projects" 
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white font-bold text-xs rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
              </svg>
              <span>Lihat Semua Proyek</span>
              <span>→</span>
            </a>
          </div>

          {/* BOTTOM BANNER "TERTARIK BEKERJA SAMA?" (BIRU TRANSPARAN ELEGANT) */}
          <div className="bg-[#0f2b5c]/85 backdrop-blur-md border border-slate-700/60 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
              <div className="w-14 h-14 rounded-2xl border border-slate-600/80 flex items-center justify-center shrink-0 text-[#ffc107] bg-slate-800/40 animate-pulse">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-base md:text-lg text-white leading-tight mb-1">
                  Tertarik Bekerja Sama?
                </h3>
                <p className="text-slate-300 text-xs md:text-sm">
                  Kami siap mewujudkan proyek Anda dengan kualitas terbaik.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <a 
                href="https://wa.me/6281100000000" 
                className="px-7 py-3.5 bg-[#ffc107] hover:bg-amber-400 text-[#0f2b5c] font-black text-xs rounded-xl transition duration-300 shadow-md flex items-center gap-2 transform hover:scale-105"
              >
                <span>Hubungi Kami</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 8. SECTION LATEST NEWS (BERITA TERBARU - PERSIS FOTO ACUAN) ================= */}
      <section className="relative w-full bg-white text-slate-800 py-24 overflow-hidden border-b border-slate-200">
        
        {/* DOTTED PATTERN ABU-ABU DI KIRI ATAS & KANAN BAWAH */}
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
          
          {/* HEADER SECTION LATEST NEWS */}
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

          {/* CATEGORY FILTER TABS & LIHAT SEMUA BERITA LINK */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-16 border-b border-slate-200/80 pb-6">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <button className="px-5 py-2 bg-[#0f2b5c] text-white font-bold text-xs rounded-xl shadow-sm transition">
                Semua Berita
              </button>
              <button className="px-5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition">
                Perusahaan
              </button>
              <button className="px-5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition">
                Proyek
              </button>
              <button className="px-5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition">
                Inovasi
              </button>
              <button className="px-5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition">
                CSR
              </button>
              <button className="px-5 py-2 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition">
                Event
              </button>
            </div>

            <a href="/news" className="text-xs font-extrabold text-[#0f2b5c] hover:text-amber-600 transition flex items-center gap-1.5 shrink-0">
              <span>Lihat Semua Berita</span>
              <span>→</span>
            </a>
          </div>

          {/* MAIN NEWS GRID (2 KOLOM: FEATURED CARD BESAR DI KIRI & LIST TIMELINE DI KANAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* SISI KIRI: FEATURED BIG NEWS CARD (DENGAN LATAR FOTO KONSTRUKSI & OVERLAY GELAP) */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-10 group">
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 z-0"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80')` }}
              ></div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-10"></div>

              {/* Konten Teks di Atas Overlay */}
              <div className="relative z-20 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-bold bg-[#ffc107] text-[#0f2b5c] px-3 py-1 rounded-md uppercase tracking-wider">
                    PERUSAHAAN
                  </span>
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

                <a href="/news/detail" className="inline-flex items-center gap-2 text-xs font-bold text-[#ffc107] hover:underline">
                  <span>Baca Selengkapnya</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* SISI KANAN: LIST BERITA TIMELINE (3 ARTIKEL) DENGAN FOTO ASLI & TANPA EMOJI */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 relative">
              
              {/* Garis Vertikal Timeline di Kiri List */}
              <div className="absolute left-10 top-6 bottom-6 w-[2px] bg-amber-300/40 hidden sm:block pointer-events-none"></div>

              {/* Berita 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=200&q=80" 
                      alt="Proyek Tol" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold text-[9px] shadow-xs border border-white">
                      PRO
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                        PROYEK
                      </span>
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

                <a href="/news/detail" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                  →
                </a>
              </div>

              {/* Berita 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80" 
                      alt="Inovasi Alat" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold text-[9px] shadow-xs border border-white">
                      INV
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 uppercase">
                        INOVASI
                      </span>
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

                <a href="/news/detail" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                  →
                </a>
              </div>

              {/* Berita 3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex items-center justify-between gap-4 relative group">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=200&q=80" 
                      alt="Kerja Sama" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold text-[9px] shadow-xs border border-white">
                      COR
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                        PERUSAHAAN
                      </span>
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

                <a href="/news/detail" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                  →
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= 9. SECTION KONTAK & ALAMAT KAMI (DENGAN BACKGROUND FOTO) ================= */}
      <section 
        className="relative w-full py-24 overflow-hidden border-b border-slate-200 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(15,43,92,0.92), rgba(11,18,32,0.95)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')"
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

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>

            <p className="text-slate-300 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Kunjungi kantor pusat kami atau hubungi tim layanan pelanggan kami untuk informasi lebih lanjut mengenai produk dan layanan alat berat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Alamat Kami */}
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center mb-6 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base text-[#0f2b5c] mb-2">Alamat Kantor Pusat</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Foresta Business Loft 7, Unit 6-7<br />
                  Jl. BSD Boulevard Utara, Lengkong Kulon, Kec. Pagedangan, Kabupaten Tangerang, Banten 15331
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">
                  <span>Lihat di Google Maps</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Card 2: Jam Operasional */}
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center mb-6 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base text-[#0f2b5c] mb-2">Jam Operasional</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-semibold text-slate-700">Senin - Jumat:</span>
                    <span>08.00 - 17.00 WIB</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-semibold text-slate-700">Sabtu:</span>
                    <span>08.00 - 14.00 WIB</span>
                  </div>
                  <div className="flex justify-between pb-1.5">
                    <span className="font-semibold text-slate-700">Minggu / Libur:</span>
                    <span className="text-amber-600 font-bold">Tutup (Layanan Darurat 24/7)</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400">Dukungan Teknisi Darurat 24 Jam</span>
              </div>
            </div>

            {/* Card 3: Kontak Kami */}
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center mb-6 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-base text-[#0f2b5c] mb-2">Informasi Kontak</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <p><strong className="text-slate-700">Hotline / WhatsApp:</strong> +62 811-0000-0000</p>
                  <p><strong className="text-slate-700">Email Resmi:</strong> info@servistamapro.co.id</p>
                  <p><strong className="text-slate-700">Layanan Spare Parts:</strong> parts@servistamapro.co.id</p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <a href="/contact-us" className="text-xs font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">
                  <span>Formulir Kontak Online</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. FOOTER */}
      <Footer />

    </div>
  );
}