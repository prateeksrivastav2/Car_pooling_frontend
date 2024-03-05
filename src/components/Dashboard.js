import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ListRides from './ListRides';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'; // Import the faPlusSquare icon
import "../styles/Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate(); // Use useNavigate hook to get the navigate function
    const handelclick=()=>{
        navigate('/create-ride')
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login"); // Use navigate function to redirect
        }
    }, [navigate]); // Pass navigate function as dependency
    const handelMyrides=()=>{
        navigate( '/my-rides'); 
    }
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
                    <div className="icon-container">
                        <FontAwesomeIcon className='text-info' icon={faPlusSquare} size='4x' style={{marginLeft:'1vw'}} onClick={handelclick}/> {/* Use FontAwesomeIcon with faPlusSquare icon */}
                    </div>
                    <div className="iner">
                        <button className='btn btn-primary' onClick={handelMyrides}>My Rides</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
