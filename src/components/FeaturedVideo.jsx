import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const FeaturedVideo = () => {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, []);

    return (
        <div className="w-11/12 mx-auto py-12">

            <h2 className="text-3xl sm:text-6xl  font-bold text-center text-Profile mb-10">
                Featured Video
            </h2>

            <div className="flex justify-center items-center">

                <div 
                data-aos="flip-down"
                className="group w-full max-w-3xl bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-transform duration-300 ease-in-out">
                   <iframe width="100%" height="415" src="https://www.youtube.com/embed/6QwTOqADnko?si=eAEs5NtAiKYzUIgw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
            <p className="text-center text-xl text-Profile font-bold mt-6">
                Learn About Us and strategies for advancing your donation with this expert-led video!
            </p>
        </div>
    );
};

export default FeaturedVideo;