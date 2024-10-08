import React from 'react';
import HomePage from './components/HomePage';
import ContactPage from './components/contactPage';
import AboutPage from './components/aboutPage'
import ResultPage from './components/resultPage'
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/result/:email" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
