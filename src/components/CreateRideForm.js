import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Map from "./Map";

const CreateRide = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [SearchResults, setSearchResults] = useState([[]]); // Array of arrays for search results
  const [destinations, setDestinations] = useState([""]); // Array to store destinations
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [step, setStep] = useState(1);
  const [checkauth, setcheckauth] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    startingLocation: "",
    destination: "",
    date: "",
    availableSeats: "",
    license: selectedFile,
    starttime: "",
    endtime: "",
  });
  const [rideCreated, setRideCreated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setcheckauth(true);
    else navigate("/login");
  }, []);

  const fetchSearchResults = async (query, index) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/places/search",
        {
          params: {
            query: query,
          },
        }
      );
      const updatedResults = [...SearchResults];
      updatedResults[index] = response.data.suggestedLocations;
      setSearchResults(updatedResults);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "startingLocation" && value.length > 0) {
      await fetchSearchResults(value, 0); // Use index 0 for starting location
    }
    if (name === "startingLocation" && value.length === 0) {
      setSearchResults([[]]); // Reset search results for starting location
    }
    // Autofill for destination
    if (name.startsWith("destination-")) {
      const index = parseInt(name.split("-")[1]);
      handleDestinationChange(index, value);
      if (value.length > 0) {
        await fetchSearchResults(value, index + 1); // Use index + 1 for destinations
      } else {
        const updatedResults = [...SearchResults];
        updatedResults[index + 1] = [];
        setSearchResults(updatedResults);
      }
    }
  };

  const handleSearchResultClick = (result, index) => {
    if (index === 0) {
      setFormData({
        ...formData,
        startingLocation: result.placeAddress,
      });
    } else {
      const updatedDestinations = [...destinations];
      updatedDestinations[index - 1] = result.placeAddress;
      setDestinations(updatedDestinations);
    }
    const updatedResults = [...SearchResults];
    updatedResults[index] = [];
    setSearchResults(updatedResults);
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, ""]);
    setSearchResults([...SearchResults, []]); // Add empty array for new destination
  };

  const handleRemoveDestination = (index) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
    const updatedResults = [...SearchResults];
    updatedResults.splice(index + 1, 1); // Remove search results for removed destination
    setSearchResults(updatedResults);
  };

  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!rideCreated) {
        const response = await axios.post(
          "http://localhost:3000/rides/create",
          {
            startingLocation: formData.startingLocation,
            destinations: destinations.filter((dest) => dest.trim() !== ""), // Filter out empty destinations
            date: formData.date,
            availableSeats: formData.availableSeats,
            userEmail: formData.email,
            license: selectedFile,
            name: formData.firstname,
            starttime: formData.starttime,
            endtime: formData.endtime,
          }
        );
        if (response.data) {
          console.log("Ride created successfully:", response.data);
          setRideCreated(true);
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  const canSubmit = destinations.some((dest) => dest.trim() !== ""); // Check if any destination is non-empty

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "10vh",
        }}
      >
        <div
          className="container mt-5"
          style={{
            width: "50%",
            marginRight: "20px",
          }}
        >
          <div
            className="row justify-content-center "
            style={{ marginTop: "14vh" }}
          >
            <div className="col-md-8">
              <div className="card shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-center mb-4">
                    <div className={`d-flex align-items-center text-primary`}>
                      <div style={{ fontSize: "1.3rem" }}>Ride Details</div>
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
                            style={{ borderRadius: "8px" }}
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
                            style={{ borderRadius: "8px" }}
                            id="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div
                        className="row mb-3"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div className="col">
                          <label htmlFor="source" className="form-label">
                            Start Location
                          </label>
                          <input
                            type="text"
                            style={{
                              borderTopLeftRadius: "8px",
                              borderTopRightRadius: "8px",
                            }}
                            name="startingLocation"
                            id="source"
                            className="form-control"
                            value={formData.startingLocation}
                            onChange={handleChange}
                          />
                          {Array.isArray(SearchResults[0]) &&
                            SearchResults[0].length > 0 && (
                              <ul
                                style={{
                                  border: "1px black solid",
                                  borderBottomLeftRadius: "7px",
                                  borderBottomRightRadius: "7px",
                                }}
                              >
                                {SearchResults[0].map((result, index) => (
                                  <>
                                    <li
                                      key={index}
                                      onClick={() =>
                                        handleSearchResultClick(result, 0)
                                      }
                                    >
                                      {result.alternateName}
                                    </li>
                                    <hr />
                                  </>
                                ))}
                              </ul>
                            )}
                        </div>

                        <div className="col">
                          <label htmlFor="destination" className="form-label">
                            Destinations
                          </label>
                          {destinations.map((destination, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <div className="input-group">
                                <span className="input-group-text">
                                  {index + 1}
                                </span>{" "}
                                {/* Numbering */}
                                <input
                                  type="text"
                                  style={{
                                    borderTopRightRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                  }}
                                  name={`destination-${index}`}
                                  id={`destination-${index}`}
                                  className="form-control"
                                  value={destination}
                                  onChange={handleChange}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveDestination(index)}
                                  className="btn btn-outline-danger"
                                  style={{
                                    borderRadius: "4px",
                                    marginLeft: "3px",
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                              {Array.isArray(SearchResults[index + 1]) &&
                                SearchResults[index + 1].length > 0 && (
                                  <ul
                                    style={{
                                      border: "1px black solid",
                                      borderBottomLeftRadius: "7px",
                                      borderBottomRightRadius: "7px",
                                    }}
                                  >
                                    {SearchResults[index + 1].map(
                                      (result, idx) => (
                                        <>
                                          <li
                                            key={idx}
                                            onClick={() =>
                                              handleSearchResultClick(
                                                result,
                                                index + 1
                                              )
                                            }
                                          >
                                            {result.alternateName}
                                          </li>
                                          <hr />
                                        </>
                                      )
                                    )}
                                  </ul>
                                )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={handleAddDestination}
                            className="btn btn-link"
                          >
                            + Add Destination
                          </button>
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
                            style={{ borderRadius: "8px" }}
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
                            style={{ borderRadius: "8px" }}
                            id="availableSeats"
                            className="form-control"
                            value={formData.availableSeats}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
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
                            style={{ borderRadius: "8px" }}
                          />
                        </div>
                      </div>
                    </>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="submit"
                        className="btn btn-outline-secondary custom-btn"
                        disabled={!canSubmit} // Disable submit button if no destination is entered
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginRight: "10vw",
          }}
        >
          <Map />
        </div>
      </div>
    </>
  );
};

export default CreateRide;
