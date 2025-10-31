import React from 'react';

const NewsCardSkeleton = () => {
  return (
    // The main container has the pulse animation
    <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 animate-pulse">
      {/* Image Placeholder */}
      <div className="h-40 bg-zinc-700 rounded-md mb-4"></div>
      
      {/* Title Placeholder */}
      <div className="h-6 bg-zinc-700 rounded w-3/4 mb-3"></div>
      
      {/* Description Placeholders */}
      <div className="space-y-2">
        <div className="h-4 bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
        <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
      </div>
      
      {/* Source/Date Placeholder */}
      <div className="mt-4 h-4 bg-zinc-700 rounded w-1/3"></div>
    </div>
  );
};

export default NewsCardSkeleton;