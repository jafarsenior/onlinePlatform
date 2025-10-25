import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1E1E1E] text-white px-6">
      <h2 className="text-3xl font-bold mb-6 text-[#C5A46D]">Login Page</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 rounded-md bg-[#C5A46D] text-[#1E1E1E] font-medium shadow-md transform transition hover:scale-[1.02]"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 rounded-md border border-[#C5A46D] text-[#C5A46D] font-medium bg-transparent shadow-sm hover:bg-[#C5A46D] hover:text-[#1E1E1E] transition"
        >
          Register
        </button>
      </div>
      <p className="mt-6 text-gray-400 text-sm">
        Don't have an account? Click Register to create one.
      </p>
    </div>
  );
}