import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import '../styles/ShowRideDetails.css'
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
    <div className="container"
    style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <div className="row">
        <div className="col-md-8">
          {rideDetails ? (
            <div className='cardDetails'
            style={{width:'100vw'}}>
              <br />
              <h2>Date : {rideDetails.date}</h2>
              <br />
              <h2>Starting location : {rideDetails.startingLocation}</h2>
              <br />
              <h2>Destination : {rideDetails.destination}</h2>
              <br />
              <h2>Available seats : {rideDetails.availableSeats}</h2>
              <br />
              <h2>Duration : From {rideDetails.departureTime} to {rideDetails.estimatedArrivalTime}(estimated)</h2>
              <br />
              <p className='pricee'>Price : {rideDetails.price}</p>
              <br />
              <button>Apply</button>
            </div>
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
