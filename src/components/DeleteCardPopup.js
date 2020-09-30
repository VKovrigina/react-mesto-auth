import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({onClose, isOpen, onSubmit, closeByEscAndOverlay}) {

    const buttonFocusRef = React.useRef();

    React.useEffect(() => {
        buttonFocusRef.current.focus();
    });

    return (
    <PopupWithForm
        name='delete-card'
        title='Вы уверены?'
        buttonText='Да'
        closeByEscAndOverlay={closeByEscAndOverlay}
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={onSubmit}>
            <button className="popup__form-button" type="submit" aria-label="Да" ref={buttonFocusRef}>Да</button>
    </PopupWithForm>        
    );
}

export default DeleteCardPopup;