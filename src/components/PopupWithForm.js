import React from 'react';

function PopupWithForm({ 
  name, 
  title,
  children, 
  onClose, 
  isOpen, 
  onSubmit, 
  closeByEscAndOverlay 
}) {

  React.useEffect(() => {
    closeByEscAndOverlay();
  })

  // popup_${name}

  return (
    <div className={`popup popup_form ${isOpen && `popup_open`}`}>
    <div className="popup__container">
      <button 
        className="popup__close-button button" 
        type="button" 
        aria-label="Закрыть"
        onClick= {onClose}>
      </button>
      <form noValidate className="form form_type_light" name={name} method="get" action="#" onSubmit={onSubmit}>
        <h2 className="form__title form__title_type_dark form__title_position_left">{title}</h2>
        {children}
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;