import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   DESIGN TOKENS
   navy  : #0B1E3D  (primary dark)
   navy-2: #0F2A52  (secondary dark / cards)
   yellow: #F5B800  (accent)
========================================================= */

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

const IconArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const IconChevronDown = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const IconVideo = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="m16.5 10 4.5-2.5v9L16.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const IconPin = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21s7-6.6 7-11.5a7 7 0 1 0-14 0C5 14.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* =========================================================
   STATIC DATA
========================================================= */
const CATEGORIES = [
  { id: 'photo', label: 'Photo Gallery', number: '01.', icon: IconCamera },
  { id: 'workshop', label: 'Workshop', number: '02.', icon: IconWrench },
  { id: 'mining', label: 'Mining Site', number: '03.', icon: IconExcavator },
  { id: 'customer', label: 'Customer Visit', number: '04.', icon: IconUsers },
  { id: 'training', label: 'Training', number: '05.', icon: IconGraduation },
  { id: 'csr', label: 'CSR', number: '06.', icon: IconHandshake },
  { id: 'event', label: 'Company Event', number: '07.', icon: IconCalendar },
  { id: 'drone', label: 'Drone Video', number: '08.', icon: IconDrone },
];

const FILTERS = ['Category', 'Location', 'Equipment', 'Year'];

const MEDIA_ITEMS = [
  { id: 1, image: 'https://picsum.photos/seed/mining-truck/600/700', span: 'row-span-2', isVideo: true },
  { id: 2, image: 'https://picsum.photos/seed/team-review/600/500', span: '' },
  { id: 3, image: 'https://picsum.photos/seed/excavator-sunset/600/700', span: 'row-span-2' },
  { id: 4, image: 'https://picsum.photos/seed/office-team/600/450', span: '' },
  { id: 5, image: 'https://picsum.photos/seed/meeting-room/600/450', span: '' },
  { id: 6, image: 'https://picsum.photos/seed/tree-planting/600/450', span: '' },
];

const STATS = [
  { icon: IconPhoto, value: '1,250+', label: 'Photos' },
  { icon: IconVideo, value: '220+', label: 'Videos' },
  { icon: IconPin, value: '85+', label: 'Project Locations' },
  { icon: IconCalendar, value: '450+', label: 'Activities' },
  { icon: IconUsers, value: '120+', label: 'Events & Trainings' },
];

const DRONE_VIDEOS = [
  { id: 1, title: 'Workshop Activity', subtitle: 'Balikpapan Workshop', duration: '02:18', image: 'https://picsum.photos/seed/drone-1/160/120' },
  { id: 2, title: 'Site Progress', subtitle: 'Sulawesi Project', duration: '01:56', image: 'https://picsum.photos/seed/drone-2/160/120' },
  { id: 3, title: 'Equipment Delivery', subtitle: 'Customer Site', duration: '02:30', image: 'https://picsum.photos/seed/drone-3/160/120' },
];

