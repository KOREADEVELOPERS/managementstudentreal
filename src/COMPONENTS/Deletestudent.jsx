import React, { useState } from "react";
import axios from "axios";

const Deletestudent = () => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!id.trim()) {
      alert("⚠️ Please enter a valid Student ID");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete student with ID ${id}?`
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:9897/employees/delete/${id}`
      );

      alert(response.data || `✅ Student with ID ${id} deleted successfully`);
      setId("");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("❌ Failed to delete student. Please check ID or try again.");
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
      }}
    >
      <div className="card p-4 shadow-lg border-0" style={{ width: "400px" }}>
        <h3 className="text-center text-danger mb-3 fw-bold">
          🗑 Delete Student
        </h3>

        <div className="mb-3">
          <label htmlFor="studentId" className="form-label fw-semibold">
            Student ID
          </label>
          <input
            type="number"
            id="studentId"
            className="form-control"
            placeholder="Enter Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className="btn btn-danger w-100 fw-bold"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Student"}
        </button>
      </div>
    </div>
  );
};

export default Deletestudent;
