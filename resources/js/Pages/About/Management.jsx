import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.86V21h-4v-5.6c0-1.34-.02-3.07-1.9-3.07-1.9 0-2.2 1.44-2.2 2.97V21h-4V9Z" />
  </svg>
);

const team = [
  {
    name: "Dedi Wardhana",
    role: "President Director",
    photo: "https://placehold.co/400x400/0F2B5C/FFFFFF?text=DW",
    linkedin: "https://linkedin.com/in/dedi-wardhana",
  },
  {
    name: "Suryadi Kurniawan",
    role: "Operations Director",
    photo: "https://placehold.co/400x400/0F2B5C/FFFFFF?text=SK",
    linkedin: "https://linkedin.com/in/suryadi-kurniawan",
  },
  {
    name: "Andi Wibowo",
    role: "Engineering Manager",
    photo: "https://placehold.co/400x400/0F2B5C/FFFFFF?text=AW",
    linkedin: "https://linkedin.com/in/andi-wibowo",
  },
  {
    name: "Riza Maulana",
    role: "Marketing Manager",
    photo: "https://placehold.co/400x400/0F2B5C/FFFFFF?text=RM",
    linkedin: "https://linkedin.com/in/riza-maulana",
  },
];

export default function Management() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c]">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. MAIN CONTENT (Menggunakan desain asli Anda dengan tambahan wrapper section agar pas dipandang) */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-[#0F2B5C]">Executive Leadership</h1>
          <p className="text-xs text-slate-500 mt-2">Get to know the brilliant minds driving our vision forward.</p>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-wider text-[#FFC107]">
            Management Team
          </p>

          <div className="grid grid-cols-2 gap-4">
            {team.map((person, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#F8FAFC]">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex items-center justify-between px-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#0F2B5C]">
                      {person.name}
                    </p>
                    <p className="truncate text-xs text-[#64748B]">{person.role}</p>
                  </div>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn ${person.name}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F2B5C]/5 text-[#0F2B5C] transition-all duration-300 hover:bg-[#0F2B5C] hover:text-white hover:scale-110"
                  >
                    <IconLinkedIn className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
}