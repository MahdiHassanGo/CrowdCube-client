import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <header className="py-3 w-11/12 mx-auto">
        <Outlet></Outlet>
      </header>

      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
