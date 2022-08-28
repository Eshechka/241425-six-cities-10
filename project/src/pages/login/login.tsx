import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import Header from '../../components/header/header';
import { AppRoute, authValidation, CITIES, getRandomInteger, headerView } from '../../const';
import { AuthData } from '../../types/auth';
import { City } from '../../types/city';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/data-offers/data-offers';


function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity: City = CITIES[getRandomInteger(0, CITIES.length - 1)];
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [isLoginIncorrect, setIsLoginIncorrect] = useState<boolean | null>(null);
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState<boolean | null>(null);
  const [loginLength, setLoginLength] = useState(loginRef.current?.value.length);
  const [passwordLength, setPasswordLength] = useState(passwordRef.current?.value.length);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const isLoginCorrect = authValidation.login.regexp.test(loginRef.current.value);
      setIsLoginIncorrect(!isLoginCorrect);
      const isPasswordCorrect = authValidation.password.regexp.test(passwordRef.current.value);
      setIsPasswordIncorrect(!isPasswordCorrect);

      if (isLoginCorrect && isPasswordCorrect) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }
  };


  return (
    <div className="page page--gray page--login">
      <Header view={headerView.WOAuth}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <span style={{fontSize: '10px', color: 'red', display: `${isLoginIncorrect === true ? 'block' : 'none'}`}}>Введите корректный email</span>
                <input ref={loginRef}
                  onChange={(e) => setLoginLength(e.target.value.length)}
                  className="login__input form__input"
                  type="email" name="email" placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <span style={{fontSize: '10px', color: 'red', display: `${isPasswordIncorrect === true ? 'block' : 'none'}`}}>Пароль должен содержать хотя бы одну букву и одну цифру</span>
                <input ref={passwordRef}
                  onChange={(e) => setPasswordLength(e.target.value.length)}
                  className="login__input form__input"
                  type="password" name="password" placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button"
                type="submit"
                disabled={!loginLength || !passwordLength}
              >
                  Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(changeCity({city: randomCity}));
                  navigate(AppRoute.Root);
                }}
              >
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>);
}

export default Login;
