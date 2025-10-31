import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context. It's crucial that this is not exported directly
//    to ensure we only use our custom hook.
const CurrencyContext = createContext(null);

// 2. Create the custom hook for components to use the context.
//    This hook will throw an error if used outside the provider, which is good for debugging.
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === null) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

// 3. Create the Provider component that will wrap our app.
export const CurrencyProvider = ({ children }) => {
  const [conversionHistory, setConversionHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem('conversionHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse conversion history from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
  }, [conversionHistory]);

  const addConversionToHistory = (conversion) => {
    // Add to the top of the array and keep the last 50 conversions
    const newHistory = [conversion, ...conversionHistory].slice(0, 50);
    setConversionHistory(newHistory);
  };

  // 4. The value that will be provided to all descendant components.
  const value = {
    conversionHistory,
    addConversionToHistory,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};