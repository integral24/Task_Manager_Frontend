import cn from 'classnames';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IProps {
	type: 'full' | 'dialog';
	children: React.ReactNode;
	isOpen: boolean;
	close: () => void;
	blur?: boolean;
}

const modalPortal = document.getElementById('modal');

const Modal: React.FC<IProps> = (props): JSX.Element => {
	const { type, isOpen, children, close, blur = false } = props;
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
							className={cn({
								modal: true,
								blur: blur,
							})}
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
