import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { Link, useHistory } from 'react-router-dom';
import { newApi } from '../utils/newApi';

function Register({ setIsLoggedIn, setIsInfoTooltipOpen, setHasRegistartionError }) {

  const [message, setMessage] = React.useState('');
  const history = useHistory();
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleAuthorization() {
    newApi.authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          return data;
        } else {
          localStorage.removeItem('token');
          return;
        }
      })
      .then((res) => {
        if (res.token) {
          setMessage('');
          setIsLoggedIn(true);
          history.push('/');//сюда уже не проходит
        } else {
          setMessage('Что-то пошло не так!');
          setIsInfoTooltipOpen(true);
          setHasRegistartionError(true);
        }
      })
      .catch((err) => {
        console.error('Ошибка!');
        setIsInfoTooltipOpen(true);
        setHasRegistartionError(true);
        if (err === 400){
          setMessage("Не передано одно из полей");
        } 
        if (err === 401) {
          setMessage("Некорректный пароль или email");
        } 
      });
  }

  function handleSubmit (evt) {
    evt.preventDefault();

    newApi.register(values.email, values.password)
      .then((res) => {
        if (res.statusCode !== 400) {
          setMessage('');
          setIsInfoTooltipOpen(true);
          setHasRegistartionError(false);
          setTimeout(handleAuthorization, 1500);
          //чтобы после регистрации сразу же прошла авторизация (как по макету), использую таймаут, чтобы сервер не ругался на множество запросов :)

        } else {
          setIsInfoTooltipOpen(true);
          setHasRegistartionError(true);
          setMessage("Некорректно заполнено одно из полей");
        }
      })
      .catch((err) => {
        setMessage("Некорректно заполнено одно из полей");
        setIsInfoTooltipOpen(true);
        setHasRegistartionError(true);
      });
  };

  return (
    <>
      <section className="login-page">
        <form className="form form_type_dark form_type_full-page" onSubmit={handleSubmit} noValidate>
          <h1 className="form__title form__title_type_light form__title_position_center">Регистрация</h1>
          <p className="form__error">{message}</p>
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

      </section>
    </>
  );
}

export default Register;