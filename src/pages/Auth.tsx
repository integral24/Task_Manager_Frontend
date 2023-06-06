import { useState } from 'react';
import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import Button from '@/components/ui/Button';

//TODO: по умолчанию войти, плюс кнопку для сметы окна на регистрацию
type ITypeAuth = 'Войти' | 'Зарегистрироваться';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [typeAuth, setTypeAuth] = useState<ITypeAuth>('Войти');

  const changeAuthType = () => {
    return typeAuth === 'Войти' ? (
      <span onClick={() => setTypeAuth('Зарегистрироваться')}>
        Зарегистрироваться
      </span>
    ) : (
      <span onClick={() => setTypeAuth('Войти')}>Войти</span>
    );
  };

  return (
    <div>
      {typeAuth === 'Войти' ? (
        <Signin
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
        />
      ) : (
        <Signup
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
          name={name}
          setName={setName}
        />
      )}

      <Button text={typeAuth} />
      <div>{changeAuthType()}</div>
    </div>
  );
};

export default Auth;
