// components/CreateRide.js
import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

const CreateRide = () => {
  const [startingLocation, setStartingLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState('');

  const handleCreateRide = async () => {
    try {
      // Fetch user email from localStorage
      const userEmail = localStorage.getItem('email');

      const response = await axios.post('http://localhost:3000/rides/create', {
        startingLocation,
        destination,
        date,
        availableSeats,
        price,
        departureTime,
        estimatedArrivalTime,
        userEmail,
      });

      if (response.data) {
        console.log('Ride created successfully:', response.data);
        // You can redirect or update state accordingly
      }
    } catch (error) {
      console.error('Error creating ride:', error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <MDBContainer>
      <MDBRow className="mt-5">
        <MDBCol md="6" className="mx-auto">
          <form>
            <h2 className="text-center mb-4">Create a Ride</h2>

            <MDBInput
              label="Starting Location"
              id="startingLocation"
              type="text"
              value={startingLocation}
              onChange={(e) => setStartingLocation(e.target.value)}
              required // Marking as required
            />

            <MDBInput
              label="Destination"
              id="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required // Marking as required
            />

            <MDBInput
              label="Date"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required // Marking as required
            />

            <MDBInput
              label="Available Seats"
              id="availableSeats"
              type="number"
              value={availableSeats}
              onChange={(e) => setAvailableSeats(e.target.value)}
              required // Marking as required
            />

            <MDBInput
              label="Price"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required // Marking as required
            />

            <MDBInput
              label="Departure Time"
              id="departureTime"
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              required // Marking as required
            />

            <MDBInput
              label="Estimated Arrival Time"
              id="estimatedArrivalTime"
              type="time"
              value={estimatedArrivalTime}
              onChange={(e) => setEstimatedArrivalTime(e.target.value)}
              required // Marking as required
            />

            <div className="text-center mt-4">
              <MDBBtn color="primary" onClick={handleCreateRide}>
                Create Ride
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CreateRide;
