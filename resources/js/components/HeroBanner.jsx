import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-navy-950 flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl text-center">
        <span className="inline-block px-4 py-1.5 bg-xcmg/10 text-xcmg border border-xcmg/30 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Authorized Dealer Service & Warranty - XCMG
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
          Smart Service. <br />
          <span className="text-xcmg">Maximum Uptime.</span> <br />
          Trusted Performance.
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          Digital Service Platform PT Servistama Pro Indonesia. Mengintegrasikan layanan purna jual, warranty management, dan digital maintenance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-xcmg hover:bg-xcmg-hover text-navy-900 font-bold rounded-lg transition-all">
            ⚡ Request Service Online
          </button>
          <button className="px-6 py-3 bg-navy-800 hover:bg-slate-800 text-white font-semibold rounded-lg border border-slate-700 transition-all">
            Explore Products
          </button>
        </div>
      </div>
    </section>
  );
}