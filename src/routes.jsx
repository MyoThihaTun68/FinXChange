import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Assuming you have this
import { CurrencyProvider } from './context/CurrencyContext';

// Import page components
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
// 1. Import the new page we are about to create
import CurrencyListPage from './pages/CurrencyListPage'; 

const AppRoutes = () => {
  return (
    <CurrencyProvider>
      <Router>
        <Header />
        <main className="bg-zinc-900 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            {/* 2. Add the correct route to the new page */}
            <Route path="/currencies" element={<CurrencyListPage />} />
          </Routes>
        </main>
      </Router>
    </CurrencyProvider>
  );
};

export default AppRoutes;