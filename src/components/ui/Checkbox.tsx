import React from 'react';
import cn from 'classnames';
import { getUnicID } from '@/helpers';

const ID = getUnicID('checkbox');

interface ICheckbox {
  className?: string;
  labelText?: string;
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<ICheckbox> = (props: ICheckbox): JSX.Element => {
  const { className, labelText, name, checked, onChange } = props;

  return (
    <div>
      <input
        className={cn({
          checkbox: true,
          [className ? className : '']: !!className,
          active: checked,
        })}
        type="checkbox"
        id={ID}
        name={name}
        defaultChecked={checked}
        onChange={onChange}
      />
      <label htmlFor={ID}>{labelText}</label>
    </div>
  );
};

export default Checkbox;
