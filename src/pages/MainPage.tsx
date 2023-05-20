import BlockManageTasks from '@/components/BlockManageTasks';
import Sidebar from '@/components/Sidebar';
import Input from '@/components/ui/Input';
import { useState } from 'react';

interface IProps {
  sidebar: boolean;
}

const MainPage: React.FC<IProps> = (props): JSX.Element => {
  const [nameTask, setNameTask] = useState<string>('');
  // const optionItem = [
  //   {
  //     title: 'Горящие',
  //     icon: 'fire',
  //   },
  //   {
  //     title: 'Важные',
  //     icon: 'infocircle',
  //   },
  //   {
  //     title: 'Тривиальные',
  //     icon: 'note',
  //   },
  // ];

  return (
    <div className="page">
      {props.sidebar && <Sidebar />}

      <div className="content-page">
        <div className="top-block">
          <Input
            size="md"
            onChange={setNameTask}
            placeholder="1"
            value={nameTask}
          />
        </div>
        <BlockManageTasks />
      </div>
    </div>
  );
};

export default MainPage;
