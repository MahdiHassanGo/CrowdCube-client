import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "../components/Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CampaignDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [open, setOpen] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [showMinDonationModal, setShowMinDonationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsDeadlinePassed(false);
    setShowMinDonationModal(false);
    setShowSuccessModal(false);
  };

  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Detail | CrowdCube";
  }, []);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(
          `https://crowdcube-server-two.vercel.app/campaign/${id}`
        );
        const data = await response.json();
        setCampaign(data);
        setDonationAmount(data.MinimumDonationAmount || 0);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchCampaign();
  }, [id]);

  const { user } = useContext(AuthContext);

  const handleDonate = async () => {
    if (!user) {
      toast.error("Please log in to donate.");
      return;
    }

    const campaignDeadline = new Date(campaign?.Deadline);
    const currentDate = new Date();

    if (campaignDeadline < currentDate) {
      setIsDeadlinePassed(true);
      return;
    }

    if (donationAmount < campaign.MinimumDonationAmount) {
      setShowMinDonationModal(true);
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      CampaignTitle: campaign.CampaignTitle,
      userEmail: user.email,
      username: user.displayName,
      photo: user.photo,
      campaignImage: campaign.photo,
      minimumDonationAmount: campaign.MinimumDonationAmount,
      donatedAmount: donationAmount,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://crowdcube-server-two.vercel.app/donate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationData),
        }
      );

      if (response.ok) {
        setShowSuccessModal(true);
        setDonationAmount(campaign.MinimumDonationAmount);
      } else {
        const errorData = await response.json();
        console.error("Failed to process the donation:", errorData.message);
        toast.error("Failed to process the donation.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast.error("An error occurred while donating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />

      <div
        className="w-full lg:w-8/12 mx-auto py-16 bg-gray-100 mb-10 shadows-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-Buttons mb-6">
          {campaign?.title}
        </h2>
        <div className="flex items-center justify-center mb-6">
          <img
            src={campaign?.photo}
            alt={campaign?.title}
            className="w-11/12 lg:w-1/2 object-cover rounded-lg mb-6"
          />
        </div>
        <p className="text-black text-lg sm:text-xl px-4 mb-4 font-bold text-center">
          {campaign?.CampaignTitle}
        </p>
        <p className="text-black text-lg sm:text-xl px-4 mb-4 font-light text-center">
          {campaign?.Description}
        </p>
        <p className="text-black text-lg sm:text-xl px-4 mb-4 font-light text-center">
          Min Amount: {campaign?.MinimumDonationAmount}$
        </p>
        <p className="text-black text-lg sm:text-xl px-4 mb-4 font-light text-center">
          Deadline: {campaign?.Deadline}
        </p>
        <p className="text-black text-lg sm:text-xl px-4 mb-4 font-light text-center">
          Campaign Type: {campaign?.CampaignType}
        </p>

        <div className="flex flex-col items-center">
          <label className="text-black text-lg sm:text-xl mb-4">
            Donation Amount:
          </label>
          <input
            type="text"
            value={donationAmount}
            min={campaign?.MinimumDonationAmount || 0}
            onChange={(e) => setDonationAmount(Number(e.target.value))}
            className="border rounded px-4 py-2 mb-6"
          />
          <div className="flex justify-center gap-10">
            <Link to="/" className="btn bg-Buttons text-black">
              Back
            </Link>
            <button
              className={`btn bg-Buttons text-black ${
                isSubmitting ? "opacity-50" : ""
              }`}
              onClick={handleDonate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Donate"}
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal for minimum donation */}
      <Modal
        aria-labelledby="min-donation-modal-title"
        aria-describedby="min-donation-modal-description"
        open={showMinDonationModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showMinDonationModal}>
          <Box sx={style}>
            <Typography
              id="min-donation-modal-title"
              variant="h6"
              component="h2"
              className="text-center font-bold mb-4"
            >
              Minimum Donation Amount
            </Typography>
            <Typography
              className="text-center"
              id="min-donation-modal-description"
              sx={{ mt: 2 }}
            >
              The donation amount must be at least $
              {campaign?.MinimumDonationAmount}.
            </Typography>
            <div className="flex justify-center mt-4">
              <button
                className="btn bg-Buttons text-black"
                onClick={handleClose}
              >
                OK
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Modal for deadline crossed */}
      <Modal
        aria-labelledby="deadline-crossed-modal-title"
        aria-describedby="deadline-crossed-modal-description"
        open={isDeadlinePassed}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isDeadlinePassed}>
          <Box sx={style}>
            <Typography
              id="deadline-crossed-modal-title"
              variant="h6"
              component="h2"
              className="text-center font-bold mb-4"
            >
              Campaign Deadline Passed
            </Typography>
            <Typography
              className="text-center"
              id="deadline-crossed-modal-description"
              sx={{ mt: 2 }}
            >
              Unfortunately, the deadline for this campaign has passed. You can
              no longer donate.
            </Typography>
            <div className="flex justify-center mt-4">
              <Link to="/">
                <button
                  className="btn bg-Buttons text-black"
                  onClick={handleClose}
                >
                  OK
                </button>
              </Link>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Modal for successful donation */}
      <Modal
        aria-labelledby="donation-success-modal-title"
        aria-describedby="donation-success-modal-description"
        open={showSuccessModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showSuccessModal}>
          <Box sx={style}>
            <Typography
              id="donation-success-modal-title"
              variant="h6"
              component="h2"
              className="text-center font-bold mb-4"
            >
              Donation Successful
            </Typography>
            <Typography
              className="text-center"
              id="donation-success-modal-description"
              sx={{ mt: 2 }}
            >
              Thank you for your donation! Your contribution will help the
              campaign achieve its goal.
            </Typography>
            <div className="flex justify-center mt-4">
              <Link to="/">
                <button
                  className="btn bg-Buttons text-black"
                  onClick={handleClose}
                >
                  OK
                </button>
              </Link>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CampaignDetails;
