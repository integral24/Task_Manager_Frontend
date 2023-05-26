export interface ITask {
  id: number;
  title: string;
  text: string;
  type: 'Горящие' | 'Важные' | 'Тривиальные';
  status: 'done' | 'active';
}
