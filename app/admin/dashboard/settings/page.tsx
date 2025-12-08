"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoNotifikasi, setAutoNotifikasi] = useState(true);
  const [registrasiTerbuka, setRegistrasiTerbuka] = useState(true);

  const handleResetData = () => {
    if (confirm("Apakah Anda yakin ingin mereset semua data siswa?")) {
      alert("Data siswa berhasil direset (mock)");
    }
  };

  const handleExportDatabase = () => {
    alert("Export database berhasil (mock)");
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Masukkan password baru:");
    if (newPassword) {
      alert("Password berhasil diubah (mock)");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-2 text-2xl font-bold">Pengaturan Sistem</h2>
        <p className="text-gray-600">Konfigurasi umum aplikasi Go PTN</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">Pengaturan Umum</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">Maintenance Mode</p>
              <p className="text-sm text-gray-600">Nonaktifkan akses user sementara</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div>
              <p className="font-medium">Auto Notifikasi</p>
              <p className="text-sm text-gray-600">Kirim notifikasi otomatis untuk deadline</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoNotifikasi}
                onChange={() => setAutoNotifikasi(!autoNotifikasi)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium">Registrasi Terbuka</p>
              <p className="text-sm text-gray-600">Izinkan pendaftaran siswa baru</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={registrasiTerbuka}
                onChange={() => setRegistrasiTerbuka(!registrasiTerbuka)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Admin Account */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold mb-4">Akun Admin</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email Admin</label>
            <input
              type="email"
              defaultValue="admin@goptn.id"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              disabled
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Ubah Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <h3 className="font-bold text-red-800 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button
            onClick={handleResetData}
            className="w-full px-6 py-3 bg-white border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all"
          >
            Reset Semua Data Siswa
          </button>
          <button
            onClick={handleExportDatabase}
            className="w-full px-6 py-3 bg-white border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-all"
          >
            Export Database
          </button>
        </div>
      </div>
    </div>
  );
}

