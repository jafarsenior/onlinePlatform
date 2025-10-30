import React, { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // ✅ Hozirgi sahifa manzili

  // Joylashuvni localStorage'dan olish
  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem("aiButtonPos"));
    if (savedPosition) setPosition(savedPosition);
  }, []);

  // Joylashuvni saqlash
  useEffect(() => {
    localStorage.setItem("aiButtonPos", JSON.stringify(position));
  }, [position]);

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: window.innerWidth - e.clientX - 40,
      y: window.innerHeight - e.clientY - 40,
    });
  };

  const isAssistantPage = pathname === "/dashboard/aiassistent"; // ✅ Shart

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-[#C5A46D]"
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
        <main className="p-6 text-[#C5A46D]">
          <Outlet />
        </main>
      </div>

      {/* --- AI Assistant Floating Button --- */}
      {!isAssistantPage && ( // ✅ faqat AI sahifasida ko‘rinmasin
        <button
          onClick={() => navigate("/dashboard/aiassistent")}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="fixed bg-[#C5A46D] text-[#1E1E1E] p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 flex items-center gap-2 font-semibold cursor-pointer active:scale-95"
          style={{
            bottom: `${position.y}px`,
            right: `${position.x}px`,
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
