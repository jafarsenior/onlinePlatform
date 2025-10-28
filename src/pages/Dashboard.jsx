import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-[#C5A46D]">
      {/* --- SIDEBAR --- */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="lg:ml-64 transition-all duration-300">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-6 text-[#C5A46D]">
          <Outlet /> {/* 🔹 Ichki sahifalar shu yerda ko‘rinadi */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
