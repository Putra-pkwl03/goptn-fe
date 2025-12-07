"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginStudent } from "@/lib/auth/login";
import { getStudentMe } from "@/lib/student/me";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginStudent({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login success:", response);
      localStorage.setItem("token", response.token);

      const me = await getStudentMe();
      console.log("me", me);

      alert("Login berhasil!");

      const notDataStudent = 
        me.profile == null || 
        me.ptn_choices.length === 0 ||
        me.entry_paths.length === 0;

      if (notDataStudent) {
        router.push("/personalisasi");
      } else {
        router.push("/dashboard");
      }

    } catch (err) {
      let message = "Terjadi kesalahan";

      if (err instanceof Error) {
        message = err.message || message;
      }

      alert(message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center">
            <Image src="/assets/logo.png" alt="Logo" width={120} height={120} />
          </div>
          <h2 className="mb-2">Masuk ke Akun Anda</h2>
          <p className="text-gray-600">Dapatkan akses ke fitur premium Anda</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-12 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                  placeholder="Masukkan password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Masuk
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Belum punya akun?
              </span>
            </div>
          </div>

          {/* Navigate to Register */}
          <button
            onClick={() => router.push("/register")}
            className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
          >
            Daftar Akun Baru
          </button>
        </div>
      </div>
    </div>
  );
}
