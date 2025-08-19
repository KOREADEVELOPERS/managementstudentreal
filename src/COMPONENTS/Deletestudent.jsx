import React, { useState } from "react";
import axios from "axios";


const Deletestudent = () => {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    if (!id.trim()) {
      alert("Please enter a student ID");
      return;
    }

    const confirm = window.confirm(`Are you sure you want to delete student with ID ${id}?`);
    if (!confirm) return;

    try {
      const response = await axios.delete(`http://localhost:9897/employees/delete/${id}`);
      alert(response.data); // Response from backend
      setId("");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("❌ Failed to delete student. Please check ID.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
      }}
    >
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center text-primary mb-3 fw-bold">Delete Student by ID</h3>

        <div className="mb-3">
          <label htmlFor="studentId" className="form-label fw-semibold">Student ID</label>
          <input
            type="number"
            id="studentId"
            className="form-control"
            placeholder="Enter Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button className="btn btn-danger w-100 fw-bold" onClick={handleDelete}>
          🗑 Delete Student
        </button>
      </div>
    </div>
  );
};

export default Deletestudent;