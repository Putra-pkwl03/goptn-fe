
"use client";

import { Search, TrendingUp, Briefcase, DollarSign, Target, Building2 } from 'lucide-react';
'use client';



export function JurusanSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');

  const jurusanList = [
    {
      id: 1,
      nama: 'Teknik Informatika',
      kampus: 'Universitas Indonesia (UI)',
      kategori: 'Saintek',
      deskripsi: 'Mempelajari pengembangan software, AI, dan sistem komputer',
      prospekKarir: ['Software Engineer', 'Data Scientist', 'AI Developer'],
      gajiRataRata: 'Rp 8-15 juta',
      popularitas: 95,
      icon: '💻',
      passing_grade: '85-95'
    },
    {
      id: 2,
      nama: 'Kedokteran',
      kampus: 'Universitas Gadjah Mada (UGM)',
      kategori: 'Saintek',
      deskripsi: 'Program studi untuk menjadi dokter profesional',
      prospekKarir: ['Dokter Umum', 'Dokter Spesialis', 'Researcher'],
      gajiRataRata: 'Rp 10-25 juta',
      popularitas: 92,
      icon: '⚕️',
      passing_grade: '90-98'
    },
    {
      id: 3,
      nama: 'Manajemen',
      kampus: 'Institut Teknologi Bandung (ITB)',
      kategori: 'Soshum',
      deskripsi: 'Ilmu mengelola organisasi dan bisnis',
      prospekKarir: ['Manager', 'Business Analyst', 'Entrepreneur'],
      gajiRataRata: 'Rp 6-12 juta',
      popularitas: 88,
      icon: '📊',
      passing_grade: '75-85'
    },
    {
      id: 4,
      nama: 'Akuntansi',
      kampus: 'Universitas Airlangga (UNAIR)',
      kategori: 'Soshum',
      deskripsi: 'Mempelajari pencatatan dan analisis keuangan',
      prospekKarir: ['Akuntan', 'Auditor', 'Tax Consultant'],
      gajiRataRata: 'Rp 5-10 juta',
      popularitas: 85,
      icon: '💰',
      passing_grade: '75-85'
    },
    {
      id: 5,
      nama: 'Hukum',
      kampus: 'Universitas Indonesia (UI)',
      kategori: 'Soshum',
      deskripsi: 'Studi tentang sistem hukum dan peraturan',
      prospekKarir: ['Advokat', 'Legal Officer', 'Notaris'],
      gajiRataRata: 'Rp 6-15 juta',
      popularitas: 82,
      icon: '⚖️',
      passing_grade: '75-85'
    },
    {
      id: 6,
      nama: 'Teknik Elektro',
      kampus: 'Institut Teknologi Bandung (ITB)',
      kategori: 'Saintek',
      deskripsi: 'Mempelajari sistem kelistrikan dan elektronika',
      prospekKarir: ['Electrical Engineer', 'IoT Developer', 'Automation Engineer'],
      gajiRataRata: 'Rp 7-13 juta',
      popularitas: 80,
      icon: '⚡',
      passing_grade: '80-90'
    },
    {
      id: 7,
      nama: 'Psikologi',
      kampus: 'Universitas Gadjah Mada (UGM)',
      kategori: 'Soshum',
      deskripsi: 'Ilmu tentang perilaku dan mental manusia',
      prospekKarir: ['Psikolog', 'HR Specialist', 'Counselor'],
      gajiRataRata: 'Rp 5-10 juta',
      popularitas: 78,
      icon: '🧠',
      passing_grade: '75-85'
    },
    {
      id: 8,
      nama: 'Teknik Sipil',
      kampus: 'Institut Teknologi Sepuluh Nopember (ITS)',
      kategori: 'Saintek',
      deskripsi: 'Perencanaan dan pembangunan infrastruktur',
      prospekKarir: ['Civil Engineer', 'Project Manager', 'Quantity Surveyor'],
      gajiRataRata: 'Rp 6-12 juta',
      popularitas: 75,
      icon: '🏗️',
      passing_grade: '75-85'
    },
    {
      id: 9,
      nama: 'Farmasi',
      kampus: 'Institut Pertanian Bogor (IPB)',
      kategori: 'Saintek',
      deskripsi: 'Ilmu tentang obat-obatan dan kesehatan',
      prospekKarir: ['Apoteker', 'Research Scientist', 'Quality Control'],
      gajiRataRata: 'Rp 5-10 juta',
      popularitas: 72,
      icon: '💊',
      passing_grade: '80-90'
    },
    {
      id: 10,
      nama: 'Ilmu Komunikasi',
      kampus: 'Universitas Padjadjaran (UNPAD)',
      kategori: 'Soshum',
      deskripsi: 'Studi tentang komunikasi massa dan media',
      prospekKarir: ['Content Creator', 'Public Relations', 'Journalist'],
      gajiRataRata: 'Rp 5-9 juta',
      popularitas: 70,
      icon: '📱',
      passing_grade: '70-80'
    },
    {
      id: 11,
      nama: 'Arsitektur',
      kampus: 'Universitas Diponegoro (UNDIP)',
      kategori: 'Saintek',
      deskripsi: 'Desain dan perencanaan bangunan',
      prospekKarir: ['Arsitek', 'Interior Designer', 'Urban Planner'],
      gajiRataRata: 'Rp 6-12 juta',
      popularitas: 68,
      icon: '🏛️',
      passing_grade: '75-85'
    },
    {
      id: 12,
      nama: 'Desain Komunikasi Visual',
      kampus: 'Institut Teknologi Bandung (ITB)',
      kategori: 'Seni',
      deskripsi: 'Seni desain grafis dan komunikasi visual',
      prospekKarir: ['Graphic Designer', 'UI/UX Designer', 'Creative Director'],
      gajiRataRata: 'Rp 5-10 juta',
      popularitas: 65,
      icon: '🎨',
      passing_grade: '70-80'
    }
  ];

  const kategoriList = ['all', 'Saintek', 'Soshum', 'Seni'];

  const filteredJurusan = jurusanList.filter(jurusan => {
    const matchSearch = jurusan.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = filterKategori === 'all' || jurusan.kategori === filterKategori;
    return matchSearch && matchKategori;
  });

  return (
    <div id="jurusan-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900 font-bold text-3xl">
            Eksplorasi Jurusan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jurusan yang sesuai dengan minat dan bakat, lengkap dengan prospek karir
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari nama jurusan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
              />
            </div>
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
            >
              <option value="all">Semua Kategori</option>
              {kategoriList.slice(1).map((kategori) => (
                <option key={kategori} value={kategori}>
                  {kategori}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Jurusan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJurusan.map((jurusan) => (
            <div
              key={jurusan.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{jurusan.icon}</div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {jurusan.kategori}
                  </span>
                </div>

                <h3 className="font-bold mb-2 text-gray-900">{jurusan.nama}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-blue-600 font-medium">{jurusan.kampus}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{jurusan.deskripsi}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">
                      Passing Grade: <span className="font-medium text-gray-900">{jurusan.passing_grade}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600">
                      Gaji: <span className="font-medium text-gray-900">{jurusan.gajiRataRata}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Popularitas</span>
                        <span className="font-medium text-gray-900">{jurusan.popularitas}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full"
                          style={{ width: `${jurusan.popularitas}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">Prospek Karir:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {jurusan.prospekKarir.map((karir, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {karir}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJurusan.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada jurusan yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}