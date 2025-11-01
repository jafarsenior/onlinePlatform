import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { darkMode } = useContext(ThemeContext);

  // 🔹 Ranglar
  const bgGradient = darkMode
    ? "bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E]"
    : "bg-gradient-to-br from-white via-gray-200 to-white";
  const textColor = darkMode ? "text-[#C5A46D]" : "text-gray-800";
  const aiBg = darkMode ? "bg-[#C5A46D]" : "bg-[#C5A46D]";
  const aiText = darkMode ? "text-[#1E1E1E]" : "text-white";
  const aiHover = darkMode ? "hover:bg-[#d8b87a]" : "hover:bg-[#C5A16D]";

  // LocalStorage'dan joylashuvni olish
  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem("aiButtonPos"));
    if (savedPosition) setPosition(savedPosition);
  }, []);

  // LocalStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("aiButtonPos", JSON.stringify(position));
  }, [position]);

  // Drag funksiyasi
  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e) => {
    if (!dragging) return;

    const buttonWidth = 160; // AI button width (approx)
    const buttonHeight = 50; // AI button height (approx)

    const maxX = window.innerWidth - buttonWidth - 10; // o‘ng cheklov
    const maxY = window.innerHeight - buttonHeight - 10; // past cheklov

    const newX = Math.min(Math.max(10, e.clientX - buttonWidth / 2), maxX);
    const newY = Math.min(Math.max(10, e.clientY - buttonHeight / 2), maxY);

    setPosition({ x: newX, y: newY });
  };

  const isAssistantPage = pathname === "/dashboard/aiassistent";

  return (
    <div
      className={`min-h-screen relative ${bgGradient} ${textColor}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* --- SIDEBAR --- */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="lg:ml-64 transition-all duration-300">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="pt-16 p-1">
          <Outlet />
        </main>
      </div>

      {/* --- AI Assistant Floating Button --- */}
      {!isAssistantPage && (
        <button
          onClick={() => navigate("/dashboard/aiassistent")}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className={`fixed ${aiBg} ${aiText} p-4 rounded-full shadow-lg ${aiHover} hover:scale-110 transition-transform duration-200 flex items-center gap-2 font-semibold cursor-pointer active:scale-95`}
          style={{
            right: `${position.x}px`,
            bottom: `${position.y}px`,
            zIndex: 9999,
          }}
        >
          <MessageSquare size={20} />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>
      )}
    </div>
  );
};

export default Dashboard;
