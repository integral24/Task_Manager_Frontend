import cn from 'classnames';
import React, { useEffect, useRef } from 'react';

interface IProps {
	autocomplete?: boolean;
	label?: string;
	focus?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
	placeholder: string;
	className?: string;
	disabled?: boolean;
	value: string;
	id?: string;
	onChange:
		| React.Dispatch<React.SetStateAction<string>>
		| ((p: string) => void);
	onInput?: () => void;
	onFocus?: () => void;
}

const Input: React.FC<IProps> = (props): JSX.Element => {
	const {
		autocomplete = false,
		size,
		placeholder,
		className,
		disabled,
		onChange,
		value,
		id,
		focus = false,
		label,
	} = props;

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const refInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (focus) {
			onChange(value + ' ');
			refInput.current?.focus();
		}
	}, [focus]);

	return (
		<>
			<label>{label ? label : ''}</label>
			<input
				autoComplete={autocomplete ? '' : 'off'}
				ref={refInput}
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
		</>
	);
};

export default Input;
