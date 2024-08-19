import React from "react";
import Navbar from "./Navbar";
import logo from "./logo.png"; // Adjust path as needed
import avatar from "./avatar.png"; // Adjust path as needed or use a placeholder image

const Profile = () => {
  return (
    <div className="profile-page">
      {/* Logo and Navbar */}
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <img src={logo} alt="Logo" className="h-8" />
        <Navbar />
        <img src={avatar} alt="Avatar" className="h-8 rounded-full" />
      </header>

      {/* Profile Section */}
      <section className="bg-white p-8 shadow-md">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mr-8"
          />
          <div>
            <h1 className="text-2xl font-bold">User Name</h1>
            <div className="flex space-x-4 text-gray-600 mt-2">
              <span>Following: 120</span>
              <span>Followers: 300</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder for grid items */}
        <div className="bg-gray-300 h-48"></div>
        <div className="bg-gray-300 h-48"></div>
        <div className="bg-gray-300 h-48"></div>
        <div className="bg-gray-300 h-48"></div>
        <div className="bg-gray-300 h-48"></div>
        <div className="bg-gray-300 h-48"></div>
      </section>
    </div>
  );
};

export default Profile;
