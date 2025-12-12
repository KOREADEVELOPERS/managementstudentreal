// src/pages/UpdateStudent.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const { id } = useParams(); // MongoDB ID
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  // 🎯 Backend URL
  const BASE_URL = "https://studentbackenddemo-3p3i.onrender.com/students";

  // 📌 FETCH STUDENT DATA
  useEffect(() => {
    axios
      .get(`${BASE_URL}/get/${id}`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Error: Student not found!");
        navigate("/view");
      });
  }, [id]);

  // 🔄 Handle Input Change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // 🚀 UPDATE STUDENT
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${BASE_URL}/update/${id}`, student)
      .then(() => {
        alert("✅ Student Updated Successfully!");
        navigate("/view");
      })
      .catch((err) => {
        console.log(err);
        alert("❌ Update Failed!");
      });
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">✏ Update Student</h2>

      <form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        {/* Name */}
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          value={student.name}
          onChange={handleChange}
        />

        {/* Email */}
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          value={student.email}
          onChange={handleChange}
        />

        {/* Phone */}
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className="form-control mb-3"
          value={student.phone}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary w-100 fw-bold">
          ✔ Update Student
        </button>

        <button
          type="button"
          onClick={() => navigate("/view")}
          className="btn btn-dark w-100 mt-3"
        >
          ⬅ Back
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
