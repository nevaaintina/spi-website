import { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   INLINE SVG ICONS
   ========================================================= */
const IconWrench = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
    </svg>
);

const IconExcavator = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 18h7" />
        <circle cx="6" cy="19.5" r="1.3" />
        <circle cx="10.5" cy="19.5" r="1.3" />
        <path d="M11 15h6l3-3" />
        <path d="M14 15V9l4-2" />
        <path d="M18 7l3 1-1.5 3" />
        <path d="M3 15V9h6l2 3v3" />
    </svg>
);

const IconRadarTower = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 21V10" />
        <path d="M8 21h8" />
        <circle cx="12" cy="6" r="4" />
        <path d="M12 4v4l2.5 1.5" />
    </svg>
);

const IconDroplet = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3s6 6.6 6 10.5a6 6 0 1 1-12 0C6 9.6 12 3 12 3z" />
    </svg>
);

const IconGear = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" />
    </svg>
);

const IconOilCan = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 10h9l6-3v2l-3 1" />
        <path d="M4 10v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8" />
        <path d="M8 6.5V10" />
        <path d="M6.5 6.5h3L9 4H7z" />
    </svg>
);

const IconActivity = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 12h4l2 7 4-14 2 7h8" />
    </svg>
);

const IconAlertTriangle = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3.5 22 20H2L12 3.5z" />
        <path d="M12 9.5v4.2" />
        <path d="M12 17h.01" />
    </svg>
);

const IconShield = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const IconHeadset = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <rect x="3" y="13" width="4" height="6" rx="1.2" />
        <rect x="17" y="13" width="4" height="6" rx="1.2" />
        <path d="M19 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
);

const IconDocument = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 15.5h6M9 9h2" />
    </svg>
);

const IconClock = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const IconChevronRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 6l6 6-6 6" />
    </svg>
);

const IconFuel = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
        <path d="M4 21h10" />
        <path d="M14 9h2l3 3v6a1.5 1.5 0 0 1-3 0v-2h-2" />
        <path d="M7 6h5" />
    </svg>
);

const IconThermometer = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0z" />
    </svg>
);

const IconTarget = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
);

const IconZap = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
);

const IconTrendingUp = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
    </svg>
);

const IconBadgeCheck = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2.5 14.5 5l3.4-.4.6 3.4 3 1.8-1.6 3 1.6 3-3 1.8-.6 3.4-3.4-.4L12 21.5 9.5 19l-3.4.4-.6-3.4-3-1.8 1.6-3-1.6-3 3-1.8.6-3.4L9.5 5z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

/* =========================================================
   STATIC DATA
   ========================================================= */
const categories = [
    { id: 'maintenance-tips', label: 'Maintenance Tips', icon: IconWrench },
    { id: 'heavy-equipment-knowledge', label: 'Heavy Equipment Knowledge', icon: IconExcavator },
    { id: 'mining-technology', label: 'Mining Technology', icon: IconRadarTower },
    { id: 'hydraulic-system', label: 'Hydraulic System', icon: IconDroplet },
    { id: 'engine-maintenance', label: 'Engine Maintenance', icon: IconGear },
    { id: 'lubrication-guide', label: 'Lubrication Guide', icon: IconOilCan },
    { id: 'predictive-maintenance', label: 'Predictive Maintenance', icon: IconActivity },
    { id: 'failure-analysis', label: 'Failure Analysis', icon: IconAlertTriangle },
    { id: 'safety', label: 'Safety', icon: IconShield },
    { id: 'operator-tips', label: 'Operator Tips', icon: IconHeadset },
    { id: 'technical-bulletin', label: 'Technical Bulletin', icon: IconDocument },
];

