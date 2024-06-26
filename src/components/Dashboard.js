import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListRides from "./ListRides";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rolee, setRole] = useState("");
  const [booked,setBooked] = useState(false);
  const [start,setStart] = useState("");
  const [end,setEnd] = useState("");
  const [otp,setOtp] = useState(0);
  const [id,setId] = useState("");
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
          localStorage.setItem("username", userData.username);
          setRole(userData.role);
          setUser(userData);
          setBooked(userData.booked);
          setId(userData.ride_id);
          setOtp(userData.otp);
          setStart(userData.start);
          setEnd(userData.end);
          console.log(userData);
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
      {rolee === 'admin' ? navigate('/admin') : rolee==='driver'?navigate('/driver'):booked?navigate(`/booked/${id}/${encodeURIComponent(start)}/${encodeURIComponent(end)}/${otp}`):
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-18">
              <div className="dashboard-content shadow-on-hover">
                <div style={{ marginTop: "", fontSize: "1.5rem", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ margin: 0, textAlign: 'center', flex: 1 }}>Hello🖐️, {user && user.username}!</p>
                  <FontAwesomeIcon className="text-info" onClick={viewProfile} icon={faUser} style={{ cursor: 'pointer' , border:'solid',borderRadius:'50%' ,padding:'0.7%' }} />
                </div>
              </div>
            </div>

            <h2
              style={{
                fontSize: "2rem",
                fontFamily: "cursive",
              }}
            >
              Available Rides
            </h2>
            <div className="container">
              <div className="row">
                <div className="my-3">
                  <div className="card text-black mb-3">
                    <div className="card-body">
                      <ListRides />
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

export default Dashboard;