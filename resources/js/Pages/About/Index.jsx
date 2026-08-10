import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import VisionMission from "./VisionMission";
import Management from "./Management";

/* ------------------------------------------------------------------ */
/* Inline SVG Icons                                                   */
/* ------------------------------------------------------------------ */

const IconAward = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.5-1.6 6.5L12 17l5.1 3-1.6-6.5" />
  </svg>
);

const IconEngineer = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="7" r="3.2" />
    <path d="M5 21c.6-4 3-6.4 7-6.4s6.4 2.4 7 6.4" />
    <path d="m9.5 8.5 1 1.2 1-1.6 1 1.6 1-1.2" />
  </svg>
);

const IconMap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M9 4 3.5 6.2v13.3L9 17l6 2.5 5.5-2.2V3.9L15 6.5 9 4Z" />
    <path d="M9 4v13M15 6.5V19.5" />
  </svg>
);

const IconGenuine = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconClock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.3 2" />
  </svg>
);

const IconMouse = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="7" y="3" width="10" height="17" rx="5" />
    <path d="M12 7v3" />
  </svg>
);

const IconCalendar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

const IconUsers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="8.5" cy="8" r="2.8" />
    <circle cx="16" cy="9" r="2.2" />
    <path d="M3 19c.6-3 2.7-4.6 5.5-4.6S13.4 16 14 19" />
    <path d="M14.5 14.6c2.3.1 4 1.6 4.5 4.4" />
  </svg>
);

const IconProject = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M8 2.5v3M16 2.5v3M3.5 9.5h17" />
    <path d="m8 14 2.5 2.5L16 12" />
  </svg>
);

const IconCheckBadge = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconGear = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9" />
  </svg>
);

const IconBuilding = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M8 7h1.5M8 11h1.5M8 15h1.5M14.5 7H16M14.5 11H16M14.5 15H16M9 21v-4h6v4" />
  </svg>
);

const IconIndustry = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M3 20V10l5 3.5V10l5 3.5V10l5 3.5V20H3Z" />
    <path d="M3 20h18" />
  </svg>
);

const IconFocus = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.4" />
  </svg>
);

const IconShieldSafety = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
  </svg>
);

const IconTrend = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M3 17 9.5 10.5 13.5 14.5 21 6" />
    <path d="M15 6h6v6" />
  </svg>
);

const IconPlay = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </svg>
);

const IconArrow = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Static content data                                                */
/* ------------------------------------------------------------------ */

const heroHighlights = [
  { icon: IconAward, title: "Authorized XCMG Partner", desc: "Official partner of XCMG" },
  { icon: IconEngineer, title: "Professional Engineers", desc: "Certified & experienced team" },
  { icon: IconMap, title: "Nationwide Service", desc: "Coverage across Indonesia" },
  { icon: IconGenuine, title: "Genuine Spare Parts", desc: "100% original & quality assured" },
  { icon: IconClock, title: "24/7 Support", desc: "Always ready to support you" },
];

const whoWeAreStats = [
  { icon: IconCalendar, value: "15+", label: "Years Experience" },
  { icon: IconUsers, value: "100+", label: "Professional Engineers" },
  { icon: IconProject, value: "500+", label: "Projects Completed" },
  { icon: IconCheckBadge, value: "100%", label: "Customer Commitment" },
];

const companyProfile = [
  { icon: IconBuilding, label: "Company Name", value: "PT Servistama Pro Indonesia" },
  { icon: IconCalendar, label: "Established", value: "2010" },
  { icon: IconIndustry, label: "Industry", value: "Heavy Equipment Services" },
  {
    icon: IconFocus,
    label: "Business Focus",
    value: "Service, Maintenance, Warranty, Spare Parts, & Support",
  },
  { icon: IconAward, label: "Authorized Partner", value: "XCMG (Xuzhou Construction Machinery Group)" },
  { icon: IconMap, label: "Coverage Area", value: "Nationwide - Indonesia" },
  { icon: IconPin, label: "Head Office", value: "Tangerang, Banten, Indonesia" },
];

