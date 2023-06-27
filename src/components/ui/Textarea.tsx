import cn from 'classnames';
import React from 'react';

interface IProps {
	label?: string;
	placeholder: string;
	className?: string;
	value: string;
	id?: string;
	onChange:
		| React.Dispatch<React.SetStateAction<string>>
		| ((p: string) => void);
	rows: number;
}

const Textarea: React.FC<IProps> = (props): JSX.Element => {
	const { placeholder, className, onChange, value, id, label, rows } = props;

	const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<>
			<label>{label ? label : ''}</label>
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
				id={id}
				rows={rows}
			/>
		</>
	);
};

export default Textarea;
