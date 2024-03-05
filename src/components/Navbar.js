/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineAppstoreAdd,
  AiOutlineSetting,
  AiOutlineSchedule,
} from "react-icons/ai";
import { BiLogOutCircle, BiLogInCircle } from "react-icons/bi";
const NavBar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirect or perform any other logout actions if needed
  };

  return (
    <nav className="">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center">
            <img
              src="/favicon.png"
              className="mr-3 h-6 md:h-9"
              alt="RideRelay"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Ride<span className="text-purple-700">Unity</span>
            </span>
          </Link>
          <button
            className="block lg:hidden border border-white rounded px-3 py-1 text-white"
            type="button"
            onClick={handleToggleNav}
          >
            <span className="block">Menu</span>
          </button>
          <div
            className={`${
              isCollapsed ? "hidden" : "block"
            } lg:flex lg:items-center lg:w-auto`}
            id="navbarSupportedContent"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className={`block px-3 py-2 ${
                    location.pathname === "/" ? "text-purple-700" : "text-black"
                  }`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {localStorage.getItem('token')&&<Link
                  className={`block px-3 py-2 ${
                    location.pathname === "/home"
                      ? "text-purple-700"
                      : "text-black"
                  }`}
                  to="/home"
                >
                 Dashboard
                </Link>}
              </li>
              {/* <li className="nav-item">
                <Link
                  className={`block px-3 py-2 ${
                    location.pathname === "/create-ride"
                      ? "text-purple-700"
                      : "text-black"
                  }`}
                  to="/create-ride"
                >
                  Create Ride
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link
                  className={`block px-3 py-2 ${
                    location.pathname === "/list-rides"
                      ? "text-purple-700"
                      : "text-black"
                  }`}
                  to="/list-rides"
                >
                  List Rides
                </Link>
              </li> */}
            </ul>
            <div className="flex items-center">
              {!localStorage.getItem("token") ? (
                <>
                  <Link to="/login">
                    <Button color="purple" className="rounded font-bold mx-3">
                      <BiLogInCircle />
                      &nbsp;<span>LogIn</span>
                    </Button>
                  </Link>
                  {/* <Link to="/signup">
                    <Button color="purple" className="rounded font-bold">
                      <BiLogInCircle />
                      &nbsp;<span>SignUp</span>
                    </Button>
                  </Link> */}
                </>
              ) : (
                <Link to="/login">
                  <button
                    className="block lg:inline-block text-white w-32 px-2 py-2 rounded bg-purple-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
