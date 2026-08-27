import React from 'react';
import { router } from '@inertiajs/react';

export default function AdminLayout({ children, currentPage }) {
  
  // Daftar Menu Sidebar Profesional dengan SVG Icon
  const menuPages = [
    { id: 'homepage', label: 'Homepage', path: '/admin', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    )},
    { id: 'about', label: 'About Us', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
    )},
    { id: 'products', label: 'Products & Equipment', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
    )},
    { id: 'services', label: 'Services', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
    )},
    { id: 'spare-parts', label: 'Spare Parts', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
    )},
    { id: 'knowledge', label: 'Knowledge Center', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
    )},
    { id: 'media', label: 'Media Gallery', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    )},
    { id: 'career', label: 'Career', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.25A8.38 8.38 0 0119 16.5m-2-3.5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
    )},
    { id: 'contact', label: 'Contact Us', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-800">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f2b5c] text-white flex flex-col justify-between hidden md:flex shrink-0 shadow-2xl">
        <div>
          <div className="p-6 border-b border-white/10">
            <h2 className="text-sm font-black tracking-widest text-white uppercase">SPI Admin Panel</h2>
            <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide">Enterprise Content Management</p>
          </div>

          <nav className="p-4 space-y-1 text-xs font-semibold overflow-y-auto max-h-[calc(100vh-160px)]">
            <p className="px-3 text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mb-2 pt-1">Navigasi Halaman</p>
            
            {menuPages.map((menu) => (
              <button
                key={menu.id}
                onClick={() => router.visit(menu.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${currentPage === menu.id ? 'bg-[#ffc107] text-[#0f2b5c] font-black shadow-lg' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={`${currentPage === menu.id ? 'text-[#0f2b5c]' : 'text-slate-400'}`}>{menu.icon}</span>
                <span>{menu.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0b2246]">
          <a 
            href="/" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <span>Lihat Website Utama</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 p-4 md:hidden flex justify-between items-center shadow-sm">
          <h1 className="font-black text-sm text-[#0f2b5c]">SPI Admin Panel</h1>
          <a href="/" target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600">Lihat Web</a>
        </header>

        <div className="p-6 md:p-10 max-w-5xl w-full mx-auto space-y-6">
          {children}
        </div>
      </main>

    </div>
  );
}