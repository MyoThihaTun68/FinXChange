// src/components/CurrencyWatchlist.jsx

import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaArrowRight } from 'react-icons/fa';

const CurrencyWatchlist = ({ ratesData, loading }) => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('JPY');

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('currencyWatchlistPairs');
    return saved ? JSON.parse(saved) : [{ id: 1, from: 'USD', to: 'JPY' }, { id: 2, from: 'GBP', to: 'CAD' }];
  });

  useEffect(() => {
    localStorage.setItem('currencyWatchlistPairs', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddPair = (e) => {
    e.preventDefault();
    if (fromCurrency === toCurrency) {
      alert("Cannot add a pair with the same currency.");
      return;
    }
    const pairExists = watchlist.some(p => p.from === fromCurrency && p.to === toCurrency);
    if (!pairExists) {
      const newPair = { id: Date.now(), from: fromCurrency, to: toCurrency };
      setWatchlist([...watchlist, newPair]);
    } else {
      alert("This currency pair is already in your watchlist.");
    }
  };

  const handleRemovePair = (idToRemove) => {
    setWatchlist(watchlist.filter(pair => pair.id !== idToRemove));
  };

  const currencyOptions = ratesData ? Object.keys(ratesData.rates).sort() : [];

  const CurrencySelect = ({ value, onChange, options }) => (
    <select 
      value={value} 
      onChange={onChange} 
      className="w-full bg-zinc-700 text-white p-2 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      {options.map(currency => <option key={currency} value={currency}>{currency}</option>)}
    </select>
  );

  // --- NEW LAYOUT STARTS HERE ---
  return (
    <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">Watchlist</h2>
      
      {/* Add Pair Form - Redesigned */}
      <form onSubmit={handleAddPair} className="mb-4">
        <div className="grid grid-cols-5 gap-2 items-center mb-3">
          <div className="col-span-2">
            <CurrencySelect value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} options={currencyOptions} />
          </div>
          <div className="text-center text-zinc-400">
            <FaArrowRight />
          </div>
          <div className="col-span-2">
            <CurrencySelect value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} options={currencyOptions} />
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 transition-colors font-semibold"
        >
          <FaPlus size={14} />
          Add Pair
        </button>
      </form>

      {/* Divider */}
      <hr className="border-zinc-700 my-2" />

      {/* Watchlist Items - Redesigned */}
      <div className="space-y-3 overflow-y-auto flex-grow">
        {loading ? (
          <p className="text-zinc-400 text-center pt-4">Loading rates...</p>
        ) : (
          watchlist.map(pair => {
            const rate = ratesData?.rates ? (1 / ratesData.rates[pair.from]) * ratesData.rates[pair.to] : 0;
            return (
              <div key={pair.id} className="flex items-center bg-zinc-700/50 p-3 rounded-lg hover:bg-zinc-700 transition-colors">
                {/* Left Side: Currency Info */}
                <div className="flex-grow">
                  <p className="font-bold text-white text-md">{pair.from} / {pair.to}</p>
                  <p className="text-xs text-zinc-400">1 {pair.from} equals</p>
                </div>
                {/* Right Side: Rate and Action */}
                <div className="text-right">
                  <p className="font-semibold text-cyan-400 text-lg">{rate.toFixed(4)}</p>
                </div>
                <button onClick={() => handleRemovePair(pair.id)} className="ml-4 text-zinc-500 hover:text-red-500 transition-colors">
                  <FaTrash />
                </button>
              </div>
            );
          })
        )}
        {!loading && watchlist.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-zinc-500">Your watchlist is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyWatchlist;