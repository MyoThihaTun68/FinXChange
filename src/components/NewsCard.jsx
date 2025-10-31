import React from 'react';
// 1. Import the fallback image you just added
import fallbackImage from '../assets/images/fallback-image.png';

const NewsCard = ({ article }) => {

  // 2. The crucial onError event handler function
  const handleImageError = (e) => {
    // If the original image fails to load, this function is triggered.
    // It replaces the broken image source with our local fallback image.
    e.target.src = fallbackImage;
  };

  // Truncate long descriptions for a cleaner layout
  const truncateText = (text, length) => {
    if (!text) return 'No description available.';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    // The link wraps the entire card, making it all clickable
    <a 
      href={article.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden h-full flex flex-col hover:border-cyan-400 transition-colors duration-300 group"
    >
      {/* 3. Image Container with a background color */}
      {/* This ensures that even if there's no image URL, the space doesn't collapse */}
      <div className="h-40 w-full overflow-hidden bg-zinc-700">
        <img
          // Use the article's image, or the fallback if the URL is missing entirely
          src={article.urlToImage || fallbackImage}
          alt={article.title || 'News article image'}
          onError={handleImageError} // 4. Attach the error handler here
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 flex-grow">
          {truncateText(article.title, 80)}
        </h3>
        <div className="text-xs text-zinc-400">
          <p>{article.source?.name || 'Unknown Source'}</p>
          <p>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;