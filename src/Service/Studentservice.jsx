// src/Service/Studentservice.js
import axios from "axios";

// ✅ Backend deployed URL
const API_URL = "https://student-backend-w1bp.onrender.com/employees";

// ====================================================
// 🔹 Save Multiple Students
// ====================================================
const saveMultipleStudents = (students, email) => {
  return axios.post(`${API_URL}/saveall?email=${email}`, students);
};

// ====================================================
// 🔹 Save Single Student
// ====================================================
const saveSingleStudent = (student) => {
  return axios.post(`${API_URL}/save`, student);
};

// ====================================================
// 🔹 View Students (Only logged-in user's)
// ====================================================
const getMyStudents = (email) => {
  return axios.get(`${API_URL}/my?email=${email}`);
};

// ====================================================
// 🔹 GET Student by ID (For Update Page)
// ====================================================
const getStudentById = (id) => {
  return axios.get(`${API_URL}/get/${id}`);
  // Backend endpoint → @GetMapping("/get/{id}")
};

// ====================================================
// 🔹 UPDATE Student
// ====================================================
const updateStudent = (id, student) => {
  return axios.put(`${API_URL}/update/${id}`, student);
  // Backend endpoint → @PutMapping("/update/{id}")
};

// ====================================================
// 🔹 DELETE Student
// ====================================================
const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
  // Backend endpoint → @DeleteMapping("/delete/{id}")
};

// ====================================================
// 🔹 Register User
// ====================================================
const registerUser = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// ====================================================
// 🔹 Login User
// ====================================================
const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const StudentService = {
  saveMultipleStudents,
  saveSingleStudent,
  getMyStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  registerUser,
  loginUser,
};

export default StudentService;
