"use client";

import { useEffect, useState } from "react";
// import { PersonalisasiData } from './OnboardingPersonalisasi';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Award,
  Calendar,
  Bell,
  BookOpen,
  BarChart3,
  Lightbulb,
  Settings,
  CheckCircle,
  Brain,
  Users,
  Edit2,
  ClipboardCheck,
  Sparkles,
  School,
  User,
  Lock,
  Phone,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getStudentMe } from "@/lib/student/me";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { updateStudentNotification } from "@/lib/student/notification";
import { Kampus } from "@/types/kampus";
import { getKampus } from "@/lib/kampus/kampus";

export function DashboardStudent() {
  const [hasTakenTryout, setHasTakenTryout] = useState(false);
  const [hasTakenPotentialTest, setHasTakenPotentialTest] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [personalisasiData, setPersonalisasiData] = useState({
    sekolah: "",
    kota: "",
    rataRaport: "",

    pilihanPTN1: "",
    jurusan1: "",

    pilihanPTN2: "",
    jurusan2: "",

    pilihanPTN3: "",
    jurusan3: "",
  });
  const [showJalurModal, setShowJalurModal] = useState(false);
  const [emailNotificationEnabled, setEmailNotificationEnabled] =
    useState(false);

  // Jalur PTN State - Multiple selection with checkboxes
  const [selectedJalurs, setSelectedJalurs] = useState<string[]>([]);
  const [selectedMandiriKampus, setSelectedMandiriKampus] = useState("");

  const [kampusList, setKampusList] = useState<Kampus[]>([]);
  // const [selectedJalurs, setSelectedJalurs] = useState<string[]>([]);
  // const [selectedMandiriKampus, setSelectedMandiriKampus] = useState("");

  // Mock data untuk jalur mandiri per kampus
  useEffect(() => {
    getKampus().then((data) => setKampusList(data));
  }, []);

  // hasil dari kampus API → filter kampus yang punya jalur Mandiri
  const jalurMandiriOptions = kampusList
    .filter((k) => {
      const jalur: string[] = JSON.parse(k.jalur_masuk || "[]");
      return jalur.includes("Mandiri");
    })
    .map((k) => ({
      id: k.id, // number
      kampusNama: k.nama_kampus,
      // optional: shortCode jika backend butuh, misal "ui", "ugm"
      code: k.akronim?.toLowerCase() || "",
    }));

  //   const [editData, setEditData] = useState<PersonalisasiData>(initialData);

  // Profile & Password State
  // const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Pengguna');
  // const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  // const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || '');

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [entryPath, setEntryPath] = useState([]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileErrors, setProfileErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getStudentMe();
        console.log("Student Me Data:", data);

        setProfileData({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.no_telp,
        });

        setEntryPath(data.entry_paths || []);

        setPersonalisasiData({
          sekolah: data.profile.school_name,
          kota: data.profile.city,
          rataRaport: data.profile.average_grade,

          pilihanPTN1: data.ptn_choices[0]?.university_name || "",
          jurusan1: data.ptn_choices[0]?.major || "",

          pilihanPTN2: data.ptn_choices[1]?.university_name || "",
          jurusan2: data.ptn_choices[1]?.major || "",

          pilihanPTN3: data.ptn_choices[2]?.university_name || "",
          jurusan3: data.ptn_choices[2]?.major || "",
        });
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, []);

  console.log("Personalisasi Data:", personalisasiData);

  const handleSaveProfile = () => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!profileData.name.trim()) {
      newErrors.name = "Nama harus diisi";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileData.email) {
      newErrors.email = "Email harus diisi";
      isValid = false;
    } else if (!emailRegex.test(profileData.email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,13}$/;
    if (!profileData.phone) {
      newErrors.phone = "Nomor telepon harus diisi";
      isValid = false;
    } else if (!phoneRegex.test(profileData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Nomor telepon tidak valid";
      isValid = false;
    }

    setProfileErrors(newErrors);

    if (isValid) {
      // localStorage.setItem('userName', profileData.name);
      // localStorage.setItem('userEmail', profileData.email);
      // localStorage.setItem('userPhone', profileData.phone);
      // setUserName(profileData.name);
      // setUserEmail(profileData.email);
      // setUserPhone(profileData.phone);
      alert("Profile berhasil diperbarui!");
    }
  };

  const handleChangePassword = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Password saat ini harus diisi";
      isValid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "Password baru harus diisi";
      isValid = false;
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password minimal 6 karakter";
      isValid = false;
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
      isValid = false;
    }

    setPasswordErrors(newErrors);

    if (isValid) {
      // Simulate password change
      alert("Password berhasil diubah!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  // Calculate peluang based on rata-rata raport
  const calculatePeluang = (
    ptn: string,
    jurusan: string,
    rataRaport: number
  ) => {
    const baseScore = rataRaport;
    const ptnFactor =
      {
        UI: 0.9,
        ITB: 0.85,
        UGM: 0.88,
        IPB: 0.92,
        ITS: 0.9,
        UNAIR: 0.91,
        UNDIP: 0.93,
        UB: 0.92,
      }[ptn] || 0.9;

    const peluang = Math.min(95, Math.max(20, baseScore * ptnFactor));
    return Math.round(peluang);
  };

  const rataRaport = parseFloat(personalisasiData.rataRaport) || 0;

  // Mock data untuk hasil Try Out UTBK
  const tryoutResults = {
    totalScore: 642,
    maxScore: 800,
    testDate: "15 Nov 2024",
    rank: "Top 15%",
    subtests: [
      {
        name: "Penalaran Umum (PU)",
        score: 168,
        maxScore: 200,
        percentage: 84,
      },
      {
        name: "Pengetahuan & Pemahaman Umum (PPU)",
        score: 154,
        maxScore: 200,
        percentage: 77,
      },
      {
        name: "Pemahaman Bacaan & Menulis (PBM)",
        score: 162,
        maxScore: 200,
        percentage: 81,
      },
      {
        name: "Pengetahuan Kuantitatif (PK)",
        score: 158,
        maxScore: 200,
        percentage: 79,
      },
    ],
  };

  // Mock data untuk Tes Potensi Diri
  const tesPotensiResults = {
    testDate: "22 Nov 2024",
    personalityType: "INTJ - Arsitek",
    topInterests: [
      { name: "Sains & Teknologi", percentage: 92 },
      { name: "Riset & Analisis", percentage: 88 },
      { name: "Problem Solving", percentage: 85 },
    ],
    recommendedMajors: [
      { name: "Teknik Informatika", match: 95 },
      { name: "Teknik Elektro", match: 89 },
      { name: "Matematika", match: 85 },
    ],
    strengths: ["Berpikir Analitis", "Strategis", "Mandiri", "Inovatif"],
  };

  const pilihanWithPeluang = [
    {
      ptn: personalisasiData.pilihanPTN1,
      jurusan: personalisasiData.jurusan1,
      peluang: calculatePeluang(
        personalisasiData.pilihanPTN1,
        personalisasiData.jurusan1,
        rataRaport
      ),
    },
    personalisasiData.pilihanPTN2
      ? {
          ptn: personalisasiData.pilihanPTN2,
          jurusan: personalisasiData.jurusan2,
          peluang: calculatePeluang(
            personalisasiData.pilihanPTN2,
            personalisasiData.jurusan2,
            rataRaport
          ),
        }
      : null,
    personalisasiData.pilihanPTN3
      ? {
          ptn: personalisasiData.pilihanPTN3,
          jurusan: personalisasiData.jurusan3,
          peluang: calculatePeluang(
            personalisasiData.pilihanPTN3,
            personalisasiData.jurusan3,
            rataRaport
          ),
        }
      : null,
  ].filter(Boolean) as Array<{ ptn: string; jurusan: string; peluang: number }>;

  const getPeluangColor = (peluang: number) => {
    if (peluang >= 75)
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
      };
    if (peluang >= 50)
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
      };
    return { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" };
  };

  const getPeluangIcon = (peluang: number) => {
    if (peluang >= 75) return <TrendingUp className="w-5 h-5" />;
    if (peluang >= 50) return <Minus className="w-5 h-5" />;
    return <TrendingDown className="w-5 h-5" />;
  };

  const getRecommendation = (peluang: number) => {
    if (peluang >= 75)
      return "Peluang sangat baik! Fokus persiapkan dokumen dan strategi.";
    if (peluang >= 50)
      return "Peluang cukup baik. Tingkatkan nilai raport dan persiapan tes.";
    return "Peluang perlu ditingkatkan. Pertimbangkan opsi cadangan.";
  };

  const handleSaveEdit = () => {
    // setPersonalisasiData(editData);
    setShowEditModal(false);
  };

  const ptnOptions = [
    "UI",
    "ITB",
    "UGM",
    "IPB",
    "ITS",
    "UNAIR",
    "UNDIP",
    "UB",
    "UNPAD",
    "UNSRI",
  ];
  const jurusanOptions = [
    "Teknik Informatika",
    "Teknik Elektro",
    "Teknik Sipil",
    "Kedokteran",
    "Farmasi",
    "Akuntansi",
    "Manajemen",
    "Hukum",
    "Psikologi",
    "Ilmu Komunikasi",
  ];

  // Handle email notification toggle - Now opens Jalur modal
  const handleEmailNotificationToggle = () => {
    setShowJalurModal(true);
  };

  // Handle checkbox toggle for jalur selection
  const handleJalurToggle = (jalur: string) => {
    if (selectedJalurs.includes(jalur)) {
      setSelectedJalurs(selectedJalurs.filter((j) => j !== jalur));
      // Reset mandiri kampus if Mandiri is unchecked
      if (jalur === "Mandiri") {
        setSelectedMandiriKampus("");
      }
    } else {
      setSelectedJalurs([...selectedJalurs, jalur]);
    }
  };

  const handleSaveJalurSelection = async () => {
    if (!selectedJalurs.length) {
      toast.error("Gagal! Pilih minimal satu jalur terlebih dahulu.");
      return;
    }

    if (selectedJalurs.includes("Mandiri") && !selectedMandiriKampus) {
      toast.error("Gagal! Pilih kampus jalur mandiri.");
      return;
    }

    try {
      const notificationTypes: string[] = [];
      let campusId: number | null = null;

      selectedJalurs.forEach((jalur) => {
        if (jalur === "Mandiri") {
          notificationTypes.push("mandiri");
          campusId = Number(selectedMandiriKampus); // guaranteed valid because of check above
        } else {
          notificationTypes.push(jalur.toLowerCase()); // "snbp" / "snbt"
        }
      });

      // tipe persis sesuai signature updateStudentNotification
      type UpdateBody = {
        wants_notification: boolean;
        notification_type: string[];
        campus_id: number | null;
      };

      const payload: UpdateBody = {
        wants_notification: true,
        notification_type: notificationTypes,
        campus_id: campusId, // bisa number atau null (tidak ada undefined)
      };

      console.log("FINAL PAYLOAD:", payload);

      await updateStudentNotification(payload);

      toast.success("Pengaturan berhasil disimpan!");
      setShowJalurModal(false);
      setSelectedJalurs([]);
      setSelectedMandiriKampus("");
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Gagal menyimpan pengaturan";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2>Halo, {profileData.name}! 👋</h2>
            </div>
            <p className="opacity-90 mb-4">
              {personalisasiData.sekolah} • {personalisasiData.kota}
            </p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm opacity-75">Rata-rata Raport</p>
                <p className="font-bold">{personalisasiData.rataRaport}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Jalur Diminati</p>
                <p className="font-bold">
                  {entryPath.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index < entryPath.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setProfileData({
                name: profileData.name,
                email: profileData.email,
                phone: profileData.phone,
              });
              setShowSettingsModal(true);
            }}
            className="p-3 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Aktif
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Pilihan PTN</p>
          <p className="font-bold">{pilihanWithPeluang.length} PTN</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded font-medium">
              Premium
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Notifikasi Aktif</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="font-bold text-gray-900">Email</span>
            </div>
            <button
              onClick={handleEmailNotificationToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                emailNotificationEnabled ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotificationEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Analisis
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Peluang Tertinggi</p>
          <p className="font-bold">
            {Math.max(...pilihanWithPeluang.map((p) => p.peluang))}%
          </p>
        </div>
      </div>

      {/* Analisis Peluang Keterima */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold">Analisis Peluang Keterima</h3>
              <p className="text-sm text-gray-600">
                Berdasarkan data historis dan profil Anda
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              //   setEditData(personalisasiData);
              setShowEditModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit Data
          </button>
        </div>

        <div className="space-y-4">
          {pilihanWithPeluang.map((pilihan, idx) => {
            const colors = getPeluangColor(pilihan.peluang);

            return (
              <div
                key={idx}
                className={`border-2 ${colors.border} rounded-xl p-6 ${colors.bg}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded">
                        Pilihan {idx + 1}
                      </span>
                      {idx === 0 && (
                        <span className="text-xs font-medium bg-purple-600 text-white px-2 py-1 rounded">
                          Prioritas
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold mb-1">
                      {pilihan.ptn} - {pilihan.jurusan}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getRecommendation(pilihan.peluang)}
                    </p>
                  </div>
                  <div className={`flex flex-col items-center ${colors.text}`}>
                    {getPeluangIcon(pilihan.peluang)}
                    <span className="font-bold mt-1">{pilihan.peluang}%</span>
                    <span className="text-xs">Peluang</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="h-3 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        pilihan.peluang >= 75
                          ? "bg-green-500"
                          : pilihan.peluang >= 50
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${pilihan.peluang}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Passing Grade</p>
                    <p className="font-medium">
                      {Math.max(70, pilihan.peluang - 10)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Daya Tampung</p>
                    {/* <p className="font-medium">{Math.floor(Math.random() * 100) + 50} siswa</p> */}
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Peminat 2024</p>
                    {/* <p className="font-medium">{Math.floor(Math.random() * 500) + 200} siswa</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Try Out UTBK Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold">Try Out UTBK</h3>
            <p className="text-sm text-gray-600">
              Persiapan menghadapi SNBT 2025
            </p>
          </div>
        </div>

        {!hasTakenTryout ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardCheck className="w-10 h-10 text-blue-600" />
            </div>
            <h4 className="font-bold mb-2">Belum Mengikuti Try Out</h4>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Ikuti Try Out UTBK untuk mengetahui kemampuan Anda dan mendapatkan
              analisis peluang yang lebih akurat
            </p>
            <button
              onClick={() => setHasTakenTryout(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ikuti Try Out Sekarang →
            </button>
          </div>
        ) : (
          <>
            <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-75 mb-1">Total Skor UTBK</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">
                      {tryoutResults.totalScore}
                    </span>
                    <span className="text-sm opacity-75">
                      / {tryoutResults.maxScore}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-75 mb-1">Peringkat</p>
                  <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                    {tryoutResults.rank}
                  </span>
                </div>
              </div>

              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all"
                  style={{
                    width: `${
                      (tryoutResults.totalScore / tryoutResults.maxScore) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs opacity-75 mt-2">
                Tes tanggal {tryoutResults.testDate}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Breakdown per Subtest</h4>
              <div className="space-y-4">
                {tryoutResults.subtests.map((subtest, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-700">{subtest.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {subtest.score}/{subtest.maxScore}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            subtest.percentage >= 80
                              ? "bg-green-100 text-green-700"
                              : subtest.percentage >= 70
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subtest.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          subtest.percentage >= 80
                            ? "bg-green-500"
                            : subtest.percentage >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${subtest.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Ingin meningkatkan skor Anda?
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Ikuti Try Out Lagi →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tes Potensi Diri Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold">Tes Potensi Diri</h3>
            <p className="text-sm text-gray-600">
              Kenali kepribadian dan minat Anda
            </p>
          </div>
        </div>

        {!hasTakenPotentialTest ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-purple-600" />
            </div>
            <h4 className="font-bold mb-2">Belum Mengikuti Tes Potensi Diri</h4>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Ikuti Tes Potensi Diri untuk mengetahui tipe kepribadian, minat,
              dan rekomendasi jurusan yang cocok untuk Anda
            </p>
            <button
              onClick={() => setHasTakenPotentialTest(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Ikuti Tes Sekarang →
            </button>
          </div>
        ) : (
          <>
            <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm opacity-75 mb-1">
                    Tipe Kepribadian Anda
                  </p>
                  <p className="font-bold">
                    {tesPotensiResults.personalityType}
                  </p>
                  <p className="text-xs opacity-75 mt-1">
                    Tes tanggal {tesPotensiResults.testDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-4">Minat Utama</h4>
              <div className="space-y-3">
                {tesPotensiResults.topInterests.map((interest, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-700">{interest.name}</p>
                      <span className="text-sm font-medium text-purple-600">
                        {interest.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 transition-all"
                        style={{ width: `${interest.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-4">
                Jurusan yang Cocok untuk Anda
              </h4>
              <div className="space-y-3">
                {tesPotensiResults.recommendedMajors.map((major, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        #{idx + 1}
                      </div>
                      <span className="text-sm font-medium">{major.name}</span>
                    </div>
                    <span className="text-sm font-medium text-purple-600">
                      {major.match}% match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-3">Kekuatan Anda</h4>
              <div className="flex flex-wrap gap-2">
                {tesPotensiResults.strengths.map((strength, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Ingin eksplorasi lebih dalam?
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Lihat Analisis Lengkap →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit Data Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <School className="w-5 h-5 text-purple-600" />
              </div>
              <DialogTitle>Edit Data Personalisasi</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Data Akademik */}
            <div>
              <h4 className="font-medium mb-3">Data Akademik</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rata-rata Raport
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    // value={editData.rataRaport}
                    // onChange={(e) => setEditData({ ...editData, rataRaport: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nama Sekolah
                  </label>
                  <input
                    type="text"
                    // value={editData.sekolah}
                    // onChange={(e) => setEditData({ ...editData, sekolah: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Kota</label>
                  <input
                    type="text"
                    // value={editData.kota}
                    // onChange={(e) => setEditData({ ...editData, kota: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Pilihan PTN & Jurusan */}
            <div>
              <h4 className="font-medium mb-3">Pilihan PTN & Jurusan</h4>
              <div className="space-y-4">
                {/* Pilihan 1 */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <p className="text-sm font-medium text-gray-700">Pilihan 1</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        PTN
                      </label>
                      <select
                        // value={editData.pilihanPTN1}
                        // onChange={(e) => setEditData({ ...editData, pilihanPTN1: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                      >
                        {ptnOptions.map((ptn) => (
                          <option key={ptn} value={ptn}>
                            {ptn}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Jurusan
                      </label>
                      <select
                        // value={editData.jurusan1}
                        // onChange={(e) => setEditData({ ...editData, jurusan1: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                      >
                        {jurusanOptions.map((jurusan) => (
                          <option key={jurusan} value={jurusan}>
                            {jurusan}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pilihan 2 */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <p className="text-sm font-medium text-gray-700">Pilihan 2</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        PTN
                      </label>
                      <select
                        // value={editData.pilihanPTN2 || ''}
                        // onChange={(e) => setEditData({ ...editData, pilihanPTN2: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="">-- Pilih PTN --</option>
                        {ptnOptions.map((ptn) => (
                          <option key={ptn} value={ptn}>
                            {ptn}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Jurusan
                      </label>
                      <select
                        // value={editData.jurusan2 || ''}
                        // onChange={(e) => setEditData({ ...editData, jurusan2: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                        // disabled={!editData.pilihanPTN2}
                      >
                        <option value="">-- Pilih Jurusan --</option>
                        {jurusanOptions.map((jurusan) => (
                          <option key={jurusan} value={jurusan}>
                            {jurusan}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pilihan 3 */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <p className="text-sm font-medium text-gray-700">Pilihan 3</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        PTN
                      </label>
                      <select
                        // value={editData.pilihanPTN3 || ''}
                        // onChange={(e) => setEditData({ ...editData, pilihanPTN3: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="">-- Pilih PTN --</option>
                        {ptnOptions.map((ptn) => (
                          <option key={ptn} value={ptn}>
                            {ptn}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Jurusan
                      </label>
                      <select
                        // value={editData.jurusan3 || ''}
                        // onChange={(e) => setEditData({ ...editData, jurusan3: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                        // disabled={!editData.pilihanPTN3}
                      >
                        <option value="">-- Pilih Jurusan --</option>
                        {jurusanOptions.map((jurusan) => (
                          <option key={jurusan} value={jurusan}>
                            {jurusan}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <DialogTitle>Pengaturan Akun</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Profile Settings */}
            <div>
              <h4 className="font-medium mb-3">Pengaturan Profil</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  {profileErrors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {profileErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  {profileErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {profileErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                  {profileErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {profileErrors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Settings */}
            <div>
              <h4 className="font-medium mb-3">Pengaturan Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password Saat Ini
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Simpan Perubahan Profil
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Ubah Password
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Jalur PTN Modal */}
      <Dialog open={showJalurModal} onOpenChange={setShowJalurModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <DialogTitle>Pilih Jalur Notifikasi PTN</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <p className="text-sm text-gray-600">
              Pilih jalur PTN untuk mendapatkan notifikasi otomatis via email.
              Anda dapat memilih lebih dari satu jalur.
            </p>

            {/* Jalur PTN Checkboxes */}
            <div>
              <h4 className="font-medium mb-4">Pilih Jalur PTN</h4>
              <div className="space-y-3">
                {/* SNBP Checkbox */}
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input
                    type="checkbox"
                    checked={selectedJalurs.includes("SNBP")}
                    onChange={() => handleJalurToggle("SNBP")}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-900">SNBP</span>
                    <p className="text-sm text-gray-500">
                      Seleksi Nasional Berdasarkan Prestasi
                    </p>
                  </div>
                </label>

                {/* SNBT Checkbox */}
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                  <input
                    type="checkbox"
                    checked={selectedJalurs.includes("SNBT")}
                    onChange={() => handleJalurToggle("SNBT")}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-900">SNBT</span>
                    <p className="text-sm text-gray-500">
                      Seleksi Nasional Berdasarkan Tes
                    </p>
                  </div>
                </label>

                {/* Mandiri Checkbox */}
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                  <input
                    type="checkbox"
                    checked={selectedJalurs.includes("Mandiri")}
                    onChange={() => handleJalurToggle("Mandiri")}
                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <div className="ml-3 flex-1">
                    <span className="font-medium text-gray-900">Mandiri</span>
                    <p className="text-sm text-gray-500">
                      Jalur Mandiri per Kampus
                    </p>
                  </div>
                </label>

                {/* Mandiri Kampus Dropdown - Conditional */}
                {selectedJalurs.includes("Mandiri") && (
                  <div className="ml-8 mt-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                    <label className="block text-sm font-medium mb-2 text-orange-900">
                      Pilih Kampus Jalur Mandiri
                    </label>
                    <select
                      value={selectedMandiriKampus}
                      onChange={(e) => setSelectedMandiriKampus(e.target.value)} // menyimpan id sebagai string
                      className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg text-sm focus:outline-none focus:border-orange-500 bg-white"
                    >
                      <option value="">-- Pilih Kampus --</option>
                      {jalurMandiriOptions.map((option) => (
                        <option key={option.id} value={String(option.id)}>
                          {option.kampusNama}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Summary */}
            {selectedJalurs.length > 0 && (
              <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                <h5 className="text-sm font-medium text-purple-900 mb-2">
                  Jalur yang Dipilih:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedJalurs.map((jalur, idx) => {
                    let label = jalur;

                    if (jalur === "Mandiri" && selectedMandiriKampus) {
                      const kampus = jalurMandiriOptions.find(
                        (x) => String(x.id) === selectedMandiriKampus
                      );
                      if (kampus) label = `Mandiri - ${kampus.kampusNama}`;
                    }

                    return (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setShowJalurModal(false);
                  setSelectedJalurs([]);
                  setSelectedMandiriKampus("");
                }}
                className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveJalurSelection}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Simpan Pilihan
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
