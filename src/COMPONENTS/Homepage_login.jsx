import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import StudentService from "../Service/StudentService";
import "./LoginPage.css"; // OPTIONAL CUSTOM CSS FILE

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
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="card login-card shadow-lg p-4" data-aos="zoom-in">

        <h3 className="text-center mb-4 text-primary fw-bold">Student Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-end mb-3">
            <span
              className="forgot-text"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          {error && <div className="text-danger mb-3 text-center">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold rounded-pill"
          >
            Login
          </button>

          <div className="text-center mt-3">
            <small>
              Don't have an account?
              <span
                className="register-link"
                onClick={() => navigate("/register")}
              >
                {" "}
                Register
              </span>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Homepage_login;
