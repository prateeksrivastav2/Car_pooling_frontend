import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ListRides from './ListRides';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import "../styles/Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State to store user data
    const token = localStorage.getItem('token');

    const handleClick = () => {
        navigate('/create-ride');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/getuser', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    // Handle error response
                    console.error('Error fetching user data');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        if (!token) {
            navigate("/login");
        } else {
            fetchData();
        }
    }, [token, navigate]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <div className="dashboard-content">
                        <div style={{ marginTop: '' }}>
                            {user && <><p>Welcome, {user.username}!</p>
                            <p>{user.email}</p></>}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="ride-list-box" style={{overflowX:'scroll',height:'100vh'}}>
                        <ListRides />
                    </div>
                    <div className="icon-container">
                        <FontAwesomeIcon
                            className='text-info'
                            icon={faPlusSquare}
                            size='4x'
                            style={{ marginLeft: '1vw' }}
                            onClick={handleClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
