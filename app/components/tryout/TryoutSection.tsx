import { FileText, Clock, Target, Trophy, Play, CheckCircle } from 'lucide-react';

export function TryoutSection() {
  const tryoutPackages = [
    {
      id: 1,
      nama: 'Try Out UTBK Gratis',
      tipe: 'Gratis',
      durasi: '180 menit',
      soal: '100 soal',
      materi: ['TPS', 'Literasi B. Indonesia', 'Literasi B. Inggris'],
      fitur: ['Pembahasan lengkap', 'Ranking nasional', 'Analisis hasil'],
      color: 'green',
      icon: '📝',
      price: 'Gratis'
    },
    {
      id: 2,
      nama: 'Try Out UTBK Premium',
      tipe: 'Premium',
      durasi: '180 menit',
      soal: '150 soal',
      materi: ['TPS', 'Literasi', 'Penalaran Matematika', 'Saintek/Soshum'],
      fitur: ['Pembahasan video', 'Ranking nasional', 'Prediksi PTN', 'Konsultasi mentor'],
      color: 'blue',
      icon: '🏆',
      price: 'Rp 50.000'
    },
    {
      id: 3,
      nama: 'Paket Intensif 10x TO',
      tipe: 'Intensif',
      durasi: '10 sesi',
      soal: '1.500 soal',
      materi: ['Full UTBK Package', 'Simulasi Computer Based Test', 'Live Class'],
      fitur: ['10x Try Out', 'Pembahasan live', 'Bimbingan intensif', 'Garansi nilai'],
      color: 'purple',
      icon: '🎯',
      price: 'Rp 350.000'
    }
  ];

  const statistics = [
    {
      icon: '👥',
      value: '50.000+',
      label: 'Peserta Aktif'
    },
    {
      icon: '📊',
      value: '85%',
      label: 'Lolos PTN'
    },
    {
      icon: '⭐',
      value: '4.8/5',
      label: 'Rating'
    },
    {
      icon: '🎓',
      value: '1.000+',
      label: 'Soal Berkualitas'
    }
  ];

  const materiBelajar = [
    {
      kategori: 'Tes Potensi Skolastik (TPS)',
      topik: ['Penalaran Umum', 'Pemahaman Bacaan', 'Pengetahuan Kuantitatif', 'Pengetahuan & Pemahaman Umum'],
      icon: '🧩'
    },
    {
      kategori: 'Literasi',
      topik: ['Literasi Bahasa Indonesia', 'Literasi Bahasa Inggris'],
      icon: '📚'
    },
    {
      kategori: 'Penalaran Matematika',
      topik: ['Aljabar', 'Geometri', 'Statistika', 'Peluang'],
      icon: '🔢'
    },
    {
      kategori: 'Saintek (Opsional)',
      topik: ['Matematika', 'Fisika', 'Kimia', 'Biologi'],
      icon: '🔬'
    },
    {
      kategori: 'Soshum (Opsional)',
      topik: ['Geografi', 'Sejarah', 'Sosiologi', 'Ekonomi'],
      icon: '🌍'
    }
  ];

  return (
    <div id="tryout-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900 font-bold text-3xl">
            Try Out UTBK
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Latihan soal UTBK dengan sistem Computer Based Test yang mirip ujian sebenarnya
          </p>
        </div>

        {/* Hero Banner */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-8 mb-12 text-white border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-2xl mb-4">Persiapan UTBK 2026</h3>
              <p className="mb-6 text-gray-300">
                Sistem CBT yang mirip dengan ujian asli, dilengkapi pembahasan lengkap dan prediksi peluang lolos PTN
              </p>
              <button className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2 font-medium">
                <Play className="w-5 h-5" />
                Mulai Try Out Gratis
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {statistics.map((stat, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="font-bold text-xl">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tryoutPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition-all overflow-hidden ${
                pkg.tipe === 'Premium' ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {pkg.tipe === 'Premium' && (
                <div className="bg-gray-900 text-white text-center py-2 text-sm font-medium">
                  ⭐ Paling Populer
                </div>
              )}
              
              <div className="bg-gray-50 p-6 text-gray-900 text-center border-b border-gray-200">
                <div className="text-5xl mb-3">{pkg.icon}</div>
                <h3 className="font-bold text-xl mb-2">{pkg.nama}</h3>
                <p className="text-3xl font-bold mb-1">{pkg.price}</p>
                <p className="text-sm text-gray-600">{pkg.soal} • {pkg.durasi}</p>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Materi:</p>
                  {pkg.materi.map((materi, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3 h-3 text-gray-600" />
                      <span className="text-sm text-gray-600">{materi}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Fitur:</p>
                  {pkg.fitur.map((fitur, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3 h-3 text-gray-600" />
                      <span className="text-sm text-gray-600">{fitur}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 rounded-lg font-medium transition-all text-white bg-gray-900 hover:bg-gray-800">
                  {pkg.price === 'Gratis' ? 'Mulai Sekarang' : 'Beli Paket'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Materi Belajar */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h3 className="font-bold text-xl mb-6 text-center text-gray-900">Materi yang Akan Dipelajari</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materiBelajar.map((materi, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:border-gray-400 transition-all">
                <div className="text-4xl mb-3 text-center">{materi.icon}</div>
                <h4 className="font-bold mb-3 text-center text-gray-900">{materi.kategori}</h4>
                <ul className="space-y-2">
                  {materi.topik.map((topik, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Target className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                      <span>{topik}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-gray-700" />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">Soal Berkualitas</h4>
            <p className="text-sm text-gray-600">Dibuat oleh tim ahli sesuai kisi-kisi UTBK</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-gray-700" />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">Timer Real-time</h4>
            <p className="text-sm text-gray-600">Simulasi waktu seperti ujian sebenarnya</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-gray-700" />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">Ranking Nasional</h4>
            <p className="text-sm text-gray-600">Bandingkan skormu dengan peserta lain</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-gray-700" />
            </div>
            <h4 className="font-bold mb-2 text-gray-900">Prediksi Akurat</h4>
            <p className="text-sm text-gray-600">Estimasi peluang lolos PTN impian</p>
          </div>
        </div>
      </div>
    </div>
  );
}