import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import StudentService from "../Service/Studentservice";

const Homepage_login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await StudentService.loginUser({ email, password });
      if (res.status === 200) {
        localStorage.setItem("email", email);
        setError("");
        navigate("/features");
      } else setError("Invalid email or password");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        data-aos="zoom-in"
        className="relative z-10 bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md transition transform hover:-translate-y-1 hover:shadow-3xl"
      >
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Student Login"
            className="w-20 mx-auto mb-3 drop-shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-blue-700">Student Login</h2>
          <p className="text-gray-600 mt-1">Access your academic dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => alert("Forgot Password feature coming soon!")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="text-red-600 mb-3 text-center font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition"
          >
            Login
          </button>

          <div className="text-center mt-5">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-700 font-bold cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Homepage_login;
