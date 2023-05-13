import React from 'react';
import cn from 'classnames';

interface ICheckbox {
  className?: string;
  labelText?: string;
  id: string;
  name?: string;
  value?: string;
  checked: string;
  onChange?: () => void;
}

const Checkbox: React.FC<ICheckbox> = (props: ICheckbox): JSX.Element => {
  const { className, labelText, id, name, value, checked, onChange } = props;
  return (
    <div>
      <input
        className={cn({
          [className ? className : '']: !!className,
        })}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        // checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};

export default Checkbox;
