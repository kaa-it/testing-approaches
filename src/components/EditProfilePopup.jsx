import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUser,
  getIsInfoSending,
  getIsInfoSendError,
} from "../store/current-user/selectors";
import { sendInfo } from "../store/current-user/actions";

import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";
import Input from "./ui/Input";

function EditProfilePopup({ onClose }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isSending = useSelector(getIsInfoSending);
  const sendingError = useSelector(getIsInfoSendError);
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(sendInfo(values)).then(() => onClose());
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <Input
        ref={inputRef}
        type="text"
        name="name"
        id="owner-name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        pattern="[a-zA-Zа-яА-Я -]{1,}"
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="about"
        id="owner-description"
        placeholder="Занятие"
        required
        minLength="2"
        maxLength="200"
        value={values.about}
        error={errors.about}
        onChange={handleChange}
      />
      {!!sendingError && (
        <span className="popup__send-error">{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditProfilePopup;
