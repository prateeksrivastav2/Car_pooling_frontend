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
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            {/* Increased font size of "Log in" */}
            <h2 className="fw-normal mb-3 mx-5 ps-5 pb-3 justify-content-center" style={{ letterSpacing: '1px', fontWeight: "", fontSize: "30px" }}>Log in</h2>
            <MDBInput
              wrapperClass='mb-4 mx-5 w-100'
              labelClass="text-white"
              label="Email address"
              placeholder="E-mail"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <MDBInput
              wrapperClass="mb-4 mx-5 w-100"
              labelClass="text-white"
              label="Password"
              placeholder="Password"
              id="formControlLg"
              type={showPassword ? "text" : "password"}
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="white">
              <button className="btn btn-primary " style={{width:'fit-content'}} onClick={handleLogin} >
                <strong >Login</strong>
              </button>
            </div>
            {/* <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleLogin}>Login</MDBBtn> */}
            {/* <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p> */}
            <p className='ms-5'>Don't have an account? <Link to="/signup" className="link-info">Register here</Link></p>
          </div>
        </MDBCol>
        <MDBCol sm='6' className='d-none d-sm-block' style={{ marginTop: "17vh" }}>
          <img src="https://www.rentallscript.com/resources/content/images/2023/02/Car-Rental-App.png" alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;