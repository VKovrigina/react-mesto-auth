import React from 'react';
import ErrorIcon from '../images/Error.svg';
import CheckMarkIcon from '../images/check-mark.svg';

function InfoTooltip({onClose, isOpen, closeByEscAndOverlay, hasError}) {

  React.useEffect(() => {
    closeByEscAndOverlay();
  })

  console.log(hasError);

  return (
    <div className={`popup popup_form ${isOpen && `popup_open`}`}>
      <div className="popup__container">
        <button 
          className="popup__close-button popup__close-button_position_center button"
          type="button" 
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        <div className="popup__content">
          {hasError && 
            <>
              <img className="popup__icon" src={ErrorIcon} alt="Ошибка"></img>
              <p className="popup__message">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          }
          {!hasError && 
            <>
              <img className="popup__icon" src={CheckMarkIcon} alt="Регистрация прошла успешно!"></img>
              <p className="popup__message">Вы успешно зарегистрировались!</p>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;