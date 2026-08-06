import React from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
      
      {/* 1. NAVBAR HEADER */}
      <Navbar />

      {/* ================= 2. HERO BANNER ================= */}
      <section className="relative w-full min-h-[90vh] bg-[#f8fafc] overflow-hidden pt-16 md:pt-20 border-b border-slate-200">
        <div className="w-full max-w-[1440px] mx-auto min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 relative">
          
          {/* SISI KIRI: TEXT CONTENT */}
          <div className="lg:col-span-6 px-6 md:px-12 py-12 lg:py-20 flex flex-col justify-center z-10 bg-white relative">
            
            {/* Tagline Atas */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[3px] bg-[#ffc107]"></span>
              <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                PT. SERVISTAMA PRO INDONESIA[cite: 1]
              </span>
            </div>

            {/* Judul Utama */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f2b5c] leading-[1.12] mb-6 tracking-tight">
              <span className="text-[#ffc107]">Bright Future</span> <br />
              untuk Anda
            </h1>

            {/* Deskripsi Singkat */}
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 max-w-md font-normal">
              Kami menyediakan alat berat berkualitas, suku cadang original, serta layanan purna jual terbaik untuk mendukung setiap kebutuhan dan keberhasilan proyek Anda.
            </p>

            {/* Tombol Utama */}
            <div className="mb-12">
              <a 
                href="#about" 
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#0f2b5c] hover:bg-slate-800 text-white font-bold text-xs md:text-sm rounded-lg transition shadow-md group"
              >
                <span>Tentang Kami</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* 3 Kartu Fitur Kecil di Kiri Bawah */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Produk Berkualitas</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">Suku cadang original & terjamin.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Tim Profesional</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">Tenaga ahli berpengalaman.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2b5c] text-[#ffc107] flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0f2b5c] mb-1">Layanan Prima</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">Respon cepat & solusi tepat.</p>
                </div>
              </div>
            </div>

          </div>

          {/* SISI KANAN: GAMBAR DENGAN CLIP PATH POLYGON */}
          <div className="lg:col-span-6 relative min-h-[440px] lg:min-h-full flex items-center justify-center">
            
            {/* Shape Navy */}
            <div 
              className="absolute inset-0 bg-[#0f2b5c] z-0 hidden lg:block"
              style={{
                clipPath: 'polygon(35% 0%, 100% 0%, 100% 100%, 0% 100%)'
              }}
            ></div>

            {/* Shape Kuning */}
            <div 
              className="absolute inset-0 bg-[#ffc107] z-10 hidden lg:block"
              style={{
                clipPath: 'polygon(38% 0%, 42% 0%, 7% 100%, 3% 100%)'
              }}
            ></div>

            {/* Area Gambar */}
            <div 
              className="absolute inset-0 z-20 overflow-hidden"
              style={{
                clipPath: window.innerWidth >= 1024 ? 'polygon(42% 0%, 100% 0%, 100% 100%, 7% 100%)' : 'none'
              }}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80')`
                }}
              ></div>
            </div>

            {/* FLOATING STATISTICS BAR */}
            <div className="absolute bottom-4 left-6 right-6 lg:left-auto lg:right-8 z-40 bg-white p-4 rounded-xl border border-slate-200 shadow-xl max-w-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                
                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-2.5">
                  <div className="text-[#0f2b5c]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-[#0f2b5c] leading-none">200+</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Karyawan Profesional</div>
                  </div>
                </div>

                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-2.5">
                  <div className="text-[#0f2b5c]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-[#0f2b5c] leading-none">24 <span className="text-xs font-normal">Jam</span></div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Respon Cepat</div>
                  </div>
                </div>

                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-2.5">
                  <div className="text-[#0f2b5c]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-[#0f2b5c] leading-none">100%</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Layanan Terpercaya</div>
                  </div>
                </div>

                <div className="pt-2 md:pt-0 md:px-2 flex items-center gap-2.5">
                  <div className="text-[#0f2b5c]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#0f2b5c] leading-none">Seluruh Indonesia</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">Jangkauan Layanan</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 3. COMPANY STRENGTH ================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Mengapa Memilih Kami</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f2b5c]">Kekuatan Utama PT. Servistama Pro Indonesia[cite: 1]</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#ffc107] transition shadow-sm">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2">Authorized XCMG Service Partner[cite: 1]</h4>
              <p className="text-slate-600 text-xs leading-relaxed">Dukungan resmi servis dan penanganan garansi produk alat berat merk XCMG di Indonesia[cite: 1].</p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#ffc107] transition shadow-sm">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2">Certified Engineers & Experienced Team[cite: 1]</h4>
              <p className="text-slate-600 text-xs leading-relaxed">Tim mekanik dan engineer tersertifikasi khusus dengan pengalaman di sektor pertambangan[cite: 1].</p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#ffc107] transition shadow-sm">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2">Nationwide Service Coverage[cite: 1]</h4>
              <p className="text-slate-600 text-xs leading-relaxed">Jangkauan purna jual ke seluruh wilayah Indonesia dengan dukungan teknis 24 jam[cite: 1].</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. FEATURED SERVICES ================= */}
      <section className="py-20 bg-white border-b border-slate-200" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Layanan Purna Jual[cite: 1]</h2>
              <h3 className="text-3xl font-extrabold text-[#0f2b5c]">Featured Services[cite: 1]</h3>
            </div>
            <a href="#services" className="text-[#0f2b5c] text-xs font-bold hover:text-amber-600 transition mt-4 md:mt-0">
              Lihat Seluruh Layanan →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 hover:border-[#ffc107] rounded-2xl transition group">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2 group-hover:text-amber-600 transition">Preventive Maintenance[cite: 1]</h4>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">Perawatan berkala terencana untuk menjamin keandalan unit dan meminimalkan kerugian downtime[cite: 1].</p>
              <span className="text-[11px] font-semibold text-[#0f2b5c]">Pelajari Lebih Lanjut →</span>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 hover:border-[#ffc107] rounded-2xl transition group">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2 group-hover:text-amber-600 transition">Breakdown Service[cite: 1]</h4>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">Tim tanggap darurat yang siap meluncur langsung ke lokasi pertambangan atau proyek Anda[cite: 1].</p>
              <span className="text-[11px] font-semibold text-[#0f2b5c]">Pelajari Lebih Lanjut →</span>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 hover:border-[#ffc107] rounded-2xl transition group">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2 group-hover:text-amber-600 transition">Overhaul & Rebuild[cite: 1]</h4>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">Rekondisi penuh komponen mesin, transmisi, dan sistem hidrolik dengan standar fasilitas workshop modern[cite: 1].</p>
              <span className="text-[11px] font-semibold text-[#0f2b5c]">Pelajari Lebih Lanjut →</span>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 hover:border-[#ffc107] rounded-2xl transition group">
              <h4 className="text-[#0f2b5c] font-bold text-base mb-2 group-hover:text-amber-600 transition">Oil Analysis & Testing[cite: 1]</h4>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">Analisis sampel oli laboratorium, uji hidrolik, serta pemindaian sistem elektrikal & mesin secara akurat[cite: 1].</p>
              <span className="text-[11px] font-semibold text-[#0f2b5c]">Pelajari Lebih Lanjut →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. MEDIA GALLERY ================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200" id="media">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Galeri Media Lapangan[cite: 1]</h2>
            <h3 className="text-3xl font-extrabold text-[#0f2b5c]">Workshop & Mining Site Gallery[cite: 1]</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white h-56 flex items-end p-5 shadow-sm">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-[#0f2b5c] uppercase bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">Mining Site[cite: 1]</span>
                <h4 className="text-[#0f2b5c] font-bold text-sm mt-2">Field Inspection Excavator XCMG</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white h-56 flex items-end p-5 shadow-sm">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-[#0f2b5c] uppercase bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">Modern Workshop[cite: 1]</span>
                <h4 className="text-[#0f2b5c] font-bold text-sm mt-2">Engine Overhaul Process</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-white h-56 flex items-end p-5 shadow-sm">
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-[#0f2b5c] uppercase bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">Customer Visit[cite: 1]</span>
                <h4 className="text-[#0f2b5c] font-bold text-sm mt-2">Commissioning Wheel Loader ZL50GN[cite: 1]</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. KNOWLEDGE CENTER ================= */}
      <section className="py-20 bg-white border-b border-slate-200" id="knowledge">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Knowledge Center[cite: 1]</h2>
              <h3 className="text-3xl font-extrabold text-[#0f2b5c]">Berita & Artikel Teknis Terbaru</h3>
            </div>
            <a href="#knowledge" className="text-[#0f2b5c] text-xs font-bold hover:text-amber-600 transition">
              Lihat Semua Artikel →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-[#ffc107] transition">
              <div className="p-6">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Maintenance Tips[cite: 1]</span>
                <h4 className="text-[#0f2b5c] font-bold text-base mt-2 mb-3 hover:text-amber-600 transition cursor-pointer">
                  Panduan Perawatan Sistem Hidrolik Alat Berat di Area Tambang
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Langkah-langkah pencegahan kontaminasi oli hidrolik untuk memperpanjang usia pakai pompa dan silinder[cite: 1].
                </p>
                <span className="text-slate-400 text-[11px]">6 Agustus 2026</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-[#ffc107] transition">
              <div className="p-6">
                <span className="text-[10px] font-bold text-sky-700 uppercase">Technical Bulletin[cite: 1]</span>
                <h4 className="text-[#0f2b5c] font-bold text-base mt-2 mb-3 hover:text-amber-600 transition cursor-pointer">
                  Pentingnya Analisa Laboratorium Oli Berkala pada Mesin XCMG
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Bagaimana mendeteksi keausan dini komponen mesin melalui pengujian partikel logam dalam oli[cite: 1].
                </p>
                <span className="text-slate-400 text-[11px]">1 Agustus 2026</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-[#ffc107] transition">
              <div className="p-6">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Heavy Equipment Knowledge[cite: 1]</span>
                <h4 className="text-[#0f2b5c] font-bold text-base mt-2 mb-3 hover:text-amber-600 transition cursor-pointer">
                  Manajemen Perawatan Armada Alat Berat untuk Efisiensi Biaya
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Strategi mengoptimalkan durasi operasional alat berat dan meminimalkan kerusakan tidak terduga.
                </p>
                <span className="text-slate-400 text-[11px]">25 Juli 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. CONTACT US ================= */}
      <section className="py-16 bg-[#0f2b5c] text-white" id="contact">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
            Butuh Layanan Perbaikan Darurat atau Pengadaan Spare Parts?
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
            Foresta Business Loft 7 Unit 6-7, Jl. BSD Boulevard Utara, Pagedangan, Kabupaten Tangerang, Banten 15331[cite: 1].
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://wa.me/6281100000000" 
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-md"
            >
              Hubungi WhatsApp Emergency
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3.5 bg-[#ffc107] hover:bg-amber-400 text-[#0f2b5c] font-bold text-xs rounded-xl transition shadow-md"
            >
              Kontak Kami
            </a>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <Footer />

    </div>
  );
}