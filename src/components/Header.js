import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Header({ mainPage, path, linkName }) {

  const history = useHistory();
  function signOut(){
    localStorage.removeItem('jwt');
    history.push('/sign-up');
  }

  return (
    <header className="header">
        <img className ="header__logo" src={headerLogo}  alt="Логотип сайта Место Россия." />
        <ul className="header__nav">
          { !mainPage && <li><Link to={path} className="header__link">{linkName}</Link></li> }
          { mainPage && 
            <>
              <li><p className="header__user-info">Email</p></li>
              <li><button onClick={signOut} className="header__link header__button">Выйти</button></li> 
            </>
          }
        </ul>
    </header>
  );
}

export default Header;