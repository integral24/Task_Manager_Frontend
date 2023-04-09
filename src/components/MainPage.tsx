import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { RootState } from '../redux/store';

function MainPage() {

  const tasks = useAppSelector((state: RootState) => state.taskSlice.tasks)
  console.log(tasks);
  return <div className="page">Main Page</div>;
}

export default MainPage;
