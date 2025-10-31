// 1. FIXED: Changed from process.env to the correct Vite syntax
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// 2. FIXED: Changed URL to use secure "https" for best practice
const API_URL = `https://newsapi.org/v2/everything?q=(forex OR currency OR exchange rates)&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

export const getCurrencyNews = async () => {
  if (!API_KEY) {
    throw new Error("News API Key is missing. Check your .env file.");
  }
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      // This will likely trigger on Vercel because NewsAPI blocks free keys on live sites.
      throw new Error(`Network response was not ok. NewsAPI may be blocking requests from live servers on the free plan.`);
    }
    const data = await response.json();
    if (data.status !== 'ok') {
      throw new Error(`API Error: ${data.message}`);
    }
    return data.articles;
  } catch (error) {
    console.error("Failed to fetch currency news:", error);
    throw error;
  }
};