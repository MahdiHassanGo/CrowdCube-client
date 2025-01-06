import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Aos from "aos";
import "aos/dist/aos.css";

const MainBanner = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    document.title = "Home | CrowdCube";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={800}
        emulateTouch
      >
        {/* Slide 1 */}
        <div
          className="relative w-full h-[60vh] sm:h-[80vh] lg:h-[100vh] bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/help.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="flex justify-center items-center h-full text-white px-4">
            <div className="text-center max-w-xs sm:max-w-sm">
              <h1 className="mb-3 text-2xl sm:text-3xl font-bold text-white">
                Your Little Help Can Heal Their Hopes
              </h1>
              <p className="mb-3 text-sm sm:text-base text-white">
                Join our community of dedicated supporters by becoming a member.
                Enjoy exclusive benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="relative w-full h-[60vh] sm:h-[80vh] lg:h-[100vh] bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/PoorChildren.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="flex justify-center items-center h-full text-white px-4">
            <div className="text-center max-w-md">
              <h1 className="mb-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Help Children with Insurance & Medical Needs
              </h1>
              <p className="mb-5 text-white">
                Join our community of dedicated supporters by becoming a member.
                Enjoy exclusive benefits.
              </p>
            </div>
          </div>
        </div>

    
        <div
          className="relative w-full h-[60vh] sm:h-[80vh] lg:h-[100vh] bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/PoorYouth.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="flex justify-center items-center h-full text-white px-4">
            <div className="text-center max-w-md">
              <h1 className="mb-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Help Us Touch the Lives of These Youths
              </h1>
              <p className="mb-5 text-white">
                Join our community of dedicated supporters by becoming a member.
                Enjoy exclusive benefits.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 4 */}
        <div
          className="relative w-full h-[60vh] sm:h-[80vh] lg:h-[100vh] bg-cover bg-center"
          style={{ backgroundImage: "url(/assets/RaiseFund.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="flex justify-center items-center h-full text-white  px-4">
            <div className="text-center max-w-md">
              <h1 className="mb-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Raise Funds for Clean & Healthy Water
              </h1>
              <p className="mb-5 text-white">
                Join our community of dedicated supporters by becoming a member.
                Enjoy exclusive benefits.
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default MainBanner;
