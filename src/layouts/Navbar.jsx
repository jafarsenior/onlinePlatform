import React from "react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-[#1E1E1E]/90 to-[#2A2A2A]/90 backdrop-blur-lg border-b border-[#C5A46D]/30 p-4 flex justify-between items-center shadow-md">
      {/* --- Mobil menyu tugmasi --- */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-[#C5A46D] hover:text-white transition"
      >
        ☰
      </button>

      {/* --- Navbar sarlavhasi --- */}
      <h1 className="text-[#C5A46D] font-semibold text-lg lg:text-xl tracking-wide">
        Dashboard
      </h1>

      {/* --- Profil / Belgilar joyi --- */}
      <div className="flex items-center gap-4">
        <button className="text-[#C5A46D]/80 hover:text-[#C5A46D] transition text-lg">
          🔔
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C5A46D] to-[#8B6F3D] border border-[#C5A46D]/40 shadow-md"></div>
      </div>
    </header>
  );
};

export default Navbar;
