/* eslint-disable no-unused-vars */
// App.js
import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateRide from "./components/CreateRideForm";
import ListRides from "./components/ListRides";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Alert from "./components/Alert";
import Myrides from "./components/Myrides";
import ShowRideDetails from './components/ShowRideDetails'
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Driver from "./components/Driver";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import PlaceAutocomplete from "./components/AutCompleteWala";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          {/* <Route exact path="/create-ride" element={<CreateRide showAlert={showAlert} />} /> */}
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route
            exact
            path="/home"
            element={<Dashboard showAlert={showAlert}/>}
          />
          <Route
            exact
            path="/maps"
            element={<PlaceAutocomplete />}
          />
          <Route
            exact
            path="/admin"
            element={<Admin showAlert={showAlert} />}
          />
          <Route
            exact
            path="/driver"
            element={<Driver showAlert={showAlert}/>}
          />
          <Route
            exact
            path="/success"
            element={<Success showAlert={showAlert} />}
          />
          <Route
            exact
            path="/cancel"
            element={<Cancel showAlert={showAlert} />}
          />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
          <Route
            exact
            path="/ride-details/:id"
            element={<ShowRideDetails showAlert={showAlert} />}
          />
          <Route
            exact
            path="/create-ride"
            element={<CreateRide showAlert={showAlert} />}
          />
          <Route
            exact
            path="/my-rides"
            element={<Myrides showAlert={showAlert} />}
          />
          <Route
            exact
            path="/profile"
            element={<Profile />}
          />
          {/* <Route
            exact
            path="/maps"
            element={<Maps />}
          /> */}
          {/* <Route exact path="/list-rides" element={<ListRides showAlert={showAlert}  />} /> */}
          <Route exact path="*" element={<>yaha pe kuch nhi hai</>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;