import { Calendar, Clock, BookOpen } from 'lucide-react';

// interface InfoJalurMasukProps {
//   onNotificationClick?: () => void;
// }

export default function EntranceInfor({ onNotify }) {
  const jalurMasuk = [
    {
      nama: 'SNBP',
      deskripsi: 'Seleksi Nasional Berdasarkan Prestasi',
      icon: BookOpen,
      color: 'blue',
      jadwal: [
        { kegiatan: 'Pendaftaran Akun SNPMB', tanggal: '9 Januari - 15 Februari 2025' },
        { kegiatan: 'Pengisian PDSS oleh Sekolah', tanggal: '9 Januari - 14 Februari 2025' },
        { kegiatan: 'Pendaftaran SNBP', tanggal: '17 Februari - 11 Maret 2025' },
        { kegiatan: 'Pengumuman Hasil', tanggal: '25 Maret 2025' }
      ]
    },
    {
      nama: 'SNBT',
      deskripsi: 'Seleksi Nasional Berdasarkan Tes (UTBK)',
      icon: Calendar,
      color: 'purple',
      jadwal: [
        { kegiatan: 'Pendaftaran SNBT', tanggal: '25 Maret - 3 April 2025' },
        { kegiatan: 'Pelaksanaan UTBK Gelombang 1', tanggal: '27 April - 3 Mei 2025' },
        { kegiatan: 'Pelaksanaan UTBK Gelombang 2', tanggal: '10 - 16 Mei 2025' },
        { kegiatan: 'Pengumuman Hasil', tanggal: '13 Juni 2025' }
      ]
    },
    {
      nama: 'JALUR MANDIRI',
      deskripsi: 'Seleksi Mandiri oleh PTN',
      icon: Clock,
      color: 'green',
      jadwal: [
        { kegiatan: 'Pendaftaran (Bervariasi per PTN)', tanggal: 'Juni - Juli 2025' },
        { kegiatan: 'Pelaksanaan Tes', tanggal: 'Juli - Agustus 2025' },
        { kegiatan: 'Pengumuman Hasil', tanggal: 'Agustus - September 2025' }
      ]
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-100 text-blue-600',
      badge: 'bg-blue-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'bg-purple-100 text-purple-600',
      badge: 'bg-purple-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'bg-green-100 text-green-600',
      badge: 'bg-green-600'
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4">Informasi Jalur Masuk PTN 2025</h2>
          <p className="text-gray-600">
            Jadwal lengkap dan terupdate untuk semua jalur masuk perguruan tinggi negeri
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {jalurMasuk.map((jalur) => {
            const Icon = jalur.icon;
            const colors = colorClasses[jalur.color];
            
            return (
              <div
                key={jalur.nama}
                className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-lg transition-all`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{jalur.nama}</h3>
                    <p className="text-sm text-gray-600">{jalur.deskripsi}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {jalur.jadwal.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 ${colors.badge} rounded-full mt-2`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.kegiatan}</p>
                          <p className="text-sm text-gray-500 mt-1">{item.tanggal}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onNotify}
                  className={`w-full mt-6 py-3 ${colors.badge} text-white rounded-lg hover:opacity-90 transition-all`} >
                  Dapatkan Notifikasi
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}