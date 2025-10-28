import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E1E1E] text-white px-6">
      {/* Top Tabs */}
      <div className="flex gap-4 mb-8 bg-[#2A2A2A] rounded-full p-1">
        <button
          onClick={() => navigate("/auth/login")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            pathname === "/auth/login"
              ? "bg-[#C5A46D] text-[#1E1E1E]"
              : "text-[#C5A46D] hover:bg-[#C5A46D]/20"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/auth/register")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            pathname === "/auth/register"
              ? "bg-[#C5A46D] text-[#1E1E1E]"
              : "text-[#C5A46D] hover:bg-[#C5A46D]/20"
          }`}
        >
          Register
        </button>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-[#2A2A2A]/70 p-8 rounded-2xl shadow-xl border border-[#C5A46D]/20 backdrop-blur-md">
        <Outlet /> {/* 🔥 Bu joyda Login yoki Register chiqadi */}
      </div>
    </div>
  );
}