const featuredArticle = {
    category: 'PREDICTIVE MAINTENANCE',
    title: 'Bagaimana Predictive Maintenance Memaksimalkan Uptime Heavy Equipment',
    description:
        'Pelajari bagaimana condition monitoring, equipment diagnostics, dan maintenance berbasis data dapat mengurangi downtime tidak terduga serta meningkatkan performa alat.',
    readTime: '8 MENIT',
    tag: 'TECHNICAL INSIGHT',
    image: '/images/knowledge/featured-predictive-maintenance.jpg',
    slug: 'predictive-maintenance-heavy-equipment',
    stats: [
        { label: 'FUEL LEVEL', value: '78%', icon: IconFuel },
        { label: 'HYDRAULIC TEMP', value: '68°C', icon: IconThermometer },
        { label: 'SYSTEM STATUS', value: 'NORMAL', icon: IconActivity },
        { label: 'NEXT SERVICE', value: '120 HRS', icon: IconClock },
    ],
};

const articles = [
    {
        number: '01',
        category: 'MAINTENANCE TIPS',
        title: '5 Praktik Maintenance Penting untuk Heavy Equipment',
        description:
            'Praktik maintenance yang tepat dapat memperpanjang umur alat dan mengurangi biaya perbaikan tidak terduga.',
        readTime: '6 MENIT',
        date: '20 MEI 2025',
        image: '/images/knowledge/article-01-maintenance-tips.jpg',
        slug: 'praktik-maintenance-penting-heavy-equipment',
    },
    {
        number: '02',
        category: 'HYDRAULIC SYSTEM',
        title: 'Memahami Performa Hydraulic System dan Kerusakan yang Sering Terjadi',
        description:
            'Kenali komponen penting hydraulic system dan penyebab utama gangguan performa pada alat berat.',
        readTime: '7 MENIT',
        date: '18 MEI 2025',
        image: '/images/knowledge/article-02-hydraulic-system.jpg',
        slug: 'performa-hydraulic-system-heavy-equipment',
    },
    {
        number: '03',
        category: 'ENGINE MAINTENANCE',
        title: 'Panduan Engine Maintenance untuk Menjaga Keandalan Alat',
        description:
            'Step-by-step perawatan engine agar performa tetap optimal dan konsumsi bahan bakar lebih efisien.',
        readTime: '6 MENIT',
        date: '15 MEI 2025',
        image: '/images/knowledge/article-03-engine-maintenance.jpg',
        slug: 'panduan-engine-maintenance-heavy-equipment',
    },
    {
        number: '04',
        category: 'LUBRICATION GUIDE',
        title: 'Memilih Lubricant yang Tepat untuk Heavy Equipment',
        description:
            'Pemilihan lubricant yang tepat dapat melindungi komponen vital dan meningkatkan performa alat.',
        readTime: '5 MENIT',
        date: '12 MEI 2025',
        image: '/images/knowledge/article-04-lubrication-guide.jpg',
        slug: 'memilih-lubricant-tepat-heavy-equipment',
    },
    {
        number: '05',
        category: 'MINING TECHNOLOGY',
        title: 'Bagaimana Teknologi Digital Mengubah Layanan Heavy Equipment',
        description:
            'Transformasi digital membantu meningkatkan efisiensi, akurasi, dan kecepatan pengambilan keputusan.',
        readTime: '8 MENIT',
        date: '10 MEI 2025',
        image: '/images/knowledge/article-05-mining-technology.jpg',
        slug: 'teknologi-digital-layanan-heavy-equipment',
    },
    {
        number: '06',
        category: 'FAILURE ANALYSIS',
        title: 'Mengenali Tanda Awal Kerusakan pada Heavy Equipment',
        description:
            'Deteksi dini kerusakan dapat mencegah kerugian besar dan memastikan operasional lebih aman.',
        readTime: '7 MENIT',
        date: '8 MEI 2025',
        image: '/images/knowledge/article-06-failure-analysis.jpg',
        slug: 'tanda-awal-kerusakan-heavy-equipment',
    },
];

