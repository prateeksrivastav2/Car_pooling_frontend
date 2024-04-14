import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters

const ShowRideDetails = () => {
  const { id } = useParams(); // Get the ride ID from URL params
  const [rideDetails, setRideDetails] = useState(null);

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:3000/rides/rides-details/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"), // Include the token in the Authorization header
          },
        });
        if (response.ok) {
          const rideData = await response.json();
          setRideDetails(rideData);
          console.log(rideData);
        } else {
          console.error('Failed to fetch ride details');
        }
      } catch (error) {
        console.error('Error fetching ride details:', error);
      }
    };

    fetchRideDetails();
  }, [id]); // Include id in dependency array to re-fetch data when id changes

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {rideDetails ? (
            <>
              <h1>Ride Details</h1>
              {/* Display ride details here */}
            </>
          ) : (
            <p>Loading ride details...</p>
          )}
        </div>
        <div className="col-md-4">
          {/* Include Chatbot component here */}
        </div>
      </div>
    </div>
  );
};

export default ShowRideDetails;
