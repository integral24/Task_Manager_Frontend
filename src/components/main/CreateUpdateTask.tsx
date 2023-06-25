import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { memo, useEffect, useRef, useState } from 'react';

import { updateTask } from '@/redux/slices/actions/actionsTasks';
import taskSlice from '@/redux/slices/taskSlice';

import { ITask, typeOptions } from '@/types/TasksTypes';

import { useAppDispatch } from '@/hooks/redux';
import { optionItem } from '@/utils/constants';

interface IProps {
	mode: 'create' | 'update';
	original?: ITask | null;
}

const CreateUpdateTask: React.FC<IProps> = memo(({ mode, original }) => {
	const dispatch = useAppDispatch();
	// const [originalTask] = useState<ITask | null>(original || null);
	//
	const [title, setTitle] = useState<string>(original?.title || '');

	const [description, setDescription] = useState<string | null>(
		original?.description || null
	);
	const [type, setType] = useState<typeOptions>(original?.type || 'Обычные');

	const submitTaskHandler = () => {
		if (mode === 'create') {
			console.log('create');
		} else if (original) {
			console.log('update', type);
			const newTask: ITask = {
				id: original?.id,
				title: title.trim(),
				type,
				description: description?.trim() || '',
				done: original.done,
			};
			dispatch(updateTask(newTask));
		}
	};

	const cancelEditHandler = () => {
		// ф-я закрытия
		console.log('cancelEditHandler');
	};

	const newTitileHandler = (value: string) => {
		console.log(value);
		setTitle(value);
	};

	const setOptionCurrentTitle = (value: typeOptions) => {
		setType(value);
	};

	return (
		<div className="edit-modal">
			<div className="edit-modal__category">
				Категории:
				<Select
					options={optionItem}
					setOptionCurrentTitle={setOptionCurrentTitle}
					optionCurrentTitle={type}
				/>
			</div>

			<div className="edit-modal__wrap">
				<Input
					label="Название задачи"
					focus
					onChange={newTitileHandler}
					value={title}
					className="edit-modal__title-modal"
					placeholder=""
				/>
			</div>
			<div className="edit-modal__wrap">
				<label>Описание</label>
				<textarea
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						setDescription(e.target.value)
					}
					rows={5}
					value={description || ''}
				/>
			</div>

			<div className="edit-modal__buttons">
				{mode === 'update' ? (
					<>
						<Button onClick={submitTaskHandler} text="Сохранить изменения" />
						<Button onClick={cancelEditHandler} text="Отмена" />
					</>
				) : (
					<Button onClick={submitTaskHandler} text="Создать" />
				)}
			</div>
		</div>
	);
});

export default CreateUpdateTask;
