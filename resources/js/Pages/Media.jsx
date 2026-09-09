import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   INLINE SVG ICONS
========================================================= */
const IconCamera = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h7l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconWrench = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 4.6L4 16.2V20h3.8l5.3-5.3a4 4 0 0 0 4.6-5.4l-2.6 2.6-2.2-2.2 2.6-2.6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconExcavator = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 19h9M5 19v-4h4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 15 15 6l3 1.5-4.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 7.5 21 9l-2 3-2.5-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="19" r="1.3" fill="currentColor" />
  </svg>
);

const IconUsers = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="16.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14.5 14.3c2.6.2 4.5 2.2 4.5 4.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconGraduation = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M6.5 10.7v4c0 1.3 2.5 2.3 5.5 2.3s5.5-1 5.5-2.3v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 8.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconHandshake = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12.5 6 9l3.5 2.5L12 9l2 1.7L18 8l4 4.2-3.3 3.3-2-1.7-2.3 2.2-2.4-1.9-2.3 2.1L6 13.3l-4-.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const IconCalendar = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4 10h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconDrone = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9.8 9.8 5 5M14.2 9.8 19 5M9.8 14.2 5 19M14.2 14.2 19 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconPlay = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

const IconGrid = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconRefresh = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8M20 8V4M20 8h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12a8 8 0 0 1-13.7 5.7L4 16M4 16v4M4 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPhoto = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="9.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="m5 17 4.5-4.5 3 3L17 11l3 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CATEGORIES = [
  { id: 'Photo Gallery', label: 'Photo Gallery', number: '01.', icon: IconCamera },
  { id: 'Workshop', label: 'Workshop', number: '02.', icon: IconWrench },
  { id: 'Mining Site', label: 'Mining Site', number: '03.', icon: IconExcavator },
  { id: 'Customer Visit', label: 'Customer Visit', number: '04.', icon: IconUsers },
  { id: 'Training', label: 'Training', number: '05.', icon: IconGraduation },
  { id: 'CSR', label: 'CSR', number: '06.', icon: IconHandshake },
  { id: 'Company Event', label: 'Company Event', number: '07.', icon: IconCalendar },
  { id: 'Drone Video', label: 'Drone Video', number: '08.', icon: IconDrone },
];

