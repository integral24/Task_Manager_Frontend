import Input from '@/components/ui/Input';

interface IProps {
	email: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	pass: string;
	setPass: React.Dispatch<React.SetStateAction<string>>;
}

const Signin: React.FC<IProps> = (props): JSX.Element => {
	const { email, pass, setEmail, setPass } = props;
	return (
		<div className="auth-page__form">
			<Input placeholder="Введите email" value={email} onChange={setEmail} />
			<Input placeholder="Введите пароль" value={pass} onChange={setPass} />
		</div>
	);
};

export default Signin;
