import React from 'react';
import cn from 'classnames';

interface Ibutton {
  size: 'sm' | 'md' | 'lg' | 'xl';
  text: string;
  className?: string;
  color: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  borderRadius: 'br0' | 'br1' | 'br2' | 'br3';
}

const Button: React.FC<Ibutton> = (props: Ibutton): JSX.Element => {
  const {
    size,
    text,
    className,
    color,
    disabled,
    onClick,
    type,
    borderRadius,
  } = props;

  return (
    <button
      onClick={onClick}
      className={cn({
        button: true,
        [size]: true,
        [className ? className : '']: !!className,
        [color]: true,
        [borderRadius]: true,
      })}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
