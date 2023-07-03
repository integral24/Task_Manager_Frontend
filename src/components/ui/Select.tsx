import cn from 'classnames';
import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useOnClickOutside } from 'usehooks-ts';

import { typeOptions } from '@/types/TasksTypes';

interface IProps {
	options: { title: typeOptions; icon: string }[];
	className?: string;
	setOptionCurrentTitle:
		| React.Dispatch<React.SetStateAction<typeOptions>>
		| ((value: typeOptions) => void);
	optionCurrentTitle: typeOptions;
}

const Select: React.FC<IProps> = (props): JSX.Element => {
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
					className={'svg-icon '.concat(!isOpen ? 'arrow-down' : 'arrow-up')}
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
						<div
							key={title}
							onClick={() => {
								setIsOpen(false);
								setOptionCurrentTitle(title);
							}}
						>
							{icon && (
								<span
									className={cn({
										select__icon: true,
										'svg-icon': true,
										[icon]: true,
									})}
								/>
							)}

							<span className="select__title">{title}</span>
						</div>
					))}
				</div>
			</CSSTransition>
		</div>
	);
};

export default Select;
