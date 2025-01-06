import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Donation from "../Donation.json";
import Lottie from "lottie-react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

const MyDonation = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    document.title = "My Donation | CrowdCube";
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
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchDonations();
  }, [user]);

  if (isLoading) return <Loading />;

  if (error) return <div className="error-message">{error}</div>;

  const sortDonations = () => {
    const sortedDonations = [...donations].sort((a, b) => {
      return sortOrder === "asc"
        ? a.minimumDonationAmount - b.minimumDonationAmount
        : b.minimumDonationAmount - a.minimumDonationAmount;
    });
    setDonations(sortedDonations);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Navbar />
      <div
        className="hero  px-4 md:px-8 min-h-screen flex flex-col mb-10 mt-10"
        data-aos="fade-up"
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            
              <Lottie
                className="md:ml-10 w-[30vh]"
                loop={true}
                animationData={Donation}
              />
           
          </div>
        </div>

        <div className="w-11/12 mx-auto flex-grow">
          <button
            onClick={sortDonations}
            className="mx-auto px-4 py-2 bg-Profile text-white rounded hover:bg-Footer transition-all mb-4 flex items-center justify-center font-charm mt-10"
          >
            {sortOrder === "asc" ? (
              <>
                <FaLongArrowAltUp className="mr-2" />
                Sort (Low to High)
              </>
            ) : (
              <>
                <FaLongArrowAltDown className="mr-2" />
                Sort (High to Low)
              </>
            )}
          </button>

          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto">
            <thead>
  <tr className="bg-gray-200 dark:bg-gray-800">
    <th></th>
    <th></th>
    <th className="p-2 text-black dark:text-white">Campaign Title</th>
    <th className="p-2 text-black dark:text-white">Donated Amount</th>
    <th className="p-2 text-black dark:text-white">Minimum Donation Amount</th>
    <th className="p-2 text-black dark:text-white">Actions</th>
  </tr>
</thead>
              <tbody>
                {donations.length > 0 ? (
                  donations.map((donation) => (
                    <tr key={donation._id}>
                      <td>
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={donation?.campaignImage || "https://via.placeholder.com/150"}
                          alt={donation.CampaignTitle || "donation"}
                        />
                      </td>
                      <td>{donation.userEmail}</td>
                      <td>{donation.username}</td>
                      <td>{donation.CampaignTitle}</td>
                      <td>{donation.donatedAmount}</td>
                      <td>{donation.minimumDonationAmount}</td>
                      <td className="space-x-4">
                      
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No donations found for your account.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyDonation;
