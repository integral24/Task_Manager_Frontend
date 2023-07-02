import { IRoutes } from '@/components/Navigation';

import { typeOptions } from '@/types/TasksTypes';

export const sortingOptions: {
	title: typeOptions;
	icon: string;
	color: string;
}[] = [
	{
		title: 'Срочные',
		icon: 'fire',
		color: 'red',
	},
	{
		title: 'Важные',
		icon: 'infocircle',
		color: 'green',
	},
	{
		title: 'Обычные',
		icon: 'note',
		color: 'blue',
	},
	{
		title: 'Все',
		icon: 'note',
		color: 'blue',
	},
];

export const optionItems: {
	title: typeOptions;
	icon: string;
	color: string;
}[] = [
	{
		title: 'Срочные',
		icon: 'fire',
		color: 'red',
	},
	{
		title: 'Важные',
		icon: 'infocircle',
		color: 'green',
	},
	{
		title: 'Обычные',
		icon: 'note',
		color: 'blue',
	},
];

export const menu: IRoutes['routes'] = [
	{
		to: '/',
		name: 'Главная',
	},
	{
		to: '/timer',
		name: 'Таймер',
	},
	{
		to: '/auth',
		name: 'Войти',
	},
];
