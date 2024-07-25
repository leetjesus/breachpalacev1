import React from 'react';
import HomePage from './components/HomePage';
import ContactPage from './components/contactPage';
import AboutPage from './components/aboutPage'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
