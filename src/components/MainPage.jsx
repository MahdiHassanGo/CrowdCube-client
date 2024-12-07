import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const MainPage = () => {
  return (
    <div className="hero bg-together mb-10 min-h-screen" data-aos="fade-up">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="./assets/MainPage-2.png"
          className="md:max-w-xl rounded-lg "
          data-aos="fade-left"
        />
        <div>
          <h1 className="text-5xl font-bold">
            Donate For A Better {""}{" "}
            <span className="text-yellow-500">
              <Typewriter
                words={["World", "People", "Humanity"]}
                loop={true}
                cursor={true}
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              ></Typewriter>
            </span>{" "}
          </h1>
          <p className="py-6">
            Explore the variety of volunteer opportunities available. From event
            planning and fundraising to fieldwork and administrative support
          </p>

          <Link to="/AllCampaigns" className="btn bg-Profile text-white">
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
