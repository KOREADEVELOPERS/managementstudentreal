import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import StudentService from "../Service/StudentService"; // ✅ Correct path

const Addstudents = () => {
  const [students, setStudents] = useState([{ name: "", email: "", phone: "" }]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // 🔄 Input Change Handler
  const handleChange = (index, e) => {
    const updatedStudents = [...students];
    updatedStudents[index][e.target.name] = e.target.value;
    setStudents(updatedStudents);
  };

  // ➕ Add New Student Form
  const addStudentForm = () => {
    setStudents([...students, { name: "", email: "", phone: "" }]);
  };

  // ❌ Remove Student Form
  const removeStudentForm = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  // ✅ Validation
  const validateForm = () => {
    const errs = [];
    students.forEach((student, i) => {
      const current = {};
      if (!student.name.trim()) current.name = "Name is required";
      if (!student.email.includes("@")) current.email = "Invalid email";
      if (!/^\d{10}$/.test(student.phone)) current.phone = "Phone must be 10 digits";
      errs[i] = current;
    });
    setErrors(errs);
    return errs.every((err) => Object.keys(err).length === 0);
  };

  // ✅ Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const email = localStorage.getItem("email");
    if (!email) {
      alert("You are not logged in!");
      navigate("/login");
      return;
    }

    StudentService.saveMultipleStudents(students, email)
      .then(() => {
        alert("✅ Students saved successfully!");
        setStudents([{ name: "", email: "", phone: "" }]);
        setErrors([]);
        navigate("/features");
      })
      .catch((err) => {
        console.error("Save failed:", err);
        alert("❌ Failed to save students.");
      });
  };

  return (
    <div className="container my-5">
      <div
        className="bg-light p-4 rounded shadow"
        data-aos="fade-up"
        style={{ maxWidth: "900px", margin: "auto" }}
      >
        <h2 className="mb-4 text-center text-primary fw-bold">Add Multiple Students</h2>

        <form onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <div
              key={index}
              className="border rounded p-3 mb-4 bg-white shadow-sm position-relative"
            >
              <h5 className="mb-3">Student {index + 1}</h5>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors[index]?.name ? "is-invalid" : ""}`}
                    name="name"
                    placeholder="Enter name"
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
              className="btn btn-outline-primary"
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
            className="btn btn-secondary btn-sm"
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addstudents;
