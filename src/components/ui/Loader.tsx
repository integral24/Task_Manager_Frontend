import cn from 'classnames';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Ripple } from 'react-spinners-css';
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
			>
				{loader}
			</div>
		</CSSTransition>
	);

	const globalLodaer = () =>
		loaderPortal &&
		createPortal(transitionComponent(<Ripple color="red" />), loaderPortal);

	return (
		<>
			{' '}
			{type === 'global'
				? globalLodaer()
				: transitionComponent(<Ripple color="red" />)}
			{}
		</>
	);
};

export default Loader;
