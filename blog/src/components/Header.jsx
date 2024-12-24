import React, { useState } from 'react';
import logo from '../assets/51.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false); // Simulate profile creation state
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCreateBlogClick = () => {
    if (profileCreated) {
      navigate('/admin'); // Redirect to admin dashboard if profile exists
    } else {
      navigate('/createprofile'); // Redirect to create profile page
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-lg">
      {/* Logo Section */}
      <div className="text-xl font-bold">
        <a>
          <img src={logo} alt="Logo" className="w-[130px] h-[30px]" />
        </a>
      </div>

      {/* User Profile Section */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          <span>Create Blog</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414L9.586 4a1 1 0 111.414 1.414L7.414 9H17a1 1 0 110 2H7.414l3.586 3.586a1 1 0 01-1.414 1.414l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-700">
            <form className="px-4 py-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                placeholder="Enter username"
              />

              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                placeholder="Enter email"
              />


              <button
                type="button"
                onClick={handleCreateBlogClick}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Blog
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
