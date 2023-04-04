import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.form');
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    return this._formValues;
  }

  setEventListeners() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._form.reset();
    });

    super.setEventListeners();
  }
}