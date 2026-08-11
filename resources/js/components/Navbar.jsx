import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('nav') && !event.target.closest('button')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const isActive = (path) => currentPath === path;
  const isParentActive = (paths) => paths.some((p) => currentPath.startsWith(p));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full font-sans transition-all duration-300">
      
      {/* NAVBAR CONTAINER */}
      <div 
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-white/60 backdrop-blur-md border-slate-200/30 shadow-xs py-2.5' 
            : 'bg-white/85 backdrop-blur-sm border-slate-100 shadow-sm py-3.5'
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

          {/* MENU UTAMA */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm text-[#0f2b5c]">
            
            {/* Home */}
            <a 
              href="/" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isActive('/') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Home
            </a>

            {/* About Us Dropdown (Semi-transparan) */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('about')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'about' || isParentActive(['/about', '/why-choose-us', '/sustainability']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>About Us</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'about' && (
                <div className="absolute top-full left-0 w-[300px] bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-5 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold text-[#0f2b5c]">
                    <a href="/about" className="hover:text-[#ffc107] transition py-1">Company Profile</a>
                    <a href="/about/vision-mission" className="hover:text-[#ffc107] transition py-1">Vision & Mission</a>
                    <a href="/about/management" className="hover:text-[#ffc107] transition py-1">Management Team</a>
                    <a href="/why-choose-us" className="hover:text-[#ffc107] text-amber-600 transition py-1">Why Choose Us</a>
                    <a href="/sustainability" className="hover:text-[#ffc107] text-emerald-600 transition py-1">Sustainability (ESG/HSE)</a>
                  </div>
                </div>
              )}
            </div>

            {/* Products Dropdown (Diperbarui dengan daftar produk baru & Semi-transparan) */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('products')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'products' || isParentActive(['/products']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>Products</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'products' && (
                <div className="absolute top-full left-0 w-[240px] bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-5 mt-3 z-50">
                  <div className="flex flex-col space-y-2 text-xs font-bold text-[#0f2b5c]">
                    <a href="/products" className="hover:text-[#ffc107] transition pb-1 border-b border-slate-100 font-black">All Products</a>
                    <a href="/products/excavator" className="hover:text-[#ffc107] transition py-1">Excavator</a>
                    <a href="/products/wheel-loader" className="hover:text-[#ffc107] transition py-1">Wheel Loader</a>
                    <a href="/products/motor-grader" className="hover:text-[#ffc107] transition py-1">Motor Grader</a>
                    <a href="/products/crane" className="hover:text-[#ffc107] transition py-1">Crane</a>
                    <a href="/products/dump-truck" className="hover:text-[#ffc107] transition py-1">Dump Truck</a>
                    <a href="/products/mining-equipment" className="hover:text-[#ffc107] transition py-1">Mining Equipment</a>
                    <a href="/products/road" className="hover:text-[#ffc107] transition py-1">Road</a>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown (Hanya menampilkan Sub-bab utama & Semi-transparan) */}
            <div className="relative">
              <button 
                onClick={() => handleMenuClick('services')} 
                className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 flex items-center gap-1 focus:outline-none hover:text-[#ffc107] ${
                  activeMenu === 'services' || isParentActive(['/services']) ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
                }`}
              >
                <span>Services</span>
                <span className="text-[10px]">▼</span>
              </button>

              {activeMenu === 'services' && (
                <div className="absolute top-full left-0 w-[350px] bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl p-5 mt-3 z-50 max-h-[75vh] overflow-y-auto">
                  <div className="flex flex-col space-y-2.5 text-xs text-[#0f2b5c] font-bold">
                    <a href="/services" className="hover:text-[#ffc107] transition pb-2 border-b border-slate-100 font-black">All Services Overview</a>
                    
                    <a href="/services/maintenance-repair" className="hover:text-[#ffc107] transition py-1.5 px-2 rounded-lg hover:bg-slate-100/60">
                      Maintenance & Repair (Perawatan & Perbaikan)
                    </a>
                    
                    <a href="/services/installation-commissioning" className="hover:text-[#ffc107] transition py-1.5 px-2 rounded-lg hover:bg-slate-100/60">
                      Installation & Commissioning (Pemasangan & Pengujian)
                    </a>

                    <a href="/services/overhaul-rebuild" className="hover:text-[#ffc107] transition py-1.5 px-2 rounded-lg hover:bg-slate-100/60">
                      Overhaul & Rebuild (Restorasi Total)
                    </a>

                    <a href="/services/inspection-testing" className="hover:text-[#ffc107] transition py-1.5 px-2 rounded-lg hover:bg-slate-100/60">
                      Inspection & Testing (Inspeksi & Pengujian Teknis)
                    </a>

                    <a href="/services/contract-consulting" className="hover:text-[#ffc107] transition py-1.5 px-2 rounded-lg hover:bg-slate-100/60">
                      Contract & Consulting (Kontrak & Konsultasi)
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Spare Parts */}
            <a 
              href="/spare-parts" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isActive('/spare-parts') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Spare Parts
            </a>

            {/* Knowledge */}
            <a 
              href="/knowledge" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isActive('/knowledge') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Knowledge
            </a>

            {/* Media */}
            <a 
              href="/media-gallery" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isActive('/media-gallery') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Media
            </a>

            {/* Career */}
            <a 
              href="/career" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isActive('/career') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Career
            </a>

            {/* Contact */}
            <a 
              href="/contact-us" 
              className={`px-2.5 py-1.5 transition-all duration-200 border-b-2 hover:text-[#ffc107] ${
                isActive('/contact-us') ? 'border-[#ffc107] text-[#ffc107]' : 'border-transparent text-[#0f2b5c]'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* BENDERA / PEMILIH BAHASA */}
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
        <div className="lg:hidden bg-white/95 backdrop-blur-md text-[#0f2b5c] border-b border-slate-200 shadow-xl p-6 font-bold text-sm max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            <a href="/" className="py-2 border-b border-slate-100">Home</a>
            <a href="/about" className="py-2 border-b border-slate-100">About Us (Profile)</a>
            <a href="/about/vision-mission" className="py-2 border-b border-slate-100 pl-4 text-xs">└ Vision & Mission</a>
            <a href="/about/management" className="py-2 border-b border-slate-100 pl-4 text-xs">└ Management</a>
            <a href="/why-choose-us" className="py-2 border-b border-slate-100">Why Choose Us</a>
            
            {/* Mobile Products Sub-bab */}
            <div className="py-2 border-b border-slate-100 flex flex-col space-y-1">
              <span>Products</span>
              <a href="/products/excavator" className="pl-4 text-xs font-normal py-1">• Excavator</a>
              <a href="/products/wheel-loader" className="pl-4 text-xs font-normal py-1">• Wheel Loader</a>
              <a href="/products/motor-grader" className="pl-4 text-xs font-normal py-1">• Motor Grader</a>
              <a href="/products/crane" className="pl-4 text-xs font-normal py-1">• Crane</a>
              <a href="/products/dump-truck" className="pl-4 text-xs font-normal py-1">• Dump Truck</a>
              <a href="/products/mining-equipment" className="pl-4 text-xs font-normal py-1">• Mining Equipment</a>
              <a href="/products/road" className="pl-4 text-xs font-normal py-1">• Road</a>
            </div>

            {/* Mobile Services Sub-bab */}
            <div className="py-2 border-b border-slate-100 flex flex-col space-y-1">
              <span>Services</span>
              <a href="/services/maintenance-repair" className="pl-4 text-xs font-normal py-1">• Maintenance & Repair</a>
              <a href="/services/installation-commissioning" className="pl-4 text-xs font-normal py-1">• Installation & Commissioning</a>
              <a href="/services/overhaul-rebuild" className="pl-4 text-xs font-normal py-1">• Overhaul & Rebuild</a>
              <a href="/services/inspection-testing" className="pl-4 text-xs font-normal py-1">• Inspection & Testing</a>
              <a href="/services/contract-consulting" className="pl-4 text-xs font-normal py-1">• Contract & Consulting</a>
            </div>

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