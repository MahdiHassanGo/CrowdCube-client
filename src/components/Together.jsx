import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { RiRadioButtonLine } from "react-icons/ri";
import Loading from './Loading';

const Together = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('https://crowdcube-server-two.vercel.app/campaign');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    if (!fetchCampaigns) return <p><Loading/></p>;
    fetchCampaigns();
    
  }, []);

  return (
    
    <div className="hero bg-together px-4 md:px-8 min-h-screen flex flex-col mb-10 mt-10" data-aos="fade-up">
    
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-black mt-10">Running Campaign</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-10 mt-10 pb-10">
        {campaigns.slice(0,6).map((campaign) => (
          <div
            key={campaign._id}
            className="card card-compact bg-Profile w-full sm:w-80 md:w-96 shadow-xl"
            data-aos="fade-up"
          >
            <figure>
              <img
                className="w-full h-48 object-cover"
                src={campaign.photo || 'https://via.placeholder.com/150'} 
                alt={campaign.title || 'Campaign'}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-center">{campaign.CampaignTitle}</h2>
              <p>{campaign.description}</p>
              <progress
                className="progress w-56"
                value={(campaign.MinimumDonationAmount) * 100}
                max="200"
              ></progress>
              <p>
                Minmum Donation:{campaign.MinimumDonationAmount}$
              </p>
              <p>Status: <span className='text-green-400'> Active</span> </p>
              <Link to={`/campaigndetails/${campaign._id}`} className="btn">
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Together;