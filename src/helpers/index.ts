export const getUnicID = (prefix: string): string => {
  return (
    prefix +
    ((Math.random().toFixed(4) as unknown as number) * 10000).toString()
  );
};

export const ls = {
  get(key: string) {
    return JSON.parse(localStorage.getItem(key) || '');
  },
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
