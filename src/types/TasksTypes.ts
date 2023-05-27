export interface ITask {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  type: 'Срочные' | 'Важные' | 'Обычные';
  done: boolean;
}
