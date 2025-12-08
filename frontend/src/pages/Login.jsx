import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a]">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">PMIS Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full p-3 rounded-lg bg-[#0f172a] text-white outline-none focus:ring"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg bg-[#0f172a] text-white outline-none focus:ring"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
