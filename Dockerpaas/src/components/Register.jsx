import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("🎉 Registration Successful!");
      navigate("/");
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-blue-300 dark:from-[#1f1f1f] dark:via-[#1a1a1a] dark:to-[#2a2a2a] transition-colors duration-300">
      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md border border-white/20">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-400"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-white/10 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 text-gray-800 dark:text-white placeholder-gray-400"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-200 shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
