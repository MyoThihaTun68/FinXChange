// 1. Read the API key from your environment variables
const API_KEY = import.meta.env.VITE_MARKETAUX_API_KEY;

// 2. Construct the URL for the Marketaux API
const searchKeywords = 'forex,currency,"exchange rate"';
const API_URL = `https://api.marketaux.com/v1/news/all?api_token=${API_KEY}&search=${searchKeywords}&language=en`;

export const getCurrencyNews = async () => {
  if (!API_KEY) {
    throw new Error("Marketaux API key is missing. Please check your .env file for VITE_MARKETAUX_API_KEY.");
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const result = await response.json();

    // 3. CRITICAL FIX: Adapt the response data structure.
    // This loops through the articles from Marketaux and creates a new array
    // with the correct property names that NewsCard.jsx expects.
    const adaptedArticles = result.data.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      // --- This is the translation logic ---
      urlToImage: article.image_url,      // Translate image_url to urlToImage
      source: { name: article.source },     // Translate source string to a { name: ... } object
      publishedAt: article.published_at,    // Translate published_at to publishedAt
    }));

    return adaptedArticles;

  } catch (error) {
    console.error("Failed to fetch currency news from Marketaux:", error);
    throw error;
  }
};