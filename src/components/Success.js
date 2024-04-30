import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import axios from "axios";

const Success = () => {
  const { id, start, end } = useParams(); // Extracting start and end from useParams
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rolee, setRole] = useState("");
  const token = localStorage.getItem("token");
  console.log(token);
  const role = localStorage.getItem("role");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const handleClick = () => {
    const update = async()=>{
      try {
        const response = await fetch(`http://localhost:3000/rides/update/${id}/${encodeURIComponent(start)}/${encodeURIComponent(end)}/${randomNumber}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const response2 = await fetch(`http://localhost:3000/rides/addapplicant/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        console.log(id);
      } catch (error) {
        console.error("Error updating user data", error);
      }
    }
    update();
    navigate(`/booked/${id}/${encodeURIComponent(start)}/${encodeURIComponent(end)}/${randomNumber}`);
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
                  <div className=" mb-3">
                    <div className="card-body">
                      <h2
                        style={{
                          fontSize: "2rem",
                          fontFamily: "cursive",
                        }}
                      >
                        Your Ride Is Booked Successfully!!
                      </h2>
                      <p>Start: {decodeURIComponent(start)}</p> {/* Displaying start */}
                      <p>End: {decodeURIComponent(end)}</p> {/* Displaying end */}
                    </div>
                  </div>
                  <div className="btn btn-primary" onClick={handleClick}>
                          OK
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
