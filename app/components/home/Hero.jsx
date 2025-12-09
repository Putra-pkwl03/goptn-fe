"use client";

import { Calendar, Bell, School, GraduationCap, Award, FileText, Brain } from 'lucide-react';
import Navbar from "./Navbar";

export default function Hero({ onStart }) {
  return (
    <div className="bg-linear-to-r from-blue-50 to-white">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Raih Impian Kuliah di PTN Idaman!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Platform terlengkap untuk informasi jadwal SNBP, SNBT, dan Jalur
              Mandiri PTN. Dapatkan notifikasi otomatis agar tidak ketinggalan
              pendaftaran!
            </p>

            <div className="flex gap-4 justify-center mb-16">
              <button
                onClick={onStart}
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                Mulai Sekarang - Gratis!
              </button>
            </div>

            {/* Features Grid - Cards that wrap */}
            <div className="flex flex-wrap justify-center gap-6 mt-16 max-w-6xl mx-auto">
              {/* Jadwal Lengkap */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold mb-3">Jadwal Lengkap</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Informasi jadwal SNBP, SNBT, dan Mandiri dari seluruh PTN
                </p>
              </div>

              {/* Notifikasi Otomatis */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold mb-3">Notifikasi Otomatis</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pengingat otomatis agar tidak terlewat pendaftaran penting
                </p>
              </div>

              {/* Kampus */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <School className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold mb-3">Kampus</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Temukan informasi lengkap PTN di seluruh Indonesia
                </p>
              </div>

              {/* Jurusan */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold mb-3">Jurusan</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Jelajahi ratusan jurusan dan prospek karirnya
                </p>
              </div>

              {/* Beasiswa */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-bold mb-3">Beasiswa</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Akses informasi beasiswa dari berbagai sumber
                </p>
              </div>

              {/* Try Out */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold mb-3">Try Out</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Latihan soal UTBK untuk persiapan maksimal
                </p>
              </div>

              {/* Tes Potensi */}
              <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
                <div className="w-11 h-11 bg-pink-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-bold mb-3">Tes Potensi</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Temukan jurusan sesuai minat dan bakatmu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import SearchBar from "./SearchBar";
// import Navbar from "./Navbar";

// export default function Hero() {
//   const features = [
//     {
//       title: "Tes Potensi",
//       icon: "/assets/i1.png",
//       desc: "Computer our easy online applicaTion and pay with credit card or palpay.",
//       href: "/",
//     },
//     {
//       title: "Kampus",
//       icon: "/assets/i4.png",
//       desc: "No  need to deal with the embasy. we do it for you so you don’t lose valuable time.Informasi lengkap kampus.",
//       href: "/kampus",
//     },
//     {
//       title: "Jurusan",
//       icon: "/assets/i3.png",
//       desc: "Presend your Passport anddocument we provide uupon entry to destination country",
//       href: "/jurusan",
//     },
//     {
//       title: "Try Out",
//       icon: "/assets/i1.png",
//       desc: "Latihan soal UTBK.",
//       href: "/tryout",
//     },
//     {
//       title: "Beasiswa",
//       icon: "/assets/i2.png",
//       desc: "No  need to deal with the embasy. we do it for you so you don’t lose valuable time..",
//       href: "/beasiswa",
//     },
//     {
//       title: "Jadwal",
//       icon: "/assets/i2.png",
//       desc: "No  need to deal with the embasy. we do it for you so you don’t lose valuable time.",
//       href: "/jadwal",
//     },
//   ];

//   return (
//     <div className="relative z-0  h-screen bg-[linear-gradient(to_bottom,#53A9BC,#5C89C3,#8292DC,#FBF3F3)]">
//       <Navbar />

//       <section className="mx-auto max-w-7xl p-4 md:mt-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_2fr] items-center ">
//           <div className="flex flex-col gap-6">
//             <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
//               Menuju kampus impian? <br />
//               Mulai dari <span className="text-yellow-300">GO PTN</span>
//             </h1>
//             <div className="mt-3 md:mt-4 lg:mt-6">
//               <SearchBar />
//             </div>
//           </div>

//           <div className="flex justify-end my-8 md:mt-0">
//             <Image
//               src="/assets/hero.png"
//               alt="hero"
//               width={700}
//               height={700}
//               className=""
//               draggable={false}
//             />
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl p-4 my-8">
//         <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
//           {features.map((item, idx) => (
//             <Link
//               key={idx}
//               href={item.href ?? "#"}
//               className="group bg-white rounded-2xl shadow-md py-4 flex flex-col items-center text-center
//                           transition-all duration-300 border-2 border-transparent hover:border-orange-500
//                           hover:-translate-y-1 hover:shadow-lg"
//             >
//               <h3 className="text-xs md:text-base text-slate-700 font-semibold mb-2">
//                 {item.title}
//               </h3>

//               <Image
//                 src={item.icon}
//                 alt={item.title}
//                 className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110"
//                 width={100}
//                 height={100}
//                 draggable={false}
//               />
//             </Link>
//           ))}
//         </div>
//       </section>

//       <div
//         className="hidden lg:block absolute bottom-0 left-0 right-0 h-[330px] bg-no-repeat bg-cover bg-bottom -z-10"
//         style={{ backgroundImage: "url(/assets/bg-footer-hero.png)" }}
//       />
//     </div>
//   );
// }
