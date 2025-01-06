import React, { useState, useEffect, useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider"; 
import Swal from 'sweetalert2';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Loading from "../components/Loading";

const MyCampaigns = () => {
  const loadedCampaigns = useLoaderData();
  const [campaigns, setCampaigns] = useState(loadedCampaigns);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 1000 });
}, []);
useEffect(() => {
  document.title = "My Campaign | CrowdCube";
}, []);

setTimeout(()=>{
  setIsLoading(false);
},2000)
  const { user } = useContext(AuthContext);  
  const userCampaigns = campaigns.filter(
    (campaign) => campaign.UserEmail === user?.email
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        fetch(`https://crowdcube-server-two.vercel.app/campaign/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your campaign has been deleted.",
                icon: "success",
              });
              setCampaigns((prev) =>
                prev.filter((campaign) => campaign._id !== id)
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting campaign:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the campaign.",
              icon: "error",
            });
          })
          .finally(() =>
          
           
            
           
            setIsDeleting(false));
      }
    });
  };
  
  
  if (isLoading) {
    return <Loading />;
  } 
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-10 w-11/12 mx-auto flex-grow" data-aos="fade-up">
        <h2 className="text-3xl text-center">My Campaign</h2>

     
        <div className="text-center mt-4">
          <p>Email: {user?.email || "Not logged in"}</p>
          <p>Username: {user?.displayName || "Anonymous"}</p>
        </div>

        <div className="overflow-auto mt-6">
          <table className="min-w-full table-auto">
         
            <thead>
              <tr className="bg-gray-200">
                <th></th>
                <th></th>

                <th className="p-2 text-black dark:text-black">Campaign Title</th>
                <th className="p-2 text-black dark:text-black">Deadline</th>
                <th className="p-2 text-black dark:text-black">Minimum Donation Amount</th>
                <th className="p-2 text-black dark:text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
           
              {userCampaigns.length > 0 ? (
                userCampaigns.map((campaign) => (
                  <tr key={campaign._id}>
                    <th></th>
                    <td><img className='w-8 h-8 rounded-full object-cover' src={campaign.photo} alt="" /></td>
                    <td className="p-2 whitespace-wrap">{campaign.CampaignTitle}</td>
                    <td className="p-2 whitespace-wrap">{campaign.Deadline}</td>
                    <td className="p-2 whitespace-wrap">{campaign.MinimumDonationAmount}</td>
                    <td className="p-2 ">
                      <Link to={`/updatecampaign/${campaign._id}`} className="btn ml-40  bg-Profile text-white">Update</Link>
                      <button
                        onClick={() => handleUserDelete(campaign._id)}
                        className="btn ml-10 bg-Profile text-white"
                        disabled={isDeleting}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No campaigns found for this user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCampaigns;
