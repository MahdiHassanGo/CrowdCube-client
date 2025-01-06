import { Link, useLoaderData, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const UpdateCampaign = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams(); 
    const campaignData = useLoaderData(); 
    const [campaign, setCampaign] = useState(campaignData || {});

    useEffect(() => {
        window.scrollTo(0, 0);
        Aos.init({ duration: 1000 });
    }, []);

    const handleUpdateCampaign = (e) => {
        e.preventDefault();

        const CampaignTitle = e.target.CampaignTitle.value;
        const CampaignType = e.target.CampaignType.value;
        const Description = e.target.Description.value;
        const MinimumDonationAmount = e.target.MinimumDonationAmount.value;
        const Deadline = e.target.Deadline.value;
        const photo = e.target.photo.value;

        const updatedCampaign = {
            CampaignTitle,
            CampaignType,
            Description,
            MinimumDonationAmount,
            Deadline,
            photo,
            UserEmail: user?.email || "Anonymous",
            UserName: user?.displayName || "Anonymous User",
        };

        
        fetch(`https://crowdcube-server-two.vercel.app/campaign/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCampaign),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Campaign updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    });
                } else {
                    Swal.fire({
                        title: 'Oops!',
                        text: 'No changes were made.',
                        icon: 'info',
                        confirmButtonText: 'Ok',
                    });
                }
            })
            .catch((error) => {
                console.error('Error updating campaign:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update the campaign.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
            });
    };

    return (
        <div>
            <Navbar />
            <div className="lg:w-3/4 mx-auto   mb-10 " data-aos="fade-up">
                <div className="text-center p-10 mt-10">
                    <h1 className="text-5xl font-bold">Update Campaign</h1>
                </div>
                <div className="card bg-Profile w-full shrink-0 shadow-2xl">
                    <form onSubmit={handleUpdateCampaign} className="card-body">
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text text-white">Campaign Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="CampaignTitle"
                                    placeholder="Campaign Title"
                                    className="input input-bordered"
                                    defaultValue={campaign.CampaignTitle}
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
                                    defaultValue={campaign.CampaignType}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text text-white">Description</span>
                                </label>
                                <textarea
                                    name="Description"
                                    placeholder="Description"
                                    className="textarea textarea-bordered"
                                    defaultValue={campaign.Description}
                                    required
                                />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text text-white">Minimum Donation Amount</span>
                                </label>
                                <input
                                    type="number"
                                    name="MinimumDonationAmount"
                                    placeholder="Minimum Donation Amount"
                                    className="input input-bordered"
                                    defaultValue={campaign.MinimumDonationAmount}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text text-white">Deadline</span>
                                </label>
                                <input
                                    type="text"
                                    name="Deadline"
                                    placeholder="Deadline"
                                    className="input input-bordered"
                                    defaultValue={campaign.Deadline}
                                    required
                                />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text text-white">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photo"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    defaultValue={campaign.photo}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn bg-Buttons mb-10">Update Campaign</button>
                            <Link to='/mycampaigns' className="btn bg-Buttons">Back </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateCampaign;
