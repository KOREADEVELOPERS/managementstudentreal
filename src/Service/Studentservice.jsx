import axios from "axios";

// ✅ Backend deployed URL
const API_URL = "https://student-backend-w1bp.onrender.com/students";

// ====================================================
// 🔹 Save Multiple Students
// ====================================================
const saveMultipleStudents = (students, email) => {
  return axios.post(`${API_URL}/add-multiple/${email}`, students);
};

// ====================================================
// 🔹 Save Single Student
// ====================================================
const saveSingleStudent = (student, email) => {
  return axios.post(`${API_URL}/add/${email}`, student);
};

// ====================================================
// 🔹 View Students (Only logged-in user's)
// ====================================================
const getMyStudents = (email) => {
  return axios.get(`${API_URL}/all/${email}`);
};

// ====================================================
// 🔹 GET Student by ID (For Update Page)
// ====================================================
const getStudentById = (id) => {
  return axios.get(`${API_URL}/get/${id}`);
};

// ====================================================
// 🔹 UPDATE Student
// ====================================================
const updateStudent = (id, student) => {
  return axios.put(`${API_URL}/update/${id}`, student);
};

// ====================================================
// 🔹 DELETE Student
// ====================================================
const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
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
