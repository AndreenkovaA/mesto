import Popup from "./Popup.js";
export default class PopupCardDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardIdInput = document.getElementById('card_id');
    this._buttonDeleteConfirm = document.querySelector('.form__button-submit_type_card-delete');
  }

  setHandleSubmit(func) {
    this._submitAction = func;
  }
  
  setEventListeners() {
    this._buttonDeleteConfirm.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitAction()
    });
    super.setEventListeners();
  }
}