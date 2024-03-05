// import React, { useState } from "react";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Login.css";

// function SignUp(props) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState(""); // Add otp state
//   const navigate = useNavigate();
//   const [visibleOtp, setVisibleOtp] = useState(false);

//   const handleSignUp = async () => {
//     try {
//       setVisibleOtp(true);
//       props.showAlert("Check Email to verify the opt", "primary");
//       const response = await fetch("http://localhost:3000/auth/createuser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: username,
//           email: email,
//           password: password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // console.log("Registration successful:", data);
//         props.showAlert("Registration successfull , Enter Credentials to Login ", "success");
//         navigate("/login");
//       } else {
//         setVisibleOtp(false);
//         const errorData = await response.json();
//         // console.error("Registration failed:", errorData);
//         props.showAlert("Registration failed. Please try again.", "danger");
//         // alert("Registration failed. Please try again.");
//       }
//     } catch (error) {
//       // console.error("Error during registration:", error);
//       props.showAlert("Registration failed. Please try again.", "danger");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/auth/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ otp }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         // console.log("OTP validated successfully");
//         props.showAlert("OTP validated successfully", "success");
//         // Proceed with user creation or other actions
//         navigate("/login");
//       } else {
//         // console.error("OTP validation failed:", data.msg);
//         props.showAlert("OTP validation failed", "danger");
//       }
//     } catch (error) {
//       // console.error("Error validating OTP:", error);
//       props.showAlert("Internal Server Error occured during OTP verification", "danger");
//     }
//   };

//   return (
//     <div className="main">
//       <MDBContainer fluid>
//         <MDBRow className="d-flex justify-content-center align-items-center h-100">
//           <MDBCol col="12">
//             <MDBCard
//               className="bg-dark text-white my-5 mx-auto"
//               style={{ borderRadius: "1rem", maxWidth: "400px" }}
//             >
//               <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
//                 <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
//                 <p className="text-white-50 mb-5">
//                   Please register your username, email, and password!
//                 </p>
//                 <MDBInput
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Username"
//                   id="formControlLg"
//                   type="text"
//                   size="lg"

//                   required
//                 />
//                 <MDBInput
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Email address"
//                   id="formControlLg"
//                   type="email"
//                   size="lg"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <MDBInput
//                   wrapperClass="mb-4 mx-5 w-100"
//                   labelClass="text-white"
//                   label="Password"
//                   id="formControlLg"
//                   type="password"
//                   size="lg"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <div className="white">
//                   <button onClick={handleSignUp}>
//                     <strong>Signup</strong>
//                   </button>
//                 </div>
//                 <div className="d-flex flex-row mt-3 mb-5">
//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="m-3"
//                     style={{ color: "white" }}
//                   >
//                     <MDBIcon fab icon="facebook-f" size="lg" />
//                   </MDBBtn>
//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="m-3"
//                     style={{ color: "white" }}
//                   >
//                     <MDBIcon fab icon="twitter" size="lg" />
//                   </MDBBtn>
//                   <MDBBtn
//                     tag="a"
//                     color="none"
//                     className="m-3"
//                     style={{ color: "white" }}
//                   >
//                     <MDBIcon fab icon="google" size="lg" />
//                   </MDBBtn>
//                 </div>
//                 {!visibleOtp && (
//                   <div>
//                     <p className="mb-0">
//                       Already have an account?{" "}
//                       <Link to="/login" className="text-white-50 fw-bold">
//                         Login
//                       </Link>
//                     </p>
//                   </div>
//                 )}
//                 {visibleOtp && (
//                   <form onSubmit={handleSubmit}>
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       placeholder="Enter OTP"
//                     />
//                     <button type="submit">Submit OTP</button>
//                   </form>
//                 )}
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// }

// export default SignUp;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function SignUp(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // Add otp state
  const navigate = useNavigate();
  const [visibleOtp, setVisibleOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
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
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Registration successful:", data);
        props.showAlert("Registration successfull , Enter Credentials to Login ", "success");
        navigate("/login");
      } else {
        setVisibleOtp(false);
        const errorData = await response.json();
        // console.error("Registration failed:", errorData);
        props.showAlert("Registration failed. Please try again.", "danger");
        // alert("Registration failed. Please try again.");
      }
    } catch (error) {
      // console.error("Error during registration:", error);
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
        // console.log("OTP validated successfully");
        props.showAlert("OTP validated successfully", "success");
        // Proceed with user creation or other actions
        navigate("/login");
      } else {
        // console.error("OTP validation failed:", data.msg);
        props.showAlert("OTP validation failed", "danger");
      }
    } catch (error) {
      // console.error("Error validating OTP:", error);
      props.showAlert("Internal Server Error occured during OTP verification", "danger");
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
              Sign up to create a account
            </h2>
            <form className="mx-5">
              <div className="mb-4">
                <label className="form-label" htmlFor="email" style={{ color: 'black' }}>
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
              {!visibleOtp && (
                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-grey-50 fw-bold">
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
                  style={{ width: "fit-content",marginBottom:'3vh' }}
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
