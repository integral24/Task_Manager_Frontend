import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import { memo, useState } from 'react';

import { createTask, updateTask } from '@/redux/slices/actions/actionsTasks';

import { ITask, ITaskCreate, typeOptions } from '@/types/TasksTypes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { optionItem } from '@/utils/constants';

interface IProps {
	mode: 'create' | 'update';
	original?: ITask | null;
	currentTitle?: string;
	close: () => void;
	setTitleValue?: React.Dispatch<React.SetStateAction<string>>;
}

const CreateUpdateTask: React.FC<IProps> = memo(
	({ mode, original, currentTitle, close, setTitleValue }) => {
		const dispatch = useAppDispatch();
		const { id } = useAppSelector((state) => state.authSlice.user);
		const [title, setTitle] = useState<string>(
			original?.title || currentTitle || ''
		);

		const [description, setDescription] = useState<string | null>(
			original?.description || null
		);
		const [type, setType] = useState<typeOptions>(original?.type || 'Обычные');

		const submitTaskHandler = () => {
			if (mode === 'create') {
				if (title.trim() && id) {
					const newTask: ITaskCreate = {
						userId: id,
						title,
						description: description?.trim() || '',
						done: false,
						type,
					};
					dispatch(createTask(newTask)).then(
						() => setTitleValue && setTitleValue('')
					);
					close();
				}
			} else if (original && title.trim()) {
				const newTask: ITask = {
					id: original?.id,
					title: title.trim(),
					type,
					description: description?.trim() || '',
					done: original.done,
				};
				dispatch(updateTask(newTask));
				close();
			}
		};

		const cancelEditHandler = () => {
			if (setTitleValue) {
				setTitleValue('');
			}

			close();
		};

		const newTitileHandler = (value: string) => {
			setTitle(value);
		};

		const newDescriptionHandler = (value: string) => {
			setDescription(value);
		};

		const setOptionCurrentTitle = (value: typeOptions) => {
			setType(value);
		};

		return (
			<div className="edit-modal">
				<div className="edit-modal__category">
					Категория:
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
						placeholder="Начните писать задачу..."
					/>
				</div>
				<div className="edit-modal__wrap">
					<Textarea
						onChange={newDescriptionHandler}
						rows={5}
						value={description || ''}
						placeholder="Добавьте подробное описание задачи..."
						label="Описание"
					/>
				</div>

				<div className="edit-modal__buttons">
					{mode === 'update' ? (
						<>
							<Button onClick={submitTaskHandler} text="Сохранить изменения" />
							<Button onClick={cancelEditHandler} text="Отмена" />
						</>
					) : (
						<>
							<Button onClick={submitTaskHandler} text="Создать" />
							<Button onClick={cancelEditHandler} text="Отмена" />
						</>
					)}
				</div>
			</div>
		);
	}
);

export default CreateUpdateTask;
