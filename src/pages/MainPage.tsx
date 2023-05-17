import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Checkbox from '@/components/ui/Checkbox';
import Select from '@/components/ui/Select';

const MainPage: React.FC = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [optionCurrentTitle, setOptionCurrentTitle] =
    useState<string>('Срочные');

  const isOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
  };

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
      <br />
      <Input placeholder="Login" value={value} onChange={onChangeHandler} />
      <Modal close={isOpenHandler} type="full" isOpen={isOpen}>
        <div>My some modal </div>
      </Modal>
      <Checkbox
        checked={check}
        onChange={onCheckHandler}
        labelText="Check it here"
      />
      <Select
        options={optionItem}
        optionCurrentTitle={optionCurrentTitle}
        setOptionCurrentTitle={setOptionCurrentTitle}
      />
    </div>
  );
};

export default MainPage;
