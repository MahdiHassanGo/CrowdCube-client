import { useEffect, useState } from "react";

import AboutImage from "../../public/assets/Together.jpg";

import Aos from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${AboutImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      className="min-h-screen text-white "
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-12 ">
        <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1
              className="text-4xl lg:text-6xl font-bold text-Profile  mb-4  "
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
            >
              About CrowdCube
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ textShadow: "1px 2px 4px rgba(0, 0, 0, 1)" }}
            >
              A crowdfunding website is a platform where people can raise money
              for different projects, ideas, or causes by inviting others to
              contribute financially. These projects can include personal needs
              creative ideas and startups .
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="group bg-Profile p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 ease-in-out"
            data-aos="fade-up"
          >
            <div className="card-body">
              <h2 className="card-title text-4xl text-Footer">
                Personal Fundraising
              </h2>

              <p>
                Raise money for medical expenses, education, or other personal
                needs by inviting friends and family to support your cause.
              </p>
            </div>
          </div>

          <div
            className="group bg-Profile p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 ease-in-out"
            data-aos="fade-up"
          >
            <div className="card-body">
              <h2 className="card-title text-4xl text-Footer ">
                Creative Projects
              </h2>

              <p>
                Turn your ideas into reality by raising funds for films, music,
                apps, or other creative endeavors.
              </p>
            </div>
          </div>
          <div
            className="group bg-Profile p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 ease-in-out"
            data-aos="fade-up"
          >
            <div className="card-body">
              <h2 className="card-title text-4xl text-Footer">
                Startup Launch
              </h2>

              <p>
                Secure financial backing to develop and launch innovative
                products or services and grow your business.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center py-8">
          <section className="text-center py-8"></section>
        </section>
      </div>
    </div>
  );
};

export default About;
