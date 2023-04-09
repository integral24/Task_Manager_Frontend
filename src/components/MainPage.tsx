import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { RootState } from '../redux/store';

function MainPage() {
  const tasks = useAppSelector((state: RootState) => state.taskSlice.tasks);

  return (
    <div className="page">
      <h1>Main Page</h1>
    </div>
  );
}

export default MainPage;
