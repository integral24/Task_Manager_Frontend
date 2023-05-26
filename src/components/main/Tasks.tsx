import { ITask } from '../../types/TasksTypes';

interface IProps {
  tasks: ITask[];
}

const Tasks: React.FC<IProps> = ({ tasks }): JSX.Element => {
  return (
    <>
      <div className="tasks">
        {tasks.map(({ id, text, title }) => (
          <div key={id} className="task-item">
            <div className="task-item__title">{title}</div>
            <div className="task-item__text">{text}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;
