import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet Default Marker Icon Issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Coordinate Center Indonesia View
const INDONESIA_CENTER = [-2.548926, 118.014863];
const DEFAULT_ZOOM = 5;

// Helper untuk membersihkan path gambar dari storage
const getCleanUrl = (path, fallback) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  const cleaned = path.replace(/^storage\//, '');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
};

// Helper untuk mengekstrak/membuat embed URL Google Maps dari link atau alamat
const getEmbedMapUrl = (linkOrAddress) => {
  if (!linkOrAddress) return 'https://maps.google.com/maps?q=Indonesia&t=&z=5&ie=UTF8&iwloc=&output=embed';
  
  if (linkOrAddress.includes('<iframe')) {
    const match = linkOrAddress.match(/src="([^"]+)"/);
    return match ? match[1] : linkOrAddress;
  }
  
  const encoded = encodeURIComponent(linkOrAddress);
  return `https://maps.google.com/maps?q=${encoded}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

// Custom Controller Component untuk Menangani Map FlyTo Animation
function MapViewController({ selectedRegion }) {
  const map = useMap();

  useEffect(() => {
    if (selectedRegion) {
      map.flyTo(selectedRegion.coordinates, selectedRegion.zoomLevel, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [selectedRegion, map]);

  return null;
}

// Function Generator Custom DivIcon dengan Desain Corporate
const createCustomIcon = (region, isActive) => {
  const activeClass = isActive ? "spi-marker-active" : "spi-marker-default";

  const html = `
    <div class="spi-custom-marker ${activeClass}">
      <div class="spi-marker-badge">
        <span class="spi-marker-title">${region.name}</span>
        <span class="spi-marker-count">${region.count}</span>
      </div>
      <div class="spi-marker-pin-wrapper">
        <div class="spi-marker-glow"></div>
        <div class="spi-marker-dot"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: "spi-leaflet-div-icon",
    iconSize: [120, 60],
    iconAnchor: [60, 52],
    popupAnchor: [0, -50],
  });
};

