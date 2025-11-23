"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

export default function Hero() {
  const features = [
    {
      title: "Tes Potensi",
      icon: "/assets/i1.png",
      desc: "Computer our easy online applicaTion and pay with credit card or palpay.",
      href: "/",
    },
    {
      title: "Kampus",
      icon: "/assets/i4.png",
      desc: "No  need to deal with the embasy. we do it for you so you don’t lose valuable time.Informasi lengkap kampus.",
      href: "/kampus",
    },
    {
      title: "Jurusan",
      icon: "/assets/i3.png",
      desc: "Presend your Passport anddocument we provide uupon entry to destination country",
      href: "/jurusan",
    },
    {
      title: "Try Out",
      icon: "/assets/i1.png",
      desc: "Latihan soal UTBK.",
      href: "/tryout",
    },
    {
      title: "Beasiswa",
      icon: "/assets/i2.png",
      desc: "No  need to deal with the embasy. we do it for you so you don’t lose valuable time..",
      href: "/beasiswa",
    },
    {
      title: "Jadwal",
      icon: "/assets/i2.png",
      desc: "No  need to deal with the embasy. we do it for you so you don’t lose valuable time.",
      href: "/jadwal",
    },
  ];

  return (
    <div className="relative z-0  h-screen bg-[linear-gradient(to_bottom,#53A9BC,#5C89C3,#8292DC,#FBF3F3)]">
      <Navbar />

      <section className="mx-auto max-w-7xl p-4 md:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_2fr] items-center ">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Menuju kampus impian? <br />
              Mulai dari <span className="text-yellow-300">GO PTN</span>
            </h1>
            <div className="mt-3 md:mt-4 lg:mt-6">
              <SearchBar />
            </div>
          </div>

          <div className="flex justify-end my-8 md:mt-0">
            <Image
              src="/assets/hero.png"
              alt="hero"
              width={700}
              height={700}
              className=""
              draggable={false}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl p-4 my-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {features.map((item, idx) => (
            <Link
              key={idx}
              href={item.href ?? "#"}
              className="group bg-white rounded-2xl shadow-md py-4 flex flex-col items-center text-center 
                          transition-all duration-300 border-2 border-transparent hover:border-orange-500 
                          hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xs md:text-base text-slate-700 font-semibold mb-2">
                {item.title}
              </h3>

              <Image
                src={item.icon}
                alt={item.title}
                className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110"
                width={100}
                height={100}
                draggable={false}
              />
            </Link>
          ))}
        </div>
      </section>

      <div
        className="hidden lg:block absolute bottom-0 left-0 right-0 h-[330px] bg-no-repeat bg-cover bg-bottom -z-10"
        style={{ backgroundImage: "url(/assets/bg-footer-hero.png)" }}
      />
    </div>
  );
}
