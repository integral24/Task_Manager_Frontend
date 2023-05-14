import cn from 'classnames';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  type: 'full' | 'dialog';
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

const modalPortal = document.getElementById('modal');

const Modal: React.FC<IProps> = (props) => {
  const { type, isOpen, children, close } = props;
  const nodeRef = useRef(null);

  const closeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      {modalPortal &&
        createPortal(
          <CSSTransition
            classNames="rtg-ft"
            unmountOnExit
            nodeRef={nodeRef}
            in={isOpen}
            timeout={300}
          >
            <div
              ref={nodeRef}
              className="modal"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => closeHandler(e)}
            >
              <div
                className={cn({
                  'modal-content': true,
                  ['modal__' + type]: true,
                })}
              >
                {children}
              </div>
            </div>
          </CSSTransition>,
          modalPortal
        )}
    </>
  );
};

export default Modal;
