import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockLogin } from "../api/mockAuth";

export default function Login() {
  const navigate = useNavigate();
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

  return (
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
        {loading ? "Yuklanmoqda..." : "Login"}
      </button>

      <p className="mt-6 text-gray-400 text-sm text-center">
        Hisobingiz yo‘qmi?{" "}
        <button
          type="button"
          onClick={() => navigate("/auth/register")}
          className="text-[#C5A46D] hover:underline"
        >
          Ro‘yxatdan o‘tish
        </button>
      </p>
    </form>
  );
}
