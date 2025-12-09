'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Award } from 'lucide-react';

interface BeasiswaItem {
  id: number;
  nama: string;
  penyedia: string;
  nominal: string;
  deadline: string;
  status: string;
  visible: boolean;
  deskripsi?: string;
}

export function KelolaBeasiswaSection() {
  const [beasiswaData, setBeasiswaData] = useState<BeasiswaItem[]>([
    { id: 1, nama: 'KIP Kuliah', penyedia: 'Kemendikbudristek', nominal: 'Full + Biaya Hidup', deadline: '2026-03-31', status: 'Aktif', visible: true, deskripsi: 'Beasiswa penuh untuk mahasiswa berprestasi dari keluarga kurang mampu' },
    { id: 2, nama: 'Beasiswa Unggulan', penyedia: 'Kemendikbudristek', nominal: 'Rp 20.000.000/tahun', deadline: '2026-04-15', status: 'Aktif', visible: true, deskripsi: 'Beasiswa untuk mahasiswa berprestasi tinggi' },
    { id: 3, nama: 'Beasiswa Bank Indonesia', penyedia: 'Bank Indonesia', nominal: 'Rp 15.000.000/tahun', deadline: '2026-05-01', status: 'Aktif', visible: true, deskripsi: 'Beasiswa dari Bank Indonesia untuk mahasiswa ekonomi dan bisnis' },
    { id: 4, nama: 'Beasiswa LPDP', penyedia: 'LPDP', nominal: 'Full Funding', deadline: '2026-06-30', status: 'Aktif', visible: true, deskripsi: 'Beasiswa penuh untuk S2 dan S3' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBeasiswa, setSelectedBeasiswa] = useState<BeasiswaItem | null>(null);
  const [newBeasiswa, setNewBeasiswa] = useState<Omit<BeasiswaItem, 'id'>>({
    nama: '',
    penyedia: '',
    nominal: '',
    deadline: '',
    status: 'Aktif',
    visible: true,
    deskripsi: ''
  });

  const toggleVisibility = (id: number) => {
    setBeasiswaData(beasiswaData.map(item => 
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  const handleAdd = () => {
    const newId = Math.max(...beasiswaData.map(b => b.id)) + 1;
    setBeasiswaData([...beasiswaData, { ...newBeasiswa, id: newId }]);
    setNewBeasiswa({
      nama: '',
      penyedia: '',
      nominal: '',
      deadline: '',
      status: 'Aktif',
      visible: true,
      deskripsi: ''
    });
    setShowAddModal(false);
  };

  const handleEdit = (beasiswa: BeasiswaItem) => {
    setSelectedBeasiswa(beasiswa);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (selectedBeasiswa) {
      setBeasiswaData(beasiswaData.map(item => 
        item.id === selectedBeasiswa.id ? selectedBeasiswa : item
      ));
      setShowEditModal(false);
      setSelectedBeasiswa(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data beasiswa ini?')) {
      setBeasiswaData(beasiswaData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="mb-2">Kelola Data Beasiswa</h2>
          <p className="text-gray-600">Kelola informasi beasiswa yang tersedia untuk mahasiswa</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Beasiswa
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Total Beasiswa</p>
          <p className="font-bold text-2xl">{beasiswaData.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Beasiswa Aktif</p>
          <p className="font-bold text-2xl text-green-600">{beasiswaData.filter(b => b.status === 'Aktif').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Ditampilkan</p>
          <p className="font-bold text-2xl text-blue-600">{beasiswaData.filter(b => b.visible).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <p className="text-sm text-gray-600 mb-1">Penyedia</p>
          <p className="font-bold text-2xl">{new Set(beasiswaData.map(b => b.penyedia)).size}</p>
        </div>
      </div>

      {/* Beasiswa Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left py-4 px-6">Nama Beasiswa</th>
                <th className="text-left py-4 px-6">Penyedia</th>
                <th className="text-left py-4 px-6">Nominal</th>
                <th className="text-left py-4 px-6">Deadline</th>
                <th className="text-left py-4 px-6">Status</th>
                <th className="text-left py-4 px-6">Visibilitas</th>
                <th className="text-left py-4 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {beasiswaData.map((beasiswa) => (
                <tr key={beasiswa.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <p className="font-medium">{beasiswa.nama}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      {beasiswa.penyedia}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{beasiswa.nominal}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(beasiswa.deadline).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      beasiswa.status === 'Aktif' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {beasiswa.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleVisibility(beasiswa.id)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                        beasiswa.visible 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {beasiswa.visible ? (
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
                        onClick={() => handleEdit(beasiswa)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(beasiswa.id)}
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
                <Award className="w-5 h-5 text-yellow-600" />
                Tambah Beasiswa Baru
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Beasiswa</label>
                <input
                  type="text"
                  value={newBeasiswa.nama}
                  onChange={(e) => setNewBeasiswa({...newBeasiswa, nama: e.target.value})}
                  placeholder="Contoh: KIP Kuliah"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Penyedia</label>
                  <input
                    type="text"
                    value={newBeasiswa.penyedia}
                    onChange={(e) => setNewBeasiswa({...newBeasiswa, penyedia: e.target.value})}
                    placeholder="Contoh: Kemendikbudristek"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nominal</label>
                  <input
                    type="text"
                    value={newBeasiswa.nominal}
                    onChange={(e) => setNewBeasiswa({...newBeasiswa, nominal: e.target.value})}
                    placeholder="Contoh: Rp 20.000.000/tahun"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Deadline</label>
                  <input
                    type="date"
                    value={newBeasiswa.deadline}
                    onChange={(e) => setNewBeasiswa({...newBeasiswa, deadline: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newBeasiswa.status}
                    onChange={(e) => setNewBeasiswa({...newBeasiswa, status: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                <textarea
                  value={newBeasiswa.deskripsi}
                  onChange={(e) => setNewBeasiswa({...newBeasiswa, deskripsi: e.target.value})}
                  placeholder="Deskripsi singkat tentang beasiswa..."
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newBeasiswa.visible}
                  onChange={(e) => setNewBeasiswa({...newBeasiswa, visible: e.target.checked})}
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
      {showEditModal && selectedBeasiswa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Edit Data Beasiswa
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nama Beasiswa</label>
                <input
                  type="text"
                  value={selectedBeasiswa.nama}
                  onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, nama: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Penyedia</label>
                  <input
                    type="text"
                    value={selectedBeasiswa.penyedia}
                    onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, penyedia: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nominal</label>
                  <input
                    type="text"
                    value={selectedBeasiswa.nominal}
                    onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, nominal: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Deadline</label>
                  <input
                    type="date"
                    value={selectedBeasiswa.deadline}
                    onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, deadline: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={selectedBeasiswa.status}
                    onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, status: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Deskripsi</label>
                <textarea
                  value={selectedBeasiswa.deskripsi}
                  onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, deskripsi: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBeasiswa.visible}
                  onChange={(e) => setSelectedBeasiswa({...selectedBeasiswa, visible: e.target.checked})}
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