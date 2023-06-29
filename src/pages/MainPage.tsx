import { useState } from 'react';

import BlockManageTasks from '@/components/main/BlockManageTasks';
import CreateUpdateTask from '@/components/main/CreateUpdateTask';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import Modal from '@/components/ui/Modal';

import { createTask } from '@/redux/slices/actions/actionsTasks';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';

const MainPage: React.FC = (): JSX.Element => {
	const [titleValue, setTitleValue] = useState<string>('');
	const [modalEditShow, setModalEditShow] = useState(false);
	const { id } = useAppSelector((state) => state.authSlice.user);
	const dispatch = useAppDispatch();

	const onClickClear = () => setTitleValue('');
	const createNewTask = () => {
		if (titleValue && id) {
			const newTask = {
				userId: id,
				title: titleValue,
				description: '',
				done: false,
				type: 'Обычные',
			};
			dispatch(createTask(newTask)).then(() => setTitleValue(''));
		}
	};

	return (
		<div className="page main-page">
			<div className="content-page">
				<div className="main-page__top-block">
					<div className="main-page__main-input-container">
						<div className="main-page__main-input-wrap">
							<label htmlFor="main-input" className="main-input-label">
								<div className="svg-edit" />
								<Input
									size="xl"
									onChange={setTitleValue}
									placeholder="Начните писать задачу..."
									value={titleValue}
									className="main-input"
								/>
								{titleValue && (
									<div className="svg-close" onClick={onClickClear} />
								)}
							</label>
						</div>
						<div className="open-editor" onClick={() => setModalEditShow(true)}>
							<span>
								{!titleValue
									? 'Открыть полный редактор'
									: 'Продолжить в полном редакторе'}
							</span>
						</div>
					</div>
					<Button
						size="xl"
						text="Создать"
						color="primary"
						borderRadius="br1"
						className="main-button-create"
						onClick={createNewTask}
					/>
				</div>
				<Modal
					type="full"
					close={() => setModalEditShow(false)}
					isOpen={modalEditShow}
					blur={true}
				>
					<CreateUpdateTask
						mode="create"
						currentTitle={titleValue}
						close={() => setModalEditShow(false)}
						setTitleValue={setTitleValue}
					/>
				</Modal>

				<BlockManageTasks />
				<Loader type="global" isOpen={false} />
			</div>
		</div>
	);
};

export default MainPage;
