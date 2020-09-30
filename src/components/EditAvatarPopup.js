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
        className='popup__input popup__input_type_avatar'
        id="avatar-input"
        placeholder="https://..."
        required />
        <span className="popup__input-error" id="avatar-input-error">{errors.avatar}</span>
        <button className={`popup__form-button ${!isValid && 'popup__form-button_inactive'}`} type="submit" aria-label="Сохранить" disabled={!isValid}>Сохранить</button>
    </PopupWithForm>
    );
}

export default EditAvatarPopup;