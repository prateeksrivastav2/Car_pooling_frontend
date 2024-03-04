/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import Banner from "./Banner/Banner";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Faq from "../pages/Home/Faq";
import Partners from "../pages/Home/Partners";
import Owner from "../pages/Home/Owner";
import Download from "../pages/Home/Download";
import Location from "../pages/Home/Location";
import Title from "../components/shared/Title.jsx";
import Footer from "../components/Footer/Footer.jsx";
const Home = () => {
  const [user, setuser] = useState(null);
  const fetchusre = async () => {
    const response = await fetch("http://localhost:3000/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      // body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    console.log(json);
    setuser(json);
  };

  useEffect(() => {
    fetchusre();
  }, []);

  return (
    // <div style={{ marginTop: "34vh" }}>Welcome {user ? user.username : ""}</div>
    <HelmetProvider>
      <Helmet>
        <title>RideRelay | Home</title>
      </Helmet>
      <main className="">
        {/* Banner */}
        <section className="py-10 bg-cyan-50">
          <div className="max-w-screen-xl mx-auto px-3">
            <Banner />
          </div>
        </section>

        {/* Partners */}
        <section className="py-10 border-t">
          <div className="max-w-screen-xl mx-auto px-3">
            <Title className="my-5">Our Partners</Title>
            <Partners />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 border-t">
          <div className="max-w-screen-xl mx-auto px-3">
            <Title className="my-5">Frequently Asked Questions</Title>
            <Faq />
          </div>
        </section>

        {/* Dowload Our App */}
        <section className="py-10 bg-gray-100">
          <div className="max-w-screen-xl mx-auto px-3">
            <Download />
          </div>
        </section>

        {/* Contact Us */}
        <section className="py-10">
          <div className="max-w-screen-xl mx-auto px-3">
            <Title className="my-5 ">Contact Us</Title>
            <Location />
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-screen-xl mx-auto px-3">
            <Footer />
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Home;
