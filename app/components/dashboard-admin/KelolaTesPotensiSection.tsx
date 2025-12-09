'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Brain, Users, Clock } from 'lucide-react';

interface TesPotensiItem {
  id: number;
  nama: string;
  kategori: string;
  durasi: string;
  jumlahSoal: number;
  status: string;
  visible: boolean;
  peserta?: number;
}

export function KelolaTesPotensiSection() {
  const [tesPotensiData, setTesPotensiData] = useState<TesPotensiItem[]>([
    { id: 1, nama: 'Tes Minat & Bakat', kategori: 'Kepribadian', durasi: '45 menit', jumlahSoal: 50, status: 'Aktif', visible: true, peserta: 342 },
    { id: 2, nama: 'Tes Kemampuan Dasar', kategori: 'Akademik', durasi: '60 menit', jumlahSoal: 60, status: 'Aktif', visible: true, peserta: 289 },
    { id: 3, nama: 'Tes Potensi Skolastik', kategori: 'Skolastik', durasi: '90 menit', jumlahSoal: 75, status: 'Aktif', visible: true, peserta: 412 },
    { id: 4, nama: 'Tes Gaya Belajar', kategori: 'Kepribadian', durasi: '30 menit', jumlahSoal: 40, status: 'Aktif', visible: true, peserta: 267 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTesPotensi, setSelectedTesPotensi] = useState<TesPotensiItem | null>(null);
  const [newTesPotensi, setNewTesPotensi] = useState<Omit<TesPotensiItem, 'id'>>({
    nama: '',
    kategori: 'Kepribadian',
    durasi: '45 menit',
    jumlahSoal: 50,
    status: 'Aktif',
    visible: true,
    peserta: 0
  });

  const toggleVisibility = (id: number) => {
    setTesPotensiData(tesPotensiData.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const handleAdd = () => {
    const newId = Math.max(...tesPotensiData.map(t => t.id)) + 1;
    setTesPotensiData([...tesPotensiData, { ...newTesPotensi, id: newId }]);
    setNewTesPotensi({
      nama: '',
      kategori: 'Kepribadian',
      durasi: '45 menit',
      jumlahSoal: 50,
      status: 'Aktif',
      visible: true,
      peserta: 0
    });
    setShowAddModal(false);
  };

  const handleEdit = (tesPotensi: TesPotensiItem) => {
    setSelectedTesPotensi(tesPotensi);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (selectedTesPotensi) {
      setTesPotensiData(tesPotensiData.map(item => 
        item.id === selectedTesPotensi.id ? selectedTesPotensi : item
      ));
      setShowEditModal(false);
      setSelectedTesPotensi(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data tes potensi ini?')) {
      setTesPotensiData(tesPotensiData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2">Kelola Test Potensi Diri</h2>
          <p className="text-gray-600">Kelola berbagai jenis tes untuk analisis potensi dan minat siswa</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Test
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Test</p>
          <p className="font-bold text-2xl">{tesPotensiData.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Test Aktif</p>
          <p className="font-bold text-2xl text-green-600">{tesPotensiData.filter(t => t.status === 'Aktif').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Peserta</p>
          <p className="font-bold text-2xl text-blue-600">{tesPotensiData.reduce((sum, t) => sum + (t.peserta || 0), 0)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Kategori</p>
          <p className="font-bold text-2xl">{new Set(tesPotensiData.map(t => t.kategori)).size}</p>
        </div>
      </div>

      {/* Test Potensi Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6">Nama Test</th>
                <th className="text-left py-4 px-6">Kategori</th>
                <th className="text-left py-4 px-6">Durasi</th>
                <th className="text-left py-4 px-6">Jumlah Soal</th>
                <th className="text-left py-4 px-6">Peserta</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Visibilitas</th>
                <th className="text-left py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tesPotensiData.map((tesPotensi) => (
                <tr key={tesPotensi.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="font-medium">{tesPotensi.nama}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tesPotensi.kategori === 'Kepribadian' ? 'bg-pink-100 text-pink-700' :
                      tesPotensi.kategori === 'Akademik' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {tesPotensi.kategori}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {tesPotensi.durasi}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{tesPotensi.jumlahSoal} soal</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      {tesPotensi.peserta || 0}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tesPotensi.status === 'Aktif' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tesPotensi.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleVisibility(tesPotensi.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                        tesPotensi.visible 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tesPotensi.visible ? (
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
                        onClick={() => handleEdit(tesPotensi)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(tesPotensi.id)}
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Tambah Test Potensi Baru
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Test</label>
                <input
                  type="text"
                  value={newTesPotensi.nama}
                  onChange={(e) => setNewTesPotensi({...newTesPotensi, nama: e.target.value})}
                  placeholder="Contoh: Tes Minat & Bakat"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <select
                    value={newTesPotensi.kategori}
                    onChange={(e) => setNewTesPotensi({...newTesPotensi, kategori: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Kepribadian">Kepribadian</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Skolastik">Skolastik</option>
                    <option value="Minat Karir">Minat Karir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Durasi</label>
                  <input
                    type="text"
                    value={newTesPotensi.durasi}
                    onChange={(e) => setNewTesPotensi({...newTesPotensi, durasi: e.target.value})}
                    placeholder="Contoh: 45 menit"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Soal</label>
                  <input
                    type="number"
                    value={newTesPotensi.jumlahSoal}
                    onChange={(e) => setNewTesPotensi({...newTesPotensi, jumlahSoal: parseInt(e.target.value) || 0})}
                    placeholder="Contoh: 50"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newTesPotensi.status}
                    onChange={(e) => setNewTesPotensi({...newTesPotensi, status: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newTesPotensi.visible}
                  onChange={(e) => setNewTesPotensi({...newTesPotensi, visible: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm">Tampilkan di platform</label>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedTesPotensi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Edit Data Test Potensi
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Test</label>
                <input
                  type="text"
                  value={selectedTesPotensi.nama}
                  onChange={(e) => setSelectedTesPotensi({...selectedTesPotensi, nama: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <select
                    value={selectedTesPotensi.kategori}
                    onChange={(e) => setSelectedTesPotensi({...selectedTesPotensi, kategori: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Kepribadian">Kepribadian</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Skolastik">Skolastik</option>
                    <option value="Minat Karir">Minat Karir</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Durasi</label>
                  <input
                    type="text"
                    value={selectedTesPotensi.durasi}
                    onChange={(e) => setSelectedTesPotensi({...selectedTesPotensi, durasi: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Soal</label>
                  <input
                    type="number"
                    value={selectedTesPotensi.jumlahSoal}
                    onChange={(e) => setSelectedTesPotensi({...selectedTesPotensi, jumlahSoal: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={selectedTesPotensi.status}
                    onChange={(e) => setSelectedTesPotensi({...selectedTesPotensi, status: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTesPotensi.visible}
                  onChange={(e) => setSelectedTesPotensi({...selectedTesPotensi, visible: e.target.checked})}
                  className="w-4 h-4"
                />
                <label className="text-sm">Tampilkan di platform</label>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
