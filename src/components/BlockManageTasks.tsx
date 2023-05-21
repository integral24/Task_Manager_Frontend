import { useState } from 'react';
import Select from './ui/Select';

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
        <Select
          options={optionItem}
          setOptionCurrentTitle={setOptionCurrentTitle}
          optionCurrentTitle={optionCurrentTitle}
        />
      </div>
    </div>
  );
};

export default BlockManageTasks;
