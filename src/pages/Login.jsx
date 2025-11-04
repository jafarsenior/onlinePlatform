import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { mockLogin } from "../api/mockAuth";
import { ThemeContext } from "../context/ThemeContext";

export default function Login() {
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    setLoading(true);
    const res = await mockLogin(form);
    setLoading(false);

    if (res.success) {
      alert(res.message);
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  };

  const cardBg = darkMode ? "bg-[#2A2A2A]/80 border-[#C5A46D]/30" : "bg-white border-[#C5A46D]/30";
  const inputBg = darkMode ? "bg-[#1E1E1E] text-white placeholder-gray-400 border-[#C5A46D]/40" : "bg-[#F9F9F9] text-gray-800 placeholder-gray-500 border-[#C5A46D]/40";
  const textColor = darkMode ? "text-white" : "text-gray-800";

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${darkMode ? "bg-[#1E1E1E]" : "bg-[#F8F8F8]"} transition-colors duration-300`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-lg border transition-colors duration-300 ${cardBg}`}>
        <h2 className={`text-3xl font-bold mb-6 text-center text-[#C5A46D]`}>Kirish</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className={`text-sm font-medium ${textColor}`}>Foydalanuvchi nomi</label>
            <input
              type="text"
              className={`w-full mt-2 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A46D] transition ${inputBg}`}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Masalan: jafar_uz"
            />
          </div>

          {/* Password */}
          <div>
            <label className={`text-sm font-medium ${textColor}`}>Parol</label>
            <input
              type="password"
              className={`w-full mt-2 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A46D] transition ${inputBg}`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="********"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 border border-red-300 rounded-md py-2">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 bg-gradient-to-r from-[#C5A46D] to-[#b8914f] text-white font-semibold rounded-md shadow-md hover:scale-[1.02] hover:shadow-[#C5A46D]/40 transition-all duration-200"
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>

          {/* Footer */}
          <p className={`mt-6 text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Hisobingiz yo‘qmi?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="text-[#C5A46D] font-medium hover:underline hover:text-[#b8914f] transition"
            >
              Ro‘yxatdan o‘tish
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
