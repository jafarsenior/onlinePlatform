import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Bell} from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const { darkMode } = useContext(ThemeContext);

  // Ranglar dark/light uchun
  const bgNavbar = darkMode
    ? "bg-[#1E1E1E]/80 backdrop-blur-lg"
    : "bg-white/80 backdrop-blur-lg";
  const borderColor = darkMode ? "border-[#C5A46D]/30" : "border-gray-200";
  const textMain = darkMode ? "text-[#C5A46D]" : "text-gray-800";
  const hoverEffect = darkMode
    ? "hover:text-white transition-all"
    : "hover:text-yellow-500 transition-all";

  return (
    <header
      className={`fixed top-0 left-0 w-full ${bgNavbar} border-b ${borderColor} flex justify-between items-center p-4 z-50 shadow-md`}
    >
      {/* --- Mobil sidebar tugmasi --- */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden text-2xl ${textMain} ${hoverEffect}`}
      >
        ☰
      </button>

      {/* --- Sarlavha --- */}
      <h1 className={`font-bold text-xl lg:text-2xl ${textMain}`}>
        Dashboard
      </h1>

      {/* --- Iconlar va profil --- */}
      <div className="flex items-center gap-4">
        

        {/* Notifications */}
        <button
          className={`relative p-2 rounded-full ${hoverEffect} transition-all`}
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
        </button>

        {/* Profil Avatar */}
        <div
          className={`w-10 h-10 rounded-full border ${
            darkMode ? "border-[#C5A46D]" : "border-gray-300"
          } overflow-hidden shadow-md`}
        >
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
