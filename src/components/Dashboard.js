import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListRides from "./ListRides";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import "../styles/Dashboard.css";
// import RidedetailsModal from './RidedetailsModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store user data
  const token = localStorage.getItem("token");

  const handleClick = () => {
    navigate("/create-ride");
  };
  const viewProfile = () => {
    navigate("/profile");
  };
  const handelMyrides = () => {
    navigate("/my-rides", { state: { user: user } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/getuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log(user);
          localStorage.setItem('username', userData.username);
        } else {
          // Handle error response
          console.error("Error fetching user data");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-18">
          <div className="dashboard-content shadow-on-hover">
            <div style={{ marginTop: "", fontSize: "1.5rem" }}>
              {user && (
                <>
                  <p>Hello🖐️ ,{user.username}!</p>
                </>
              )}
            </div>
            <button
              onClick={viewProfile}
              style={{
                border: "2px black solid",
                borderRadius: "6px",
                padding: "2px",
              }}
            >
              View Profile
            </button>
            {/* <div> <button className='btn btn-primary' onClick={handelMyrides}>My Rides</button></div> */}
          </div>
        </div>

        <h2
          style={{
            fontSize: "2rem",
            fontFamily: "cursive",
          }}
        >
          Available Rides
        </h2>
        <div class="container">
          <div class="row">
            <div class="my-3">
              <div class="card text-black mb-3">
                <div class="card-body">
                  <ListRides/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="rid" >
                        {/* <RidedetailsModal/> */}
        {/* </div> *
                        <div className="icon-container">
                            <FontAwesomeIcon
                                className='text-info'
                                icon={faPlusSquare}

                                size='4x'
                                style={{ marginLeft: '1vw', cursor: 'pointer' }}
                                onClick={handleClick}
                            />
                        </div>

                    </div> */}
      </div>
      <div
        className=""
        style={{ position: "fixed", bottom: "0", left: "5" }}
      >
        <FontAwesomeIcon
          className="text-info"
          icon={faPlusSquare}
          size="4x"
          style={{ marginLeft: "1vw", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
export default Dashboard;
