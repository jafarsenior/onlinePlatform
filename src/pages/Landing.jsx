import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Landing() {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const bgMain = darkMode
    ? "bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A]"
    : "bg-gradient-to-b from-gray-50 to-white";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const accent = "#C5A46D";

  return (
    <div className={`min-h-screen ${bgMain} ${textMain} transition-colors duration-500`}>
      {/* 🌟 Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full ${
          darkMode ? "bg-[#1E1E1E]/80" : "bg-white/80"
        } backdrop-blur-md border-b border-[#C5A46D]/20 z-50`}
      >
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
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-[#C5A46D] transition"
            >
              Biz haqimizda
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#C5A46D] transition"
            >
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
      <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
        {/* Orqa fon effektlari */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#C5A46D20,_transparent_50%)]"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-20 right-40 w-40 h-40 bg-[#C5A46D]/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Chap qism (matn) */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Create. Manage. <br />
              <span className="text-[#C5A46D]">Succeed.</span>
            </h1>
            <p className="text-gray-400 max-w-lg text-lg">
              Bizning platformamiz yordamida siz ma’lumotlaringizni tahlil qilishingiz,
              boshqarishingiz va rivojlanishingiz mumkin — barchasi qulay interfeysda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/auth/login")}
                className="w-full sm:w-auto px-8 py-3 rounded-md bg-[#C5A46D] text-[#1E1E1E] font-semibold shadow-md transition"
              >
                Boshlash
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection("about")}
                className="w-full sm:w-auto px-8 py-3 rounded-md border border-[#C5A46D] text-[#C5A46D] font-medium hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition"
              >
                Batafsil
              </motion.button>
            </div>
          </motion.div>

          {/* O‘ng qism (animatsion preview) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`w-full max-w-md p-6 rounded-2xl border ${
                darkMode
                  ? "bg-[#2A2A2A]/80 border-[#C5A46D]/30"
                  : "bg-white/80 border-gray-300"
              } backdrop-blur-md shadow-xl`}
            >
              <div className="h-40 rounded-lg bg-gradient-to-br from-[#C5A46D]/30 to-transparent flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold">Live Preview</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    Your dashboard, simplified.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {["Widgets", "Analytics", "Users", "Settings"].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`h-12 rounded-md ${
                      darkMode ? "bg-white/10" : "bg-gray-100"
                    } flex items-center justify-center text-sm`}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🧠 Biz haqimizda */}
      <section
        id="about"
        className={`py-24 px-6 ${
          darkMode ? "bg-[#1A1A1A]" : "bg-gray-50"
        } border-t border-[#C5A46D]/20`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#C5A46D]">Biz haqimizda</h2>
          <p className="text-gray-400 leading-relaxed">
            My App — bu zamonaviy, qulay va ishonchli platforma bo‘lib, foydalanuvchilarga o‘z
            ma’lumotlarini boshqarish, tahlil qilish va samarali ishlash imkonini beradi.
            Bizning maqsadimiz — murakkab jarayonlarni soddalashtirish va foydalanuvchiga
            eng yaxshi tajribani taqdim etish.
          </p>
        </div>
      </section>

      {/* 📞 Aloqa */}
      <section
        id="contact"
        className={`py-24 px-6 ${
          darkMode ? "bg-[#1E1E1E]" : "bg-white"
        } border-t border-[#C5A46D]/20`}
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#C5A46D]">Aloqa</h2>
          <p className="text-gray-400">
            Savollar yoki takliflaringiz bormi? Quyidagi manzil orqali biz bilan bog‘laning.
          </p>
          <div className="space-y-2 text-gray-500">
            <p>
              📧 Email:{" "}
              <a
                href="mailto:support@myapp.com"
                className="text-[#C5A46D] hover:underline"
              >
                support@myapp.com
              </a>
            </p>
            <p>📍 Manzil: Toshkent, O‘zbekiston</p>
          </div>
        </div>
      </section>

      {/* ⚓ Footer */}
      <footer
        className={`border-t border-[#C5A46D]/20 py-6 text-center text-sm ${
          darkMode ? "text-gray-500" : "text-gray-600"
        }`}
      >
        © {new Date().getFullYear()} My App — Crafted with ❤️ and a touch of gold
      </footer>
    </div>
  );
}
