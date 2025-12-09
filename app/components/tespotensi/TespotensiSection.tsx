
import { Brain, Compass, Lightbulb, TrendingUp, Play, CheckCircle } from 'lucide-react';

export function TesPotensiSection() {
  const tesTypes = [
    {
      id: 1,
      nama: 'Tes Minat Bakat',
      deskripsi: 'Temukan jurusan yang sesuai dengan minat dan bakatmu',
      durasi: '15 menit',
      soal: '50 pertanyaan',
      icon: '🎯',
      color: 'pink',
      features: ['Analisis kepribadian', 'Rekomendasi 5 jurusan', 'Tips pengembangan'],
      hasil: 'Laporan lengkap minat & bakat'
    },
    {
      id: 2,
      nama: 'Tes Kepribadian',
      deskripsi: 'Kenali tipe kepribadian dan karakter dirimu',
      durasi: '20 menit',
      soal: '60 pertanyaan',
      icon: '🧠',
      color: 'purple',
      features: ['16 tipe kepribadian', 'Kekuatan & kelemahan', 'Karir cocok'],
      hasil: 'Profile kepribadian MBTI'
    },
    {
      id: 3,
      nama: 'Tes Kecerdasan Majemuk',
      deskripsi: 'Ukur berbagai aspek kecerdasanmu',
      durasi: '25 menit',
      soal: '70 pertanyaan',
      icon: '💡',
      color: 'blue',
      features: ['8 jenis kecerdasan', 'Visual chart', 'Strategi belajar'],
      hasil: 'Multiple Intelligence Profile'
    }
  ];

  const kecerdasanTypes = [
    { nama: 'Linguistik', icon: '📝', deskripsi: 'Kemampuan berbahasa' },
    { nama: 'Logika-Matematika', icon: '🔢', deskripsi: 'Penalaran & angka' },
    { nama: 'Visual-Spasial', icon: '🎨', deskripsi: 'Seni & desain' },
    { nama: 'Musikal', icon: '🎵', deskripsi: 'Musik & ritme' },
    { nama: 'Kinestetik', icon: '⚽', deskripsi: 'Gerakan & olahraga' },
    { nama: 'Interpersonal', icon: '👥', deskripsi: 'Hubungan sosial' },
    { nama: 'Intrapersonal', icon: '🧘', deskripsi: 'Pemahaman diri' },
    { nama: 'Naturalis', icon: '🌿', deskripsi: 'Alam & lingkungan' }
  ];

  const benefits = [
    {
      icon: '🎯',
      title: 'Pilihan Tepat',
      description: 'Hindari salah jurusan dengan mengenali minat sejak awal'
    },
    {
      icon: '🚀',
      title: 'Maksimalkan Potensi',
      description: 'Kembangkan bakat sesuai dengan kekuatan alami'
    },
    {
      icon: '💼',
      title: 'Karir Jelas',
      description: 'Rencanakan masa depan dengan prospek karir yang sesuai'
    },
    {
      icon: '✨',
      title: 'Percaya Diri',
      description: 'Yakin dengan pilihan jurusan dan universitas'
    }
  ];

  const testimonials = [
    {
      nama: 'Sarah Amanda',
      jurusan: 'Teknik Informatika UI',
      foto: '👩',
      testimoni: 'Tes potensi membantu saya menemukan passion di bidang teknologi. Sekarang kuliah jadi lebih menyenangkan!',
      rating: 5
    },
    {
      nama: 'Rizki Pratama',
      jurusan: 'Kedokteran UGM',
      foto: '👨',
      testimoni: 'Awalnya ragu pilih kedokteran, tapi setelah tes potensi, saya jadi yakin dengan pilihan ini.',
      rating: 5
    },
    {
      nama: 'Dina Wulandari',
      jurusan: 'Desain Komunikasi Visual ITB',
      foto: '👩',
      testimoni: 'Ternyata kecerdasan visual-spasial saya tinggi. Sekarang saya kuliah di jurusan impian!',
      rating: 5
    }
  ];

  return (
    <div id="tes-potensi-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-gray-900 font-bold text-3xl">
            Tes Potensi Diri
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jurusan yang paling sesuai dengan minat, bakat, dan kepribadianmu
          </p>
        </div>

        {/* Hero CTA */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-8 mb-12 text-white text-center border border-gray-200">
          <Brain className="w-16 h-16 mx-auto mb-4" />
          <h3 className="font-bold text-2xl mb-2">Kenali Potensi Dirimu Sekarang!</h3>
          <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
            Lebih dari 50.000 siswa telah menemukan jurusan yang tepat dengan tes potensi kami
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all font-medium text-lg flex items-center gap-2 mx-auto">
            <Play className="w-6 h-6" />
            Mulai Tes Gratis
          </button>
        </div>

        {/* Test Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tesTypes.map((tes) => (
            <div
              key={tes.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all overflow-hidden"
            >
              <div className="bg-gray-50 p-6 text-gray-900 text-center border-b border-gray-200">
                <div className="text-5xl mb-3">{tes.icon}</div>
                <h3 className="font-bold text-xl mb-2">{tes.nama}</h3>
                <p className="text-sm text-gray-600">{tes.durasi} • {tes.soal}</p>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{tes.deskripsi}</p>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Yang Akan Kamu Dapat:</p>
                  {tes.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-3 h-3 text-gray-700" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                  <p className="text-xs text-gray-600 mb-1">Hasil Tes:</p>
                  <p className="text-sm font-medium text-gray-800">{tes.hasil}</p>
                </div>

                <button className="w-full py-3 rounded-lg font-medium transition-all text-white bg-gray-900 hover:bg-gray-800">
                  Mulai Tes
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Kecerdasan */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="font-bold text-xl mb-2 text-gray-900">8 Jenis Kecerdasan Majemuk</h3>
            <p className="text-gray-600">Setiap orang memiliki kombinasi kecerdasan yang unik</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kecerdasanTypes.map((kecerdasan, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:border-gray-400 transition-all"
              >
                <div className="text-4xl mb-2">{kecerdasan.icon}</div>
                <p className="font-bold text-sm mb-1 text-gray-900">{kecerdasan.nama}</p>
                <p className="text-xs text-gray-600">{kecerdasan.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-5xl mb-3">{benefit.icon}</div>
              <h4 className="font-bold mb-2 text-gray-900">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 mb-12">
          <h3 className="font-bold text-xl text-center mb-8 text-gray-900">Cara Kerja Tes Potensi</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Pilih Tes</h4>
              <p className="text-sm text-gray-600">Pilih jenis tes yang ingin diikuti</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Jawab Pertanyaan</h4>
              <p className="text-sm text-gray-600">Jawab dengan jujur sesuai kondisi dirimu</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Analisis Hasil</h4>
              <p className="text-sm text-gray-600">Sistem akan menganalisis jawabanmu</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h4 className="font-bold mb-2 text-gray-900">Dapatkan Rekomendasi</h4>
              <p className="text-sm text-gray-600">Terima rekomendasi jurusan yang cocok</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="font-bold text-xl text-center mb-8 text-gray-900">Cerita Mereka yang Berhasil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testi.foto}</div>
                  <div>
                    <p className="font-bold text-gray-900">{testi.nama}</p>
                    <p className="text-xs text-gray-600">{testi.jurusan}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testi.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">{testi.testimoni}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-bold text-3xl text-gray-900 mb-1">50K+</p>
              <p className="text-sm text-gray-600">Peserta Tes</p>
            </div>
            <div>
              <p className="font-bold text-3xl text-gray-900 mb-1">92%</p>
              <p className="text-sm text-gray-600">Puas dengan Hasil</p>
            </div>
            <div>
              <p className="font-bold text-3xl text-gray-900 mb-1">15 menit</p>
              <p className="text-sm text-gray-600">Durasi Rata-rata</p>
            </div>
            <div>
              <p className="font-bold text-3xl text-gray-900 mb-1">100%</p>
              <p className="text-sm text-gray-600">Gratis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}