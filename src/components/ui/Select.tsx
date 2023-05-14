import React, { useState } from 'react';
import cn from 'classnames';

interface ISelect {
  options: { title: string; icon: string }[];
  className?: string;
  setOptionCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
  optionCurrentTitle: string;
}

const Select: React.FC<ISelect> = (props): JSX.Element => {
  const { options, className, setOptionCurrentTitle, optionCurrentTitle } =
    props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIsOpenHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={cn({
        select: true,
        [className ?? '']: !!className,
      })}
    >
      <div className="select__current-title" onClick={setIsOpenHandler}>
        {optionCurrentTitle}
      </div>
      {isOpen && (
        <div>
          {options
            .filter(({ title }) => title !== optionCurrentTitle)
            .map(({ title, icon }) => (
              <div key={title} onClick={() => setOptionCurrentTitle(title)}>
                <span className="select__icon">{icon}</span>
                <span className="select__title">{title}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Select;
