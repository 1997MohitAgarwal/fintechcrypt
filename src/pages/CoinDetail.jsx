import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCoinDetails, fetchPriceHistory } from "../services/api";
import Navbar from "../components/Navbar";
import PriceHistoryChart from "../components/PriceHistoryChart";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CoinDetail = ({ isDarkMode, setIsDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeframe, setTimeframe] = useState("7");

  useEffect(() => {
    const loadCoinDetails = async () => {
      try {
        const data = await fetchCoinDetails(id);
        console.log(data, "coin data");
        setCoin(data);
      } catch (err) {
        console.error(err.message);
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
        console.error(err.message);
      }
    };

    loadPriceHistory();
  }, [id, timeframe]);

  if (!coin) return <div className="text-center text-gray-300">Loading...</div>;

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
        {/* Image and Text in Flex Row */}
        <div className="p-4">
          <button
            onClick={() => navigate("/")} // Replace with the correct route
            className={`flex items-center space-x-2 ${
              isDarkMode ? "text-gray-200" : "text-gray-600"
            } hover:text-orange-500 text-lg font-semibold`}
          >
            <FaArrowLeft />
            <span>Dashboard</span>
          </button>
        </div>
        <div className="flex items-center justify-center space-x-12">
          {/* Coin Image */}
          <div>
            <img
              src={coin.image?.large}
              alt={coin.name}
              className={`border-4  ${
                isDarkMode ? "border-white" : "border-gray-600"
              } border-rounded rounded-xl shadow-lg p-2`}
            />
          </div>

          {/* Coin Text Info */}
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

      {/* Coin Info Section */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } p-6 mt-6 rounded-lg shadow-md mx-4 sm:mx-8`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Market Cap */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">
              Market Cap
            </h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.market_cap?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* Current Price */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">
              Current Price
            </h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.current_price?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* Total Volume */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">
              Total Volume
            </h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.total_volume?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* ATH (All-Time High) */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">ATH</h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.ath?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* ATL (All-Time Low) */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">ATL</h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.atl?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* Circulating Supply */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">
              Circulating Supply
            </h3>
            <p className="text-2xl font-bold text-gray-300">
              {coin.market_data?.circulating_supply?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* High 24h */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">High 24h</h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.high_24h?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* Low 24h */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">Low 24h</h3>
            <p className="text-2xl font-bold text-gray-300">
              ${coin.market_data?.low_24h?.usd?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* 24h Price Change */}
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-white border border-gray-300"
            } text-center p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-orange-400">
              24h Price Change
            </h3>
            <p className="text-2xl font-bold text-gray-300">
              {coin.market_data?.price_change_24h?.toFixed(2)} (
              {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%)
            </p>
          </div>
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
