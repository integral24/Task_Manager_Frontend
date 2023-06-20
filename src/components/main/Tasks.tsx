import { ITask } from '../../types/TasksTypes';
import { memo } from 'react';

interface IProps {
	tasks: ITask[];
	editTask: (t: ITask) => void;
}

const Tasks: React.FC<IProps> = memo(function TaskComponent({
	tasks,
	editTask,
}): JSX.Element {
	console.count('task component');
	return (
		<>
			<div className="tasks">
				{tasks.map((task) => (
					<div key={task.id} className="task-item">
						<div className="task-item__title">{task.title}</div>
						<div className="task-item__text">{task.description}</div>
						<span
							onClick={() => editTask(task)}
							className="task-item__edit svg-icon edit"
						></span>
					</div>
				))}
			</div>
		</>
	);
});

export default Tasks;
