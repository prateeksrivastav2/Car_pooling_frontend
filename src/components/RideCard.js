// components/RideCard.js
import React, { useState } from 'react';
import axios from 'axios';

const RideCard = ({ ride }) => {
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleApply = async () => {
    try {
      // Call backend API to apply for the ride
      const response = await axios.post('http://localhost:3000/rides/apply', { rideId: ride._id });

      if (response.data) {
        // If application successful, update local state
        setApplied(true);
        // You can add further UI updates or notifications as needed
        console.log('Application submitted successfully:', response.data);
      }
    } catch (error) {
      console.error('Error applying for ride:', error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <div className={`ride-card ${expanded ? 'expanded bg-info' : ''}`}>
      <div className="ride-summary">
        <p>
          <strong>Starting Location: </strong>
          {ride.startingLocation}
        </p>
        <p>
          <strong>Destination: </strong>
          {ride.destination}
        </p>
        <p>
          <strong>Price: </strong>
          ${ride.price}
        </p>
        <button style={{display:expanded ? 'none' : ''}} onClick={handleExpand}>View Details</button>
      </div>
      {expanded && (
        <div className="ride-details bg-info">
          <p>
            <strong>Driver's mail: </strong>
            {ride.driver}
          </p>
          <p>
            <strong>Date: </strong>
            {new Date(ride.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Departute time: </strong>
            { ride.departureTime}
          </p>
          <p>
            <strong>Estimated arrival time: </strong>
            {ride.estimatedArrivalTime}
          </p>
          <p>
            <strong>Available Seats: </strong>
            {ride.availableSeats}
          </p>
          {ride.availableSeats > 0 && !applied && (
            <button className="apply-button" onClick={handleApply}>
              Apply
            </button>
          )}
          {applied && <p className="applied-message">You have applied for this ride.</p>}
          <br />
          <br />
          <button style={{display:!expanded ? 'none' : ''}} onClick={handleExpand}> Minimize</button>
        </div>
      )}
    </div>
  );
};

export default RideCard;