const ctaFeatures = [
    { icon: IconBadgeCheck, title: 'Service Expert', subtitle: 'Bersertifikasi' },
    { icon: IconTarget, title: 'Solusi Tepat', subtitle: 'Berbasis Data' },
    { icon: IconZap, title: 'Response Cepat', subtitle: '24/7 Support' },
    { icon: IconTrendingUp, title: 'Uptime Maksimal', subtitle: 'Operasional Optimal' },
];

/* =========================================================
   PAGE COMPONENT
   ========================================================= */
export default function Index() {
    const [activeCategory, setActiveCategory] = useState('maintenance-tips');

    return (
        <>
            <Head title="Knowledge Center - PT. Servistama Pro Indonesia" />
            <Navbar />

            <main>
                {/* ================= HERO ================= */}
                <section className="relative overflow-hidden bg-[#FBFDFD] py-12 lg:py-16">
                    {/* Grid blueprint background & Tech Nodes (Foto 2 Style) */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.25]" aria-hidden="true">
                        <svg viewBox="0 0 1600 700" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                            <defs>
                                <pattern id="gridPattern" width="36" height="36" patternUnits="userSpaceOnUse">
                                    <path d="M36 0H0V36" fill="none" stroke="#2563EB" strokeWidth="0.4" strokeDasharray="1 2" />
                                </pattern>
                            </defs>
                            <rect width="1600" height="700" fill="url(#gridPattern)" />

                            {/* Blueprint Tech Lines & Nodes */}
                            <g stroke="#2563EB" strokeWidth="1" opacity="0.6">
                                <line x1="750" y1="80" x2="1150" y2="80" strokeDasharray="2 2" />
                                <line x1="1150" y1="80" x2="1250" y2="180" />
                                <line x1="720" y1="450" x2="850" y2="580" />
                                <line x1="850" y1="580" x2="950" y2="580" strokeDasharray="2 2" />
                            </g>

                            <circle cx="1150" cy="80" r="5" fill="#2563EB" />
                            <circle cx="1250" cy="180" r="5" fill="#2563EB" />
                            <circle cx="850" cy="580" r="4" fill="#2563EB" />
                            <circle cx="720" cy="450" r="4" fill="#2563EB" />
                        </svg>
                    </div>

                    <div className="relative mx-auto max-w-[1440px] px-6 pt-4 sm:px-10 lg:px-16">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                            {/* Hero Left Content */}
                            <div className="z-10 max-w-2xl lg:col-span-6 xl:col-span-6">
                                <div className="mb-6 flex items-center gap-2">
                                    <span className="text-xs font-bold tracking-[0.2em] text-[#EAB308]">KNOWLEDGE CENTER</span>
                                    <span className="text-[#EAB308]">&rarr;</span>
                                </div>

                                <h1 className="text-[2.6rem] font-black leading-[1.08] tracking-tight text-[#0F2B5C] sm:text-5xl xl:text-[3.6rem]">
                                    Engineering Knowledge.
                                    <br />
                                    Smarter Maintenance.
                                </h1>

                                <p className="mt-4 text-base font-bold text-[#0F2B5C]">
                                    Pengetahuan Engineering. Maintenance Lebih Cerdas.
                                </p>

                                <div className="mt-3 h-0.5 w-16 bg-[#EAB308]" />

                                <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#64748B] sm:text-base">
                                    Temukan wawasan teknis, panduan maintenance, pengetahuan heavy equipment, serta solusi smart
                                    service yang dirancang untuk meningkatkan performa dan memaksimalkan uptime alat.
                                </p>
                            </div>

                            {/* Hero Right - Detailed Blueprint Excavator (SVG Native) */}
<div className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6">
    <div className="relative w-full max-w-[680px] lg:scale-110 xl:scale-125 lg:translate-x-6">
        <svg viewBox="0 0 800 500" className="h-auto w-full drop-shadow-sm" fill="none" stroke="#2563EB">
            {/* Tracks / Undercarriage */}
            <rect x="100" y="360" width="460" height="70" rx="35" strokeWidth="1.5" strokeDasharray="4 2" />
            <rect x="115" y="370" width="430" height="50" rx="25" strokeWidth="1" />
            {[140, 190, 240, 290, 340, 390, 440, 490, 520].map((cx, i) => (
                <g key={i}>
                    <circle cx={cx} cy="395" r="16" strokeWidth="1.2" />
                    <circle cx={cx} cy="395" r="6" strokeWidth="0.8" />
                </g>
            ))}

            {/* Counterweight & Cabin Base */}
            <path d="M160 360 L160 260 L240 240 L440 240 L480 290 L480 360 Z" strokeWidth="1.5" />
            
            {/* Cabin Body & Windows */}
            <path d="M250 240 L250 150 L370 150 L400 240" strokeWidth="1.5" />
            <rect x="265" y="165" width="90" height="65" rx="4" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="310" y1="165" x2="310" y2="230" strokeWidth="0.8" />

            {/* Boom Arm */}
            <path d="M400 260 L540 100 L580 120 L430 290 Z" strokeWidth="1.8" />
            {/* Stick / Dipper */}
            <path d="M540 100 L680 230 L660 255 L530 130 Z" strokeWidth="1.8" />

            {/* Bucket & Teeth */}
            <path d="M680 230 L735 295 L700 340 L635 315 L660 255 Z" fill="#2563EB" fillOpacity="0.08" strokeWidth="1.8" />
            <path d="M735 295 L755 310 M725 310 L745 325 M710 325 L730 340 M695 340 L710 352" strokeWidth="2.5" />

            {/* Hydraulic Cylinders & Piston Rods */}
            <line x1="410" y1="230" x2="500" y2="140" stroke="#1D4ED8" strokeWidth="3" />
            <line x1="520" y1="130" x2="600" y2="185" stroke="#1D4ED8" strokeWidth="2.5" />
            <line x1="630" y1="210" x2="685" y2="265" stroke="#1D4ED8" strokeWidth="2" />

            {/* Blueprint Grid Lines & Tech Measurements */}
            <g stroke="#3B82F6" strokeWidth="0.6" opacity="0.6" strokeDasharray="4 4">
                <line x1="80" y1="435" x2="600" y2="435" />
                <line x1="680" y1="80" x2="680" y2="380" />
                <line x1="540" y1="60" x2="540" y2="400" />
                <circle cx="560" cy="110" r="22" strokeWidth="0.8" />
                <circle cx="670" cy="242" r="16" strokeWidth="0.8" />
            </g>

            {/* Interactive Points / Tech Nodes */}
            <circle cx="560" cy="110" r="4" fill="#2563EB" />
            <circle cx="670" cy="242" r="4" fill="#2563EB" />
            <circle cx="420" cy="275" r="4" fill="#2563EB" />
        </svg>
    </div>
</div>
                        </div>
                    </div>

                    {/* ================= CATEGORY NAVIGATION ================= */}
                    <div className="relative mx-auto mt-12 max-w-[1440px] px-6 sm:px-10 lg:px-16">
                        <div className="flex flex-wrap items-center gap-3">
                            {categories.slice(0, 5).map((cat) => (
                                <CategoryPill
                                    key={cat.id}
                                    category={cat}
                                    active={activeCategory === cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                />
                            ))}
                            <button
                                type="button"
                                aria-label="Lihat kategori lainnya"
                                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#EAB308] shadow-sm transition-all duration-300 hover:border-[#EAB308] hover:bg-[#EAB308] hover:text-[#0F2B5C]"
                            >
                                <IconChevronRight className="h-4 w-4" />
                            </button>
                            {categories.slice(5).map((cat) => (
                                <CategoryPill
                                    key={cat.id}
                                    category={cat}
                                    active={activeCategory === cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= FEATURED ARTICLE ================= */}
                <section className="bg-white px-6 pb-16 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <Link
                            href={`/knowledge/${featuredArticle.slug}`}
                            className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-[#071A35] shadow-xl lg:grid-cols-2"
                        >
                            {/* Content */}
                            <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-12 lg:py-14">
                                <span className="mb-4 text-xs font-bold tracking-[0.2em] text-[#FFC107]">
                                    {featuredArticle.category}
                                </span>
                                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]">
                                    {featuredArticle.title}
                                </h2>
                                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                                    {featuredArticle.description}
                                </p>

                                <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-white/60">
                                    <span className="flex items-center gap-1.5">
                                        <IconClock className="h-4 w-4" />
                                        {featuredArticle.readTime}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-white/30" />
                                    <span className="flex items-center gap-1.5">
                                        <IconDocument className="h-4 w-4" />
                                        {featuredArticle.tag}
                                    </span>
                                </div>

                                <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3 text-sm font-bold text-[#0F2B5C] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                                    Baca Technical Insight
                                    <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* ================= ARTICLE GRID ================= */}
                <section className="bg-[#F8FAFC] px-6 py-16 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-10 flex items-end justify-between">
                            <div>
                                <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">ARTICLES</span>
                                <h2 className="mt-2 text-2xl font-bold text-[#0F2B5C] sm:text-3xl">
                                    Technical Insight Terbaru
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <ArticleCard key={article.number} article={article} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= CTA TECHNICAL SUPPORT ================= */}
                <section className="relative overflow-hidden bg-[#071A35] px-6 py-16 sm:px-10 lg:px-16">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        aria-hidden="true"
                        style={{
                            backgroundImage:
                                'linear-gradient(#FFC107 1px, transparent 1px), linear-gradient(90deg, #FFC107 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <span className="mb-4 block h-px w-10 bg-[#FFC107]" />
                            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                                Butuh Dukungan Teknis?
                            </h2>
                            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                                Terhubung dengan tim service expert kami untuk mendapatkan dukungan maintenance,
                                diagnostic, warranty, dan solusi heavy equipment profesional.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3.5 text-sm font-bold text-[#0F2B5C] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                                >
                                    Hubungi Service Expert
                                    <IconArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/knowledge"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#FFC107] hover:text-[#FFC107]"
                                >
                                    Lihat Semua Knowledge
                                    <IconArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                            {ctaFeatures.map((feature) => (
                                <div key={feature.title} className="flex items-start gap-3">
                                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#FFC107]/40 text-[#FFC107]">
                                        <feature.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-white">{feature.title}</p>
                                        <p className="text-xs text-white/50">{feature.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

/* =========================================================
   SUB COMPONENTS
   ========================================================= */
function CategoryPill({ category, active, onClick }) {
    const Icon = category.icon;
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 shadow-sm',
                active
                    ? 'border-[#EAB308] bg-[#EAB308] text-[#0F2B5C]'
                    : 'border-[#E2E8F0] bg-white text-[#0F2B5C] hover:bg-[#EAB308] hover:text-[#0F2B5C] hover:border-[#EAB308]',
            ].join(' ')}
        >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{category.label}</span>
        </button>
    );
}

function ArticleCard({ article }) {
    return (
        <article className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-lg">
            <Link href={`/knowledge/${article.slug}`} className="block">
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-md bg-[#FFC107] px-2.5 py-1 text-xs font-extrabold text-[#0F2B5C]">
                        {article.number}
                    </span>
                </div>

                <div className="p-6">
                    <span className="text-xs font-bold tracking-[0.12em] text-[#0F2B5C]">{article.category}</span>
                    <h3 className="mt-2 text-lg font-bold leading-snug text-[#0F2B5C]">{article.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{article.description}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                            <IconClock className="h-3.5 w-3.5" />
                            <span>{article.readTime}</span>
                        </div>
                        <span className="text-xs font-bold text-[#0F2B5C] transition-colors duration-300 group-hover:text-[#EAB308]">
                            Baca Artikel &rarr;
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}