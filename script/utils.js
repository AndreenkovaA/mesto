const popupCardImage = document.querySelector('.popup_type_photo');
const popupPhoto = document.querySelector('.container__img');
const popupPhotoCaption = document.querySelector('.container__caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
}

function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupItem = document.querySelector('.popup_opened');
    hidePopup(popupItem);
  };
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
}

function openCardPopup(cardData) {
  popupPhoto.src = cardData.link;
  popupPhoto.alt = cardData.name;
  popupPhotoCaption.textContent = cardData.name;
  openPopup(popupCardImage);
}

export { popupCardImage, hidePopup, openPopup, openCardPopup };
