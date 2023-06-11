export interface IUser {
  id: number | null;
  name: string | null;
  email: string | null;
}

export interface IResponseSign {
  successToken: string;
  user: IUser;
}

export interface IUserData {
  name: string;
  email: string;
  pass: string;
}
