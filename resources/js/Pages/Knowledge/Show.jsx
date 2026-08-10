import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

/* =========================================================
   INLINE SVG ICONS
   ========================================================= */
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

const IconDocument = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v4h4" />
        <path d="M9 12h6M9 15.5h6M9 9h2" />
    </svg>
);

const IconArrowRight = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

const IconArrowLeft = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
);

const IconLightbulb = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2.2h5.2c0-1 .4-1.7 1-2.2A6 6 0 0 0 12 3z" />
    </svg>
);

const IconCheckCircle = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.2 2.2 4.8-5.4" />
    </svg>
);

const IconWrench = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
    </svg>
);

/* =========================================================
   STATIC DATA
   (In production this would come from Inertia page props)
   ========================================================= */
const article = {
    category: 'MAINTENANCE TIPS',
    title: '5 Praktik Maintenance Penting untuk Heavy Equipment',
    date: '20 Mei 2025',
    readTime: '6 Menit',
    tag: 'Technical Insight',
    image: '/images/knowledge/article-01-maintenance-tips-hero.jpg',
    intro:
        'Maintenance yang konsisten adalah fondasi dari operasional heavy equipment yang andal. Tanpa strategi perawatan yang tepat, perusahaan berisiko mengalami downtime tidak terduga, biaya perbaikan yang membengkak, hingga penurunan umur pakai alat secara signifikan.',
    sections: [
        {
            number: '01',
            title: 'Lakukan Preventive Maintenance',
            body: 'Preventive maintenance dilakukan secara terjadwal untuk mencegah kerusakan sebelum terjadi. Inspeksi rutin pada komponen kritikal membantu mengidentifikasi potensi masalah lebih awal, sehingga alat tetap beroperasi pada performa optimal.',
            points: [
                'Susun jadwal inspeksi berdasarkan jam operasional alat',
                'Catat setiap temuan pada laporan maintenance digital',
                'Libatkan operator dalam pengecekan harian',
            ],
        },
        {
            number: '02',
            title: 'Periksa Hydraulic System',
            body: 'Hydraulic system merupakan salah satu komponen paling vital pada heavy equipment. Kebocoran, tekanan tidak stabil, atau kontaminasi fluida dapat menyebabkan penurunan performa yang drastis apabila tidak segera ditangani.',
            points: [
                'Periksa tekanan hydraulic secara berkala',
                'Pastikan tidak ada kebocoran pada seal dan hose',
                'Ganti hydraulic fluid sesuai rekomendasi pabrikan',
            ],
        },
        {
            number: '03',
            title: 'Gunakan Lubricant yang Tepat',
            body: 'Pemilihan lubricant yang sesuai dengan spesifikasi alat akan mengurangi gesekan antar komponen, menurunkan suhu operasional, dan memperpanjang umur pakai part mekanis.',
            points: [
                'Gunakan lubricant sesuai rekomendasi manufaktur',
                'Perhatikan interval penggantian secara berkala',
                'Simpan lubricant pada kondisi bebas kontaminasi',
            ],
        },
        {
            number: '04',
            title: 'Monitor Kondisi Mesin',
            body: 'Condition monitoring berbasis data memungkinkan tim engineering untuk memantau kondisi mesin secara real-time, sehingga anomali dapat terdeteksi jauh sebelum menyebabkan kerusakan besar.',
            points: [
                'Pantau suhu engine dan tekanan oli secara berkala',
                'Manfaatkan sensor IoT untuk data real-time',
                'Analisis tren data untuk prediksi maintenance',
            ],
        },
        {
            number: '05',
            title: 'Dokumentasikan Maintenance',
            body: 'Dokumentasi yang rapi mempermudah tim engineering dalam melacak riwayat perawatan, mengevaluasi pola kerusakan, dan merencanakan maintenance berikutnya secara lebih akurat.',
            points: [
                'Gunakan sistem digital untuk pencatatan maintenance',
                'Arsipkan riwayat perbaikan setiap unit alat',
                'Evaluasi data secara berkala bersama tim teknis',
            ],
        },
    ],
    conclusion:
        'Menerapkan kelima praktik ini secara konsisten akan membantu perusahaan menjaga keandalan heavy equipment, menekan biaya perbaikan yang tidak terduga, dan memaksimalkan uptime operasional dalam jangka panjang.',
};

const relatedArticles = [
    {
        number: '02',
        category: 'HYDRAULIC SYSTEM',
        title: 'Memahami Performa Hydraulic System dan Kerusakan yang Sering Terjadi',
        readTime: '7 MENIT',
        date: '18 MEI 2025',
        image: '/images/knowledge/article-02-hydraulic-system.jpg',
        slug: 'performa-hydraulic-system-heavy-equipment',
    },
    {
        number: '03',
        category: 'ENGINE MAINTENANCE',
        title: 'Panduan Engine Maintenance untuk Menjaga Keandalan Alat',
        readTime: '6 MENIT',
        date: '15 MEI 2025',
        image: '/images/knowledge/article-03-engine-maintenance.jpg',
        slug: 'panduan-engine-maintenance-heavy-equipment',
    },
    {
        number: '04',
        category: 'LUBRICATION GUIDE',
        title: 'Memilih Lubricant yang Tepat untuk Heavy Equipment',
        readTime: '5 MENIT',
        date: '12 MEI 2025',
        image: '/images/knowledge/article-04-lubrication-guide.jpg',
        slug: 'memilih-lubricant-tepat-heavy-equipment',
    },
];

