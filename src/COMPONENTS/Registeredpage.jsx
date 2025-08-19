import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Registeredpage = () => {
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

    const createdByEmail = localStorage.getItem("email"); // get logged-in user email

    if (!createdByEmail) {
      alert("You must be logged in to register a student.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9897/employees/fit?email=${createdByEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([student]), // must be array
        }
      );

      if (response.ok) {
        alert("✅ Student registered successfully!");
        setStudent({ name: "", email: "", phone: "", password: "" });
        navigate("/login"); // go to dashboard or view page
      } else {
        const message = await response.text();
        alert("❌ Failed to register: " + message);
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
          Student Registration
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
              placeholder="Enter full name"
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
