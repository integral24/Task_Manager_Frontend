export interface ITask {
	id: number;
	userId?: number;
	title: string;
	description: string;
	done: boolean;
	createDate?: string;
	type: typeOptions;
}

export type typeOptions = 'Срочные' | 'Важные' | 'Обычные';

export interface ITaskCreate {
	userId: number;
	title: string;
	description: string;
	done: boolean;
	type: string;
}
