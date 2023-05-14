import React from 'react';
import cn from 'classnames';

interface IInput {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  borderRadius: 'br-1' | 'br-2' | 'br-3';
  placeholder: string;
  className?: string;
  disabled?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: () => void;
  onFocus?: () => void;
}

const Input: React.FC<IInput> = (props): JSX.Element => {
  const {
    size,
    placeholder,
    className,
    borderRadius,
    disabled,
    onChange,
    value,
  } = props;

  return (
    <input
      className={cn({
        input: true,
        [size || 'md']: true,
        [borderRadius]: !!borderRadius,
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
