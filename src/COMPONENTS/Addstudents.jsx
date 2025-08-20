// src/pages/AddStudent.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { name: "", email: "", phone: "", password: "" },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // 🔹 update single field of one student
  const handleChange = (index, e) => {
    const newStudents = [...students];
    newStudents[index][e.target.name] = e.target.value;
    setStudents(newStudents);
  };

  // 🔹 add new blank student row
  const handleAddRow = () => {
    setStudents([...students, { name: "", email: "", phone: "", password: "" }]);
  };

  // 🔹 remove a student row
  const handleRemoveRow = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  // 🔹 submit all students
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
          body: JSON.stringify(students), // ✅ send full array
        }
      );

      if (response.ok) {
        alert("✅ Students added successfully!");
        setStudents([{ name: "", email: "", phone: "", password: "" }]);
        setError("");
      } else {
        const msg = await response.text();
        setError(msg || "Failed to save students.");
      }
    } catch (err) {
      console.error("Add students error:", err);
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
          maxWidth: "600px",
          width: "100%",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      >
        <h2 className="text-center mb-4 text-light fw-bold">
          ➕ Add Multiple Students
        </h2>

        <form onSubmit={handleSubmit}>
          {students.map((student, index) => (
            <div
              key={index}
              className="border rounded p-3 mb-3"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <h5 className="text-light">Student {index + 1}</h5>

              <div className="mb-2">
                <label className="form-label text-light">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={student.name}
                  onChange={(e) => handleChange(index, e)}
                  required
                  placeholder="Enter full name"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="form-label text-light">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={student.email}
                  onChange={(e) => handleChange(index, e)}
                  required
                  placeholder="Enter email"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="form-label text-light">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={student.phone}
                  onChange={(e) => handleChange(index, e)}
                  required
                  placeholder="Enter phone"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              <div className="mb-2">
                <label className="form-label text-light">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={student.password}
                  onChange={(e) => handleChange(index, e)}
                  required
                  placeholder="Create password"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>

              {students.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => handleRemoveRow(index)}
                >
                  ❌ Remove
                </button>
              )}
            </div>
          ))}

          {error && (
            <div className="text-danger mb-3 text-center fw-bold">{error}</div>
          )}

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
