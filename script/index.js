import { popupCardImage, openPopup, hidePopup } from "./utils.js";
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
const buttonCloseCard = document.querySelector('.popup__button-close_type_card');
const buttonClosePhoto = document.querySelector('.popup__button-close_type_photo');
const gallery = document.querySelector('.elements');

const formProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_add-card');
const nameTitle = popupCard.querySelector('.form__item_name');
const linkInput = popupCard.querySelector('.form__item_link');

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

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item, '.elements__template');
  gallery.append(cardElement);
})

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  profileFormValidator.checkButtonState();
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
  const cardElement = createCard({ name: nameTitle.value, link: linkInput.value }, '.elements__template');
  gallery.prepend(cardElement);
  hidePopup(popupCard);
  formAddCard.reset();
  cardFormValidator.disableSubmitButton();
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