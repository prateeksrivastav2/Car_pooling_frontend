import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const handleout = async(e) => {
    window.location.reload()
    localStorage.removeItem('token');
    // setIsLoggedIn(false);
  };


    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={{ maxHeight: '55px', backgroundColor: "black", marginBottom: '0px',maxHeight:'fit-content' }}>
                <div className="container-fluid" >
                    <Link className="navbar-brand active text-white" to="/" style={{ marginLeft: '35px' }}>
                       {/* <FontAwesomeIcon icon={faInfo} size="2x" /> */}
                        carkro
                    </Link>
                    {/* {!isCollapsed&&<div style={{marginTop:'200px',backgroundColor:'green'}}>

            </div>} */}
                    {/* <button className="navbar-toggler" style={{ backgroundColor: isCollapsed ? 'B4D4FF' : 'transparent' }} onClick={handleTogglenav} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    
                        <span className="navbar-toggler-icon"></span> */}
                    {/* </button> */}
                    <button
                        className="navbar-toggler custom-toggler"
                        type="button"
                        data-toggle="collapse"
                        // onClick={handleTogglenav}
                        // style={{ backgroundColor: isCollapsed ? 'B4D4FF' : 'transparent' ,marginTop:'0px'}}
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className={`navbar-collapse show`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-3">
                            <li className="nav-item" style={{ marginLeft: '20px', marginRight: '30px' }}>
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''} text-white`} aria-current="page" to="/">
                                   Home
                                </Link>
                            </li>
                            <li className="nav-item" style={{ marginRight: '15px' }}>
                                <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''} text-white`} to="/home">
                                   second home
                                </Link>
                            </li>
                            <li className="nav-item" style={{ marginRight: '15px' }}>
                                <Link className={`nav-link ${location.pathname === '/create-ride' ? 'active' : ''} text-white`} to="/create-ride">
                                create-ride
                                </Link>
                            </li>
                            <li className="nav-item " style={{ marginRight: '15px' }}>
                                <Link className={`nav-link ${location.pathname === '/list-rides' ? 'active' : ''} text-white`} to="/list-rides">
                                list-rides
                                </Link>
                            </li>
                            
                        </ul>
                        {/* <div className="mx-3">
                            {isChecked ? (
                                <FontAwesomeIcon icon={faSun} className="text-light mx-1" style={{ cursor: 'pointer' }} size="1x" onClick={handleToggle} />
                            ) : (
                                <FontAwesomeIcon icon={faMoon} style={{ cursor: 'pointer' }} size="1x" onClick={handleToggle} />
                            )}
                        </div> */}

                        {!localStorage.getItem('token') ? (
                            <form className="d-flex">
                                <Link className="btn btn-primary mx-1" to="/login" role="button" >
                                    Login
                                </Link>
                                <Link className="btn btn-primary mx-1" to="/signup" role="button" >
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <button className="btn btn-primary mx-1" onClick={handleout} role="button" >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {/* {isVieewVisible && <Warning isVieewVisible={isVieewVisible} hideleout={hideleout} handlelogout={handlelogout} isChecked={isChecked} />} */}
        </div>
    );
};

export default NavBar;
