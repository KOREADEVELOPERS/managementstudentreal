// src/pages/Registeredpage.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Registeredpage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
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
        navigate("/login"); // always go to login page
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
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #1f4037, #99f2c8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        data-aos="fade-up"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
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
              className="form-control"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Create password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
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
