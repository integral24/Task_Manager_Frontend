import BlockManageTasks from '@/components/main/BlockManageTasks';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';

const MainPage: React.FC = (): JSX.Element => {
  const [nameTask, setNameTask] = useState<string>('');

  return (
    <div className="page main-page">
      <div className="content-page">
        <div className="main-page__top-block">
          <Input
            size="xl"
            onChange={setNameTask}
            placeholder="Напишите задачу здесь.."
            value={nameTask}
            className="main-page__main-input"
          />
          <Button
            size="xl"
            text="Создать Дело"
            color="primary"
            type="button"
            borderRadius="br1"
          />
        </div>
        <div className="main-page__buttons"></div>

        <BlockManageTasks />
      </div>
    </div>
  );
};

export default MainPage;
