import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function SignUp(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [visibleOtp, setVisibleOtp] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setVisibleOtp(true);
      props.showAlert('Check Email to verify the opt', 'primary');
      const response = await fetch('http://localhost:3000/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        props.showAlert('Registration successfull , Enter Credentials to Login ', 'success');
        navigate('/login');
      } else {
        setVisibleOtp(false);
        const errorData = await response.json();
        props.showAlert('Registration failed. Please try again.', 'danger');
      }
    } catch (error) {
      props.showAlert('Registration failed. Please try again.', 'danger');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok) {
        props.showAlert('OTP validated successfully', 'success');
        navigate('/login');
      } else {
        props.showAlert('OTP validation failed', 'danger');
      }
    } catch (error) {
      props.showAlert('Internal Server Error occurred during OTP verification', 'danger');
    }
  };

  return (
    <div className="main">
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
                <label className="form-label" htmlFor="password" style={{ color: 'black' }}>
                  Username
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Username"
                  id="username"
                  type={"text"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    borderRadius: "8px",
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="email" style={{ color: 'black' }}>
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
                <label className="form-label" htmlFor="password" style={{ color: 'black' }}>
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
                  onClick={handleSignUp}
                >
                  <strong>Signup</strong>
                </button>
              </div>
              {/* <p className="ms-5">
                Already have an account?{" "}
                <Link to="/login" className="link-info">
                  Login here
                </Link>
              </p> */}
            </form>
            {!visibleOtp && (
                  <div>
                    <p className="mb-0">
                      Already have an account?{' '}
                      <Link to="/login" className="link-info">
                        Login
                      </Link>
                    </p>
                  </div>
                )}

                {visibleOtp && (
                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control form-control-lg text-white"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                    <button type="submit" className="btn btn-primary">
                      Submit OTP
                    </button>
                  </form>
                )}
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

    {/* pooraana? */}
      {/* <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                <p className="text-white-50 mb-5">Please register your username, email, and password!</p>

                <div className="mb-4 mx-5 w-100">
                  <input
                    className="form-control form-control-lg text-white"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4 mx-5 w-100">
                  <input
                    className="form-control form-control-lg text-white"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4 mx-5 w-100">
                  <input
                    className="form-control form-control-lg text-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="white">
                  <button className="btn btn-primary" onClick={handleSignUp}>
                    <strong>Signup</strong>
                  </button>
                </div>

                <div className="d-flex flex-row mt-3 mb-5">
                  {/* Social Media Buttons */}
                {/* </div> */}

                {/* {!visibleOtp && (
                  <div>
                    <p className="mb-0">
                      Already have an account?{' '}
                      <Link to="/login" className="text-white-50 fw-bold">
                        Login
                      </Link>
                    </p>
                  </div>
                )} */}

                {/* {visibleOtp && (
                  <form onSubmit={handleSubmit}>
                    <input
                      className="form-control form-control-lg text-white"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                    <button type="submit" className="btn btn-primary">
                      Submit OTP
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div> */}
        {/* </div> */}
      {/* </div>  */}
    </div>
  );
}

export default SignUp;
