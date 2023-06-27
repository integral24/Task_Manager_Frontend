import Loader from '../ui/Loader';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import { memo, useCallback, useEffect, useState } from 'react';

import { getTasks } from '@/redux/slices/actions/actionsTasks';

import { ITask, typeOptions } from '@/types/TasksTypes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { optionItem } from '@/utils/constants';

import CreateUpdateTask from './CreateUpdateTask';
import Tasks from './Tasks';

const BlockManageTasks: React.FC = memo(function BlockManageTasksComponent() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.taskSlice.tasks);
	const status = useAppSelector((state) => state.taskSlice.status);

	const [optionCurrentTitle, setOptionCurrentTitle] =
		useState<typeOptions>('Обычные');
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

	return (
		<div className="block-tasks">
			<div className="block-tasks__top">
				<div className="block-tasks__top__title">Ваши задачи</div>
				<div className="block-tasks__top__sort">
					Сортировка:
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
						{/* <Loader type="local" isOpen={status === 'loading'} /> */}
					</>
				) : (
					<div>Все сделано!</div>
				)}
			</div>
			<Modal
				type="full"
				close={() => setModalEditShow(false)}
				isOpen={modalEditShow}
				blur={true}
			>
				<CreateUpdateTask
					mode="update"
					original={taskEdit}
					close={() => setModalEditShow(false)}
				/>
			</Modal>
		</div>
	);
});

export default BlockManageTasks;
