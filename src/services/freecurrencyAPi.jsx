// This file now uses the Frankfurter.app API.
// It is free, requires NO API KEY, and works everywhere.
const API_BASE_URL = 'https://api.frankfurter.app';

/**
 * Fetches the latest currency exchange rates.
 */
export const getLatestRates = async () => {
  try {
    // 1. The API call is simple and requires no key.
    const response = await fetch(`${API_BASE_URL}/latest`);
    if (!response.ok) {
      throw new Error(`Network Error: ${response.status}`);
    }
    const data = await response.json();

    // 2. CRITICAL: Adapt the response to match the format our app expects.
    // Frankfurter's base is EUR, and we must manually add it to the rates list
    // so it appears in dropdowns and other components.
    data.rates['EUR'] = 1.0; 

    // Return an object that looks just like the old API response.
    // This means we don't have to change any other part of our application.
    return {
      success: true,
      base: data.base, // The base is 'EUR'
      rates: data.rates, // The object with all the currency rates
    };

  } catch (error) {
    console.error("Failed to fetch latest rates:", error);
    throw error;
  }
};

/**
 * SIMULATES fetching the daily percentage change for various currencies.
 * This function can remain as it is for now.
 */
export const getDailyChangeData = async () => {
  const currencies = ['USD', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'MMK', 'THB', 'INR', 'EUR'];
  const changes = {};
  currencies.forEach(currency => {
    const change = (Math.random() - 0.5) * 3;
    changes[currency] = parseFloat(change.toFixed(2));
  });
  return new Promise(resolve => setTimeout(() => resolve(changes), 600));
};