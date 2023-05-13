import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';

const MainPage: React.FC = () => {
  const tasks = useAppSelector((state: RootState) => state.taskSlice.tasks);

  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="page">
      <h1>Main Page</h1>
      <Button
        size="lg"
        text="Press here"
        color="secondary"
        className="Cool"
        onClick={isOpenHandler}
        type="button"
        borderRadius="br2"
      />
      <Input
        borderRadius="br-2"
        placeholder="Login"
        value={value}
        onChange={onChangeHandler}
      />
      <Modal close={isOpenHandler} type="full" isOpen={isOpen}>
        <div>My some modal </div>
      </Modal>
      <Checkbox id="testCheckbox" checked="checked" labelText="Check it here" />
    </div>
  );
};

export default MainPage;
