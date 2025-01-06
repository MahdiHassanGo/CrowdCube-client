import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { FaFilter, FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("Default");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          "https://crowdcube-server-two.vercel.app/campaign"
        );
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    document.title = "All Campaign | CrowdCube";
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortOrder(selectedValue);

    if (selectedValue === "Low to High") {
      const sortedCampaigns = [...campaigns].sort((a, b) => {
        return a.MinimumDonationAmount - b.MinimumDonationAmount;
      });
      setCampaigns(sortedCampaigns);
    } else if (selectedValue === "High to Low") {
      const sortedCampaigns = [...campaigns].sort((a, b) => {
        return b.MinimumDonationAmount - a.MinimumDonationAmount;
      });
      setCampaigns(sortedCampaigns);
    } else {
      // Default sorting (no sorting)
      const fetchCampaigns = async () => {
        try {
          const response = await fetch(
            "https://crowdcube-server-two.vercel.app/campaign"
          );
          const data = await response.json();
          setCampaigns(data);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        }
      };
      fetchCampaigns();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen mt-10" data-aos="fade-up">
        <div className="mt-10 w-11/12 mx-auto flex-grow">
          <h2 className="text-3xl text-center font-bold">All Campaigns</h2>

          <div className="mb-4 flex justify-center">
         
         <div className="mt-14 mr-3">
         <FaFilter/>
          </div>
            <select
              className="select select-bordered w-full max-w-xs mt-10"
              value={sortOrder}
              onChange={handleSortChange}
            >
             
              <option disabled selected>
                Default
              </option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-6">
            {campaigns.length > 0 ? (
              campaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  className="card card-compact bg-white dark:bg-gray-800 w-full sm:w-80 md:w-96 shadow-xl mb-6"
                  data-aos="fade-up"
                >
                  <figure>
                    <img
                      className="w-full h-48 object-cover"
                      src={campaign.photo || "https://via.placeholder.com/150"}
                      alt={campaign.CampaignTitle || "Campaign"}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-center dark:text-white">
                      {campaign.CampaignTitle}
                    </h2>
                    <p className="dark:text-white">{campaign.description}</p>
                    <progress
                      className="progress w-56"
                      value={campaign.MinimumDonationAmount * 100}
                      max="200"
                    ></progress>
                    <p className="dark:text-white">
                      Minimum Donation: {campaign.MinimumDonationAmount}$
                    </p>
                    <p className="dark:text-white">
                      Deadline: {campaign?.Deadline}
                    </p>
                    <p className="dark:text-white">
                      Campaign Type: {campaign?.CampaignType}
                    </p>

                    <Link
                      to={`/campaigndetails/${campaign._id}`}
                      className="btn dark:bg-gray-600 dark:hover:bg-gray-500"
                    >
                      See More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No campaigns found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCampaigns;
