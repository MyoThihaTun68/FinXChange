// src/components/Converter.jsx

import React, { useState, useEffect } from 'react';
import { useFetchRates } from '../hooks/useFetchRates';
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Converter = () => {
  const { data: ratesData, loading, error } = useFetchRates();
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');

  // This effect recalculates the conversion whenever the inputs change
  useEffect(() => {
    if (ratesData && ratesData.rates) {
      const rateFrom = ratesData.rates[fromCurrency];
      const rateTo = ratesData.rates[toCurrency];
      
      // Since free Fixer API base is EUR, we convert through EUR
      const result = (amount / rateFrom) * rateTo;
      setConvertedAmount(result.toFixed(4));
    }
  }, [amount, fromCurrency, toCurrency, ratesData]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) return <div className="bg-zinc-800 p-6 rounded-lg text-center text-zinc-400">Loading Converter...</div>;
  if (error) return <div className="bg-zinc-800 p-6 rounded-lg text-center text-red-500">Error loading rates.</div>;

  const currencyOptions = ratesData ? Object.keys(ratesData.rates).sort() : [];

  const CurrencySelect = ({ value, onChange, options }) => (
    <select 
      value={value} 
      onChange={onChange} 
      className="w-full bg-zinc-700 text-white p-3 rounded-md border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      {options.map(currency => <option key={currency} value={currency}>{currency}</option>)}
    </select>
  );

  return (
    <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
      <h2 className="text-xl font-bold text-white mb-4">Quick Convert</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        
        {/* Amount Input */}
        <div className="md:col-span-2">
          <label className="text-sm text-zinc-400 mb-1 block">Amount</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-zinc-700 text-white p-3 rounded-md border border-zinc-600" 
          />
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center">
          <button onClick={handleSwapCurrencies} className="bg-zinc-700 p-3 rounded-full hover:bg-cyan-500 transition-colors">
            <FaArrowRightArrowLeft className="text-white" />
          </button>
        </div>

        {/* Converted Amount Input */}
        <div className="md:col-span-2">
          <label className="text-sm text-zinc-400 mb-1 block">Converted Amount</label>
          <input 
            type="text" 
            value={convertedAmount}
            readOnly
            className="w-full bg-zinc-700 text-white p-3 rounded-md border border-zinc-600" 
          />
        </div>

        {/* From Currency Dropdown */}
        <div className="md:col-span-2">
          <CurrencySelect value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} options={currencyOptions} />
        </div>

        <div className="hidden md:block"></div> {/* Spacer */}

        {/* To Currency Dropdown */}
        <div className="md:col-span-2">
          <CurrencySelect value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} options={currencyOptions} />
        </div>

      </div>
      
      {/* Real-time Rate Display */}
      <div className="mt-4 text-center">
        <p className="text-zinc-300">
          1 {fromCurrency} = <span className="text-cyan-400 font-semibold">{((1 / ratesData.rates[fromCurrency]) * ratesData.rates[toCurrency]).toFixed(4)}</span> {toCurrency}
          <span className="ml-3 bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-md">Real-time</span>
        </p>
      </div>
    </div>
  );
};

export default Converter;