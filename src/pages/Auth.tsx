import { useState } from 'react';
import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/hooks/redux';
import { signUp } from '@/redux/slices/actions/actionsAuth';

type ITypeAuth = 'Войти' | 'Зарегистрироваться';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [doublePass, setDoublePass] = useState('');
  const [name, setName] = useState('');
  const [typeAuth, setTypeAuth] = useState<ITypeAuth>('Войти');

  const dispatch = useAppDispatch();

  const changeAuthType = () => {
    return typeAuth === 'Войти' ? (
      <span onClick={() => setTypeAuth('Зарегистрироваться')}>
        Зарегистрироваться
      </span>
    ) : (
      <span onClick={() => setTypeAuth('Войти')}>Войти</span>
    );
  };

  const verification = () => {
    if (
      typeAuth === 'Зарегистрироваться' &&
      name &&
      email &&
      pass &&
      doublePass
    ) {
      if (pass === doublePass) {
        const userData = {
          name,
          email,
          pass,
        };
        dispatch(signUp(userData));
      } else
        console.log({
          error: `passwords don't match`,
        });
    }
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
          doublePass={doublePass}
          setDoublePass={setDoublePass}
          name={name}
          setName={setName}
        />
      )}

      <Button text={typeAuth} onClick={verification} />
      <div>{changeAuthType()}</div>
    </div>
  );
};

export default Auth;
