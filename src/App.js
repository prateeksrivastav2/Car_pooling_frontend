

// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateRide from './components/CreateRideForm';
import ListRides from './components/ListRides';
import Test from './components/Test';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<><Home/></>} />
          <Route exact path="/home" element={<>This is second home page</>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/create-ride" element={<CreateRide />} />
          <Route exact path="/list-rides" element={<ListRides />} />
          <Route exact path="/test" element={<Test/>} />
          <Route exact path="*" element={<>yaha pe kuch nhi hai</>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
