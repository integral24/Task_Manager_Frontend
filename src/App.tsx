import React, { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation, { IRoutes } from './components/Navigation';
const MainPage = React.lazy(() => import('@pages/MainPage'));
const About = React.lazy(() => import('@pages/About'));
const Auth = React.lazy(() => import('@/pages/Auth'));

const wrapper = (component: ReactNode) => (
  <React.Suspense fallback={<>...load</>}>
    <div className="container">{component}</div>
  </React.Suspense>
);

const App: React.FC = () => {
  const menu: IRoutes['routes'] = [
    {
      to: '/',
      name: 'Главная',
    },
    {
      to: '/about',
      name: 'О нас',
    },
    {
      to: '/auth',
      name: 'Войти',
    },
  ];

  return (
    <div className="app">
      <Navigation routes={menu} />
      <Routes>
        <Route index path="/" element={wrapper(<MainPage />)} />
        <Route path="/about" element={wrapper(<About />)} />
        <Route path="/auth" element={wrapper(<Auth />)} />
      </Routes>
    </div>
  );
};

export default App;
