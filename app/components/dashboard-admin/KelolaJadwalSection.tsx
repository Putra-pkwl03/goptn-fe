"use client";

import { useState } from "react";
import { Plus, Eye, EyeOff, Edit2, Trash2 } from "lucide-react";

interface Jadwal {
  id: number;
  jalur: string;
  tipeJalur: "Nasional" | "Mandiri";
  kampusNama?: string;
  tanggalMulai: string;
  tanggalAkhir: string;
  status: "Aktif" | "Tidak Aktif";
  visible: boolean;
}

export default function KelolaJadwalSection() {
  const [jadwalData, setJadwalData] = useState<Jadwal[]>([
    {
      id: 1,
      jalur: "SNBP",
      tipeJalur: "Nasional",
      tanggalMulai: "2025-07-01",
      tanggalAkhir: "2025-07-15",
      status: "Aktif",
      visible: true,
    },
    {
      id: 2,
      jalur: "SNBT",
      tipeJalur: "Nasional",
      tanggalMulai: "2025-08-01",
      tanggalAkhir: "2025-08-15",
      status: "Tidak Aktif",
      visible: false,
    },
    {
      id: 3,
      jalur: "Mandiri",
      tipeJalur: "Mandiri",
      kampusNama: "Universitas Indonesia",
      tanggalMulai: "2025-09-01",
      tanggalAkhir: "2025-09-15",
      status: "Aktif",
      visible: true,
    },
  ]);

  const [showAddJadwalModal, setShowAddJadwalModal] = useState(false);

  const toggleVisibility = (id: number) => {
    setJadwalData((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, visible: !j.visible } : j
      )
    );
  };

  const handleEditJadwal = (jadwal: Jadwal) => {
    console.log("Edit jadwal:", jadwal);
    // TODO: open modal prefilled dengan data jadwal
  };

  const handleDeleteJadwal = (id: number) => {
    if (confirm("Apakah yakin ingin menghapus jadwal ini?")) {
      setJadwalData((prev) => prev.filter((j) => j.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2 text-2xl font-bold">Kelola Jadwal PTN</h2>
          <p className="text-gray-600">Atur jadwal yang ditampilkan di halaman beranda</p>
        </div>
        <button
          onClick={() => setShowAddJadwalModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Jadwal
        </button>
      </div>

      {/* Jadwal Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6">Jalur</th>
                <th className="text-left py-4 px-6">Tipe</th>
                <th className="text-left py-4 px-6">Kampus</th>
                <th className="text-left py-4 px-6">Tanggal Mulai</th>
                <th className="text-left py-4 px-6">Tanggal Akhir</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Visibilitas</th>
                <th className="text-left py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jadwalData.map((jadwal) => (
                <tr
                  key={jadwal.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-medium">{jadwal.jalur}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        jadwal.tipeJalur === "Nasional"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {jadwal.tipeJalur || "Nasional"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {jadwal.tipeJalur === "Mandiri" ? jadwal.kampusNama || "-" : "-"}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(jadwal.tanggalMulai).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(jadwal.tanggalAkhir).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        jadwal.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {jadwal.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleVisibility(jadwal.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                        jadwal.visible
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {jadwal.visible ? (
                        <>
                          <Eye className="w-4 h-4" />
                          <span className="text-xs">Tampil</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span className="text-xs">Sembunyi</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditJadwal(jadwal)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJadwal(jadwal.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Info:</strong> Jadwal yang ditampilkan di beranda adalah jadwal
          dengan status Aktif dan visibilitas Tampil. Gunakan toggle visibilitas
          untuk mengontrol tampilan tanpa menghapus data.
        </p>
      </div>

        {/* Modal Tambah Jadwal */}
        {showAddJadwalModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Tambah Jadwal</h3>

            <p className="text-sm text-gray-600 mb-6">
                Ini modal tambah jadwal (sementara).
            </p>

            <div className="flex justify-end gap-2">
                <button
                onClick={() => setShowAddJadwalModal(false)}
                className="px-4 py-2 border rounded-lg"
                >
                Batal
                </button>
                <button
                onClick={() => setShowAddJadwalModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                Simpan
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
}
