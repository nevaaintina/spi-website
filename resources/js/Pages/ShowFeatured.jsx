import React, { useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function ShowFeatured({ service }) {
  // Helper untuk membersihkan path gambar
  const getCleanImageUrl = (path, fallback = "/images/c1.jpg") => {
    if (!path) return fallback;
    if (path.startsWith('http')) return path;
    const cleaned = path.replace(/^storage\//, '').replace(/^storage\//, '');
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  };

  // Fungsi untuk kembali ke home dan langsung scroll ke section featured services
  const handleBackToFeatured = (e) => {
    e.preventDefault();
    router.visit('/', {
      onFinish: () => {
        const section = document.getElementById('featured-services');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  };

  // Jika data service tidak ditemukan
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-700 mb-4">Layanan tidak ditemukan.</h1>
        <button onClick={handleBackToFeatured} className="text-sm font-bold text-[#0F2B5C] hover:underline cursor-pointer">
          ← Kembali ke Layanan Unggulan
        </button>
      </div>
    );
  }

  // Parsing foto galeri jika disimpan dalam bentuk JSON array di database
  let galleryPhotos = [];
  try {
    galleryPhotos = typeof service.photos === 'string' ? JSON.parse(service.photos) : (service.photos || []);
  } catch (e) {
    galleryPhotos = [];
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Head title={`${service.title} - PT Servistama Pro Indonesia`} />
      <Navbar />

      <main className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Tombol Kembali ke Layanan Unggulan di Beranda */}
          <button
            onClick={handleBackToFeatured}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0F2B5C] mb-8 transition cursor-pointer bg-transparent border-none p-0"
          >
            <span>←</span> Kembali ke Layanan Unggulan
          </button>

          {/* Header Informasi */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFC107] bg-amber-50 px-3 py-1 rounded-md">
              Layanan Unggulan
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#0F2B5C] mt-4 mb-6">
              {service.title}
            </h1>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6">
              {service.description}
            </p>
            {service.content && (
              <div 
                className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-6 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />
            )}
          </div>

          {/* Galeri Beberapa Foto */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#0F2B5C]">Galeri & Dokumentasi Kegiatan</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tampilkan foto utama card terlebih dahulu (menggunakan image_path) */}
              {service.image_path && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm h-64">
                  <img
                    src={getCleanImageUrl(service.image_path)}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              {/* Tampilkan foto-foto tambahan dari galeri */}
              {galleryPhotos.length > 0 ? (
                galleryPhotos.map((photo, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm h-64">
                    <img
                      src={getCleanImageUrl(photo)}
                      alt={`Dokumentasi ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                ))
              ) : !service.image_path && (
                <p className="text-xs text-slate-400 italic">Belum ada foto galeri dokumentasi.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}