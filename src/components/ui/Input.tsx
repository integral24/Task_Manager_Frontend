import React from 'react';
import cn from 'classnames';

interface IInput {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  placeholder: string;
  className?: string;
  disabled?: boolean;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onInput?: () => void;
  onFocus?: () => void;
}

const Input: React.FC<IInput> = (props): JSX.Element => {
  const { size, placeholder, className, disabled, onChange, value } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={cn({
        input: true,
        [size || 'md']: true,
        [className ? className : '']: !!className,
      })}
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
      disabled={disabled}
      type="input"
      value={value}
    />
  );
};

export default Input;
