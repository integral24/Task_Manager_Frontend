import { useState, useEffect } from 'react';
import Select from '../ui/Select';
import Tasks from './Tasks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getTasks } from '@/redux/slices/actionsTasks';

const BlockManageTasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskSlice.tasks);
  const [optionCurrentTitle, setOptionCurrentTitle] = useState('Обычные');

  useEffect(() => {
    dispatch(getTasks(1));
  }, []);

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
          <Tasks tasks={tasks} />
        ) : (
          <div>У вас нет дел</div>
        )}
      </div>
    </div>
  );
};

export default BlockManageTasks;
