import { createPortal } from 'react-dom';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useRef } from 'react';

interface IProps {
  message: string;
  isOpen: boolean;
  type: 'success' | 'message' | 'error';
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  time?: number;
}

const notificationPortal = document.getElementById('notification');

const Notification: React.FC<IProps> = (props) => {
  const { message, isOpen, type, setIsOpen, time } = props;
  const nodeRef = useRef(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        setIsOpen(false);
        clearTimeout(timeout);
      }, (time || 3) * 1000);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const createNonificationHtml = () => {
    return (
      <CSSTransition
        classNames="rtg-ft"
        unmountOnExit
        nodeRef={nodeRef}
        in={isOpen}
        timeout={300}
      >
        <div
          ref={nodeRef}
          className={cn({
            notification: true,
            [type]: true,
          })}
          onClick={() => setIsOpen(false)}
        >
          <div className="notification__content">
            <span
              className={cn({
                'svg-icon': true,
                [type]: true,
              })}
            ></span>
            {message}
          </div>
        </div>
      </CSSTransition>
    );
  };
  return (
    <>
      {notificationPortal &&
        createPortal(createNonificationHtml(), notificationPortal)}
    </>
  );
};

export default Notification;
