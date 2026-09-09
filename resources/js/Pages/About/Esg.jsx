import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Esg() {
    const pillars = [
        {
            title: "Environmental Stewardship",
            desc: "Berkomitmen meminimalkan dampak lingkungan dari operasional alat berat, mengoptimalkan efisiensi energi, dan mendukung prinsip pembangunan berkelanjutan di sektor konstruksi serta pertambangan."
        },
        {
            title: "Social Responsibility",
            desc: "Memberikan kontribusi positif kepada masyarakat sekitar melalui pemberdayaan lokal, penciptaan lingkungan kerja yang inklusif, serta standar kesejahteraan karyawan yang tinggi."
        },
        {
            title: "Good Governance",
            desc: "Menjunjung tinggi transparansi, integritas, kepatuhan hukum, dan etika bisnis yang ketat dalam setiap aspek operasional perusahaan."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
            <Head title="Environment, Social & Governance (ESG) - PT Servistama Pro Indonesia" />
            <Navbar />

            {/* HERO BANNER */}
            <section className="relative bg-[#0f2b5c] text-white pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('/images/internship.png')" }} />
                <div className="relative max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[3px] bg-[#ffc107]" />
                        <span className="text-xs font-black tracking-widest text-[#ffc107] uppercase">SUSTAINABILITY COMMITMENT</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight max-w-3xl">
                        Environment, Social & Governance <span className="text-[#ffc107]">(ESG)</span>
                    </h1>
                    <p className="mt-4 text-sm md:text-base text-slate-300 max-w-2xl font-light leading-relaxed">
                        Membangun pertumbuhan bisnis jangka panjang yang bertanggung jawab terhadap kelestarian lingkungan, kesejahteraan sosial, dan tata kelola perusahaan yang transparan.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-20 max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                    <div className="lg:col-span-6 space-y-6">
                        <h2 className="text-3xl font-black text-[#0f2b5c]">Komitmen Keberlanjutan Kami</h2>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Di PT Servistama Pro Indonesia, kami percaya bahwa kesuksesan bisnis sejalan dengan tanggung jawab kami terhadap bumi dan komunitas. Penerapan kerangka kerja ESG menjadi fondasi utama dalam mendistribusikan alat berat berkualitas tinggi sekaligus menjaga masa depan industri yang hijau.
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Kami terus berinovasi untuk memastikan setiap rantai pasok, mulai dari suku cadang hingga layanan pemeliharaan unit XCMG, memenuhi standar operasional yang ramah lingkungan dan beretika tinggi.
                        </p>
                    </div>
                    <div className="lg:col-span-6">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
                            <img src="/images/internship.png" alt="ESG PT Servistama Pro Indonesia" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* 3 PILLARS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                            <div>
                                <span className="w-12 h-12 rounded-2xl bg-[#fff4ce] text-[#0f2b5c] flex items-center justify-center font-black text-lg mb-6">
                                    0{idx + 1}
                                </span>
                                <h3 className="text-lg font-black text-[#0f2b5c] mb-3">{pillar.title}</h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}