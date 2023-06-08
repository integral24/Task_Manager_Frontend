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

  async signIn(payload: IPayload) {
    const res = await this.http?.post(urlAuth.SINGIN, payload);
    return res?.data;
  }

  async signUp(payload: IPayload) {
    const res = await this.http?.post(urlAuth.SIGNUP, payload);
    return res?.data;
  }

  async signOut(payload: IPayload) {
    const res = await this.http?.post(urlAuth.SIGNOUT, payload);
    return res?.data;
  }

  async refresh(payload: IPayload) {
    const res = await this.http?.post(urlAuth.REFRESH, payload);
    return res?.data;
  }
}

export default new ApiAuth(http);
