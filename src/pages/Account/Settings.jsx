import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Moon, Sun, Bell, Globe, Shield } from "lucide-react";

const Settings = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);



  // Oddiy shart bilan ranglarni belgilaymiz
  const bgCard = darkMode ? "bg-[#2C2C2C]" : "bg-gradient-to-br from-white via-gray-200 to-white";
  const textMain = darkMode ? "text-[#C5A46D]" : "text-gray-800";
  const bgPage = darkMode ? "bg-[#1E1E1E]" : "bg-gradient-to-br from-white via-gray-200 to-white";

  return (
    <div className={`${bgPage} min-h-screen p-6`}>
      {/* --- Profile Card --- */}
      <div className={`rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 ${bgCard}`}>
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-[#C5A46D]"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className={`text-2xl font-semibold ${textMain}`}>Jafar Jabborov</h2>
          <p className={`text-sm opacity-80 ${textMain}`}>jafar@example.com</p>
        </div>
        <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-full border border-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
      </div>

      {/* --- Settings Sections --- */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Notification */}
        <div className={`rounded-2xl p-6 shadow-lg ${bgCard}`}>
          <div className="flex items-center gap-3 mb-3">
            <Bell className="text-[#C5A46D]" />
            <h3 className={`text-lg font-semibold ${textMain}`}>Notifications</h3>
          </div>
          <p className={`text-sm opacity-80 ${textMain}`}>
            Manage your email, push, and desktop notifications preferences.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-[#C5A46D]" />
              Email Alerts
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#C5A46D]" />
              Push Notifications
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-[#C5A46D]" />
              Weekly Summary
            </label>
          </div>
        </div>

        {/* Language */}
        <div className={`rounded-2xl p-6 shadow-lg ${bgCard}`}>
          <div className="flex items-center gap-3 mb-3">
            <Globe className="text-[#C5A46D]" />
            <h3 className={`text-lg font-semibold ${textMain}`}>Language</h3>
          </div>
          <p className={`text-sm opacity-80 ${textMain}`}>
            Choose your preferred display language.
          </p>
          <select
            className={`mt-4 w-full rounded-md border px-3 py-2 outline-none ${
              darkMode
                ? "bg-[#1E1E1E] border-[#444] text-[#C5A46D]"
                : "bg-white border-gray-300 text-gray-800"
            }`}
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
          </select>
        </div>

        {/* Privacy */}
        <div className={`rounded-2xl p-6 shadow-lg md:col-span-2 ${bgCard}`}>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="text-[#C5A46D]" />
            <h3 className={`text-lg font-semibold ${textMain}`}>Privacy</h3>
          </div>
          <p className={`text-sm opacity-80 mb-4 ${textMain}`}>
            Control how your data is used and shared.
          </p>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#C5A46D]" defaultChecked />
              Allow analytics tracking
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#C5A46D]" />
              Share anonymous usage data
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#C5A46D]" defaultChecked />
              Enable personalized ads
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
