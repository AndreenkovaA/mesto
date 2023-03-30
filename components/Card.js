export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector('.elements__photo');
    this._imageElement.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.elements__title').textContent = this._name;

    this._setEventListeners();
    
    return this._element;
  }

  _setEventListeners() {
    const buttonDeleteCard = this._element.querySelector('.elements__button-delete');

    this._element.querySelector('.elements__heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__heart_active');
    });
  
    this._imageElement.addEventListener('click', this.handleCardClick);

    buttonDeleteCard.addEventListener('click', function (evt) {
      evt.stopPropagation();
      buttonDeleteCard.closest('.elements__element').remove();
    });
  }
}