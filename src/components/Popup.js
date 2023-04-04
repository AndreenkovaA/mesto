export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._element = document.querySelector(this._popupSelector);
    this._buttonClosePopup = this._element.querySelector('.popup__button-close');
    this._closeByEsc = this._handleEscClose.bind(this);
    this._popupContainer = this._element.querySelector('.popup__container');
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._buttonClosePopup.addEventListener('click', () => this.close());
    this._element.addEventListener('mousedown', () => this.close());
    this._popupContainer.addEventListener('mousedown', (e) => { e.stopPropagation(); })
  }
}