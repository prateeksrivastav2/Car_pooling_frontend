import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login"); // Use navigate function to redirect
        }
    }, [navigate]); // Pass navigate function as dependency

    return (
        <div style={{marginTop:'20vh'}}>Dashboard</div>
    );
};

export default Dashboard;
