// src/hooks/useFetchRates.js

import { useState, useEffect } from 'react';
import { getLatestRates } from '../services/freecurrencyAPi';

export const useFetchRates = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const ratesData = await getLatestRates();
        setData(ratesData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, []);
  return { data, loading, error };
};