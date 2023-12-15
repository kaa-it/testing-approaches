import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PopupWithForm from "./PopupWithForm";

import {
  getCurrentUser,
  getIsAvatarSending,
  getIsAvatarSendError,
} from "../store/current-user/selectors";
import { sendAvatar } from "../store/current-user/actions";

import useFormWithValidation from "../hooks/useFormWithValidation";
import Input from "./ui/Input";

function EditAvatarPopup({ onClose }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const isSending = useSelector(getIsAvatarSending);
  const sendingError = useSelector(getIsAvatarSendError);
  const { values, handleChange, resetFrom, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, false);
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
    dispatch(sendAvatar(values)).then(() => onClose());
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Обновить аватар"
      name="edit-avatar"
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid}
    >
      <Input
        ref={inputRef}
        type="url"
        name="avatar"
        id="owner-avatar"
        placeholder="Ссылка на изображение"
        value={values.avatar}
        error={errors.avatar}
        onChange={handleChange}
        required
      />
      {!!sendingError && (
        <span className="popup__send-error">{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default EditAvatarPopup;
