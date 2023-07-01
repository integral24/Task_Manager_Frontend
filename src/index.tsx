import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@/redux/store';

import App from '@/App';
import '@/assets/styles/index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLDivElement
);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
