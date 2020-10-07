import React from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { CurrentUserEmail } from '../contexts/CurrentUserEmail';

function Header() {

  const CurrentEmail = React.useContext(CurrentUserEmail);
  const history = useHistory();
  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-up');
  }

  return (
    <header className="header">
        <img className ="header__logo" src={headerLogo}  alt="Логотип сайта Место Россия." />
        <ul className="header__nav">
          <Switch>

            <Route path="/">
              <li><p className="header__user-info">{ CurrentEmail &&  CurrentEmail}</p></li>
              <li><button onClick={signOut} className="header__link header__button">Выйти</button></li> 
            </Route>

            <Route path="/sign-up">
              <li><Link to="/sign-in" className="header__link">Войти</Link></li>
            </Route>

            <Route path="/sign-in">
              <li><Link to="/sign-up" className="header__link">Зарегистрироваться</Link></li>
            </Route>
            
          </Switch>
        </ul>
    </header>
  );
}

export default Header;