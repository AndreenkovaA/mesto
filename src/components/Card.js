export default class Card {
  constructor(data, userName, templateSelector, handleCardClick, handleButtonDeleteClick, handleLike, handleDislike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._cardId = data._id;
    this._userName = userName;
    this._ownerName = data.owner.name;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleButtonDeleteClick = handleButtonDeleteClick;
    this.handleLike = handleLike;
    this.handleDislike = handleDislike;
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
    this._element.id = this._cardId;

    this._imageElement = this._element.querySelector('.elements__photo');
    this._imageElement.style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.elements__title').textContent = this._name;
    this._buttonDeleteCard = this._element.querySelector('.elements__button-delete');
    this._likesAmount = this._element.querySelector('.elements__amount');
    this._likeButton = this._element.querySelector('.elements__heart');

    if (this._likes) {
      this._likesAmount.textContent = this._likes;
    }

    if (this._userName !== this._ownerName) {
      this._buttonDeleteCard.hidden = true;
    }

    this._setEventListeners();
    
    return this._element;
  }

  likeAction(evt) {
    if (evt.target.classList.length === 1) {
      this.handleLike(this._cardId, evt.target.classList, this._likesAmount);
    } else {
      this.handleDislike(this._cardId, evt.target.classList, this._likesAmount);
      }
  }

  openConfirmationPopup(evt) {
    evt.stopPropagation();
    this.handleButtonDeleteClick();
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', this.handleCardClick);
    this._buttonDeleteCard.addEventListener('click', (evt) => this.openConfirmationPopup(evt));
    this._likeButton.addEventListener('click', (evt) => this.likeAction(evt));
  }
}