// import http from '@/http/http';
import { getToken, setToken } from '@/http/tokenService';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CanceledError,
} from 'axios';
import { EAuthLocation } from './types';
import { RootState } from '@/redux/store';
import apiAuth from './apiAuth';

const compareUrls = (compare: string, url: string) => {
  console.log(url, compare, compare === url);
  return compare === url;
};

const compareErrorToken = (error: AxiosError): boolean => {
  console.log(error.config?.url, EAuthLocation.refresh, error.response?.status);
  return (
    !(error instanceof CanceledError) &&
    error.response?.status === 401 &&
    error.config?.url !== EAuthLocation.refresh
  );
};

export const interceptorsSetup = (
  instance: AxiosInstance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  store: RootState
) => {
  instance.interceptors.request.use(
    async (config) => {
      console.log('req');
      // if (compareUrls(EAuthLocation.refresh, config.url as string)) {
      //   console.log('req compareUrls');
      //   return config;
      // }
      if (getToken()) {
        console.log('request get token if');
        config.headers.Authorization = `Bearer ${getToken()}`;
      }
      console.log('request 2');
      return config;
    },
    (error) => Promise.reject(error)
  );
  let flag = true;
  instance.interceptors.response.use(
    (response) => {
      console.log('res status 200');
      return response;
    },
    async (error: AxiosError) => {
      console.log('compareErrorToken(error)', compareErrorToken(error));
      try {
        if (compareErrorToken(error)) {
          if (getToken() && flag) {
            try {
              flag = false;
              const res = await apiAuth.refresh({
                email: 'test@email.com',
                password: '123456',
              });
              console.log('res refresh', res);
              setToken(res.successToken);

              console.log('instance', error);
              await instance({
                ...error.config,
              });
            } catch (err) {
              /** @TODO Обрабатываем и опрокидываем ошибку в стор */
              console.log(err);
            }
          } else {
            // иначе пробуем авторизоваться
            console.log(error, 'error need autorization');
          }

          if (getToken()) {
            console.log('gettoken', getToken());
            instance.defaults.headers.common.Authorization = 'Bearer '.concat(
              getToken() || ''
            );
          }
          // return await axios(error.config as AxiosRequestConfig);
        }
      } catch (err) {
        // обработать ошибки
        console.log(err, 'req err');
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
};
