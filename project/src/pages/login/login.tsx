import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import Header from '../../components/header/header';
import { AppRoute, CITIES, getRandomInteger, headerView } from '../../const';
import { AuthData } from '../../types/auth';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/data-offers/data-offers';
import { City } from '../../types/city';


function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity: City = CITIES[getRandomInteger(0, CITIES.length - 1)];
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
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
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
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
