// 1. Import the necessary hooks and the GSAP library
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

// Your existing component imports
import Converter from '../components/Converter';
import TrendingNews from '../components/TrendingNews';
import CurrencyWatchlist from '../components/CurrencyWatchlist';
import LiveTicker from '../components/LiveTicker'; 
import { useFetchRates } from '../hooks/useFetchRates';

const Home = () => {
  const { data: ratesData, loading, error } = useFetchRates();

  // 2. Create a ref for the main container of the page
  const main = useRef(null);

  // 3. Add the useLayoutEffect hook to handle the animation
  useLayoutEffect(() => {
    // We only want the animation to run after the data has finished loading
    if (!loading) {
      // Create a GSAP context for safe cleanup
      const ctx = gsap.context(() => {
        // This is our animation. It targets any element with the class '.anim-fade-up'
        gsap.from('.anim-fade-up', {
          opacity: 0,
          y: 20, // Start 20px below its final position
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2, // Animate each element 0.2s after the previous one
        });
      }, main); // <-- Scope the animations to our main container

      // Cleanup function to revert animations when the component unmounts
      return () => ctx.revert();
    }
  }, [loading]); // <-- The animation depends on the 'loading' state

  return (
    // 4. Attach the ref to the main container
    <div ref={main} className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-8">
          {/* 5. Add the animation class to each component you want to animate */}
          <div className="anim-fade-up">
            <Converter ratesData={ratesData} loading={loading} error={error} />
          </div>
          <div className="anim-fade-up">
            <TrendingNews />
          </div>
        </div>
        
        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="anim-fade-up">
            <LiveTicker ratesData={ratesData} loading={loading} />
          </div>
          <div className="anim-fade-up">
            <CurrencyWatchlist ratesData={ratesData} loading={loading} />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;