const historyTimeline = [
  { year: "2010", title: "Company Founded" },
  { year: "2013", title: "Service Expansion" },
  { year: "2016", title: "Workshop Development" },
  { year: "2019", title: "National Project" },
  { year: "2022", title: "Authorized XCMG Partner" },
  { year: "2026", title: "Smart Mining Ecosystem" },
];

const companyStats = [
  { icon: IconCalendar, value: "15+", label: "Years Experience" },
  { icon: IconProject, value: "500+", label: "Projects Completed" },
  { icon: IconUsers, value: "100+", label: "Professional Engineers" },
  { icon: IconCheckBadge, value: "98%", label: "Customer Satisfaction" },
];

const milestones = [
  { year: "2010", title: "Foundation", desc: "SPI was established with a vision to deliver reliable heavy equipment services." },
  { year: "2013", title: "Expansion", desc: "Expanded service coverage and customer base across Indonesia." },
  { year: "2016", title: "National Scale", desc: "Strengthened workshop and support facilities nationwide." },
  { year: "2022", title: "Authorized XCMG", desc: "Officially became Authorized Service Partner of XCMG." },
  { year: "2024", title: "Digital Transformation", desc: "Implementing digital systems for operational excellence." },
  { year: "2026", title: "Smart Mining Ecosystem", desc: "Building the foundation for Smart Mining Service Ecosystem." },
];

const orgChart = [
  { title: "Engineering", icon: IconGear },
  { title: "Workshop", icon: IconBuilding },
  { title: "Marketing", icon: IconTrend },
  { title: "Finance", icon: IconShieldSafety },
  { title: "HR & GA", icon: IconUsers },
  { title: "IT Department", icon: IconFocus },
];

const cultureItems = [
  { icon: IconShieldSafety, title: "Safety First", desc: "Safety is our top priority" },
  { icon: IconTrend, title: "Continuous Improvement", desc: "We always strive to be better" },
  { icon: IconAward, title: "Customer Focus", desc: "Customer success is our mission" },
  { icon: IconBulb, title: "Innovation", desc: "We encourage new ideas and solutions" },
  { icon: IconUsers, title: "Respect", desc: "We value every individual" },
  { icon: IconProject, title: "Collaboration", desc: "We achieve more together" },
];

