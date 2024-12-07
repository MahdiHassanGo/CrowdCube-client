import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "./Loading";
const MainBanner = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    document.title = "Home | CrowdCube";
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h2 className="text-center font-extrabold text-5xl mb-10">
        Our Recent Works
      </h2>
      <div className="carousel w-full mb-10 ">
        <div id="slide1" className="carousel-item relative w-full ">
          <div
            className="hero sm:min-h-[60vh] md:min-h-[80vh] bg-cover bg-center"
            data-aos="fade-up"
            style={{
              backgroundImage: "url(/assets/help.jpg)",
            }}
          >
            <div className="hero-overlay bg-black/40 "></div>
            <div className="hero-content text-neutral-content text-center px-4">
              <div className="max-w-xs sm:max-w-sm">
                <h1 className="mb-3 text-2xl sm:text-3xl  font-bold">
                  Your Little Help Can Heal Their Helps
                </h1>
                <p className="mb-3 text-sm sm:text-base">
                  Join our community of dedicated supporter by becoming member.
                  Enjoy exclusive benefit.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-3 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        {/* slider2 */}

        <div id="slide2" className="carousel-item relative w-full">
          <div
            className="hero sm:min-h-[60vh] md:min-h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/PoorChildren.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Help Children poor Insurance & Medical{" "}
                </h1>
                <p className="mb-5">
                  Join our community of dedicated supporter by becoming member.
                  Enjoy exclusive benefit.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* slider 3 */}

        <div id="slide3" className="carousel-item relative w-full">
          <div
            className="hero sm:min-h-[60vh] md:min-h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/PoorYouth.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Help us touch their lives of these youths
                </h1>
                <p className="mb-5">
                  Join our community of dedicated supporter by becoming member.
                  Enjoy exclusive benefit.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        {/* slider 4 */}

        <div id="slide4" className="carousel-item relative w-full">
          <div
            className="hero sm:min-h-[60vh] md:min-h-[80vh] bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/RaiseFund.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Raise Fund for Clean & Healthy Water
                </h1>
                <p className="mb-5">
                  Join our community of dedicated supporter by becoming member.
                  Enjoy exclusive benefit.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
