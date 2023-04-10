import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
