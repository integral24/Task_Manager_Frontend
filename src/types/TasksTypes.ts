export interface ITask {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  type: 'Горящие' | 'Важные' | 'Тривиальные';
  done: boolean;
}
