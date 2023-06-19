import React, { ReactNode } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Navigation from '@/components/Navigation';

import http from '@/http/http';

import { menu } from '@/helpers';

import { interceptorsSetup } from './http/interceptorsSetup';
import { store } from './redux/store';

const MainPage = React.lazy(() => import('@/pages/MainPage'));
const About = React.lazy(() => import('@/pages/About'));
const Auth = React.lazy(() => import('@/pages/AuthPage'));

const wrapper = (component: ReactNode) => (
	<React.Suspense fallback={<>...load</>}>
		<div className="container">{component}</div>
	</React.Suspense>
);

const App: React.FC = () => {
	const navigate = useNavigate();
	interceptorsSetup(http, store.getState(), navigate);
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
