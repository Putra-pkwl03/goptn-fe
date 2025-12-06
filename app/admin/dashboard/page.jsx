"use client";
import { useState } from "react";
import Sidebar from "../../components/dashboard-admin/Sidebar";
import { Navbar } from "../../components/dashboard-admin/Navbar";
import { Card } from "../../components/dashboard-admin/Card";

export default function DashboardPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Wrapper */}
      <div className="flex-1">

        {/* Navbar */}
        <Navbar open={open} toggleSidebar={() => setOpen(!open)} />

        {/* Content */}
        <main
          className={`
            p-4 pt-24 transition-all duration-300
            ${open ? "md:ml-64" : "md:ml-20"}
          `}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <Card title="Total User" value="1.233" />
            <Card title="Order Bulan Ini" value="322" />
            <Card title="Revenue" value="Rp 12.3jt" />
          </div>

          <div className="mt-6 p-6 bg-gray-500 rounded-xl shadow-sm border">
            <p className="font-semibold mb-3">Grafik Placeholder</p>
            <div className="h-40 bg-gray-600 rounded-lg"></div>
          </div>
        </main>

      </div>
    </div>
  );
}
