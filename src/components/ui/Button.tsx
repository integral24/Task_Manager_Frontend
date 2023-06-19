import cn from 'classnames';
import React from 'react';

interface IProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	text: string;
	className?: string;
	color?: 'primary' | 'secondary';
	disabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	borderRadius?: 'br0' | 'br1' | 'br2' | 'br3';
}

const Button: React.FC<IProps> = (props): JSX.Element => {
	const {
		size,
		text,
		className,
		color = 'primary',
		disabled,
		onClick,
		type = 'button',
		borderRadius,
	} = props;

	return (
		<button
			onClick={onClick}
			className={cn({
				button: true,
				[size ? size : '']: !!size,
				[color]: true,
				[borderRadius ? borderRadius : '']: !!borderRadius,
				[className ? className : '']: !!className,
			})}
			type={type}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
