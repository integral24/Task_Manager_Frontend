import React, { ReactNode } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
const MainPage = React.lazy(() => import('@pages/MainPage'));
const About = React.lazy(() => import('@pages/About'));

const wrapper = (component: ReactNode) => (
  <React.Suspense fallback={<>...load</>}>{component}</React.Suspense>
);

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <nav className="nav">
            <Link to="/">MainPage</Link>
            <Link to="/about">About</Link>
          </nav>
          <Routes>
            <Route index path="/" element={wrapper(<MainPage />)} />
            <Route path="/about" element={wrapper(<About />)} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
