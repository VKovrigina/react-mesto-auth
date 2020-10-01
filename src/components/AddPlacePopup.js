import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

function AddPlacePopup({onClose, isOpen, onAddPlace, closeByEscAndOverlay}) {

  const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  return (
    <PopupWithForm 
      name='place' title='Новое место'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeByEscAndOverlay={closeByEscAndOverlay}>
      <input
        value={values.name || ''}
        onChange={handleChange}
        type="text"
        name="name"
        className="form__input form__input_type_dark"
        id="title-input"
        placeholder="Название"
        minLength="1"
        maxLength="30"
      required/>
      <span className="form__span-error" id="title-input-error">{errors.name || ''}</span>
      <input
        value={values.link || ''}
        onChange={handleChange}
        type="url"
        name="link"
        className="form__input form__input_type_dark"
        id="img-input"
        placeholder="Ссылка на картинку"
      required />
      <span className="form__span-error" id="img-input-error">{errors.link}</span>
      <button className={`form__button form__button_type_dark ${!isValid && 'form__button_type_dark_inactive'}`} type="submit" aria-label="Создать" disabled={!isValid}>Создать</button>
  </PopupWithForm>
  );
}

export default AddPlacePopup;