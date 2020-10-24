import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Menu({ signOut, isOpen, loggedIn }) {

  const CurrentUser = React.useContext(CurrentUserContext);

  return (
    <>
      { loggedIn && <header className={`menu ${isOpen ? `menu_active` : `menu_inactive`}`}>
        <ul className="menu__container">
          <li><h1 className="menu__user-info">{ CurrentUser &&  CurrentUser.email}</h1></li>
          <li><button onClick={signOut} className="menu__link">Выйти</button></li>
        </ul>
      </header>}
    </>
  );
}

export default Menu;