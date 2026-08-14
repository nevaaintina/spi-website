import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

// TODO: Replace with official SPI ESG & HSE hero image.
const heroImage = '/images/hero-hse.png';
// TODO: Replace with official SPI ESG & HSE hero video (optional, falls back to heroImage).
const heroVideo = '/videos/esg-hse-hero.mp4';

const pillars = [
    {
        title: 'ENVIRONMENTAL',
        description: 'Sustainable Operations for Our Planet',
        type: 'environmental',
    },
    {
        title: 'SOCIAL',
        description: 'Positive Social Impact',
        type: 'social',
    },
    {
        title: 'GOVERNANCE',
        description: 'Responsible Governance',
        type: 'governance',
    },
    {
        title: 'HEALTH, SAFETY & ENVIRONMENT',
        description: 'Zero Harm Culture for People and Environment',
        type: 'hse',
    },
];

const pillarStyles = {
    environmental: 'text-[#65C96A]',
    social: 'text-white',
    governance: 'text-white',
    hse: 'text-[#1683FF]',
};

const LeafIcon = ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
        <path d="M5 21c0-8.5 5.5-14 14-14 0 8.5-5.5 14-14 14Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 21c3-3 6-7 9-11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PeopleIcon = ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
        <circle cx="9" cy="8" r="2.6" />
        <circle cx="16.5" cy="9" r="2.1" />
        <path d="M3.5 19c.6-3 2.7-4.6 5.5-4.6s4.9 1.6 5.5 4.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.8 14.7c2.2.2 3.8 1.7 4.2 4.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const GovernanceIcon = ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
        <path d="M4 21h16" strokeLinecap="round" />
        <path d="M6 21V10M10 21V10M14 21V10M18 21V10" strokeLinecap="round" />
        <path d="M3.5 10 12 4l8.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ShieldIcon = ({ className = 'h-6 w-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
        <path d="M12 3.5 19 6v5.2c0 4.5-2.9 7.6-7 8.8-4.1-1.2-7-4.3-7-8.8V6l7-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 9v4M12 15.5h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRightIcon = ({ className = 'h-4 w-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
        <path d="M4 12h16M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DocumentIcon = ({ className = 'h-4 w-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
        <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V4a.5.5 0 0 1 .5-.5Z" strokeLinejoin="round" />
        <path d="M14 3.5V8h4" strokeLinejoin="round" />
        <path d="M9.5 13h5M9.5 16h5" strokeLinecap="round" />
    </svg>
);

