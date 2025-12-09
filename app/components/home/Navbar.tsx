"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

type NavItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavItem[] = [{ name: "Beranda", href: "/", current: false }];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLayananDropdown, setShowLayananDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(Boolean(token));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  }

  const layananMenu = [
    { name: "Kampus", href: "/kampus" },
    { name: "Jurusan", href: "/jurusan" },
    { name: "Beasiswa", href: "/beasiswa" },
    { name: "Try Out", href: "/tryout" },
    { name: "Tes Potensi", href: "/tespotensi" },
  ];

  const isActive = (url: string) => pathname === url;

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 transition-colors duration-300 bg-white border border-b shadow"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* MOBILE BUTTON */}
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 ui-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 ui-open:block" />
            </DisclosureButton>
          </div>

          {/* LOGO */}
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </Link>
            </div>

            {/* MENU DESKTOP */}
            <div className="hidden sm:ml-6 lg:block">
              <div className="flex space-x-4 my-5">
                {/* Beranda */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-md font-medium ${
                      isActive(item.href)
                        ? "border bg-blue-900 text-white hover:bg-white hover:text-blue-900"
                        : "text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Dropdown Layanan */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowLayananDropdown(true)}
                  onMouseLeave={() => setShowLayananDropdown(false)}
                >
                  <button
                    className={`px-3 py-2 rounded-md text-md font-medium flex items-center gap-2 ${
                      layananMenu.some((m) => isActive(m.href))
                        ? "border bg-blue-900 text-white hover:bg-white hover:text-blue-900"
                        : "text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    <Squares2X2Icon className="w-5 h-5" />
                    Layanan
                  </button>

                  {showLayananDropdown && (
                    <div className="absolute mt-0 bg-white shadow-lg rounded-lg w-40 py-2 z-50">
                      {layananMenu.map((menu) => (
                        <Link
                          key={menu.name}
                          href={menu.href}
                          className={`block px-4 py-2 hover:bg-blue-50 ${
                            isActive(menu.href)
                              ? "bg-blue-100 font-semibold text-blue-900"
                              : "text-gray-700"
                          }`}
                        >
                          {menu.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dashboard (login only) */}
                {isLoggedIn && (
                  <Link
                    href="/dashboard"
                    className={`rounded-md px-3 py-2 text-md font-medium ${
                      isActive("/dashboard")
                        ? "px-4 py-2 rounded-md text-sm border transition bg-blue-900 text-white hover:bg-white hover:text-blue-900"
                        : "text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* LOGIN / LOGOUT */}
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

      {/* MOBILE PANEL */}
      <DisclosurePanel className="sm:hidden bg-[#0A142F]">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {/* Beranda */}
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive(item.href) ? "text-white bg-blue-800" : "text-gray-300"
              }`}
            >
              {item.name}
            </DisclosureButton>
          ))}

          {/* Dropdown Mobile */}
          <div className="px-3 py-2">
            <p className="text-gray-400 mb-1">Layanan</p>
            <div className="flex flex-col gap-1">
              {layananMenu.map((menu) => (
                <a
                  key={menu.name}
                  href={menu.href}
                  className={`px-2 py-1 rounded ${
                    isActive(menu.href)
                      ? "text-white bg-blue-800"
                      : "text-gray-300"
                  }`}
                >
                  {menu.name}
                </a>
              ))}
            </div>
          </div>

          {/* Dashboard Mobile */}
          {isLoggedIn && (
            <DisclosureButton
              as="a"
              href="/dashboard"
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive("/dashboard")
                  ? "text-white bg-blue-800"
                  : "text-gray-300"
              }`}
            >
              Dashboard
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
