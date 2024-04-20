import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import '../styles/ShowRideDetails.css'
=======
import { useParams } from 'react-router-dom';
import Chatbox from './chatbox';

>>>>>>> 90871be16e84efaf68e0209e8d2a75646d059805
const ShowRideDetails = () => {
    const { id } = useParams();
    const [rideDetails, setRideDetails] = useState(null);
    const [reciever, setReciever] = useState(""); // Initialize reciever state

    useEffect(() => {
        const fetchRideDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/rides/rides-details/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                if (response.ok) {
                    const rideData = await response.json();
                    setRideDetails(rideData);
                    setReciever(rideData.driver); 
                } else {
                    console.error('Failed to fetch ride details');
                }
            } catch (error) {
                console.error('Error fetching ride details:', error);
            }
        };

        fetchRideDetails();
    }, [id]); // Include id as a dependency

<<<<<<< HEAD
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
=======
    return (
        <div className="container d-flex " style={{ marginTop: '6vh' }}>
            <div className="row">
                <div className="col-md-8" style={{marginRight:'0px'}}>
                    {rideDetails ? (
                        <div className="card mb-3" style={{ minHeight: '55vh', minWidth: '55vw', boxShadow: '0 4px 8px 2px rgba(0,0.3,0.3,0.3)', transition: '0.3s' }}>
                            <div className="card-header" style={{ fontSize: '1.5rem', fontStyle: '-moz-initial' }}>
                                <strong>Ride Details</strong>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="btn btn-info my-3" style={{ display: 'block' }}>Driver id:</p>
                                        <p className="btn btn-info btn-block my-3" style={{ display: 'block' }}>Source:</p>
                                        <p className="btn btn-info btn-block my-3" style={{ display: 'block' }}>Destination:</p>
                                        <p className="btn btn-info btn-block my-3" style={{ display: 'block' }}>Available Seats:</p>
                                        <p className="btn btn-info btn-block my-3" style={{ display: 'block' }}>Date:</p>
                                        <p className="btn btn-info btn-block my-3" style={{ display: 'block' }}>Start Time:</p>
                                        <p className="btn btn-info btn-block my-3" style={{ display: 'block' }}>Price:</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{rideDetails.driver}</p>
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{rideDetails.startingLocation}</p>
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{rideDetails.destination}</p>
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{rideDetails.availableSeats}</p>
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{new Date(rideDetails.date).toLocaleDateString()}</p>
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{rideDetails.availableSeats}</p>
                                        <p className="btn btn-warning  my-3" style={{ display: 'block' }}>{rideDetails.driver}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-body-secondary">
                                <button className='btn btn-danger'>Book Now!</button>
                            </div>
                        </div>

                    ) : (
                        <p>Loading ride details...</p>
                    )}
                </div>
            </div>
            <div className="col-md-4 text-black">
               {/* Add your chatbox component here */}
               {/* {reciever} */}
               {reciever && <Chatbox reciever={reciever} />} {/* Render chatbox only when reciever is available */}
            </div>
>>>>>>> 90871be16e84efaf68e0209e8d2a75646d059805
        </div>
    );
};

export default ShowRideDetails;
