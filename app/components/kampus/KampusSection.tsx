"use client";

import { Search, MapPin, Users, Star, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { KampusDetailPage } from '../kampus/KampusDetailPage';

export function KampusSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterWilayah, setFilterWilayah] = useState('all');
  const [selectedKampus, setSelectedKampus] = useState<Kampus | null>(null);


  const kampusList = [
    {
      id: 1,
      nama: 'Universitas Indonesia',
      singkatan: 'UI',
      lokasi: 'Depok, Jawa Barat',
      akreditasi: 'A',
      jumlahProdi: 189,
      logo: '🎓',
      website: 'ui.ac.id',
      rating: 4.8,
      deskripsi: 'PTN tertua dan terbaik di Indonesia',
      image: 'https://images.unsplash.com/photo-1655543274920-06de452d0d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXRhcyUyMGluZG9uZXNpYSUyMGNhbXB1cyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDc0NTEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      nama: 'Institut Teknologi Bandung',
      singkatan: 'ITB',
      lokasi: 'Bandung, Jawa Barat',
      akreditasi: 'A',
      jumlahProdi: 127,
      logo: '🏛️',
      website: 'itb.ac.id',
      rating: 4.7,
      deskripsi: 'Kampus teknik terkemuka Indonesia',
      image: 'https://images.unsplash.com/photo-1716625862188-f421d41bfb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kdW5nJTIwdGVjaG5vbG9neSUyMGNhbXB1cyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDc0NTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 3,
      nama: 'Universitas Gadjah Mada',
      singkatan: 'UGM',
      lokasi: 'Yogyakarta',
      akreditasi: 'A',
      jumlahProdi: 253,
      logo: '🎓',
      website: 'ugm.ac.id',
      rating: 4.7,
      deskripsi: 'Universitas dengan prodi terlengkap',
      image: 'https://images.unsplash.com/photo-1675583152895-f7e8e05eb0ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWRqYWglMjBtYWRhJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NjQ3NDUxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 4,
      nama: 'Institut Teknologi Sepuluh Nopember',
      singkatan: 'ITS',
      lokasi: 'Surabaya, Jawa Timur',
      akreditasi: 'A',
      jumlahProdi: 52,
      logo: '🏛️',
      website: 'its.ac.id',
      rating: 4.6,
      deskripsi: 'Kampus teknik terkemuka di Jawa Timur',
      image: 'https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWElMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDc0NTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 5,
      nama: 'Institut Pertanian Bogor',
      singkatan: 'IPB',
      lokasi: 'Bogor, Jawa Barat',
      akreditasi: 'A',
      jumlahProdi: 154,
      logo: '🌾',
      website: 'ipb.ac.id',
      rating: 4.6,
      deskripsi: 'Kampus pertanian terbaik Indonesia',
      image: 'https://images.unsplash.com/photo-1687677347190-58c4ebf93bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzY0NzQ1MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 6,
      nama: 'Universitas Airlangga',
      singkatan: 'UNAIR',
      lokasi: 'Surabaya, Jawa Timur',
      akreditasi: 'A',
      jumlahProdi: 142,
      logo: '🎓',
      website: 'unair.ac.id',
      rating: 4.5,
      deskripsi: 'PTN terkemuka di Indonesia Timur',
      image: 'https://images.unsplash.com/photo-1655543274920-06de452d0d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NjQ3NDUxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 7,
      nama: 'Universitas Brawijaya',
      singkatan: 'UB',
      lokasi: 'Malang, Jawa Timur',
      akreditasi: 'A',
      jumlahProdi: 168,
      logo: '🎓',
      website: 'ub.ac.id',
      rating: 4.5,
      deskripsi: 'Kampus favorit di Kota Malang',
      image: 'https://images.unsplash.com/photo-1642130935796-1409d7e075dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBsaWJyYXJ5JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0NzQ1MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 8,
      nama: 'Universitas Diponegoro',
      singkatan: 'UNDIP',
      lokasi: 'Semarang, Jawa Tengah',
      akreditasi: 'A',
      jumlahProdi: 137,
      logo: '🎓',
      website: 'undip.ac.id',
      rating: 4.4,
      deskripsi: 'PTN terbesar di Jawa Tengah',
      image: 'https://images.unsplash.com/photo-1741622197989-f90e16061813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwaGFsbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjQ3NDUxMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 9,
      nama: 'Universitas Padjadjaran',
      singkatan: 'UNPAD',
      lokasi: 'Bandung, Jawa Barat',
      akreditasi: 'A',
      jumlahProdi: 89,
      logo: '🎓',
      website: 'unpad.ac.id',
      rating: 4.4,
      deskripsi: 'Kampus dengan kampus modern di Jatinangor',
      image: 'https://images.unsplash.com/photo-1716625862188-f421d41bfb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5kdW5nJTIwdGVjaG5vbG9neSUyMGNhbXB1cyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDc0NTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 10,
      nama: 'Universitas Sebelas Maret',
      singkatan: 'UNS',
      lokasi: 'Surakarta, Jawa Tengah',
      akreditasi: 'A',
      jumlahProdi: 112,
      logo: '🎓',
      website: 'uns.ac.id',
      rating: 4.3,
      deskripsi: 'PTN berkualitas di Solo',
      image: 'https://images.unsplash.com/photo-1687677347190-58c4ebf93bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYnVpbGRpbmclMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzY0NzQ1MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  type Kampus = {
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


  const wilayahList = [
    'all',
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Yogyakarta'
  ];

  const filteredKampus = kampusList.filter(kampus => {
    const matchSearch = kampus.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       kampus.singkatan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchWilayah = filterWilayah === 'all' || kampus.lokasi.includes(filterWilayah);
    return matchSearch && matchWilayah;
  });

  // If a kampus is selected, show the detail page
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
        {/* Header */}
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
            <p className="font-bold text-2xl text-gray-900">{kampusList.length}</p>
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
              {/* Header with Background Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback 
                  src={kampus.image} 
                  alt={kampus.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-900">
                      Akreditasi {kampus.akreditasi}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-2xl mb-1 drop-shadow-lg">{kampus.singkatan}</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">{kampus.nama}</p>
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

                <button
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all"
                >
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