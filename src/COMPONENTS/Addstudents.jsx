// src/pages/AddStudents.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import StudentService from "../Service/Studentservice";

const AddStudents = () => {
  const [students, setStudents] = useState([{ name: "", email: "", phone: "" }]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // 🔄 Handle input change
  const handleChange = (index, e) => {
    const updated = [...students];
    updated[index][e.target.name] = e.target.value;
    setStudents(updated);
  };

  // ➕ Add Student
  const addStudentForm = () => {
    setStudents([...students, { name: "", email: "", phone: "" }]);
  };

  // ❌ Remove Student
  const removeStudentForm = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  // ✅ Validation
  const validateForm = () => {
    const errs = [];
    students.forEach((student, i) => {
      const current = {};
      if (!student.name.trim()) current.name = "Name is required";
      if (!student.email.includes("@")) current.email = "Invalid email";
      if (!/^[0-9]{10}$/.test(student.phone)) current.phone = "Phone must be 10 digits";
      errs[i] = current;
    });
    setErrors(errs);
    return errs.every((err) => Object.keys(err).length === 0);
  };

  // 🚀 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const email = localStorage.getItem("email");
    if (!email) {
      alert("⚠ You are not logged in!");
      navigate("/login");
      return;
    }

    StudentService.saveMultipleStudents(students, email)
      .then(() => {
        alert("✅ Students added successfully!");
        setStudents([{ name: "", email: "", phone: "" }]);
        setErrors([]);
        navigate("/features");
      })
      .catch(() => alert("❌ Failed to save students."));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #8360c3, #2ebf91)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        data-aos="zoom-in"
        style={{
          width: "100%",
          maxWidth: "950px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          ✨ Add Multiple Students
        </h2>

        <form onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <div
              key={index}
              className="border rounded p-3 mb-4 bg-light shadow-sm position-relative"
              data-aos="fade-up"
            >
              <h5 className="mb-3 text-secondary fw-semibold">
                Student {index + 1}
              </h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors[index]?.name ? "is-invalid" : ""}`}
                    name="name"
                    placeholder="Enter full name"
                    value={student.name}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <div className="invalid-feedback">{errors[index]?.name}</div>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors[index]?.email ? "is-invalid" : ""}`}
                    name="email"
                    placeholder="Enter email"
                    value={student.email}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <div className="invalid-feedback">{errors[index]?.email}</div>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className={`form-control ${errors[index]?.phone ? "is-invalid" : ""}`}
                    name="phone"
                    placeholder="10-digit phone"
                    value={student.phone}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <div className="invalid-feedback">{errors[index]?.phone}</div>
                </div>

                {students.length > 1 && (
                  <div className="col-md-1 d-flex align-items-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeStudentForm(index)}
                    >
                      ❌
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-primary fw-bold"
              onClick={addStudentForm}
            >
              ➕ Add Another Student
            </button>

            <button type="submit" className="btn btn-success fw-bold">
              ✅ Submit All
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/features")}
            className="btn btn-dark btn-sm fw-semibold"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudents;
