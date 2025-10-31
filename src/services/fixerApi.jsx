// Read the secure API key from environment variables
const API_KEY = import.meta.env.VITE_FIXER_API_KEY;
const API_BASE_URL = 'http://data.fixer.io/api';

/**
 * Fetches the latest currency exchange rates from the Fixer API.
 */
export const getLatestRates = async () => {
  if (!API_KEY) {
    throw new Error("Missing API Key: Please add VITE_FIXER_API_KEY to your .env file.");
  }
  const url = `${API_BASE_URL}/latest?access_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(`Fixer API Error: ${data.error.info} (Code: ${data.error.code})`);
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch latest rates:", error);
    throw error;
  }
};

/**
 * SIMULATES fetching the daily percentage change for various currencies.
 * This function is required for the DailyMarketMovers component.
 * @returns {Promise<Object>} A promise resolving to an object like { USD: 0.75, JPY: -0.21, ... }
 */
export const getDailyChangeData = async () => {
  console.log("Simulating fetch for daily market movers data.");

  const generateMockChanges = () => {
    const changes = {};
    // A list of common currencies to generate data for
    const currencies = ['USD', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'MMK', 'THB', 'INR', 'EUR'];

    currencies.forEach(currency => {
      // Generate a random change between -1.5% and +1.5%
      const change = (Math.random() - 0.5) * 3;
      changes[currency] = parseFloat(change.toFixed(2));
    });

    return changes;
  };

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generateMockChanges());
    }, 600); // Simulate network delay
  });
};