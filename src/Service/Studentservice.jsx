// src/Service/Studentservice.js
import axios from "axios";

// ✅ Backend deployed URL
const API_URL = "https://student-backend-w1bp.onrender.com/employees";

// ✅ Save Multiple Students
const saveMultipleStudents = (students, email) => {
  return axios.post(`${API_URL}/saveall?email=${email}`, students);
};

// ✅ Save Single Student
const saveSingleStudent = (student) => {
  return axios.post(`${API_URL}/save`, student);
};

// ✅ View My Students
const getMyStudents = (email) => {
  return axios.get(`${API_URL}/my?email=${email}`);
};

// ✅ Register User
const registerUser = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

// ✅ Login
const loginUser = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const StudentService = {
  saveMultipleStudents,
  saveSingleStudent,
  getMyStudents,
  registerUser,
  loginUser,
};

export default StudentService;
