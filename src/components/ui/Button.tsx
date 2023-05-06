import React from 'react';
import cn from 'classnames';

interface Ibutton {
  size: 'sm' | 'md' | 'lg' | 'xl';
  text: string;
  className?: string;
  color: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Ibutton> = (props: Ibutton): JSX.Element => {
  const { size, text, className, color, disabled, onClick } = props;
  return (
    <button
      className={cn({
        button: true,
        [size]: true,
        [className ? className : '']: !!className,
        [color]: true,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
