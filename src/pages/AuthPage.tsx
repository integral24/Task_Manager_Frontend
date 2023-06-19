import { useState } from 'react';
import Signin from '@/components/auth/Signin';
import Signup from '@/components/auth/Signup';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/hooks/redux';
import { signIn, signUp } from '@/redux/slices/actions/actionsAuth';

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
        Зарегистрируйтесь
      </span>
    ) : (
      <span onClick={() => setTypeAuth('Войти')}>Войдите</span>
    );
  };

  const submitAuthHandler = () => {
    if (email && pass) {
      const userData = { name, email, pass };
      if (typeAuth === 'Зарегистрироваться') {
        if (pass !== doublePass) return ''; /* Error обработать*/
        dispatch(signUp(userData));
      }
      if (typeAuth === 'Войти') dispatch(signIn(userData));
    }
  };

  return (
    <div className="page auth-page">
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
      <Button
        className="auth-page__submit"
        text={typeAuth}
        onClick={submitAuthHandler}
      />
      <div className="auth-page__change-auth">
        {typeAuth === 'Войти' ? 'Войдите ' : 'Зарегистрируйтесь '}
        или&nbsp;
        {changeAuthType()}
      </div>
    </div>
  );
};

export default Auth;
