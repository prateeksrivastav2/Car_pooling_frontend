import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chatbox from './chatbox';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/ShowRideDetails.css';
import axios from "axios";
import Map from './map2'

const ShowRideDetails = (props) => {
    const { id } = useParams();
    const [rideDetails, setRideDetails] = useState(null);
    const [fareCal, setFarecal] = useState(false);

    const [reciever, setReciever] = useState("");
    const [rol, setrol] = useState(false); // true for driver, false for passenger
    const [price, setPrice] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedSource, setselectedSource] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [showDestinations, setShowDestinations] = useState(false);
    const [showSource, setShowSource] = useState(false);
    const [showtext, setshowtext] = useState("Select Destinations");
    const [showsource, setshowsource] = useState("Select Source");
    const [Dchat, setDchat] = useState(false);
    const [app,setapp ] = useState([]);

    const CalculateFare = async () => {
        if (!selectedSource) {
            props.showAlert("Select Source", "danger");
            return;
        }
        if (!selectedDestination) {
            props.showAlert("Select Destination", "danger");
            return;
        }
        const addresses = [selectedSource, selectedDestination];
        const positions = [];
        const generateMarkerData = async () => {
            try {
                for (const address of addresses) {
                    try {
                        const response = await axios.get(
                            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                                address
                            )}`
                        );
                        const data = response.data;
                        if (data.length > 0) {
                            const { lat, lon } = data[0];
                            positions.push([parseFloat(lat), parseFloat(lon)]);
                        } else {
                            console.error(`No coordinates found for address: ${address}`);
                        }
                    } catch (error) {
                        console.error(`Error geocoding address: ${address}`, error);
                    }
                }
            } catch (error) {
                console.error("Error generating marker data:", error);
            }
        };
        await generateMarkerData();
        console.log("yha aa gya");
        console.log(positions);
        console.log("positions");
        try {
            const response = await axios.get(`http://localhost:3000/api/map/distancematrix?origins=${positions[0][1]},${positions[0][0]}&destinations=${positions[1][1]},${positions[1][0]}`);
            var pre = 0;
            console.log(response.data.results.distances[0][1]);
            pre = parseInt((response.data.results.distances[0][1] / 8000) * 0.60);
            setSelectedPrice(pre);
            setFarecal(true);
        } catch (error) {
            console.error('Error fetching distance matrix:', error);

        }

    }
    const setDriverChatbox = (email) => {
        setDchat(true);
        // setReciever(email);
        setReciever("9921103194@mail.jiit.ac.in");
    }
    const toggleSource = () => {
        setShowSource(!showSource); // Toggle visibility for source button
    };
    const toggleDestinations = () => {
        setShowDestinations(!showDestinations);
    };

    const setPriceDestination = (hdestination) => {
        // setSelectedPrice(hprice);
        setSelectedDestination(hdestination);
        setshowtext(hdestination);
        toggleDestinations();
    };
    const setSourceprice = (source) => {
        setshowsource(source)
        setselectedSource(source)
        toggleSource();
    }
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51P8TDCSDhYcpKPnMYaWVSHGofzSO3Xx2QQYrY3chzzcof9wNpSY1EWgJlMMWY7pXzp5ho3YZylwTeWU7SMDk9Ooj00c8AJpqFJ");

        const body = {
            start: selectedSource,
            end: selectedDestination,
            price: selectedPrice
        };

        const headers = {
            "Content-Type": "application/json"
        };

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
    };

    useEffect(() => {
        const fetchRideDetails = async () => {
            try {
                const func = async () => {
                    const response = await fetch(`http://localhost:3000/rides/rides-details/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": localStorage.getItem("token"),
                        },
                    });
                    if (response.ok) {
                        const rideData = await response.json();
                        console.log(rideData);
                        setRideDetails(rideData);
                        setReciever(rideData.driver);
                        setapp( rideDetails.applicants);

                    } else {
                        console.error('Failed to fetch ride details');
                    }
                }
                await func();
                // rideDetails.applicants.map(async (applicant) => {
                //     const response2 = await fetch(`http://localhost:3000/rides/getuserr/${applicant}`, {
                //         method: "GET",
                //         headers: {
                //             "Content-Type": "application/json",
                //             "auth-token": localStorage.getItem("token"),
                //         },
                //     });
                //     console.log("okk");
                //     console.log(response2);
                // });
            } catch (error) {
                console.error('Error fetching ride details:', error);
            }
        };

        let ro = localStorage.getItem("role");
        console.log(ro);
        if (ro === "driver") { setrol(true); setshowtext("See Destinations"); setshowsource("See Sources"); console.log(rol); }

        fetchRideDetails();
    }, [id]); // Include id as a dependency


    useEffect(() => {
        try {
            
            app.map(async (applicant) => {
                const response2 = await fetch(`http://localhost:3000/rides/getuserr/${applicant}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                });
                console.log("okk");
                console.log(response2);
            });
        }
        catch {
            console.log("error");
        }
    }, [app])


    return (
        <>
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
                                            <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Available Seats:</p>
                                            <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Date:</p>
                                            <p className="btn  btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Start Time:</p>
                                            <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Source:</p>
                                            <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>
                                                {
                                                    <>Destination:</>
                                                }
                                            </p>
                                            {fareCal && <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#7BC9FF' }}>Price:</p>}
                                        </div>
                                        <div className="col-md-6" onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; }} onMouseLeave={(e) => { e.target.style.color = ''; }}>
                                            <p className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{rideDetails.driver}</p>
                                            <p className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{rideDetails.availableSeats}</p>
                                            <p className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{new Date(rideDetails.date).toLocaleDateString()}</p>
                                            <p className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }}>{(rideDetails.estimatedArrivalTime)}</p>
                                            <p className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }} onClick={toggleSource}>{showsource}</p>
                                            {!showDestinations && showSource && (
                                                <div>
                                                    {!rol &&
                                                        rideDetails.destinations.map((destination, index) => (
                                                            <p
                                                                key={index}
                                                                className="btn my-3"
                                                                onClick={() => {
                                                                    setSourceprice(destination);
                                                                }}
                                                                style={{ display: 'block', backgroundColor: '#FFD1E3' }}
                                                            >
                                                                {destination}
                                                            </p>
                                                        ))}
                                                    {rol &&
                                                        rideDetails.destinations.map((destination, index) => (
                                                            <p
                                                                key={index}
                                                                className="btn my-3"
                                                                style={{ display: 'block', backgroundColor: '#FFD1E3' }}
                                                            >
                                                                {destination}
                                                            </p>
                                                        ))}
                                                </div>
                                            )}

                                            <p className="btn btn-block my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }} onClick={toggleDestinations}>{showtext}</p>
                                            {!showSource && showDestinations && (
                                                <div>
                                                    {!rol &&
                                                        rideDetails.destinations.slice(1).map((destination, index) => (
                                                            <p
                                                                key={index + 1}
                                                                className="btn my-3"
                                                                onClick={() => {
                                                                    setPriceDestination(destination);
                                                                }}
                                                                style={{ display: 'block', backgroundColor: '#FFD1E3' }}
                                                            >
                                                                {destination}
                                                            </p>
                                                        ))}
                                                    {rol &&
                                                        rideDetails.destinations.slice(1).map((destination, index) => (
                                                            <p
                                                                key={index + 1}
                                                                className="btn my-3"
                                                                style={{ display: 'block', backgroundColor: '#FFD1E3' }}
                                                            >
                                                                {destination}
                                                            </p>
                                                        ))}
                                                </div>
                                            )}
                                            {fareCal && <p className="btn my-3" style={{ display: 'block', backgroundColor: '#FFD1E3' }} >{selectedPrice} $</p>}
                                        </div>
                                    </div>
                                </div>
                                {!rol && !fareCal && <div className="card-footer text-body-secondary">
                                    <button
                                        className='btn'
                                        style={{
                                            backgroundColor: '#E59BE9',
                                            transition: 'all 0.3s',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            color: '#FFFFFF'
                                        }}

                                        onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)'; }}
                                        onMouseLeave={(e) => { e.target.style.color = ''; e.target.style.boxShadow = '1px 2px 2px 2px rgba(0, 0.2, 0.3, 0.3)'; }}
                                        onClick={CalculateFare}
                                    >
                                        Calculate Fare!
                                    </button>
                                </div>}
                                {!rol && (fareCal) && <div className="card-footer text-body-secondary">
                                    <button
                                        className='btn'
                                        style={{
                                            backgroundColor: '#E59BE9',
                                            transition: 'all 0.3s',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            color: '#FFFFFF'
                                        }}

                                        onMouseEnter={(e) => { e.target.style.color = '#FFFFFF'; e.target.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)'; }}
                                        onMouseLeave={(e) => { e.target.style.color = ''; e.target.style.boxShadow = '1px 2px 2px 2px rgba(0, 0.2, 0.3, 0.3)'; }}
                                        onClick={makePayment}
                                    >
                                        Book Now!
                                    </button>
                                </div>}
                            </div>

                        ) : (
                            <p>Loading ride details...</p>
                        )}
                    </div>
                </div>
                {rol && (
                    <div className="col-md-4 text-black">
                        {!Dchat ? (
                            <>
                                Applicants :
                                <br />
                                {rideDetails ? (
                                    <>
                                        {rideDetails.applicants.map((applicant, index) => (
                                            <React.Fragment key={index}>
                                                <button className="btn btn-danger my-2" onClick={() => { setDriverChatbox(applicant) }}>{applicant}</button>
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </>
                                ) : (
                                    "No Applicant"
                                )}
                            </>
                        ) : (
                            reciever && <Chatbox reciever={reciever} id={id} />
                        )}
                    </div>
                )}

            </div>
            <div className="col-md-4 text-black">
                {/* {reciever && <Chatbox reciever={reciever} id={id} />} */}
                {rideDetails && rideDetails.destinations && <Map destinations={rideDetails.destinations} />}
            </div>

        </>
    );
};

export default ShowRideDetails;
