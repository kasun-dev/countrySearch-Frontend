'use client';

import React, { useState } from 'react';

const Homepg = () => {
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const saveSearchToLocalStorage = (countries) => {
    if (searchType !== "name" && searchType !== "capital") return;

    let recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const newNames = countries
      .map(c => c.name?.common)
      .filter(name => name && !recentSearches.includes(name));
    const updatedSearches = [...recentSearches, ...newNames].slice(-20);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/${searchType}/${query}`);
      if (!res.ok) throw new Error("No countries found");
      const data = await res.json();
      setResults(data);
      saveSearchToLocalStorage(data);
    } catch (err) {
      setError("No countries found or invalid input");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCardClick = async (name) => {
    setModalLoading(true);
    setShowModal(true);
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`);
      if (!res.ok) throw new Error("Failed to load details");
      const data = await res.json();
      setSelectedCountry(data[0]);
    } catch (err) {
      setSelectedCountry(null);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCountry(null);
  };

  return (
    <div className="relative min-h-screen text-white px-4 pt-[100px]">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-fixed -z-10" />

      <h1 className="text-4xl font-bold mb-4 text-center text-black">Country Search</h1>
      <p className="mb-6 text-center text-black">Search for countries by name, region, capital, currency, or language.</p>

      {/* Search Fields */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 mb-4 w-full max-w-3xl mx-auto">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="bg-gray-900/80 text-white p-2 rounded w-full sm:w-auto"
        >
          <option value="name">Name</option>
          <option value="region">Region</option>
          <option value="capital">Capital</option>
          <option value="currency">Currency Code</option>
          <option value="lang">Language</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Enter ${searchType}`}
          className="bg-gray-900/80 text-white p-2 rounded w-full sm:w-auto placeholder-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-black mb-4 text-center">Searching...</p>}
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
      {!loading && results.length > 0 && (
        <p className="mb-4 text-center text-black text-sm">Found {results.length} result(s)</p>
      )}

      {/* Country Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto pb-10 text-black">
        {results.map((country, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(country.name.common)}
            className="bg-gray-800/50 p-4 rounded shadow cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{country.name?.common}</h2>
            <img src={country.flags?.png} alt={country.name?.common} className="w-20 mx-auto mb-2" />
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Currency:</strong> {
              country.currencies
                ? Object.values(country.currencies).map((c) => `${c.name} (${c.symbol})`).join(", ")
                : 'N/A'
            }</p>
            <p><strong>Languages:</strong> {
              country.languages
                ? Object.values(country.languages).join(", ")
                : 'N/A'
            }</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button onClick={closeModal} className="absolute top-2 right-2 text-black text-2xl font-bold">&times;</button>
            {modalLoading ? (
              <p>Loading country details...</p>
            ) : selectedCountry ? (
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedCountry.name?.official}</h2>
                <img src={selectedCountry.flags?.png} alt={selectedCountry.name?.common} className="w-32 mb-4" />
                <p><strong>Common Name:</strong> {selectedCountry.name?.common}</p>
                <p><strong>Native Name:</strong> {
                  selectedCountry.name?.nativeName
                    ? Object.values(selectedCountry.name.nativeName).map(n => n.common).join(", ")
                    : 'N/A'
                }</p>
                <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {selectedCountry.region}</p>
                <p><strong>Subregion:</strong> {selectedCountry.subregion || 'N/A'}</p>
                <p><strong>Capital:</strong> {selectedCountry.capital?.[0] || 'N/A'}</p>
                <p><strong>Timezones:</strong> {selectedCountry.timezones?.join(", ")}</p>
                <p><strong>Area:</strong> {selectedCountry.area} km²</p>
                <p><strong>Languages:</strong> {
                  selectedCountry.languages
                    ? Object.values(selectedCountry.languages).join(", ")
                    : 'N/A'
                }</p>
                <p><strong>Currencies:</strong> {
                  selectedCountry.currencies
                    ? Object.values(selectedCountry.currencies).map(c => `${c.name} (${c.symbol})`).join(", ")
                    : 'N/A'
                }</p>
                <p><strong>Top Level Domain:</strong> {selectedCountry.tld?.join(", ")}</p>
                <p><strong>Start of Week:</strong> {selectedCountry.startOfWeek || 'N/A'}</p>
                <p><strong>Google Maps:</strong> <a href={selectedCountry.maps?.googleMaps} target="_blank" className="text-blue-600 underline">View Map</a></p>
              </div>
            ) : (
              <p>Failed to load details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepg;
