import React from "react";
import { Link } from "react-router-dom";

const CryptoCard = ({ crypto, isDarkMode }) => {
  return (
    <Link
      to={`/coin/${crypto.id}`}
      className={`block p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center mb-4">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-16 h-16 object-cover rounded-full mr-4"
        />
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {crypto.name}
          </h2>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {crypto.symbol.toUpperCase()}
          </p>
        </div>
      </div>
      <div>
        <p
          className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Price: ${crypto.current_price.toLocaleString()}
        </p>
        <p
          className={`text-sm ${
            crypto.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
        </p>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Market Cap: ${crypto.market_cap.toLocaleString()}
        </p>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Market Cap Rank: #{crypto.market_cap_rank}
        </p>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}
        >
          24h High: ${crypto.high_24h.toLocaleString()} | 24h Low:{" "}
          ${crypto.low_24h.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default CryptoCard;
