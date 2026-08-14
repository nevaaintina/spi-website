import { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

/* -------------------------------------------------------------------------- */
/* Inline SVG Icons                                                           */
/* -------------------------------------------------------------------------- */

const IconSearch = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

const IconChevronDown = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m6 9 6 6 6-6" />
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

const IconHeadset = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path d="M20 13v3a2 2 0 0 1-2 2h-1" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M15 18a2 2 0 0 1-2 2h-2" />
    </svg>
);

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
/* Category data                                                              */
/* -------------------------------------------------------------------------- */

const SERVICE_CATEGORIES = {
    'maintenance-repair': {
        title: 'Maintenance & Repair',
        description:
            'Keep your equipment reliable, productive, and ready for operation with responsive maintenance and repair solutions.',
        icon: IconMaintenance,
        accent: 'text-amber-500',
        accentBar: 'bg-amber-500',
        iconBg: 'bg-amber-50',
        services: [
            {
                title: 'Preventive Maintenance',
                description:
                    'Scheduled maintenance designed to prevent equipment failure and maximize machine availability.',
            },
            {
                title: 'Corrective Maintenance',
                description:
                    'Targeted repairs that resolve identified issues and restore equipment to full working condition.',
            },
            {
                title: 'Breakdown Service',
                description:
                    'Fast on-site response to unplanned breakdowns to minimize downtime and get you back to work.',
            },
            {
                title: 'Emergency Service',
                description:
                    'Priority dispatch for critical failures, available around the clock wherever your equipment operates.',
            },
            {
                title: 'Warranty Repair',
                description:
                    'Manufacturer-backed repair service that protects your investment throughout the warranty period.',
            },
        ],
    },
    'installation-commissioning': {
        title: 'Installation & Commissioning',
        description:
            'Professional installation and commissioning to ensure your equipment is set up correctly and performing from day one.',
        icon: IconInstallation,
        accent: 'text-sky-500',
        accentBar: 'bg-sky-500',
        iconBg: 'bg-sky-50',
        services: [
            {
                title: 'Machine Installation',
                description:
                    'Precise, standards-compliant installation carried out by certified technicians for a safe start-up.',
            },
            {
                title: 'Commissioning',
                description:
                    'Full system checks and performance verification to confirm equipment is ready for production.',
            },
        ],
    },
    'overhaul-rebuild': {
        title: 'Overhaul & Rebuild',
        description:
            'Restore and rebuild aging equipment to extend service life and recover like-new performance.',
        icon: IconOverhaul,
        accent: 'text-violet-500',
        accentBar: 'bg-violet-500',
        iconBg: 'bg-violet-50',
        services: [
            {
                title: 'Overhaul',
                description:
                    'Comprehensive component rebuild and restoration to renew performance and reliability.',
            },
            {
                title: 'Rebuild',
                description:
                    'Complete equipment reconstruction using certified parts to extend operational lifespan.',
            },
        ],
    },
    'inspection-testing': {
        title: 'Inspection & Testing',
        description:
            'Advanced inspection and testing programs that detect issues before they become failures.',
        icon: IconInspection,
        accent: 'text-emerald-600',
        accentBar: 'bg-emerald-600',
        iconBg: 'bg-emerald-50',
        services: [
            {
                title: 'Machine Inspection',
                description:
                    'Detailed visual and mechanical inspection to identify wear and potential points of failure.',
            },
            {
                title: 'Fleet Inspection',
                description:
                    'Scheduled inspection programs across your entire fleet to standardize equipment condition.',
            },
            {
                title: 'Machine Health Check',
                description:
                    'Full diagnostic health assessment covering key systems and performance indicators.',
            },
            {
                title: 'Oil Analysis',
                description:
                    'Laboratory oil sampling that reveals early signs of internal wear and contamination.',
            },
            {
                title: 'Hydraulic Testing',
                description:
                    'Pressure and flow testing to verify hydraulic system performance and detect leaks.',
            },
            {
                title: 'Electrical Diagnosis',
                description:
                    'In-depth electrical system diagnostics to pinpoint faults and prevent unplanned downtime.',
            },
            {
                title: 'Engine Diagnosis',
                description:
                    'Computerized engine diagnostics to assess performance, efficiency, and fault codes.',
            },
        ],
    },
    'contract-consulting': {
        title: 'Contract & Consulting',
        description:
            'Long-term service strategies and expert consultation designed to support your business goals.',
        icon: IconConsulting,
        accent: 'text-orange-500',
        accentBar: 'bg-orange-500',
        iconBg: 'bg-orange-50',
        services: [
            {
                title: 'Annual Maintenance Contract (AMC)',
                description:
                    'Structured annual service agreements that keep maintenance predictable and equipment covered.',
            },
            {
                title: 'Technical Consultation',
                description:
                    'Expert guidance on equipment strategy, service planning, and operational efficiency.',
            },
        ],
    },
};

