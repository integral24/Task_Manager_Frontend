import { IRoutes } from '@/components/Navigation';

export const getUnicID = (prefix: string): string => {
	return (
		prefix +
		((Math.random().toFixed(4) as unknown as number) * 10000).toString()
	);
};

export const ls = {
	get(key: string) {
		const value = localStorage.getItem(key);
		return value ? value : null;
	},
	set(key: string, value: any) {
		localStorage.setItem(
			key,
			typeof value === 'object' ? JSON.stringify(value) : value
		);
	},
};

export const menu: IRoutes['routes'] = [
	{
		to: '/',
		name: 'Главная',
	},
	{
		to: '/about',
		name: 'О нас',
	},
	{
		to: '/auth',
		name: 'Войти',
	},
];
