import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockRegister } from "../api/mockAuth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.phone || !form.password) {
      setError("Barcha maydonlarni to‘ldiring");
      return;
    }

    setLoading(true);
    const res = await mockRegister(form);
    setLoading(false);

    if (res.success) {
  alert(res.message);
  navigate("/auth/login"); // ✅ to'g'ri path
} else {
  setError(res.message);
}

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E1E1E] text-white px-6">
      <div className="bg-[#2A2A2A] p-8 rounded-2xl w-full max-w-md shadow-lg border border-[#C5A46D]/30">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#C5A46D]">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Username</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#1E1E1E] border border-[#C5A46D]/30 text-white focus:outline-none focus:border-[#C5A46D]"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#1E1E1E] border border-[#C5A46D]/30 text-white focus:outline-none focus:border-[#C5A46D]"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Phone</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#1E1E1E] border border-[#C5A46D]/30 text-white focus:outline-none focus:border-[#C5A46D]"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#1E1E1E] border border-[#C5A46D]/30 text-white focus:outline-none focus:border-[#C5A46D]"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-2 bg-[#C5A46D] text-[#1E1E1E] font-semibold rounded-md hover:scale-[1.02] transition"
          >
            {loading ? "Yuklanmoqda..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-sm text-center">
          Hisobingiz bormi?{" "}
          <button
            onClick={() => navigate("/auth/login")}
            className="text-[#C5A46D] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
