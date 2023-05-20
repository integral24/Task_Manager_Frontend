import React from 'react';
import cn from 'classnames';

interface IProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  placeholder: string;
  className?: string;
  disabled?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: () => void;
  onFocus?: () => void;
}

const Input: React.FC<IProps> = (props): JSX.Element => {
  const { size, placeholder, className, disabled, onChange, value } = props;

  return (
    <input
      className={cn({
        input: true,
        [size || 'md']: true,
        [className ? className : '']: !!className,
      })}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      type="input"
      value={value}
    />
  );
};

export default Input;
