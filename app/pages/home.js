'use client';

import React, { useState } from 'react';

const Homepg = () => {
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper: Save to localStorage only if type is name or capital
  const saveSearchToLocalStorage = (countries) => {
    if (searchType !== "name" && searchType !== "capital") return;

    let recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");

    const newNames = countries
      .map(c => c.name?.common)
      .filter(name => name && !recentSearches.includes(name));

    const updatedSearches = [...recentSearches, ...newNames].slice(-20); // Keep only latest 20
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

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen text-white px-4 pt-[100px]">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-fixed -z-10" />

      <h1 className="text-4xl font-bold mb-4 text-center text-black">Country Search</h1>
      <p className="mb-6 text-center text-black">Search for countries by name, region, capital, currency, or language.</p>

      {/* Search Fields with Responsiveness */}
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
          onKeyDown={handleKeyDown} // Trigger search on Enter key
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

      {/* Display Country Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mx-auto pb-10 text-black">
        {results.map((country, index) => (
          <div key={index} className="bg-gray-800/50 p-4 rounded shadow">
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
    </div>
  );
};

export default Homepg;