const CategoryTab = ({ category, active, onClick }) => {
  const Icon = category.icon;
  return (
    <button
      onClick={() => onClick(category.id)}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg px-4 py-5 text-center transition-colors cursor-pointer ${
        active ? 'bg-[#F5B800] text-[#0B1E3D]' : 'bg-gray-100 text-[#0B1E3D] hover:bg-gray-200'
      }`}
    >
      <span className={`text-xs font-semibold ${active ? 'text-[#0B1E3D]/70' : 'text-gray-400'}`}>
        {category.number}
      </span>
      <Icon className="w-6 h-6" />
      <span className="text-xs font-semibold leading-tight">{category.label}</span>
    </button>
  );
};

const MediaCard = ({ item, onImageClick }) => {
  const getCleanUrl = (path) => {
    if (!path) return "https://picsum.photos/seed/fallback/600/400";
    if (path.startsWith('http')) return path;
    const cleaned = path.replace(/^storage\//, '').replace(/^\/+/, '');
    return `/${cleaned}`;
  };

  const mediaUrl = getCleanUrl(item.file_path);
  const isVideo = item.type === 'video' || mediaUrl.match(/\.(mp4|mov|mkv|webm)$/i);
  
  // Mengatur style gambar berdasarkan pilihan admin ('contain' untuk utuh, 'cover' untuk penuh)
  const imageDisplayClass = item.display_style === 'contain' ? 'object-contain bg-slate-950' : 'object-cover';

  return (
    <div className="relative overflow-hidden rounded-lg group h-72 sm:h-80 shadow-md bg-slate-900 flex items-center justify-center">
      {isVideo ? (
        <video
          src={mediaUrl}
          className="absolute inset-0 h-full w-full object-contain bg-black"
          controls
          controlsList="nodownload"
          playsInline
        />
      ) : (
        <>
          <img
            src={mediaUrl}
            alt={item.title || "Media gallery item"}
            onClick={() => onImageClick(mediaUrl, item.title || item.category)}
            className={`absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-105 cursor-pointer ${imageDisplayClass}`}
            title="Klik untuk memperbesar foto"
          />

          {/* Indikator Ikon Fullscreen saat Hover */}
          <div 
            onClick={() => onImageClick(mediaUrl, item.title || item.category)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/85 text-white p-2 rounded-xl backdrop-blur-xs z-20 cursor-pointer shadow-lg"
            title="Lihat Foto Full"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </div>

          <div 
            onClick={() => onImageClick(mediaUrl, item.title || item.category)}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 z-10 cursor-pointer"
          >
            <div>
              <p className="text-white text-sm font-bold">{item.title || item.category}</p>
              {item.description && <p className="text-white/80 text-xs mt-1 line-clamp-1">{item.description}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const StatItem = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3 px-4 py-6 sm:py-0">
    <Icon className="h-7 w-7 text-[#F5B800]" />
    <div className="text-left">
      <p className="text-2xl font-bold text-[#F5B800] leading-none">{value}</p>
      <p className="text-xs text-gray-300 mt-1">{label}</p>
    </div>
  </div>
);

export default function Media({ mediaItems = [], randomStoryImages = [], droneVideos = [], statistics = [], hero = null }) {
  const defaultCategory = mediaItems?.[0]?.category || 'Photo Gallery';
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // State untuk Modal Lightbox Foto Full
  const [modalImage, setModalImage] = useState(null);

  const filteredMedia = mediaItems ? mediaItems.filter(item => 
    item.category && item.category.trim().toLowerCase() === activeCategory.trim().toLowerCase()
  ) : [];
  
  const displayedMedia = filteredMedia.slice(0, visibleCount);

  const statIcons = [IconPhoto, IconVideo, IconPin, IconCalendar, IconUsers];
  const mappedStats = statistics ? statistics.map((stat, idx) => ({
    icon: statIcons[idx % statIcons.length],
    value: stat.value,
    label: stat.label,
  })) : [];

  const mainDroneVideo = droneVideos[0] || null;
  const sideDroneVideos = droneVideos.slice(1, 4);

  return (
    <>
      <Head title="Media Gallery" />
      <Navbar />

      <div className="bg-white">
        {/* ============ 1. HERO SECTION ============ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={hero?.background_image ? `/${hero.background_image}` : "https://picsum.photos/seed/hero-heavy-equipment/1600/900"}
              alt="Heavy equipment technician"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/85 to-[#0B1E3D]/20" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:pl-24">
            <p className="text-sm font-semibold tracking-wide text-[#F5B800]">{hero?.subtitle || 'MEDIA GALLERY'}</p>
            <p className="mt-3 text-base text-white/90">Visual Stories. Real Service. Real Performance.</p>

            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              {hero?.title || 'Behind Every Machine, There Is a Story of Performance.'}
            </h1>

            <span className="mt-6 block h-1 w-14 bg-[#F5B800]" />

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80">
              {hero?.description || 'Jelajahi dokumentasi aktivitas PT. Servistama Pro Indonesia dalam menghadirkan layanan heavy equipment, maintenance, customer support, training, dan smart service solution.'}
            </p>
          </div>
        </section>

        {/* ============ 2. CATEGORY TABS ============ */}
        <section className="relative z-10 -mt-8 sm:-mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-t-2xl bg-white p-6 shadow-xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {CATEGORIES.map((cat) => (
                  <CategoryTab
                    key={cat.id}
                    category={cat}
                    active={activeCategory.toLowerCase() === cat.id.toLowerCase()}
                    onClick={(id) => {
                      setActiveCategory(id);
                      setVisibleCount(6);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. FEATURED STORY ============ */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-center">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700">FEATURED STORY</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-[#0B1E3D] sm:text-3xl">
                  Maintenance Excellence at <span className="text-[#F5B800]">Mining Site</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Dokumentasi visual terpilih dari aktivitas operasional di lapangan secara acak.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {randomStoryImages.length > 0 ? (
                  <>
                    <div 
                      onClick={() => setModalImage({ url: `/${randomStoryImages[0].file_path}`, title: 'Featured Story 1' })}
                      className="relative col-span-1 row-span-2 overflow-hidden rounded-lg h-72 bg-slate-100 cursor-pointer group"
                    >
                      <img src={`/${randomStoryImages[0].file_path}`} alt="Story 1" className="h-full w-full object-cover group-hover:scale-105 transition" />
                    </div>
                    {randomStoryImages[1] && (
                      <div 
                        onClick={() => setModalImage({ url: `/${randomStoryImages[1].file_path}`, title: 'Featured Story 2' })}
                        className="overflow-hidden rounded-lg h-[138px] bg-slate-100 cursor-pointer group"
                      >
                        <img src={`/${randomStoryImages[1].file_path}`} alt="Story 2" className="h-full w-full object-cover group-hover:scale-105 transition" />
                      </div>
                    )}
                    {randomStoryImages[2] && (
                      <div 
                        onClick={() => setModalImage({ url: `/${randomStoryImages[2].file_path}`, title: 'Featured Story 3' })}
                        className="overflow-hidden rounded-lg h-[138px] bg-slate-100 cursor-pointer group"
                      >
                        <img src={`/${randomStoryImages[2].file_path}`} alt="Story 3" className="h-full w-full object-cover group-hover:scale-105 transition" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="col-span-2 py-12 text-center text-xs text-gray-400 border border-dashed rounded-lg bg-slate-50">
                    Belum ada foto media untuk Featured Story.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4. MEDIA FILTER BAR ============ */}
        <section className="border-t border-gray-100 bg-white py-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button className="flex items-center gap-2 rounded-md bg-[#0B1E3D] px-4 py-2 text-xs font-semibold text-white">
                <IconGrid />
                {activeCategory.toUpperCase()}
              </button>
              <span className="text-xs font-medium text-gray-500">
                Menampilkan {displayedMedia.length} dari {filteredMedia.length} item
              </span>
            </div>
          </div>
        </section>

        {/* ============ 5. MEDIA GRID ============ */}
        <section className="bg-white pb-12">
          <div className="mx-auto max-w-7xl px-6">
            {displayedMedia.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedMedia.map((item) => (
                  <MediaCard 
                    key={item.id} 
                    item={item} 
                    onImageClick={(url, title) => setModalImage({ url, title })} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200">
                Belum ada media yang diunggah untuk kategori <span className="font-bold text-[#0B1E3D]">"{activeCategory}"</span>.
              </div>
            )}

            {visibleCount < filteredMedia.length && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="flex items-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-[#0B1E3D] hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Load More Media
                  <IconRefresh />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ============ 6. STATS BAR ============ */}
        <section className="bg-[#0B1E3D] py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
              {mappedStats.map((stat, index) => (
                <StatItem key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7. DRONE VIDEO HIGHLIGHT ============ */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.8fr)] items-center">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700">DRONE VIDEO HIGHLIGHT</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-[#0B1E3D] sm:text-3xl">
                  See the <span className="text-[#F5B800]">Bigger Picture</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Dokumentasi udara dari berbagai project dan aktivitas kami di seluruh Indonesia.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
                {mainDroneVideo ? (
                  <div className="relative overflow-hidden rounded-lg h-72 bg-slate-900 shadow-md">
                    <img 
                      src={mainDroneVideo.thumbnail_path ? `/${mainDroneVideo.thumbnail_path}` : "https://picsum.photos/seed/drone-main/900/560"} 
                      alt={mainDroneVideo.title} 
                      className="h-full w-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
                        <IconPlay className="w-6 h-6 text-[#0B1E3D] ml-1" />
                      </span>
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-sm font-semibold">{mainDroneVideo.title}</p>
                        <p className="text-xs text-white/80">{mainDroneVideo.subtitle}</p>
                      </div>
                      <span className="text-xs font-medium">{mainDroneVideo.duration}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-72 bg-slate-50 border border-dashed rounded-lg flex items-center justify-center text-gray-400 text-xs text-center p-4">
                    Belum ada video utama drone.
                  </div>
                )}

                <div className="flex flex-col justify-center gap-4">
                  {sideDroneVideos.length > 0 ? (
                    sideDroneVideos.map((vid) => (
                      <div key={vid.id} className="flex items-center gap-3 group bg-slate-50 p-2.5 rounded-lg border border-slate-100 shadow-xs">
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-200">
                          <img 
                            src={vid.thumbnail_path ? `/${vid.thumbnail_path}` : "https://picsum.photos/seed/drone-side/160/120"} 
                            alt={vid.title} 
                            className="h-full w-full object-cover" 
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <IconPlay className="w-4 h-4 text-white" />
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#0B1E3D] group-hover:text-[#F5B800] transition-colors line-clamp-1">
                            {vid.title}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {vid.subtitle} &middot; {vid.duration}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400 italic p-4 text-center border border-dashed rounded-lg bg-slate-50">
                      Belum ada video drone tambahan.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============ MODAL LIGHTBOX UNTUK FOTO FULL ============ */}
      {modalImage && (
        <div 
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 w-10 h-10 flex items-center justify-center font-bold text-lg transition cursor-pointer"
            >
              &times;
            </button>
            <img 
              src={modalImage.url} 
              alt={modalImage.title} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
            />
            <p className="text-white text-sm font-semibold mt-4 text-center">{modalImage.title}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}