import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._inputList = this._form.querySelectorAll('.form__item');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setLoadingState(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
}