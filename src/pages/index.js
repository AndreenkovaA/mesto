import './index.css';

import {
  buttonEdit,
  nameInput,
  jobInput,
  buttonAdd,
  cardListSelector,
  formProfile,
  formAddCard,
  nameTitle,
  linkInput,
  settings
} from "../constans/constans.js";

import {initialCards} from "../constans/cards.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupwithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const profileFormValidator = new FormValidator(settings, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(settings, formAddCard);
cardFormValidator.enableValidation();

function createCard(item) {
  const card = new Card(item, '.elements__template', () => {
    popupPhoto.open(item);
  });
  return card.generateCard();
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
  },
  cardListSelector
);

cardList.renderItems();

function addCard() {
  const card = createCard({ name: nameTitle.value, link: linkInput.value });
  cardList.addItem(card, true);
  cardFormValidator.disableSubmitButton();
}

const userInfoInstance = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__text'});

const popupPhoto = new PopupwithImage('.popup_type_photo');
popupPhoto.setEventListeners();

const popupFormProfile = new PopupWithForm(
  '.popup_type_profile',
  (data) => {
    userInfoInstance.setUserInfo(data);
  }
);
popupFormProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_card', addCard);
popupAddCard.setEventListeners();


function openProfilePopup() {
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  profileFormValidator.dropAllErrors()
  popupFormProfile.open();
}


buttonEdit.addEventListener('click', openProfilePopup);
buttonAdd.addEventListener('click', () => {popupAddCard.open()});