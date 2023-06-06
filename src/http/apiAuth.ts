import { urlAuth } from './apiAuthConfig';
import http from './http';
import { AxiosInstance } from 'axios';

interface IPayload {
  email: string;
  password: string;
  name?: string;
}

class ApiAuth {
  http: AxiosInstance | undefined;

  constructor(axios: AxiosInstance) {
    this.http = axios;
  }

  signIn(payload: IPayload) {
    this.http?.post(urlAuth.SINGIN, payload);
  }

  signUp(payload: IPayload) {
    this.http?.post(urlAuth.SIGNUP, payload);
  }

  signOut(payload: IPayload) {
    this.http?.post(urlAuth.SIGNOUT, payload);
  }

  refresh(payload: IPayload) {
    this.http?.post(urlAuth.REFRESH, payload);
  }
}

export default new ApiAuth(http);
