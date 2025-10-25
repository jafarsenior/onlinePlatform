import { NavLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-[#1E1E1E] text-[#C5A46D] px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#C5A46D] flex items-center justify-center text-[#1E1E1E] font-bold text-lg shadow-lg">
          M
        </div>
        <span className="text-xl font-semibold">My App</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-[#C5A46D] hover:text-white"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/home/about"
          className={({ isActive }) =>
            isActive ? "text-white font-bold" : "text-[#C5A46D] hover:text-white"
          }
        >
          About
        </NavLink>

        {/* User Button */}
        <button className="flex items-center gap-2 bg-[#C5A46D] text-[#1E1E1E] px-4 py-1 rounded-md font-medium hover:brightness-110 transition">
          <FaUserCircle size={20} />
          User
        </button>
      </div>
    </nav>
  );
}