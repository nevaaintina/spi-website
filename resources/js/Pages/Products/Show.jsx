import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

/* =========================================================
    PRODUCT DATA (8 PRODUK LENGKAP)
========================================================= */
const productList = [
  {
    slug: "excavator-xe1250",
    name: "Mining Excavator",
    model: "XE 1250",
    category: "Mining Equipment",
    categories: ["Excavator", "Mining Equipment"],
    image: "/images/XE1250.png",
    description:
      "XCMG Mining Excavator XE1250 menggabungkan teknologi terkini dengan konfigurasi berkelas tinggi, menawarkan efisiensi kerja tinggi, tenaga penggalian kuat, serta konsumsi bahan bakar yang lebih rendah.",
    mainImage: "/images/XE1250.png",
    gallery: ["/images/XE1250.png"],
    specifications: [
      { label: "Model", value: "XE 1250" },
      { label: "Berat Operasi", value: "115.000 kg" },
      { label: "Daya Terukur", value: "567 kW / 1800 rpm" },
      { label: "Kapasitas Bucket", value: "5.2 - 8.5 m³" },
      { label: "Gaya Tarik Maksimum", value: "746 kN" },
      { label: "Gaya Gali Bucket", value: "597 kN" },
      { label: "Gaya Gali Lengan", value: "470 kN" },
      { label: "Tinggi Gali Maksimum", value: "12.500 mm" },
      { label: "Radius Gali Maksimum", value: "13.680 mm" },
    ],
    stats: [
      { title: "Berat Operasi", value: "115.000 kg", icon: "weight" },
      { title: "Kapasitas Bucket", value: "5.2 - 8.5 m³", icon: "bucket" },
      { title: "Daya Mesin", value: "567 kW", icon: "engine" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Mesin Cummins", subtitle: "Bertenaga & Efisien", icon: "award" },
      { title: "Fitur Keselamatan", subtitle: "Kabin FOPS & Kamera", icon: "shield" },
      { title: "Pelumasan Otomatis", subtitle: "Auto Lubrication", icon: "gear" },
      { title: "Layanan 24/7", subtitle: "Dukungan Teknis", icon: "clock" },
    ],
    features: [
      "Kabin FOPS dilengkapi guardrail, emergency shutdown switch, alarm lamp, dan kamera pemantau untuk visibilitas & keselamatan maksimal.",
      "Sistem pelumasan otomatis (Auto Lubrication) standar untuk menghemat waktu pengisian grease dan menjaga efisiensi perawatan.",
      "Ditenagai mesin Cummins impor original bertenaga tinggi, ramah lingkungan, efisien bahan bakar, dan rendah kebisingan.",
      "Menggunakan komponen & suku cadang dari merek global terkemuka untuk durabilitas di medan pertambangan berat.",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "dump-truck-xde130",
    name: "Mining Dump Truck",
    model: "XDE 130",
    category: "Dump Truck",
    categories: ["Dump Truck", "Mining Equipment"],
    image: "/images/XDE130.png",
    description:
      "XDE130 dirancang untuk memberikan efisiensi tinggi dalam aktivitas hauling di area pertambangan skala besar dengan kapasitas angkut hingga 120 ton dan teknologi penggerak canggih.",
    mainImage: "/images/XDE130.png",
    gallery: ["/images/XDE130.png"],
    specifications: [
      { label: "Model", value: "XDE 130" },
      { label: "Muatan Maksimal", value: "120.000 kg (120 Ton)" },
      { label: "Daya Terukur", value: "895 kW / 1900 rpm" },
      { label: "Kapasitas Bucket", value: "73 m³" },
      { label: "Kemampuan Menanjak Maksimum", value: "20%" },
      { label: "Berat Kosong", value: "85.000 kg" },
      { label: "Berat Kendaraan Total", value: "205.000 kg" },
      { label: "Kecepatan Maksimum", value: "50 km/jam" },
      { label: "Torsi Maksimum", value: "4678 Nm / 1300 rpm" },
    ],
    stats: [
      { title: "Kapasitas Muat", value: "120 Ton", icon: "weight" },
      { title: "Kecepatan Maks", value: "50 km/h", icon: "bucket" },
      { title: "Daya Mesin", value: "895 kW", icon: "engine" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Kapasitas Ekstra", subtitle: "Muatan 120 Ton", icon: "award" },
      { title: "Efisiensi Daya", subtitle: "Hemat Bahan Bakar", icon: "clock" },
      { title: "Traksi Maksimal", subtitle: "Anti-Slip Drive", icon: "gear" },
      { title: "Telematik Pintar", subtitle: "Real-time Monitoring", icon: "shield" },
    ],
    features: [
      "Sistem pengelolaan daya optimal yang menyesuaikan penggunaan tenaga mesin dengan kondisi beban untuk efisiensi bahan bakar ekstra.",
      "Teknologi kontrol penggerak canggih seperti traction control, anti-slip drive, dan electronic differential untuk stabilitas di medan ekstrem.",
      "Mesin diesel turbocharged dengan sistem monitoring real-time untuk memantau kondisi kerja dan menjaga performa unit tetap konsisten.",
      "Tingkat keausan ban berkurang berkat pengendalian penggerak yang optimal, menekan biaya operasional secara keseluruhan.",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
 {
  slug: "excavator-xe2000", // Pastikan slug-nya tepat seperti ini
  name: "Mining Excavator",
  model: "XE 2000",
  category: "Mining Equipment",
  categories: ["Excavator", "Mining Equipment"],
  image: "/images/XE2000.png",
  description:
    "XCMG Mining Excavator XE 2000 dilengkapi berbagai fitur yang dirancang untuk mengoptimalkan produktivitas...",
  mainImage: "/images/XE2000.png",
  gallery: ["/images/XE2000.png"],
  specifications: [
    { label: "Model", value: "XE 2000" },
    { label: "Berat Operasi", value: "192.000 kg" },
    { label: "Daya Mesin", value: "810 kW / 1800 rpm" },
    { label: "Kapasitas Bucket", value: "10 - 14 m³" },
    { label: "Gaya Tarik Maksimum", value: "1.149 kN" },
    { label: "Gaya Gali Bucket", value: "672 kN" },
    { label: "Gaya Gali Lengan", value: "620 kN" },
    { label: "Tinggi Gali Maksimum", value: "14.190 mm" },
    { label: "Radius Gali Maksimum", value: "15.325 mm" },
  ],
  stats: [
    { title: "Berat Operasi", value: "192.000 kg", icon: "weight" },
    { title: "Kapasitas Bucket", value: "10 - 14 m³", icon: "bucket" },
    { title: "Daya Mesin", value: "810 kW", icon: "engine" },
    { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
  ],
  benefits: [
    { title: "Double Passage", subtitle: "Akses Perawatan Cepat", icon: "award" },
    { title: "Grease 200 Liter", subtitle: "Operasi Hingga 10 Hari", icon: "clock" },
    { title: "Pelumasan Terpusat", subtitle: "Waktu Henti Minimal", icon: "gear" },
    { title: "Layanan 24/7", subtitle: "Dukungan Teknis", icon: "shield" },
  ],
  features: [
    "Sistem double passage boarding memberikan akses aman dan nyaman bagi operator serta teknisi.",
    "Silinder grease berkapasitas 200 liter terintegrasi sistem pelumasan terpusat.",
    "Performa penggalian tangguh dengan gaya gali bucket 672 kN dan gaya gali lengan 620 kN.",
    "Jangkauan operasional sangat luas dengan radius gali maksimal 15.325 mm."
  ],
  video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
},
{
    slug: "dump-truck-xda45",
    name: "Articulated Dump Truck",
    model: "XDA 45",
    category: "Dump Truck",
    categories: ["Dump Truck", "Mining Equipment"],
    image: "/images/XDA45.png",
    description:
      "XCMG Articulated Dump Truck XDA45 dirancang untuk mendukung berbagai kebutuhan transportasi material di lingkungan kerja yang berat, menggabungkan sistem penggerak bertenaga, kapasitas angkut optimal, serta manuver tinggi.",
    mainImage: "/images/XDA45.png",
    gallery: ["/images/XDA45.png"],
    specifications: [
      { label: "Model", value: "XDA 45" },
      { label: "Berat Operasi", value: "41.000 kg" },
      { label: "Daya Mesin", value: "350 kW / 1800 rpm" },
      { label: "Kemampuan Menanjak Maksimum", value: "45%" },
      { label: "Berat Kosong", value: "34.000 kg" },
      { label: "Berat Kendaraan Kotor", value: "75.000 kg" },
      { label: "Kecepatan Maksimum", value: "51 km/jam" },
      { label: "Torsi Maksimum", value: "2300 Nm / 1300 rpm" },
    ],
    stats: [
      { title: "Berat Operasi", value: "41.000 kg", icon: "weight" },
      { title: "Kecepatan Maks", value: "51 km/h", icon: "bucket" },
      { title: "Daya Mesin", value: "350 kW", icon: "engine" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Mesin MTU", subtitle: "Ramah Lingkungan", icon: "award" },
      { title: "Suhu Ekstrem", subtitle: "-25°C hingga 40°C", icon: "clock" },
      { title: "Traksi Kuat", subtitle: "Mampu Menanjak 45%", icon: "gear" },
      { title: "Kinerja Andal", subtitle: "Pengujian Ekstensif", icon: "shield" },
    ],
    features: [
      "Ditenagai mesin MTU bertenaga tinggi dengan tingkat emisi dan kebisingan rendah untuk performa maksimal di medan berat.",
      "Memiliki traksi kuat, efisiensi kerja tinggi, dan kemampuan manuver optimal melintasi medan penggalian, pelabuhan, dan pertambangan.",
      "Dirancang tangguh untuk beroperasi secara andal pada rentang suhu lingkungan ekstrem dari -25°C hingga 40°C.",
      "Struktur kokoh dan presisi tinggi yang lolos pengujian ekstensif guna memastikan keandalan serta produktivitas jangka panjang."
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "dump-truck-xga4251",
    name: "Off-highway Dump Truck",
    model: "XGA 4251 D2WC",
    category: "Dump Truck",
    categories: ["Dump Truck"],
    image: "/images/XGA425D2WC.jpg",
    description:
      "Truk tugas berat XCMG dikembangkan dengan standar teknologi internasional dan dirancang untuk memenuhi kebutuhan operasional logistik jarak jauh, transportasi antarkota, serta area operasional berat.",
    mainImage: "/images/XGA425D2WC.jpg",
    gallery: ["/images/XGA425D2WC.jpg"],
    specifications: [
      { label: "Model", value: "XGA 4251 D2WC" },
      { label: "Berat Operasi", value: "9.800 kg" },
      { label: "Daya Mesin", value: "294 kW" },
      { label: "Kapasitas Mesin", value: "10,42 L" },
      { label: "Torsi Maksimum", value: "1.700 N.m" },
      { label: "Berat Kendaraan Kotor", value: "90.000 kg" },
      { label: "Kecepatan Maksimum", value: "80 km/jam" },
      { label: "Kemampuan Menanjak", value: "25%" },
    ],
    stats: [
      { title: "Berat Kendaraan", value: "90.000 kg", icon: "weight" },
      { title: "Kecepatan Maks", value: "80 km/h", icon: "bucket" },
      { title: "Daya Mesin", value: "294 kW", icon: "engine" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Teknologi Global", subtitle: "200.000+ Km Uji Coba", icon: "award" },
      { title: "Logistik Jarak Jauh", subtitle: "Transportasi Antarkota", icon: "clock" },
      { title: "Efisiensi Tinggi", subtitle: "Hemat Biaya Operasional", icon: "gear" },
      { title: "Standar Internasional", subtitle: "Keamanan & Durabilitas", icon: "shield" },
    ],
    features: [
      "Mengadopsi teknologi kendaraan komersial canggih dengan pengujian menyeluruh lebih dari 200.000 km untuk menjamin performa optimal.",
      "Dikembangkan sesuai standar internasional yang mengutamakan keandalan, keselamatan, durabilitas, dan kemudahan pengoperasian.",
      "Sangat ideal untuk kebutuhan logistik jarak jauh dan transportasi antarkota dengan kemampuan mengangkut berbagai jenis muatan.",
      "Didukung efisiensi bahan bakar dan konfigurasi terdepan guna meningkatkan produktivitas serta menekan biaya operasional."
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "dump-truck-xdr",
    name: "Mining Dump Truck",
    model: "XDR 80T-AT",
    category: "Dump Truck",
    categories: ["Dump Truck", "Mining Equipment"],
    image: "/images/XDR80T-AT.png",
    description:
      "XCMG XDR80T-AT dirancang khusus untuk memenuhi kebutuhan hauling di area pertambangan dengan mesin bertenaga 560 HP, sistem kontrol elektronik canggih, serta pemantauan kondisi mesin secara real-time.",
    mainImage: "/images/XDR80T-AT.png",
    gallery: ["/images/XDR80T-AT.png"],
    specifications: [
      { label: "Model", value: "XDR 80T-AT" },
      { label: "Muatan Maksimal", value: "60.000 kg (60 Ton)" },
      { label: "Daya Terukur", value: "412 kW / 1900 rpm" },
      { label: "Kemampuan Menanjak Maksimum", value: "30%" },
      { label: "Berat Kosong", value: "40.000 kg" },
      { label: "Berat Kendaraan Total", value: "100.000 kg" },
      { label: "Kecepatan Maksimum", value: "37 km/jam" },
      { label: "Torsi Maksimum", value: "2500 Nm / 1100-1500 rpm" },
    ],
    stats: [
      { title: "Kapasitas Muat", value: "60 Ton", icon: "weight" },
      { title: "Kecepatan Maks", value: "37 km/h", icon: "bucket" },
      { title: "Daya Mesin", value: "412 kW (560 HP)", icon: "engine" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Mesin Yuchai 560 HP", subtitle: "Bertenaga & Efisien", icon: "award" },
      { title: "Monitoring Real-Time", subtitle: "Pemantauan Mesin Presisi", icon: "clock" },
      { title: "Kontrol Elektronik", subtitle: "Performa Optimal di Ketinggian", icon: "gear" },
      { title: "Efisiensi Biaya", subtitle: "Perawatan Lebih Hemat", icon: "shield" },
    ],
    features: [
      "Dilengkapi mesin diesel elektronik Yuchai berdaya 560 HP yang menghasilkan tenaga besar dengan konsumsi bahan bakar yang efisien.",
      "Sistem pemantauan mesin real-time membantu mengontrol kondisi operasional, menjaga keandalan unit, serta memperpanjang usia komponen.",
      "Sistem kontrol elektronik canggih mengoptimalkan kinerja mesin pada berbagai kondisi ketinggian dan beban kerja secara konsisten.",
      "Struktur dan pengelolaan mesin yang presisi menekan biaya operasional serta waktu henti perawatan di area tambang."
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "grader-gr3005t-pro",
    name: "Mining Motor Grader",
    model: "GR 3005T-Pro",
    category: "Mining Equipment",
    categories: ["Motor Grader", "Mining Equipment"],
    image: "/images/GR3005T-PRO.png",
    description:
      "Motor Grader GR3005T Pro dirancang untuk pembentukan, perataan, dan pemeliharaan jalan angkut di area tambang terbuka. Dilengkapi sistem kontrol cerdas dan responsif untuk performa optimal di medan berat.",
    mainImage: "/images/GR3005T-PRO.png",
    gallery: ["/images/GR3005T-PRO.png"],
    specifications: [
      { label: "Model Mesin", value: "QSL8.9" },
      { label: "Daya Terukur", value: "242 kW / 2200 rpm" },
      { label: "Berat Mesin", value: "28.500 kg" },
      { label: "Dimensi Unit (P x L x T)", value: "10.923 x 3.270 x 3.850 mm" },
      { label: "Ukuran Bilah (Panjang x Tinggi)", value: "4.572 x 686 mm" },
      { label: "Gaya Tarik", value: "140 kN" },
      { label: "Kedalaman Pemotongan Maksimum", value: "838 mm" },
      { label: "Ketinggian Angkat Maksimum", value: "420 mm" },
      { label: "Jari-jari Putar Minimum", value: "9 m" },
      { label: "Kemampuan Menanjak Maksimum", value: "30%" },
      { label: "Tangki Bahan Bakar", value: "480 L" },
    ],
    stats: [
      { title: "Berat Mesin", value: "28.500 kg", icon: "weight" },
      { title: "Daya Mesin", value: "242 kW", icon: "engine" },
      { title: "Ukuran Bilah", value: "4.572 mm", icon: "bucket" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Mesin Cummins QSL8.9", subtitle: "Performa Tangguh & Cerdas", icon: "award" },
      { title: "Multi-Fungsi Tambang", subtitle: "Perataan, Parit & Clearing", icon: "clock" },
      { title: "Kontrol Responsif", subtitle: "Sistem Hidrolik Presisi", icon: "gear" },
      { title: "Kenyamanan Operator", subtitle: "Kabin Ergonimis & Aman", icon: "shield" },
    ],
    features: [
      "Dirancang khusus untuk menangani pekerjaan perataan tanah dan material batuan berat di jalan angkut tambang terbuka.",
      "Sangat serbaguna untuk kebutuhan penyebaran material, penggalian parit samping, hingga pembersihan area kerja.",
      "Sistem kontrol cerdas dan responsif memberikan kemudahan manuver dengan jari-jari putar minimum 9 meter.",
      "Kapasitas tangki bahan bakar besar (480 L) dan sistem pendingin optimal mendukung durabilitas kerja nonstop."
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "dump-truck-xga105",
    name: "Mining Dump Truck",
    model: "XGA 105",
    category: "Dump Truck",
    categories: ["Dump Truck", "Mining Equipment"],
    image: "/images/XGA105.png",
    description:
      "Mining Dump Truck XCMG XGA 105 dirancang untuk mendukung operasi pertambangan beban berat dan medan menantang. Menawarkan performa tinggi, efisiensi bahan bakar optimal, serta kabin ergonomis untuk kenyamanan dan keselamatan operator.",
    mainImage: "/images/XGA105.png",
    gallery: ["/images/XGA105.png"],
    specifications: [
      { label: "Model", value: "XGA 105" },
      { label: "Muatan Maksimal", value: "72.000 kg (72 Ton)" },
      { label: "Daya Terukur", value: "353 kW / 1900 rpm" },
      { label: "Kemampuan Menanjak Maksimum", value: "30%" },
      { label: "Berat Kosong", value: "34.000 kg" },
      { label: "Berat Kendaraan Total", value: "106.000 kg" },
      { label: "Kecepatan Maksimum", value: "45 km/jam" },
      { label: "Torsi Maksimum", value: "2200 Nm / 1100 rpm" },
    ],
    stats: [
      { title: "Kapasitas Muat", value: "72 Ton", icon: "weight" },
      { title: "Kecepatan Maks", value: "45 km/h", icon: "bucket" },
      { title: "Daya Mesin", value: "353 kW", icon: "engine" },
      { title: "Garansi Resmi", value: "1 Tahun", icon: "shield" },
    ],
    benefits: [
      { title: "Kapasitas 72 Ton", subtitle: "Rangka & Bodi Ekstra Kokoh", icon: "award" },
      { title: "Kabin Ergonomis", subtitle: "Sistem Kontrol Modern", icon: "clock" },
      { title: "Hemat Bahan Bakar", subtitle: "Ramah Lingkungan", icon: "gear" },
      { title: "Stabilitas Tinggi", subtitle: "Andal di Medan Ekstrem", icon: "shield" },
    ],
    features: [
      "Menggunakan rangka kokoh dan bodi yang diperkuat untuk menangani muatan hingga 72 ton di lingkungan ekstrem.",
      "Kabin berdesain ergonomis dan luas dilengkapi sistem kontrol modern demi keselamatan serta kenyamanan operator.",
      "Mesin bertenaga dan sistem transmisi andal yang mengoptimalkan konsumsi bahan bakar dan efisiensi operasional.",
      "Mampu menanjak hingga kecuraman 30% dengan berat total kendaraan mencapai 106.000 kg secara stabil."
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

/* =========================================================
    ICON COMPONENT
========================================================= */
function Icon({ type, className = "w-6 h-6" }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
  };

  if (type === "shield") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 12l2 2 4-4"
        />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" strokeWidth="1.8" />
        <path
          strokeLinecap="round"
          strokeWidth="1.8"
          d="M12 7v5l3 2"
        />
      </svg>
    );
  }

  if (type === "gear") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M19 13.5l1.2 1 .-1.8 3.1-1.5-.6a7.4 7.4 0 01-1.7 1l-.2 1.6h-3.5l-.2-1.6a7.4 7.4 0 01-1.7-1l-1.5.6-1.8-3.1 1.2-1a7.2 7.2 0 010-2l-1.2-1 1.8-3.1 1.5.6a7.4 7.4 0 011.7-1l.2-1.6h3.5l.2 1.6a7.4 7.4 0 011.7 1l1.5-.6 1.8 3.1-1.2 1a7.2 7.2 0 010 2z"
        />
      </svg>
    );
  }

  if (type === "award") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="4.5" strokeWidth="1.8" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9.5 12l-1 8 3.5-2 3.5 2-1-8"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M10.5 8l1 1 2-2"
        />
      </svg>
    );
  }

  if (type === "weight") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M6 20h12l-1.5-12h-9L6 20z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 8a3 3 0 016 0"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M10 14h4"
        />
      </svg>
    );
  }

  if (type === "bucket") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M5 15h14l-2 4H7l-2-4z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M8 15l2-8h4l2 8"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M10 7h4"
        />
      </svg>
    );
  }

  if (type === "engine") {
    return (
      <svg {...common}>
        <rect
          x="4"
          y="7"
          width="14"
          height="10"
          rx="2"
          strokeWidth="1.8"
        />
        <path
          strokeLinecap="round"
          strokeWidth="1.8"
          d="M18 10h3v4h-3M7 4v3M11 4v3M15 4v3M7 17v3M11 17v3M15 17v3"
        />
        <circle cx="11" cy="12" r="2" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === "play") {
    return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    );
  }

  if (type === "download") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 4v11"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M8 11l4 4 4-4"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M5 20h14"
        />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H11l-5 3v-3H5a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
        <path
          strokeLinecap="round"
          strokeWidth="1.8"
          d="M8 10h8M8 13h5"
        />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M13 6l6 6-6 6"
        />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
          d="M3 11l9-8 9 8"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
          d="M5 10v10h14V10"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.7"
          d="M9 20v-6h6v6"
        />
      </svg>
    );
  }

  return null;
}

/* =========================================================
    PRODUCT SHOW (MAIN COMPONENT)
========================================================= */
export default function ProductShow({ slug }) {
  const product =
    productList.find((item) => item.slug === slug) || productList[0];

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Deskripsi");

  const tabs = [
    "Deskripsi",
    "Spesifikasi",
    "Fitur Unggulan",
    "Galeri",
    "Dokumen",
    "Video",
  ];

  return (
    <div className="min-h-screen bg-white text-[#0f2b5c] font-sans selection:bg-[#ffc107] selection:text-[#0f2b5c] overflow-x-hidden">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mb-6">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-400 overflow-x-auto whitespace-nowrap">
            <a
              href="/"
              className="flex items-center gap-1.5 hover:text-[#0f2b5c] transition"
            >
              <Icon type="home" className="w-3.5 h-3.5" />
              Home
            </a>

            <span>›</span>

            <a
              href="/products"
              className="hover:text-[#0f2b5c] transition"
            >
              Products
            </a>

            <span>›</span>

            {/* Kategori Dinamis */}
            <span>{product.category}</span>

            <span>›</span>

            <span className="font-bold text-[#0f2b5c]">
              {product.model}
            </span>
          </div>
        </div>

        {/* =====================================================
            HERO PRODUCT
        ===================================================== */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
            {/* LEFT - PRODUCT IMAGE */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[28px] bg-slate-100 border border-slate-200 shadow-sm">
                {/* Main image */}
                <div className="relative h-[390px] sm:h-[470px] lg:h-[500px] overflow-hidden">
                  <img
                    src={product.gallery[activeImage] || product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Dark bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#071b38]/80 to-transparent pointer-events-none" />

                  {/* Counter */}
                  <div className="absolute top-5 left-5">
                    <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#0f2b5c] text-xs font-black shadow-md">
                      {String(activeImage + 1).padStart(2, "0")} /{" "}
                      {String(product.gallery.length).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Previous */}
                  <button
                    onClick={() =>
                      setActiveImage(
                        activeImage === 0
                          ? product.gallery.length - 1
                          : activeImage - 1
                      )
                    }
                    className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#0f2b5c] flex items-center justify-center shadow-lg hover:bg-[#ffc107] transition"
                  >
                    <span className="text-xl">‹</span>
                  </button>

                  {/* Next */}
                  <button
                    onClick={() =>
                      setActiveImage(
                        activeImage === product.gallery.length - 1
                          ? 0
                          : activeImage + 1
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#0f2b5c] flex items-center justify-center shadow-lg hover:bg-[#ffc107] transition"
                  >
                    <span className="text-xl">›</span>
                  </button>

                  {/* Thumbnails */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-full px-5">
                    <div className="flex justify-center gap-2.5 overflow-x-auto pb-1">
                      {product.gallery.map((image, index) => (
                        <button
                          key={image}
                          onClick={() => setActiveImage(index)}
                          className={`
                            shrink-0
                            w-[72px]
                            h-[54px]
                            sm:w-[88px]
                            sm:h-[62px]
                            rounded-xl
                            overflow-hidden
                            border-2
                            transition-all
                            duration-300
                            ${
                              activeImage === index
                                ? "border-[#ffc107] scale-105 shadow-lg"
                                : "border-white/80 opacity-90 hover:opacity-100"
                            }
                          `}
                        >
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Slider dots */}
                    <div className="flex justify-center gap-2 mt-3">
                      {product.gallery.map((_, index) => (
                        <span
                          key={index}
                          className={`
                            h-1 rounded-full transition-all
                            ${
                              activeImage === index
                                ? "w-7 bg-[#ffc107]"
                                : "w-5 bg-white/80"
                            }
                          `}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - PRODUCT INFORMATION */}
            <div className="lg:col-span-5">
              {/* Category */}
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#fff4ce] border border-[#ffc107]/50 text-[11px] font-black text-[#0f2b5c] uppercase tracking-wide">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="mt-4 text-[38px] sm:text-[48px] xl:text-[52px] leading-[0.98] font-black tracking-[-0.035em]">
                {product.name}{" "}
                <span className="text-[#fdb900]">{product.model}</span>
              </h1>

              {/* Description */}
              <p className="mt-5 text-sm sm:text-[15px] leading-7 text-slate-600 max-w-2xl">
                {product.description}
              </p>

              {/* BENEFITS */}
              <div className="mt-7 grid grid-cols-2 xl:grid-cols-4 gap-3">
                {product.benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="min-h-[112px] rounded-2xl border border-slate-200 bg-white px-3 py-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#f4f7fb] text-[#0f2b5c] flex items-center justify-center mb-3">
                      <Icon type={benefit.icon} className="w-6 h-6" />
                    </div>

                    <h3 className="text-[11px] sm:text-xs font-black text-[#0f2b5c] leading-tight">
                      {benefit.title}
                    </h3>

                    <p className="mt-1 text-[9px] sm:text-[10px] text-slate-500 leading-tight">
                      {benefit.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              {/* QUICK SPECIFICATIONS */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4">
                  {product.stats.map((stat, index) => (
                    <div
                      key={stat.title}
                      className={`
                        min-h-[125px]
                        px-4 py-5
                        flex flex-col
                        items-center
                        justify-center
                        text-center
                        ${
                          index !== product.stats.length - 1
                            ? "border-b md:border-b-0 md:border-r border-slate-200"
                            : ""
                        }
                        ${
                          index === 1 ? "border-r border-slate-200" : ""
                        }
                      `}
                    >
                      <div className="text-[#0f2b5c] mb-3">
                        <Icon type={stat.icon} className="w-7 h-7" />
                      </div>

                      <p className="text-[10px] text-slate-500">
                        {stat.title}
                      </p>

                      <p className="mt-1 text-sm font-black text-[#0f2b5c]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/6281100000000"
                  className="min-h-[58px] rounded-xl bg-[#ffc107] hover:bg-[#eaae00] text-[#0f2b5c] font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Icon type="chat" className="w-5 h-5" />
                  Minta Penawaran
                </a>

                <a
                  href="/contact-us"
                  className="min-h-[58px] rounded-xl border-2 border-[#0f2b5c] text-[#0f2b5c] hover:bg-[#0f2b5c] hover:text-white font-black text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Konsultasi Produk
                  <Icon type="arrow" className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TABS NAVIGATION
        ===================================================== */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-6 sm:px-8 py-5 text-sm font-bold transition-all
                    ${
                      activeTab === tab
                        ? "text-[#0f2b5c]"
                        : "text-slate-500 hover:text-[#0f2b5c]"
                    }
                  `}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute left-5 right-5 bottom-0 h-[3px] rounded-full bg-[#ffc107]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT SECTION
        ===================================================== */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 mt-4">
          {/* ===================================================
              DESKRIPSI TAB
          =================================================== */}
          {activeTab === "Deskripsi" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Description & Features */}
              <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#ffc107] rounded-r-full" />

                <div className="pl-3">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-7 h-[2px] bg-[#ffc107]" />
                    <span className="text-[11px] font-black tracking-widest text-[#0f2b5c] uppercase">
                      Product Overview
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-[#0f2b5c] mb-4">
                    Deskripsi Produk
                  </h2>

                  {/* Dinamis mengambil dari product.description */}
                  <p className="text-sm text-slate-600 leading-7">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    {product.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center text-[11px] font-black">
                          ✓
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 leading-5">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Image */}
                <div className="mt-7 rounded-xl overflow-hidden h-48 bg-slate-50 border border-slate-100">
                  <img
                    src={product.gallery[0] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Middle Column: Quick Specification Table */}
              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-[#fff] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-6 bg-[#ffc107] rounded-full" />
                  <h2 className="text-lg font-black text-[#0f2b5c]">
                    Spesifikasi Utama
                  </h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {product.specifications.slice(0, 7).map((item) => (
                    <div
                      key={item.label}
                      className="py-3 flex flex-col gap-1"
                    >
                      <span className="text-[10px] text-slate-400">
                        {item.label}
                      </span>
                      <strong className="text-xs text-[#0f2b5c]">
                        {item.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Video Demo */}
              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1 h-6 bg-[#ffc107] rounded-full" />
                  <h2 className="text-lg font-black text-[#0f2b5c]">
                    Video Demonstrasi
                  </h2>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#071b38]">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={product.video}
                    title={`Video Demonstrasi ${product.name} ${product.model}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Tonton bagaimana {product.name} {product.model} bekerja di
                  berbagai kondisi lapangan dengan performa terbaik.
                </p>

                <a
                  href={product.video}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0f2b5c] hover:text-[#ffc107] transition"
                >
                  <Icon type="play" className="w-4 h-4" />
                  Buka di Tab Baru
                </a>
              </div>
            </div>
          )}

          {/* ===================================================
              SPESIFIKASI TAB
          =================================================== */}
          {activeTab === "Spesifikasi" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Spesifikasi Teknis Lengkap
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {product.specifications.map((spec, index) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center py-3 border-b border-slate-100 text-sm"
                  >
                    <span className="text-slate-500 font-medium">{spec.label}</span>
                    <span className="font-bold text-[#0f2b5c] text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================
              FITUR UNGGULAN TAB
          =================================================== */}
          {activeTab === "Fitur Unggulan" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Fitur Unggulan & Keunggulan
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ffc107] text-[#0f2b5c] flex items-center justify-center font-black shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f2b5c] text-base mb-1">
                        Fitur Utama #{idx + 1}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================
              GALERI TAB
          =================================================== */}
          {activeTab === "Galeri" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Galeri Foto Produk
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {product.gallery.map((imgUrl, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 aspect-[4/3] bg-slate-100"
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} gallery ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-xs font-bold text-[#0f2b5c]">
                        Lihat Gambar
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================
              DOKUMEN TAB
          =================================================== */}
          {activeTab === "Dokumen" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Brosur & Dokumen Teknis
              </h2>

              <div className="space-y-4 max-w-xl">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0f2b5c] text-white flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0f2b5c]">
                        Brosur Katalog {product.name} {product.model}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        PDF • 2.5 MB
                      </p>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="p-2.5 rounded-lg bg-[#ffc107] hover:bg-[#eaae00] text-[#0f2b5c] transition"
                  >
                    <Icon type="download" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================
              VIDEO TAB
          =================================================== */}
          {activeTab === "Video" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#0f2b5c] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#ffc107] rounded-full" />
                Video Media
              </h2>

              <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
                <iframe
                  className="w-full h-full"
                  src={product.video}
                  title={`Video ${product.name} ${product.model}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}