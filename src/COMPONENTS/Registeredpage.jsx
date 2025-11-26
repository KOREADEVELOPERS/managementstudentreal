// src/pages/Registeredpage.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Registeredpage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://student-backend-w1bp.onrender.com/employees/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        alert("✅ User registered successfully! Please login.");
        setUser({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        const msg = await response.text();
        alert("❌ Registration failed: " + msg);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("❌ Server error. Try again later.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(-45deg, #1f4037, #99f2c8, #6a11cb, #2575fc)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        padding: "20px",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <div
        className="card p-5 shadow-lg"
        data-aos="fade-up"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          color: "#fff",
        }}
      >
        <h2 className="text-center mb-5 fw-bold" style={{ color: "#fff" }}>
          User Registration
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control rounded-pill ps-5"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff" }}
            />
            <label htmlFor="name">Full Name</label>
            <FaUser style={{ position: "absolute", top: "15px", left: "15px", color: "#fff" }} />
          </div>

          {/* Email */}
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control rounded-pill ps-5"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Email"
              style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff" }}
            />
            <label htmlFor="email">Email</label>
            <FaEnvelope style={{ position: "absolute", top: "15px", left: "15px", color: "#fff" }} />
          </div>

          {/* Password */}
          <div className="form-floating mb-5">
            <input
              type="password"
              className="form-control rounded-pill ps-5"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Password"
              style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff" }}
            />
            <label htmlFor="password">Password</label>
            <FaLock style={{ position: "absolute", top: "15px", left: "15px", color: "#fff" }} />
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-pill fw-bold"
            style={{
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              border: "none",
              padding: "12px 0",
              fontSize: "1.1rem",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = 0.85)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
          >
            Register
          </button>

          <div className="text-center mt-4">
            <small>
              Already have an account?{" "}
              <a href="/login" className="text-warning fw-semibold">
                Login here
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registeredpage;
