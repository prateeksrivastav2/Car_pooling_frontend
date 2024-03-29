import { Helmet, HelmetProvider } from "react-helmet-async";
import Banner from "../../components/Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import ServiceCard from "./ServiceCard";
import toast from "react-hot-toast";
import Title from "../../components/shared/Title";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import Faq from "./Faq";
import Partners from "./Partners";
import Owner from "./Owner";
import Download from "./Download";
import useAxios from "../../hooks/useAxios";
import Location from "./Location";

const Home = () => {
  const axios = useAxios();
  const {
    isPending,
    isError,
    error,
    data: services,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get("/services");
      return res.data;
    },
  });

  // If data is not Loaded yet
  if (isPending) return <Loader />;

  // If any error is encountered
  if (isError) {
    toast.error("Something went wrong");
    console.log(error);
    return;
  }
  return (
    <HelmetProvider>
      <Helmet>
        <title>RideRelay | Home</title>
      </Helmet>
      <main className="">
        {/* Banner */}
        <section className="py-2 bg-cyan-50">
          <div className="max-w-screen-xl mx-auto px-3">
            <Banner />
          </div>
        </section>

        {/* Services */}
        <section className="py-10 bg-gray-100">
          <div className="max-w-screen-xl mx-auto px-3">
            <Title className="my-5">Our Latest Services</Title>
            {services && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {services.slice(0, 4).map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            )}

            <Link to="/services">
              <Button color="purple" outline className="mt-5 mx-auto">
                All Services
              </Button>
            </Link>
          </div>
        </section>

        {/* Partners */}
        <section className="py-10 border-t">
          <div className="max-w-screen-xl mx-auto px-3">
            <Title className="my-5">Our Partners</Title>
            <Partners />
          </div>
        </section>

        {/* Owner */}
        <section className="py-10 bg-cyan-50">
          <div className="max-w-screen-xl mx-auto px-3">
            <Title className="my-5">Founder</Title>
            <Owner />
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
            <Title className="my-5">Contact Us</Title>
            <Location />
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Home;
