import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles

const Div = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">🎓 Student Portal</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={()=> navigate("/Register")} href="#">Register</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-white text-center" style={{ background: 'linear-gradient(to right, #4facfe, #00f2fe)', padding: '100px 0' }}>
        <div className="container" data-aos="fade-up">
          <h1 className="display-4 fw-bold">Welcome to the Student Management System</h1>
          <p className="lead mt-3">Manage, track, and enhance student data efficiently.</p>
          <button onClick={() => navigate('/login')} className="btn btn-light mt-4 fw-bold px-4">Get Started</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4" data-aos="zoom-in">Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4" data-aos="flip-left">
            <div className="card h-100 shadow border-0">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Add Student" className="card-img-top p-4" style={{ height: '180px', objectFit: 'contain' }} />
              <div className="card-body">
                <h5 className="card-title">Add Students</h5>
                <p className="card-text">Easily register new students with essential information.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="flip-up">
            <div className="card h-100 shadow border-0">
              <img src="https://cdn-icons-png.flaticon.com/512/2920/2920219.png" alt="View Records" className="card-img-top p-4" style={{ height: '180px', objectFit: 'contain' }} />
              <div className="card-body">
                <h5 className="card-title">View Records</h5>
                <p className="card-text">Access and review all student information in one place.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4" data-aos="flip-right">
            <div className="card h-100 shadow border-0">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Update/Delete" className="card-img-top p-4" style={{ height: '180px', objectFit: 'contain' }} />
              <div className="card-body">
                <h5 className="card-title">Update/Delete</h5>
                <p className="card-text">Edit or remove outdated student records with ease.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 text-center">
        <div className="container">
          <p className="mb-0">© 2025 Student Management System | Designed with ❤️ by Sulabh</p>
        </div>
      </footer>
    </div>
  );
};

export default Div;