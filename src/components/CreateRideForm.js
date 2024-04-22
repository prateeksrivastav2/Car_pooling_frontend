/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateRide = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [step, setStep] = useState(1);
  const [checkauth, setcheckauth] = useState(false);
  const navigate = useNavigate();
  // RIDE DETAIL
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    startingLocation: "",
    destination: "",
    date: "",
    availableSeats: "",
    license: selectedFile,
    starttime: "", // Updated: starttime
    endtime: ""    // Updated: endtime
  });
  const [rideCreated, setRideCreated] = useState(false); // Flag to indicate if the ride has been created
  useEffect(() => {
    if (localStorage.getItem("token")) setcheckauth(true);
    else navigate("/login");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  



  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const token = localStorage.getItem('token');
      if (!rideCreated) {
        // Check if the ride has not been created
        const response = await axios.post(
          "http://localhost:3000/rides/create",
          {
            startingLocation: formData.startingLocation,
            destination: formData.destination,
            date: formData.date,
            availableSeats: formData.availableSeats,
            userEmail: formData.email,
            license: selectedFile,
            name: formData.firstname,
            starttime: formData.starttime, // Updated: starttime
            endtime: formData.endtime      // Updated: endtime
          }
        );
        if (response.data) {
          console.log("Ride created successfully:", response.data);
          setRideCreated(true); // Set rideCreated flag to true after successful creation
          // You can redirect or update state accordingly
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      // Handle error, show an alert, etc.
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div
          className="row justify-content-center "
          style={{ marginTop: "14vh" }}
        >
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body">
                <div className="d-flex justify-content-center mb-4">
                  <div
                    className={`d-flex align-items-center text-primary 
                      }`}
                  >
                   
                    <div style={{fontSize:'1.3rem'}}>Ride Details</div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <>
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="firstname" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          style={{ borderRadius: '8px' }}
                          className="form-control"
                          value={formData.firstname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          style={{ borderRadius: '8px' }}
                          id="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="source" className="form-label">
                          Start Location
                        </label>
                        <input
                          type="text"
                          style={{ borderRadius: '8px' }}
                          name="startingLocation"
                          id="source"
                          className="form-control"
                          value={formData.startingLocation}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="destination" className="form-label">
                          Destination
                        </label>
                        <input
                          type="text"
                          style={{ borderRadius: '8px' }}
                          name="destination"
                          id="destination"
                          className="form-control"
                          value={formData.destination}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="date" className="form-label">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          id="date"
                          style={{ borderRadius: '8px' }}
                          className="form-control"
                          value={formData.date}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <label
                          htmlFor="availableSeats"
                          className="form-label"
                        >
                          Available Seats
                        </label>
                        <input
                          type="number"
                          name="availableSeats"
                          style={{ borderRadius: '8px' }}
                          id="availableSeats"
                          className="form-control"
                          value={formData.availableSeats}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* New Inputs for starttime and endtime */}
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="starttime" className="form-label">
                          Start Time
                        </label>
                        <input
                          type="time"
                          name="starttime"
                          id="starttime"
                          className="form-control"
                          value={formData.starttime}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="endtime" className="form-label">
                          End Time
                        </label>
                        <input
                          type="time"
                          name="endtime"
                          id="endtime"
                          className="form-control"
                          value={formData.endtime}
                          onChange={handleChange}
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                    </div>
                 
                  </>

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="submit"
                      className="btn btn-outline-secondary custom-btn"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRide;
