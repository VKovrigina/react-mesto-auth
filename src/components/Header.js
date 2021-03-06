import React from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header({ signOut, handleMenu, handleButtonMenu, isButtonMenuActive }) {

  
  const CurrentUserInfo = React.useContext(CurrentUserContext);

  function clickButton() {
    handleButtonMenu();
    handleMenu();
  }

  return (
    <header className="header">
        <img className ="header__logo" src={headerLogo}  alt="Логотип сайта Место Россия." />
          <Switch>

            <Route path="/sign-up">
              <ul className="header__nav">
                <li><Link to="/sign-in" className="header__link">Войти</Link></li>
              </ul>
            </Route>

            <Route path="/sign-in">
              <ul className="header__nav">
                <li><Link to="/sign-up" className="header__link">Регистрация</Link></li>
              </ul>
            </Route>

            <Route path="/">
              <ul className="header__nav header__nav_media-hidden">
                <li><p className="header__user-info">{ CurrentUserInfo &&  CurrentUserInfo.email}</p></li>
                <li><button onClick={signOut} className="header__link header__button">Выйти</button></li>
              </ul>
              <div className={`header__burger-button ${isButtonMenuActive && `header__burger-button_active` }`} onClick={clickButton}>
                <span className={`header__burger-button-span ${isButtonMenuActive && `header__burger-button-span_active` }`}></span>
              </div>
            </Route>

          </Switch>
    </header>
  );
}

export default Header;