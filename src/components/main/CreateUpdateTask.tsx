import cn from 'classnames';
import { memo, useState } from 'react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';

import { createTask, updateTask } from '@/redux/slices/actions/actionsTasks';

import { ITask, ITaskCreate, typeOptions } from '@/types/TasksTypes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { optionItems } from '@/utils/constants';

interface IProps {
	mode: 'create' | 'view';
	original?: ITask | null;
	currentTitle?: string;
	close: () => void;
	setTitleValue?: React.Dispatch<React.SetStateAction<string>>;
}

const CreateUpdateTask: React.FC<IProps> = memo(
	({ mode, original, currentTitle, close, setTitleValue }) => {
		const [isEdit, setIsEdit] = useState<boolean>(false);
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
			if (setTitleValue) setTitleValue('');
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
			<div
				className={cn({
					'edit-modal': true,
					'edit-mode': isEdit,
					[mode]: true,
				})}
			>
				<div className="edit-modal__category">
					Категория:
					{isEdit || mode === 'create' ? (
						<Select
							options={optionItems}
							setOptionCurrentTitle={setOptionCurrentTitle}
							optionCurrentTitle={type}
						/>
					) : (
						' ' + type
					)}
				</div>

				<div className="edit-modal__wrap">
					<Input
						label="Название задачи"
						focus
						onChange={newTitileHandler}
						value={title}
						className="edit-modal__title-modal"
						placeholder="Начните писать задачу..."
						readonly={mode === 'create' ? false : !isEdit}
					/>
				</div>
				<div className="edit-modal__wrap">
					<Textarea
						onChange={newDescriptionHandler}
						rows={5}
						value={description || ''}
						placeholder="Добавьте подробное описание задачи..."
						label="Описание"
						readonly={mode === 'create' ? false : !isEdit}
					/>
				</div>

				<div className="edit-modal__buttons">
					{mode === 'view' ? (
						<>
							{isEdit ? (
								<Button
									onClick={submitTaskHandler}
									text="Сохранить изменения"
								/>
							) : (
								<Button onClick={() => setIsEdit(true)} text="Редактировать" />
							)}
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
