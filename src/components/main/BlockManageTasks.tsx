import { useState, useEffect } from 'react';
import Select from '../ui/Select';
import Tasks from './Tasks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getTasks } from '@/redux/slices/actionsTasks';

const BlockManageTasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.taskSlice);
  const [optionCurrentTitle, setOptionCurrentTitle] = useState('Важные');

  useEffect(() => {
    dispatch(getTasks(1));
  }, []);

  const optionItem = [
    {
      title: 'Горящие',
      icon: 'fire',
    },
    {
      title: 'Важные',
      icon: 'infocircle',
    },
    {
      title: 'Тривиальные',
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
        <Tasks tasks={tasks} />
      </div>
    </div>
  );
};

export default BlockManageTasks;
