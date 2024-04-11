import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RideCard from './RideCard';

const Myrides = (props) => {
  const user = props.location?.state?.user; // Using optional chaining to prevent errors
  const email = user?.email; // Using optional chaining to prevent errors
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  const getdetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/rides/mylist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),// Include the token in the Authorization header
        },
      });
      if (response.ok) {
        const ridesData = await response.json();
        console.log(ridesData);
        setRides(ridesData);
      } else {
        // Handle error responses
        console.error('Error fetching rides:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
      // Handle error, show an alert, etc.
    }
  };
  

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      getdetails();
    }
  }, []);

  return (
    <div>
       {rides.map((ride) => (
        <RideCard key={ride._id} ride={ride} />
      ))}
    </div>
  );
};

export default Myrides;
