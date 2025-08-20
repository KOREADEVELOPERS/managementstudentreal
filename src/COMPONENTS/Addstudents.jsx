// src/pages/AddStudent.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdByEmail = localStorage.getItem("email"); // ✅ logged-in user email

    if (!createdByEmail) {
      alert("⚠️ You must be logged in to add students.");
      navigate("/login"); // redirect to login
      return;
    }

    try {
      const response = await fetch(
        `https://student-backend-w1bp.onrender.com/employees/saveall?email=${createdByEmail}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([student]), // backend expects an array
        }
      );

      if (response.ok) {
        alert("✅ Student registered successfully!");
        setStudent({ name: "", email: "", phone: "", password: "" });
        navigate("/view"); // redirect to view students
      } else {
        const msg = await response.text();
        alert("❌ Failed to register student: " + msg);
      }
    } catch (error) {
      console.error("Server error:", error);
      alert("❌ Server error. Try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #283c86, #45a247)",
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
        <h2 className="text-center mb-4 text-primary fw-bold">
          Register New Student
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
              placeholder="Enter student's name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
              placeholder="Enter student's email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={student.password}
              onChange={handleChange}
              required
              placeholder="Create student password"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Register Student
          </button>

          <div className="text-center mt-3">
            <small>
              Want to check students?{" "}
              <a href="/view" className="text-primary fw-semibold">
                View Students
              </a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
