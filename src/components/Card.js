export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, popupDeleteCard, handleLike, handleDislike, onCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.popupDeleteCard = popupDeleteCard;
    this._onCardDelete = onCardDelete;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
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
    this._buttonDeleteCard = this._element.querySelector('.elements__button-delete');
    this._likesAmount = this._element.querySelector('.elements__amount');
    this._likeButton = this._element.querySelector('.elements__heart');

    if (this._likes.length) {
      this._likesAmount.textContent = this._likes.length;
      if (this._likes.some((item) => item._id === this._userId) > 0) {
        this._likeButton.classList.toggle('elements__heart_active');
      }
    }

    if (this._userId !== this._ownerId) {
      this._buttonDeleteCard.hidden = true;
    }

    this._setEventListeners();
    
    return this._element;
  }

  likeCard(cardData) {
    this._likeButton.classList.toggle('elements__heart_active');
    this._likesAmount.textContent = cardData.likes.length;
  }

  dislikeCard(cardData) {
    this._likeButton.classList.toggle('elements__heart_active');
    this._likesAmount.textContent = cardData.likes.length > 0 ? cardData.likes.length : "";
  }

  likeAction() {
    if (this._likeButton.classList.length === 1) {
      this._handleLike(this._cardId);
    } else {
      this._handleDislike(this._cardId);
      }
  }

  openConfirmationPopup(evt) {
    evt.stopPropagation();
    this.popupDeleteCard.open();
  }

  deleteCardElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._imageElement.addEventListener('click', this.handleCardClick);
    this._buttonDeleteCard.addEventListener('click', (evt) => {
      this.openConfirmationPopup(evt);
      this.popupDeleteCard.setHandleSubmit(
            () => this._onCardDelete(this._cardId)
          )
    });
    this._likeButton.addEventListener('click', () => this.likeAction());
  }
}