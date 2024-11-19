import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetails, fetchPriceHistory } from "../services/api";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import PriceHistoryChart from "../components/PriceHistoryChart";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CoinDetail = ({ isDarkMode, setIsDarkMode }) => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeframe, setTimeframe] = useState("7");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const loadCoinDetails = async () => {
      setLoading(true); // Start spinner before API call
      try {
        const data = await fetchCoinDetails(id);
        setCoin(data);
      } catch (err) {
        setCoin([]); // Handle error by setting coin to an empty array
        console.error("Error fetching coin details:", err.message);
      } finally {
        setLoading(false); // Stop spinner after API call
      }
    };

    loadCoinDetails();
  }, [id]);

  useEffect(() => {
    const loadPriceHistory = async () => {
      try {
        const data = await fetchPriceHistory(id, timeframe);
        setPriceHistory(data.prices);
      } catch (err) {
        console.error("Error fetching price history:", err.message);
      }
    };

    loadPriceHistory();
  }, [id, timeframe]);

  // Show spinner while loading
  if (loading)
    return (
      <div className="text-center text-gray-300">
        <Spinner height="min-h-screen" />
      </div>
    );

  // Show error message if no data is found
  if (coin && coin.length === 0)
    return (
      <div className="font-semibold text-lg text-gray-600">
        No Data Found
      </div>
    );

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-black"
      } min-h-screen pb-4`}
    >
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Coin Detail Header */}
      <div
        className={`${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-white to-gray-200"
        } p-6`}
      >
        <div className="p-4">
          <Link
            to="/"
            className={`flex items-center space-x-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-600"
            } hover:text-orange-500 text-lg font-semibold`}
          >
            <FaArrowLeft />
            <span>Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-12">
          <div>
            <img
              src={coin.image?.large}
              alt={coin.name}
              className={`border-4  ${
                isDarkMode ? "border-white" : "border-gray-600"
              } border-rounded rounded-xl shadow-lg p-2`}
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-xl md:text-4xl font-extrabold text-orange-500 mb-2">
              {coin.name}
            </h1>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-800"
              } text-md`}
            >
              {coin.symbol.toUpperCase()} - {coin.name}
            </p>
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } text-lg max-w-2xl mx-auto mt-2`}
            >
              {coin.description?.en.split(".")[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 mt-6 rounded-lg shadow-md mx-4 sm:mx-8`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Market Cap",
              value: coin.market_data?.market_cap?.usd,
            },
            {
              title: "Current Price",
              value: coin.market_data?.current_price?.usd,
            },
            {
              title: "Total Volume",
              value: coin.market_data?.total_volume?.usd,
            },
            {
              title: "ATH",
              value: coin.market_data?.ath?.usd,
            },
            {
              title: "ATL",
              value: coin.market_data?.atl?.usd,
            },
            {
              title: "ROI",
              value: coin.market_data?.roi?.percentage
                ? `${coin.market_data.roi.percentage.toFixed(2)}%`
                : "N/A",
            },
            {
              title: "High 24h",
              value: coin.market_data?.high_24h?.usd,
            },
            {
              title: "Low 24h",
              value: coin.market_data?.low_24h?.usd,
            },
            {
              title: "24h Price Change",
              value: `${coin.market_data?.price_change_24h?.toFixed(2)} (${coin.market_data?.price_change_percentage_24h?.toFixed(2)}%)`,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
              } text-center p-4 rounded-lg`}
            >
              <h3 className="text-lg font-semibold text-orange-400">
                {item.title}
              </h3>
              <p className="text-2xl font-bold text-gray-300">
                {item.value ? `$${item.value.toLocaleString()}` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="mt-6 text-center">
        <label
          htmlFor="timeframe"
          className="text-lg text-orange-700 font-semibold"
        >
          Select Timeframe:{" "}
        </label>
        <select
          id="timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="ml-2 text-md p-2 rounded-lg border-2 border-gray-600 text-gray-300 bg-gray-800 focus:outline-none"
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">1 Month</option>
          <option value="90">3 Months</option>
          <option value="365">1 Year</option>
        </select>
      </div>

      {/* Price History Chart */}
      <div className="mt-8 flex py-3 mb-12 bg-gray-800 rounded-lg mx-4 sm:mx-8">
        <PriceHistoryChart data={priceHistory} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default CoinDetail;
