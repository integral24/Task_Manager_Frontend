import cn from 'classnames';
import { memo } from 'react';

import { ITask } from '@/types/TasksTypes';

import { iconNameFromType } from '@/utils';

interface IProps {
	tasks: ITask[];
	editTask: (t: ITask) => void;
}

const generateIconName = (type: string) => iconNameFromType(type);

const Tasks: React.FC<IProps> = memo(function TaskComponent({
	tasks,
	editTask,
}): JSX.Element {
	return (
		<>
			<div className="tasks">
				{tasks.map((task) => (
					<div key={task.id} className="task-item">
						<div title={task.type} className="task-item__title">
							<span
								className={cn({
									select__icon: true,
									'svg-icon': true,
									[generateIconName(task.type)?.color]: true,
									[generateIconName(task.type)?.icon]: true,
								})}
							/>
							{task.title}
						</div>
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
