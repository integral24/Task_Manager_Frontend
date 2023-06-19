// import http from '@/http/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	CanceledError,
} from 'axios';

import { RootState } from '@/redux/store';

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

export const interceptorsSetup = (
	instance: AxiosInstance,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	store: RootState,
	navigate: (url: string) => any
) => {
	instance.interceptors.request.use(
		async (config) => {
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

							console.log('get tokens refresh', res);

							if (res?.successToken /* если в ответе есть новый токен */) {
								setToken(res.successToken);
								instance.defaults.headers.common.Authorization =
									'Bearer '.concat(getToken() || '');
								return await instance({
									...error.config,
								});
							} /* если в ответе нет токена */ else {
								console.log('not success token', res);
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
