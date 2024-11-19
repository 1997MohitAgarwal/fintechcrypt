import React, { useState, useEffect } from "react";
import { fetchCryptoList } from "../services/api";
import CryptoCard from "../components/CryptoCard";
import Navbar from "../components/Navbar";
import cryptoBanner from "../assets/crypto.jpg";
import Spinner from "../components/Spinner";

const Dashboard = ({ isDarkMode, setIsDarkMode }) => {
  const [cryptos, setCryptos] = useState([]); 
  const [filteredCryptos, setFilteredCryptos] = useState([]); 
  const [marketCapFilter, setMarketCapFilter] = useState("all");
  const [priceChangeFilter, setPriceChangeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12; 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        setLoading(true); 
        const data = await fetchCryptoList();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    loadCryptos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 800); 

    return () => clearTimeout(timer); 
  }, [searchQuery]);

  // Apply filters based on market cap, price change, and debounced search query
  useEffect(() => {
    setPage(1);
    let filteredData = cryptos;

    if (marketCapFilter !== "all") {
      filteredData = filteredData.filter((crypto) => {
        if (marketCapFilter === "high") {
          return crypto.market_cap > 10000000000; 
        } else if (marketCapFilter === "low") {
          return crypto.market_cap <= 10000000000;
        }
        return true;
      });
    }

    if (priceChangeFilter !== "all") {
      filteredData = filteredData.filter((crypto) => {
        if (priceChangeFilter === "positive") {
          return crypto.price_change_percentage_24h > 0;
        } else if (priceChangeFilter === "negative") {
          return crypto.price_change_percentage_24h < 0;
        }
        return true;
      });
    }

    if (debouncedSearchQuery) {
      filteredData = filteredData.filter(
        (crypto) =>
          crypto.name
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          crypto.symbol
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
      );
    }

    setFilteredCryptos(filteredData); // Update filtered data
  }, [cryptos, marketCapFilter, priceChangeFilter, debouncedSearchQuery]);

  // Slice data based on page and itemsPerPage
  const currentPageData = filteredCryptos.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage 
  );

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <div className="relative text-center py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <img
          src={cryptoBanner}
          alt="Crypto Symbols"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-orange-500 mb-4">
            Welcome to CryptoTracker
          </h1>
          <p className="text-lg px-2 text-gray-300 max-w-2xl mx-auto">
            Track real-time data of your favorite cryptocurrencies. Stay
            informed with live updates, detailed coin information, and market
            trends.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div
        className={`p-6 flex flex-wrap gap-3 justify-between items-center ${
          isDarkMode ? "bg-gray-950 text-gray-200" : "text-gray-900"
        }`}
      >
        {/* Search Bar */}
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by name or symbol"
            className="bg-gray-700 text-gray-300 p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none w-full max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          {/* Market Cap Filter */}
          <div>
            <select
              id="marketCap"
              className="bg-gray-700 text-gray-300 p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={marketCapFilter}
              onChange={(e) => setMarketCapFilter(e.target.value)}
            >
              <option value="all">All (Market Cap)</option>
              <option value="high">High Market Cap</option>
              <option value="low">Low Market Cap</option>
            </select>
          </div>

          {/* Price Change Filter */}
          <div>
            <select
              id="priceChange"
              className="bg-gray-700 text-gray-300 p-3 rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={priceChangeFilter}
              onChange={(e) => setPriceChangeFilter(e.target.value)}
            >
              <option value="all">All (PriceChange)</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crypto List Section */}
      {loading ? (
        <div className="mt-8">
          <Spinner />
        </div> 
      ) : currentPageData?.length > 0 ? (
        <div className="pb-6 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPageData?.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          {/* Pagination*/}
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
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-center p-8 rounded-lg max-w-sm w-full">
            <p className="text-xl font-semibold text-gray-700">
              Cryptos Data Not Available
            </p>
            <p className="mt-2 text-gray-500">
              Please check back later or try another search.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
