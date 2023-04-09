import React from 'react';
import './assets/styles/index.scss';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import MainPage from './components/MainPage';

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
