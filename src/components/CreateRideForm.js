/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import AWS from 'aws-sdk';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const accessKeyId = process.env.REACT_APP_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
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

  const uploadFile = () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setUploading(true);

    // Configure AWS SDK with your credentials
    //console.log(accessKeyId);
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: 'ap-south-1'
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: 'carpooling',
      Key: selectedFile.name,
      Body: selectedFile
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            alert('Error uploading file');
        } else {
            console.log('File uploaded successfully:', data.Location);
            setSelectedFile(data.Location);
            alert('File uploaded successfully!'); // Optional: Show an alert to the user
        }
        setUploading(false);
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const token = localStorage.getItem('token');
      if (step === 2 && !rideCreated) {
        // Check if the current step is the third step and ride has not been created
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
                <div className="d-flex justify-content-evenly mb-4">
                  <div
                    className={`d-flex align-items-center ${step === 1 ? "text-primary" : "text-muted"
                      }`}
                  >
                    {/* <div className="rounded-circle bg-primary text-white p-2 me-2">
                      1
                    </div> */}
                    <span class="badge bg-primary rounded-circle text-white me-2">
                      1
                    </span>

                    <div>License Verification</div>
                  </div>
                  <div
                    className={`d-flex align-items-center ${step === 2 ? "text-primary" : "text-muted"
                      }`}
                  >
                    <div className="badge bg-primary rounded-circle text-white me-2">
                      2
                    </div>
                    <div>Ride Details</div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="mb-3">
                      {/* <label htmlFor="firstname" className="form-label">
                        First Name
                      </label> */}
                      {/* <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="form-control"
                        value={formData.firstname}
                        onChange={handleChange}
                      /> */}
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6 offset-md-3">
                            <div className="card mt-5">
                              <div className="card-body">
                                <h2 className="card-title">Upload a PDF File</h2>
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
                                <button onClick={uploadFile} className=" btn btn-dark" disabled={uploading}>
                                  {uploading ? 'Uploading...' : 'Upload'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
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
                      {/* End of New Inputs */}
                    </>
                  )}


                  <div className="d-flex justify-content-between mt-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-outline-secondary custom-btn"

                      >
                        Back
                      </button>
                    )}
                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn btn-outline-secondary custom-btn"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-outline-secondary custom-btn"
                      >
                        Submit
                      </button>
                    )}
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