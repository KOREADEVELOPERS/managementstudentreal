// src/pages/Registeredpage.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

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
        background: "linear-gradient(135deg, #1f4037, #99f2c8)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5"
        data-aos="fade-up"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <h2 className="text-center mb-4 text-success fw-bold">
          User Registration
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              style={{ border: "1px solid #ced4da" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill shadow-sm"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              style={{ border: "1px solid #ced4da" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill shadow-sm"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Create password"
              style={{ border: "1px solid #ced4da" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold rounded-pill shadow"
            style={{
              padding: "10px 0",
              fontSize: "1.1rem",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = 0.85)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
          >
            Register
          </button>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <a href="/login" className="text-primary fw-semibold">
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
