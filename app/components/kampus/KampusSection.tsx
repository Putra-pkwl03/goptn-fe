"use client";

import { Search, MapPin, Users, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { KampusDetailPage } from "../kampus/KampusDetailPage";
import type { Kampus } from "@/types/kampus";
import { kampusFallback } from "@/app/src/data/data";

type UIKampus = {
  id: number;
  nama: string;
  singkatan: string;
  lokasi: string;
  akreditasi: string;
  jumlahProdi: number;
  logo: string;
  website: string;
  rating: number;
  deskripsi: string;
  image: string;
};

export function KampusSection({ kampusList }: { kampusList: Kampus[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterWilayah, setFilterWilayah] = useState("all");
  const [selectedKampus, setSelectedKampus] = useState<UIKampus | null>(null);

  const mappedList: UIKampus[] = kampusList.map((k) => {
  const fallback = kampusFallback[k.id] || {};

  return {
    id: k.id,
    nama: k.nama_kampus,
    singkatan: k.akronim,
    lokasi: k.kota,
    akreditasi: k.akreditasi ?? k.akreditasi,

    jumlahProdi: k.majors?.length ?? 0,

    // fallback (Figma) priority
    logo: fallback.logo || "🎓",
    image: fallback.image || "/kampus-default.jpg",

    rating: fallback.rating || 4.5,
    deskripsi:
      fallback.deskripsi || `Kampus ${k.nama_kampus} berlokasi di ${k.kota}`,

    website: k.website,
  };
});

  const wilayahList = [
    "all",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Yogyakarta",
  ];

  const filteredKampus = mappedList.filter((kampus) => {
    const matchSearch =
      kampus.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kampus.singkatan.toLowerCase().includes(searchQuery.toLowerCase());

    const matchWilayah =
      filterWilayah === "all" || kampus.lokasi.includes(filterWilayah);

    return matchSearch && matchWilayah;
  });

  if (selectedKampus) {
    return (
      <KampusDetailPage
        kampus={selectedKampus}
        onBack={() => setSelectedKampus(null)}
      />
    );
  }

  return (
    <div id="kampus-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900 font-bold text-3xl">
            Jelajahi Kampus PTN
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan informasi lengkap tentang PTN favorit di seluruh Indonesia
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama kampus atau singkatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
              />
            </div>

            <select
              value={filterWilayah}
              onChange={(e) => setFilterWilayah(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
            >
              <option value="all">Semua Wilayah</option>
              {wilayahList.slice(1).map((wilayah) => (
                <option key={wilayah} value={wilayah}>
                  {wilayah}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="font-bold text-2xl text-gray-900">{mappedList.length}</p>
            <p className="text-sm text-gray-600">Total PTN</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="font-bold text-2xl text-gray-900">1,600+</p>
            <p className="text-sm text-gray-600">Program Studi</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="font-bold text-2xl text-gray-900">100%</p>
            <p className="text-sm text-gray-600">Akreditasi A</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="font-bold text-2xl text-gray-900">500K+</p>
            <p className="text-sm text-gray-600">Mahasiswa</p>
          </div>
        </div>

        {/* Kampus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKampus.map((kampus) => (
            <div
              key={kampus.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all overflow-hidden group cursor-pointer"
              onClick={() => setSelectedKampus(kampus)}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={kampus.image}
                  alt={kampus.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                      Akreditasi {kampus.akreditasi}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-2xl mb-1 drop-shadow-lg">
                      {kampus.singkatan}
                    </h3>
                    <p className="text-sm text-white/90 drop-shadow-md">
                      {kampus.nama}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{kampus.lokasi}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{kampus.deskripsi}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">{kampus.jumlahProdi} Prodi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{kampus.rating}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all">
                  <span>Lihat Detail Kampus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredKampus.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada kampus yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
