import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbox from './chatbox';
import Map from './Map';

const RiderCreated = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ride, setRide] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const token = localStorage.getItem('token');

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
                    if(userData.role !== 'driver'){
                        navigate('/home');
                    }
                    if (userData.hasCreatedRide === false) {
                        navigate('/dashboard');
                    } else {
                        fetchRideData(userData.email);
                    }
                } else {
                    console.error('Error fetching user data');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };

        const fetchRideData = async (email) => {
            try {
                const response = await fetch('http://localhost:3000/rides/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });

                if (response.ok) {
                    const rides = await response.json();
                    const userRide = rides.find(ride => ride.driver === email);
                    setRide(userRide);
                    if (userRide) {
                        const applicantsResponse = await fetch('http://localhost:3000/auth/getusers', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': token,
                            },
                        });
                        if (applicantsResponse.ok) {
                            const users = await applicantsResponse.json();
                            console.log('users->',users);
                            const filteredApplicants =await users.filter(user => user.role === "passenger" && user.isVerified);
                            setApplicants(filteredApplicants.slice(0)); // Remove the first user (current user)
                            console.log('filtered->',applicants);
                            console.log('filtered applicants->',filteredApplicants);
                        } else {
                            console.error('Error fetching applicants');
                        }
                    }
                } else {
                    console.error('Error fetching ride data');
                }
            } catch (error) {
                console.error('Error fetching ride data', error);
            }
        };

        if (!token) {
            navigate('/login');
        } else {
            fetchData();
        }
    }, [token, navigate]);

    return (
        <div>
            <div style={{ display: 'flex', direction: 'column' }}>
                <Chatbox />
                {ride && <Map startingLocation={ride.startingLocation} destinations={ride.destinations} />}
            </div>

            {/* applicants */}
            <div>
                <h3>Applicants</h3>
                {applicants && applicants.map(applicant => (
                    <div>
                        <p>Username: {applicant.username}</p>
                        <p>Email: {applicant.email}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiderCreated;
