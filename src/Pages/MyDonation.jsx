import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { RiRadioButtonLine } from "react-icons/ri";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Donation from "../Donation.json"
import Lottie from "lottie-react";

const MyDonation = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    document.title = "My Donation| CrowdCube";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchDonations = async () => {
      if (user && user.email) {
        try {
          const response = await fetch(
            `https://crowdcube-server-two.vercel.app/donate?email=${user.email}`
          );
          const data = await response.json();

          if (response.ok) {
            setDonations(data);
          } else {
            setError("Failed to fetch donations.");
          }
        } catch (err) {
          setError("Error fetching donations: " + err.message);
        } finally {
            setTimeout(()=>{
                setIsLoading(false);
              },2000)
       
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  if (isLoading) return <Loading />;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <Navbar />
      <div
        className="hero bg-together px-4 md:px-8 min-h-screen flex flex-col mb-10 mt-10"
        data-aos="fade-up"
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-black mt-10">
              My Donations   <Lottie className='md:ml-10 w-[30vh]' loop={true} animationData={Donation}></Lottie>
            </h1>
          
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-10 pb-10">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <div
                key={donation._id}
                className="card card-compact bg-Profile w-full sm:w-80 md:w-96 shadow-xl"
                data-aos="fade-up"
              >
                <figure>
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      donation?.campaignImage ||
                      "https://via.placeholder.com/150"
                    }
                    alt={donation.title || "donation"}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-center text-white ">
                    {donation.CampaignTitle}
                  </h2>
                  <p className="text-white">Min Amount: {donation.minimumDonationAmount}$</p>
                  <p className="text-white">Donated: {donation.donatedAmount}$</p>

                  <p className="text-white">User: {donation.username}</p>
                  <p className="text-white">User Email: {donation.userEmail} </p>
                 
                </div>
            
              </div>
            ))
          ) : (
            <p>No donations found for your account.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyDonation;
