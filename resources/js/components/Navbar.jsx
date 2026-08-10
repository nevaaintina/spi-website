import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300">
      
      {/* NAVBAR CONTAINER */}
      <div 
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md border-slate-200/60 shadow-sm py-2.5' 
            : 'bg-white border-slate-100 shadow-sm py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          
          {/* LOGO SISI KIRI */}
          <a href="/" className="flex items-center group shrink-0 lg:mr-6">
            <div className="h-9 md:h-10 flex items-center">
              <img 
                src="/images/logo-spi.png" 
                alt="Logo PT. Servistama Pro Indonesia" 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          {/* MENU UTAMA - RINGKAS & BERJARAK PAS */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm text-[#0f2b5c]">
            
            {/* Home */}
            <a 
              href="/" 
              className="px-2.5 py-1.5 transition-all duration-200 border-b-2 border-transparent hover:text-[#ffc107]"
            >
              Home
            </a>

            {/* About Us Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('about')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'about' ? 'border-[#ffc107] text-[#0f2b5c]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>About Us</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'about' && (
                <div className="absolute top-full left-0 w-[300px] bg-white border border-slate-200 rounded-2xl shadow-xl p-5 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold text-[#0f2b5c]">
                    <a href="/about" className="hover:text-[#ffc107] transition py-1">Company Profile (Index)</a>
                    <a href="/about/vision-mission" className="hover:text-[#ffc107] transition py-1">Vision & Mission</a>
                    <a href="/about/management" className="hover:text-[#ffc107] transition py-1">Management Team</a>
                    <a href="/why-choose-us" className="hover:text-[#ffc107] text-amber-600 transition py-1">Why Choose Us</a>
                    <a href="/sustainability" className="hover:text-[#ffc107] text-emerald-600 transition py-1">Sustainability (ESG/HSE)</a>
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('products')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'products' ? 'border-[#ffc107] text-[#0f2b5c]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>Products</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'products' && (
                <div className="absolute top-full left-0 w-[240px] bg-white border border-slate-200 rounded-2xl shadow-xl p-5 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold text-[#0f2b5c]">
                    <a href="/products" className="hover:text-[#ffc107] transition py-1">All Products</a>
                    <a href="/products/excavator" className="hover:text-[#ffc107] transition py-1">Excavator</a>
                    <a href="/products/crane" className="hover:text-[#ffc107] transition py-1">Crane</a>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('services')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'services' ? 'border-[#ffc107] text-[#0f2b5c]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>Services</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'services' && (
                <div className="absolute top-full left-0 w-[240px] bg-white border border-slate-200 rounded-2xl shadow-xl p-5 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold text-[#0f2b5c]">
                    <a href="/services" className="hover:text-[#ffc107] transition py-1">All Services</a>
                    <a href="/services/maintenance" className="hover:text-[#ffc107] transition py-1">Maintenance Support</a>
                  </div>
                </div>
              )}
            </div>

            {/* Spare Parts */}
            <a href="/spare-parts" className="px-2.5 py-1.5 transition-all duration-200 border-b-2 border-transparent hover:text-[#ffc107]">
              Spare Parts
            </a>

            {/* Knowledge */}
            <a href="/knowledge" className="px-2.5 py-1.5 transition-all duration-200 border-b-2 border-transparent hover:text-[#ffc107]">
              Knowledge
            </a>

            {/* Media */}
            <a href="/media-gallery" className="px-2.5 py-1.5 transition-all duration-200 border-b-2 border-transparent hover:text-[#ffc107]">
              Media
            </a>

            {/* Career */}
            <a href="/career" className="px-2.5 py-1.5 transition-all duration-200 border-b-2 border-transparent hover:text-[#ffc107]">
              Career
            </a>

            {/* Contact */}
            <a href="/contact-us" className="px-2.5 py-1.5 transition-all duration-200 border-b-2 border-transparent hover:text-[#ffc107]">
              Contact
            </a>
          </nav>

          {/* BENDERA / PEMILIH BAHASA (MENGGUNAKAN GAMBAR BENDERA SVG) */}
          <div className="hidden lg:flex items-center space-x-2.5 text-sm shrink-0">
            <button className="flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer" title="Bahasa Indonesia">
              <img src="https://flagcdn.com/id.svg" alt="Indonesia" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              <span className="text-xs font-bold text-[#0f2b5c]">ID</span>
            </button>
            <span className="text-slate-300 font-normal">|</span>
            <button className="flex items-center gap-1.5 hover:opacity-80 transition cursor-pointer opacity-60 hover:opacity-100" title="English">
              <img src="https://flagcdn.com/gb.svg" alt="English" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              <span className="text-xs font-bold text-slate-500">EN</span>
            </button>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-2xl font-black text-[#0f2b5c] focus:outline-none"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white text-[#0f2b5c] border-b border-slate-200 shadow-xl p-6 font-bold text-sm max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <a href="/" className="py-2 border-b border-slate-100">Home</a>
            <a href="/about" className="py-2 border-b border-slate-100">About Us (Profile)</a>
            <a href="/about/vision-mission" className="py-2 border-b border-slate-100 pl-4 text-xs">└ Vision & Mission</a>
            <a href="/about/management" className="py-2 border-b border-slate-100 pl-4 text-xs">└ Management</a>
            <a href="/why-choose-us" className="py-2 border-b border-slate-100">Why Choose Us</a>
            <a href="/products" className="py-2 border-b border-slate-100">Products & Equipment</a>
            <a href="/services" className="py-2 border-b border-slate-100">Services</a>
            <a href="/spare-parts" className="py-2 border-b border-slate-100">Spare Parts</a>
            <a href="/knowledge" className="py-2 border-b border-slate-100">Knowledge Center</a>
            <a href="/media-gallery" className="py-2 border-b border-slate-100">Media Gallery</a>
            <a href="/sustainability" className="py-2 border-b border-slate-100">Sustainability (ESG & HSE)</a>
            <a href="/career" className="py-2 border-b border-slate-100">Career</a>
            <a href="/contact-us" className="py-2">Contact Us</a>

            {/* Pilihan Bahasa Versi Mobile */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
              <span className="text-xs text-slate-400">Bahasa:</span>
              <button className="flex items-center gap-1 text-xs font-bold text-[#0f2b5c]">
                <img src="https://flagcdn.com/id.svg" alt="ID" className="w-4 h-3 object-cover rounded-xs" /> ID
              </button>
              <button className="flex items-center gap-1 text-xs font-bold text-slate-400">
                <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-4 h-3 object-cover rounded-xs" /> EN
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}