/* =========================================================
   PAGE COMPONENT
   ========================================================= */
export default function Show() {
    return (
        <>
            <Head title={`${article.title} - Knowledge Center`} />
            <Navbar />

            <main>
                {/* ================= ARTICLE HERO ================= */}
                <section className="bg-white px-6 pb-10 pt-12 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[960px]">
                        <Link
                            href="/knowledge"
                            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition-colors duration-300 hover:text-[#0F2B5C]"
                        >
                            <IconArrowLeft className="h-4 w-4" />
                            Kembali ke Knowledge Center
                        </Link>

                        <span className="text-xs font-bold tracking-[0.2em] text-[#FFC107]">{article.category}</span>
                        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#0F2B5C] sm:text-4xl lg:text-[2.75rem]">
                            {article.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#64748B]">
                            <span className="flex items-center gap-1.5">
                                <IconCalendar className="h-4 w-4" />
                                {article.date}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-[#E2E8F0]" />
                            <span className="flex items-center gap-1.5">
                                <IconClock className="h-4 w-4" />
                                {article.readTime}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-[#E2E8F0]" />
                            <span className="flex items-center gap-1.5">
                                <IconDocument className="h-4 w-4" />
                                {article.tag}
                            </span>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 max-w-[1100px] overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[460px]"
                        />
                    </div>
                </section>

                {/* ================= ARTICLE CONTENT ================= */}
                <section className="bg-white px-6 py-12 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[820px]">
                        <p className="text-lg leading-relaxed text-[#334155]">{article.intro}</p>

                        {article.sections.map((section, index) => (
                            <div key={section.number} className="mt-12">
                                <div className="flex items-start gap-4">
                                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#0F2B5C] text-sm font-extrabold text-[#FFC107]">
                                        {section.number}
                                    </span>
                                    <h2 className="pt-1 text-xl font-bold text-[#0F2B5C] sm:text-2xl">{section.title}</h2>
                                </div>

                                <p className="mt-4 pl-[52px] text-base leading-relaxed text-[#334155]">
                                    {section.body}
                                </p>

                                <ul className="mt-4 space-y-2.5 pl-[52px]">
                                    {section.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2.5 text-[#334155]">
                                            <IconCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FFC107]" />
                                            <span className="text-sm leading-relaxed sm:text-base">{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Technical callout after first section */}
                                {index === 0 && (
                                    <div className="mt-8 flex gap-4 rounded-xl bg-[#0F2B5C] p-6 sm:p-7">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFC107]/15 text-[#FFC107]">
                                            <IconLightbulb className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold tracking-[0.15em] text-[#FFC107]">
                                                TECHNICAL INSIGHT
                                            </p>
                                            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
                                                Preventive maintenance yang konsisten dapat membantu mengurangi risiko
                                                downtime dan memperpanjang umur operasional heavy equipment.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="mt-12 border-t border-[#E2E8F0] pt-8">
                            <h2 className="text-xl font-bold text-[#0F2B5C]">Kesimpulan</h2>
                            <p className="mt-3 text-base leading-relaxed text-[#334155]">{article.conclusion}</p>
                        </div>
                    </div>
                </section>

                {/* ================= RELATED ARTICLES ================= */}
                <section className="bg-[#F8FAFC] px-6 py-16 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-[1440px]">
                        <div className="mb-10 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#FFC107]" />
                            <h2 className="text-2xl font-bold text-[#0F2B5C] sm:text-3xl">Related Knowledge</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedArticles.map((related) => (
                                <article
                                    key={related.number}
                                    className="group overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC107] hover:shadow-lg"
                                >
                                    <Link href={`/knowledge/${related.slug}`} className="block">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={related.image}
                                                alt={related.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <span className="absolute left-4 top-4 rounded-md bg-[#FFC107] px-2.5 py-1 text-xs font-extrabold text-[#0F2B5C]">
                                                {related.number}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <span className="text-xs font-bold tracking-[0.12em] text-[#0F2B5C]">
                                                {related.category}
                                            </span>
                                            <h3 className="mt-2 text-base font-bold leading-snug text-[#0F2B5C]">
                                                {related.title}
                                            </h3>
                                            <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                                                <div className="flex items-center gap-3 text-xs font-semibold text-[#64748B]">
                                                    <span className="flex items-center gap-1">
                                                        <IconClock className="h-3.5 w-3.5" />
                                                        {related.readTime}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <IconCalendar className="h-3.5 w-3.5" />
                                                        {related.date}
                                                    </span>
                                                </div>
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FAFC] text-[#0F2B5C] transition-all duration-300 group-hover:bg-[#FFC107]">
                                                    <IconArrowRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= CTA SECTION ================= */}
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

                    <div className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#FFC107]/40 text-[#FFC107]">
                                <IconWrench className="h-5 w-5" />
                            </span>
                            <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                                Butuh Dukungan Teknis untuk Alat Anda?
                            </h2>
                            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                                Terhubung dengan tim service expert kami untuk mendapatkan dukungan maintenance,
                                diagnostic, warranty, dan solusi heavy equipment profesional.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-shrink-0 sm:flex-row">
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
                </section>
            </main>
        </>
    );
}
