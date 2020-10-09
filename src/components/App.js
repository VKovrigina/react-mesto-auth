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
import InfoTooltip from './InfoTooltip';
import Menu from './Menu';
import { api } from '../utils/api';
import { apiAuth } from '../utils/apiAuth';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentUserEmail } from '../contexts/CurrentUserEmail';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');
  const [cards, setCards] = React.useState(null); 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isButtonMenuActive, setIsButtonMenuActive] = React.useState(false);
  const [hasRegistartionError, setHasRegistartionError] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfo, cardsInfo]) => {
      setCurrentUser(userInfo);
      setCards(cardsInfo);
    })
    .catch(err => console.error(err));
  },[]);
  //создаю данный эффект, чтобы текущий email был верным (при авторизации обновлять email не могу - сервер возвращает только токен)
  React.useEffect(() => {
    tokenCheck();
  },[location.pathname])

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
    setIsInfoTooltipOpen(false);
  }

  function handleMenuBlock() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleButtonMenu() {
    setIsButtonMenuActive(!isButtonMenuActive);
  }

  function tokenCheck() {
    let token = localStorage.getItem('token');
    if (token) {
      apiAuth.getContent(token)
      .then((res) => {
        if (res) {
          setCurrentUserEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(`Ошибка при проверке токена: ${err}`)
      });
    }
  };

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
      <CurrentUserEmail.Provider value={currentUserEmail}>
        <div className="page">

          <Menu 
            isOpen={isMenuOpen} 
            loggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn}
            setIsMenuOpen={setIsMenuOpen}
            setIsButtonMenuActive={setIsButtonMenuActive}/>

          <Header 
            handleMenu={handleMenuBlock}
            handleButtonMenu={handleButtonMenu} 
            setIsLoggedIn={setIsLoggedIn}
            setIsMenuOpen={setIsMenuOpen}
            setIsButtonMenuActive={setIsButtonMenuActive}
            isButtonMenuActive={isButtonMenuActive}/>

          <Switch>

            <Route path="/sign-up">
              <Register 
                setIsLoggedIn={setIsLoggedIn} 
                setIsInfoTooltipOpen={setIsInfoTooltipOpen} 
                setHasRegistartionError={setHasRegistartionError}/>
            </Route>

            <Route path="/sign-in">
              <Login setIsLoggedIn={setIsLoggedIn}/>
            </Route>

            <ProtectedRoute 
              path="/" 
              loggedIn={isLoggedIn} 
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              initialCards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick} />

            <Route> 
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
            </Route>

          </Switch>

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

          <InfoTooltip 
            onClose={closeAllPopups} 
            isOpen={isInfoTooltipOpen} 
            closeByEscAndOverlay={closePopupByEscAndOverlay} 
            hasError={hasRegistartionError}/>

          <Footer />

        </div>
      </CurrentUserEmail.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
