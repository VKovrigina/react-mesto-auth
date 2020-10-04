
//формы
export const formProfileSelector = '.popup__form_profile';
export const formPlaceSelector = '.popup__form_place';
export const formAvatarSelector = '.popup__form_avatar';
//попапы
export const popupProfileSelector = '.popup_profile';
export const popupPlaceSelector = '.popup_place';
export const popupPhotoSelector = '.popup_photo';
export const popupDeleteSelector = '.popup_delete-card';
export const popupProfileAvatarSelector = '.popup_edit-avatar';
//кнопки
export const buttonEditSelector = '.profile__edit-button';
export const buttonAddSelector = '.profile__add-button';
//поля форм
export const nameInputSelector = '.popup__input_type_name';
export const jobInputSelector = '.popup__input_type_job';
//контэйнер для карточек
export const cardContainer = '.cards';
export const popupPhotoImgSelector = '.popup__img';
export const popupPhotoTitleSelector = '.popup__photo-title';
export const avatarSelector = '.profile__avatar';
export const avatarButtonSelector = '.profile__avatar-button';
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__job';

export const formValidationOptions = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_inactive',
  inputErrorClass: 'popup__input_type_error'
};

export  const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '64f8b885-2658-44d6-bc45-dfe390bdb5b7',
    'Content-Type': 'application/json'
  }
};

export const apiAuthOptions = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};
