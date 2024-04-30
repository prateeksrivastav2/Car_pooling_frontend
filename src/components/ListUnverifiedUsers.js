import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/ListRides.css";

const UserCard = ({ user, onAccept,onReject }) => {
  return (
    <div className="ride-card" style={{ cursor: 'pointer' }}>
      <h4>Name: {user.username}</h4>
      <p>Email: {user.email}</p>
      <p>Applied for: {user.role}</p>
      {user.role==="passenger"?<p>Aadhar: <a className='btn btn-primary btn-sm' href={`${user.license}`}>Download</a> : "Not required"</p>:
      <p>License:<a className='btn btn-primary btn-sm' href={`${user.license}`}>Download</a> : "Not required"</p>
      }
      
      <div className='btn btn-success btn-sm' onClick={() => onAccept(user._id)}>Accept</div>&nbsp;
      <div className='btn btn-danger btn-sm' onClick={()=> onReject(user._id)}>Reject</div>
    </div>
  );
};


const ListUnverifiedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/listunverified');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchUsers();
  }, []); // Runs once when the component mounts


  const handleAccept = async (userId) => {
    try {
      console.log("inside accept");
      await axios.post(`http://localhost:3000/admin/accept/${userId}`);
      // After successful acceptance, refetch the users
      const response = await axios.get('http://localhost:3000/admin/listunverified');
      setUsers(response.data);
    } catch (error) {
      console.error('Error accepting application:', error);
      // Handle error, show an alert, etc.
    }
  }

  const handleReject = async (userId) => {
    try {
      console.log("inside accept");
      await axios.post(`http://localhost:3000/admin/reject/${userId}`);
      // After successful acceptance, refetch the users
      const response = await axios.get('http://localhost:3000/admin/listunverified');
      setUsers(response.data);
    } catch (error) {
      console.error('Error accepting application:', error);
      // Handle error, show an alert, etc.
    }
  }

  return (
    <div className="ride-list">
      {/* <h1>Available Rides</h1> */}
      {users.length === 0 && <p>No users available right now.</p>}
      {users.map((user) => (
        <UserCard key={user._id} user={user} onAccept={handleAccept} onReject={handleReject} />
      ))}
     
    </div>
  );
};

export default ListUnverifiedUsers;
