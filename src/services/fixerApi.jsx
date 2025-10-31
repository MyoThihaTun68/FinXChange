const API_KEY = import.meta.env.VITE_FIXER_API_KEY;

// 1. Change the URL from 'http' to 'https'
const API_BASE_URL = 'https://data.fixer.io/api';

/**
 * Fetches the latest currency exchange rates from the Fixer API.
 */
export const getLatestRates = async () => {
  if (!API_KEY) {
    throw new Error("Missing API Key: Please add VITE_FIXER_API_KEY to your .env file.");
  }
  
  // 2. Construct the URL for the secure endpoint
  const url = `${API_BASE_URL}/latest?access_key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.success) {
      // 3. Handle the specific error if HTTPS is not allowed on your plan
      if (data.error?.code === 105) {
        throw new Error("HTTPS access is not supported on the free Fixer.io plan. Please use a different API for deployment.");
      }
      throw new Error(`Fixer API Error: ${data.error.info} (Code: ${data.error.code})`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch latest rates:", error);
    throw error;
  }
};