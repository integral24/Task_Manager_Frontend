import React from 'react';

interface IProps {
  sidebar: boolean;
}

const About: React.FC<IProps> = (props) => {
  return <div className="page">About</div>;
};

export default About;