/* =========================================================
   SUB-COMPONENTS
========================================================= */
const CategoryTab = ({ category, active, onClick }) => {
  const Icon = category.icon;
  return (
    <button
      onClick={() => onClick(category.id)}
      className={`flex flex-col items-center justify-center gap-2 rounded-lg px-4 py-5 text-center transition-colors ${
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

const MediaCard = ({ item }) => (
  <div className={`relative overflow-hidden rounded-lg group cursor-pointer ${item.span}`}>
    <img
      src={item.image}
      alt="Media gallery item"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    {item.isVideo && (
      <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0B1E3D]">
        <IconPlay className="w-4 h-4 ml-0.5" />
      </span>
    )}
  </div>
);

const StatItem = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3 px-4 py-6 sm:py-0">
    <Icon className="h-7 w-7 text-[#F5B800]" />
    <div className="text-left">
      <p className="text-2xl font-bold text-[#F5B800] leading-none">{value}</p>
      <p className="text-xs text-gray-300 mt-1">{label}</p>
    </div>
  </div>
);

const VideoThumbnail = ({ video }) => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md">
      <img src={video.image} alt={video.title} className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
        <IconPlay className="w-4 h-4 text-white" />
      </span>
    </div>
    <div>
      <p className="text-sm font-semibold text-[#0B1E3D] group-hover:text-[#F5B800] transition-colors">
        {video.title}
      </p>
      <p className="text-xs text-gray-500">
        {video.subtitle} &middot; {video.duration}
      </p>
    </div>
  </div>
);

const FilterDropdown = ({ label }) => (
  <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#0B1E3D]">
    {label}
    <IconChevronDown className="w-4 h-4" />
  </button>
);

/* =========================================================
   MAIN PAGE COMPONENT
========================================================= */
export default function Media() {
  const [activeCategory, setActiveCategory] = useState('photo');

  return (
    <>
      <Head title="Media Gallery" />

      <Navbar />

      <div className="bg-white">
        {/* ============ 1. HERO SECTION ============ */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://picsum.photos/seed/hero-heavy-equipment/1600/900"
              alt="Heavy equipment technician"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/85 to-[#0B1E3D]/20" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:pl-24">
            {/* vertical slide indicator */}
            <div className="absolute left-2 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
              <span className="h-2 w-2 rounded-full border border-white/60" />
              <span className="h-2 w-2 rounded-full border border-white/60" />
              <span className="h-2 w-2 rounded-full border border-white/60" />
              <span className="h-6 w-px bg-white/50" />
            </div>

            <p className="text-sm font-semibold tracking-wide text-[#F5B800]">MEDIA GALLERY</p>
            <p className="mt-3 text-base text-white/90">Visual Stories. Real Service. Real Performance.</p>

            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
              Behind Every Machine, There Is a Story of{' '}
              <span className="text-[#F5B800]">Performance.</span>
            </h1>

            <span className="mt-6 block h-1 w-14 bg-[#F5B800]" />

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80">
              Jelajahi dokumentasi aktivitas PT. Servistama Pro Indonesia dalam menghadirkan layanan
              heavy equipment, maintenance, customer support, training, dan smart service solution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-md bg-[#F5B800] px-6 py-3 text-sm font-semibold text-[#0B1E3D] hover:bg-[#e0a700] transition-colors">
                Explore Gallery
                <IconArrowRight />
              </button>
              <button className="flex items-center gap-2 rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                <IconPlay className="w-4 h-4" />
                Watch Video
                <IconArrowRight />
              </button>
            </div>
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
                    active={activeCategory === cat.id}
                    onClick={setActiveCategory}
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
              {/* text column */}
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700">FEATURED STORY</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-[#0B1E3D] sm:text-3xl">
                  Maintenance Excellence at <span className="text-[#F5B800]">Mining Site</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Tim teknisi kami melakukan preventive maintenance pada unit excavator XCMG di area
                  mining untuk memastikan performa optimal dan zero breakdown.
                </p>
                <button className="mt-6 flex items-center gap-2 rounded-md bg-[#0B1E3D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0F2A52] transition-colors">
                  View Story
                  <IconArrowRight />
                </button>
              </div>

              {/* image grid column */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative col-span-1 row-span-2 overflow-hidden rounded-lg">
                  <img
                    src="https://picsum.photos/seed/maintenance-main/700/700"
                    alt="Maintenance excellence at mining site"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                      <IconPlay className="w-6 h-6 text-[#0B1E3D] ml-1" />
                    </span>
                  </span>
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://picsum.photos/seed/maintenance-2/500/350"
                    alt="Technicians servicing equipment"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="https://picsum.photos/seed/maintenance-3/500/350"
                    alt="Technician inspecting equipment"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4. MEDIA FILTER BAR ============ */}
        <section className="border-t border-gray-100 bg-white py-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <button className="flex items-center gap-2 rounded-md bg-[#0B1E3D] px-4 py-2 text-xs font-semibold text-white">
                  <IconGrid />
                  ALL MEDIA
                </button>
                {FILTERS.map((f) => (
                  <FilterDropdown key={f} label={f} />
                ))}
              </div>
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-[#0B1E3D]">
                Sort by Latest
                <IconChevronDown className="w-4 h-4 text-[#F5B800]" />
              </button>
            </div>
          </div>
        </section>

        {/* ============ 5. MEDIA GRID ============ */}
        <section className="bg-white pb-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 auto-rows-[160px] gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {MEDIA_ITEMS.map((item) => (
                <MediaCard key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button className="flex items-center gap-2 rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-[#0B1E3D] hover:bg-gray-50 transition-colors">
                Load More Media
                <IconRefresh />
              </button>
            </div>
          </div>
        </section>

        {/* ============ 6. STATS BAR ============ */}
        <section className="bg-[#0B1E3D] py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-5 sm:divide-y-0 sm:divide-x">
              {STATS.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* ============ 7. DRONE VIDEO HIGHLIGHT ============ */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.8fr)] items-center">
              {/* text column */}
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-700">DRONE VIDEO HIGHLIGHT</p>
                <h2 className="mt-3 text-2xl font-bold leading-snug text-[#0B1E3D] sm:text-3xl">
                  See the <span className="text-[#F5B800]">Bigger Picture</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-500">
                  Dokumentasi udara dari berbagai project dan aktivitas kami di seluruh Indonesia.
                </p>
                <button className="mt-6 flex items-center gap-2 rounded-md bg-[#0B1E3D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0F2A52] transition-colors">
                  Watch Drone Video
                  <IconArrowRight />
                </button>
              </div>

              {/* video column */}
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="https://picsum.photos/seed/mining-overview/900/560"
                    alt="Mining site aerial overview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
                      <IconPlay className="w-6 h-6 text-[#0B1E3D] ml-1" />
                    </span>
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <p className="text-sm font-semibold">Mining Site Overview</p>
                      <p className="text-xs text-white/80">East Kalimantan Project</p>
                    </div>
                    <span className="text-xs font-medium">03:45</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-5">
                  {DRONE_VIDEOS.map((video) => (
                    <VideoThumbnail key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 8. CTA BANNER ============ */}
        <section className="relative overflow-hidden bg-[#0B1E3D]">
          <img
            src="https://picsum.photos/seed/cta-heavy-equipment/1600/400"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="relative mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="border-l-2 border-[#F5B800] pl-4">
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Want to see more of our activities?
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/70">
                  Ikuti terus perjalanan kami dalam memberikan layanan terbaik untuk industri dan
                  pertambangan di seluruh Indonesia.
                </p>
              </div>
              <button className="flex shrink-0 items-center gap-2 rounded-md bg-[#F5B800] px-6 py-3 text-sm font-semibold text-[#0B1E3D] hover:bg-[#e0a700] transition-colors">
                Stay Updated
                <IconArrowRight />
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}   