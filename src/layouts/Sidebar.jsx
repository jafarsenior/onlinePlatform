import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";

// --- SVG ICONLAR ---
const Icons = {
  Dashboard: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Planner: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Calendar frame */}
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      {/* Checkmark inside calendar */}
      <path d="M9 15l2 2 4-4"></path>
    </svg>
  ),

  Assistent: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* stylized robot head with spark / brain hint */}
      <rect x="3" y="3" width="18" height="14" rx="2" ry="2"></rect>
      <path d="M8 8h0" /> {/* left eye (dot) */}
      <path d="M16 8h0" /> {/* right eye (dot) */}
      <path d="M8 14h8" /> {/* mouth line */}
      {/* antenna / spark */}
      <line x1="12" y1="3" x2="12" y2="1" />
      <circle cx="12" cy="1" r="1.2" />
      {/* subtle circuit/brain hint */}
      <path d="M6 12c1-2 3-2 4-1s2 2 4 1 3-2 4-1" />
    </svg>
  ),

  Finance: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bar chart */}
      <line x1="4" y1="20" x2="4" y2="10"></line>
      <line x1="10" y1="20" x2="10" y2="4"></line>
      <line x1="16" y1="20" x2="16" y2="14"></line>

      {/* Dollar symbol */}
      <path d="M20 7c0-2-2-3-4-3s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-3" />
      <line x1="16" y1="2" x2="16" y2="22"></line>
    </svg>
  ),

  Health: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
      <polyline points="3 12 8 12 10 9 14 15 16 12 21 12" />
    </svg>
  ),

  User: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  LogIn: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  ),
  X: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { darkMode } = useContext(ThemeContext);

  // 🔹 Ranglar faqat
  const bgSidebar = darkMode ? "bg-[#1E1E1E]" : "bg-white";
  const textMain = darkMode ? "text-[#C5A46D]" : "text-gray-800";
  const borderColor = darkMode ? "border-[#C5A46D]/30" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-[#C5A46D]/10" : "hover:bg-[#C5A16D]";
  const activeBg = darkMode ? "bg-[#C5A46D]" : "bg-[#C5A46D]";
  const activeText = darkMode ? "text-[#1E1E1E]" : "text-white";



  const menuItems = [
  { icon: "Planner", label: "Planner", section: "main" },
  { icon: "Assistent", label: "AI Assistent", section: "main" },
  { icon: "Health", label: "Health", section: "main" },
  { icon: "Finance", label: "Finance", section: "main" },
  { icon: "User", label: "Profile", section: "account" },
  { icon: "LogIn", label: "Settings", section: "account" },
];


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full ${bgSidebar} border-r ${borderColor} z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            {/* Logo */}
            <div className="flex items-center justify-between mb-8">
              <h1 className={`text-2xl font-bold ${textMain} flex items-center gap-2`}>
                <div className="w-8 h-8 rounded-lg bg-[#C5A46D]" />
                LifeOS
              </h1>
              <button onClick={toggleSidebar} className={`${textMain} lg:hidden`}>
                <Icons.X />
              </button>
            </div>

            {/* Dashboard Link */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive ? `${activeBg} ${activeText} font-semibold` : `${textMain} ${hoverBg}`
                }`
              }
            >
              <Icons.Dashboard />
              <span>Dashboard</span>
            </NavLink>

            {/* Other menu items */}
            <div className="space-y-6 mt-4">
              {menuItems.map((item) => {
                const IconComponent = Icons[item.icon];
                return (
                  <NavLink
                    key={item.label}
                    to={`/dashboard/${item.label.toLowerCase().replace(/\s+/g, "")}`}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive ? `${activeBg} ${activeText} font-semibold` : `${textMain} ${hoverBg}`
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

          {/* Footer */}
          <div className={`rounded-2xl p-6 border ${borderColor} ${bgSidebar}`}>
            <h3 className={`${textMain} font-semibold mb-2`}>Need help?</h3>
            <p className={`${textMain} text-sm mb-4`}>Please check our docs</p>
            <button className={`w-full font-semibold py-2 rounded-lg ${activeBg} ${activeText}`}>
              DOCUMENTATION
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default Sidebar;
