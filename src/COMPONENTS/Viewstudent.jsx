import React, { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Viewstudent = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("⚠️ You must login first!");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `https://student-backend-w1bp.onrender.com/employees/my?email=${email}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("❌ Failed to fetch students. Please try again later.");
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #8360c3, #2ebf91)",
      }}
    >
      <div className="text-center mb-4" data-aos="fade-down">
        <h1 className="fw-bold text-white">📋 My Registered Students</h1>
      </div>

      <div className="card shadow-lg" data-aos="fade-up">
        <div className="card-body p-4" style={{ borderRadius: "10px" }}>
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4">No students found.</td>
                  </tr>
                ) : (
                  students
                    .filter(
                      (student) =>
                        student.name?.trim() ||
                        student.email?.trim() ||
                        student.phone?.trim()
                    )
                    .map((student, index) => (
                      <tr key={student.id || index}>
                        <td>{index + 1}</td>
                        <td>{student.name || "-"}</td>
                        <td>{student.email || "-"}</td>
                        <td>{student.phone || "-"}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-dark"
              onClick={() => navigate("/features")}
            >
              ⬅ Back to Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewstudent;
