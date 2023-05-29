import { TOKEN_TTL } from './apiAuthConfig';

type TJwt = {
  token: string;
  token_expiration: number;
  refresh_token: string;
  refresh_token_expiration: number;
};
class TokenService {
  private _jwt: TJwt = {
    token: '',
    token_expiration: 0,
    refresh_token: '',
    refresh_token_expiration: 0,
  };

  constructor() {
    console.log(this._jwt);
    this.init();
  }

  init(): void {
    const jwt = JSON.parse(<string>localStorage.getItem('jwt'));

    if (jwt !== null) {
      this._jwt = {
        ...this._jwt,
        ...jwt,
      };
    }
  }

  getToken(): string {
    return (
      JSON.parse(<string>localStorage.getItem('jwt'))?.token || this._jwt.token
    );
  }

  update(jwt: TJwt): void {
    jwt.token_expiration = ((Date.now() / 1000) | 0) + TOKEN_TTL;
    this._jwt = jwt;
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }

  isAuth(): boolean {
    return !!this._jwt.token;
  }

  jwt(): TJwt {
    return JSON.parse(<string>localStorage.getItem('jwt')) || this._jwt;
  }

  clean(): void {
    localStorage.removeItem('jwt');
  }
}

export default new TokenService();
