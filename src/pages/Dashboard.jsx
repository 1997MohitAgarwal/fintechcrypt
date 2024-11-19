import React, { useState, useEffect } from "react";
import { fetchCryptoList } from "../services/api";
import CryptoCard from "../components/CryptoCard";
import Navbar from "../components/Navbar";
import cryptoBanner from "../assets/crypto.jpg"; // Add your image path here.

const Dashboard = ({ isDarkMode,setIsDarkMode }) => {
  const [cryptos, setCryptos] = useState([]); // All data
  const [filteredCryptos, setFilteredCryptos] = useState([]); // Filtered data
  const [marketCapFilter, setMarketCapFilter] = useState("all");
  const [priceChangeFilter, setPriceChangeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Load all crypto data on component mount
  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchCryptoList(); // No pagination in API request
        setCryptos(data);
        setFilteredCryptos(data); // Set initial filtered data to all cryptos
      } catch (err) {
        console.error(err.message);
      }
    };
    loadCryptos();
  }, []);

  // Apply filters based on market cap and price change
  useEffect(() => {
    let filteredData = cryptos;

    if (marketCapFilter !== "all") {
      filteredData = filteredData.filter(crypto => {
        if (marketCapFilter === "high") {
          return crypto.market_cap > 10000000000; // Example threshold for high market cap
        } else if (marketCapFilter === "low") {
          return crypto.market_cap <= 10000000000; // Example threshold for low market cap
        }
        return true;
      });
    }

    if (priceChangeFilter !== "all") {
      filteredData = filteredData.filter(crypto => {
        if (priceChangeFilter === "positive") {
          return crypto.price_change_percentage_24h > 0;
        } else if (priceChangeFilter === "negative") {
          return crypto.price_change_percentage_24h < 0;
        }
        return true;
      });
    }

    setFilteredCryptos(filteredData); // Update filtered data
  }, [cryptos, marketCapFilter, priceChangeFilter]);

  // Slice data based on page and itemsPerPage
  const currentPageData = filteredCryptos.slice(
    (page - 1) * itemsPerPage, // Starting index of the current page
    page * itemsPerPage // Ending index of the current page
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Hero Section */}
      <div className="relative text-center py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        {/* Background Image */}
        <img
          src={cryptoBanner}
          alt="Crypto Symbols"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />

        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-orange-500 mb-4">
            Welcome to CryptoTracker
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Track real-time data of your favorite cryptocurrencies. Stay informed with live updates, detailed coin information, and market trends.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-6 flex justify-between items-center bg-gray-800">
        {/* Market Cap Filter */}
        <div>
          <label htmlFor="marketCap" className="text-orange-500 mr-2">Market Cap</label>
          <select
            id="marketCap"
            className="bg-gray-700 text-gray-300 p-2 rounded-md"
            value={marketCapFilter}
            onChange={(e) => setMarketCapFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High Market Cap</option>
            <option value="low">Low Market Cap</option>
          </select>
        </div>

        {/* Price Change Filter */}
        <div>
          <label htmlFor="priceChange" className="text-orange-500 mr-2">Price Change (24h)</label>
          <select
            id="priceChange"
            className="bg-gray-700 text-gray-300 p-2 rounded-md"
            value={priceChangeFilter}
            onChange={(e) => setPriceChangeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>

      {/* Crypto List Section */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Cryptocurrency List
        </h2>

        {/* Grid for Crypto Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPageData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-8 flex justify-between items-center">
          <button
            className="bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-700 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </button>
          <button
            className="bg-orange-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-700"
            disabled={currentPageData.length < itemsPerPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
