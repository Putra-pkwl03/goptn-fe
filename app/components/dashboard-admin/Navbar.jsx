"use client";
import { Bell, Menu } from "lucide-react";

export function Navbar({ open, toggleSidebar }) {
    return (
        <header
            className={`
            fixed top-0 left-0 right-0 h-16 z-40
            backdrop-blur-xl bg-black/60 text-white border-b border-white/10 shadow-lg
            flex items-center justify-between 
            transition-all duration-300
            ${open ? "md:pl-68" : "md:pl-24"}
        `}
         >
            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                >
                    <Menu size={22} />
                </button>

                <h1 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Dashboard
                </h1>
            </div>

            {/* Right */}
            <button className="p-2 rounded-xl hover:bg-white/10 transition">
                <Bell size={22} />
            </button>
        </header>
    );
}
