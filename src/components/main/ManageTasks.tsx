import Loader from '../ui/Loader';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import { memo, useCallback, useEffect, useState } from 'react';

import { getTasks } from '@/redux/slices/actions/actionsTasks';

import { ITask } from '@/types/TasksTypes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import CreateUpdateTask from './CreateUpdateTask';
import Tasks from './Tasks';

const BlockManageTasks: React.FC = memo(function BlockManageTasksComponent() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.taskSlice.tasks);
	const status = useAppSelector((state) => state.taskSlice.status);

	const [optionCurrentTitle, setOptionCurrentTitle] = useState('Обычные');
	const [modalEditShow, setModalEditShow] = useState(false);
	const [taskEdit, setTaskEdit] = useState<ITask | null>(null);

	const editTaskHandler = useCallback((task: ITask) => {
		setModalEditShow(true);
		setTaskEdit(task);
	}, []);

	useEffect(() => {
		dispatch(getTasks());
	}, []);

	useEffect(() => {
		if (!modalEditShow && taskEdit) {
			setTaskEdit(null);
		}
	}, [modalEditShow]);

	const optionItem = [
		{
			title: 'Срочные',
			icon: 'fire',
		},
		{
			title: 'Важные',
			icon: 'infocircle',
		},
		{
			title: 'Обычные',
			icon: 'note',
		},
	];
	return (
		<div className="block-tasks">
			<div className="block-tasks__top">
				<div className="block-tasks__top__title">Ваши задачи</div>
				<div className="block-tasks__top__sort">
					Категории:
					<Select
						options={optionItem}
						setOptionCurrentTitle={setOptionCurrentTitle}
						optionCurrentTitle={optionCurrentTitle}
					/>
				</div>
			</div>
			<div className="block-tasks__bottom">
				{tasks && tasks.length ? (
					<>
						<Tasks editTask={editTaskHandler} tasks={tasks} />
						<Loader type="local" isOpen={status === 'loading'} />
					</>
				) : (
					<div>У вас нет дел</div>
				)}
			</div>
			<Modal
				type="full"
				close={() => setModalEditShow(false)}
				isOpen={modalEditShow}
				blur={true}
			>
				<CreateUpdateTask type="update" taskUpdate={taskEdit} />
			</Modal>
		</div>
	);
});

export default BlockManageTasks;
