// src/components/TrendingNews.jsx
import React from 'react';
import { useFetchNews } from '../hooks/useFetchNews';
import NewsCard from './NewsCard'; // We already created this!

const TrendingNews = () => {
  const { data: articles, loading, error } = useFetchNews();

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Latest News</h2>
      <div className="space-y-4">
        {loading && <p className="text-zinc-400">Loading news...</p>}
        {error && <p className="text-red-500">Could not load news.</p>}
        {articles.slice(0, 2).map((article, index) => (
          <NewsCard key={article.url || index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;