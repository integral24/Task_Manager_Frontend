import React, { ReactNode, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Navigation from '@/components/Navigation';

import http from '@/http/http';

import { menu } from '@/helpers';

import { useAppDispatch } from './hooks/redux';
// import Loader from './components/ui/Loader';
// import { useAppSelector } from './hooks/redux';
import { interceptorsSetup } from './http/interceptorsSetup';
import { getUser } from './redux/slices/actions/actionsAuth';
import { store } from './redux/store';

const MainPage = React.lazy(async () => import('@/pages/MainPage'));
const About = React.lazy(async () => import('@/pages/About'));
const Auth = React.lazy(async () => import('@/pages/AuthPage'));

const wrapper = (component: ReactNode) => (
	<React.Suspense fallback={<>...load</>}>
		<div className="container">{component}</div>
	</React.Suspense>
);

const App: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// const status = useAppSelector((store) => store.commonSlice.status);
	// const [statusLocal, setstatusLocal] = useState(true);

	// setTimeout(() => setstatusLocal(false), 2000);

	const location = useLocation();

	useEffect(() => {
		dispatch(getUser());
	}, []);

	interceptorsSetup(http, store, navigate);
	return (
		<>
			<div className="app">
				<Navigation routes={menu} />
				<Routes location={location}>
					<Route index path="/" element={wrapper(<MainPage />)} />
					<Route path="/about" element={wrapper(<About />)} />
					<Route path="/auth" element={wrapper(<Auth />)} />
				</Routes>
			</div>
			{/* <Loader type="global" isOpen={statusLocal} />; */}
		</>
	);
};

export default App;
