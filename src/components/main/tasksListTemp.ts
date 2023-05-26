import { ITask } from '../../types/TasksTypes';

export default [
  {
    id: 1,
    title: 'Задвча 1',
    text: 'Некоторый текст задачи',
    type: 'Горящие',
    status: 'active',
  },
  {
    id: 2,
    title: 'Задвча 2',
    text: 'Некоторый текст задачи',
    type: 'Важные',
    status: 'active',
  },
  {
    id: 3,
    title: 'Задвча 3',
    text: 'Некоторый текст задачи',
    type: 'Тривиальные',
    status: 'active',
  },
] as unknown as ITask[];
// 'Горящие' | 'Важные' | 'Тривиальные';
