'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, FileText, Users, Clock } from 'lucide-react';

interface TryoutItem {
  id: number;
  nama: string;
  tanggal: string;
  durasi: string;
  jumlahSoal: number;
  status: string;
  visible: boolean;
  peserta?: number;
}

export function KelolaTryoutSection() {
  const [tryoutData, setTryoutData] = useState<TryoutItem[]>([
    { id: 1, nama: 'Try Out UTBK 1', tanggal: '2026-01-20', durasi: '180 menit', jumlahSoal: 120, status: 'Aktif', visible: true, peserta: 245 },
    { id: 2, nama: 'Try Out UTBK 2', tanggal: '2026-02-15', durasi: '180 menit', jumlahSoal: 120, status: 'Aktif', visible: true, peserta: 187 },
    { id: 3, nama: 'Try Out UTBK 3', tanggal: '2026-03-10', durasi: '180 menit', jumlahSoal: 120, status: 'Belum Aktif', visible: true, peserta: 0 },
    { id: 4, nama: 'Try Out Intensif Saintek', tanggal: '2026-02-28', durasi: '120 menit', jumlahSoal: 80, status: 'Aktif', visible: true, peserta: 156 },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTryout, setSelectedTryout] = useState<TryoutItem | null>(null);
  const [newTryout, setNewTryout] = useState<Omit<TryoutItem, 'id'>>({
    nama: '',
    tanggal: '',
    durasi: '180 menit',
    jumlahSoal: 120,
    status: 'Aktif',
    visible: true,
    peserta: 0
  });

  const toggleVisibility = (id: number) => {
    setTryoutData(tryoutData.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const handleAdd = () => {
    const newId = Math.max(...tryoutData.map(t => t.id)) + 1;
    setTryoutData([...tryoutData, { ...newTryout, id: newId }]);
    setNewTryout({
      nama: '',
      tanggal: '',
      durasi: '180 menit',
      jumlahSoal: 120,
      status: 'Aktif',
      visible: true,
      peserta: 0
    });
    setShowAddModal(false);
  };

  const handleEdit = (tryout: TryoutItem) => {
    setSelectedTryout(tryout);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (selectedTryout) {
      setTryoutData(tryoutData.map(item => 
        item.id === selectedTryout.id ? selectedTryout : item
      ));
      setShowEditModal(false);
      setSelectedTryout(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data try out ini?')) {
      setTryoutData(tryoutData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2">Kelola Try Out UTBK</h2>
          <p className="text-gray-600">Kelola jadwal dan data try out untuk persiapan UTBK</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Try Out
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Try Out</p>
          <p className="font-bold text-2xl">{tryoutData.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Try Out Aktif</p>
          <p className="font-bold text-2xl text-green-600">{tryoutData.filter(t => t.status === 'Aktif').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Peserta</p>
          <p className="font-bold text-2xl text-blue-600">{tryoutData.reduce((sum, t) => sum + (t.peserta || 0), 0)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Soal</p>
          <p className="font-bold text-2xl">{tryoutData.reduce((sum, t) => sum + t.jumlahSoal, 0)}</p>
        </div>
      </div>

      {/* Tryout Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6">Nama Try Out</th>
                <th className="text-left py-4 px-6">Tanggal</th>
                <th className="text-left py-4 px-6">Durasi</th>
                <th className="text-left py-4 px-6">Jumlah Soal</th>
                <th className="text-left py-4 px-6">Peserta</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Visibilitas</th>
                <th className="text-left py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tryoutData.map((tryout) => (
                <tr key={tryout.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="font-medium">{tryout.nama}</p>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(tryout.tanggal).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {tryout.durasi}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{tryout.jumlahSoal} soal</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      {tryout.peserta || 0}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tryout.status === 'Aktif' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {tryout.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleVisibility(tryout.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                        tryout.visible 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tryout.visible ? (
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
                        onClick={() => handleEdit(tryout)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(tryout.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Tambah Try Out Baru
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Try Out</label>
                <input
                  type="text"
                  value={newTryout.nama}
                  onChange={(e) => setNewTryout({...newTryout, nama: e.target.value})}
                  placeholder="Contoh: Try Out UTBK 1"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Pelaksanaan</label>
                  <input
                    type="date"
                    value={newTryout.tanggal}
                    onChange={(e) => setNewTryout({...newTryout, tanggal: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Durasi</label>
                  <input
                    type="text"
                    value={newTryout.durasi}
                    onChange={(e) => setNewTryout({...newTryout, durasi: e.target.value})}
                    placeholder="Contoh: 180 menit"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Soal</label>
                  <input
                    type="number"
                    value={newTryout.jumlahSoal}
                    onChange={(e) => setNewTryout({...newTryout, jumlahSoal: parseInt(e.target.value) || 0})}
                    placeholder="Contoh: 120"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newTryout.status}
                    onChange={(e) => setNewTryout({...newTryout, status: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Belum Aktif">Belum Aktif</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newTryout.visible}
                  onChange={(e) => setNewTryout({...newTryout, visible: e.target.checked})}
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
      {showEditModal && selectedTryout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Edit Data Try Out
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Try Out</label>
                <input
                  type="text"
                  value={selectedTryout.nama}
                  onChange={(e) => setSelectedTryout({...selectedTryout, nama: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tanggal Pelaksanaan</label>
                  <input
                    type="date"
                    value={selectedTryout.tanggal}
                    onChange={(e) => setSelectedTryout({...selectedTryout, tanggal: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Durasi</label>
                  <input
                    type="text"
                    value={selectedTryout.durasi}
                    onChange={(e) => setSelectedTryout({...selectedTryout, durasi: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Soal</label>
                  <input
                    type="number"
                    value={selectedTryout.jumlahSoal}
                    onChange={(e) => setSelectedTryout({...selectedTryout, jumlahSoal: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={selectedTryout.status}
                    onChange={(e) => setSelectedTryout({...selectedTryout, status: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Belum Aktif">Belum Aktif</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTryout.visible}
                  onChange={(e) => setSelectedTryout({...selectedTryout, visible: e.target.checked})}
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