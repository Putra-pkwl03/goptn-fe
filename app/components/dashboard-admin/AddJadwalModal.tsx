"use client";

import { Calendar, Save } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Tahapan {
  id: number;
  nama: string;
  tanggalMulai: string;
  tanggalAkhir: string;
}

export interface JadwalForm {
  tipeJalur: "Nasional" | "Mandiri";
  kampusId?: number;
  kampusNama?: string;
  jalur: string;
  tanggalMulai: string;
  tanggalAkhir: string;
  status: "Aktif" | "Tidak Aktif";
  deskripsi: string;
  visible: boolean;
  tahapan: Tahapan[];
}

interface AddJadwalModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  newJadwal: JadwalForm | null;
  setNewJadwal: React.Dispatch<React.SetStateAction<JadwalForm | null>>;
  mockKampusList: { id: number; nama: string }[];
  addTahapan: () => void;
  removeTahapan: (index: number) => void;
  updateTahapan: (index: number, value: any) => void;
  handleAddJadwal: (jadwal: JadwalForm) => void;
}

export default function AddJadwalModal({
  show,
  setShow,
  newJadwal,
  setNewJadwal,
  mockKampusList,
  addTahapan,
  removeTahapan,
  updateTahapan,
  handleAddJadwal,
}: AddJadwalModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Tambah/Edit Jadwal PTN
          </h3>
          <button onClick={() => setShow(false)} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Tipe Jalur */}
          <div>
            <label className="block text-sm font-medium mb-2">Tipe Jalur</label>
            <select
              value={newJadwal?.tipeJalur ?? ""}
              onChange={(e) => {
                if (!newJadwal) return;
                setNewJadwal({
                  ...newJadwal,
                  tipeJalur: e.target.value as "Nasional" | "Mandiri",
                  kampusId: e.target.value === "Nasional" ? undefined : newJadwal.kampusId,
                  kampusNama: e.target.value === "Nasional" ? "" : newJadwal.kampusNama,
                });
              }}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="Nasional">Nasional (SNBP, SNBT)</option>
              <option value="Mandiri">Mandiri (Per Kampus)</option>
            </select>
          </div>

          {newJadwal && newJadwal.tipeJalur === "Mandiri" && (
            <div>
              <label className="block text-sm font-medium mb-2">Pilih Kampus</label>
              <select
                value={newJadwal.kampusId || ""}
                onChange={(e) => {
                  const selectedKampus = mockKampusList.find(k => k.id === Number(e.target.value));
                  setNewJadwal({
                    ...newJadwal,
                    kampusId: Number(e.target.value),
                    kampusNama: selectedKampus?.nama || "",
                  });
                }}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="">-- Pilih Kampus --</option>
                {mockKampusList.map(kampus => (
                  <option key={kampus.id} value={kampus.id}>{kampus.nama}</option>
                ))}
              </select>
            </div>
          )}

          {/* Nama Jalur */}
          <div>
            <label className="block text-sm font-medium mb-2">Nama Jalur</label>
            <input
              type="text"
              value={newJadwal?.jalur ?? ""}
              onChange={(e) => newJadwal && setNewJadwal({ ...newJadwal, jalur: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Tanggal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tanggal Mulai</label>
              <input
                type="date"
                value={newJadwal?.tanggalMulai ?? ""}
                onChange={(e) => newJadwal && setNewJadwal({ ...newJadwal, tanggalMulai: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tanggal Akhir</label>
              <input
                type="date"
                value={newJadwal?.tanggalAkhir ?? ""}
                onChange={(e) => newJadwal && setNewJadwal({ ...newJadwal, tanggalAkhir: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={newJadwal?.status ?? ""}
              onChange={(e) => newJadwal && setNewJadwal({ ...newJadwal, status: e.target.value as "Aktif" | "Tidak Aktif" })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
              rows={3}
              value={newJadwal?.deskripsi ?? ""}
              onChange={(e) => newJadwal && setNewJadwal({ ...newJadwal, deskripsi: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
            />
          </div>

          {/* Visible */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newJadwal?.visible ?? false}
              onChange={(e) => newJadwal && setNewJadwal({ ...newJadwal, visible: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm">Tampilkan di platform</label>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
          >
            Batal
          </button>
          <button
            onClick={() => newJadwal && handleAddJadwal(newJadwal)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
