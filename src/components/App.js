import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import Login from './Login';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch } from 'react-router-dom';

function App() {

  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState(null); 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState({});

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cardsInfo]) => {
      setCurrentUser(userInfo);
      setCards(cardsInfo);
    })
    .catch(err => console.error(err))
  },[]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(name, link) {
    setSelectedCard(
      {name: name,
      link: link});
    setIsPhotoPopupOpen(true);
  }

  function handleDeleteCardClick(idCard) {
    setCardForDelete(
      {id: idCard});
    setIsDeleteCardPopupOpen(true);
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPhotoPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  function closePopupByEscAndOverlay() {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeAllPopups()
      }
    }

    function closeByOverlay(e) {
      if (e.target.classList.contains(`popup_open`)) {
        closeAllPopups()
      }
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    }
  }

  function handleUpdateUser(values) {
    api.editProfile(values)
    .then(res => {
      setCurrentUser({
        ...currentUser,
        name: res.name,
        about: res.about
      });
      closeAllPopups();
    })
    .catch(err => console.error(err))

  }

  function handleUpdateAvatar(values) {
    api.editAvatar(values)
    .then(res => {
      setCurrentUser({
        ...currentUser,
        avatar: res.avatar
      });
      closeAllPopups();
    })
    .catch(err => console.error(err))

  }

  function handleCardLike(cardId, cardLikes) {
    const isLiked = cardLikes.some(i => i._id === currentUser._id);

    function generateNewCards(newCard) {
      const newCards = cards.map((item) => item._id === cardId ? newCard : item);
      setCards(newCards);
    }

    isLiked
    ?  api.deleteLike(cardId)
      .then(newCard => {
        generateNewCards(newCard)
      })
      .catch(err => console.error(err))
    :  api.putLike(cardId)
      .then(newCard => {
        generateNewCards(newCard)
      })
      .catch(err => console.error(err))
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api.deleteCard(cardForDelete.id)
    .then(() => {
      const newCards = cards.filter((item) => item._id !== cardForDelete.id);
      setCards(newCards);
      closeAllPopups();
    })
    .catch(err => console.error(err))

  }

  function handleAddPlaceSubmit(values) {
    api.createCard(values)
    .then(newCard => {
      setCards([newCard, ...cards]);
    })
    .catch(err => console.error(err));

    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header />

      {/* <Switch>

      <Route path="/sign-up">
        <Register />
      </Route>

      <Route path="/sign-in">
        <Login />
      </Route> */}

      {/** MAIN */}
      { currentUser && cards && <Main 
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      initialCards={cards}
      onCardLike={handleCardLike}
      onCardDelete={handleDeleteCardClick}/>}

      {/** EditProfilePopup */}
      { currentUser && <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        closeByEscAndOverlay={closePopupByEscAndOverlay}/>
      }

      {/** EditAvatarPopup */}
      { currentUser && <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        closeByEscAndOverlay={closePopupByEscAndOverlay}/>
      }

      <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      closeByEscAndOverlay={closePopupByEscAndOverlay}/>

      <ImagePopup card={selectedCard}
      onClose={closeAllPopups}
      isOpen={isPhotoPopupOpen}
      closeByEscAndOverlay={closePopupByEscAndOverlay}/>

      <DeleteCardPopup
        closeByEscAndOverlay={closePopupByEscAndOverlay}
        onClose={closeAllPopups}
        isOpen={isDeleteCardPopupOpen}
        onSubmit={handleCardDelete}>
      </DeleteCardPopup>

      {/* </Switch> */}

      <Footer />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
