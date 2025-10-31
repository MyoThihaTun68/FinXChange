import { React, useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa'; // A small icon for the "live" indicator

const LiveTicker = ({ ratesData, loading }) => {
  // Define the list of key currencies we want to cycle through
  const tickerCurrencies = ['USD', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'];
  
  // State to keep track of which currency is currently displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // This effect sets up a timer to change the currency every 4 seconds
  useEffect(() => {
    if (!loading && ratesData) {
      const intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => 
          (prevIndex + 1) % tickerCurrencies.length // Loop back to the start
        );
      }, 4000); // 4 seconds

      // Important: Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [loading, ratesData, tickerCurrencies.length]); // Rerun if loading state changes

  if (loading) {
    return (
      <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 text-center">
        <p className="text-zinc-400">Loading Ticker...</p>
      </div>
    );
  }

  // Get the current currency and its rate from the API data
  const currentCurrency = tickerCurrencies[currentIndex];
  const rate = ratesData?.rates[currentCurrency];
  const baseCurrency = ratesData?.base || 'EUR';

  return (
    <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCircle className="text-red-500 animate-pulse" size={10} />
          <span className="text-sm font-bold text-white">LIVE RATES</span>
        </div>
        <div className="text-right">
          <p className="font-mono text-lg text-white">
            1 {baseCurrency} = <span className="text-cyan-400 font-bold">{rate ? rate.toFixed(4) : '...'}</span> {currentCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;