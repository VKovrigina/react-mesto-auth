import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, initialCards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">

        <section className="profile">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img className="profile__avatar" alt="Фотография пользователя" src={currentUser && currentUser.avatar}/>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser && currentUser.name}</h1>
            <button className="profile__edit-button button" type="button" aria-label="Изменить" 
            onClick={onEditProfile}></button>
            <p className="profile__job">{currentUser && currentUser.about}</p>
          </div>
          <button className="profile__add-button button" type="button" aria-label="Добавить" 
          onClick={onAddPlace}></button>
        </section>

        <section className="cards">
        { initialCards && initialCards.map((card) => 
          <Card 
          key={card._id}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
          {...card}
          userId={currentUser._id} />)
        }
        </section>

    </main>
  );
}

export default Main;