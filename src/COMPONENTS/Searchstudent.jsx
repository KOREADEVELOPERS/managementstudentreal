// src/components/Searchstudent.js
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Searchstudent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const email = localStorage.getItem("email"); // ✅ Logged-in user's email

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchStudents(); // 👈 Fetch only user's data
  }, []);

  const fetchStudents = async () => {
    if (!email) {
      alert("You are not logged in.");
      return;
    }

    try {
      // ✅ Localhost → Replace with deployed backend URL
      const response = await axios.get(
        `https://student-backend-w1bp.onrender.com/employees/find?email=${email}`
      );
      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Something went wrong while fetching student data.");
    }
  };

  // 🔍 Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone?.includes(searchTerm)
  );

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "30px",
      }}
    >
      <div
        className="glass-card w-100"
        style={{
          maxWidth: "900px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          color: "#fff",
        }}
        data-aos="zoom-in"
      >
        <h2 className="text-center mb-4 fw-bold" style={{ fontSize: "32px" }}>
          🔍 Search Student
        </h2>

        {/* 🔎 Search Input */}
        <div className="input-group mb-4 shadow-sm">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "12px 0 0 12px",
              border: "none",
              padding: "18px",
              fontSize: "16px",
            }}
          />
          <button
            className="btn btn-light fw-bold"
            style={{
              borderRadius: "0 12px 12px 0",
              padding: "12px 24px",
              fontSize: "16px",
              color: "#4f46e5",
            }}
            onClick={fetchStudents}
          >
            Search
          </button>
        </div>

        {/* 📋 Student Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center bg-white text-dark">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4">No students found.</td>
                </tr>
              ) : (
                filteredStudents.map((student, index) => (
                  <tr key={student.id || index}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Searchstudent;
