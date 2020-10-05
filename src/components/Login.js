import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { Link, useHistory } from 'react-router-dom';
import { apiAuth } from '../utils/api';
import Header from './Header';

function Login({ setIsLoggedIn }) {

  const [message, setMessage] = React.useState('');

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const history = useHistory();

  function handleSubmit (evt) {
    evt.preventDefault();

    apiAuth.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          setMessage('');
          console.log(res);
          setIsLoggedIn(true);
          history.push('/');
        } else {
          setMessage('Что-то пошло не так!');
        }
      })
      .catch(() => {
        setMessage('Что-то пошло не так!');
        console.log('Ошибка!')
      });
  };

  return (
    <>
      <Header mainPage={false} path="/sign-up" linkName="Зарегистрироваться" />
      <section className="login-page">
        <form className="form form_type_dark form_type_full-page" onSubmit={handleSubmit} noValidate>
          <h1 className="form__title form__title_type_light form__title_position_center">Вход</h1>
          <h1 className="form__title form__title_type_light form__title_position_center">{message}</h1>
          <input
            value={values.email || ''}
            onChange={handleChange}
            type="email"
            name="email"
            className="form__input form__input_type_light"
            placeholder="Email"
            required />
          <span className="form__span-error">{errors.email || ''}</span>
          <input
            value={values.password || ''}
            onChange={handleChange}
            minLength="5"
            maxLength="12"
            type="password"
            name="password"
            className="form__input form__input_type_light"
            placeholder="Пароль"
            required />
          <span className="form__span-error">{errors.password || ''}</span>
          <button className={`form__button form__button_type_light form__button_type_login ${!isValid && 'form__button_type_light_inactive'}`} type="submit" aria-label="Войти" disabled={!isValid}>Войти</button>
          <p className="form__question">Еще не зарегистрированы?&nbsp;
            <Link to="/sign-up" className="form__link">Зарегистрироваться</Link>
          </p>

        </form>
      </section>
    </>
  );
}

export default Login;