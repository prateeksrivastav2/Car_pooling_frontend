   // components/ListRides.js
   import React, { useState, useEffect } from 'react';
   import axios from 'axios';
   
   const ListRides = () => {
     const [rides, setRides] = useState([]);
   
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
   
     return (
       <div>
         <h2>Available Rides</h2>
         <ul>
          {rides.length === 0 && "no rides available right now "}
           {rides.map((ride) => (
             <li key={ride._id}>
               <strong>Driver: {ride.driver.name}</strong>
               <p>Starting Location: {ride.startingLocation}</p>
               <p>Destination: {ride.destination}</p>
               <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
               <p>Available Seats: {ride.availableSeats}</p>
             </li>
           ))}
         </ul>
       </div>
     );
   };
   
   export default ListRides;