const ArrowDownIcon = ({ className = 'h-4 w-4' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
        <path d="M12 4v15M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const iconByType = {
    environmental: LeafIcon,
    social: PeopleIcon,
    governance: GovernanceIcon,
    hse: ShieldIcon,
};

export default function Sustainability() {
        // Lightweight parallax: background + HUD shift slightly with the pointer.
        // Headline and text stay fixed, per brief.
            const [offset, setOffset] = useState({ x: 0, y: 0 });

            useEffect(() => {
                const handleMouseMove = (e) => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 2;
                    const y = (e.clientY / window.innerHeight - 0.5) * 2;
                    setOffset({ x, y });
                };
                window.addEventListener('mousemove', handleMouseMove);
                return () => window.removeEventListener('mousemove', handleMouseMove);
            }, []);

    return (
        <main>
            <section className="relative flex min-h-screen w-full flex-col justify-between bg-[#07111F]">

                <Navbar />

                {/* BACKGROUND - Posisi Pas & Kecerahan Pas */}
<div className="absolute inset-0 flex items-center justify-center bg-[#07111F]">
    <img
        src={heroImage}
        alt="Heavy equipment mining operation"
        className="h-full w-full object-contain object-center scale-110"
        style={{ filter: 'brightness(1.75) contrast(1.05)' }}
    />
</div>

<div className="absolute inset-0 bg-[#07111F]/30" />
<div className="absolute inset-0 bg-radial from-black/60 via-black/20 to-transparent pointer-events-none" />

                {/* DIGITAL DECORATION */}
                <div
    className="pointer-events-none absolute inset-0 hidden md:block"
    aria-hidden="true"
>
                    {/* diagonal accent line, upper right */}
                    <svg className="absolute right-[6%] top-0 h-40 w-40 text-[#1683FF]/40" viewBox="0 0 200 200" fill="none">
                        <path d="M0 130 L130 0" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {/* HUD / radar circle near the engineer */}
                    <svg className="absolute right-[15%] top-[6%] h-52 w-52 text-[#1683FF]/25 drop-shadow-[0_0_12px_rgba(22,131,255,0.25)]" viewBox="0 0 200 200" fill="none">
                        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
                        <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
                        <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5" />
                        <circle cx="100" cy="100" r="2" fill="currentColor" />
</svg>
                    {/* thin network line, bottom */}
                    <svg className="absolute bottom-28 left-0 h-px w-full text-[#1683FF]/20" viewBox="0 0 1000 1" preserveAspectRatio="none">
                        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>

                {/* HERO CONTENT */}
               <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-30 pb-2 text-center sm:px-8">
                    
                    {/* EYEBROW */}
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-sm">
                        The Future of Smart Heavy Equipment Service
                    </p>

                    {/* ESG & HSE TITLE */}
                    <h1 className="mt-2 font-black uppercase leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-7xl">
                        <span className="bg-gradient-to-b from-[#8AE08F] to-[#65C96A] bg-clip-text text-transparent">ESG</span>{' '}
                        <span className="text-white">&amp;</span>{' '}
                        <span className="text-[#1683FF]">HSE</span>
                    </h1>

                    {/* SUBTITLE */}
                    <h2 className="mt-6 text-2xl font-bold leading-snug text-white md:text-3xl lg:text-4xl">
                        Building a Safer, Smarter
                        <br className="hidden sm:block" /> and More Sustainable Future
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                        We integrate Environmental responsibility, Social impact, Governance
                        excellence, and Health &amp; Safety culture into every service we
                        deliver.
                    </p>

                    {/* TAGLINE - subtle, below description */}
                    <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white/50 sm:text-xs">
                        Smart Service. Maximum Uptime. Trusted Performance.
                    </p>

                    {/* PILLARS */}
                    <div className="mt-10 grid w-full max-w-5xl grid-cols-2 gap-y-6 sm:gap-y-8 md:flex md:flex-row md:items-start md:justify-center md:gap-0">
                        {pillars.map((pillar, index) => {
                            const Icon = iconByType[pillar.type];
                            const colorClass = pillarStyles[pillar.type];
                            return (
                                <div
                                    key={pillar.type}
                                    className={`group flex items-start gap-3 rounded-lg px-4 py-2 text-left transition-colors duration-300 hover:bg-white/5 md:flex-1 md:justify-center md:px-6 ${
                                        index !== pillars.length - 1 ? 'md:border-r md:border-white/20' : ''
                                    }`}
                                >
                                    <span className={`mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
                                        <Icon />
                                    </span>
                                    <div>
                                        <p className={`text-xs font-bold uppercase tracking-wide sm:text-sm ${colorClass}`}>
                                            {pillar.title}
                                        </p>
                                        <p className="mt-0.5 text-xs text-white/80 sm:text-sm">{pillar.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                        <a
                            href="#esg-content"
                            className="group inline-flex items-center gap-2 rounded-md bg-[#F5C400] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#07111F] shadow-lg shadow-black/20 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#ffd21f] hover:brightness-105 hover:shadow-[#F5C400]/30"
                        >
                            Explore ESG &amp; HSE
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                                <ArrowRightIcon />
                            </span>
                        </a>
                        <a
                            href="#sustainability-report"
                            className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-all duration-300 ease-out hover:border-[#1683FF] hover:bg-white/10"
                        >
                            View Sustainability Report
                            <DocumentIcon />
                        </a>
                    </div>
                </div>

                {/* SCROLL INDICATOR */}
                <div className="relative z-10 flex justify-center pb-8">
                    <a
                        href="#esg-content"
                        aria-label="Scroll down"
                        className="flex h-11 w-11 animate-bounce items-center justify-center rounded-full border border-white/40 bg-white/5 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#1683FF] hover:text-[#1683FF]"
                    >
                        <ArrowDownIcon />
                    </a>
                </div>
            </section>
        </main>
    );
}
