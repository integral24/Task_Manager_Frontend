import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { useOnClickOutside } from 'usehooks-ts';
import { CSSTransition } from 'react-transition-group';

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
  const nodeRef = useRef(null);
  const refSelect = useRef(null);

  const setIsOpenHandler = () => setIsOpen((prev) => !prev);

  useOnClickOutside(refSelect, () => setIsOpen(false));

  return (
    <div
      ref={refSelect}
      className={cn({
        select: true,
        open: isOpen,
        [className ?? '']: !!className,
      })}
    >
      <div className="select__current-title" onClick={setIsOpenHandler}>
        {optionCurrentTitle}
        <span
          className={'svg-icon '.concat(!isOpen ? 'arrow-up' : 'arrow-down')}
        />
      </div>

      <CSSTransition
        classNames="slide-an"
        unmountOnExit
        nodeRef={nodeRef}
        in={isOpen}
        timeout={100}
      >
        <div className="select__options" ref={nodeRef}>
          {options.map(({ title, icon }) => (
            <div key={title} onClick={() => setOptionCurrentTitle(title)}>
              <span
                className={cn({
                  select__icon: true,
                  [icon ? 'svg-icon ' + icon : '']: !!icon,
                })}
              />
              <span className="select__title">{title}</span>
            </div>
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Select;
