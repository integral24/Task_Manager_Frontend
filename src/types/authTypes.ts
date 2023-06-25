export interface IUser {
	id: number | null;
	name: string | null;
	email: string | null;
}

export interface IResponseSign {
	successToken: string;
	user: IUser;
	message?: string;
}

export interface IUserDataSignup {
	[x: string]: any;
	name: string;
	email: string;
	pass: string;
}

export interface IUserDataSignin {
	email: string;
	pass: string;
}
