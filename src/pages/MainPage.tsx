import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const MainPage: React.FC = () => {
  const tasks = useAppSelector((state: RootState) => state.taskSlice.tasks);

  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setValue(e.target.value);
  };

  return (
    <div className="page">
      <h1>Main Page</h1>
      <Button size="md" text="Click" color="primary" className="Active" />
      <Button
        size="lg"
        text="Press here"
        color="secondary"
        className="Cool"
        disabled
      />
      <Input placeholder="Login" value={value} onChange={onChangeHandler} />
    </div>
  );
};

export default MainPage;
