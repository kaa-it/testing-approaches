import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modals");

function Popup({ onClose, children, popupClass="", contentClass="" }) {
  React.useEffect(() => {
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [onClose]);

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`popup popup_is-opened ${popupClass}`}
      onMouseDown={handleOverlayClose}
    >
      <div className={`popup__content ${contentClass}`}>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  popupClass: PropTypes.string,
  contentClass: PropTypes.string,
}

export default Popup;