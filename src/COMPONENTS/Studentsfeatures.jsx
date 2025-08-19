import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Studentsfeatures = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const features = [
    {
      title: "Add Student",
      description: "Add new student records to the database.",
      img: "https://cdn-icons-png.flaticon.com/512/1057/1057231.png",
      path:"/addstudents",
    },
    {
      title: "View Students",
      description: "Browse and manage student data easily.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
      path:"/sulabh",
    },
    {
      title: "Search Records",
      description: "Quickly find student info with smart search.",
      img: "https://cdn-icons-png.flaticon.com/512/622/622669.png",
      path:"/search",
    },
    {
      title: "Update/Delete",
      description: "Edit or remove student details easily.",
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
      path:"/delete",
    },
  ];

  return (
    <div
      className="dashboard-page position-relative"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        overflow: "hidden",
        padding: "40px 20px",

      }}
    >
      {/* Floating Blob Background */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
          cursor:"pointer",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "50%",
          animation: "float 7s ease-in-out infinite reverse",
           cursor:"pointer",
        }}
      ></div>

      {/* Main Content */}
      <div className="container position-relative">
        <h1
          className="text-center mb-5 text-dark fw-bold"
          data-aos="fade-down"
        >
          Features of Student Management System
        </h1>
        <div className="row g-4 justify-content-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className="card h-100 text-center shadow-lg"
               onClick={() => {
                                 if (feature.path) {
                                   navigate(feature.path);
                                 } else {
                                   alert(`${feature.title} feature is coming soon!`);
                                 }
                               }}
                style={{
                  borderRadius: "20px",
                  padding: "20px",
                  backgroundColor: "white",
                  transition: "transform 0.3s",
                }}
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="mb-3"
                  style={{ width: "60px", height: "60px" }}
                />
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-5" data-aos="fade-up">
          <button
            className="btn btn-dark fw-bold px-4 py-2"
            onClick={() => navigate("/home")}
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Studentsfeatures;