// import http from '@/http/http';
import { getToken, setToken } from '@/http/tokenService';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {
  AxiosError,
  AxiosInstance,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AxiosRequestConfig,
  CanceledError,
} from 'axios';
import { EAuthLocation } from './types';
import { RootState } from '@/redux/store';
import apiAuth from './apiAuth';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const compareUrls = (compare: string, url: string) => {
  console.log(url, compare, compare === url);
  return compare === url;
};

const compareErrorToken = (error: AxiosError): boolean => {
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
                email: 'alextest@mail.ru',
                password: '12345',
              });

              if (res.successToken) setToken(res.successToken);
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
      // console.log(error);
      return Promise.reject(error);
    }
  );
};
