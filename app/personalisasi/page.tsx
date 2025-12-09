"use client";

import { useState } from "react";
import {
  School,
  MapPin,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  SetupStudentRequestBody,
  PersonalisasiData,
  setupStudent,
} from "@/lib/student/setup";

export default function OnboardingPersonalisasi() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<PersonalisasiData>({
    sekolah: "",
    kota: "",
    rataRaport: "",
    pilihanPTN1: "",
    jurusan1: "",
    pilihanPTN2: "",
    jurusan2: "",
    pilihanPTN3: "",
    jurusan3: "",
    jalur: ["SNBP", "SNBT", "Mandiri"],
  });

  const jurusanOptions = [
    "Teknik Informatika",
    "Teknik Elektro",
    "Teknik Sipil",
    "Teknik Mesin",
    "Teknik Kimia",
    "Teknik Industri",
    "Arsitektur",
    "Kedokteran",
    "Kedokteran Gigi",
    "Farmasi",
    "Keperawatan",
    "Kesehatan Masyarakat",
    "Akuntansi",
    "Manajemen",
    "Ekonomi Pembangunan",
    "Ilmu Ekonomi",
    "Administrasi Bisnis",
    "Ilmu Hukum",
    "Ilmu Komunikasi",
    "Psikologi",
    "Hubungan Internasional",
    "Ilmu Politik",
    "Sosiologi",
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Statistika",
    "Sastra Indonesia",
    "Sastra Inggris",
    "Pendidikan Dokter",
    "Pendidikan Guru Sekolah Dasar",
    "Pendidikan Bahasa Inggris",
    "Pendidikan Matematika",
    "Agroteknologi",
    "Agribisnis",
    "Peternakan",
    "Kehutanan",
    "Ilmu Gizi",
    "Desain Komunikasi Visual",
    "Desain Produk",
    "Seni Rupa",
  ].sort();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmitSetup();
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.sekolah && formData.kota && formData.rataRaport;
    }
    if (step === 2) {
      return formData.pilihanPTN1 && formData.jurusan1;
    }
    return false;
  };

  const handleSubmitSetup = async () => {
    try {
      const payload: SetupStudentRequestBody = {
        profile: {
          school_name: formData.sekolah,
          city: formData.kota,
          average_grade: Number(formData.rataRaport),
        },

        ptn_choices: [
          formData.pilihanPTN1 && formData.jurusan1
            ? {
                university_name: formData.pilihanPTN1,
                major: formData.jurusan1,
              }
            : null,
          formData.pilihanPTN2 && formData.jurusan2
            ? {
                university_name: formData.pilihanPTN2,
                major: formData.jurusan2,
              }
            : null,
          formData.pilihanPTN3 && formData.jurusan3
            ? {
                university_name: formData.pilihanPTN3,
                major: formData.jurusan3,
              }
            : null,
        ].filter(Boolean) as SetupStudentRequestBody["ptn_choices"],

        entry_paths: formData.jalur, // otomatis SNBP, SNBT, Mandiri
      };

      await setupStudent(payload);

      localStorage.setItem("is_personalized", "true");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Personalisasi Akun Anda</span>
          </div>
          <h2 className="mb-2">Mari Kenali Anda Lebih Baik</h2>
          <p className="text-gray-600">Kami butuh beberapa informasi untuk memberikan rekomendasi terbaik</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Langkah {step} dari 2</span>
            <span className="text-sm text-gray-600">{Math.round((step / 2) * 100)}% selesai</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <School className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold">Data Sekolah & Akademik</h3>
                  <p className="text-sm text-gray-600">Informasi dasar tentang Anda</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nama Sekolah *</label>
                <input
                  type="text"
                  value={formData.sekolah}
                  onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Contoh: SMAN 1 Jakarta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kota/Kabupaten *</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.kota}
                    onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 border rounded-lg"
                    placeholder="Contoh: Jakarta"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rata-rata Raport *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.rataRaport}
                  onChange={(e) => setFormData({ ...formData, rataRaport: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Contoh: 85.50"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold">Pilihan PTN & Jurusan</h3>
                  <p className="text-sm text-gray-600">PTN dan jurusan impian Anda</p>
                </div>
              </div>

              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-gray-50 rounded-xl p-5">
                  <p className="font-medium mb-4">
                    Pilihan {num} {num === 1 && <span className="text-red-500">*</span>}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <select
                        value={formData[`pilihanPTN${num}` as keyof PersonalisasiData] as string}
                        onChange={(e) =>
                          setFormData({ ...formData, [`pilihanPTN${num}`]: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-lg"
                        required={num === 1}
                      >
                        <option value="">Pilih PTN</option>
                        <option value="UI">Universitas Indonesia (UI)</option>
                        <option value="ITB">Institut Teknologi Bandung (ITB)</option>
                        <option value="UGM">Universitas Gadjah Mada (UGM)</option>
                        <option value="IPB">Institut Pertanian Bogor (IPB)</option>
                        <option value="ITS">Institut Teknologi Sepuluh Nopember (ITS)</option>
                        <option value="UNAIR">Universitas Airlangga (UNAIR)</option>
                        <option value="UNDIP">Universitas Diponegoro (UNDIP)</option>
                        <option value="UB">Universitas Brawijaya (UB)</option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={formData[`jurusan${num}` as keyof PersonalisasiData] as string}
                        onChange={(e) =>
                          setFormData({ ...formData, [`jurusan${num}`]: e.target.value })
                        }
                        className="w-full px-4 py-3 border rounded-lg"
                        required={num === 1}
                      >
                        <option value="">Pilih Jurusan</option>
                        {jurusanOptions.map((j) => (
                          <option key={j}>{j}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border rounded-lg"
              >
                Kembali
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{step === 2 ? "Selesai & Lihat Dashboard" : "Lanjutkan"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
