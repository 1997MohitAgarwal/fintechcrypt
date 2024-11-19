import React from "react";
import { NavLink } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ isDarkMode,setIsDarkMode }) => {

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
      };
  return (
    <nav className={`p-4 shadow-md ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-800 text-white"}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Icon and App Name */}
        <NavLink to="/" className="flex items-center text-2xl font-semibold">
          <FaBitcoin className="mr-2" size={36} color={isDarkMode ? "#FF5722" : "#FFA500"} />
          <span>
            <span className={`${isDarkMode ? "text-gray-200" : "text-white"}`}>Crypto</span>
            <span className={`${isDarkMode ? "text-orange-500" : "text-orange-400"}`}>Tracker</span>
          </span>
        </NavLink>

        {/* Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="text-xl p-2 rounded-full focus:outline-none"
        >
          {isDarkMode ? (
            <FaSun className="text-yellow-500" />
          ) : (
            <FaMoon className="text-gray-500" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
