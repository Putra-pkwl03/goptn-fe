'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, GraduationCap } from 'lucide-react';

interface JurusanItem {
  id: number;
  nama: string;
  kampus: string;
  fakultas: string;
  akreditasi: string;
  kapasitas: number;
  visible: boolean;
}

export function KelolaJurusanSection() {
  const [jurusanData, setJurusanData] = useState<JurusanItem[]>([
    { id: 1, nama: 'Teknik Informatika', kampus: 'UI', fakultas: 'Fakultas Ilmu Komputer', akreditasi: 'A', kapasitas: 120, visible: true },
    { id: 2, nama: 'Kedokteran', kampus: 'UI', fakultas: 'Fakultas Kedokteran', akreditasi: 'A', kapasitas: 100, visible: true },
    { id: 3, nama: 'Teknik Elektro', kampus: 'ITB', fakultas: 'STEI', akreditasi: 'A', kapasitas: 150, visible: true },
    { id: 4, nama: 'Manajemen', kampus: 'UI', fakultas: 'Fakultas Ekonomi dan Bisnis', akreditasi: 'A', kapasitas: 180, visible: true },
    { id: 5, nama: 'Teknik Sipil', kampus: 'UGM', fakultas: 'Fakultas Teknik', akreditasi: 'A', kapasitas: 140, visible: true },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJurusan, setSelectedJurusan] = useState<JurusanItem | null>(null);
  const [newJurusan, setNewJurusan] = useState<Omit<JurusanItem, 'id'>>({
    nama: '',
    kampus: '',
    fakultas: '',
    akreditasi: 'A',
    kapasitas: 0,
    visible: true
  });

  const toggleVisibility = (id: number) => {
    setJurusanData(jurusanData.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const handleAdd = () => {
    const newId = Math.max(...jurusanData.map(j => j.id)) + 1;
    setJurusanData([...jurusanData, { ...newJurusan, id: newId }]);
    setNewJurusan({
      nama: '',
      kampus: '',
      fakultas: '',
      akreditasi: 'A',
      kapasitas: 0,
      visible: true
    });
    setShowAddModal(false);
  };

  const handleEdit = (jurusan: JurusanItem) => {
    setSelectedJurusan(jurusan);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (selectedJurusan) {
      setJurusanData(jurusanData.map(item => 
        item.id === selectedJurusan.id ? selectedJurusan : item
      ));
      setShowEditModal(false);
      setSelectedJurusan(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data jurusan ini?')) {
      setJurusanData(jurusanData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2">Kelola Data Jurusan</h2>
          <p className="text-gray-600">Kelola database program studi yang tersedia di berbagai PTN</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Jurusan
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Jurusan</p>
          <p className="font-bold text-2xl">{jurusanData.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Jurusan Aktif</p>
          <p className="font-bold text-2xl text-green-600">{jurusanData.filter(j => j.visible).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Akreditasi A</p>
          <p className="font-bold text-2xl text-blue-600">{jurusanData.filter(j => j.akreditasi === 'A').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Kapasitas</p>
          <p className="font-bold text-2xl">{jurusanData.reduce((sum, j) => sum + j.kapasitas, 0)}</p>
        </div>
      </div>

      {/* Jurusan Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6">Nama Jurusan</th>
                <th className="text-left py-4 px-6">Kampus</th>
                <th className="text-left py-4 px-6">Fakultas</th>
                <th className="text-left py-4 px-6">Akreditasi</th>
                <th className="text-left py-4 px-6">Kapasitas</th>
                <th className="text-left py-4 px-6">Visibilitas</th>
                <th className="text-left py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jurusanData.map((jurusan) => (
                <tr key={jurusan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="font-medium">{jurusan.nama}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {jurusan.kampus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{jurusan.fakultas}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      jurusan.akreditasi === 'A' ? 'bg-green-100 text-green-700' :
                      jurusan.akreditasi === 'B' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {jurusan.akreditasi}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{jurusan.kapasitas} siswa</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleVisibility(jurusan.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                        jurusan.visible 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {jurusan.visible ? (
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
                        onClick={() => handleEdit(jurusan)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(jurusan.id)}
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
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Tambah Jurusan Baru
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Jurusan</label>
                <input
                  type="text"
                  value={newJurusan.nama}
                  onChange={(e) => setNewJurusan({...newJurusan, nama: e.target.value})}
                  placeholder="Contoh: Teknik Informatika"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kampus</label>
                  <select
                    value={newJurusan.kampus}
                    onChange={(e) => setNewJurusan({...newJurusan, kampus: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Pilih Kampus</option>
                    <option value="UI">UI</option>
                    <option value="ITB">ITB</option>
                    <option value="UGM">UGM</option>
                    <option value="IPB">IPB</option>
                    <option value="ITS">ITS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fakultas</label>
                  <input
                    type="text"
                    value={newJurusan.fakultas}
                    onChange={(e) => setNewJurusan({...newJurusan, fakultas: e.target.value})}
                    placeholder="Contoh: Fakultas Teknik"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Akreditasi</label>
                  <select
                    value={newJurusan.akreditasi}
                    onChange={(e) => setNewJurusan({...newJurusan, akreditasi: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="A">A (Unggul)</option>
                    <option value="B">B (Baik Sekali)</option>
                    <option value="C">C (Baik)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Kapasitas Mahasiswa</label>
                  <input
                    type="number"
                    value={newJurusan.kapasitas}
                    onChange={(e) => setNewJurusan({...newJurusan, kapasitas: parseInt(e.target.value) || 0})}
                    placeholder="Contoh: 120"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newJurusan.visible}
                  onChange={(e) => setNewJurusan({...newJurusan, visible: e.target.checked})}
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
      {showEditModal && selectedJurusan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Edit Data Jurusan
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Jurusan</label>
                <input
                  type="text"
                  value={selectedJurusan.nama}
                  onChange={(e) => setSelectedJurusan({...selectedJurusan, nama: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kampus</label>
                  <select
                    value={selectedJurusan.kampus}
                    onChange={(e) => setSelectedJurusan({...selectedJurusan, kampus: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="UI">UI</option>
                    <option value="ITB">ITB</option>
                    <option value="UGM">UGM</option>
                    <option value="IPB">IPB</option>
                    <option value="ITS">ITS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fakultas</label>
                  <input
                    type="text"
                    value={selectedJurusan.fakultas}
                    onChange={(e) => setSelectedJurusan({...selectedJurusan, fakultas: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Akreditasi</label>
                  <select
                    value={selectedJurusan.akreditasi}
                    onChange={(e) => setSelectedJurusan({...selectedJurusan, akreditasi: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="A">A (Unggul)</option>
                    <option value="B">B (Baik Sekali)</option>
                    <option value="C">C (Baik)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Kapasitas Mahasiswa</label>
                  <input
                    type="number"
                    value={selectedJurusan.kapasitas}
                    onChange={(e) => setSelectedJurusan({...selectedJurusan, kapasitas: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedJurusan.visible}
                  onChange={(e) => setSelectedJurusan({...selectedJurusan, visible: e.target.checked})}
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