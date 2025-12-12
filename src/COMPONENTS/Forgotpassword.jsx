import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import StudentService from "../Service/Studentservice";
  
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // ⭐ Updated handleSend function to show password in popup
  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await StudentService.sendPasswordReset({ email });
      alert("Your Password is: " + res.data); // 🔹 POPUP SHOW PASSWORD
    } catch (err) {
      alert("No user found with this email"); // 🔹 Error handling
    }
  
    setLoading(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ background: "linear-gradient(to right, #2575fc, #6a11cb)" }}
    >
      <div
        className="card shadow-lg p-5 rounded-4"
        data-aos="fade-up"
        style={{ width: "400px" }}
      >
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2889/2889676.png"
            alt="reset"
            width="70"
            className="mb-3"
          />
          <h3 className="fw-bold text-primary">Reset Password</h3>
          <p className="text-muted">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form onSubmit={handleSend}>
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

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 btn-lg fw-bold"
            style={{
              background: "linear-gradient(90deg, #2575fc, #6a11cb)",
              border: "none",
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <a
              href="#"
              onClick={() => navigate(-1)}
              className="text-primary fw-semibold text-decoration-none"
            >
              ← Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
