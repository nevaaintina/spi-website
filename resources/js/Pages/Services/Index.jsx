import { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* -------------------------------------------------------------------------- */
/* Design tokens (SPI brand)                                                   */
/* -------------------------------------------------------------------------- */
const COLORS = {
    navy: '#0B1B32',
    navyDark: '#081426',
    yellow: '#FDC02F',
    blue: '#2E9EF5',
};

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

const IconBadge = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="9" r="6" />
        <path d="M9 14.5 7.5 21 12 18.5 16.5 21 15 14.5" />
    </svg>
);

const IconGauge = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 19a8 8 0 1 1 16 0" />
        <path d="M12 19V9" />
        <path d="M8 19v-4" />
        <path d="M16 19v-6" />
    </svg>
);

const IconChevronDown = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

const IconSearch = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

const IconMenu = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
);

const IconClose = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
);

/* Category icons ------------------------------------------------------------ */

const IconMaintenance = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z" />
        <path d="m15 9 5-5" />
    </svg>
);

const IconInstallation = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9c.13.36.36.68.66.93.3.24.53.56.66.93A1.65 1.65 0 0 0 21.91 11H22a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
);

const IconOverhaul = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 3v5h-5" />
    </svg>
);

const IconInspection = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
        <path d="M11 8v3l2 2" />
    </svg>
);

const IconConsulting = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 14 8.5 16.5a1.7 1.7 0 0 1-2.4-2.4L9 11" />
        <path d="m14 11 2.5-2.5a1.7 1.7 0 0 1 2.4 2.4L16 14" />
        <path d="m9 11 3 3" />
        <path d="M6 8 3 11l3 3" />
        <path d="m18 8 3 3-3 3" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Static content                                                             */
/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'SERVICES', href: '/services', hasDropdown: true, active: true },
    { label: 'SOLUTIONS', href: '/solutions' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'KNOWLEDGE CENTER', href: '/knowledge-center' },
    { label: 'CONTACT', href: '/contact' },
];

const STATS = [
    { icon: IconWrench, value: '18+', label: 'Service Solutions' },
    { icon: IconHeadset, value: '24/7', label: 'Emergency Support' },
    { icon: IconBadge, value: 'Certified', label: 'Technical Team' },
    { icon: IconGauge, value: 'Maximum', label: 'Equipment Uptime' },
];

