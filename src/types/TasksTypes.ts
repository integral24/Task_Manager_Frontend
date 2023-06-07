export interface ITask {
  id: number;
  userId?: number;
  title: string;
  description: string;
  done: boolean;
  createDate: string;
  type: 'Срочные' | 'Важные' | 'Обычные';
}
