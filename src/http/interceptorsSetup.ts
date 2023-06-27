// import http from '@/http/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	CanceledError,
} from 'axios';

import commonSlice, { TStatus } from '@/redux/slices/commonSlice';

import { getToken, setToken } from '@/http/tokenService';

import apiAuth from './apiAuth';
import { EAuthLocation } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const compareUrls = (compare: string, url: string) => {
	return compare === url;
};

const compareErrorToken = (error: AxiosError): boolean => {
	console.log(
		!(error instanceof CanceledError) &&
			error.response?.status === 401 &&
			error.config?.url !== EAuthLocation.refresh
	);
	return (
		!(error instanceof CanceledError) &&
		error.response?.status === 401 &&
		error.config?.url !== EAuthLocation.refresh
	);
};

let setSetLoadStatus = false;

export const interceptorsSetup = (
	instance: AxiosInstance,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	store: ToolkitStore,
	navigate: (url: string) => any
) => {
	instance.interceptors.request.use(
		async (config) => {
			if (!setSetLoadStatus)
				store.dispatch(commonSlice.actions.setLoading('loading' as TStatus));
			setSetLoadStatus = true;

			// if (compareUrls(EAuthLocation.refresh, config.url as string)) {
			//   console.log('req compareUrls');
			//   return config;
			// }
			if (getToken()) {
				config.headers.Authorization = `Bearer ${getToken()}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);
	let flag = true;
	instance.interceptors.response.use(
		(response) => {
			if (setSetLoadStatus)
				store.dispatch(commonSlice.actions.setLoading('pending' as TStatus));
			setSetLoadStatus = false;
			return response;
		},
		async (error: AxiosError) => {
			try {
				if (compareErrorToken(error) /* если 401 */) {
					if (getToken() && flag) {
						try {
							flag = false;
							const res = await apiAuth.refresh({
								email: 'alubochkin@ya.ru',
								password: '12345',
							});

							if (res?.accessToken /* если в ответе есть новый токен */) {
								setToken(res.accessToken);
								instance.defaults.headers.common.Authorization =
									'Bearer '.concat(getToken() || '');
								return await instance({
									...error.config,
								});
							} /* если в ответе нет токена */ else {
								return navigate('/auth');
							}
						} catch (err) {
							console.log(err);
							/** @TODO Обрабатываем и опрокидываем ошибку в стор */
						}
					} else {
						// иначе пробуем авторизоваться
						return navigate('/auth');
					}
					instance.defaults.headers.common.Authorization = 'Bearer '.concat(
						getToken() || ''
					);
					return await axios(error.config as AxiosRequestConfig);
				} else if (error.response?.status === 403) {
					console.log(error.response?.status);
					return navigate('/auth');
				}
			} catch (err) {
				// обработать ошибки
				console.log(err, 'req err');
			}
			// console.log(error);
			return Promise.reject(error);
		}
	);
};
