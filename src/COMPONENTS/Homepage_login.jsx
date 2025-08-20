// src/pages/Homepage_login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Homepage_login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://student-backend-w1bp.onrender.com/employees/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const loggedEmail = await response.text(); // backend returns email
        localStorage.setItem("email", loggedEmail); // ✅ save email
        seterror("");
        navigate("/features");
      } else {
        seterror("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      seterror("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        data-aos="zoom-in"
        style={{
          maxWidth: "400px",
          width: "100%",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      >
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Login"
            style={{ width: "70px" }}
          />
          <h3 className="mt-2 text-light">Student Login</h3>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-light">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
            />
          </div>

          {error && (
            <div className="text-danger mb-3 text-center">{error}</div>
          )}

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>

          <div className="text-center mt-3">
            <small className="text-light">
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/Register")}
                href="#"
                className="text-info"
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
