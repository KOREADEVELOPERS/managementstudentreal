// src/pages/AddStudent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdByEmail = localStorage.getItem("email");

    if (!createdByEmail) {
      alert("⚠️ Please login first!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://student-backend-w1bp.onrender.com/employees/saveall?email=${createdByEmail}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([student]), // backend expects list
        }
      );

      if (response.ok) {
        alert("✅ Student added successfully!");
        setStudent({ name: "", email: "", phone: "", password: "" });
        navigate("/view");
      } else {
        const msg = await response.text();
        alert("❌ Failed to save student: " + msg);
      }
    } catch (error) {
      console.error("Add student error:", error);
      alert("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Add Student</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={student.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={student.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Save Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
