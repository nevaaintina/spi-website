import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Head, useForm } from "@inertiajs/react";

/* =========================================================
   POP UP SCROLL ANIMATION
========================================================= */
function PopReveal({
  children,
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`
        ${className}
        transition-all
        duration-[850ms]
        ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-[0.78] translate-y-14"
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
   SOFT REVEAL ANIMATION
========================================================= */
function SoftReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  const hiddenPosition = {
    up: "translate-y-16",
    left: "-translate-x-16",
    right: "translate-x-16",
    down: "-translate-y-16",
  };

  return (
    <div
      ref={ref}
      className={`
        ${className}
        transition-all
        duration-[900ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "opacity-100 translate-x-0 translate-y-0 scale-100"
            : `opacity-0 ${hiddenPosition[direction]} scale-[0.96]`
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
   CONTACT PAGE (DINAMIS DARI DATABASE)
========================================================= */
export default function Contact({ hero, cards = [], infoSection = null }) {
  // Inertia Form untuk Pengiriman Pesan Kontak
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const submitContact = (e) => {
    e.preventDefault();
    post('/contact/submit', {
      preserveScroll: true,
      onSuccess: () => {
        alert("Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.");
        reset();
      },
    });
  };

  // Fallback data kartu jika database kosong
  const defaultCards = [
    { id: 1, card_number: '01', title: 'Office Hotline', subtitle: 'Senin - Jumat · 08:00 - 17:00', detail: '+62 21 555 888', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85', type: 'hotline' },
    { id: 2, card_number: '02', title: 'WhatsApp Support', subtitle: 'Respon cepat melalui WhatsApp', detail: '+62 811-2223-3344', image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=900&q=85', type: 'whatsapp' },
    { id: 3, card_number: '03', title: 'Official Email', subtitle: 'Pertanyaan & proposal bisnis', detail: 'info@servistamapro.co.id', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85', type: 'email' },
    { id: 4, card_number: '04', title: 'Emergency Service', subtitle: 'Layanan darurat alat berat', detail: '0800-1234-567', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=85', type: 'emergency' },
  ];

  const contactCards = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Head title="Contact Us - PT. Servistama Pro Indonesia" />

      {/* =====================================================
          CUSTOM ANIMATIONS KEYFRAMES
      ===================================================== */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(18px) rotate(4deg);
          }
        }

        @keyframes floatReverse {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(-4deg);
          }
        }

        @keyframes softPulse {
          0%, 100% {
            opacity: .25;
            transform: scale(1);
          }
          50% {
            opacity: .65;
            transform: scale(1.05);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <Navbar />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#071b38] pt-24 pb-20 md:pt-28 md:pb-24">

        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Decorative Circle 1 */}
        <div className="absolute -right-20 top-[-120px] w-[420px] h-[420px] rounded-full border border-white/10 pointer-events-none animate-[floatSlow_7s_ease-in-out_infinite]" />

        {/* Decorative Circle 2 */}
        <div className="absolute right-[12%] top-[-80px] w-[300px] h-[300px] rounded-full border border-[#ffc107]/10 pointer-events-none animate-[floatReverse_9s_ease-in-out_infinite]" />

        {/* RIGHT IMAGE */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[56%] overflow-hidden pointer-events-none">

          <img
            src="/images/contact.jpg"
            alt="Heavy Equipment"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />

          <div className="absolute inset-0 bg-[#071b38]/15" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071b38] via-[#071b38]/40 to-transparent" />
        </div>

        {/* HERO CONTENT */}
        <SoftReveal
          direction="left"
          delay={100}
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 xl:px-16"
        >
          <div className="max-w-[610px]">

            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[2px] bg-[#ffc107]" />

              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.22em] uppercase text-[#ffc107]">
                {hero?.badge_text || "Get In Touch"}
              </span>

              <span className="w-10 h-[1px] bg-white/20" />
            </div>

            {/* Heading */}
            <h1 className="text-[42px] sm:text-[50px] md:text-[56px] lg:text-[58px] leading-[1.05] font-black tracking-[-0.035em] text-white">
              {hero?.title_part1 || "Let's Build"}
              <br />
              Something{" "}
              <span className="text-[#ffc107]">
                {hero?.title_part2 || "Great."}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[540px] text-[12px] md:text-[14px] leading-relaxed text-slate-300 font-normal">
              {hero?.description || "Hubungi tim profesional PT. Servistama Pro Indonesia untuk konsultasi alat berat, layanan purna jual, kebutuhan spare parts, maupun kerja sama bisnis."}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3.5 mt-7">

              <a
                href={hero?.button1_link || "tel:+6221555888"}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ffc107] text-[#071b38] text-xs font-bold shadow-lg hover:bg-white hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.04 11.04 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a2 2 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                {hero?.button1_text || "Office Hotline"}
              </a>

              <a
                href={hero?.button2_link || "https://wa.me/6281122233344"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/20 text-white text-xs font-bold hover:bg-white/10 hover:-translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-black/10"
              >
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5a8.38 8.38 0 01-9 8.5 8.5 8.5 0 01-4.1-1.05L3 20l1.1-4.5A8.5 8.5 0 113 11.5"
                  />
                </svg>

                {hero?.button2_text || "WhatsApp Support"}
              </a>

            </div>
          </div>
        </SoftReveal>
      </section>


      {/* =====================================================
          CONTACT INFO CARDS
      ===================================================== */}
      <section className="relative z-30 -mt-10 md:-mt-14 mb-12">

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {contactCards.map((card, idx) => (
              <PopReveal key={card.id || idx} delay={idx * 80}>

                <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_12px_35px_rgba(15,35,70,0.08)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-[#ffc107] transition-all duration-500 flex flex-col h-full">

                  {/* IMAGE */}
                  <div className="relative h-[145px] overflow-hidden">

                    <img
                      src={card.image || defaultCards[idx]?.image || "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=85"}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071b38]/80 via-[#071b38]/20 to-transparent" />

                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#071b38] flex items-center justify-center text-[#ffc107] shadow-lg">

                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.04 11.04 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a2 2 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                    </div>

                    <span className="absolute top-5 right-5 text-[10px] font-bold text-white/70">
                      {card.card_number || `0${idx + 1}`}
                    </span>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col justify-between flex-1">

                    <div>
                      <p className="text-[9px] font-bold tracking-[0.22em] text-[#b27b00] mb-1 uppercase">
                        {card.title}
                      </p>

                      <h3 className="text-sm font-bold text-[#071b38]">
                        {card.title}
                      </h3>

                      <p className="text-[10px] text-slate-500 mt-1 font-normal">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 text-xs font-bold text-[#071b38] group-hover:text-[#b27b00] transition">
                      {card.detail}
                    </div>

                  </div>
                </div>

              </PopReveal>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          CONTACT FORM + LOCATION
      ===================================================== */}
      <section className="pb-20 pt-2 md:pt-4 bg-[#f7f9fc]">

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">


            {/* =================================================
                CONTACT FORM
            ================================================ */}
            <SoftReveal
              direction="left"
              delay={100}
              className="lg:col-span-7"
            >

              <div className="bg-white rounded-2xl border border-slate-200/90 p-7 md:p-9 shadow-[0_10px_35px_rgba(15,35,70,0.06)] hover:shadow-xl transition-shadow duration-300">

                <div className="mb-7">

                  <div className="flex items-center gap-3 mb-2">

                    <span className="w-8 h-[2px] bg-[#ffc107]" />

                    <span className="text-[9px] font-bold tracking-[0.22em] text-[#b27b00] uppercase">
                      {infoSection?.badge_text || "Send Message"}
                    </span>

                    <span className="w-10 h-[1px] bg-slate-200" />

                  </div>

                  <h2 className="text-2xl md:text-[27px] font-black text-[#071b38] tracking-tight">
                    {infoSection?.title_part1 || "Kirimkan Pesan"}{" "}
                    <span className="text-[#b27b00]">
                      {infoSection?.title_part2 || "Kepada Kami"}
                    </span>
                  </h2>

                  <p className="mt-1.5 text-[11px] text-slate-500 font-normal">
                    {infoSection?.description || "Isi formulir di bawah ini dan tim kami akan segera merespons Anda."}
                  </p>

                </div>


                {/* FORM */}
                <form
                  onSubmit={submitContact}
                  className="space-y-5"
                >

                  {/* NAME + EMAIL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-[10px] font-bold text-[#071b38] mb-2">
                        Nama Lengkap
                      </label>

                      <input
                        type="text"
                        required
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        placeholder="Nama Anda"
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-[#fafbfc] text-[11px] outline-none transition focus:bg-white focus:border-[#071b38] focus:ring-2 focus:ring-[#071b38]/5"
                      />
                      {errors.name && <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>}

                    </div>


                    <div>

                      <label className="block text-[10px] font-bold text-[#071b38] mb-2">
                        Email Aktif
                      </label>

                      <input
                        type="email"
                        required
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-[#fafbfc] text-[11px] outline-none transition focus:bg-white focus:border-[#071b38] focus:ring-2 focus:ring-[#071b38]/5"
                      />
                      {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}

                    </div>

                  </div>


                  {/* PHONE + SUBJECT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-[10px] font-bold text-[#071b38] mb-2">
                        Nomor Telepon / WhatsApp
                      </label>

                      <input
                        type="tel"
                        required
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-[#fafbfc] text-[11px] outline-none transition focus:bg-white focus:border-[#071b38] focus:ring-2 focus:ring-[#071b38]/5"
                      />
                      {errors.phone && <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>}

                    </div>


                    <div>

                      <label className="block text-[10px] font-bold text-[#071b38] mb-2">
                        Subjek Pesan
                      </label>

                      <input
                        type="text"
                        required
                        value={data.subject}
                        onChange={e => setData('subject', e.target.value)}
                        placeholder="Contoh: Konsultasi Unit XCMG"
                        className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-[#fafbfc] text-[11px] outline-none transition focus:bg-white focus:border-[#071b38] focus:ring-2 focus:ring-[#071b38]/5"
                      />
                      {errors.subject && <span className="text-red-500 text-[10px] mt-1 block">{errors.subject}</span>}

                    </div>

                  </div>


                  {/* MESSAGE */}
                  <div>

                    <label className="block text-[10px] font-bold text-[#071b38] mb-2">
                      Pesan / Pertanyaan
                    </label>

                    <textarea
                      rows="4"
                      required
                      value={data.message}
                      onChange={e => setData('message', e.target.value)}
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-[#fafbfc] text-[11px] outline-none resize-none transition focus:bg-white focus:border-[#071b38] focus:ring-2 focus:ring-[#071b38]/5"
                    />
                    {errors.message && <span className="text-red-500 text-[10px] mt-1 block">{errors.message}</span>}

                  </div>


                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full h-11 rounded-lg bg-[#071b38] text-white text-[11px] font-bold flex items-center justify-center gap-3 hover:bg-[#ffc107] hover:text-[#071b38] transition-all duration-300 shadow-md hover:-translate-y-0.5 disabled:opacity-50"
                  >

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 2L11 13"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 2l-7 20-4-9-9-4 20-7z"
                      />
                    </svg>

                    <span>
                      {processing ? 'Mengirim...' : 'Kirim Pesan Sekarang'}
                    </span>

                    <span className="text-base">
                      →
                    </span>

                  </button>

                </form>

              </div>

            </SoftReveal>


            {/* =================================================
                RIGHT SIDE
            ================================================ */}
            <SoftReveal
              direction="right"
              delay={180}
              className="lg:col-span-5"
            >

              <div className="space-y-5">


                {/* =================================================
                    LOCATION
                ================================================ */}
                <PopReveal delay={200}>

                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_10px_35px_rgba(15,35,70,0.06)] hover:shadow-xl transition-shadow duration-300">

                    <div className="flex gap-3 items-start mb-4">

                      <div className="w-9 h-9 rounded-xl bg-[#fff8df] flex items-center justify-center shrink-0 text-[#b27b00]">

                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                          />

                          <circle
                            cx="12"
                            cy="11"
                            r="3"
                          />

                        </svg>

                      </div>


                      <div>

                        <h3 className="text-xs font-bold text-[#071b38]">
                          Lokasi Kantor Pusat & Warehouse
                        </h3>

                        <p className="text-[10px] text-slate-500 leading-relaxed mt-1 font-normal">
                          {infoSection?.address || "Kawasan Industri Millenium, Jl. Millenium Blok O No. 12, Tangerang, Banten, Indonesia."}
                        </p>

                      </div>

                    </div>


                    <div className="w-full h-[205px] rounded-xl overflow-hidden border border-slate-200">

                      <iframe
                        title="Google Maps Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.6059!3d-6.1944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnMzkuOCJTIDE0NsKwMzYnMjEuMiJF!5e0!3m2!1sid!2sid!4v1620000000000!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                      />

                    </div>

                  </div>

                </PopReveal>


                {/* =================================================
                    QR CODE
                ================================================ */}
                <PopReveal delay={350}>

                  <div className="relative overflow-hidden bg-[#071b38] rounded-2xl p-5 md:p-6 shadow-[0_12px_35px_rgba(7,27,56,0.18)] hover:scale-[1.01] transition-transform duration-300">

                    {/* Decorative */}
                    <div className="absolute -right-16 -bottom-16 w-44 h-44 rounded-full border border-white/5 pointer-events-none" />

                    <div className="absolute right-10 top-[-70px] w-32 h-32 rounded-full border border-[#ffc107]/10 pointer-events-none" />


                    <div className="relative z-10 flex items-center gap-5">

                      {/* QR */}
                      <div className="bg-white rounded-xl p-2.5 shrink-0 shadow-sm">

                        <img
                          src={infoSection?.qr_image || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(infoSection?.qr_data || 'https://servistamapro.co.id')}`}
                          alt="QR Code Contact SPI"
                          className="w-[92px] h-[92px] object-contain"
                        />

                      </div>


                      {/* QR CONTENT */}
                      <div>

                        <div className="flex items-center gap-3 mb-1.5">

                          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#ffc107]">
                            Scan To Connect
                          </span>

                          <span className="w-8 h-[1px] bg-white/20" />

                        </div>


                        <h4 className="text-base font-bold text-white">
                          {infoSection?.qr_title || "Simpan Kontak Kami"}
                        </h4>


                        <p className="text-[10px] text-slate-300 leading-relaxed mt-1 max-w-[250px] font-normal">
                          {infoSection?.qr_subtitle || "Scan QR Code untuk menyimpan kontak resmi SPI ke ponsel Anda dengan mudah."}
                        </p>


                        <div className="flex items-center gap-4 mt-3">

                          <span className="flex items-center gap-1.5 text-[9px] font-normal text-slate-300">

                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc107]" />

                            Cepat

                          </span>


                          <span className="flex items-center gap-1.5 text-[9px] font-normal text-slate-300">

                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc107]" />

                            Aman

                          </span>


                          <span className="flex items-center gap-1.5 text-[9px] font-normal text-slate-300">

                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffc107]" />

                            Resmi

                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </PopReveal>

              </div>

            </SoftReveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />

    </div>
  );
}