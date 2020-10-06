import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { Link, useHistory } from 'react-router-dom';
import { apiAuth } from '../utils/api';
import Header from './Header';
import InfoTooltip from './InfoTooltip';

function Register({ setIsLoggedIn, closeByEscAndOverlay }) {

  const [message, setMessage] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [hasRegistartionError, setHasRegistartionError] = React.useState(false);
  const history = useHistory();
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleAuthorization() {
    apiAuth.authorize(values.email, values.password)
      .then((res) => {
        if (res.token) {
          //setMessage('');
          //console.log(res);
          setIsLoggedIn(true);
          history.push('/');
        } else {
          //setMessage('Что-то пошло не так!');
          setIsInfoTooltipOpen(true);
          setHasRegistartionError(true);
        }
      })
      .catch(() => {
        setMessage('Что-то пошло не так!');
        console.log('Ошибка!');
        setIsInfoTooltipOpen(true);
        setHasRegistartionError(true);
      });
  }

  function handleSubmit (evt) {
    evt.preventDefault();

    apiAuth.register(values.email, values.password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setMessage('');
          console.log(res);
          setIsInfoTooltipOpen(true);
          setHasRegistartionError(false);
          //чтобы после регистрации сразу же прошла авторизация (как по макету), использую таймаут, чтобы сервер не ругался на множество запросов :)
          setTimeout(handleAuthorization, 1500);
          setIsInfoTooltipOpen(false);

        } else {
          setMessage('Что-то пошло не так!' || res.message[0].messages[0].message);
          setIsInfoTooltipOpen(true);
          setHasRegistartionError(true);
        }
      })
      .catch(() => {
        setMessage('Что-то пошло не так!');
        console.log('Ошибка!');
        setIsInfoTooltipOpen(true);
        setHasRegistartionError(true);
      });
  };

  return (
    <>
      <Header mainPage={false} path="/sign-in" linkName="Войти"/>
      <section className="login-page">
        <form className="form form_type_dark form_type_full-page" onSubmit={handleSubmit} noValidate>
          <h1 className="form__title form__title_type_light form__title_position_center">Регистрация</h1>
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
            type="password"
            name="password"
            minLength="5"
            maxLength="12"
            className="form__input form__input_type_light"
            placeholder="Пароль"
            required />
          <span className="form__span-error">{errors.password || ''}</span>
          <button className={`form__button form__button_type_light form__button_type_login ${!isValid && 'form__button_type_light_inactive'}`} type="submit" aria-label="Зарегистрироваться" disabled={!isValid}>Зарегистрироваться</button>
          <p className="form__question">Уже зарегистрированы?&nbsp;
            <Link to="/sign-in" className="form__link">Войти</Link>
          </p>

        </form>

        <InfoTooltip onClose={() => setIsInfoTooltipOpen(false)} isOpen={isInfoTooltipOpen} closeByEscAndOverlay={closeByEscAndOverlay} hasError={hasRegistartionError}/>

      </section>
    </>
  );
}

export default Register;