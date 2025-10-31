// src/App.jsx

import React from 'react';
import AppRoutes from './routes';
import Footer from './components/Footer'; // 1. Import the Footer

function App() {
  return (
    // We use flexbox here to make sure the footer stays at the bottom
    <div className="bg-zinc-900 min-h-screen font-sans flex flex-col">
      <div className="flex-grow">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;