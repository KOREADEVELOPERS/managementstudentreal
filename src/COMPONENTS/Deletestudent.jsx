import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateStudent = () => {
  const [id, setId] = useState(""); // MongoDB ID (string)
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);
  const navigate = useNavigate();

  // 🔍 FETCH student by ID
  const fetchStudent = async () => {
    if (!id.trim()) {
      alert("⚠️ Please enter Student ID");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://student-backend-w1bp.onrender.com/employees/get/${id}`
      );

      if (response.data) {
        setStudent(response.data); // Autofill data
        setFound(true);
      } else {
        alert("❌ No student found with this ID");
        setFound(false);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Student not found!");
      setFound(false);
    } finally {
      setLoading(false);
    }
  };

  // ✏ Input Handler
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // 💾 UPDATE student
  const updateStudent = async () => {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
      alert("⚠️ Please login first!");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `https://student-backend-w1bp.onrender.com/employees/update/${id}?email=${userEmail}`,
        student
      );

      alert("✅ Student updated successfully!");
      navigate("/features");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
        padding: "20px",
      }}
    >
      <div
        className="card p-4 shadow-lg border-0"
        style={{ width: "450px", borderRadius: "20px" }}
      >
        <h3 className="text-center text-primary fw-bold mb-3">
          ✏ Update Student
        </h3>

        {/* ID Input */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Student ID</label>
          <input
            type="text" // ✅ change here
            className="form-control"
            placeholder="Enter Student ID (e.g., 68e081913932463667)"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100 mb-3 fw-bold"
          onClick={fetchStudent}
          disabled={loading}
        >
          {loading ? "Fetching..." : "🔍 Fetch Student"}
        </button>

        {/* Autofilled Update Form */}
        {found && (
          <>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={student.name}
                onChange={handleChange}
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
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={student.phone}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-success w-100 fw-bold"
              onClick={updateStudent}
              disabled={loading}
            >
              {loading ? "Updating..." : "💾 Update Student"}
            </button>
          </>
        )}

        <button
          className="btn btn-dark w-100 mt-3 fw-bold"
          onClick={() => navigate("/features")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UpdateStudent;
