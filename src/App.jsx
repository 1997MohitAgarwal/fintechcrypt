import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CoinDetail from "./pages/CoinDetail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        <Routes>
          <Route path="/" element={<Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path="/coin/:id" element={<CoinDetail isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
