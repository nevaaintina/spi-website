import React from "react";

const IconLinkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function Management() {
  const members = [
    {
      name: "Andi Wibowo",
      title: "Engineering",
      image: "/images/pa-adie.png",
      linkedin: "#",
      offset: "",
      hoverClass: "hover:-translate-y-2",
    },
    {
      name: "Dedi Warman",
      title: "Commissioner / President Director",
      image: "/images/pa-aji.png",
      linkedin: "#",
      offset: "sm:-translate-y-8",
      hoverClass: "hover:sm:-translate-y-10",
    },
    {
      name: "Riza Mahendra",
      title: "Marketing",
      image: "/images/pa-yuda.png",
      linkedin: "#",
      offset: "",
      hoverClass: "hover:-translate-y-2",
    },
  ];

  return (
    <div className="w-full pt-8">
      <span className="mb-6 block text-xs font-bold uppercase tracking-wider text-[#FFC107]">
        MANAGEMENT TEAM
      </span>

      {/* Grid 3 Kolom Full Width */}
      <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-3 md:gap-8 lg:gap-10 w-full">
        {members.map((member, idx) => (
          <div
            key={idx}
            className={`group rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md transition-all duration-300 hover:border-[#FFC107] hover:shadow-2xl hover:shadow-amber-500/10 ${member.offset} ${member.hoverClass}`}
          >
            {/* Frame Foto Disesuaikan Tinggi dan Posisinya */}
            <div className="relative h-[380px] w-full overflow-hidden rounded-xl bg-slate-100">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/350x500?text=Photo";
                }}
              />
            </div>

            {/* Info Nama & Title */}
            <div className="mt-3.5 flex items-center justify-between px-1 pb-1">
              <div className="overflow-hidden pr-2">
                <h4 className="truncate text-sm font-extrabold text-[#0F2B5C] transition-colors duration-300 group-hover:text-[#FFC107]">
                  {member.name}
                </h4>
                <p className="truncate text-xs font-medium text-slate-500">
                  {member.title}
                </p>
              </div>

              <a
                href={member.linkedin}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-[#0077b5] hover:text-white"
                title="LinkedIn Profile"
              >
                <IconLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}