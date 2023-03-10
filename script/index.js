import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
const buttonEdit = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_profile');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const buttonCloseProfile = document.querySelector('.popup__button-close_type_profile');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const popupCardImage = document.querySelector('.popup_type_photo');
const buttonCloseCard = document.querySelector('.popup__button-close_type_card');
const buttonClosePhoto = document.querySelector('.popup__button-close_type_photo');
const gallery = document.querySelector('.elements');

const formProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_add-card');
const buttonProfileSubmit = formProfile.querySelector('.form__button-submit');

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupContainerList = Array.from(document.querySelectorAll('.popup__container'));

const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
}; 

const profileFormValidator = new FormValidator(settings, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(settings, formAddCard);
cardFormValidator.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__template');
  const cardElement = card.generateCard();
  
  gallery.append(cardElement);
  card.imageElement.addEventListener('click', function () {
    openCardPopup({ name: card._name, link: card._link });
  });
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
}

function openCardPopup(cardData) {
    const popupPhoto = document.querySelector('.container__img');
    const popupPhotoCaption = document.querySelector('.container__caption');
    popupPhoto.src = cardData.link;
    popupPhoto.alt = cardData.name;
    popupPhotoCaption.textContent = cardData.name;
    openPopup(popupCardImage);
}

function hidePopup(popup) {
  console.log('hide');
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  profileFormValidator.checkButtonState([nameInput, jobInput], buttonProfileSubmit);
  [nameInput, jobInput].forEach((item) => {
    profileFormValidator.dropInputError(item);
  });
  
  openPopup(popupEditProfile);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  hidePopup(popupEditProfile);
}

function addCard(evt) {
  evt.preventDefault();
  const nameTitle = popupCard.querySelector('.form__item_name');
  const linkInput = popupCard.querySelector('.form__item_link');
  const card = new Card({ name: nameTitle.value, link: linkInput.value }, '.elements__template');
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
  card.imageElement.addEventListener('click', function () {
    openCardPopup({ name: card._name, link: card._link });
  });
  hidePopup(popupCard);
  formAddCard.reset();
  const buttonElement = formAddCard.querySelector('.form__button-submit');
  buttonElement.classList.add('form__button-submit_disabled');
  buttonElement.disabled = true;
}

function handleClosePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupItem = document.querySelector('.popup_opened');
    hidePopup(popupItem);
  };
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', () => {
    hidePopup(popup);
  })
})

popupContainerList.forEach((popupContainer) => {
  popupContainer.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  })
})

buttonEdit.addEventListener('click', openPopupProfile);
buttonCloseProfile.addEventListener('click', function () { hidePopup(popupEditProfile); });
buttonAdd.addEventListener('click', function () { openPopup(popupCard); });
buttonCloseCard.addEventListener('click', function () { hidePopup(popupCard); });
buttonClosePhoto.addEventListener('click', function () { hidePopup(popupCardImage); });
formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);