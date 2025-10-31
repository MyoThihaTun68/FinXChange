// src/hooks/useFetchNews.js

import { useState, useEffect } from 'react';
import { getCurrencyNews } from '../services/newsApi';

export const useFetchNews = () => {
  // Initialize data as an empty array since we expect a list of articles
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const articles = await getCurrencyNews();
        setData(articles);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};