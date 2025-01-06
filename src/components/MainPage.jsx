import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion"; // Import motion from framer-motion

const MainPage = () => {
  return (
    <div
      className="hero min-h-screen bg-cover bg-center bg-no-repeat sm:bg-contain lg:bg-cover"
      style={{ backgroundImage: `url('./assets/Homepage.jpg')` }}
      data-aos="fade-up"
    >
      <div className="hero-overlay bg-opacity-70 bg-black"></div>
      <div className="hero-content flex-col lg:flex-row-reverse text-white max-w-6xl mx-auto">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Donate For A Better{" "}
            <span className="text-yellow-500">
              <Typewriter
                words={["World", "People", "Humanity"]}
                loop={true}
                cursor={true}
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>

         
          <motion.p
            className="py-6"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }} 
          >
            Explore the variety of volunteer opportunities available. From event
            planning and fundraising to fieldwork and administrative support.
          </motion.p>

          <Link to="/AllCampaigns" className="btn bg-Profile text-white">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
