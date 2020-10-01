import React from 'react';

function Register() {
  return (
    <section className="login-page">
    <form className="form form_type_dark form_type_full-page">
      <h1 className="form__title form__title_type_light">Регистрация</h1>
      <input
        type="email"
        name="email"
        className="form__input form__input_type_light"
        id="name-input"
        placeholder="Email"
        required />
      <span className="form__span-error" id="name-input-error"></span>
      <input
        type="password"
        name="password"
        className="form__input form__input_type_light"
        id="job-input"
        placeholder="Пароль"
        required />
      <span className="form__span-error" id="job-input-error"></span>
      <button className="form__button form__button_type_light form__button_type_login" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      <p className="form__question">Уже зарегистрированы?
        <a className="form__link"> Войти</a>
      </p>

    </form>
    </section>
  );
}

export default Register;