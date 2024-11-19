import { toast } from 'react-toastify';

const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const fetchCryptoList = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/${BASE_URL}/coins/markets?vs_currency=usd&x_cg_demo_api_KEY=${API_KEY}`
    );
    if (!response.ok) throw new Error("Too many request. Please try after some time.");
    return response.json();
  } catch (error) {
    toast.error(error.message);  
    return [];
  }
};

export const fetchCoinDetails = async (id) => {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${BASE_URL}/coins/${id}?x_cg_demo_api_KEY=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch coin details.");
    return response.json();
  } catch (error) {
    console.error(error.message);
    toast.error(error.message); 
    return null;
  }
};

export const fetchPriceHistory = async (id, days) => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}&x_cg_demo_api_KEY=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch price history.");
    return response.json();
  } catch (error) {
    console.error(error.message);
    toast.error(error.message); 
    return null;
  }
};
