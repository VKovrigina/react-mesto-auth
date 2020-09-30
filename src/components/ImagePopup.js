import React from 'react';

function ImagePopup({card, onClose, isOpen, closeByEscAndOverlay}) {

  React.useEffect(() => {
    closeByEscAndOverlay();
  })

  return (
    <div className={`popup popup_photo ${isOpen && `popup_open`}`}>
      <div className="popup__container">
        <button 
          className="popup__close-button button"
          type="button" 
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        <img
          className="popup__img"
          alt={card.name} src={card.link} />
        <p className="popup__photo-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;