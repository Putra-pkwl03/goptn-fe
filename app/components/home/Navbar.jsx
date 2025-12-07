"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Kampus", href: "#", current: false },
  { name: "Jurusan", href: "#", current: false },
  { name: "Beasiswa", href: "#", current: false },
  { name: "Jadwal", href: "#", current: false },
  { name: "Tryout", href: "#", current: false },
  { name: "Tes Potensi", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 transition-colors duration-300 bg-white border border-b shadow"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 text-white group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 text-white group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <span
                className={`text-2xl font-bold group-data-open:text-white ${
                  scrolled ? "text-blue-900" : "text-white"
                }`}
              >
                <Link href="/">GO PTN</Link>
              </span>
            </div>
            <div className="hidden sm:ml-6 lg:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className="text-blue-900 rounded-md px-3 py-2 text-md font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden md:flex items-center space-x-3 ml-auto">
              {!isLoggedIn ? (
                <>
                  <Link href="/login">
                    <button className="px-4 py-2 rounded-md text-sm border transition text-blue-900 hover:bg-blue-900 hover:text-white">
                      Masuk
                    </button>
                  </Link>

                  <Link href="/register">
                    <button className="px-4 py-2 rounded-md text-sm border transition bg-blue-900 text-white hover:bg-white hover:text-blue-900">
                      Daftar
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-[#0A142F]">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
