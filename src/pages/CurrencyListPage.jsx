// 1. Import the necessary hooks and the GSAP library
import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

import { useFetchRates } from '../hooks/useFetchRates';
import { currencyNames } from '../utils/currencyUtils';

const CurrencyListPage = () => {
  const { data, loading, error } = useFetchRates();
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. Create a ref for the main container
  const main = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCurrencies = data ? Object.entries(data.rates).filter(([code, rate]) => {
    const name = currencyNames[code] || code;
    return code.toLowerCase().includes(searchTerm) || name.toLowerCase().includes(searchTerm);
  }) : [];

  // 3. Add the useLayoutEffect hook for animation
  useLayoutEffect(() => {
    // Animate only after the data has loaded
    if (!loading && data) {
      const ctx = gsap.context(() => {
        // A single, elegant animation for all targeted elements
        gsap.from('.gsap-anim-item', {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08, // A slightly faster stagger for the list
        });
      }, main); // Scope the animation

      return () => ctx.revert(); // Cleanup
    }
  }, [loading, data]); // Rerun if loading or data changes

  if (loading) {
    return <div className="text-center p-10 text-zinc-400">Loading currencies...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    // 4. Attach the ref to the main container
    <div ref={main} className="max-w-4xl mx-auto p-4 md:p-8 text-white">
      {/* 5. Apply the animation class to all elements you want to animate */}
      <h1 className="text-3xl font-bold mb-2 gsap-anim-item">All Currencies</h1>
      <p className="text-zinc-400 mb-6 gsap-anim-item">Rates are based on 1 {data?.base || 'EUR'}.</p>
      
      <div className="gsap-anim-item">
        <input
          type="text"
          placeholder="Search by code or name (e.g., USD, Dollar)"
          onChange={handleSearch}
          className="w-full bg-zinc-700 text-white p-3 mb-6 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCurrencies.map(([code, rate]) => (
          // Apply the class to each card for the stagger effect
          <div key={code} className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 gsap-anim-item">
            <div className="flex justify-between items-center mb-1">
              <p className="font-bold text-lg">{code}</p>
              <p className="font-mono text-lg text-cyan-400">{rate.toFixed(4)}</p>
            </div>
            <p className="text-sm text-zinc-400">{currencyNames[code] || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyListPage;