import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getIsCardSending, getCardSendError } from "../store/cards/selectors";
import { addCard } from "../store/cards/actions";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";
import Input from "./ui/Input";

function AddPlacePopup({ onClose }) {
  const dispatch = useDispatch();
  const isSending = useSelector(getIsCardSending);
  const sendingError = useSelector(getCardSendError);
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    resetFrom();
  }, [resetFrom]);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(addCard(values)).then(() => onClose());
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Новое место"
      name="new-card"
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <Input
        ref={inputRef}
        type="text"
        name="name"
        id="place-name"
        placeholder="Название"
        required
        minLength="1"
        maxLength="30"
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Input
        type="url"
        name="link"
        id="place-link"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        error={errors.link}
        onChange={handleChange}
      />
      {!!sendingError && (
        <span className="popup__send-error">{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddPlacePopup;
