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

// Register required components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const PriceHistoryChart = ({ data, isDarkMode }) => {
  const chartData = {
    labels: data.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: data.map(([_, price]) => price),
        borderColor: "#FFA500", // Orange color for the line
        backgroundColor: "rgba(255, 165, 0, 0.1)", // Transparent orange for background
        borderWidth: 2, // Adjust border width for the line
        pointBackgroundColor: "#FFA500", // Orange for points
        pointRadius: 4, // Size of the points
        pointHoverRadius: 6, // Size of the points when hovered
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        backgroundColor: isDarkMode ? "#333" : "#fff", // Tooltip background color based on dark mode
        titleColor: isDarkMode ? "#FFF" : "#000", // Tooltip title color
        bodyColor: isDarkMode ? "#FFF" : "#000", // Tooltip body text color
        borderColor: "#FFA500", // Tooltip border color (orange)
        borderWidth: 1, // Tooltip border width
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: isDarkMode ? "#444" : "#ccc", // Grid line color based on dark mode
        },
        ticks: {
          display: true, // Show ticks
          autoSkip: true, // Skip ticks to avoid overcrowding
          color: isDarkMode ? "#FFF" : "#000", // Tick color based on dark mode
        },
      },
      y: {
        grid: {
          display: true, // Show grid lines for the y-axis
          color: isDarkMode ? "#444" : "#ccc", // Grid line color based on dark mode
        },
        ticks: {
          display: true, // Show y-axis ticks
          color: isDarkMode ? "#FFF" : "#000", // Tick color based on dark mode
        },
      },
    },
    elements: {
      line: {
        tension: 0.1, // Smooth the line
      },
      point: {
        radius: 0, // Remove the points from the line
      },
    },
  };

  return (
    <div
      className={`w-screen rounded-lg mx-4 sm:mx-8 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`} // Container background color based on dark mode
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PriceHistoryChart;
