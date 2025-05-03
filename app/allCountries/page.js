'use client';

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/footer";

const AllCountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const sortedData = data.sort((a, b) =>
          a.name?.common.localeCompare(b.name?.common)
        );
        setCountries(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch countries:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10 text-white">Loading countries...</div>;

  return (
    <div className="p-2  text-white relative z-0">
        <NavBar /> {/* Navigation bar component */}
      {/* Fixed background that stays still when scrolling */}
      <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center -z-10" />

      <h1 className="text-3xl font-bold mb-4 text-center">All Countries</h1>
      <div className="overflow-x-auto max-h-[80vh] overflow-y-auto">
        <table className="min-w-full border border-gray-700 bg-black/30 text-black">
          <thead className="bg-gray-800 sticky top-0 z-10">
            <tr className="text-left text-white">
              <th className="p-2 border border-gray-500">Flag</th>
              <th className="p-2 border border-gray-500">Name</th>
              <th className="p-2 border border-gray-500">Capital</th>
              <th className="p-2 border border-gray-500">Currency</th>
              <th className="p-2 border border-gray-500">Languages</th>
              <th className="p-2 border border-gray-500">Area (km²)</th>
              <th className="p-2 border border-gray-500">Population</th>
              <th className="p-2 border border-gray-500">Region</th>
              <th className="p-2 border border-gray-500">Map</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index} className="hover:bg-gray-700 transition-colors">
                <td className="p-2 border border-gray-700">
                  <img src={country.flags?.png} alt={country.name?.common} width={50} />
                </td>
                <td className="p-2 border border-gray-700">{country.name?.common}</td>
                <td className="p-2 border border-gray-700">{country.capital?.[0] || 'N/A'}</td>
                <td className="p-2 border border-gray-700">
                  {country.currencies
                    ? Object.values(country.currencies).map((c, i) => (
                        <div key={i}>{c.name} ({c.symbol})</div>
                      ))
                    : 'N/A'}
                </td>
                <td className="p-2 border border-gray-700">
                  {country.languages
                    ? Object.values(country.languages).join(", ")
                    : 'N/A'}
                </td>
                <td className="p-2 border border-gray-700">{country.area?.toLocaleString()} km²</td>
                <td className="p-2 border border-gray-700">{country.population?.toLocaleString()}</td>
                <td className="p-2 border border-gray-700">{country.region}</td>
                <td className="p-2 border border-gray-700">
                  <a
                    href={country.maps?.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Map
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
};

export default AllCountriesPage;
