// src/pages/AddStudent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdByEmail = localStorage.getItem("email");
    if (!createdByEmail) {
      alert("⚠️ Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://student-backend-w1bp.onrender.com/employees/saveall?email=${createdByEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([student]), // ✅ backend expects array
        }
      );

      if (response.ok) {
        alert("✅ Student added successfully!");
        setStudent({ name: "", email: "", phone: "", password: "" });
        setError("");
      } else {
        const msg = await response.text();
        setError(msg || "Failed to save student.");
      }
    } catch (err) {
      console.error("Add student error:", err);
      setError("❌ Server error, please try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1950&q=80')",
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
          maxWidth: "500px",
          width: "100%",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4 text-light fw-bold">
          ➕ Add New Student
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-light">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
              placeholder="Enter student's name"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
              placeholder="Enter student's email"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
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
              name="password"
              value={student.password}
              onChange={handleChange}
              required
              placeholder="Create password"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "none",
              }}
            />
          </div>

          {error && (
            <div className="text-danger mb-3 text-center fw-bold">{error}</div>
          )}

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Save Student
          </button>

          <div className="text-center mt-3">
            <small className="text-light">
              🔙 Back to{" "}
              <a
                onClick={() => navigate("/features")}
                href="#"
                className="text-info"
              >
                Dashboard
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
