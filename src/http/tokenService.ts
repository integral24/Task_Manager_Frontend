import { ls } from '@/helpers';

interface Itoken {
  successToken: string | null;
}

export const KEY_STORAGE_TOKEN = 'successToken';

export const setToken = (token: Itoken) => {
  ls.set(KEY_STORAGE_TOKEN, token);
};

export const getToken = () => {
  const token = ls.get(KEY_STORAGE_TOKEN);
  return token;
};
