import { ls } from '@/utils';

type Itoken = string | null;

export const KEY_STORAGE_TOKEN = 'accessToken';

export const setToken = (token: Itoken) => {
	ls.set(KEY_STORAGE_TOKEN, token);
};

export const getToken = () => {
	const token = ls.get(KEY_STORAGE_TOKEN);
	return token;
};