const createClientIcon = (client, isActive) => {
  const html = `
    <div class="spi-client-marker ${isActive ? "spi-client-active" : ""}">
      <div class="spi-client-badge">
        <span class="spi-client-name">${client.name}</span>
      </div>
      <div class="spi-client-pin">
        <div class="spi-client-dot"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: "spi-leaflet-div-icon",
    iconSize: [140, 50],
    iconAnchor: [70, 45],
    popupAnchor: [0, -40],
  });
};

export default function OurCustomers() {
  const { customers = [] } = usePage().props;

  // Mapping wilayah standar default jika database masih kosong
  const defaultRegions = [
    { id: "Central Kalimantan", name: "Central Kalimantan", coordinates: [-1.6815, 113.3824], zoomLevel: 7, description: "Pusat operasional pertambangan batubara dan kontraktor tambang skala besar di Kalimantan Tengah." },
    { id: "East & North Kalimantan", name: "East & North Kalimantan", coordinates: [0.5387, 116.4194], zoomLevel: 6, description: "Pusat konsentrasi pertambangan batubara utama, kontraktor tambang, dan energi di Kalimantan Timur & Utara." },
    { id: "South Sulawesi", name: "South Sulawesi", coordinates: [-3.6687, 119.9740], zoomLevel: 7, description: "Operasional pendukung pertambangan, infrastruktur, dan kontraktor di wilayah Sulawesi Selatan." },
    { id: "South-East Sulawesi", name: "South-East Sulawesi", coordinates: [-4.1449, 122.1746], zoomLevel: 7, description: "Mitra penyedia jasa kontraktor pertambangan dan alat berat untuk proyek nikel di Sulawesi Tenggara." },
    { id: "South Kalimantan", name: "South Kalimantan", coordinates: [-2.5920, 115.2692], zoomLevel: 7, description: "Pusat jaringan pertambangan batubara utama, kontraktor alat berat, dan energi di Kalimantan Selatan." },
    { id: "South Sumatera", name: "South Sumatera", coordinates: [-3.1266, 104.0931], zoomLevel: 7, description: "Pusat operasional pertambangan batubara, jasa transportasi tambang, dan kontraktor alat berat di wilayah Sumatra Selatan & Bengkulu." },
  ];

  // Gabungkan data dari database CMS ke dalam struktur region
  const customerRegions = defaultRegions.map(reg => {
    const regionClients = customers.filter(c => c.region === reg.id);
    return {
      ...reg,
      count: `${regionClients.length}+ Clients`,
      clients: regionClients.map(c => ({
        id: c.id,
        name: c.name,
        sector: c.description || "Mining & Heavy Equipment Services",
        location: c.region,
        // Konversi koordinat lat/long jika diinputkan, atau fallback ke titik wilayah
        coordinates: (c.latitude && c.longitude) ? [parseFloat(c.latitude), parseFloat(c.longitude)] : reg.coordinates,
        image: getCleanUrl(c.image, "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80"),
        gmaps_link: c.gmaps_link
      }))
    };
  }).filter(reg => reg.clients.length > 0); // Hanya tampilkan wilayah yang ada kliennya

  // Jika database kosong, gunakan fallback data agar layout tidak rusak
  const displayRegions = customerRegions.length > 0 ? customerRegions : [
    {
      id: "kalimantan",
      name: "Central Kalimantan",
      count: "0+ Clients",
      coordinates: [-1.6815, 113.3824],
      zoomLevel: 7,
      description: "Belum ada data klien terdaftar di wilayah ini.",
      clients: []
    }
  ];

  const [activeRegionId, setActiveRegionId] = useState(displayRegions[0].id);
  const [selectedClient, setSelectedClient] = useState(null);
  const mapRef = useRef(null);

  const handleClientClick = (client) => {
    setSelectedClient(client);
    if (mapRef.current) {
      mapRef.current.flyTo(client.coordinates, 9, {
        duration: 1.8,
        easeLinearity: 0.25,
      });
    }
  };

  const activeRegion = displayRegions.find((r) => r.id === activeRegionId) || displayRegions[0];

  const handleResetView = () => {
    setActiveRegionId(displayRegions[0].id);
    setSelectedClient(null);
    if (mapRef.current) {
      mapRef.current.flyTo(INDONESIA_CENTER, DEFAULT_ZOOM, {
        duration: 1.5,
      });
    }
  };

  return (
    <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      {/* Inject Custom Style untuk Leaflet UI & Marker */}
      <style>{`
        .spi-leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .spi-custom-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .spi-marker-badge {
          background: #0F2B5C;
          border: 2px solid #FFC107;
          border-radius: 8px;
          padding: 4px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 12px rgba(15, 43, 92, 0.35);
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .spi-marker-title {
          font-size: 11px;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: 0.02em;
        }

        .spi-marker-count {
          font-size: 10px;
          font-weight: 700;
          color: #FFC107;
          line-height: 1.2;
        }

        .spi-marker-pin-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
        }

        .spi-marker-dot {
          width: 12px;
          height: 12px;
          background-color: #FFC107;
          border: 2px solid #0F2B5C;
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .spi-marker-glow {
          position: absolute;
          width: 24px;
          height: 24px;
          background: rgba(255, 193, 7, 0.4);
          border-radius: 50%;
          z-index: 1;
          animation: spi-pulse 2s infinite ease-in-out;
        }

        .spi-marker-active .spi-marker-badge {
          background: #0F2B5C;
          border-color: #FFC107;
          transform: scale(1.1);
          box-shadow: 0 0 16px rgba(255, 193, 7, 0.6);
        }

        .spi-marker-active .spi-marker-dot {
          background-color: #DC2626;
          border-color: #FFFFFF;
          transform: scale(1.25);
        }

        .spi-marker-active .spi-marker-glow {
          background: rgba(220, 38, 38, 0.4);
          width: 32px;
          height: 32px;
        }

        .spi-marker-default:hover .spi-marker-badge {
          transform: translateY(-2px);
          border-color: #FFFFFF;
        }

        @keyframes spi-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          padding: 0 !important;
          overflow: hidden !important;
          box-shadow: 0 10px 25px -5px rgba(15, 43, 92, 0.3) !important;
          border: 1px solid #E2E8F0 !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
          width: 230px !important;
        }

        .leaflet-container {
          font-family: inherit !important;
        }

        .spi-map-tiles {
          filter: contrast(102%) brightness(98%);
        }

        .spi-client-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .spi-client-badge {
          background: #DC2626;
          border: 2px solid #FFC107;
          border-radius: 6px;
          padding: 3px 8px;
          box-shadow: 0 4px 10px rgba(220, 38, 38, 0.4);
          white-space: nowrap;
        }

        .spi-client-name {
          font-size: 10px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .spi-client-pin {
          width: 10px;
          height: 10px;
          background: #FFC107;
          border: 2px solid #DC2626;
          border-radius: 50%;
          margin-top: 2px;
          box-shadow: 0 0 10px #FFC107;
        }

        .spi-client-active .spi-client-badge {
          transform: scale(1.15);
          background: #991B1B;
          border-color: #FFFFFF;
          box-shadow: 0 0 15px rgba(255, 193, 7, 0.8);
        }
      `}</style>

      {/* Header Section */}
      <div className="mb-8 text-center sm:text-left">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#FFC107]">
          Our Nationwide Customers
        </span>
        <h3 className="mt-1 text-2xl font-black text-[#0F2B5C] md:text-3xl">
          TRUSTED ACROSS INDONESIA
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-[#64748B] md:text-sm">
          Pilih wilayah pada peta atau tab di bawah untuk melihat jangkauan operasional dan daftar mitra industri kami.
        </p>
      </div>

      {/* Real Interactive Map Container */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-300 shadow-md">
        <div className="absolute top-4 left-4 z-[500] flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-md border border-slate-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-[#0F2B5C]">Live Geographic Map</span>
          </div>

          <button
            onClick={handleResetView}
            className="flex items-center gap-1.5 rounded-lg bg-[#0F2B5C] px-3 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#1E3A8A] hover:text-[#FFC107] active:scale-95"
            title="Reset ke tampilan seluruh Indonesia"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset View
          </button>
        </div>

        <div className="h-[360px] w-full sm:h-[420px] md:h-[480px]">
          <MapContainer
            center={INDONESIA_CENTER}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom={true}
            className="h-full w-full z-10"
            ref={mapRef}
            attributionControl={true}
          >
            <TileLayer
              className="spi-map-tiles"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapViewController selectedRegion={activeRegion} />

            {/* 1. Mapping Markers per Region */}
            {displayRegions.map((region) => {
              const isActive = activeRegionId === region.id;
              const customIcon = createCustomIcon(region, isActive);

              return (
                <Marker
                  key={region.id}
                  position={region.coordinates}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => {
                      setActiveRegionId(region.id);
                    },
                  }}
                >
                  <Popup offset={[0, -10]}>
                    <div className="p-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h5 className="text-sm font-extrabold text-[#0F2B5C]">{region.name}</h5>
                        <span className="rounded-full bg-[#FFC107]/20 px-2 py-0.5 text-[10px] font-bold text-[#0F2B5C]">
                          {region.count}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {region.description}
                      </p>
                      <button
                        onClick={() => setActiveRegionId(region.id)}
                        className="mt-3 w-full rounded-md bg-[#0F2B5C] py-1.5 text-center text-[11px] font-bold text-[#FFC107] hover:bg-[#153875] transition-colors"
                      >
                        Lihat Pelanggan ({region.count})
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* 2. Mapping Marker Khusus PT / Client */}
            {activeRegion.clients.map((client) => {
              if (!client.coordinates) return null;

              const isSelected = selectedClient?.name === client.name;
              if (!isSelected) return null;

              const clientIcon = createClientIcon(client, true);

              return (
                <Marker
                  key={client.id || client.name}
                  position={client.coordinates}
                  icon={clientIcon}
                  eventHandlers={{
                    click: () => handleClientClick(client),
                  }}
                >
                  <Popup offset={[0, -10]}>
                    <div className="p-3 text-center">
                      <h5 className="text-xs font-black text-[#0F2B5C]">{client.name}</h5>
                      <p className="mt-1 text-[11px] font-semibold text-[#D97706]">{client.sector}</p>
                      <p className="text-[10px] text-slate-500">📍 {client.location}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Region Selector Tabs */}
      <div className="grid grid-cols-2 gap-2.5 border-b border-slate-200 pb-4 sm:grid-cols-3 lg:grid-cols-5">
        {displayRegions.map((region) => {
          const isActive = activeRegionId === region.id;
          return (
            <button
              key={region.id}
              onClick={() => setActiveRegionId(region.id)}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-xs font-extrabold transition-all duration-200 ${
                isActive
                  ? "bg-[#0F2B5C] text-[#FFC107] shadow-lg scale-[1.02]"
                  : "bg-slate-100 text-[#64748B] hover:bg-slate-200 hover:text-[#0F2B5C]"
              }`}
            >
              <span className="truncate">{region.name}</span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-[#FFC107] text-[#0B1220]" : "bg-slate-200 text-[#64748B]"
                }`}
              >
                {region.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Region Customer Details */}
      <div className="mt-6">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-lg font-bold text-[#0F2B5C]">
              Pelanggan Wilayah {activeRegion.name}
            </h4>
            <p className="text-xs text-[#64748B]">{activeRegion.description}</p>
          </div>
          <span className="w-fit rounded-md bg-[#0F2B5C]/10 px-3 py-1 text-xs font-bold text-[#0F2B5C]">
            {activeRegion.count} Total Partner
          </span>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activeRegion.clients.map((client, idx) => (
            <div
              key={client.id || idx}
              onClick={() => handleClientClick(client)}
              className={`group relative h-[280px] w-full cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                selectedClient?.name === client.name ? "ring-4 ring-[#FFC107]" : ""
              }`}
            >
              <img
                src={client.image}
                alt={client.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/95 via-[#0B1220]/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-[#0F2B5C]/85 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                <div className="transform transition-all duration-500 group-hover:-translate-y-6">
                  <h5 className="text-lg font-extrabold leading-snug text-white drop-shadow-md">
                    {client.name}
                  </h5>
                </div>

                <div className="absolute bottom-5 left-5 right-5 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="flex items-center gap-1.5 text-xs text-slate-200">
                    <svg className="h-3.5 w-3.5 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {client.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}