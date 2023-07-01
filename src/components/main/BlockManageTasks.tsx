// import Loader from '../ui/Loader';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Select from '../ui/Select';
import { memo, useCallback, useEffect, useState } from 'react';

import { deleteTask, getTasks } from '@/redux/slices/actions/actionsTasks';

import { ITask, typeOptions } from '@/types/TasksTypes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { optionItem } from '@/utils/constants';

import CreateUpdateTask from './CreateUpdateTask';
import Tasks from './Tasks';

const BlockManageTasks: React.FC = memo(function BlockManageTasksComponent() {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) => state.taskSlice.tasks);
	// const status = useAppSelector((state) => state.taskSlice.status);

	const [optionCurrentTitle, setOptionCurrentTitle] =
		useState<typeOptions>('Обычные');
	const [modalEditShow, setModalEditShow] = useState(false);
	const [modalDeleteShow, setModalDeleteShow] = useState(false);
	const [taskEdit, setTaskEdit] = useState<ITask | null>(null);
	const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

	const editTaskHandler = useCallback((task: ITask) => {
		setModalEditShow(true);
		setTaskEdit(task);
	}, []);

	const deleteTaskHandler = (id: number) => {
		setDeletingTaskId(id);
		setModalDeleteShow(true);
	};

	useEffect(() => {
		dispatch(getTasks());
	}, []);

	useEffect(() => {
		if (!modalEditShow && taskEdit) {
			setTaskEdit(null);
		}
	}, [modalEditShow]);

	const submitDeleteTask = () => {
		if (deletingTaskId) {
			dispatch(deleteTask(deletingTaskId));
		}
		setModalDeleteShow(false);
	};

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
						<Tasks
							editTask={editTaskHandler}
							deleteTask={deleteTaskHandler}
							tasks={tasks}
						/>
						{/* <Loader type="local" isOpen={status === 'loading'} /> */}
					</>
				) : (
					<div>Все сделано!</div>
				)}
			</div>
			<Modal
				type="dialog"
				close={() => setModalDeleteShow(false)}
				isOpen={modalDeleteShow}
				blur={true}
			>
				<h3>Удалить?</h3>
				<div className="block-tasks__dialog__buttons">
					<Button onClick={submitDeleteTask} text="Да" />
					<Button onClick={() => setModalDeleteShow(false)} text="Отмена" />
				</div>
			</Modal>
			<Modal
				type="full"
				close={() => setModalEditShow(false)}
				isOpen={modalEditShow}
				blur={true}
			>
				<CreateUpdateTask
					mode="view"
					original={taskEdit}
					close={() => setModalEditShow(false)}
				/>
			</Modal>
		</div>
	);
});

export default BlockManageTasks;
