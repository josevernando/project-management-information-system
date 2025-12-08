import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register({ name, department, position, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err.response ? err.response.data : err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-white">Register</h2>

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 p-2 rounded text-white">
          Register
        </button>

        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link className="text-blue-400" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