const CATEGORIES = [
    {
        slug: 'maintenance-repair',
        title: 'Maintenance & Repair',
        description: 'Keep your equipment reliable, productive, and ready to operate.',
        count: 5,
        icon: IconMaintenance,
        iconBg: 'bg-amber-50',
        iconColor: 'text-amber-500',
        accent: 'text-amber-500',
        accentBar: 'bg-amber-500',
    },
    {
        slug: 'installation-commissioning',
        title: 'Installation & Commissioning',
        description: 'Professional installation and testing to ensure optimal performance.',
        count: 2,
        icon: IconInstallation,
        iconBg: 'bg-sky-50',
        iconColor: 'text-sky-500',
        accent: 'text-sky-500',
        accentBar: 'bg-sky-500',
    },
    {
        slug: 'overhaul-rebuild',
        title: 'Overhaul & Rebuild',
        description: 'Restore and rebuild equipment to extend its service life.',
        count: 2,
        icon: IconOverhaul,
        iconBg: 'bg-violet-50',
        iconColor: 'text-violet-500',
        accent: 'text-violet-500',
        accentBar: 'bg-violet-500',
    },
    {
        slug: 'inspection-testing',
        title: 'Inspection & Testing',
        description: 'Advanced inspection and testing to detect issues before failure.',
        count: 7,
        icon: IconInspection,
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        accent: 'text-emerald-600',
        accentBar: 'bg-emerald-600',
    },
    {
        slug: 'contract-consulting',
        title: 'Contract & Consulting',
        description: 'Long-term strategies and expert consultation to support your business.',
        count: 2,
        icon: IconConsulting,
        iconBg: 'bg-orange-50',
        iconColor: 'text-orange-500',
        accent: 'text-orange-500',
        accentBar: 'bg-orange-500',
    },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

// Replace with actual SPI services hero image
const heroImage = '/images/services/services-hero.jpg';

function Hero() {
    return (
        <section className="relative flex min-h-[640px] items-center overflow-hidden bg-[#0B1B32] pt-16">
            {/* Background image + overlay */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="SPI technician inspecting heavy equipment"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B32] via-[#0B1B32]/85 to-[#0B1B32]/30" />
                <div className="absolute inset-0 bg-[#0B1B32]/30" />
            </div>

            {/* HUD-style tech accents (decorative) */}
            <div className="pointer-events-none absolute right-10 top-24 hidden h-24 w-40 rounded-md border border-[#2E9EF5]/40 bg-[#0B1B32]/40 backdrop-blur-sm lg:block" />
            <div className="pointer-events-none absolute bottom-24 right-16 hidden h-28 w-28 items-center justify-center rounded-full border border-[#2E9EF5]/50 text-[#2E9EF5] lg:flex">
                <span className="text-lg font-bold">98%</span>
            </div>

            <div className="relative mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-10">
                <div className="max-w-2xl">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-300">
                        <Link href="/" className="hover:text-[#FDC02F]">HOME</Link>
                        <IconChevronDown className="h-3 w-3 -rotate-90" />
                        <span className="text-[#FDC02F]">SERVICES</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                        OUR SERVICE
                        <br />
                        <span className="text-[#FDC02F]">SOLUTIONS</span>
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-300 sm:text-lg">
                        Comprehensive service solutions designed to keep your heavy
                        equipment performing at its best.
                    </p>

                    {/* Statistics */}
                    <div className="mt-12 grid grid-cols-2 gap-6 sm:flex sm:flex-wrap sm:gap-10">
                        {STATS.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex items-center gap-3">
                                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#FDC02F]/50 text-[#FDC02F]">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span>
                                    <span className="block text-lg font-extrabold text-white">{value}</span>
                                    <span className="block text-xs text-gray-300">{label}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Explore section heading                                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Category card                                                              */
/* -------------------------------------------------------------------------- */

function CategoryCard({ category }) {
    const Icon = category.icon;

    return (
        <Link
            href={`/services/${category.slug}`}
            className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FDC02F] hover:shadow-xl"
        >
            <span
                className={`grid h-14 w-14 place-items-center rounded-xl ${category.iconBg} ${category.iconColor} transition-transform duration-300 group-hover:scale-105`}
            >
                <Icon className="h-6 w-6" />
            </span>

            <h3 className="mt-6 text-lg font-bold leading-snug text-[#0B1B32]">
                {category.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
                {category.description}
            </p>

            <span className={`mt-6 block h-0.5 w-8 rounded-full ${category.accentBar}`} />

            <div className="mt-5 flex items-center justify-between">
                <span>
                    <span className={`block text-2xl font-extrabold ${category.accent}`}>
                        {category.count}
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
/* Technical Support CTA                                                       */
/* -------------------------------------------------------------------------- */

function TechnicalSupportCTA() {
    return (
        <section className="mx-6 mb-20 overflow-hidden rounded-2xl bg-[#0B1B32] lg:mx-10">
            <div className="relative flex flex-col items-start gap-8 px-8 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-12">
                {/* Decorative dot grid */}
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
                            Need Technical Support or Service Consultation?
                        </h3>
                        <p className="mt-2 text-sm text-gray-300 sm:text-base">
                            Our technical team is ready to help you 24/7.
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-xs font-bold tracking-wide text-white transition-colors duration-200 hover:border-[#FDC02F] hover:text-[#FDC02F]"
                    >
                        TALK TO OUR EXPERT
                        <IconArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                        href="/request-service"
                        className="flex items-center justify-center gap-2 rounded-full bg-[#FDC02F] px-6 py-3 text-xs font-bold tracking-wide text-[#0B1B32] transition-transform duration-200 hover:scale-105"
                    >
                        REQUEST SERVICE
                        <IconArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function Index() {
    return (
        <>
            <Head title="Our Service Solutions" />

            <div className="min-h-screen bg-white">
                <Navbar />
                <Hero />

                <main>
                    <ExploreHeading />

                    <section className="mx-auto max-w-[1440px] px-6 lg:px-10">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            {CATEGORIES.map((category) => (
                                <CategoryCard key={category.slug} category={category} />
                            ))}
                        </div>
                    </section>

                    <div className="mt-16">
                        <TechnicalSupportCTA />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
