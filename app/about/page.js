'use client';

import React from 'react';
import NavBar from '../components/NavBar';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen flex flex-col text-white px-4">
      <NavBar /> {/* Navigation bar component */}
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-fixed -z-10" />

      <div className="flex-grow max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-black mt-10">About Us</h1>
        <p className="text-center mb-6 text-black">
          Welcome to Country Search – your gateway to exploring the world!
        </p>

        <div className="bg-gray-800/50 p-6 rounded shadow text-black space-y-4">
          <p>
            Country Search is a web app designed to provide quick, informative, and visually rich access to data about
            countries around the globe. Whether you're researching for a project, curious about geography, or just
            want to learn more about the world, we’ve got you covered.
          </p>

          <p>
            Our data comes from the <strong>REST Countries API</strong>, which provides detailed information including
            country names, capitals, regions, currencies, languages, and flags.
          </p>

          <p>
            We built this app with React and Tailwind CSS to ensure a fast, responsive, and visually appealing
            experience. The fixed background adds a modern and immersive feel to your exploration.
          </p>

          <p>
            This project is open-source and continually evolving. If you have suggestions, feedback, or want to
            contribute, feel free to reach out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
