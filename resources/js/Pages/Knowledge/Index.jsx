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

const IconCalendar = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3.5" y="5" width="17" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3.5 10h17" />
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

/* Mapping Icon untuk Kategori */
const categoryIcons = {
    'maintenance-tips': { icon: IconWrench, bgColor: 'bg-amber-50', iconColor: 'text-amber-500' },
    'heavy-equipment-knowledge': { icon: IconExcavator, bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
    'mining-technology': { icon: IconRadarTower, bgColor: 'bg-purple-50', iconColor: 'text-purple-500' },
    'hydraulic-system': { icon: IconDroplet, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    'engine-maintenance': { icon: IconGear, bgColor: 'bg-orange-50', iconColor: 'text-orange-500' },
    'lubrication-guide': { icon: IconOilCan, bgColor: 'bg-yellow-50', iconColor: 'text-yellow-500' },
    'predictive-maintenance': { icon: IconActivity, bgColor: 'bg-sky-50', iconColor: 'text-sky-500' },
};

/* Helper untuk membersihkan URL gambar */
const getCleanImageUrl = (path, fallback) => {
    if (!path) return fallback;
    if (path.startsWith('http')) return path;
    const cleaned = path.replace(/^storage\//, '').replace(/^storage\//, '');
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
};

export default function Index({ hero, featuredArticle, articles = [], categories = [], selectedCategory }) {
    const [activeCategory, setActiveCategory] = useState(selectedCategory || '');

    const getCategoryConfig = (catName) => {
        const key = catName?.toLowerCase().replace(/\s+/g, '-');
        return categoryIcons[key] || { icon: IconWrench, bgColor: 'bg-amber-50', iconColor: 'text-amber-500' };
    };

    return (  
        <>
            <Head title="Knowledge Center - PT. Servistama Pro Indonesia" />
            <Navbar />

            <main>
                {/* ================= HERO (FULL SCREEN) ================= */}
                <section className="relative flex min-h-screen w-full items-center justify-center bg-white overflow-hidden pt-20">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <img 
                            src={getCleanImageUrl(hero?.image, '/images/knowledge.png')} 
                            alt="Heavy Equipment Banner" 
                            className="h-full w-full object-cover object-[100%_0%]"
                            style={{ imageRendering: 'high-quality' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:w-2/3" />
                    </div>

                    <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 lg:px-16">
                        <div className="max-w-xl">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">KNOWLEDGE CENTER</span>
                                <span className="h-px w-10 bg-[#FFC107]" />
                            </div>

                            <h1 className="text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-[#0F2B5C] sm:text-5xl lg:text-[3.4rem]">
                                {hero?.title ? hero.title.split('. ')[0] + '.' : 'Engineering Knowledge.'}
                                <br />
                                {hero?.title ? hero.title.split('. ').slice(1).join('. ') : 'Smarter Maintenance.'}
                            </h1>

                            <div className="mt-5 flex items-center gap-3">
                                <span className="h-px w-8 bg-[#FFC107]" />
                                <p className="text-sm font-bold text-[#0F2B5C] sm:text-base">
                                    {hero?.subtitle || 'Pengetahuan Engineering. Maintenance Lebih Cerdas.'}
                                </p>
                            </div>

                            <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-[#0F2B5C] drop-shadow-sm">
                                {hero?.description || 'Temukan wawasan teknis, panduan maintenance, serta solusi smart service yang dirancang untuk memaksimalkan uptime alat.'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================= CATEGORY NAVIGATION ================= */}
                <section className="relative bg-[#F1F5F9] py-16 border-y border-slate-200/80">
                    <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
                        <div className="mb-10 text-center">
                            <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">EXPLORE TOPICS</span>
                            <h2 className="mt-1 text-2xl font-black text-[#0F2B5C] sm:text-3xl">Popular Topics</h2>
                            <div className="mx-auto mt-2.5 h-1 w-12 rounded-full bg-[#FFC107]"></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
                            {categories.map((cat, index) => {
                                const config = getCategoryConfig(cat);
                                const IconComponent = config.icon;
                                const isSelected = activeCategory === cat;

                                return (
                                    <Link
                                        href={`/knowledge?category=${encodeURIComponent(cat)}`}
                                        key={index}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 text-left border border-slate-200/80 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-amber-500/20 ${
                                            isSelected ? 'ring-2 ring-[#FFC107] border-[#FFC107]' : ''
                                        }`}
                                    >
                                        <div>
                                            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${config.bgColor}`}>
                                                <IconComponent className={`h-5 w-5 ${config.iconColor} stroke-[1.75]`} />
                                            </div>

                                            <h3 className="text-xs font-bold leading-snug text-slate-800 group-hover:text-[#0F2B5C]">
                                                {cat}
                                            </h3>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-[#FFC107]/20">
                                                <IconChevronRight className={`h-3.5 w-3.5 ${config.iconColor} transition-transform duration-200 group-hover:translate-x-0.5`} />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= FEATURED ARTICLE ================= */}
                {featuredArticle && (
                    <section className="bg-white px-6 py-16 sm:px-10 lg:px-16">
                        <div className="mx-auto max-w-[1440px]">
                            <Link
                                href={`/knowledge/${featuredArticle.slug}`}
                                className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-[#071A35] shadow-xl lg:grid-cols-2"
                            >
                                <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-12 lg:py-14">
                                    <span className="mb-4 text-xs font-bold tracking-[0.2em] text-[#FFC107]">
                                        {featuredArticle.category}
                                    </span>
                                    <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]">
                                        {featuredArticle.title}
                                    </h2>
                                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                                        {featuredArticle.excerpt}
                                    </p>

                                    <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-white/60">
                                        <span className="flex items-center gap-1.5">
                                            <IconClock className="h-4 w-4" />
                                            {featuredArticle.read_time || '8 MENIT'}
                                        </span>
                                        <span className="h-1 w-1 rounded-full bg-white/30" />
                                        <span className="flex items-center gap-1.5">
                                            <IconDocument className="h-4 w-4" />
                                            TECHNICAL INSIGHT
                                        </span>
                                    </div>

                                    <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3 text-sm font-bold text-[#0F2B5C] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                                        Baca Technical Insight
                                        <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>

                                <div className="relative min-h-[280px] w-full overflow-hidden lg:min-h-[420px]">
                                    <img
                                        src={getCleanImageUrl(featuredArticle.image, '/images/Predicitive.jpg')}
                                        alt={featuredArticle.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071A35]/60 via-transparent to-transparent" />
                                </div>
                            </Link>
                        </div>
                    </section>
                )}

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

        {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        ) : (
            <div className="py-12 text-center text-slate-500">
                Belum ada artikel untuk kategori ini.
            </div>
        )}
    </div>
</section>

               {/* ================= CTA TECHNICAL SUPPORT ================= */}
<section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
    {/* Background Image */}
    <img
        src="/images/cta.png" /* Ganti dengan path foto kamu */
        alt="Technical Support Background"
        className="absolute inset-0 h-full w-full object-cover object-center"
    />

    {/* Overlay Semi-Transparan Biru */}
    <div className="absolute inset-0 bg-[#071A35]/40" />

    {/* Content */}
    <div className="relative z-10 mx-auto max-w-[1440px] text-left">
        <div className="max-w-2xl">
            <span className="mb-4 block h-px w-10 bg-[#FFC107]" />
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Butuh Dukungan Teknis?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
                Terhubung dengan tim service expert kami untuk mendapatkan dukungan maintenance,
                diagnostic, warranty, dan solusi heavy equipment profesional.
            </p>

            <div className="mt-8 flex flex-col justify-start gap-3 sm:flex-row">
                <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FFC107] px-6 py-3.5 text-sm font-bold text-[#0F2B5C] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                    Hubungi Service Expert
                    <IconArrowRight className="h-4 w-4" />
                </Link>
                <Link
                    href="/knowledge"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#FFC107] hover:text-[#FFC107]"
                >
                    Lihat Semua Knowledge
                    <IconArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    </div>
</section>
            </main>

            <Footer />
        </>
    );
}

/* =========================================================
   SUB COMPONENT: Article Card Dinamis
   ========================================================= */
function ArticleCard({ article }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-xl">
            <Link href={`/knowledge/${article.slug}`} className="flex h-full flex-col">
                {/* Image Section (Rasio & Tinggi Disesuaikan) */}
                <div className="relative h-60 w-full shrink-0 overflow-hidden bg-slate-100">
                    <img
                        src={getCleanImageUrl(article.image, '/images/c1.jpg')}
                        alt={article.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                        <span className="text-xs font-bold tracking-[0.12em] text-[#0F2B5C]">
                            {article.category}
                        </span>

                        {/* Judul: Dikunci h-[3.5rem] (2 baris) */}
                        <h3 className="mt-2.5 h-[3.5rem] line-clamp-2 text-lg font-bold leading-snug text-[#0F2B5C]">
                            {article.title}
                        </h3>

                        {/* Deskripsi: Dikunci h-[4.2rem] (3 baris) */}
                        <p className="mt-2 h-[4.2rem] line-clamp-3 text-sm leading-relaxed text-slate-500">
                            {article.excerpt}
                        </p>
                    </div>

                    {/* Footer Card: Garis selalu sejajar presisi */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                            <span className="flex items-center gap-1">
                                <IconClock className="h-3.5 w-3.5" />
                                {article.read_time || '5 Menit'}
                            </span>
                            <span className="flex items-center gap-1">
                                <IconCalendar className="h-3.5 w-3.5" />
                                {article.published_date}
                            </span>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0F2B5C]">
                            <IconArrowRight className="h-4 w-4" />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}