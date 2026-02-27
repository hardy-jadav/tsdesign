import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UIPortfolio from './pages/UIPortfolio';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Cursor from './components/Cursor';

function App() {
  return (
    <Router>
      <div className="app">
        <Cursor />
        <ParticleBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<UIPortfolio />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
