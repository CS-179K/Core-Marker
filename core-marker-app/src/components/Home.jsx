import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content p-8">
        <h1 className="text-2xl font-bold mb-6">Main Content</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Replace with dynamic content as needed */}
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
          <div className="bg-gray-300 h-48"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;