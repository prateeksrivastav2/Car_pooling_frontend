import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ListRides from './ListRides';
import "../styles/Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login"); // Use navigate function to redirect
        }
    }, [navigate]); // Pass navigate function as dependency

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <div className="dashboard-content">
                        <div style={{ marginTop: '20vh' }}>Dashboard</div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="ride-list-box">
                        <ListRides />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
