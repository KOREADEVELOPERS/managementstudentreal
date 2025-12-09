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
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="card shadow-lg p-4" data-aos="zoom-in">
        <div className="text-center mb-3">
          <h3 className="mt-2 text-dark">Student Login</h3>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-1">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* ⭐ Forgot Password Link Added */}
          <div className="text-end mb-3">
            <span
              style={{ cursor: "pointer", color: "#0d6efd", fontWeight: "500" }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          {error && (
            <div className="text-danger mb-3 text-center">{error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
          >
            Login
          </button>

          <div className="text-center mt-3">
            <small>
              Don't have an account?
              <a
                href="#"
                onClick={() => navigate("/register")}
                style={{ marginLeft: "5px" }}
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
