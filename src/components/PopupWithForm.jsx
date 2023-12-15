import React from "react";
import PropTypes from 'prop-types';
import Popup from "./Popup";

function PopupWithForm({
  title,
  name,
  onClose,
  children,
  onSubmit,
  buttonText = "Сохранить",
  isDisabled = false,
}) {
  return (
    <Popup onClose={onClose}>
      <form className='popup__form' name={name} noValidate onSubmit={onSubmit}>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        {children}
        <button
          type='submit'
          className={`button popup__button ${
            isDisabled && "popup__button_disabled"
          }`}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default PopupWithForm;
