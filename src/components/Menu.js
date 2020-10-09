import React from 'react';
import { CurrentUserEmail } from '../contexts/CurrentUserEmail';

function Menu({ signOut, isOpen, loggedIn }) {

  const CurrentEmail = React.useContext(CurrentUserEmail);

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