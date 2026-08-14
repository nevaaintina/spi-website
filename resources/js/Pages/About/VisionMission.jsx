import React from "react";

const IconTarget = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const IconTruck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <rect x="1.5" y="8" width="12" height="8" rx="1" />
    <path d="M13.5 11h4l3 3v2h-7v-5Z" />
    <circle cx="6" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

const IconHandshake = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M2 12.5 6 9l3 2.2 3-2.2 3 2 4-3.5" />
    <path d="M2 12.5 7 17l2-1.5 2 1.5 2-1.5 2 1.5 5-4" />
  </svg>
);

const IconShieldCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="M12 3 4.5 6v6c0 4.5 3.2 7.7 7.5 9 4.3-1.3 7.5-4.5 7.5-9V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconStar = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <path d="m12 3 2.6 5.6 6.1.6-4.6 4.2 1.3 6.1L12 16.6 6.6 19.5l1.3-6.1L3.3 9.2l6.1-.6L12 3Z" />
  </svg>
);

const IconGear = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9" />
  </svg>
);

const IconUsersGroup = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
    <circle cx="8.5" cy="8" r="2.8" />
    <circle cx="16" cy="9" r="2.2" />
    <path d="M3 19c.6-3 2.7-4.6 5.5-4.6S13.4 16 14 19" />
    <path d="M14.5 14.6c2.3.1 4 1.6 4.5 4.4" />
  </svg>
);

const IconQuote = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.6 6.4C6.4 7.6 4.5 10 4.5 13.2c0 2.7 1.7 4.4 3.8 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.2-3-2.9-3.1-.1-1.5.9-3 2.9-3.8L9.6 6.4Zm9 0C15.4 7.6 13.5 10 13.5 13.2c0 2.7 1.7 4.4 3.8 4.4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.2-3-2.9-3.1-.1-1.5.9-3 2.9-3.8l-1-1Z" />
  </svg>
);

const missions = [
  { icon: IconTruck, text: "Deliver reliable and high-quality services" },
  { icon: IconHandshake, text: "Provide innovative solutions for our customers" },
  { icon: IconShieldCheck, text: "Ensure safety and environmental sustainability" },
  { icon: IconUsersGroup, text: "Build long-term partnership with integrity" },
  { icon: IconGear, text: "Develop professional and competent human resources" },
  { icon: IconStar, text: "Create value for stakeholders and the nation" },
];

const coreValues = [
  { icon: IconStar, title: "Integrity", desc: "Uphold strong moral principles" },
  { icon: IconGear, title: "Professionalism", desc: "We work with competence and responsibility" },
  { icon: IconShieldCheck, title: "Safety", desc: "We prioritize safety in every activity" },
  { icon: IconTarget, title: "Commitment", desc: "We are committed to delivering the best" },
];

export default function VisionMission() {
  return (
    <section className="bg-[#F8FAFC] pt-8 pb-16 md:pt-10 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          
          {/* 1. VISION */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0F2B5C] p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107]/50 hover:shadow-2xl hover:shadow-[#0F2B5C]/30">
            {/* Background Glow Effect */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#FFC107]/10 blur-2xl transition-all duration-500 group-hover:bg-[#FFC107]/20" />

            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFC107] text-[#0F2B5C] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FFC107]/30">
                <IconTarget className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Our Vision
              </h3>
              <p className="text-sm leading-relaxed text-white/90">
                To become Indonesia&apos;s leading heavy equipment service company that
                provides innovative, reliable, and sustainable industrial solutions.
              </p>
            </div>
          </div>

          {/* 2. MISSION */}
          <div className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#0F2B5C]/10">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Our Mission
              </h3>
              <ul className="space-y-3.5">
                {missions.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0F2B5C]/5 text-[#0F2B5C] transition-colors duration-300 group-hover:bg-[#FFC107] group-hover:text-[#0F2B5C]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-medium leading-snug text-[#64748B] transition-colors duration-300 group-hover:text-[#0F2B5C]">
                        {m.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* 3. CORE VALUES */}
          <div className="group flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-[#0F2B5C]/10">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-3.5">
                {coreValues.map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-transparent bg-[#F8FAFC] p-2.5 transition-all duration-300 hover:border-[#FFC107]/40 hover:bg-[#0F2B5C]/5"
                    >
                      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F2B5C]/10 text-[#0F2B5C] transition-all duration-300 group-hover:bg-[#0F2B5C] group-hover:text-[#FFC107]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-bold text-[#0F2B5C]">{v.title}</p>
                      <p className="mt-0.5 text-[10px] leading-snug text-[#64748B]">
                        {v.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. BUSINESS PHILOSOPHY */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0F2B5C] p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#FFC107]/50 hover:shadow-2xl hover:shadow-[#0F2B5C]/30">
            {/* Background Glow Effect */}
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#FFC107]/10 blur-2xl transition-all duration-500 group-hover:bg-[#FFC107]/20" />

            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
                Business Philosophy
              </h3>
              <IconQuote className="mb-4 h-8 w-8 text-[#FFC107] transition-transform duration-300 group-hover:scale-110" />
              <p className="text-sm italic leading-relaxed text-white/90">
                &ldquo;Delivering Excellence Through Quality, Integrity, Innovation, and
                Customer Satisfaction.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}