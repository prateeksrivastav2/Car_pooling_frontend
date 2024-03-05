/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function App(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
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
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
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
