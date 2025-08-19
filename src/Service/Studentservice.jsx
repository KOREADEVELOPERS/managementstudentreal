// src/Service/Studentservice.js
import axios from "axios";

// ✅ Backend deployed URL
const API_URL = "https://student-backend-w1bp.onrender.com/employees";

// ✅ Save Multiple Students
const saveMultipleStudents = (students, email) => {
  return axios.post(`${API_URL}/fit?email=${email}`, students);
};

const Studentservice = {
  saveMultipleStudents,
};

export default Studentservice;
