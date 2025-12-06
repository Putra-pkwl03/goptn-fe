"use client";
import { Menu, Home, BarChart, Settings, X } from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
        className={`
            fixed top-0 left-0 h-screen z-50
            backdrop-blur-xl bg-black/80 text-white 
            border-r border-white/10 shadow-2xl
            flex flex-col transition-all duration-300
            ${open ? "w-64" : "w-20"}
        `}
        >

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        {open && (
          <h2 className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Goptn
          </h2>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-xl hover:bg-white/10 transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Items */}
      <nav className="flex flex-col gap-3 p-4 mt-2">
        <SidebarItem open={open} icon={<Home size={22} />} label="Dashboard" />
        <SidebarItem open={open} icon={<BarChart size={22} />} label="Analytics" />
        <SidebarItem open={open} icon={<Settings size={22} />} label="Pengaturan" />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, open }) {
  return (
    <a
      className="
        group flex items-center gap-4 p-3 rounded-xl cursor-pointer
        hover:bg-white/10 transition
      "
    >
      <span>{icon}</span>
      {open && <span className="text-sm font-medium">{label}</span>}
    </a>
  );
}
