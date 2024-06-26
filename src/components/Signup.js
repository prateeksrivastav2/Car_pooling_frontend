/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import "../styles/Login.css";
let accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
let secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;

function SignUp(props) {
  const [role, setRole] = useState("passenger");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // Add otp state
  const navigate = useNavigate();
  const [visibleOtp, setVisibleOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({}); //form

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setUploading(true);

    // Configure AWS SDK with your credentials
    console.log(accessKeyId);
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: "ap-south-1",
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: "carpooling",
      Key: selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        alert("Error uploading file");
      } else {
        console.log("File uploaded successfully:", data.Location);
        setSelectedFile(data.Location);
        alert("File uploaded successfully!"); // Optional: Show an alert to the user
      }
      setUploading(false);
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setVisibleOtp(true);
      props.showAlert("Check Email to verify the opt", "primary");
      const response = await fetch("http://localhost:3000/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
          role: role,
          license: selectedFile,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Registration successful:", data);
        props.showAlert(
          "Registration successfull , Please wait until you get verified by an admin ",
          "success"
        );
        navigate("/login");
      } else {
        setVisibleOtp(false);
        const errorData = await response.json();
        props.showAlert("Registration failed. Please try again.", "danger");
      }
    } catch (error) {
      props.showAlert("Registration failed. Please try again.", "danger");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok) {
        props.showAlert("OTP validated successfully", "success");
        navigate("/login");
      } else {
        props.showAlert("OTP validation failed", "danger");
      }
    } catch (error) {
      // console.error("Error validating OTP:", error);
      props.showAlert(
        "Internal Server Error occured during OTP verification",
        "danger"
      );
    }
  };

  // FORM VALIDATIOn
  const validateForm = () => {
    let errors = {};

    if (username.length > 15) {
      errors.username = "Name cannot be longer than 15 characters";
    }

    if (!/^[a-zA-Z]+$/.test(username)) {
      errors.username = "Name can only contain alphabets";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (password.length < 5 || password.length > 15) {
      errors.password = "Password must be between 5 and 15 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
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
              Sign up to create a account
            </h2>
            <form className="mx-5">
              <div className="mb-4">
                <label
                  className="form-label"
                  htmlFor="email"
                  style={{ color: "black" }}
                >
                  Name
                </label>
                <input
                  className="form-control"
                  placeholder="Enter your Name"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    borderRadius: "8px",
                  }}
                  required
                />
              </div>
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
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
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
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
                  type="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    borderRadius: "8px",
                  }}
                  required
                >
                  <option value="passenger">Passenger</option>
                  <option value="driver">Driver</option>
                </select>

                {role === "passenger" && (
                  <div className="mb-4 mt-3">
                    <h2 className="card-title">Upload Aadhar</h2>
                    <input
                      type="file"
                      name="formDataWithLicense"
                      className="btn"
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <div>
                        <h3>Selected File:</h3>
                        <p>Name: {selectedFile.name}</p>
                        <p>Size: {selectedFile.size} bytes</p>
                      </div>
                    )}
                    <button
                      onClick={uploadFile}
                      className=" btn btn-dark"
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                )}

                {role === "driver" && (
                  <div className="mb-4 mt-3">
                    <h2 className="card-title">Upload License</h2>
                    <input
                      type="file"
                      name="formDataWithLicense"
                      className="btn"
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <div>
                        <h3>Selected File:</h3>
                        <p>Name: {selectedFile.name}</p>
                        <p>Size: {selectedFile.size} bytes</p>
                      </div>
                    )}
                    <button
                      onClick={uploadFile}
                      className=" btn btn-dark"
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                )}
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
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
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
              {!visibleOtp && (
                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="link-info">
                      Login
                    </Link>
                  </p>
                </div>
              )}
            </form>
            {visibleOtp && (
              <form onSubmit={handleSubmit} className="mx-5">
                <div className="mb-4">
                  <input
                    className="form-control my-3"
                    type="text"
                    value={otp}
                    style={{
                      borderRadius: "8px",
                    }}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="white">
                  <button
                    className="btn btn-primary"
                    style={{ width: "fit-content", marginBottom: "3vh" }}
                    onClick={handleSubmit}
                  >
                    <strong>Submit</strong>
                  </button>
                </div>
                {/* <Link className="btn btn-primary my-2" type="submit"  >Submit OTP</Link> */}
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
  );
}

export default SignUp;
