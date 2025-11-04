import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const bgMain = darkMode ? "bg-[#1E1E1E]" : "bg-[#F8F8F8]";
  const textMain = darkMode ? "text-white" : "text-gray-800";
  const cardBg = darkMode
    ? "bg-[#2A2A2A]/70 border-[#C5A46D]/20"
    : "bg-white border-[#C5A46D]/30";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${bgMain} ${textMain} transition-colors duration-300 pt-10`}>
      {/* Top Tabs */}
      <div className={`flex gap-4 rounded-full p-1 shadow-sm transition-colors duration-300 ${darkMode ? "bg-[#2A2A2A] border border-[#C5A46D]/30" : "bg-white border border-[#C5A46D]/30"}`}>
        <button
          onClick={() => navigate("/auth/login")}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            pathname === "/auth/login"
              ? "bg-gradient-to-r from-[#C5A46D] to-[#b8914f] text-white shadow-md"
              : darkMode
              ? "text-[#C5A46D] hover:bg-[#C5A46D]/20"
              : "text-[#C5A46D] hover:bg-[#C5A46D]/10"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/auth/register")}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
            pathname === "/auth/register"
              ? "bg-gradient-to-r from-[#C5A46D] to-[#b8914f] text-white shadow-md"
              : darkMode
              ? "text-[#C5A46D] hover:bg-[#C5A46D]/20"
              : "text-[#C5A46D] hover:bg-[#C5A46D]/10"
          }`}
        >
          Register
        </button>
      </div>

      {/* Auth Card */}
      <div>
        <Outlet /> {/* 🔥 Bu joyda Login yoki Register chiqadi */}
      </div>
    </div>
  );
}
