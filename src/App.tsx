import React, { ReactNode, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation, { IRoutes } from './components/Navigation';
const MainPage = React.lazy(() => import('@pages/MainPage'));
const About = React.lazy(() => import('@pages/About'));
const Auth = React.lazy(() => import('@/pages/AuthPage'));

const wrapper = (component: ReactNode) => (
  <React.Suspense fallback={<>...load</>}>
    <div className="container">{component}</div>
  </React.Suspense>
);

const App: React.FC = () => {
  useEffect(() => {
    console.log('request getUser');
  }, []);
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

  const navigate = useNavigate();
  console.log(navigate);
  // navigate('/auth');
  console.log(process.env);

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
