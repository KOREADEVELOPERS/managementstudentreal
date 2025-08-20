// src/pages/AddStudent.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    { name: "", email: "", phone: "", password: "" },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // ✅ Handle change for multiple students
  const handleChange = (index, e) => {
    const newStudents = [...students];
    newStudents[index][e.target.name] = e.target.value;
    setStudents(newStudents);
  };

  // ✅ Add new student form row
  const handleAddRow = () => {
    setStudents([
      ...students,
      { name: "", email: "", phone: "", password: "" },
    ]);
  };

  // ✅ Remove student row
  const handleRemoveRow = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  // ✅ Submit all students
  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdByEmail = localStorage.getItem("email");

    if (!createdByEmail) {
      alert("⚠️ You must be logged in to register a student.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://student-backend-w1bp.onrender.com/employees/saveall?email=${createdByEmail}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(students), // ✅ send array
        }
      );

      if (response.ok) {
        alert("✅ Students registered successfully!");
        setStudents([{ name: "", email: "", phone: "", password: "" }]);
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
        backgroundImage: "linear-gradient(to right, #8360c3, #2ebf91)",
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
          maxWidth: "600px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <h2 className="text-center mb-4 text-success fw-bold">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <div
              key={index}
              className="border rounded p-3 mb-3"
              style={{ background: "#f9f9f9" }}
            >
              <h5 className="fw-bold">Student {index + 1}</h5>

              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={student.name}
                  onChange={(e) => handleChange(index, e)}
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
                  onChange={(e) => handleChange(index, e)}
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
                  onChange={(e) => handleChange(index, e)}
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
                  onChange={(e) => handleChange(index, e)}
                  required
                  placeholder="Create password"
                />
              </div>

              {students.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveRow(index)}
                >
                  ❌ Remove Student
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary w-100 mb-3"
            onClick={handleAddRow}
          >
            ➕ Add Another Student
          </button>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Save All Students
          </button>

          <div className="text-center mt-3">
            <small>
              Back to{" "}
              <a href="/features" className="text-primary fw-semibold">
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
