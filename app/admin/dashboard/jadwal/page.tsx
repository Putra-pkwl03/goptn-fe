
﻿import  KelolaJadwalSection  from "@/app/components/dashboard-admin/KelolaJadwalSection";

export default function Page() {
  return (
    <KelolaJadwalSection />
  )
}

﻿"use client";

import { useState } from "react";
import AddJadwalModal, { JadwalForm } from "../../../components/dashboard-admin/AddJadwalModal";
import { Plus, Eye, EyeOff, Edit2, Trash2 } from "lucide-react";

interface Jadwal extends JadwalForm {
  id: number;
}

export default function JadwalPage() {
  const [jadwalData, setJadwalData] = useState<Jadwal[]>([
    {
      id: 1,
      jalur: "SNBP",
      tipeJalur: "Nasional",
      tanggalMulai: "2025-07-01",
      tanggalAkhir: "2025-07-15",
      status: "Aktif",
      visible: true,
      deskripsi: "",
      tahapan: [],
    },
    {
      id: 2,
      jalur: "SNBT",
      tipeJalur: "Nasional",
      tanggalMulai: "2025-08-01",
      tanggalAkhir: "2025-08-15",
      status: "Tidak Aktif",
      visible: false,
      deskripsi: "",
      tahapan: [],
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
      deskripsi: "",
      tahapan: [],
    },
  ]);

  const [showAddJadwalModal, setShowAddJadwalModal] = useState(false);
  const [newJadwal, setNewJadwal] = useState<JadwalForm | null>(null);

  const mockKampusList = [
    { id: 1, nama: "Universitas Indonesia" },
    { id: 2, nama: "Universitas Gadjah Mada" },
    { id: 3, nama: "Institut Teknologi Bandung" },
  ];

  const defaultNewJadwal: JadwalForm = {
    tipeJalur: "Nasional",
    jalur: "",
    tanggalMulai: "",
    tanggalAkhir: "",
    status: "Aktif",
    visible: true,
    deskripsi: "",
    tahapan: [],
  };

  const toggleVisibility = (id: number) => {
    setJadwalData(prev =>
      prev.map(j => (j.id === id ? { ...j, visible: !j.visible } : j))
    );
  };

  const handleEditJadwal = (jadwal: Jadwal) => {
    setNewJadwal(jadwal);
    setShowAddJadwalModal(true);
  };

  const handleDeleteJadwal = (id: number) => {
    if (confirm("Apakah yakin ingin menghapus jadwal ini?")) {
      setJadwalData(prev => prev.filter(j => j.id !== id));
    }
  };

  const handleAddJadwal = (jadwal: JadwalForm) => {
    if ("id" in jadwal && jadwal.id) {
      // Edit jadwal
      setJadwalData(prev =>
        prev.map(j =>
          j.id === jadwal.id
            ? { ...j, ...jadwal, id: j.id }
            : j
        )
      );
    } else {
      // Tambah jadwal baru
      const newId = jadwalData.length
        ? Math.max(...jadwalData.map(j => j.id)) + 1
        : 1;
      setJadwalData(prev => [...prev, { ...jadwal, id: newId }]);
    }
    setShowAddJadwalModal(false);
    setNewJadwal(null);
  };

  const addTahapan = () => {
    setNewJadwal(prev =>
      prev
        ? {
            ...prev,
            tahapan: [
              ...(prev.tahapan || []),
              {
                id: Date.now(), // or use a better unique id generator
                nama: "",
                tanggalMulai: "",
                tanggalAkhir: "",
              },
            ],
          }
        : prev
    );
  };

  const removeTahapan = (index: number) => {
    setNewJadwal(prev => {
      if (!prev) return prev;
      const updated = [...(prev.tahapan || [])];
      updated.splice(index, 1);
      return { ...prev, tahapan: updated };
    });
  };

  const updateTahapan = (index: number, value: any) => {
    setNewJadwal(prev => {
      if (!prev) return prev;
      const updated = [...(prev.tahapan || [])];
      updated[index] = value;
      return { ...prev, tahapan: updated };
    });
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
          onClick={() => {
            setNewJadwal(defaultNewJadwal);
            setShowAddJadwalModal(true);
          }}
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

      <AddJadwalModal
        show={showAddJadwalModal}
        setShow={setShowAddJadwalModal}
        newJadwal={newJadwal || defaultNewJadwal}
        setNewJadwal={setNewJadwal as React.Dispatch<React.SetStateAction<JadwalForm | null>>}
        mockKampusList={mockKampusList}
        addTahapan={addTahapan}
        removeTahapan={removeTahapan}
        updateTahapan={updateTahapan}
        handleAddJadwal={handleAddJadwal}
      />
    </div>
  );
}

