// src/services/newsApi.js

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?q=(forex OR currency OR exchange rates)&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

export const getCurrencyNews = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.status !== 'ok') {
      // NewsAPI returns a `status: "error"` field on failure
      throw new Error(`API Error: ${data.message}`);
    }
    // We only need the articles array from the response
    return data.articles;
  } catch (error) {
    console.error("Failed to fetch currency news:", error);
    throw error;
  }
};