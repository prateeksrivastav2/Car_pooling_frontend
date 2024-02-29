import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link className="nav-link" to="/login">
                Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
                SingUp
            </Link>
          </li>
          </ul>
    </nav>
  );
};

export default Navbar;
