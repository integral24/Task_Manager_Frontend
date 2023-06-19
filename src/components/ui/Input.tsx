import cn from 'classnames';
import React from 'react';

interface IProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	placeholder: string;
	className?: string;
	disabled?: boolean;
	value: string;
	id?: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	onInput?: () => void;
	onFocus?: () => void;
}

const Input: React.FC<IProps> = (props): JSX.Element => {
	const { size, placeholder, className, disabled, onChange, value, id } = props;

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<input
			className={cn({
				input: true,
				[size || 'md']: true,
				[className ? className : '']: !!className,
			})}
			placeholder={placeholder}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeHandler(e)}
			disabled={disabled}
			type="input"
			value={value}
			id={id}
		/>
	);
};

export default Input;
