import cn from 'classnames';
import React, { useId } from 'react';

interface IProps {
	label?: string;
	placeholder: string;
	className?: string;
	value: string;
	onChange:
		| React.Dispatch<React.SetStateAction<string>>
		| ((p: string) => void);
	rows: number;
	readonly?: boolean;
}

const Textarea: React.FC<IProps> = (props): JSX.Element => {
	const {
		placeholder,
		className,
		onChange,
		value,
		label,
		rows,
		readonly = false,
	} = props;

	const fieldId = useId();

	const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<>
			<label htmlFor={fieldId}>{label ? label : ''}</label>
			<textarea
				className={cn({
					textarea: true,
					[className ? className : '']: !!className,
				})}
				placeholder={placeholder}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					changeHandler(e)
				}
				value={value}
				id={fieldId}
				rows={rows}
				readOnly={readonly}
			/>
		</>
	);
};

export default Textarea;
