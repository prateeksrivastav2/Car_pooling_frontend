import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ListRides.css";
import RidedetailsModal from './RidedetailsModal'; // Assuming you have a modal component

const RideCard = ({ ride, openModal,selectedRide }) => {
  const handleCardClick = () => {
    console.log("clicked");
    openModal(ride);
  };

  return (
    <div className="ride-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <h4>Driver: {ride.driver.name}</h4>
      <p>Starting Location: {ride.startingLocation}</p>
      <p>Destination: {ride.destination}</p>
      <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
      <p>Available Seats: {ride.availableSeats}</p>
      <RidedetailsModal ride={selectedRide} />
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

  const openModal = (ride) => {
    console.log("ll");
    setSelectedRide(ride);
  };

  return (
    <div className="ride-list">
      <h1>Available Rides</h1>
      {rides.length === 0 && <p>No rides available right now.</p>}
      {rides.map((ride) => (
        <RideCard key={ride._id} ride={ride} openModal={openModal} selectedRide={selectedRide} />
      ))}
      {/* Render the modal component conditionally */}
      {selectedRide && <RidedetailsModal ride={selectedRide} />}
    </div>
  );
};

export default ListRides;
