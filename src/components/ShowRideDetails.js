import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chatbox from "./chatbox";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/ShowRideDetails.css";
import axios from "axios";

const ShowRideDetails = () => {
  const { id } = useParams();
  // const history = useHistory();
  const [rideDetails, setRideDetails] = useState(null);
  const [reciever, setReciever] = useState("");
  const [rol, setrol] = useState(false); // true for driver, false for passenger
  const [price, setPrice] = useState([{}]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showtext, setshowtext] = useState("Select Destinations");
  const [applicants, setApplicants] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const token = localStorage.getItem('token');

  const toggleDestinations = () => {
    setShowDestinations(!showDestinations);
  };

  const setPriceDestination = (hprice, hdestination) => {
    setSelectedPrice(hprice);
    setSelectedDestination(hdestination);
    setshowtext(hdestination);
    toggleDestinations();
  };

  const handleApplicantClick = async (userId) => {
    const fetchUsers = async () => {
        try {
            const applicantsResponse = await axios.get(`http://localhost:3000/auth/getuserr/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            console.log('Response:', applicantsResponse.data);
            const varr = applicantsResponse.data;
            setUsersData(varr);
            console.log('Updated usersData:', usersData);
            
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    console.log(userId);
    await fetchUsers();
    console.log(usersData);
    // const user = ap
};


  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P8TDCSDhYcpKPnMYaWVSHGofzSO3Xx2QQYrY3chzzcof9wNpSY1EWgJlMMWY7pXzp5ho3YZylwTeWU7SMDk9Ooj00c8AJpqFJ"
    );

    const body = {
      start: rideDetails.startingLocation,
      end: selectedDestination,
      price: selectedPrice,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `http://localhost:3000/rides/create-checkout-session/${id}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };


  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/rides/rides-details/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        


        if (response.ok) {
          const rideData = await response.json();

          setRideDetails(rideData);
          setReciever(rideData.driver);
          setPrice(rideData.price);
          setApplicants(rideData.applicants);

          
        } else {
          console.error("Failed to fetch ride details");
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };
    

    let ro = localStorage.getItem("role");
    console.log(ro);
    if (ro === "driver") {
      setrol(true);
      setshowtext("See Destinations");
      console.log(rol);
    }

    fetchRideDetails();
  }, [id]); // Include id as a dependency

  return (
    <div
      className="container"
      style={{
        marginTop: "6vh",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div className="row">
        <div className="col-md-8" style={{ marginRight: "0px" }}>
          {rideDetails ? (
            <div
              className="card mb-3"
              style={{
                minHeight: "55vh",
                minWidth: "55vw",
                boxShadow: "0 4px 8px 2px rgba(0,0.3,0.3,0.3)",
                transition: "0.3s",
              }}
            >
              <div
                className="card-header"
                style={{ fontSize: "1.5rem", fontStyle: "-moz-initial" }}
              >
                <strong>Ride Details</strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-md-6"
                    onMouseEnter={(e) => {
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "";
                    }}
                  >
                    <p
                      className="btn my-3"
                      style={{ display: "block", backgroundColor: "#7BC9FF" }}
                    >
                      Driver id:
                    </p>
                    <p
                      className="btn btn-block my-3"
                      style={{ display: "block", backgroundColor: "#7BC9FF" }}
                    >
                      Source:
                    </p>
                    <p
                      className="btn  btn-block my-3"
                      style={{ display: "block", backgroundColor: "#7BC9FF" }}
                    >
                      Available Seats:
                    </p>
                    <p
                      className="btn  btn-block my-3"
                      style={{ display: "block", backgroundColor: "#7BC9FF" }}
                    >
                      Date:
                    </p>
                    <p
                      className="btn  btn-block my-3"
                      style={{ display: "block", backgroundColor: "#7BC9FF" }}
                    >
                      Start Time:
                    </p>
                    <p
                      className="btn btn-block my-3"
                      style={{ display: "block", backgroundColor: "#7BC9FF" }}
                    >
                      {<>Destination:</>}
                    </p>
                  </div>
                  <div
                    className="col-md-6"
                    onMouseEnter={(e) => {
                      e.target.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "";
                    }}
                  >
                    <p
                      className="btn my-3"
                      style={{ display: "block", backgroundColor: "#FFD1E3" }}
                    >
                      {rideDetails.driver}
                    </p>
                    <p
                      className="btn my-3"
                      style={{ display: "block", backgroundColor: "#FFD1E3" }}
                    >
                      {rideDetails.startingLocation}
                    </p>
                    <p
                      className="btn my-3"
                      style={{ display: "block", backgroundColor: "#FFD1E3" }}
                    >
                      {rideDetails.availableSeats}
                    </p>
                    <p
                      className="btn my-3"
                      style={{ display: "block", backgroundColor: "#FFD1E3" }}
                    >
                      {new Date(rideDetails.date).toLocaleDateString()}
                    </p>
                    <p
                      className="btn my-3"
                      style={{ display: "block", backgroundColor: "#FFD1E3" }}
                    >
                      {rideDetails.estimatedArrivalTime}
                    </p>
                    <p
                      className="btn btn-block my-3"
                      style={{ display: "block", backgroundColor: "#FFD1E3" }}
                      onClick={toggleDestinations}
                    >
                      {showtext}
                    </p>
                    {showDestinations && (
                      <div>
                        {!rol &&
                          rideDetails.price
                            .slice(1)
                            .map((destination, index) => (
                              <p
                                key={index + 1}
                                className="btn my-3"
                                onClick={() => {
                                  setPriceDestination(
                                    destination.price,
                                    destination.destinationId
                                  );
                                }}
                                style={{
                                  display: "block",
                                  backgroundColor: "#FFD1E3",
                                }}
                              >
                                {destination.destinationId},{destination.price}
                              </p>
                            ))}
                        {rol &&
                          rideDetails.price
                            .slice(1)
                            .map((destination, index) => (
                              <p
                                key={index + 1}
                                className="btn my-3"
                                style={{
                                  display: "block",
                                  backgroundColor: "#FFD1E3",
                                }}
                              >
                                {destination.destinationId},{destination.price}
                              </p>
                            ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {!rol && (
                <div className="card-footer text-body-secondary">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#E59BE9",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      color: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#FFFFFF";
                      e.target.style.boxShadow =
                        "0 8px 12px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "";
                      e.target.style.boxShadow =
                        "1px 2px 2px 2px rgba(0, 0.2, 0.3, 0.3)";
                    }}
                    onClick={makePayment}
                  >
                    Book Now!
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Loading ride details...</p>
          )}
        </div>
      </div>
      {/* <div className="col-md-4 text-black">
                {reciever && <Chatbox reciever={reciever} id={id} />}
            </div> */}
      <div
        style={{
          border: "4px black solid",
          borderRadius: "10px",
          width: "40vw",
          marginLeft: "4vw",
          boxShadow: "0 4px 8px 2px rgba(0,0.3,0.3,0.3)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            borderTopRightRadius: "2px",
            borderTopLeftRadius: "2px",
            border: "2px black solid",
          }}
        >
          APPLICANTS
        </div>
        <br />
        {applicants.map((applicant, index) => (
          <div
            key={index}
            onClick={() => handleApplicantClick(applicant)}
            style={{
              cursor: "pointer",
              padding: "10px",
              borderBottom: "1px solid black",
            }}
          >
            {applicant}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRideDetails;
