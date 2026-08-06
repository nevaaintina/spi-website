import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
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
            <div 
              style={{ backgroundColor: '#0f2b5c', color: '#ffc107' }}
              className="w-8 h-8 rounded-md flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform"
            >
              S
            </div>
          </a>

          {/* MENU UTAMA - RINGKAS & BERJARAK PAS */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm text-[#0f2b5c]">
            
            {/* Home */}
            <a 
              href="/" 
              onClick={() => handleMenuClick('home')}
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                activeMenu === 'home' 
                  ? 'border-[#ffc107] text-[#0f2b5c]' 
                  : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Home
            </a>

            {/* About Us Dropdown (Termasuk Why Choose Us & Sustainability) */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('about')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'about' 
                    ? 'border-[#ffc107] text-[#0f2b5c]' 
                    : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>About Us</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'about' && (
                <div className="absolute top-full left-0 w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 mt-3 z-50">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-bold text-[#0f2b5c]">
                    <a href="/about" className="hover:text-[#ffc107] transition py-1">Company Profile</a>
                    <a href="/why-choose-us" className="hover:text-[#ffc107] text-amber-600 transition py-1">Why Choose Us</a>
                    <a href="/about#vision-mission" className="hover:text-[#ffc107] transition py-1">Vision & Mission</a>
                    <a href="/sustainability" className="hover:text-[#ffc107] text-emerald-600 transition py-1">Sustainability (ESG/HSE)</a>
                    <a href="/about#core-values" className="hover:text-[#ffc107] transition py-1">Core Values</a>
                    <a href="/about#milestones" className="hover:text-[#ffc107] transition py-1">Company Milestones</a>
                    <a href="/about#management-team" className="hover:text-[#ffc107] transition py-1">Management Team</a>
                    <a href="/about#governance" className="hover:text-[#ffc107] transition py-1">Corporate Governance</a>
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('products')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'products' 
                    ? 'border-[#ffc107] text-[#0f2b5c]' 
                    : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>Products</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'products' && (
                <div className="absolute top-full left-0 w-[360px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 mt-3 z-50">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-bold text-[#0f2b5c]">
                    <a href="/products?category=excavator" className="hover:text-[#ffc107] transition py-1">Excavator</a>
                    <a href="/products?category=wheel-loader" className="hover:text-[#ffc107] transition py-1">Wheel Loader</a>
                    <a href="/products?category=motor-grader" className="hover:text-[#ffc107] transition py-1">Motor Grader</a>
                    <a href="/products?category=crane" className="hover:text-[#ffc107] transition py-1">Crane</a>
                    <a href="/products?category=dump-truck" className="hover:text-[#ffc107] transition py-1">Dump Truck</a>
                    <a href="/products?category=mining" className="hover:text-[#ffc107] transition py-1">Mining Equipment</a>
                    <a href="/products?category=road" className="hover:text-[#ffc107] transition py-1">Road Equipment</a>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('services')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'services' 
                    ? 'border-[#ffc107] text-[#0f2b5c]' 
                    : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>Services</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'services' && (
                <div className="absolute top-full left-0 w-[380px] bg-white border border-slate-200 rounded-2xl shadow-xl p-6 mt-3 z-50">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-bold text-[#0f2b5c]">
                    <a href="/services#preventive-maint" className="hover:text-[#ffc107] transition py-1">Preventive Maintenance</a>
                    <a href="/services#corrective-maint" className="hover:text-[#ffc107] transition py-1">Corrective Maintenance</a>
                    <a href="/services#breakdown-service" className="hover:text-[#ffc107] transition py-1">Breakdown Service</a>
                    <a href="/services#overhaul-rebuild" className="hover:text-[#ffc107] transition py-1">Overhaul & Rebuild</a>
                    <a href="/services#oil-analysis" className="hover:text-[#ffc107] transition py-1">Oil & Diagnostic Test</a>
                    <a href="/services#annual-contract" className="hover:text-[#ffc107] transition py-1">Annual Maintenance Contract</a>
                  </div>
                </div>
              )}
            </div>

            {/* Spare Parts */}
            <a 
              href="/spare-parts" 
              onClick={() => handleMenuClick('parts')}
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                activeMenu === 'parts' 
                  ? 'border-[#ffc107] text-[#0f2b5c]' 
                  : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Spare Parts
            </a>

            {/* Knowledge */}
            <a 
              href="/knowledge" 
              onClick={() => handleMenuClick('knowledge')}
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                activeMenu === 'knowledge' 
                  ? 'border-[#ffc107] text-[#0f2b5c]' 
                  : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Knowledge
            </a>

            {/* Media */}
            <a 
              href="/media-gallery" 
              onClick={() => handleMenuClick('media')}
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                activeMenu === 'media' 
                  ? 'border-[#ffc107] text-[#0f2b5c]' 
                  : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Media
            </a>

            {/* Career */}
            <a 
              href="/career" 
              onClick={() => handleMenuClick('career')}
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                activeMenu === 'career' 
                  ? 'border-[#ffc107] text-[#0f2b5c]' 
                  : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Career
            </a>

            {/* Contact */}
            <a 
              href="/contact-us" 
              onClick={() => handleMenuClick('contact')}
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                activeMenu === 'contact' 
                  ? 'border-[#ffc107] text-[#0f2b5c]' 
                  : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* BAHASA & UTILITIES */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-extrabold text-[#0f2b5c] shrink-0">
            <span className="hover:text-[#ffc107] cursor-pointer transition">ID</span>
            <span className="text-slate-300 font-normal">|</span>
            <span style={{ color: '#ffc107' }} className="cursor-pointer">EN</span>
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
            <a href="/" style={{ color: '#ffc107' }} className="py-2 border-b border-slate-100">Home</a>
            <a href="/about" className="py-2 border-b border-slate-100">About Us</a>
            <a href="/why-choose-us" className="py-2 border-b border-slate-100">Why Choose Us</a>
            <a href="/products" className="py-2 border-b border-slate-100">Products & Equipment</a>
            <a href="/services" className="py-2 border-b border-slate-100">Services</a>
            <a href="/spare-parts" className="py-2 border-b border-slate-100">Spare Parts</a>
            <a href="/knowledge" className="py-2 border-b border-slate-100">Knowledge Center</a>
            <a href="/media-gallery" className="py-2 border-b border-slate-100">Media Gallery</a>
            <a href="/sustainability" className="py-2 border-b border-slate-100">Sustainability (ESG & HSE)</a>
            <a href="/career" className="py-2 border-b border-slate-100">Career</a>
            <a href="/contact-us" className="py-2">Contact Us</a>
          </div>
        </div>
      )}

    </header>
  );
}