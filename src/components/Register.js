import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import { Link } from 'react-router-dom';

function Register() {

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="login-page">
    <form className="form form_type_dark form_type_full-page" noValidate>
      <h1 className="form__title form__title_type_light form__title_position_center">Регистрация</h1>
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
  );
}

export default Register;