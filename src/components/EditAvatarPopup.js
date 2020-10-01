import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useFormWithValidation';

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar, closeByEscAndOverlay}) {
    const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation()

    React.useEffect(() => {
        resetForm();
    }, [onClose, resetForm, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
          avatar: values.avatar
        });
    }

    return (
    <PopupWithForm 
        name='edit-avatar' title='Сменить аватар'
        onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit}
        closeByEscAndOverlay={closeByEscAndOverlay}>
        <input
        value={values.avatar || ''}
        onChange={handleChange}
        type="url"
        name="avatar"
        className="form__input form__input_type_dark"
        id="avatar-input"
        placeholder="https://..."
        required />
        <span className="form__span-error" id="avatar-input-error">{errors.avatar || ''}</span>
        <button className={`form__button form__button_type_dark ${!isValid && 'form__button_type_dark_inactive'}`} type="submit" aria-label="Сохранить" disabled={!isValid}>Сохранить</button>
    </PopupWithForm>
    );
}

export default EditAvatarPopup;