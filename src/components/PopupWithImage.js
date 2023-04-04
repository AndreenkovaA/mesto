import Popup from "./Popup.js";
export default class PopupwithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._element.querySelector('.container__img');
    this._popupPhotoCaption = this._element.querySelector('.container__caption');
  }

  open(cardData) {
    this._popupPhoto.src = cardData.link;
    this._popupPhoto.alt = cardData.name;
    this._popupPhotoCaption.textContent = cardData.name;
    super.open();
  }
  
}