const governancePrinciples = [
  { icon: IconEye, title: "Transparency", desc: "We conduct business with openness and honesty" },
  { icon: IconCheckBadge, title: "Accountability", desc: "We take responsibility for every decision and action" },
  { icon: IconShieldSafety, title: "Responsibility", desc: "We are responsible to stakeholders and the environment" },
  { icon: IconAward, title: "Fairness", desc: "We treat everyone fairly and equally" },
];

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
      <Navbar />

      {/* ============================== HERO ============================== */}
      <section
        className="relative flex min-h-[750px] w-full items-center overflow-hidden md:min-h-[820px]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(11,18,32,0.92) 0%, rgba(15,43,92,0.82) 45%, rgba(15,43,92,0.45) 100%), url('https://placehold.co/1920x1000/0B1220/0B1220?text=+')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-block w-fit text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              About Us
            </span>
            <h1 className="text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl">
              Building Trust Through Professional Heavy Equipment Services
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
              PT Servistama Pro Indonesia is committed to delivering reliable,
              innovative, and high-quality heavy equipment services to support
              Indonesia&apos;s industrial growth.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#company-profile"
                className="group inline-flex items-center gap-2 rounded-md bg-[#FFC107] px-6 py-3 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e6ac00] hover:shadow-lg"
              >
                Company Profile
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
              >
                Our Services
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right column - glass card */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
              <ul className="space-y-5">
                {heroHighlights.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFC107]/15 text-[#FFC107]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-white/65">{item.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Floating vertical button */}
        <a
          href="#request-service"
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-2 rounded-l-md bg-[#FFC107] px-3 py-4 text-xs font-bold uppercase tracking-widest text-[#0B1220] shadow-lg transition-all duration-300 hover:px-4 md:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          Request Service
        </a>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70">
          <IconMouse className="h-6 w-6 animate-bounce" />
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            Scroll Down
          </span>
        </div>
      </section>

      {/* ============================== WHO WE ARE ============================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
          <div className="relative">
            <img
              src="https://placehold.co/700x560/0F2B5C/FFFFFF?text=SPI+Engineer"
              alt="SPI Engineer"
              className="w-full rounded-2xl object-cover shadow-xl"
            />
          </div>

          <div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Who We Are
            </span>
            <h2 className="text-2xl font-extrabold leading-tight text-[#0F2B5C] sm:text-3xl md:text-4xl">
              Trusted Heavy Equipment Service Company
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#64748B] md:text-base">
              Founded with a strong commitment to reliability and excellence, PT
              Servistama Pro Indonesia (SPI) provides integrated solutions in
              heavy equipment services, maintenance, spare parts, and technical
              support for mining, construction, and industrial sectors.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {whoWeAreStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i}>
                    <Icon className="h-6 w-6 text-[#FFC107]" />
                    <p className="mt-2 text-xl font-extrabold text-[#0F2B5C] sm:text-2xl">
                      {s.value}
                    </p>
                    <p className="text-xs text-[#64748B]">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== COMPANY PROFILE ============================== */}
      <section id="company-profile" className="bg-[#F8FAFC] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#0F2B5C] p-7 shadow-xl md:p-10">
            <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Profile
            </span>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {companyProfile.map((row, i) => {
                const Icon = row.icon;
                return (
                  <div key={i} className="flex items-start gap-3.5 border-b border-white/10 pb-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFC107]/15 text-[#FFC107]">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                        {row.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{row.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== COMPANY HISTORY ============================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-8 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
            Company History
          </span>

          <div className="relative">
            <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-[#E2E8F0] sm:block" />
            <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {historyTimeline.map((item, i) => {
                const isLast = i === historyTimeline.length - 1;
                return (
                  <div key={i} className="group relative flex flex-col items-center text-center">
                    <div
                      className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-300 group-hover:scale-110 ${
                        isLast
                          ? "border-[#FFC107] bg-[#FFC107] text-[#0B1220]"
                          : "border-[#0F2B5C] bg-white text-[#0F2B5C]"
                      }`}
                    >
                      <img
                        src={`https://placehold.co/48x48/${isLast ? "FFC107" : "0F2B5C"}/${
                          isLast ? "0B1220" : "FFFFFF"
                        }?text=${item.year.slice(2)}`}
                        alt={item.year}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <p
                      className={`mt-3 text-sm font-extrabold ${
                        isLast ? "text-[#FFC107]" : "text-[#0F2B5C]"
                      }`}
                    >
                      {item.year}
                    </p>
                    <p className="mt-1 max-w-[110px] text-xs text-[#64748B]">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== VISION MISSION (external) ============================== */}
      <VisionMission />

      {/* ============================== COMPANY STATISTICS ============================== */}
      <section
        className="relative overflow-hidden bg-[#0B1220] py-16 md:py-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(11,18,32,0.95), rgba(15,43,92,0.85)), url('https://placehold.co/1920x600/0B1220/0B1220?text=+')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="mb-8 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
            Company Statistics
          </span>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {companyStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="text-center sm:text-left">
                  <Icon className="mx-auto h-7 w-7 text-[#FFC107] sm:mx-0" />
                  <p className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== MILESTONE / ORG STRUCTURE / MANAGEMENT ===================== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Company Milestone */}
          <div>
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Milestone
            </span>
            <ol className="relative space-y-6 border-l-2 border-[#E2E8F0] pl-6">
              {milestones.map((m, i) => (
                <li key={i} className="group relative">
                  <span className="absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0F2B5C] bg-white transition-colors duration-300 group-hover:bg-[#FFC107] group-hover:border-[#FFC107]" />
                  <p className="text-xs font-extrabold text-[#0F2B5C]">{m.year}</p>
                  <p className="mt-0.5 text-sm font-bold text-[#0F2B5C]">{m.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#64748B]">{m.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Organization Structure */}
          <div>
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Organization Structure
            </span>
            <div className="flex flex-col items-center">
              <div className="w-full rounded-md bg-[#0F2B5C] py-2.5 text-center text-xs font-bold text-white">
                COMMISSIONER
              </div>
              <span className="my-1 h-4 w-0.5 bg-[#E2E8F0]" />
              <div className="w-full rounded-md bg-[#FFC107] py-2.5 text-center text-xs font-bold text-[#0B1220]">
                PRESIDENT DIRECTOR
              </div>
              <span className="my-1 h-4 w-0.5 bg-[#E2E8F0]" />
              <div className="w-full rounded-md bg-[#0F2B5C] py-2.5 text-center text-xs font-bold text-white">
                OPERATIONS DIRECTOR
              </div>
              <span className="my-1 h-4 w-0.5 bg-[#E2E8F0]" />

              <div className="relative w-full">
                <span className="absolute left-0 right-0 top-0 h-0.5 bg-[#E2E8F0]" />
                <div className="grid grid-cols-3 gap-x-2 gap-y-4 pt-4 sm:grid-cols-6 lg:grid-cols-3">
                  {orgChart.map((dept, i) => {
                    const Icon = dept.icon;
                    return (
                      <div key={i} className="flex flex-col items-center text-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F2B5C]/5 text-[#0F2B5C] transition-colors duration-300 hover:bg-[#0F2B5C] hover:text-white">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <p className="mt-1.5 text-[10px] font-bold leading-tight text-[#0F2B5C]">
                          {dept.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Management Team (external) */}
          <div>
            <Management />
          </div>
        </div>
      </section>

      {/* ============================== COMPANY CULTURE + GOVERNANCE ============================== */}
      <section className="bg-[#F8FAFC] py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Culture */}
          <div>
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Company Culture
            </span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {cultureItems.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="group flex flex-col items-center rounded-xl border border-[#E2E8F0] bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F2B5C]/5 text-[#0F2B5C] transition-colors duration-300 group-hover:bg-[#FFC107]/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-2.5 text-xs font-bold leading-tight text-[#0F2B5C]">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[10px] leading-snug text-[#64748B]">{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Governance */}
          <div>
            <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
              Corporate Governance
            </span>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-7">
              <p className="mb-6 text-sm leading-relaxed text-[#64748B]">
                We are committed to implementing Good Corporate Governance (GCG)
                principles in every aspect of our business.
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {governancePrinciples.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFC107]/15 text-[#0F2B5C]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#0F2B5C]">{g.title}</p>
                        <p className="mt-0.5 text-xs leading-snug text-[#64748B]">{g.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== CTA BANNER ============================== */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Left - dark image with play */}
        <div
          className="relative flex min-h-[280px] items-center overflow-hidden px-8 py-14 sm:px-12"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(11,18,32,0.75), rgba(11,18,32,0.9)), url('https://placehold.co/960x480/0B1220/0B1220?text=+')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="max-w-md text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl md:text-3xl">
              Building The Future Of Heavy Equipment Services
            </h3>
            <p className="mt-3 text-sm font-semibold text-[#FFC107]">
              Menjadi fondasi menuju Smart Mining Service Ecosystem.
            </p>
            <button
              type="button"
              aria-label="Play company video"
              className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 text-white transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#0B1220]"
            >
              <IconPlay className="ml-1 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right - yellow */}
        <div
          className="relative flex min-h-[280px] items-center overflow-hidden bg-[#FFC107] px-8 py-14 sm:px-12"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(255,193,7,0.35), rgba(255,193,7,0.92)), url('https://placehold.co/960x480/FFC107/FFC107?text=+')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h3 className="max-w-sm text-xl font-extrabold uppercase leading-tight text-[#0B1220] sm:text-2xl md:text-3xl">
              Let&apos;s Build A Better Future Together
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#0B1220]/80">
              We are ready to support your business with our best services and
              solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-[#0B1220] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F2B5C] hover:shadow-lg"
              >
                Contact Us
                <IconArrow className="h-4 w-4" />
              </a>
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-md border-2 border-[#0B1220] px-6 py-3 text-sm font-bold text-[#0B1220] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B1220] hover:text-white"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}