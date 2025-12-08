import { Award, Calendar, DollarSign, Users, ExternalLink, CheckCircle } from 'lucide-react';

export function BeasiswaSection() {
  const beasiswaList = [
    {
      id: 1,
      nama: 'KIP Kuliah',
      penyelenggara: 'Kemendikbudristek',
      nominal: 'Full (UKT + Hidup)',
      deadline: '31 Maret 2026',
      kuota: '200.000 penerima',
      status: 'Dibuka',
      persyaratan: ['Tidak mampu ekonomi', 'Prestasi akademik baik', 'Rekomendasi sekolah'],
      icon: '🎓',
      link: 'https://kip-kuliah.kemdikbud.go.id',
      color: 'blue'
    },
    {
      id: 2,
      nama: 'Beasiswa Unggulan',
      penyelenggara: 'Kemendikbudristek',
      nominal: 'Rp 20 juta/tahun',
      deadline: '15 April 2026',
      kuota: '1.000 penerima',
      status: 'Dibuka',
      persyaratan: ['Prestasi akademik tinggi', 'Aktif organisasi', 'Essay motivasi'],
      icon: '🏆',
      link: 'https://beasiswaunggulan.kemdikbud.go.id',
      color: 'yellow'
    },
    {
      id: 3,
      nama: 'LPDP',
      penyelenggara: 'Kemenkeu',
      nominal: 'Full (S2/S3)',
      deadline: 'Januari - Februari 2026',
      kuota: '3.000 penerima',
      status: 'Segera Dibuka',
      persyaratan: ['IPK min 3.0', 'Lulus S1', 'LoA universitas', 'TOEFL/IELTS'],
      icon: '🌟',
      link: 'https://lpdp.kemenkeu.go.id',
      color: 'green'
    },
    {
      id: 4,
      nama: 'Beasiswa Bank Indonesia',
      penyelenggara: 'Bank Indonesia',
      nominal: 'Rp 15 juta/tahun',
      deadline: '30 April 2026',
      kuota: '500 penerima',
      status: 'Dibuka',
      persyaratan: ['IPK min 3.0', 'Semester 3-6', 'Jurusan ekonomi/sosial'],
      icon: '🏦',
      link: 'https://bi.go.id',
      color: 'purple'
    },
    {
      id: 5,
      nama: 'Beasiswa Djarum Plus',
      penyelenggara: 'Djarum Foundation',
      nominal: 'Rp 12 juta + Pelatihan',
      deadline: '31 Mei 2026',
      kuota: '1.000 penerima',
      status: 'Dibuka',
      persyaratan: ['Semester 4-6', 'IPK min 3.2', 'Aktif organisasi'],
      icon: '🎯',
      link: 'https://djarumbeasiswaplus.org',
      color: 'red'
    },
    {
      id: 6,
      nama: 'Beasiswa Tanoto Foundation',
      penyelenggara: 'Tanoto Foundation',
      nominal: 'Full + Living Cost',
      deadline: '15 Maret 2026',
      kuota: '300 penerima',
      status: 'Dibuka',
      persyaratan: ['Kurang mampu', 'IPK min 3.0', 'Leadership potential'],
      icon: '💎',
      link: 'https://tanotofoundation.org',
      color: 'cyan'
    }
  ];

  const tipsBeasiswa = [
    {
      title: 'Persiapkan Dokumen Awal',
      description: 'KTP, KK, Slip Gaji Ortu, Sertifikat Prestasi, Transkrip Nilai',
      icon: '📄'
    },
    {
      title: 'Tulis Essay yang Menarik',
      description: 'Ceritakan kisah personal, motivasi, dan kontribusi yang ingin diberikan',
      icon: '✍️'
    },
    {
      title: 'Aktif Organisasi',
      description: 'Pengalaman organisasi jadi nilai plus untuk seleksi beasiswa',
      icon: '👥'
    },
    {
      title: 'Pantau Deadline',
      description: 'Jangan sampai terlewat! Set reminder untuk setiap beasiswa',
      icon: '⏰'
    }
  ];

  return (
    <div id="beasiswa-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900 font-bold text-3xl">
            Informasi Beasiswa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dapatkan bantuan biaya kuliah dari berbagai program beasiswa terpercaya
          </p>
        </div>

        {/* CTA Banner */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-8 mb-12 text-white text-center border border-gray-200">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h3 className="font-bold text-2xl mb-2">Jangan Lewatkan Kesempatan Emas!</h3>
          <p className="mb-4 text-gray-300">
            Lebih dari 200.000 beasiswa tersedia untuk mahasiswa Indonesia
          </p>
          <div className="flex gap-4 justify-center">
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <p className="font-bold text-xl">6+</p>
              <p className="text-sm text-gray-300">Program Aktif</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <p className="font-bold text-xl">200K+</p>
              <p className="text-sm text-gray-300">Penerima/Tahun</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-lg px-6 py-3">
              <p className="font-bold text-xl">100%</p>
              <p className="text-sm text-gray-300">Gratis</p>
            </div>
          </div>
        </div>

        {/* Beasiswa List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {beasiswaList.map((beasiswa) => (
            <div
              key={beasiswa.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all overflow-hidden"
            >
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl">{beasiswa.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    beasiswa.status === 'Dibuka' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {beasiswa.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1 text-gray-900">{beasiswa.nama}</h3>
                <p className="text-sm text-gray-600">{beasiswa.penyelenggara}</p>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Nominal</p>
                      <p className="text-sm font-medium text-gray-900">{beasiswa.nominal}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Deadline</p>
                      <p className="text-sm font-medium text-gray-900">{beasiswa.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600">Kuota</p>
                      <p className="text-sm font-medium text-gray-900">{beasiswa.kuota}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Persyaratan:</p>
                  <ul className="space-y-1">
                    {beasiswa.persyaratan.map((syarat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
                        <span>{syarat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={beasiswa.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all text-white bg-gray-900 hover:bg-gray-800"
                >
                  <span>Info Lengkap</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="font-bold text-xl mb-6 text-center text-gray-900">Tips Mendapatkan Beasiswa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tipsBeasiswa.map((tip, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{tip.icon}</div>
                <h4 className="font-bold mb-2 text-gray-900">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}