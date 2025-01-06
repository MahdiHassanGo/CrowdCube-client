import React, { useState, useContext } from 'react';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FcDonate } from 'react-icons/fc';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-Profile shadow-md w-full fixed top-0 left-0 right-0 z-10 ">
        <div className="container mx-auto flex  flex-wrap justify-between items-center py-5 px-6">
          <button
            className="text-Buttons text-2xl md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <img src="./assets/CrowdCube.png" alt="" className="w-10" />
            <h1 className="font-extrabold text-2xl md:text-4xl text-Buttons">CrowdCube</h1>
          </Link>

          <ThemeToggle />

          <div
            className={`absolute top-16 left-0 w-full bg-Profile z-10 p-4 transition-all duration-300 ease-in md:static md:flex md:p-0 md:gap-6 md:w-auto ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className="flex flex-col gap-4 md:flex-row">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                      : 'text-gray-600 hover:text-Buttons'
                  }
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allcampaigns"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                      : 'text-gray-600 hover:text-Buttons'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Campaigns
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/mycampaigns"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                          : 'text-gray-600 hover:text-Buttons'
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Campaigns
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/addcampaign"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                          : 'text-gray-600 hover:text-Buttons'
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add New Campaign
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mydonation"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                          : 'text-gray-600 hover:text-Buttons'
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Donation
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Login Section */}
          <div className="flex items-center gap-4">
            <div>
              {user && user?.email ? (
                <img className="w-10 rounded-full" src={user?.photoURL} alt="User Profile" />
              ) : (
                <FaUser className="text-gray-600" />
              )}
            </div>
            <div className="text-white">
              {user ? (
                user?.displayName
              ) : (
                <NavLink
                  to="/auth/register"
                  className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
                >
                  Register
                </NavLink>
              )}
            </div>
            {user ? (
              <button
                onClick={logOut}
                className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Log Out
              </button>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
