import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import Popup from "./Popup.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getCardById, getIsCardsLodaing } from "../store/cards/selectors.js";
import { useParams } from "react-router";
import { loadCards } from "../store/cards/actions.js";

function ImagePopup({ onClose }) {
  const {id} = useParams();
  const isCardsLoading = useSelector(getIsCardsLodaing);
  const card = useSelector(store => getCardById(store, id))
  const dispatch = useDispatch();

  useEffect(() => {
    if (!card && !isCardsLoading) {
      dispatch(loadCards());
    }
  }, [card, isCardsLoading, dispatch])

  if (!card) return null;

  return (
    <Popup
      onClose={onClose}
      popupClass='popup_type_image'
      contentClass='popup__content_content_image'
    >
      <img
        alt={card ? card.name : ""}
        src={card ? card.link : ""}
        className='popup__image'
      />
      <p className='popup__caption'>{card ? card.name : ""}</p>
    </Popup>
  );
}

ImagePopup.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired
}

export default ImagePopup;
