import { useState } from 'react';
import Select from '../ui/Select';
import Tasks from './Tasks';
import tasksListTemp from './tasksListTemp';

const BlockManageTasks: React.FC = () => {
  const [optionCurrentTitle, setOptionCurrentTitle] = useState('Важные');
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
        <Tasks tasks={tasksListTemp} />
      </div>
    </div>
  );
};

export default BlockManageTasks;
