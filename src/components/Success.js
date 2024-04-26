import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Success = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rolee, setRole] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleClick = () => {
    navigate("/create-ride");
  };

  const viewProfile = () => {
    navigate("/profile");
  };

  const handelMyrides = () => {
    navigate("/my-rides", { state: { user: user } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem("sender", userData.email);
          setRole(userData.role);
          setUser(userData);
        } else {
          console.error("Error fetching user data");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  return (
    <>
      {rolee === 'admin' ? navigate('/admin') : rolee === 'driver' ? navigate('/driver') :
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="my-3">
                  <div className="card text-black mb-3">
                    <div className="card-body">
                      <h2
                        style={{
                          fontSize: "2rem",
                          fontFamily: "cursive",
                        }}
                      >
                        Your Ride Is Booked Successfully!!
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Success;