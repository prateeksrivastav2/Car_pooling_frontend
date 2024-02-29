import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log("Login successful:", data);

        // Redirect to the home page
        navigate("/home"); // Adjust the route as per your setup
      } else {
        // Login failed, handle the error
        const errorData = await response.json();
        console.error("Login failed:", errorData);

        // Show a prompt for login failure
        alert("Login failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Show a prompt for login failure
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="main">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="white">
                  <button onClick={handleLogin}>
                    <strong>Login</strong>
                  </button>
                </div>
                <br />
                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
