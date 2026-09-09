import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Hse() {
    const hseCommitments = [
        {
            title: "Zero Accident Culture",
            desc: "Menerapkan standar prosedur keselamatan kerja yang ketat di seluruh lini operasional bengkel, lapangan, maupun proyek klien untuk mencapai nihil kecelakaan kerja."
        },
        {
            title: "Environmental Protection",
            desc: "Pengelolaan limbah B3 (bahan berbahaya dan beracun) secara profesional, pencegahan tumpahan oli/pelumas, serta penghematan sumber daya alam di area kerja."
        },
        {
            title: "Health & Safety Training",
            desc: "Pelatihan K3 secara berkala bagi teknisi dan seluruh staf guna memastikan kesiapsiagaan menghadapi potensi risiko kerja di sektor alat berat."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
            <Head title="Health, Safety & Environment (HSE) - PT Servistama Pro Indonesia" />
            <Navbar />

            {/* HERO BANNER */}
            <section className="relative bg-[#0f2b5c] text-white pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('/images/internship.png')" }} />
                <div className="relative max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[3px] bg-[#ffc107]" />
                        <span className="text-xs font-black tracking-widest text-[#ffc107] uppercase">SAFETY FIRST POLICY</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight max-w-3xl">
                        Health, Safety & Environment <span className="text-[#ffc107]">(HSE)</span>
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl font-light leading-relaxed">
                        Prioritas utama kami adalah keselamatan setiap pekerja, perlindungan lingkungan kerja, serta standar kesehatan operasional bertaraf internasional.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-20 max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                    <div className="lg:col-span-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
                            <img src="/images/internship.png" alt="HSE PT Servistama Pro Indonesia" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="lg:col-span-6 space-y-6">
                        <h2 className="text-3xl font-black text-[#0f2b5c]">Standar Keselamatan Tanpa Kompromi</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Operasional pemeliharaan alat berat, perbaikan komponen mesin, dan rekayasa teknik di PT Servistama Pro Indonesia selalu berpedoman pada regulasi Kesehatan dan Keselamatan Kerja (K3) yang ketat.
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Setiap personil dibekali Alat Pelindung Diri (APD) lengkap dan diwajibkan mematuhi prosedur mitigasi risiko sebelum memulai tugas pemeliharaan di lokasi pertambangan maupun proyek konstruksi.
                        </p>
                    </div>
                </div>

                {/* HSE COMMITMENTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {hseCommitments.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <span className="w-12 h-12 rounded-2xl bg-[#fff4ce] text-[#0f2b5c] flex items-center justify-center font-black text-lg mb-6">
                                    ✓
                                </span>
                                <h3 className="text-lg font-black text-[#0f2b5c] mb-3">{item.title}</h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}