export interface ITask {
	id: number;
	userId?: number;
	title: string;
	description: string;
	done: boolean;
	createDate?: string;
	type: typeOptions;
}

export interface IResponse {
	tasks: ITask[];
	message: string;
}

export type typeOptions = 'Срочные' | 'Важные' | 'Обычные' | 'Все';

export interface ITaskCreate {
	userId: number;
	title: string;
	description: string;
	done: boolean;
	type: string;
}
