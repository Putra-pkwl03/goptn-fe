"use client";

import { useState } from 'react';
import { MapPin, Globe, ArrowLeft, BookOpen, Award, Users, TrendingUp, Building2, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface KampusData {
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
  tentang?: string;
  visi?: string;
  misi?: string[];
}

interface KampusDetailPageProps {
  kampus: KampusData;
  onBack: () => void;
}

export function KampusDetailPage({ kampus, onBack }: KampusDetailPageProps) {
  const [selectedJenjang, setSelectedJenjang] = useState<'diploma' | 'sarjana'>('sarjana');
  const [selectedJalur, setSelectedJalur] = useState<'snbp' | 'snbt' | 'mandiri'>('snbp');

  // Mock data program studi dengan daya tampung per jalur
  const programStudiDiploma = [
    {
      id: 1,
      nama: 'D3 Teknik Komputer',
      fakultas: 'Fakultas Teknik',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 30,
        peminat2024: 245,
        diterima2024: 28
      },
      snbt: {
        dayaTampung2025: 40,
        peminat2024: 320,
        diterima2024: 38
      },
      mandiri: {
        dayaTampung2025: 30,
        peminat2024: 180,
        diterima2024: 29
      }
    },
    {
      id: 2,
      nama: 'D3 Administrasi Bisnis',
      fakultas: 'Fakultas Ekonomi dan Bisnis',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 25,
        peminat2024: 198,
        diterima2024: 24
      },
      snbt: {
        dayaTampung2025: 35,
        peminat2024: 276,
        diterima2024: 33
      },
      mandiri: {
        dayaTampung2025: 25,
        peminat2024: 145,
        diterima2024: 24
      }
    },
    {
      id: 3,
      nama: 'D3 Akuntansi',
      fakultas: 'Fakultas Ekonomi dan Bisnis',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 28,
        peminat2024: 220,
        diterima2024: 27
      },
      snbt: {
        dayaTampung2025: 38,
        peminat2024: 305,
        diterima2024: 36
      },
      mandiri: {
        dayaTampung2025: 28,
        peminat2024: 165,
        diterima2024: 27
      }
    }
  ];

  const programStudiSarjana = [
    {
      id: 1,
      nama: 'Teknik Informatika',
      fakultas: 'Fakultas Teknik',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 85,
        peminat2024: 1240,
        diterima2024: 82
      },
      snbt: {
        dayaTampung2025: 120,
        peminat2024: 1850,
        diterima2024: 115
      },
      mandiri: {
        dayaTampung2025: 95,
        peminat2024: 890,
        diterima2024: 92
      }
    },
    {
      id: 2,
      nama: 'Teknik Elektro',
      fakultas: 'Fakultas Teknik',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 70,
        peminat2024: 980,
        diterima2024: 68
      },
      snbt: {
        dayaTampung2025: 100,
        peminat2024: 1450,
        diterima2024: 96
      },
      mandiri: {
        dayaTampung2025: 80,
        peminat2024: 720,
        diterima2024: 78
      }
    },
    {
      id: 3,
      nama: 'Teknik Sipil',
      fakultas: 'Fakultas Teknik',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 75,
        peminat2024: 1050,
        diterima2024: 73
      },
      snbt: {
        dayaTampung2025: 110,
        peminat2024: 1620,
        diterima2024: 105
      },
      mandiri: {
        dayaTampung2025: 85,
        peminat2024: 780,
        diterima2024: 83
      }
    },
    {
      id: 4,
      nama: 'Kedokteran',
      fakultas: 'Fakultas Kedokteran',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 50,
        peminat2024: 2150,
        diterima2024: 48
      },
      snbt: {
        dayaTampung2025: 80,
        peminat2024: 3240,
        diterima2024: 76
      },
      mandiri: {
        dayaTampung2025: 70,
        peminat2024: 1890,
        diterima2024: 68
      }
    },
    {
      id: 5,
      nama: 'Farmasi',
      fakultas: 'Fakultas Farmasi',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 45,
        peminat2024: 850,
        diterima2024: 43
      },
      snbt: {
        dayaTampung2025: 65,
        peminat2024: 1280,
        diterima2024: 62
      },
      mandiri: {
        dayaTampung2025: 55,
        peminat2024: 670,
        diterima2024: 53
      }
    },
    {
      id: 6,
      nama: 'Akuntansi',
      fakultas: 'Fakultas Ekonomi dan Bisnis',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 60,
        peminat2024: 920,
        diterima2024: 58
      },
      snbt: {
        dayaTampung2025: 90,
        peminat2024: 1380,
        diterima2024: 86
      },
      mandiri: {
        dayaTampung2025: 70,
        peminat2024: 750,
        diterima2024: 68
      }
    },
    {
      id: 7,
      nama: 'Manajemen',
      fakultas: 'Fakultas Ekonomi dan Bisnis',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 65,
        peminat2024: 1080,
        diterima2024: 63
      },
      snbt: {
        dayaTampung2025: 95,
        peminat2024: 1520,
        diterima2024: 91
      },
      mandiri: {
        dayaTampung2025: 75,
        peminat2024: 820,
        diterima2024: 73
      }
    },
    {
      id: 8,
      nama: 'Ilmu Hukum',
      fakultas: 'Fakultas Hukum',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 55,
        peminat2024: 780,
        diterima2024: 53
      },
      snbt: {
        dayaTampung2025: 85,
        peminat2024: 1190,
        diterima2024: 81
      },
      mandiri: {
        dayaTampung2025: 65,
        peminat2024: 620,
        diterima2024: 63
      }
    },
    {
      id: 9,
      nama: 'Psikologi',
      fakultas: 'Fakultas Psikologi',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 40,
        peminat2024: 890,
        diterima2024: 38
      },
      snbt: {
        dayaTampung2025: 60,
        peminat2024: 1340,
        diterima2024: 57
      },
      mandiri: {
        dayaTampung2025: 50,
        peminat2024: 710,
        diterima2024: 48
      }
    },
    {
      id: 10,
      nama: 'Ilmu Komunikasi',
      fakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik',
      akreditasi: 'A',
      snbp: {
        dayaTampung2025: 50,
        peminat2024: 950,
        diterima2024: 48
      },
      snbt: {
        dayaTampung2025: 75,
        peminat2024: 1420,
        diterima2024: 72
      },
      mandiri: {
        dayaTampung2025: 60,
        peminat2024: 760,
        diterima2024: 58
      }
    }
  ];

  const currentProdi = selectedJenjang === 'diploma' ? programStudiDiploma : programStudiSarjana;

  // Calculate total based on selected jalur
  const calculateTotals = () => {
    return currentProdi.reduce(
      (acc, prodi) => ({
        dayaTampung2025: acc.dayaTampung2025 + prodi[selectedJalur].dayaTampung2025,
        peminat2024: acc.peminat2024 + prodi[selectedJalur].peminat2024,
        diterima2024: acc.diterima2024 + prodi[selectedJalur].diterima2024
      }),
      { dayaTampung2025: 0, peminat2024: 0, diterima2024: 0 }
    );
  };

  const totals = calculateTotals();

  // Calculate total daya tampung for all jalur
  const totalDayaTampung = currentProdi.reduce(
    (acc, prodi) => ({
      snbp: acc.snbp + prodi.snbp.dayaTampung2025,
      snbt: acc.snbt + prodi.snbt.dayaTampung2025,
      mandiri: acc.mandiri + prodi.mandiri.dayaTampung2025
    }),
    { snbp: 0, snbt: 0, mandiri: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback 
          src={kampus.image} 
          alt={kampus.nama}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white mb-6 hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Daftar Kampus</span>
            </button>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="font-bold text-5xl text-white">{kampus.singkatan}</h1>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-sm font-medium text-gray-900">
                    Akreditasi {kampus.akreditasi}
                  </span>
                </div>
                <p className="text-xl text-white/90 mb-2">{kampus.nama}</p>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-5 h-5" />
                  <span>{kampus.lokasi}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 -mt-20 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Total Program Studi</p>
            <p className="font-bold text-2xl text-gray-900">{kampus.jumlahProdi}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Akreditasi</p>
            <p className="font-bold text-2xl text-gray-900">Unggul ({kampus.akreditasi})</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Daya Tampung 2024</p>
            <p className="font-bold text-2xl text-gray-900">
              {totalDayaTampung.snbp + totalDayaTampung.snbt + totalDayaTampung.mandiri}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Rating Kampus</p>
            <p className="font-bold text-2xl text-gray-900">{kampus.rating}/5.0</p>
          </div>
        </div>

        {/* Tentang Kampus */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-gray-900">Tentang {kampus.singkatan}</h2>
              <p className="text-gray-600 text-sm">Profil dan informasi umum</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {kampus.nama} ({kampus.singkatan}) adalah salah satu Perguruan Tinggi Negeri terkemuka di Indonesia yang berlokasi di {kampus.lokasi}. 
              Kampus ini telah mendapatkan akreditasi {kampus.akreditasi} dari BAN-PT dan memiliki {kampus.jumlahProdi} program studi yang tersebar 
              di berbagai fakultas.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Dengan visi menjadi universitas riset kelas dunia, {kampus.singkatan} terus berkomitmen untuk menghasilkan lulusan yang berkualitas, 
              berkarakter, dan siap bersaing di tingkat global. Kampus ini juga memiliki berbagai fasilitas modern yang mendukung kegiatan 
              pembelajaran dan pengembangan mahasiswa.
            </p>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Globe className="w-5 h-5" />
                <span className="font-medium">Website Resmi:</span>
              </div>
              <a 
                href={`https://${kampus.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                {kampus.website}
              </a>
            </div>
          </div>
        </div>

        {/* Program Studi */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="font-bold text-2xl text-gray-900">Program Studi</h2>
              <p className="text-gray-600 text-sm">Daftar program studi dan daya tampung tahun 2024</p>
            </div>
          </div>

          {/* Jenjang Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setSelectedJenjang('sarjana')}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                selectedJenjang === 'sarjana'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sarjana (S1)
            </button>
            <button
              onClick={() => setSelectedJenjang('diploma')}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                selectedJenjang === 'diploma'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Diploma (D3)
            </button>
          </div>

          {/* Jalur Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setSelectedJalur('snbp')}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                selectedJalur === 'snbp'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SNBP
            </button>
            <button
              onClick={() => setSelectedJalur('snbt')}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                selectedJalur === 'snbt'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              SNBT
            </button>
            <button
              onClick={() => setSelectedJalur('mandiri')}
              className={`px-6 py-2 rounded-lg transition-all font-medium ${
                selectedJalur === 'mandiri'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mandiri
            </button>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-sm text-blue-700 mb-1">Total Program Studi</p>
              <p className="font-bold text-2xl text-blue-900">{currentProdi.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-sm text-green-700 mb-1">Jalur SNBP</p>
              <p className="font-bold text-2xl text-green-900">{totalDayaTampung.snbp} kursi</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-sm text-purple-700 mb-1">Jalur SNBT</p>
              <p className="font-bold text-2xl text-purple-900">{totalDayaTampung.snbt} kursi</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <p className="text-sm text-orange-700 mb-1">Jalur Mandiri</p>
              <p className="font-bold text-2xl text-orange-900">{totalDayaTampung.mandiri} kursi</p>
            </div>
          </div>

          {/* Program Studi Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">No</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Program Studi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Fakultas</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Akreditasi</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    <div className="flex flex-col">
                      <span>Daya Tampung</span>
                      <span className="text-xs font-normal text-gray-500">(2025)</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    <div className="flex flex-col">
                      <span>Peminat</span>
                      <span className="text-xs font-normal text-gray-500">(2024)</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    <div className="flex flex-col">
                      <span>Diterima</span>
                      <span className="text-xs font-normal text-gray-500">(2024)</span>
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">
                    <div className="flex flex-col">
                      <span>Keketatan</span>
                      <span className="text-xs font-normal text-gray-500">(Rasio)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProdi.map((prodi, index) => {
                  const jalurData = prodi[selectedJalur];
                  const rasio = (jalurData.peminat2024 / jalurData.diterima2024).toFixed(1);
                  const keketatanLevel = parseFloat(rasio) >= 20 ? 'very-high' : parseFloat(rasio) >= 10 ? 'high' : parseFloat(rasio) >= 5 ? 'medium' : 'low';
                  
                  return (
                    <tr 
                      key={prodi.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-600">{index + 1}</td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">{prodi.nama}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">{prodi.fakultas}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {prodi.akreditasi}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-lg text-gray-900">{jalurData.dayaTampung2025}</span>
                          <span className="text-xs text-gray-500">kursi</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-lg text-blue-600">{jalurData.peminat2024.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">pendaftar</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-lg text-green-600">{jalurData.diterima2024}</span>
                          <span className="text-xs text-gray-500">mahasiswa</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`font-bold text-lg ${
                            keketatanLevel === 'very-high' ? 'text-red-600' :
                            keketatanLevel === 'high' ? 'text-orange-600' :
                            keketatanLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            1:{rasio}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            keketatanLevel === 'very-high' ? 'bg-red-100 text-red-700' :
                            keketatanLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                            keketatanLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {keketatanLevel === 'very-high' ? 'Sangat Ketat' :
                             keketatanLevel === 'high' ? 'Ketat' :
                             keketatanLevel === 'medium' ? 'Sedang' : 'Longgar'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-200 font-bold">
                  <td colSpan={4} className="py-4 px-4 text-right text-gray-900">Total:</td>
                  <td className="py-4 px-4 text-center text-gray-900">
                    <div className="flex flex-col items-center">
                      <span className="text-lg">{totals.dayaTampung2025}</span>
                      <span className="text-xs font-normal text-gray-500">kursi</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900">
                    <div className="flex flex-col items-center">
                      <span className="text-lg">{totals.peminat2024.toLocaleString()}</span>
                      <span className="text-xs font-normal text-gray-500">pendaftar</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900">
                    <div className="flex flex-col items-center">
                      <span className="text-lg">{totals.diterima2024}</span>
                      <span className="text-xs font-normal text-gray-500">mahasiswa</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-900">
                    <span className="text-lg">1:{(totals.peminat2024 / totals.diterima2024).toFixed(1)}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">ℹ️ Catatan:</span> Data daya tampung 2025 adalah proyeksi, sedangkan data peminat dan diterima adalah data aktual tahun 2024. 
              Rasio keketatan menunjukkan persaingan pada jalur {selectedJalur.toUpperCase()} tahun lalu. 
              Silakan kunjungi website resmi kampus untuk informasi terbaru dan paling akurat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}