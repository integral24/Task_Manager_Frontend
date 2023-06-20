import cn from 'classnames';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IProps {
	isOpen: boolean;
	type: 'global' | 'local';
}

const loaderPortal = document.getElementById('global-loader-app');

const Loader: React.FC<IProps> = (props): JSX.Element => {
	const { isOpen, type } = props;
	const nodeRef = useRef(null);

	const transitionComponent = (loader: JSX.Element) => (
		<CSSTransition
			classNames="list"
			unmountOnExit
			nodeRef={nodeRef}
			in={isOpen}
			timeout={300}
		>
			<div
				ref={nodeRef}
				className={cn({
					loader: true,
					blur: blur,
				})}
			>
				{loader}
			</div>
		</CSSTransition>
	);

	const globalLodaer = () =>
		loaderPortal &&
		createPortal(
			transitionComponent(<span className="loader"></span>),
			loaderPortal
		);

	return (
		<>
			{' '}
			{type === 'global'
				? globalLodaer()
				: transitionComponent(<span className="loader"></span>)}
			{}
		</>
	);
};

export default Loader;
