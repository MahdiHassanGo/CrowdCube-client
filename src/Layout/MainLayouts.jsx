import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import MainBanner from "../components/MainBanner";
import Together from "../components/Together";

import Loading from "../components/Loading";
import MainPage from "../components/MainPage";
import FeaturedVideo from "../components/FeaturedVideo";
import About from "../components/About";

const MainLayouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar></Navbar>

      <div className="mt-10 w-11/12 mx-auto">
        <MainPage></MainPage>
        <MainBanner></MainBanner>

        <Together></Together>
        <FeaturedVideo></FeaturedVideo>
        <About></About>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
