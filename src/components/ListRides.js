import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/ListRides.css";
// import RidedetailsModal from './RidedetailsModal'; // Assuming you have a modal component

const RideCard = ({ ride,selectedRide }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to a new page, passing ride ID as a URL parameter
    navigate(`/ride-details/${ride._id}`);
  };

  return (
    <div className="ride-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h4>Driver: {ride.driver.name}</h4>
      <p>Starting Location: {ride.startingLocation}</p>
      <p>Destination: {ride.destination}</p>
      {/* { localStorage.setItem("reciever", ride.driver)} */}
      <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
      <p>Available Seats: {ride.availableSeats}</p>
      {/* <RidedetailsModal ride={selectedRide} /> */}
    </div>
  );
};

const ListRides = () => {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null); // State to store selected ride for modal

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
    <div className="ride-list">
      {/* <h1>Available Rides</h1> */}
      {rides.length === 0 && <p>No rides available right now.</p>}
      {rides.map((ride) => (
        <RideCard key={ride._id} ride={ride} />
      ))}
     
    </div>
  );
};

export default ListRides;
