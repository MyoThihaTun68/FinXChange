import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

import { useFetchNews } from '../hooks/useFetchNews';
import NewsCard from '../components/NewsCard';
// 1. Import our new skeleton component
import NewsCardSkeleton from '../components/NewsCardSkeleton'; 

const NewsPage = () => {
  const { data: articles, loading, error } = useFetchNews();
  const main = useRef(null);

  useLayoutEffect(() => {
    if (!loading && articles?.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.gsap-anim-item', {
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
        });
      }, main);
      return () => ctx.revert();
    }
  }, [loading, articles]);

  return (
    <div ref={main} className="max-w-7xl mx-auto p-4 md:p-8 text-white">
      <h1 className="text-4xl font-bold mb-6 gsap-anim-item">Currency News</h1>
      
      {/* 2. Update the conditional rendering logic */}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {/* The main grid for both skeletons and loaded cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // IF LOADING: Display a grid of 6 skeleton cards
          Array.from({ length: 6 }).map((_, index) => (
            <NewsCardSkeleton key={index} />
          ))
        ) : (
          // IF NOT LOADING: Display the real news cards with animation
          articles.map((article, index) => (
            <div key={article.url || index} className="gsap-anim-item">
              <NewsCard article={article} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsPage;