import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect or perform any other logout actions if needed
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black fixed-top" >
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          CarKro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleNav}
          aria-controls="navbarSupportedContent"
          aria-expanded={!isCollapsed ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} text-white`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''} text-white`} to="/home">Second Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/create-ride' ? 'active' : ''} text-white`} to="/create-ride">Create Ride</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/list-rides' ? 'active' : ''} text-white`} to="/list-rides">List Rides</Link>
            </li>
          </ul>
          <form className="d-flex">
            {!localStorage.getItem('token') ? (
              <>
                <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
              </>
            ) : (
              <button className="btn btn-primary mx-1" onClick={handleLogout}>Logout</button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
