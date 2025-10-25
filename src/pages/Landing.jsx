import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1E1E] text-white px-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Text */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A46D] to-[#b98f4f] flex items-center justify-center shadow-lg">
              <span className="font-bold text-[#1E1E1E]">M</span>
            </div>
            <h2 className="text-xl tracking-wide text-[#C5A46D] font-semibold">My App</h2>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Welcome to <span className="text-[#C5A46D]">My App</span>
          </h1>

          <p className="text-gray-300 max-w-lg">
            A clean, elegant interface with a gold-on-black theme. Sign in to continue
            to your dashboard or create a new account to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#C5A46D] text-[#1E1E1E] font-medium shadow-md transform transition hover:scale-[1.02]"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto px-6 py-3 rounded-md border border-[#C5A46D] text-[#C5A46D] font-medium bg-transparent shadow-sm hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition"
            >
              Register
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <span>By continuing you agree to our </span>
            <a href="#" className="text-[#C5A46D] underline">
              Terms & Conditions
            </a>
          </div>
        </div>

        {/* Right: Illustration / Card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-b from-white/3 to-white/5 border border-white/10 backdrop-blur-md">
            <div className="mb-4">
              <div className="h-40 rounded-lg bg-gradient-to-br from-[#C5A46D]/30 to-[#C5A46D]/10 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white">Quick Preview</h3>
                  <p className="text-sm text-gray-300 mt-2">Your dashboard in one glance</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1 h-12 rounded-md bg-white/6 flex items-center justify-center text-sm">Widgets</div>
              <div className="col-span-2 h-12 rounded-md bg-white/6 flex items-center justify-center text-sm">Analytics</div>
              <div className="col-span-1 h-12 rounded-md bg-white/6 flex items-center justify-center text-sm">Users</div>
              <div className="col-span-2 h-12 rounded-md bg-white/6 flex items-center justify-center text-sm">Settings</div>
            </div>

            <div className="mt-6 text-xs text-gray-400">Preview is illustrative — actual dashboard requires login.</div>
          </div>
        </div>
      </div>

      {/* Footer small */}
      <footer className="absolute bottom-6 text-xs text-gray-500 w-full text-center">
        © {new Date().getFullYear()} My App — Crafted with a gold theme
      </footer>
    </div>
  );
}
