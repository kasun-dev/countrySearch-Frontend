'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

const RecentSearches = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecent(stored);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("recentSearches");
    setRecent([]);
  };

  return (
    <div className="relative min-h-screen text-white pt-[100px]">
      {/* Fixed NavBar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      {/* Fixed Background */}
      <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-fixed -z-10" />

      <div className="px-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">Recent Searches</h1>

        {recent.length === 0 ? (
          <p className="text-center text-black">No recent country name or capital searches found.</p>
        ) : (
          <>
            <ul className="max-w-md mx-auto bg-gray-800/50 p-6 rounded shadow text-black space-y-2">
              {recent.map((name, index) => (
                <li key={index} className="border-b border-gray-400 pb-1">{name}</li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <button
                onClick={handleClearHistory}
                className=" text-black text-sm hover:bg-red-500 hover:text-white  px-2 py-1 rounded "
              >
                Clear History
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecentSearches;
