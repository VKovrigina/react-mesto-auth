import React from 'react';
import { CurrentUserEmail } from '../contexts/CurrentUserEmail';
import { useHistory } from 'react-router-dom';

function Menu({isOpen, loggedIn, setIsLoggedIn, setIsMenuOpen, setIsButtonMenuActive }) {

  const history = useHistory();
  const CurrentEmail = React.useContext(CurrentUserEmail);

  function signOut(){
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setIsButtonMenuActive(false);
    history.push('/sign-in');
  }

  return (
    <>
      { loggedIn && <header className={`menu ${isOpen ? `menu_active` : `menu_inactive`}`}>
        <ul className="menu__container">
          <li><h1 className="menu__user-info">{ CurrentEmail &&  CurrentEmail}</h1></li>
          <li><button onClick={signOut} className="menu__link">Выйти</button></li>
        </ul>
      </header>}
    </>
  );
}

export default Menu;