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
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      
      {/* 1. NAVBAR HEADER */}
      <Navbar />

      {/* =========================================================
    HERO BANNER - PT. SERVISTAMA PRO INDONESIA
========================================================= */}
<section
  id="home"
  className="
    relative
    w-full
    min-h-[1050px]
    sm:min-h-[1000px]
    lg:min-h-[820px]
    bg-white
    overflow-hidden
  "
>
  {/* =======================================================
      BACKGROUND DECORATION
  ======================================================== */}

  {/* Soft gradient putih ke transparan */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-r
      from-white
      via-white/95
      to-transparent
      z-0
      pointer-events-none
    "
  />

  {/* Dot Pattern */}
  <div
    className="
      absolute
      top-28
      left-[35%]
      hidden
      lg:grid
      grid-cols-6
      gap-3
      opacity-30
      z-10
      pointer-events-none
    "
  >
    {[...Array(30)].map((_, i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-slate-400"
      />
    ))}
  </div>

  {/* Decorative Curved Lines kiri bawah */}
  <div
    className="
      absolute
      -left-20
      bottom-[-100px]
      w-[400px]
      h-[400px]
      rounded-full
      border
      border-slate-200
      opacity-60
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      -left-10
      bottom-[-60px]
      w-[330px]
      h-[330px]
      rounded-full
      border
      border-slate-200
      opacity-50
      pointer-events-none
    "
  />

  <div
    className="
      absolute
      left-10
      bottom-[-20px]
      w-[250px]
      h-[250px]
      rounded-full
      border
      border-slate-200
      opacity-40
      pointer-events-none
    "
  />

  {/* =======================================================
      MAIN HERO CONTENT
  ======================================================== */}

  <div
    className="
      relative
      z-20
      max-w-[1600px]
      mx-auto
      min-h-[1050px]
      sm:min-h-[1000px]
      lg:min-h-[820px]
    "
  >

    {/* =====================================================
        FOTO PERTAMBANGAN
    ====================================================== */}

    <div
      className="
        absolute
        top-0
        right-0
        w-full
        lg:w-[68%]
        h-[480px]
        sm:h-[560px]
        lg:h-[700px]
        overflow-hidden
      "
    >

      {/* Foto */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/images/hero-mining.png')",
        }}
      />

      {/* Fade putih dari kiri */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-white
          via-white/65
          to-transparent
        "
      />

      {/* Fade putih bagian bawah */}
      <div
        className="
          absolute  
          inset-x-0
          bottom-0
          h-48
          bg-gradient-to-t
          from-white
          via-white/30
          to-transparent
        "
      />
    </div>


    {/* =====================================================
        TEXT CONTENT
    ====================================================== */}

    <div
      className="
        relative
        z-30
        w-full
        lg:w-[53%]
        px-6
        sm:px-10
        md:px-16
        lg:px-20
        xl:px-24
        pt-24
        sm:pt-28
        lg:pt-32
      "
    >

      {/* Company Label */}
      <div
        className="
          flex
          items-center
          gap-3
          mb-6
          sm:mb-7
        "
      >
        <span
          className="
            w-8
            sm:w-10
            h-[3px]
            bg-[#ffc107]
            rounded-full
            shrink-0
          "
        />

        <span
          className="
            text-[10px]
            sm:text-xs
            font-extrabold
            tracking-[0.14em]
            sm:tracking-[0.18em]
            text-[#0f2b5c]
            uppercase
          "
        >
          PT. SERVISTAMA PRO INDONESIA
        </span>
      </div>


      {/* =================================================
          HEADLINE
      ================================================= */}

      <h1
        className="
          font-extrabold
          text-[#0f2b5c]
          leading-[1.02]
          tracking-[-0.035em]
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-[60px]
          xl:text-[68px]
          max-w-[720px]
        "
      >

        <span className="block">
          DENGAN KONSEP
        </span>

        <span
          className="
            block
            text-[#ffc107]
            mt-1
          "
        >
          BRIGHT FUTURE
        </span>

        <span className="block mt-1">
          UNTUK ANDA
        </span>

      </h1>


      {/* Yellow underline */}
      <div
        className="
          flex
          items-center
          gap-2
          mt-6
          sm:mt-7
          mb-5
        "
      >
        <span
          className="
            w-10
            sm:w-14
            h-[3px]
            bg-[#ffc107]
            rounded-full
          "
        />

        <span
          className="
            w-2
            h-2
            rounded-full
            bg-[#ffc107]
          "
        />
      </div>


      {/* Description */}
      <p
        className="
          text-slate-600
          text-sm
          sm:text-base
          leading-6
          sm:leading-7
          max-w-[540px]
        "
      >
        Kami berkomitmen menghadirkan layanan konstruksi terbaik
        dengan teknologi modern, peralatan berkualitas, dan sumber
        daya profesional untuk mendukung keberhasilan setiap proyek Anda.
      </p>


      {/* =================================================
          CTA BUTTON
      ================================================= */}

      <div
        className="
          mt-7
          sm:mt-8
          w-full
          sm:w-auto
        "
      >
        <a
          href="#services"
          className="
            group
            inline-flex
            w-full
            sm:w-auto
            items-center
            justify-center
            gap-3
            sm:gap-4
            px-6
            sm:px-7
            py-3
            sm:py-3.5
            rounded-xl
            bg-[#0f2b5c]
            text-white
            text-xs
            sm:text-sm
            font-bold
            tracking-wide
            shadow-lg
            shadow-[#0f2b5c]/20
            transition-all
            duration-300
            hover:bg-[#ffc107]
            hover:text-[#0f2b5c]
            hover:-translate-y-1
            active:translate-y-0
          "
        >
          <span>
            LIHAT LAYANAN
          </span>

          <span
            className="
              text-lg
              sm:text-xl
              leading-none
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </a>
      </div>

    </div>


    {/* =====================================================
        FLOATING INFORMATION CARDS
    ====================================================== */}

    <div
      className="
        absolute
        z-40
        left-4
        right-4
        sm:left-6
        sm:right-6
        lg:left-10
        lg:right-10
        xl:left-16
        xl:right-16
        bottom-6
        lg:bottom-8
      "
    >

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-3
          lg:gap-4
        "
      >

        {/* =================================================
            CARD 1 - TENAGA AHLI
        ================================================= */}

        <div
          className="
            group
            relative
            bg-white
            rounded-2xl
            border
            border-slate-200
            px-5
            py-5
            shadow-[0_12px_40px_rgba(15,43,92,0.10)]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]
          "
        >

          <div
            className="
              relative
              z-10
              flex
              items-start
              gap-4
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                shrink-0
                rounded-full
                bg-[#0f2b5c]
                text-[#ffc107]
                flex
                items-center
                justify-center
                shadow-md
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="pt-1">

              <div
                className="
                  text-2xl
                  font-black
                  text-[#0f2b5c]
                  leading-none
                "
              >
                200+
              </div>

              <h3
                className="
                  mt-1
                  text-sm
                  font-extrabold
                  text-[#0f2b5c]
                "
              >
                Tenaga Ahli
              </h3>

              <div
                className="
                  w-7
                  h-[2px]
                  bg-[#ffc107]
                  my-2
                "
              />

              <p
                className="
                  text-[10px]
                  leading-4
                  text-slate-500
                  max-w-[150px]
                "
              >
                Berpengalaman dan kompeten di bidangnya.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            CARD 2 - LAYANAN RESPONSIF
        ================================================= */}

        <div
          className="
            group
            relative
            bg-white
            rounded-2xl
            border
            border-slate-200
            px-5
            py-5
            shadow-[0_12px_40px_rgba(15,43,92,0.10)]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]
          "
        >

          <div
            className="
              relative
              z-10
              flex
              items-start
              gap-4
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                shrink-0
                rounded-full
                bg-[#ffc107]
                text-[#0f2b5c]
                flex
                items-center
                justify-center
                shadow-md
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="pt-1">

              <div
                className="
                  text-2xl
                  font-black
                  text-[#0f2b5c]
                  leading-none
                "
              >
                24/7
              </div>

              <h3
                className="
                  mt-1
                  text-sm
                  font-extrabold
                  text-[#0f2b5c]
                "
              >
                Layanan Responsif
              </h3>

              <div
                className="
                  w-7
                  h-[2px]
                  bg-[#ffc107]
                  my-2
                "
              />

              <p
                className="
                  text-[10px]
                  leading-4
                  text-slate-500
                  max-w-[150px]
                "
              >
                Siap mendukung kebutuhan Anda kapan saja.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            CARD 3 - KUALITAS TERJAMIN
        ================================================= */}

        <div
          className="
            group
            relative
            bg-white
            rounded-2xl
            border
            border-slate-200
            px-5
            py-5
            shadow-[0_12px_40px_rgba(15,43,92,0.10)]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]
          "
        >

          <div
            className="
              relative
              z-10
              flex
              items-start
              gap-4
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                shrink-0
                rounded-full
                bg-[#0f2b5c]
                text-[#ffc107]
                flex
                items-center
                justify-center
                shadow-md
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="pt-1">

              <div
                className="
                  text-2xl
                  font-black
                  text-[#0f2b5c]
                  leading-none
                "
              >
                100%
              </div>

              <h3
                className="
                  mt-1
                  text-sm
                  font-extrabold
                  text-[#0f2b5c]
                "
              >
                Kualitas Terjamin
              </h3>

              <div
                className="
                  w-7
                  h-[2px]
                  bg-[#ffc107]
                  my-2
                "
              />

              <p
                className="
                  text-[10px]
                  leading-4
                  text-slate-500
                  max-w-[150px]
                "
              >
                Standar layanan terbaik untuk setiap proyek.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            CARD 4 - JANGKAUAN NASIONAL
        ================================================= */}

        <div
          className="
            group
            relative
            bg-white
            rounded-2xl
            border
            border-slate-200
            px-5
            py-5
            shadow-[0_12px_40px_rgba(15,43,92,0.10)]
            overflow-hidden
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-[0_18px_45px_rgba(15,43,92,0.16)]
          "
        >

          <div
            className="
              relative
              z-10
              flex
              items-start
              gap-4
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                shrink-0
                rounded-full
                bg-[#ffc107]
                text-[#0f2b5c]
                flex
                items-center
                justify-center
                shadow-md
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
                />

                <circle
                  cx="12"
                  cy="11"
                  r="2.5"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="pt-1">

              <div
                className="
                  text-lg
                  font-black
                  text-[#0f2b5c]
                  leading-tight
                "
              >
                NASIONAL
              </div>

              <h3
                className="
                  mt-1
                  text-sm
                  font-extrabold
                  text-[#0f2b5c]
                "
              >
                Jangkauan Nasional
              </h3>

              <div
                className="
                  w-7
                  h-[2px]
                  bg-[#ffc107]
                  my-2
                "
              />

              <p
                className="
                  text-[10px]
                  leading-4
                  text-slate-500
                  max-w-[150px]
                "
              >
                Dukungan layanan di seluruh Indonesia.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

      {/* ================= 3. COMPANY INTRODUCTION & SERVICES ================= */}
      <section id="about" className="relative w-full bg-[#f8fafc]/60 overflow-hidden pt-20 pb-16 border-b border-slate-200">
        
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
                    backgroundImage: `url('/images/layanan.png')`
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

          {/* GRID 3 KARTU LAYANAN - JELAS DI AWAL, REVEAL DETAIL SAAT HOVER */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
  
  {/* Card 1: Suku Cadang */}
  <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
    
    {/* FOTO JELAS (SELALU MUNCUL DI BACKGROUND) */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url('/images/layanan-suku cadang.jpg')` }}
    />
    
    {/* OVERLAY: TIPIS SAAT NORMAL, GELAP (NAVY) SAAT DISENTUH */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />

    {/* JUDUL (POSISI DI BAWAH SAAT NORMAL, NAIK / BERUBAH SAAT HOVER) */}
    <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
      <h3 className="font-black text-xl text-white drop-shadow-md mb-1">
        Suku Cadang
      </h3>

      {/* DETAIL (MUNCUL SAAT HOVER) */}
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
        <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">
          Suku cadang original XCMG dengan kualitas terjamin dan bergaransi.
        </p>
        <a href="/spare-parts" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">
          Selengkapnya <span>→</span>
        </a>
      </div>
    </div>
  </div>

  {/* Card 2: Layanan Purna Jual */}
  <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url('/images/layanan-purna jual.jpg')` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />

    <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
      <h3 className="font-black text-xl text-white drop-shadow-md mb-1">
        Layanan Purna Jual
      </h3>

      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
        <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">
          Perawatan dan perbaikan alat berat oleh teknisi berpengalaman.
        </p>
        <a href="/services" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">
          Selengkapnya <span>→</span>
        </a>
      </div>
    </div>
  </div>

  {/* Card 3: Kemitraan */}
  <div className="relative p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col justify-end group overflow-hidden h-[340px]">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url('/images/layanan-kemitraan.jpg')` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:bg-[#0f2b5c]/90 transition-colors duration-500" />

    <div className="relative z-10 transition-all duration-500 transform group-hover:-translate-y-2 text-center">
      <h3 className="font-black text-xl text-white drop-shadow-md mb-1">
        Kemitraan
      </h3>

      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40 overflow-hidden">
        <p className="text-slate-200 text-xs leading-relaxed mb-3 mt-1">
          Bersinergi bersama mitra untuk pertumbuhan berkelanjutan.
        </p>
        <a href="/about" className="text-xs font-bold text-[#ffc107] hover:underline inline-flex items-center gap-1">
          Selengkapnya <span>→</span>
        </a>
      </div>
    </div>
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

      {/* ================= 4. SECTION COMPANY STATISTICS ================= */}
<section id="statistics" className="relative w-full bg-[#0f2b5c] text-white py-24 overflow-hidden">
  
  {/* BACKGROUND FOTO DENGAN OPACITY YANG TINGGI */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-80 pointer-events-none"
    style={{ backgroundImage: `url('/images/statistik.jpg')` }}
  ></div>

  

  {/* DOTTED PATTERN PUTIH DI KANAN ATAS */}
  <div className="absolute top-12 right-12 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
    {[...Array(36)].map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
    ))}
  </div>

  <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
    
    {/* HEADER SECTION STATISTICS */}
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

    {/* GRID 4 CIRCULAR STATISTIC CARDS (TRANSPARAN BIRU) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
      
      {[
        { target: 10, label: "Tahun Pengalaman", desc: "Melayani kebutuhan alat berat di berbagai proyek nasional.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", suffix: "+" },
        { target: 500, label: "Unit Terawat", desc: "Alat berat yang ditangani dengan standar garansi prima jual.", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", suffix: "+" },
        { target: 200, label: "Mekanik Bersertifikat", desc: "Teknisi profesional siap diterjunkan langsung ke jobsite.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 0-1.042-.133-2.052-.382-3.016z", suffix: "+" },
        { target: 99, label: "Kepuasan Pelanggan", desc: "Tingkat kepuasan atas ketepatan penanganan dan dukungan teknis.", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z", suffix: "%" },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center text-center pt-6 lg:pt-0 lg:px-4 group">
          <div className="relative w-48 h-48 rounded-full border-4 border-white/10 border-t-[#ffc107] border-r-[#ffc107] p-2 flex flex-col items-center justify-center bg-[#0f2b5c]/40 backdrop-blur-sm shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-11 h-11 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-bold mb-1 shadow-sm border-2 border-white/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
            </div>
            <div className="text-3xl font-black text-white leading-none mb-1">
              <AnimatedCounter targetNumber={item.target} suffix={item.suffix} />
            </div>
            <div className="text-xs font-bold text-[#ffc107]">{item.label}</div>
          </div>
          <p className="text-white text-[11px] leading-relaxed mt-4 max-w-[200px]">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* THREE BOTTOM PILL HIGHLIGHTS (BIRU TRANSPARAN) */}
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
                  backgroundImage: `url('/images/strength.jpg')`,
                  clipPath: window.innerWidth >= 1024 ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' : 'none'
                }}
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
      <section id="services" className="relative w-full py-24 overflow-hidden border-b border-slate-800 bg-[#0f2b5c]">
        
        {/* SILUET WATERMARK FOTO DENGAN OPACITY TINGGI AGAR SANGAT JELAS */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-right-top opacity-120 pointer-events-none z-0"
          style={{ backgroundImage: `url('/images/services.jpg')` }}
        ></div>

        {/* OVERLAY BIRU SANGAT TIPIS (TIDAK TERLALU PEKAT) */}
        <div className="absolute inset-0 bg-[#0f2b5c]/50 pointer-events-none z-0"></div>

        {/* DOTTED PATTERN PUTIH HALUS */}
        <div className="absolute top-12 left-10 z-0 hidden lg:grid grid-cols-6 gap-2.5 opacity-20 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
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

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Featured <span className="text-[#ffc107]">Services</span>
            </h2>

            {/* Strip Garis Kuning Bawah Title */}
            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-4 rounded-full"></div>

            <p className="text-slate-200 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Kami menyediakan berbagai layanan unggulan untuk mendukung kebutuhan proyek pertambangan dan konstruksi Anda.
            </p>
          </div>

          {/* GRID 4 KARTU LAYANAN - POSISI TENGAH */}
<div className="flex flex-wrap justify-center gap-5 mb-16">

  {/* Card 1: Suku Cadang Original */}
  <div className="w-full sm:w-[calc(50%-10px)] lg:w-[220px] bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
    
    <div>
      <div className="relative h-36 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80')` 
          }}
        />
      </div>

      <div className="p-5 pt-7 text-center relative">
        <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">
          Suku Cadang Original
        </h3>

        <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
          Menyediakan suku cadang original XCMG dengan kualitas terjamin dan performa terbaik.
        </p>
      </div>
    </div>

    <div className="p-5 pt-0 text-center">
      <a
        href="/spare-parts"
        className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition"
      >
        Learn More
      </a>
    </div>
  </div>


  {/* Card 2: Layanan Purna Jual */}
  <div className="w-full sm:w-[calc(50%-10px)] lg:w-[220px] bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
    
    <div>
      <div className="relative h-36 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80')` 
          }}
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">
          Layanan Purna Jual
        </h3>

        <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
          Perawatan dan perbaikan alat berat oleh teknisi berpengalaman menggunakan standar XCMG.
        </p>
      </div>
    </div>

    <div className="p-5 pt-0 text-center">
      <a
        href="/services"
        className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition"
      >
        Learn More
      </a>
    </div>
  </div>


  {/* Card 3: Layanan On-Site */}
  <div className="w-full sm:w-[calc(50%-10px)] lg:w-[220px] bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
    
    <div>
      <div className="relative h-36 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80')` 
          }}
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">
          Layanan On-Site
        </h3>

        <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
          Tim service siap membantu langsung di lokasi proyek untuk memastikan operasional optimal.
        </p>
      </div>
    </div>

    <div className="p-5 pt-0 text-center">
      <a
        href="/services"
        className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition"
      >
        Learn More
      </a>
    </div>
  </div>


  {/* Card 4: Solusi Terintegrasi */}
  <div className="w-full sm:w-[calc(50%-10px)] lg:w-[220px] bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between group">
    
    <div>
      <div className="relative h-36 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80')` 
          }}
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="font-extrabold text-xs text-[#0f2b5c] mb-2.5">
          Solusi Terintegrasi
        </h3>

        <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
          Solusi menyeluruh mulai dari konsultasi, penyediaan unit, hingga after-sales support.
        </p>
      </div>
    </div>

    <div className="p-5 pt-0 text-center">
      <a
        href="/services"
        className="text-[11px] font-bold text-slate-700 hover:text-[#ffc107] transition"
      >
        Learn More
      </a>
    </div>
  </div>

</div>

          {/* BOTTOM BANNER "BUTUH LAYANAN LEBIH LANJUT?" TRANSPARAN ELEGAN */}
          <div id="cta" className="bg-[#0f2b5c]/75 backdrop-blur-md border border-slate-700/60 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 transition-transform duration-300 hover:scale-[1.01]">
            
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636l3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
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
            <div className="relative z-10 text-slate-200 text-xs md:text-sm max-w-md text-center lg:text-left">
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

{/* =========================================================
    7. SECTION CUSTOMER TESTIMONIALS
========================================================= */}
<section
    id="testimonials"
    className="relative w-full overflow-hidden bg-white py-24 md:py-28"
>
    {/* =====================================================
        BACKGROUND DECORATION
    ===================================================== */}

    {/* Soft background glow */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-slate-100/50 blur-3xl"></div>

        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#0f2b5c]/[0.025] blur-3xl"></div>

        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-[#ffc107]/[0.025] blur-3xl"></div>
    </div>

    {/* Dotted Pattern - Left */}
    <div className="absolute left-10 top-16 hidden opacity-20 lg:block">
        <div className="grid grid-cols-6 gap-3">
            {[...Array(30)].map((_, i) => (
                <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-slate-400"
                ></span>
            ))}
        </div>
    </div>

    {/* Large Quote - Right */}
    <div className="pointer-events-none absolute right-8 top-8 hidden select-none lg:block">
        <svg
            className="h-[260px] w-[260px] text-[#0f2b5c]/[0.055]"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M7.17 6.17A7.98 7.98 0 004 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3H8.83A4.98 4.98 0 0113 4V2a6.98 6.98 0 00-5.83 4.17zM17.17 6.17A7.98 7.98 0 0014 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3h-1.17A4.98 4.98 0 0121 4V2a6.98 6.98 0 00-3.83 4.17z" />
        </svg>
    </div>

    <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 xl:px-14">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">

            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-4">
                <span className="h-[2px] w-9 bg-[#ffc107]"></span>

                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffc107]">
                    Customer Testimonials
                </span>

                <span className="h-[2px] w-9 bg-[#ffc107]"></span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-black leading-tight tracking-tight text-[#0f2b5c] sm:text-5xl md:text-6xl">
                Apa Kata{" "}
                <span className="text-[#ffc107]">
                    Mereka?
                </span>
            </h2>

            {/* Small underline */}
            <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#ffc107]"></div>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 md:text-[15px]">
                Kepercayaan pelanggan adalah bagian penting dari perjalanan kami.
                Berikut pengalaman mereka bekerja sama dengan tim kami.
            </p>
        </div>

        {/* =====================================================
            TESTIMONIAL AREA
        ===================================================== */}
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center lg:min-h-[500px]">

            {/* =================================================
                LEFT DECORATIVE CIRCLE
            ================================================= */}
            <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">

                <div className="relative h-[400px] w-[400px]">

                    {/* Outer Circle */}
                    <div className="absolute inset-0 rounded-full border border-slate-200"></div>

                    {/* Yellow Arc */}
                    <div
                        className="absolute inset-0 rounded-full border border-transparent"
                        style={{
                            borderLeftColor: "#ffc107",
                            borderBottomColor: "#ffc107",
                            transform: "rotate(-35deg)",
                        }}
                    ></div>

                    {/* Small Dot */}
                    <div className="absolute bottom-8 right-12 h-2.5 w-2.5 rounded-full bg-[#ffc107]"></div>

                    {/* Quote Icon */}
                    <div className="absolute -left-3 top-14 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-100">
                        <svg
                            className="h-7 w-7 text-[#0f2b5c]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.17 6.17A7.98 7.98 0 004 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3H8.83A4.98 4.98 0 0113 4V2a6.98 6.98 0 00-5.83 4.17zM17.17 6.17A7.98 7.98 0 0014 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3h-1.17A4.98 4.98 0 0121 4V2a6.98 6.98 0 00-3.83 4.17z" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="absolute left-[72px] top-[78px] w-[235px]">

                        {/* Rating */}
                        <div className="mb-7 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="h-4 w-4 text-[#ffc107]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3 8.72c-.783-.57-.38-1.81.588-1.81H7.05a1 1 0 00.951-.69l1.049-3.293z" />
                                </svg>
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-[14px] leading-7 text-[#0f2b5c]">
                            "Pelayanan yang diberikan sangat profesional.
                            Tim mampu memahami kebutuhan proyek kami dan
                            memberikan solusi yang tepat serta responsif."
                        </p>

                        {/* Small Line */}
                        <div className="mb-4 mt-5 h-[2px] w-10 bg-[#ffc107]"></div>

                        {/* Person */}
                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f2b5c] text-xs font-black text-white shadow-md">
                                AR
                            </div>

                            <div>
                                <h4 className="text-[13px] font-extrabold text-[#0f2b5c]">
                                    Andi Rahman
                                </h4>

                                <p className="mt-0.5 text-[11px] text-slate-500">
                                    Project Manager
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================
                RIGHT DECORATIVE CIRCLE
            ================================================= */}
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">

                <div className="relative h-[400px] w-[400px]">

                    {/* Outer Circle */}
                    <div className="absolute inset-0 rounded-full border border-slate-200"></div>

                    {/* Yellow Arc */}
                    <div
                        className="absolute inset-0 rounded-full border border-transparent"
                        style={{
                            borderRightColor: "#ffc107",
                            borderBottomColor: "#ffc107",
                            transform: "rotate(35deg)",
                        }}
                    ></div>

                    {/* Small Dot */}
                    <div className="absolute bottom-8 left-12 h-2.5 w-2.5 rounded-full bg-[#ffc107]"></div>

                    {/* Quote Icon */}
                    <div className="absolute -right-3 top-14 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-100">
                        <svg
                            className="h-7 w-7 text-[#0f2b5c]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.17 6.17A7.98 7.98 0 004 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3H8.83A4.98 4.98 0 0021 4V2a6.98 6.98 0 00-3.83 4.17z" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="absolute right-[72px] top-[78px] w-[235px]">

                        {/* Rating */}
                        <div className="mb-7 flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="h-4 w-4 text-[#ffc107]"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3 8.72c-.783-.57-.38-1.81.588-1.81H7.05a1 1 0 00.951-.69l1.049-3.293z" />
                                </svg>
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-[14px] leading-7 text-[#0f2b5c]">
                            "Kerja sama berjalan dengan sangat baik dari
                            awal hingga penyelesaian proyek. Profesionalisme
                            dan kualitas hasil yang diberikan sesuai dengan
                            ekspektasi kami."
                        </p>

                        {/* Small Line */}
                        <div className="mb-4 mt-5 h-[2px] w-10 bg-[#ffc107]"></div>

                        {/* Person */}
                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f2b5c] text-xs font-black text-white shadow-md">
                                RP
                            </div>

                            <div>
                                <h4 className="text-[13px] font-extrabold text-[#0f2b5c]">
                                    Rizky Pratama
                                </h4>

                                <p className="mt-0.5 text-[11px] text-slate-500">
                                    Engineering Supervisor
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================
                CENTER MAIN TESTIMONIAL
            ================================================= */}
            <div className="relative z-20 mx-auto w-full max-w-[440px]">

                {/* Outer Circle */}
                <div className="absolute -inset-3 rounded-full border border-slate-200/80"></div>

                {/* Decorative Ring */}
                <div
                    className="absolute -inset-3 rounded-full border border-transparent"
                    style={{
                        borderTopColor: "#ffc107",
                        borderRightColor: "#ffc107",
                        transform: "rotate(-35deg)",
                    }}
                ></div>

                {/* Main Circle */}
                <div className="relative aspect-square overflow-hidden rounded-full bg-[#0f2b5c] shadow-[0_25px_70px_rgba(15,43,92,0.22)]">

                    {/* Inner subtle ring */}
                    <div className="absolute inset-4 rounded-full border border-white/20"></div>

                    {/* Decorative glow */}
                    <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#ffc107]/10"></div>

                    <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/5"></div>

                    {/* Yellow Quote */}
                    <div className="absolute left-[18%] top-[15%] flex h-16 w-16 items-center justify-center rounded-full bg-[#ffc107] shadow-lg">
                        <svg
                            className="h-7 w-7 text-[#0f2b5c]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7.17 6.17A7.98 7.98 0 004 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3H8.83A4.98 4.98 0 0113 4V2a6.98 6.98 0 00-5.83 4.17zM17.17 6.17A7.98 7.98 0 0014 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3h-1.17A4.98 4.98 0 0021 4V2a6.98 6.98 0 00-3.83 4.17z" />
                        </svg>
                    </div>

                    {/* Stars */}
                    <div className="absolute right-[17%] top-[18%] flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className="h-4 w-4 text-[#ffc107]"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3 8.72c-.783-.57-.38-1.81.588-1.81H7.05a1 1 0 00.951-.69l1.049-3.293z" />
                            </svg>
                        ))}
                    </div>

                    {/* Main Text */}
                    <div className="absolute left-[18%] right-[18%] top-[34%]">

                        <p className="text-[14px] leading-7 text-white sm:text-[15px]">
                            "Kualitas layanan dan dukungan teknis yang
                            diberikan sangat membantu kelancaran
                            operasional di lapangan. Respons tim juga
                            cepat ketika kami membutuhkan bantuan."
                        </p>

                        {/* Divider */}
                        <div className="mb-4 mt-5 h-[2px] w-14 bg-[#ffc107]"></div>

                        {/* Person */}
                        <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffc107] text-xs font-black text-[#0f2b5c] shadow-md">
                                DS
                            </div>

                            <div>
                                <h4 className="text-[13px] font-extrabold text-white">
                                    Dimas Saputra
                                </h4>

                                <p className="mt-0.5 text-[11px] text-slate-300">
                                    Site Operations
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================
                MOBILE TESTIMONIALS
            ================================================= */}
            <div className="mt-14 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">

                {/* Mobile Testimonial 1 */}
                <div className="relative rounded-[2rem] bg-white p-7 shadow-lg ring-1 ring-slate-100">

                    <div className="mb-5 flex items-center justify-between">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f2b5c] text-[#ffc107]">
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.17 6.17A7.98 7.98 0 004 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3H8.83A4.98 4.98 0 0113 4V2a6.98 6.98 0 00-5.83 4.17zM17.17 6.17A7.98 7.98 0 0014 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3h-1.17A4.98 4.98 0 0021 4V2a6.98 6.98 0 00-3.83 4.17z" />
                            </svg>
                        </div>

                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className="text-sm text-[#ffc107]"
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                    </div>

                    <p className="text-sm leading-7 text-[#0f2b5c]">
                        "Pelayanan yang diberikan sangat profesional.
                        Tim mampu memahami kebutuhan proyek kami dan
                        memberikan solusi yang tepat serta responsif."
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f2b5c] text-xs font-bold text-white">
                            AR
                        </div>

                        <div>
                            <h4 className="text-xs font-extrabold text-[#0f2b5c]">
                                Andi Rahman
                            </h4>

                            <p className="text-[10px] text-slate-500">
                                Project Manager
                            </p>
                        </div>

                    </div>
                </div>

                {/* Mobile Testimonial 3 */}
                <div className="relative rounded-[2rem] bg-white p-7 shadow-lg ring-1 ring-slate-100">

                    <div className="mb-5 flex items-center justify-between">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f2b5c] text-[#ffc107]">
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.17 6.17A7.98 7.98 0 004 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3H8.83A4.98 4.98 0 0113 4V2a6.98 6.98 0 00-5.83 4.17zM17.17 6.17A7.98 7.98 0 0014 12v5a3 3 0 003 3h3a3 3 0 003-3v-5a3 3 0 00-3-3h-1.17A4.98 4.98 0 0021 4V2a6.98 6.98 0 00-3.83 4.17z" />
                            </svg>
                        </div>

                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className="text-sm text-[#ffc107]"
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                    </div>

                    <p className="text-sm leading-7 text-[#0f2b5c]">
                        "Kerja sama berjalan dengan sangat baik dari awal
                        hingga penyelesaian proyek. Profesionalisme dan
                        kualitas hasil yang diberikan sesuai dengan
                        ekspektasi kami."
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f2b5c] text-xs font-bold text-white">
                            RP
                        </div>

                        <div>
                            <h4 className="text-xs font-extrabold text-[#0f2b5c]">
                                Rizky Pratama
                            </h4>

                            <p className="text-[10px] text-slate-500">
                                Engineering Supervisor
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        {/* =====================================================
            TRUST INDICATOR
        ===================================================== */}
        <div className="relative z-20 mx-auto mt-16 max-w-4xl">

            <div className="flex flex-col items-center justify-center divide-y divide-slate-200 rounded-[2rem] bg-white px-6 py-5 shadow-[0_15px_45px_rgba(15,43,92,0.10)] ring-1 ring-slate-100 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-8">

                {/* Rating */}
                <div className="flex w-full items-center justify-center gap-4 px-5 py-3 sm:w-1/3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f2b5c]">
                        <svg
                            className="h-6 w-6 text-[#ffc107]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3 8.72c-.783-.57-.38-1.81.588-1.81H7.05a1 1 0 00.951-.69l1.049-3.293z" />
                        </svg>
                    </div>

                    <div>
                        <div className="text-base font-black text-[#0f2b5c]">
                            5.0 / 5.0
                        </div>

                        <div className="text-[10px] text-slate-500">
                            Customer Rating
                        </div>
                    </div>

                </div>

                {/* Trusted */}
                <div className="flex w-full items-center justify-center gap-4 px-5 py-3 sm:w-1/3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f2b5c]">
                        <svg
                            className="h-6 w-6 text-[#ffc107]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 3c-3.667 0-6.958 1.64-9.157 4.213A11.957 11.957 0 0012 21c3.667 0 6.958-1.64 9.157-4.213A11.957 11.957 0 0020.618 7.984z"
                            />
                        </svg>
                    </div>

                    <div>
                        <div className="text-base font-black text-[#0f2b5c]">
                            Trusted by
                        </div>

                        <div className="text-[10px] text-slate-500">
                            Project Teams Across Indonesia
                        </div>
                    </div>

                </div>

                {/* Clients */}
                <div className="flex w-full items-center justify-center gap-4 px-5 py-3 sm:w-1/3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f2b5c]">
                        <svg
                            className="h-6 w-6 text-[#ffc107]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M17 20h5v-2a4 4 0 00-4-4h-1m-4 6H7v-2a4 4 0 014-4h2a4 4 0 014 4v2zm0-10a3 3 0 11-6 0 3 3 0 016 0zm5 3a3 3 0 100-6"
                            />
                        </svg>
                    </div>

                    <div>
                        <div className="text-base font-black text-[#0f2b5c]">
                            100+
                        </div>

                        <div className="text-[10px] text-slate-500">
                            Happy Clients
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>

    {/* =====================================================
        BOTTOM DECORATIVE WAVE
    ===================================================== */}
    <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">

        <svg
            className="relative block h-[90px] w-full"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
        >
            <path
                d="M0,65 C180,110 300,25 500,55 C720,88 850,80 1050,52 C1230,25 1320,48 1440,30 L1440,90 L0,90 Z"
                fill="#0f2b5c"
            />

            <path
                d="M0,63 C180,108 300,23 500,53 C720,86 850,78 1050,50 C1230,23 1320,46 1440,28"
                fill="none"
                stroke="#ffc107"
                strokeWidth="3"
            />
        </svg>
    </div>

</section>

      {/* ================= 7. SECTION PROJECT GALLERY ================= */}
      <section id="projects" className="relative w-full text-slate-800 py-24 overflow-hidden border-b border-slate-200 bg-[#0f2b5c]">
        
        {/* BACKGROUND FOTO DENGAN OPACITY & OVERLAY BIRU */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-500 pointer-events-none"
          style={{ backgroundImage: `url('/images/statistik.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2b5c]/80 via-[#0f2b5c]/70 to-[#0f2b5c]/80 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
          
          {/* HEADER SECTION PROJECT GALLERY */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            
            {/* Judul dibuat lebih tipis (font-medium) */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Proyek yang Telah <span className="text-[#ffc107]">Kami Kerjakan</span>
            </h2>

            <div className="w-12 h-1 bg-[#ffc107] mx-auto my-6 rounded-full"></div>

            <p className="text-slate-200 text-xs md:text-sm font-normal leading-relaxed max-w-xl mx-auto">
              Berbagai proyek konstruksi dan pertambangan yang telah kami selesaikan dengan standar kualitas tinggi dan komitmen terbaik.
            </p>
          </div>

          {/* GRID KARTU PROYEK (WARNA PUTIH, KOMPAK, TANPA LABEL DI KIRI ATAS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Card Proyek 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Pembangunan Gedung Perkantoran</h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Jakarta, DKI Jakarta</span>
                  <span>2024</span>
                </div>
              </div>
            </div>

            {/* Card Proyek 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Aktivitas Penambangan Batubara</h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Kalimantan Timur</span>
                  <span>2024</span>
                </div>
              </div>
            </div>

            {/* Card Proyek 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Pembangunan Jalan & Jembatan</h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Sulawesi Selatan</span>
                  <span>2023</span>
                </div>
              </div>
            </div>

            {/* Card Proyek 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Pengelolaan Area Quarry</h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Bangka Belitung</span>
                  <span>2023</span>
                </div>
              </div>
            </div>

            {/* Card Proyek 5 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Pembangunan Pabrik Industri</h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Cilegon, Banten</span>
                  <span>2024</span>
                </div>
              </div>
            </div>

            {/* Card Proyek 6 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
              <div className="p-3.5">
                <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Perawatan Alat Berat</h3>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Berbagai Lokasi</span>
                  <span>2024</span>
                </div>
              </div>
            </div>

            {/* KARTU TAMBAHAN (MUNCUL JIKA showAll TRUE) */}
            {showAll && (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
                  <div className="relative h-36 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80')` }}></div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Ekspansi Pelabuhan Logistik</h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Surabaya, Jawa Timur</span>
                      <span>2023</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
                  <div className="relative h-36 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80')` }}></div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Overhaul Mesin Tambang</h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Balikpapan</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
                  <div className="relative h-36 overflow-hidden">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80')` }}></div>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-bold text-xs text-[#0f2b5c] mb-1.5 leading-snug">Konstruksi Gudang Logistik</h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Karawang, Jawa Barat</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* TOMBOL LIHAT SEMUA / TUTUP PROYEK */}
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

          {/* BARIS KOSONG UNTUK KESEIMBANGAN LAYOUT (KATEGORI DIHAPUS) */}
          <div className="flex justify-end mb-16 border-b border-slate-200/80 pb-6">
            <a href="/news" className="text-xs font-extrabold text-[#0f2b5c] hover:text-amber-600 transition flex items-center gap-1.5 shrink-0">
              <span>Lihat Semua Berita</span>
              <span>→</span>
            </a>
          </div>

          {/* MAIN NEWS GRID (2 KOLOM: FEATURED CARD BESAR DI KIRI & LIST TIMELINE DI KANAN) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* SISI KIRI: FEATURED BIG NEWS CARD */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-10 group">
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 z-0"
                style={{ backgroundImage: `url('/images/karir.jpg')` }}
              ></div>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent z-10"></div>

              {/* Konten Teks di Atas Overlay */}
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

                <a href="/news/detail" className="inline-flex items-center gap-2 text-xs font-bold text-[#ffc107] hover:underline">
                  <span>Baca Selengkapnya</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* SISI KANAN: LIST BERITA TIMELINE */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 relative">
              
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

                <a href="/news/detail" className="w-8 h-8 rounded-full bg-slate-50 text-[#0f2b5c] flex items-center justify-center hover:bg-[#ffc107] transition shrink-0 relative z-10">
                  →
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
    9. SECTION KONTAK & ALAMAT KAMI
========================================================= */}
<section 
  id="contact"
  className="relative w-full py-24 overflow-hidden border-b border-slate-200 bg-cover bg-center"
  style={{
    backgroundImage: "linear-gradient(to bottom, rgba(7,27,56,0.10), rgba(7,27,56,0.95)), url('/images/kontak.jpg')"
  }}
>
  <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16 relative z-10">
    
    {/* HEADER SECTION */}
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

    {/* GRID 3 KARTU KONTAK MINIMALIS (TANPA IKON & KOMPAK) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      
      {/* Card 1: Alamat */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Alamat Kantor Pusat</h3>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Foresta Business Loft 7, Unit 6-7<br />
          Jl. BSD Boulevard Utara, Lengkong Kulon, Tangerang, Banten 15331
        </p>
        <div className="mt-5 pt-3 border-t border-slate-100">
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">
            Lihat Maps →
          </a>
        </div>
      </div>

      {/* Card 2: Jam Operasional */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Jam Operasional</h3>
        <div className="space-y-2 text-[11px] text-slate-600">
          <div className="flex justify-between">
            <span className="font-semibold">Senin - Jumat:</span>
            <span>08.00 - 17.00</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Sabtu:</span>
            <span>08.00 - 14.00</span>
          </div>
          <div className="flex justify-between text-amber-600 font-bold">
            <span>Minggu:</span>
            <span>Tutup</span>
          </div>
        </div>
        <div className="mt-5 pt-3 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400">Dukungan 24/7 Darurat</span>
        </div>
      </div>

      {/* Card 3: Kontak */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="font-extrabold text-sm text-[#0f2b5c] mb-3">Informasi Kontak</h3>
        <div className="space-y-1.5 text-[11px] text-slate-600">
          <p>Hotline: <span className="font-medium text-[#0f2b5c]">+62 811-0000-0000</span></p>
          <p>Email: <span className="font-medium text-[#0f2b5c]">info@servistamapro.co.id</span></p>
          <p>Parts: <span className="font-medium text-[#0f2b5c]">parts@servistamapro.co.id</span></p>
        </div>
        <div className="mt-5 pt-3 border-t border-slate-100">
          <a href="/contact-us" className="text-[11px] font-bold text-[#0f2b5c] hover:text-amber-600 transition inline-flex items-center gap-1">
            Kirim Email →
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* =========================================================
    10. SECTION BRANCH OFFICE (FOTO BACKGROUND DIPERJELAS)
========================================================= */}
      <section
        id="operational-area"
        className="relative w-full bg-white text-[#0b2348] overflow-hidden border-b border-slate-200"
      >
        {/* BACKGROUND FOTO DIPERJELAS (OPACITY DINAIKKAN) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/branch.png"
            alt="Operational Area Background"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          {/* Overlay putih dibuat sedikit lebih transparan agar foto aslinya tampak lebih jelas dan kontras */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/85" />
        </div>

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 md:px-10 xl:px-14 py-20 md:py-24">

          {/* HEADER */}
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

          {/* AREA PETA TANPA KOTAK (FULL LEBAR DENGAN CALLOUT CARDS) */}
          <div className="relative w-full min-h-[600px] md:min-h-[680px] lg:min-h-[730px] flex items-center justify-center my-6">

            <div className="absolute w-[60%] max-w-[850px] h-[260px] rounded-[50%] bg-[#ffc107]/10 blur-[80px] pointer-events-none" />

            {/* MAP WRAPPER */}
            <div className="relative w-full max-w-[1200px] aspect-[2.5/1]">

              {/* PETA INDONESIA */}
{/* PETA INDONESIA (WARNA BIRU SPI #0b2348) */}
<img 
  src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Indonesia_Blankmap.svg" 
  alt="Peta Indonesia" 
  className="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-[0_10px_25px_rgba(11,35,72,0.15)]"
  style={{
    filter: "brightness(0) saturate(100%) invert(11%) sepia(50%) saturate(1400%) hue-rotate(185deg) contrast(105%)"
  }}
/>
              {/* LOCATION MARKERS */}
              <div className="absolute left-[27%] top-[55%] z-30">
                <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute -inset-1 rounded-full bg-[#ffc107]/35" />
                <span className="relative block w-4 h-4 rounded-full bg-[#d92323] border-[2px] border-white shadow-[0_3px_10px_rgba(217,35,35,0.5)]" />
              </div>

              <div className="absolute left-[47%] top-[73%] z-30">
                <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute -inset-1 rounded-full bg-[#ffc107]/35" />
                <span className="relative block w-5 h-5 rounded-full bg-[#d92323] border-[2px] border-white shadow-[0_3px_10px_rgba(217,35,35,0.5)]" />
              </div>

              <div className="absolute left-[57%] top-[36%] z-30">
                <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute -inset-1 rounded-full bg-[#ffc107]/35" />
                <span className="relative block w-5 h-5 rounded-full bg-[#d92323] border-[2px] border-white shadow-[0_3px_10px_rgba(217,35,35,0.5)]" />
              </div>

              <div className="absolute left-[72%] top-[50%] z-30">
                <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute -inset-1 rounded-full bg-[#ffc107]/35" />
                <span className="relative block w-5 h-5 rounded-full bg-[#d92323] border-[2px] border-white shadow-[0_3px_10px_rgba(217,35,35,0.5)]" />
              </div>

              <div className="absolute right-[8%] top-[58%] z-30">
                <span className="absolute -inset-3 rounded-full bg-red-500/20 animate-ping" />
                <span className="absolute -inset-1 rounded-full bg-[#ffc107]/35" />
                <span className="relative block w-5 h-5 rounded-full bg-[#d92323] border-[2px] border-white shadow-[0_3px_10px_rgba(217,35,35,0.5)]" />
              </div>

              {/* CONNECTOR LINES */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <marker id="arrowNavy" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#0b2348" /></marker>
                  <marker id="arrowYellow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#ffc107" /></marker>
                </defs>
                <path d="M27 22 L20 8 L10 8" fill="none" stroke="#ffc107" strokeWidth="0.30" strokeDasharray="0.8 0.55" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowYellow)" />
                <path d="M47 29 L47 37 L35 37" fill="none" stroke="#0b2348" strokeWidth="0.25" strokeDasharray="0.8 0.55" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowNavy)" />
                <path d="M57 14 L57 5 L69 5" fill="none" stroke="#ffc107" strokeWidth="0.30" strokeDasharray="0.8 0.55" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowYellow)" />
                <path d="M72 20 L80 13 L90 13" fill="none" stroke="#0b2348" strokeWidth="0.25" strokeDasharray="0.8 0.55" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowNavy)" />
                <path d="M92 23 L97 29" fill="none" stroke="#ffc107" strokeWidth="0.30" strokeDasharray="0.8 0.55" vectorEffect="non-scaling-stroke" markerEnd="url(#arrowYellow)" />
              </svg>

              {/* CALLOUT CARDS */}
              <div className="absolute left-[0%] top-[-3%] z-40 hidden md:block w-[205px]">
                <div className="relative bg-white text-[#0b2348] border border-slate-200 rounded-2xl p-4 shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#ffc107] rounded-t-2xl" />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2348] text-[#ffc107] flex items-center justify-center text-[9px] font-black">01</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[#b27b00]">Service Point</span>
                  </div>
                  <h4 className="text-xs font-black text-[#0b2348]">Sumatera</h4>
                  <p className="text-[9px] text-slate-500 leading-relaxed mt-1">Dukungan pemeliharaan dan teknisi untuk area operasional Sumatera.</p>
                </div>
              </div>

              <div className="absolute left-[67%] top-[-7%] z-40 hidden md:block w-[220px]">
                <div className="relative bg-white text-[#0b2348] border border-slate-200 rounded-2xl p-4 shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#ffc107] rounded-t-2xl" />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2348] text-[#ffc107] flex items-center justify-center text-[9px] font-black">02</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[#b27b00]">Branch & Workshop</span>
                  </div>
                  <h4 className="text-xs font-black text-[#0b2348]">Kalimantan</h4>
                  <p className="text-[9px] text-slate-500 leading-relaxed mt-1">Workshop, overhaul, spare parts, dan dukungan teknis untuk area tambang.</p>
                </div>
              </div>

              <div className="absolute right-[-2%] top-[5%] z-40 hidden md:block w-[215px]">
                <div className="relative bg-white text-[#0b2348] border border-slate-200 rounded-2xl p-4 shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#ffc107] rounded-t-2xl" />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2348] text-[#ffc107] flex items-center justify-center text-[9px] font-black">03</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[#b27b00]">Service Coverage</span>
                  </div>
                  <h4 className="text-xs font-black text-[#0b2348]">Sulawesi</h4>
                  <p className="text-[9px] text-slate-500 leading-relaxed mt-1">Layanan maintenance berkala dan diagnosis unit alat berat.</p>
                </div>
              </div>

              <div className="absolute left-[31%] bottom-[-8%] z-40 hidden md:block w-[230px]">
                <div className="relative bg-white text-[#0b2348] border border-slate-200 rounded-2xl p-4 shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#ffc107] rounded-t-2xl" />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0b2348] text-[#ffc107] flex items-center justify-center text-[9px] font-black">04</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[#b27b00]">Head Office</span>
                  </div>
                  <h4 className="text-xs font-black text-[#0b2348]">Tangerang, Banten</h4>
                  <p className="text-[9px] text-slate-500 leading-relaxed mt-1">Pusat koordinasi manajemen, sales, logistik, dan layanan nasional.</p>
                </div>
              </div>

              <div className="absolute right-[-1%] bottom-[2%] z-40 hidden xl:block w-[175px]">
                <div className="relative bg-white text-[#0b2348] border border-slate-200 rounded-xl p-3 shadow-xl">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ffc107] rounded-t-xl" />
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#0b2348] text-[#ffc107] flex items-center justify-center text-[8px] font-black">05</span>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-wider text-[#b27b00]">Engineer Coverage</p>
                      <p className="text-[10px] font-black text-[#0b2348]">Papua & Timur</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* MOBILE LOCATION LIST */}
          <div className="mt-6 md:hidden">
            <div className="bg-white text-[#0b2348] border border-slate-200 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#b27b00]">Operational Coverage</p>
                <span className="w-2 h-2 rounded-full bg-[#ffc107]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Head Office</p>
                  <p className="text-[10px] font-black text-[#0b2348] mt-1">Tangerang</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Branch</p>
                  <p className="text-[10px] font-black text-[#0b2348] mt-1">Kalimantan</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Service Point</p>
                  <p className="text-[10px] font-black text-[#0b2348] mt-1">Sumatera</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Coverage</p>
                  <p className="text-[10px] font-black text-[#0b2348] mt-1">Sulawesi & Timur</p>
                </div>
              </div>
            </div>
          </div>

          {/* LEGEND */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-10 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="relative flex w-3 h-3">
                <span className="absolute inset-0 rounded-full bg-red-500/25 animate-ping" />
                <span className="relative w-3 h-3 rounded-full bg-[#d92323] shadow-[0_0_0_4px_rgba(217,35,35,0.10)]" />
              </span>
              <span className="text-[9px] font-bold">Active Location</span>
            </div>

            <div className="w-px h-4 bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="relative w-6 h-[2px] bg-[#ffc107]">
                <span className="absolute right-[-3px] -top-[2px] w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-[#ffc107]" />
              </span>
              <span className="text-[9px] font-bold">Location Callout</span>
            </div>

            <div className="w-px h-4 bg-slate-200" />

            <p className="text-[9px] text-slate-500">Wilayah coverage dapat berkembang mengikuti kebutuhan proyek.</p>
          </div>

        </div>
      </section>

      {/* 11. FOOTER */}
      <Footer />

    </div>
  );
} 