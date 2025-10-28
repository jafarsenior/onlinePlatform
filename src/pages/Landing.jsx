import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  // Smooth scroll uchun funksiya
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      {/* 🌟 Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#1E1E1E]/80 backdrop-blur-md border-b border-[#C5A46D]/20 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A46D] to-[#b98f4f] flex items-center justify-center shadow-md">
              <span className="font-bold text-[#1E1E1E] text-lg">M</span>
            </div>
            <h1 className="text-lg font-semibold text-[#C5A46D]">My App</h1>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection("about")} className="hover:text-[#C5A46D] transition">
              Biz haqimizda
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-[#C5A46D] transition">
              Aloqa
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-2 rounded-md bg-[#C5A46D] text-[#1E1E1E] font-semibold hover:scale-105 transition"
            >
              Kirish
            </button>
          </div>
        </div>
      </nav>

      {/* 🏠 Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome to <span className="text-[#C5A46D]">My App</span>
            </h1>
            <p className="text-gray-300 max-w-lg">
              A clean, elegant interface with a gold-on-black theme. Sign in to continue
              to your dashboard or create a new account to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => navigate("/auth/login")}
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#C5A46D] text-[#1E1E1E] font-medium shadow-md transform transition hover:scale-[1.02]"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="w-full sm:w-auto px-6 py-3 rounded-md border border-[#C5A46D] text-[#C5A46D] font-medium hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition"
              >
                Register
              </button>
            </div>
          </div>

          {/* Right: Preview Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/10 border border-white/10 backdrop-blur-md">
              <div className="mb-4">
                <div className="h-40 rounded-lg bg-gradient-to-br from-[#C5A46D]/30 to-[#C5A46D]/10 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white">Quick Preview</h3>
                    <p className="text-sm text-gray-300 mt-2">Your dashboard in one glance</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 h-12 rounded-md bg-white/10 flex items-center justify-center text-sm">Widgets</div>
                <div className="col-span-2 h-12 rounded-md bg-white/10 flex items-center justify-center text-sm">Analytics</div>
                <div className="col-span-1 h-12 rounded-md bg-white/10 flex items-center justify-center text-sm">Users</div>
                <div className="col-span-2 h-12 rounded-md bg-white/10 flex items-center justify-center text-sm">Settings</div>
              </div>

              <div className="mt-6 text-xs text-gray-400">
                Preview is illustrative — actual dashboard requires login.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧠 Biz haqimizda */}
      <section id="about" className="py-24 px-6 bg-[#1A1A1A] border-t border-[#C5A46D]/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#C5A46D]">Biz haqimizda</h2>
          <p className="text-gray-300 leading-relaxed">
            My App — bu zamonaviy, qulay va ishonchli platforma bo‘lib, foydalanuvchilarga o‘z
            ma’lumotlarini boshqarish, tahlil qilish va samarali ishlash imkonini beradi.
            Bizning maqsadimiz — murakkab jarayonlarni soddalashtirish va foydalanuvchiga
            eng yaxshi tajribani taqdim etish.
          </p>
        </div>
      </section>

      {/* 📞 Aloqa */}
      <section id="contact" className="py-24 px-6 bg-[#1E1E1E] border-t border-[#C5A46D]/20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#C5A46D]">Aloqa</h2>
          <p className="text-gray-300">
            Savollar yoki takliflaringiz bormi? Quyidagi manzil orqali biz bilan bog‘laning.
          </p>
          <div className="space-y-2 text-gray-400">
            <p>📧 Email: <a href="mailto:support@myapp.com" className="text-[#C5A46D] hover:underline">support@myapp.com</a></p>
            <p>📍 Manzil: Toshkent, O‘zbekiston</p>
          </div>
        </div>
      </section>

      {/* ⚓ Footer */}
      <footer className="border-t border-[#C5A46D]/20 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My App — Crafted with ❤️ and a touch of gold
      </footer>
    </div>
  );
}
