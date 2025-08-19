// src/Service/Studentservice.js
import axios from "axios";

const API_URL = "http://localhost:9897/employees";

const saveMultipleStudents = (students, email) => {
  return axios.post(`${API_URL}/fit?email=${email}`, students);
};

const Studentservice = {
  saveMultipleStudents,
};

export default Studentservice;