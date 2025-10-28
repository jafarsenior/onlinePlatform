import React from "react";
import { NavLink } from "react-router-dom";

// --- SVG ICONLAR ---
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Table: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="3" y1="15" x2="21" y2="15"></line>
      <line x1="9" y1="3" x2="9" y2="21"></line>
      <line x1="15" y1="3" x2="15" y2="21"></line>
    </svg>
  ),
  File: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
    </svg>
  ),
  Branch: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="6" y1="3" x2="6" y2="15"></line>
      <circle cx="18" cy="6" r="3"></circle>
      <circle cx="6" cy="18" r="3"></circle>
      <path d="M18 9a9 9 0 0 1-9 9"></path>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  LogIn: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: "Table", label: "Planner", section: "main" },
    { icon: "File", label: "AI Assistent", section: "main" },
    { icon: "Branch", label: "Health", section: "main" },
    { icon: "Branch", label: "Finance", section: "main" },
    { icon: "User", label: "Profile", section: "account" },
    { icon: "LogIn", label: "Settings", section: "account" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-[#1E1E1E] border-r border-[#C5A46D]/30 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            {/* --- LOGO --- */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-[#C5A46D] flex items-center gap-2">
                <div className="w-8 h-8 bg-[#C5A46D] rounded-lg" />
                LifeOS
              </h1>
              <button onClick={toggleSidebar} className="lg:hidden text-[#C5A46D]">
                <Icons.X />
              </button>
            </div>

            {/* --- DASHBOARD LINK --- */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#C5A46D] text-[#1E1E1E] font-semibold"
                    : "text-[#C5A46D]/80 hover:bg-[#C5A46D]/10"
                }`
              }
            >
              <Icons.Dashboard />
              <span>Dashboard</span>
            </NavLink>

            {/* --- OTHER MENU ITEMS --- */}
            <div className="space-y-6">
              <div>
                {menuItems
                  .filter((item) => item.section === "main")
                  .map((item) => {
                    const IconComponent = Icons[item.icon];
                    return (
                      <NavLink
                        key={item.label}
                        to={`/dashboard/${item.label.toLowerCase().replace(/\s+/g, "")}`}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-[#C5A46D] text-[#1E1E1E] font-semibold"
                              : "text-[#C5A46D]/80 hover:bg-[#C5A46D]/10"
                          }`
                        }
                      >
                        <IconComponent />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
              </div>

              <div>
                <h3 className="text-xs font-semibold text-[#C5A46D]/60 uppercase mb-3 px-4">
                  Account Pages
                </h3>
                {menuItems
                  .filter((item) => item.section === "account")
                  .map((item) => {
                    const IconComponent = Icons[item.icon];
                    return (
                      <NavLink
                        key={item.label}
                        to={`/dashboard/${item.label.toLowerCase().replace(/\s+/g, "")}`}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-[#C5A46D] text-[#1E1E1E] font-semibold"
                              : "text-[#C5A46D]/80 hover:bg-[#C5A46D]/10"
                          }`
                        }
                      >
                        <IconComponent />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* --- FOOTER (HELP SECTION) --- */}
          <div className="bg-[#C5A46D]/10 rounded-2xl p-6 border border-[#C5A46D]/20">
            <div className="relative">
              <div className="w-12 h-12 bg-[#C5A46D] rounded-full mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-[#1E1E1E] rounded-full" />
              </div>
              <h3 className="text-[#C5A46D] font-semibold mb-2">Need help?</h3>
              <p className="text-[#C5A46D]/70 text-sm mb-4">
                Please check our docs
              </p>
              <button className="w-full bg-[#C5A46D] text-[#1E1E1E] font-semibold py-2 rounded-lg text-sm hover:bg-[#d8b87a] transition">
                DOCUMENTATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
