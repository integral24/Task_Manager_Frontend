import BlockManageTasks from '@/components/main/BlockManageTasks';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createTask } from '@/redux/slices/actions/actionsTasks';

const MainPage: React.FC = (): JSX.Element => {
  const [titleValue, setTitleValue] = useState<string>('');
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
      dispatch(createTask(newTask));
    }
  };

  return (
    <div className="page main-page">
      <div className="content-page">
        <div className="main-page__top-block">
          <div className="main-page__main-input-wrap">
            <label htmlFor="main-input" className="main-input-label">
              <div className="svg-edit" />
              <Input
                size="xl"
                onChange={setTitleValue}
                placeholder="Начните писать задачу..."
                value={titleValue}
                className="main-input"
                id="main-input"
              />
              {titleValue && (
                <div className="svg-close" onClick={onClickClear} />
              )}
            </label>
          </div>
          <Button
            size="xl"
            text="Создать"
            color="primary"
            type="button"
            borderRadius="br1"
            className="main-button-create"
            onClick={createNewTask}
          />
        </div>
        <div className="main-page__buttons"></div>

        <BlockManageTasks />
      </div>
    </div>
  );
};

export default MainPage;
