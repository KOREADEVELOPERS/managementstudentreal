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

  useEffect(() => { AOS.init({ duration: 1000 }); }, []);

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
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
    >
      <div 
        className="card shadow-lg p-5 rounded-4" 
        data-aos="zoom-in" 
        style={{ width: "380px", transition: "transform 0.3s, box-shadow 0.3s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.2)" }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 .5rem 1rem rgba(0,0,0,.15)" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Welcome Back</h2>
          <p className="text-muted">Login to your student account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ⭐ ADDED FORGOT PASSWORD HERE ⭐ */}
          <div className="text-end mb-3">
            <a 
              href="#" 
              className="text-primary fw-semibold text-decoration-none"
              onClick={() => alert("Forgot Password feature coming soon!")}
            >
              Forgot Password?
            </a>
          </div>

          {error && <div className="text-danger mb-3 text-center">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary w-100 btn-lg fw-bold" 
            style={{ background: "linear-gradient(90deg, #6a11cb, #2575fc)", border: "none" }}
          >
            Login
          </button>

          <div className="text-center mt-4">
            <small className="text-muted">
              Don't have an account?{" "}
              <a 
                onClick={() => navigate("/register")} 
                href="#" 
                className="fw-bold text-decoration-none text-primary"
              >
                Register
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Homepage_login;
