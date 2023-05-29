import http from '@/http/http';
import tokenService from '@/http/tokenService';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CanceledError,
} from 'axios';
import { EAuthLocation } from './types';
import { RootState } from '@/redux/store';

const compareUrls = (compare: string, url: string) => {
  return compare.split('').includes(url);
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
  store: RootState
) => {
  instance.interceptors.request.use(
    async (config) => {
      if (compareUrls(EAuthLocation.refresh, config.url || '')) {
        return config;
      }
      if (tokenService.getToken()) {
        config.headers.Authorization = 'Bearer' + tokenService.getToken();
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    async (error: AxiosError) => {
      try {
        if (compareErrorToken(error)) {
          if (tokenService.isAuth()) {
            try {
              // Есть токен он просрочен получаем новый refresh
            } catch (err) {
              // Обрабатываем и опрокидываем ошибку в стор
              console.log(err);
            }
          } else {
            // иначе пробуем авторизоваться
            console.log(error);
          }

          if (tokenService.getToken()) {
            axios.defaults.headers.common.Authorization =
              'Bearer' + tokenService.getToken();
          }
          return await axios(error.config as AxiosRequestConfig);
        }
      } catch (err) {
        // обработать ошибки
        console.log(err);
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
};
