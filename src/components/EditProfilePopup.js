import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

function EditProfilePopup({onClose, isOpen, onUpdateUser, closeByEscAndOverlay}) {

  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation()

  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, onClose, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about
    });
    }

  return (
    <PopupWithForm
      name='profile' 
      title='Редактировать профиль'
      onClose={onClose} 
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeByEscAndOverlay={closeByEscAndOverlay}>
      <input
        value={values.name || ''}
        onChange={handleChange}
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        id="name-input"
        placeholder="ФИО"
        minLength="2"
        maxLength="40"
        required />
      <span className="popup__input-error" id="name-input-error">{errors.name || ''}</span>
      <input
        value={values.about || ''}
        onChange={handleChange}
        type="text"
        name="about"
        className="popup__input popup__input_type_job"
        id="job-input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required />
      <span className="popup__input-error" id="job-input-error">{errors.about || ''}</span>
      <button className={`popup__form-button ${!isValid && 'popup__form-button_inactive'}`} type="submit" aria-label="Сохранить" disabled={!isValid}>Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;