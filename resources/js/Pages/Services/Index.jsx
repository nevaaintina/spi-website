import React from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* -------------------------------------------------------------------------- */
/* Inline SVG Icons                                                           */
/* -------------------------------------------------------------------------- */
const IconWrench = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z" />
    </svg>
);

const IconHeadset = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path d="M20 13v3a2 2 0 0 1-2 2h-1" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M15 18a2 2 0 0 1-2 2h-2" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

/* Helper untuk membersihkan path gambar */
const getCleanImageUrl = (path, fallback) => {
    if (!path) return fallback;
    if (path.startsWith('http')) return path;
    const cleaned = path.replace(/^storage\//, '').replace(/^storage\//, '');
    return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
};

/* Category Design Mapping */
const getCategoryDesign = (index) => {
    const designs = [
        { icon: IconWrench, iconBg: 'bg-amber-50', iconColor: 'text-amber-500', accent: 'text-amber-500', accentBar: 'bg-amber-500' },
        { icon: IconWrench, iconBg: 'bg-sky-50', iconColor: 'text-sky-500', accent: 'text-sky-500', accentBar: 'bg-sky-500' },
        { icon: IconWrench, iconBg: 'bg-violet-50', iconColor: 'text-violet-500', accent: 'text-violet-500', accentBar: 'bg-violet-500' },
        { icon: IconWrench, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', accent: 'text-emerald-600', accentBar: 'bg-emerald-600' },
        { icon: IconWrench, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', accent: 'text-orange-500', accentBar: 'bg-orange-500' },
    ];
    return designs[index % designs.length];
};

/* -------------------------------------------------------------------------- */
/* Hero Section Dinamis                                                       */
/* -------------------------------------------------------------------------- */
function Hero({ serviceSetting }) {
    const bgImage = getCleanImageUrl(serviceSetting?.hero_image, '/images/hero-services.png');

    return (
        <section className="relative flex h-screen w-full items-center overflow-hidden bg-black pt-16">
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt="SPI technician inspecting heavy equipment"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-10">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        {serviceSetting?.hero_title_part1 || 'OUR SERVICE'}
                        <br />
                        <span className="text-[#FDC02F]">{serviceSetting?.hero_title_part2 || 'SOLUTIONS'}</span>
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-300 sm:text-lg">
                        {serviceSetting?.hero_description || 'Comprehensive service solutions designed to keep your heavy equipment performing at its best.'}
                    </p>
                </div>
            </div>
        </section>
    );
}

function ExploreHeading() {
    return (
        <div className="mx-auto max-w-2xl px-6 pb-14 pt-20 text-center lg:pt-24">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FDC02F]">WHAT WE OFFER</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1B32] sm:text-4xl">
                Explore Our Service Solutions
            </h2>
            <span className="mx-auto mt-4 block h-1 w-14 rounded-full bg-[#FDC02F]" />
            <p className="mt-5 text-sm leading-relaxed text-gray-500 sm:text-base">
                From preventive maintenance to advanced diagnostics, we provide
                end-to-end service solutions to maximize your equipment uptime and
                performance.
            </p>
        </div>
    );
}

function CategoryCard({ category, index }) {
    const design = getCategoryDesign(index);
    const Icon = design.icon;

    return (
        <Link
            href={`/services/${category.slug}`}
            className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FDC02F] hover:shadow-xl"
        >
            <span className={`grid h-14 w-14 place-items-center rounded-xl ${design.iconBg} ${design.iconColor} transition-transform duration-300 group-hover:scale-105`}>
                <Icon className="h-6 w-6" />
            </span>

            <h3 className="mt-6 text-lg font-bold leading-snug text-[#0B1B32]">
                {category.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
                {category.description}
            </p>

            <span className={`mt-6 block h-0.5 w-8 rounded-full ${design.accentBar}`} />

            <div className="mt-5 flex items-center justify-between">
                <span>
                    <span className={`block text-2xl font-extrabold ${design.accent}`}>
                        {category.services_count ?? 0}
                    </span>
                    <span className="block text-xs font-medium text-gray-400">Services</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-[#0B1B32] transition-colors duration-300 group-hover:text-[#FDC02F]">
                    View Services
                    <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/* Technical Support & CTA Dinamis                                            */
/* -------------------------------------------------------------------------- */
function TechnicalSupportCTA({ serviceSetting }) {
    const waNumber = serviceSetting?.whatsapp_number || '6281122233344';
    const waUrl = `https://wa.me/${waNumber}?text=Halo%20SPI,%20saya%20butuh%20bantuan%20teknis%20dan%20konsultasi%20layanan.`;

    return (
        <section className="mx-6 mb-20 overflow-hidden rounded-2xl bg-[#0B1B32] lg:mx-10">
            <div className="relative flex flex-col items-start gap-8 px-8 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12">
                <div
                    className="pointer-events-none absolute right-0 top-0 hidden h-full w-64 opacity-20 lg:block"
                    style={{
                        backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                        backgroundSize: '14px 14px',
                        color: '#2E9EF5',
                    }}
                />

                <div className="flex items-start gap-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-[#FDC02F]/50 text-[#FDC02F]">
                        <IconHeadset className="h-6 w-6" />
                    </span>
                    <div>
                        <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                            {serviceSetting?.cta_title || 'Need Technical Support or Service Consultation?'}
                        </h3>
                        <p className="mt-2 text-sm text-gray-300 sm:text-base">
                            {serviceSetting?.cta_subtitle || 'Our technical team is ready to help you 24/7.'}
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Link
                        href="/contact-us"
                        className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-bold tracking-wide text-white transition-colors duration-200 hover:border-[#FDC02F] hover:text-[#FDC02F]"
                    >
                        TALK TO OUR EXPERT
                        <IconArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-full bg-[#FDC02F] px-6 py-3 text-xs font-bold tracking-wide text-[#0B1B32] transition-transform duration-200 hover:scale-105"
                    >
                        REQUEST SERVICE
                        <IconArrowRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function Index({ categories, service_setting }) {
    return (
        <>
            <Head title="Our Service Solutions" />

            <div className="min-h-screen bg-white">
                <Navbar />
                <Hero serviceSetting={service_setting} />

                <main>
                    <ExploreHeading />

                    <section className="mx-auto max-w-[1440px] px-6 lg:px-10">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            {categories && categories.map((category, index) => (
                                <CategoryCard key={category.id || category.slug} category={category} index={index} />
                            ))}
                        </div>
                    </section>

                    <div className="mt-16">
                        <TechnicalSupportCTA serviceSetting={service_setting} />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}