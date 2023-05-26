import React, { useId } from 'react';
import cn from 'classnames';

interface IProps {
  className?: string;
  labelText?: string;
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<IProps> = (props): JSX.Element => {
  const { className, labelText, name, checked, onChange } = props;
  const id = useId();

  return (
    <div>
      <input
        className={cn({
          checkbox: true,
          [className ? className : '']: !!className,
          active: checked,
        })}
        type="checkbox"
        id={id}
        name={name}
        defaultChecked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};

export default Checkbox;
