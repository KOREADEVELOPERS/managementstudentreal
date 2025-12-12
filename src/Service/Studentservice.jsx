import axios from "axios";

// ✅ Backend deployed URL
const API_URL = "https://student-backend-w1bp.onrender.com/employees";

// ===========================================
// ⭐ All API Functions
// ===========================================

// Save Multiple Students
const saveMultipleStudents = (students, email) => {
  return axios.post(`${API_URL}/saveall?email=${email}`, students);
};

// Save Single Student
const saveSingleStudent = (student) => {
  return axios.post(`${API_URL}/save`, student);
};

// View My Students
const getMyStudents = (email) => {
  return axios.get(`${API_URL}/my?email=${email}`);
};

// Register User
const registerUser = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// Login
const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

// Forgot Password (Return Password in popup)
const sendPasswordReset = (data) => {
  return axios.post(`${API_URL}/forgot?email=${data.email}`);
};

// ===========================================
// ⭐ Correct Export — Only ONCE
// ===========================================
const StudentService = {
  saveMultipleStudents,
  saveSingleStudent,
  getMyStudents,
  sendPasswordReset,
  registerUser,
  loginUser,
};

export default StudentService;
