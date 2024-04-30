import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/Dashboard.css";
import Myrides from "./Myrides";

const Driver = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State to store user data
    const token = localStorage.getItem("token");

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
                    setUser(userData);
                    if (userData.hasCreatedRide) {
                        // Redirect to a different page
                        navigate("/different-page");
                    }
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

    const handleClick = () => {
        navigate("/create-ride");
    };

    const viewProfile = () => {
        navigate("/profile");
    };

    return (
        <div className="container-fluid">
            <h2>Driver Portal</h2>
            <div className="row">
                <div className="col-md-18">
                    <div className="dashboard-content shadow-on-hover">
                        <div style={{ marginTop: "", fontSize: "1.5rem", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <p style={{ margin: 0, textAlign: 'center', flex: 1 }}>Hello🖐️, {user && user.username}!</p>
                            <FontAwesomeIcon className="text-info" onClick={viewProfile} icon={faUser} style={{ cursor: 'pointer', border: 'solid', borderRadius: '50%', padding: '0.7%' }} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="my-3">
                            <div className="card text-black mb-3">
                                <div className="card-body">
                                    <div>
                                        <FontAwesomeIcon
                                            className="text-info"
                                            icon={faPlusSquare}
                                            size="4x"
                                            style={{ marginLeft: "1vw", cursor: "pointer" }}
                                            onClick={handleClick}
                                        />
                                        <br />
                                        Create New Ride
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                Current Hosted Ride
                            </div>
                            <div>
                                <Myrides />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Driver;
