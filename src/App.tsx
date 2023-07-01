import React, { ReactNode, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Navigation from '@/components/Navigation';

import http from '@/http/http';

import { menu } from '@/utils/constants';

import { useAppDispatch, useAppSelector } from './hooks/redux';
// import Loader from './components/ui/Loader';
// import { useAppSelector } from './hooks/redux';
import { interceptorsSetup } from './http/interceptorsSetup';
import { getUser } from './redux/slices/actions/actionsAuth';
import { store } from './redux/store';

const MainPage = React.lazy(async () => import('@/pages/MainPage'));
const Timer = React.lazy(async () => import('@/pages/Timer'));
const Auth = React.lazy(async () => import('@/pages/AuthPage'));

const wrapper = (component: ReactNode) => (
	<React.Suspense fallback={<>...load</>}>
		<div className="page-app">
			<div className="container">{component}</div>
		</div>
	</React.Suspense>
);

const App: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((store) => store.authSlice.user);
	// const status = useAppSelector((store) => store.commonSlice.status);
	// const [statusLocal, setstatusLocal] = useState(true);

	const location = useLocation();

	useEffect(() => {
		if (!user.email) {
			dispatch(getUser());
		} else {
			navigate('/');
		}
	}, [user?.email]);

	interceptorsSetup(http, store, navigate);
	return (
		<>
			<div className="app">
				<Navigation routes={menu} />
				<Routes location={location}>
					<Route index path="/" element={wrapper(<MainPage />)} />
					<Route path="/timer" element={wrapper(<Timer />)} />
					<Route path="/auth" element={wrapper(<Auth />)} />
				</Routes>
			</div>
			{/* <Loader type="global" isOpen={statusLocal} />; */}
		</>
	);
};

export default App;
