// src/pages/ViewStudents.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const email = localStorage.getItem("email"); // ✅ logged-in user email
    if (!email) {
      alert("⚠️ Please login first!");
      window.location.href = "/login"; // redirect to login page
      return;
    }

    try {
      const response = await fetch(
        `https://student-backend-w1bp.onrender.com/employees/my?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const response = await fetch(
        `https://student-backend-w1bp.onrender.com/employees/delete/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("✅ Student deleted successfully!");
        setStudents(students.filter((s) => s.id !== id)); // remove from state
      } else {
        alert("❌ Failed to delete student");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Server error while deleting student");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 text-primary">
        <h4>Loading students...</h4>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #8360c3, #2ebf91)",
        padding: "30px",
      }}
    >
      <div className="container">
        <h2
          className="text-center text-white mb-4 fw-bold"
          data-aos="fade-down"
        >
          📋 My Students
        </h2>

        {students.length === 0 ? (
          <div className="text-center text-white fw-bold">
            No students found. Please add some!
          </div>
        ) : (
          <div className="row">
            {students.map((student) => (
              <div
                className="col-md-4 mb-4"
                key={student.id}
                data-aos="zoom-in"
              >
                <div
                  className="card shadow-lg"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">
                      {student.name}
                    </h5>
                    <p className="card-text">
                      <strong>Email:</strong> {student.email}
                      <br />
                      <strong>Phone:</strong> {student.phone}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudents;
