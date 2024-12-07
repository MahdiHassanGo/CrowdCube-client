import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";
const AddNewCampaign = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.title = "Add Campaign | CrowdCube";
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const { user } = useContext(AuthContext);

  const handleAddCampaign = (e) => {
    e.preventDefault();

    const CampaignTitle = e.target.CampaignTitle.value;
    const CampaignType = e.target.CampaignType.value;
    const Description = e.target.Description.value;
    const MinimumDonationAmount = e.target.MinimumDonationAmount.value;
    const Deadline = e.target.Deadline.value;
    const photo = e.target.photo.value;
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const newCampaign = {
      CampaignTitle,
      CampaignType,
      Description,
      MinimumDonationAmount,
      Deadline,
      photo,
      UserEmail: user?.email || "Anonymous",
      UserName: user?.displayName || "Anonymous User",
    };

    fetch("https://crowdcube-server-two.vercel.app/campaign", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Campaign added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          e.target.reset();
        }
      });
  };
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="lg:w-3/4 mx-auto mb-10" data-aos="fade-up">
        <div className="text-center p-10">
          <h1 className="text-5xl font-bold">Add campaign!</h1>
        </div>
        <div className="card bg-Profile w-full shrink-0 shadow-2xl">
          <form onSubmit={handleAddCampaign} className="card-body">
            {}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">Campaign Tittle</span>
                </label>
                <input
                  type="text"
                  name="CampaignTitle"
                  placeholder="Campaign Title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">Campaign Type</span>
                </label>
                <input
                  type="text"
                  name="CampaignType"
                  placeholder="Campaign Type"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">Description</span>
                </label>
                <input
                  type="text"
                  name="Description"
                  placeholder="Description "
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">
                    Minimum Donation Amount
                  </span>
                </label>
                <input
                  type="text"
                  name="MinimumDonationAmount"
                  placeholder="Minimum Donation Amount"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">Deadline</span>
                </label>
                <input
                  type="text"
                  name="Deadline"
                  placeholder="Deadline "
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">User Email</span>
                </label>
                <input
                  type="text"
                  name="UserEmail"
                  placeholder={user?.email || "User Email"}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-white">User Name</span>
                </label>
                <input
                  type="text"
                  name="UserName"
                  placeholder={user?.displayName || "User Name"}
                  className="input input-bordered"
                  disabled
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo url"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-Buttons">Add campaign</button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddNewCampaign;
