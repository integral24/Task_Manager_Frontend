import cn from 'classnames';
import { log } from 'console';
import { memo, useEffect, useRef } from 'react';

import { ITask } from '@/types/TasksTypes';

import { iconNameFromType } from '@/utils';

interface IProps {
	tasks: ITask[];
	editTask: (t: ITask) => void;
	deleteTask: (id: number) => void;
}

const generateIconName = (type: string) => iconNameFromType(type);

const Tasks: React.FC<IProps> = memo(function TaskComponent({
	tasks,
	editTask,
	deleteTask,
}): JSX.Element {
	const taskBlockRef = useRef<HTMLDivElement>(null);

	// const resizeObserver = new ResizeObserver((entries) => {
	// 	const elem = entries[0]
	// 	console.log(elem);
	// });

	const resizeHandler = () => {
		const current = taskBlockRef.current;
		if (current) {
			const body = document.body;
			const tb = current.getBoundingClientRect();

			const runResizeHeight = (size: number) =>
				(current.style.height = size + 'px');

			if (tb.bottom > body.clientHeight) {
				runResizeHeight(tb.height - (tb.bottom - body.clientHeight + 40));
			} else {
				// runResizeHeight(tb.height + (tb.bottom - body.clientHeight + 40));
				console.log('tb.height', tb.height);
				console.log('tb.bottom', tb.bottom);
				console.log('body.clientHeight', body.clientHeight);
			}
		}
	};

	useEffect(() => {
		resizeHandler();
		window.addEventListener('resize', resizeHandler, true);

		return () => window.removeEventListener('resize', resizeHandler);
	}, [taskBlockRef]);

	return (
		<>
			<div ref={taskBlockRef} className="tasks">
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
						<div className="task-item__controls">
							<span
								onClick={() => editTask(task)}
								className="task-item__edit svg-icon edit"
							></span>
							<span
								onClick={() => deleteTask(task.id)}
								className="task-item__delete svg-icon delete"
							></span>
						</div>
					</div>
				))}
			</div>
		</>
	);
});

export default Tasks;
