import Popup from "./Popup.js";
export default class PopupCardDelete extends Popup {
  constructor(popupSelector, handleDeleteButton) {
    super(popupSelector);
    this._cardIdInput = document.getElementById('card_id');
    this._buttonDeleteConfirm = document.querySelector('.form__button-submit_type_card-delete');
    this._handleDelete = handleDeleteButton;
  }

  open(cardData) {
    console.log(cardData._id);
    this._cardIdInput.value = cardData._id;
    super.open();
  }
  
  setEventListeners() {
    this._buttonDeleteConfirm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDelete(this._cardIdInput.value);
      super.close();
    });
    super.setEventListeners();
  }
}