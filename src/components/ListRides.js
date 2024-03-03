// components/ListRides.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RideCard from './RideCard';

const ListRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get('http://localhost:3000/rides/list');
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
        // Handle error, show an alert, etc.
      }
    };

    fetchRides();
  }, []); // Runs once when the component mounts

  return (
    <div>
      <h2>Available Rides</h2>
      <ul>
        {rides.length === 0 && <p>No rides available right now.</p>}
        {rides.map((ride) => (
          <li key={ride._id}>
            <RideCard ride={ride} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRides;
