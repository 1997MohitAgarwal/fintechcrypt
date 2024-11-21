import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const PriceHistoryChart = ({ data, isDarkMode }) => {
  const chartData = {
    labels: data.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map(([_, price]) => price),
        borderColor: "#FFA500", 
        backgroundColor: "rgba(255, 165, 0, 0.1)", 
        borderWidth: 2, 
        pointBackgroundColor: "#FFA500", 
        pointRadius: 1, 
        pointHoverRadius: 3, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        titleColor: isDarkMode ? "#FFF" : "#000", 
        bodyColor: isDarkMode ? "#FFF" : "#000", 
        borderColor: "#FFA500", 
        borderWidth: 1, 
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: isDarkMode ? "#444" : "#ccc", 
        },
        ticks: {
          display: true, 
          autoSkip: true, 
          color: isDarkMode ? "#FFF" : "#000", 
        },
      },
      y: {
        grid: {
          display: true, 
          color: isDarkMode ? "#444" : "#ccc", 
        },
        ticks: {
          display: true, 
          color: isDarkMode ? "#FFF" : "#000", 
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div
      className={`w-screen rounded-lg mx-4 sm:mx-8 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceHistoryChart;
