import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  const [isDeleting, setIsDeleting] = useState(false);

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
    window.scrollTo(0, 0);
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

  const sortCampaigns = () => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      return sortOrder === "asc"
        ? a.MinimumDonationAmount - b.MinimumDonationAmount
        : b.MinimumDonationAmount - a.MinimumDonationAmount;
    });
    setCampaigns(sortedCampaigns);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen" data-aos="fade-up">
        <div className="mt-10 w-11/12 mx-auto flex-grow">
          <h2 className="text-3xl text-center font-bold">All Campaigns</h2>
          <button
            onClick={sortCampaigns}
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
            <table className="table table-zebra w-full mb-10">
              <thead>
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Campaign Title</th>
                  <th>Deadline</th>
                  <th>Minimum Donation Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.length > 0 ? (
                  campaigns.map((campaign) => (
                    <tr key={campaign._id}>
                      <td>
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          src={campaign.photo}
                          alt=""
                        />
                      </td>
                      <td>{campaign.UserEmail}</td>
                      <td>{campaign.UserName}</td>
                      <td>{campaign.CampaignTitle}</td>
                      <td>{campaign.Deadline}</td>
                      <td>{campaign.MinimumDonationAmount}</td>
                      <td className="space-x-4">
                        <Link
                          to={`/campaigndetails/${campaign._id}`}
                          className="btn bg-Profile btn-sm text-white"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No campaigns found.
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

export default AllCampaigns;