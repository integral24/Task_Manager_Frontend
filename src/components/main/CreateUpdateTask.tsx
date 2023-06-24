import Input from '../ui/Input';
import { memo, useEffect, useRef, useState } from 'react';

import { ITask } from '@/types/TasksTypes';

interface IProps {
	type: 'create' | 'update';
	taskUpdate?: ITask | null;
}

const CreateUpdateTask: React.FC<IProps> = memo(({ type, taskUpdate }) => {
	const [task, setTask] = useState<ITask | null>(taskUpdate || null);

	const taskDataHAndler = (valueTask: string) => {
		console.log(valueTask);
	};

	return (
		<div className="edit-modal">
			<Input
				focus
				onChange={taskDataHAndler}
				value={task?.title || ''}
				className="edit-modal__title-modal"
				placeholder=""
			/>
			<div className="edit-modal__description-task">{task?.description}</div>
		</div>
	);
});

export default CreateUpdateTask;
