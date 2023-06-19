import Input from '@/components/ui/Input';

interface IProps {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	pass: string;
	setPass: React.Dispatch<React.SetStateAction<string>>;
	doublePass: string;
	setDoublePass: React.Dispatch<React.SetStateAction<string>>;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
}

const Signup: React.FC<IProps> = (props): JSX.Element => {
	const {
		email,
		pass,
		setEmail,
		setPass,
		name,
		setName,
		doublePass,
		setDoublePass,
	} = props;
	return (
		<div className="auth-page__form">
			<Input placeholder="Введите имя" value={name} onChange={setName} />
			<Input placeholder="Введите email" value={email} onChange={setEmail} />
			<Input placeholder="Введите пароль" value={pass} onChange={setPass} />
			<Input
				placeholder="Введите пароль еще раз"
				value={doublePass}
				onChange={setDoublePass}
			/>
		</div>
	);
};

export default Signup;