const NAV_LINKS = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '/about' },
    { label: 'SERVICES', href: '/services', hasDropdown: true, active: true },
    { label: 'SOLUTIONS', href: '/solutions' },
    { label: 'PROJECTS', href: '/projects' },
    { label: 'KNOWLEDGE CENTER', href: '/knowledge-center' },
    { label: 'CONTACT', href: '/contact' },
];

/* -------------------------------------------------------------------------- */
/* Navbar                                                                      */
/* -------------------------------------------------------------------------- */

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-[#0B1B32]/95 backdrop-blur shadow-lg' : 'bg-[#0B1B32]'
            }`}
        >
            <nav className="mx-auto max-w-[1440px] px-6 lg:px-10">
                <div className="flex h-16 items-center justify-between gap-6">
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#FDC02F] text-[#FDC02F]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                                <circle cx="12" cy="12" r="3.2" />
                                <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9" />
                            </svg>
                        </span>
                        <span className="leading-tight">
                            <span className="block text-lg font-extrabold tracking-tight text-white">SPI</span>
                            <span className="block text-[10px] font-semibold tracking-wide text-gray-300">
                                SERVISTAMA PRO INDONESIA
                            </span>
                        </span>
                    </Link>

                    <ul className="hidden items-center gap-7 lg:flex">
                        {NAV_LINKS.map((item) => (
                            <li key={item.label} className="relative">
                                <Link
                                    href={item.href}
                                    className={`group flex items-center gap-1 py-6 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                                        item.active ? 'text-[#FDC02F]' : 'text-white hover:text-[#FDC02F]'
                                    }`}
                                >
                                    {item.label}
                                    {item.hasDropdown && (
                                        <IconChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-rotate-180" />
                                    )}
                                </Link>
                                <span
                                    className={`absolute bottom-5 left-0 h-0.5 bg-[#FDC02F] transition-all duration-300 ${
                                        item.active ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="hidden items-center gap-4 lg:flex">
                        <button aria-label="Search" className="text-white transition-colors hover:text-[#FDC02F]">
                            <IconSearch className="h-4.5 w-4.5" />
                        </button>
                        <Link
                            href="/request-service"
                            className="flex items-center gap-2 rounded-full bg-[#FDC02F] px-5 py-2.5 text-xs font-bold tracking-wide text-[#0B1B32] transition-transform duration-200 hover:scale-105"
                        >
                            REQUEST SERVICE
                            <IconArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        <button className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-[#FDC02F] hover:text-[#FDC02F]">
                            EN
                            <IconChevronDown className="h-3 w-3" />
                        </button>
                    </div>

                    <button
                        className="text-white lg:hidden"
                        aria-label="Toggle menu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {mobileOpen && (
                <div className="border-t border-white/10 bg-[#0B1B32] lg:hidden">
                    <ul className="flex flex-col px-6 py-4">
                        {NAV_LINKS.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={`block py-3 text-sm font-semibold tracking-wide ${
                                        item.active ? 'text-[#FDC02F]' : 'text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-3">
                            <Link
                                href="/request-service"
                                className="flex items-center justify-center gap-2 rounded-full bg-[#FDC02F] px-5 py-3 text-xs font-bold tracking-wide text-[#0B1B32]"
                            >
                                REQUEST SERVICE
                                <IconArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

/* -------------------------------------------------------------------------- */
/* Category hero                                                              */
/* -------------------------------------------------------------------------- */

function CategoryHero({ category }) {
    const Icon = category.icon;
    const [firstWord, ...rest] = category.title.split(' ');

    return (
        <section className="relative overflow-hidden bg-[#0B1B32] pt-16">
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#2E9EF5 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                }}
            />
            <div className="relative mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">
                <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-300">
                    <Link href="/" className="hover:text-[#FDC02F]">HOME</Link>
                    <IconChevronDown className="h-3 w-3 -rotate-90" />
                    <Link href="/services" className="hover:text-[#FDC02F]">SERVICES</Link>
                    <IconChevronDown className="h-3 w-3 -rotate-90" />
                    <span className="text-[#FDC02F]">{category.title.toUpperCase()}</span>
                </div>

                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${category.iconBg} ${category.accent}`}>
                        <Icon className="h-7 w-7" />
                    </span>
                    <div>
                        <h1 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
                            {firstWord} {rest.length > 0 && <br className="hidden sm:block" />}
                            <span className="text-[#FDC02F]">{rest.join(' ')}</span>
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Service card                                                               */
/* -------------------------------------------------------------------------- */

function ServiceCard({ service, index, category }) {
    const Icon = category.icon;
    const number = String(index + 1).padStart(2, '0');

    return (
        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#FDC02F] hover:shadow-xl">
            <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-gray-100 transition-colors duration-300 group-hover:text-amber-100">
                    {number}
                </span>
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${category.iconBg} ${category.accent}`}>
                    <Icon className="h-5 w-5" />
                </span>
            </div>

            <span className={`mt-5 inline-block w-fit rounded-full ${category.iconBg} ${category.accent} px-3 py-1 text-[10px] font-bold tracking-wide`}>
                {category.title.toUpperCase()}
            </span>

            <h3 className="mt-4 text-lg font-bold leading-snug text-[#0B1B32]">
                {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">
                {service.description}
            </p>

            <span className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[#0B1B32] transition-colors duration-300 group-hover:text-[#FDC02F]">
                Explore Service
                <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Technical Support CTA                                                       */
/* -------------------------------------------------------------------------- */

function TechnicalSupportCTA() {
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
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#081426] px-6 py-10 lg:px-10">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 sm:flex-row">
                <span className="text-sm font-semibold text-gray-400">
                    &copy; {new Date().getFullYear()} PT. Servistama Pro Indonesia. All rights reserved.
                </span>
                <div className="flex items-center gap-6 text-xs font-semibold tracking-wide text-gray-400">
                    <Link href="/privacy" className="hover:text-[#FDC02F]">PRIVACY POLICY</Link>
                    <Link href="/terms" className="hover:text-[#FDC02F]">TERMS OF USE</Link>
                </div>
            </div>
        </footer>
    );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function Show({ category }) {
    const data = SERVICE_CATEGORIES[category];

    if (!data) {
        return (
            <>
                <Head title="Service Category Not Found" />
                <div className="flex min-h-screen flex-col bg-white">
                    <Navbar />
                    <main className="flex flex-1 flex-col items-center justify-center px-6 pt-16 text-center">
                        <h1 className="text-3xl font-extrabold text-[#0B1B32]">Category Not Found</h1>
                        <p className="mt-3 max-w-md text-gray-500">
                            The service category you are looking for does not exist or may
                            have been moved.
                        </p>
                        <Link
                            href="/services"
                            className="mt-8 flex items-center gap-2 rounded-full bg-[#FDC02F] px-6 py-3 text-xs font-bold tracking-wide text-[#0B1B32]"
                        >
                            BACK TO SERVICES
                            <IconArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </main>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={data.title} />

            <div className="min-h-screen bg-white">
                <Navbar />
                <CategoryHero category={data} />

                <main>
                    <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {data.services.map((service, index) => (
                                <ServiceCard
                                    key={service.title}
                                    service={service}
                                    index={index}
                                    category={data}
                                />
                            ))}
                        </div>
                    </section>

                    <TechnicalSupportCTA />
                </main>

                <Footer />
            </div>
        </>
    );
}
