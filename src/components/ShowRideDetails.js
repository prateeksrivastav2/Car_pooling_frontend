import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chatbox from './chatbox';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/ShowRideDetails.css'

const ShowRideDetails = () => {
    const { id } = useParams();
    const [rideDetails, setRideDetails] = useState(null);
    const [reciever, setReciever] = useState(""); 
    const [price, setPrice] = useState([]);
    
    const [showDestinations, setShowDestinations] = useState(false);
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51P8TDCSDhYcpKPnMYaWVSHGofzSO3Xx2QQYrY3chzzcof9wNpSY1EWgJlMMWY7pXzp5ho3YZylwTeWU7SMDk9Ooj00c8AJpqFJ");
        const body = {
            start: rideDetails.startingLocation,
            end: rideDetails.destination,
            price: 100 // Replace with selected price
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch(`http://localhost:3000/rides/create-checkout-session/${id}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });
        if (result.error) {
            console.log(result.error);
        }
    }

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
                    console.log("rideData");
                    console.log(rideData);
                    console.log(rideData.price);
                    setPrice(rideData.price);

                } else {
                    console.error('Failed to fetch ride details');
                }
            } catch (error) {
                console.error('Error fetching ride details:', error);
            }
        };

        fetchRideDetails();
    }, [id]); // Include id as a dependency

    const toggleDestinations = () => {
        setShowDestinations(!showDestinations);
    }

    return (
        <div className="container" style={{ marginTop: '6vh', display: 'flex', justifyContent: 'space-evenly' }}>
            <div className="row">
                <div className="col-md-8" style={{ marginRight: '0px' }}>
                    {rideDetails ? (
                        <div className="card mb-3" style={{ minHeight: '55vh', minWidth: '55vw', boxShadow: '0 4px 8px 2px rgba(0,0.3,0.3,0.3)', transition: '0.3s' }}>
                            <div className="card-header" style={{ fontSize: '1.5rem', fontStyle: '-moz-initial' }}>
                                <strong>Ride Details</strong>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6" onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.target.style.color = ''; }}>
                                        <p className="btn my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Driver id:</p>
                                        <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Source:</p>
                                        <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Available Seats:</p>
                                        <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Date:</p>
                                        <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Start Time:</p>
                                        {/* <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Price:</p> */}
                                        <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Destination:</p>
                                    </div>
                                    <div className="col-md-6" onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.target.style.color = ''; }}>
                                        <p className="btn   my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{rideDetails.driver}</p>
                                        <p className="btn   my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{rideDetails.startingLocation}</p>
                                        <p className="btn   my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{rideDetails.availableSeats}</p>
                                        <p className="btn   my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{new Date(rideDetails.date).toLocaleDateString()}</p>
                                        <p className="btn   my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{(rideDetails.estimatedArrivalTime)}</p>
                                        {/* <select className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }} value={price} onChange={(e) => setPrice(e.target.value)}> */}
                                            {/* {rideDetails.price.map((priceOption, index) => (
                                                <option key={index} value={priceOption}>{priceOption}</option>
                                            ))} */}
                                        {/* </select> */}
                                            <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }} onClick={toggleDestinations}>Select Destination</p>
                                            {showDestinations && (
                                                <div>
                                                    {rideDetails.price.map((destination, index) => (
                                                        <p key={index} className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{destination.
                                                            destinationId},{destination.price}</p>
                                                    ))}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <button
                                    className='btn'
                                    style={{
                                        backgroundColor: '#E59BE9',
                                        transition: 'all 0.3s', // Add transition for smooth animation
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add initial box shadow
                                        color: '#FFFFFF'
                                    }}
                                  
                                    onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)'; }}
                                    onMouseLeave={(e) => { e.target.style.color = ''; e.target.style.boxShadow = '1px 2px 2px 2px rgba(0, 0.2, 0.3, 0.3)'; }}
                                    onClick={makePayment}
                                >
                                    Book Now!
                                </button>
                            </div>
                        </div>

                    ) : (
                        <p>Loading ride details...</p>
                    )}
                </div>
            </div>
            <div className="col-md-4 text-black">
                {reciever && <Chatbox reciever={reciever} id={id} />}
            </div>
        </div>
    );
};

export default ShowRideDetails;
