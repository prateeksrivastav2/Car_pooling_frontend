/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function App(props) {
  const [role, setRole] = useState("passenger");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const json = await response.json();
    const { authToken } = json;
    if (json.success) {
      localStorage.setItem("token", authToken);
      localStorage.setItem("role", role);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert(
        "Invalid Credentials / Wait for admin to verify account",
        "danger"
      );
    }
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      props.showAlert("Enter a valid email address", "danger");
      isValid = false;
    }

    if (password.length < 5 || password.length > 15) {
      props.showAlert("Password must be between 5 and 15 characters", "danger");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h2
              className="fw-normal mb-3 mx-5 justify-content-center"
              style={{
                letterSpacing: "0.5px",
                fontStyle: "-moz-initial",
                fontSize: "2.5rem",
              }}
            >
              Sign in to your account
            </h2>
            <form className="mx-5">
              <div className="mb-4">
                <label
                  className="form-label"
                  htmlFor="Role"
                  style={{ color: "black" }}
                >
                  Choose Account type
                </label>
                <select
                  className="form-control"
                  placeholder="Enter your E-mail to login"
                  id="role"
                  type="email"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    borderRadius: "8px",
                  }}
                  required
                >
                  <option value="passenger">Passenger</option>
                  <option value="driver">Driver</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="form-label"
                  htmlFor="email"
                  style={{ color: "black" }}
                >
                  E-mail
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your E-mail to login"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    borderRadius: "8px",
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="form-label"
                  htmlFor="password"
                  style={{ color: "black" }}
                >
                  Password
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "8px",
                  }}
                  required
                />
              </div>
              <div className="white">
                <button
                  className="btn btn-primary"
                  style={{ width: "fit-content" }}
                  onClick={handleLogin}
                >
                  <strong>Login</strong>
                </button>
              </div>
              <p className="ms-5">
                Don't have an account?{" "}
                <Link to="/signup" className="link-info">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div
          className="col-sm-6 d-none d-sm-block"
          style={{ marginTop: "17vh" }}
        >
          <img
            src="https://www.rentallscript.com/resources/content/images/2023/02/Car-Rental-App.png"
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
