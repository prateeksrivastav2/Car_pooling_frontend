import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define the handleout function if needed
  const handleout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to login or perform any other action
  };

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        CarPoolKarlo
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            second home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-ride">
            Create ride
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/list-rides">
            List Rides
          </Link>
        </li>
        {!localStorage.getItem('token') ? (
          <form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button" >
              Login
            </Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">
              Signup
            </Link>
          </form>
        ) : (
          <button className="btn btn-primary mx-1" onClick={handleout} role="button" >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
