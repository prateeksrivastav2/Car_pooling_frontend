// components/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/SecondHome.css';
import RideCard from './RideCard';
import CreateRideModal from './CreateRideModal';
import ListRides from './ListRides';

const HomePage = () => {
  const [showCreateRideModal, setShowCreateRideModal] = useState(false);

  const handleShowCreateRideModal = () => setShowCreateRideModal(true);
  const handleCloseCreateRideModal = () => setShowCreateRideModal(false);

  return (
    <div className="home-container">
      <div className="create-ride">
        {/* + button for creating a ride */}
        <Button className="create-ride-button" onClick={handleShowCreateRideModal}>
          +
        </Button>
        {/* CreateRideModal */}
        <CreateRideModal show={showCreateRideModal} handleClose={handleCloseCreateRideModal} />
      </div>

      <div className="rides-list-container">
        <div className="rides-list">
          <h2>Rides List</h2>
          {/* Display existing rides using the ListRides component */}
          <ListRides />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
