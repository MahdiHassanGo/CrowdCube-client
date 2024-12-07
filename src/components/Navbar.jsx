import React, { useContext } from 'react';

import { FaUser } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FcDonate } from 'react-icons/fc';
import ThemeToggle from './ThemeToggle';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <div>
             <nav className="bg-Profile shadow-md w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
        {}
        <Link to="/" className="flex items-center gap-2">
          <FcDonate  className="text-6xl text-Buttons" />
          <h1 className="font-extrabold text-4xl text-Buttons">CrowdCube</h1>
        </Link>
        <ThemeToggle></ThemeToggle>

        <div className="nav flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-4 md:mt-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                : 'text-gray-600 hover:text-Buttons'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allcampaigns"
            className={({ isActive }) =>
              isActive
                ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                : 'text-gray-600 hover:text-Buttons'
            }
          >
            All Campaigns
          </NavLink>
          <NavLink
            to="/mycampaigns"
            className={({ isActive }) =>
              isActive
                ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                : 'text-gray-600 hover:text-Buttons'
            }
          >
            My Campaigns
          </NavLink>
          <NavLink
            to="/addcampaign"
            className={({ isActive }) =>
              isActive
                ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                : 'text-gray-600 hover:text-Buttons'
            }
          >
            Add New Campaign
          </NavLink>
          <NavLink
            to="/mydonation"
            className={({ isActive }) =>
              isActive
                ? 'text-Buttons font-semibold border-b-2 border-Buttons pb-1'
                : 'text-gray-600 hover:text-Buttons'
            }
          >
            My Donation
          </NavLink>
        </div>

    
        <div className="login flex items-center gap-4 mt-4 md:mt-0">
          <div>
            {user && user?.email ? <div><img className='w-10 rounded-full' src={user?.photoURL} alt="" /></div>: <FaUser />}
            
            </div>
          <div className="text-white">{user?(user?.displayName):( <NavLink
              to="/auth/register"
              className="bg-Buttons text-black py-2 px-4 rounded hover:bg-opacity-90 transition"
            >
              Register
            </NavLink>)}</div>
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