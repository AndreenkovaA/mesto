let editButton = document.querySelector('.profile__button-edit');
let popupEditProfile = document.querySelector('.popup_type_profile');
let popupCard = document.querySelector('.popup_type_card');
let closeButtonProfile = document.querySelector('.popup__button-close_profile');
let closeButtonCard = document.querySelector('.popup__button-close_card');
let formElement = document.querySelector('.form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let addButton = document.querySelector('.profile__button-add');
let createButton = popupCard.querySelector('.form__button-submit');
let elementCard = document.querySelector('.elements__element');

const elements = document.querySelector('.elements');

const nameTitle = popupCard.querySelector('.form__item_name');
const link = popupCard.querySelector('.form__item_link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  const cards = elementCard.cloneNode(true);
  
  cards.querySelector('.elements__title').textContent = element.name;
  cards.querySelector('.elements__photo').style.backgroundImage = 'url('+element.link+')';

  elements.append(cards);

});

function createCard() {
  const cards = elementCard.cloneNode(true);
  cards.querySelector('.elements__title').textContent = nameTitle.value;
  cards.querySelector('.elements__photo').style.backgroundImage = 'url('+link.value+')';
  elements.prepend(cards);
  togglePopup(popupCard);
}

function togglePopup(element) {
  element.classList.toggle('popup_opened');
}

function popupProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
  }

  togglePopup(popupEditProfile);
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  popupProfile();
}

function addCard() {
  togglePopup(popupCard);
  nameTitle.value = '';
  link.value = '';
}

editButton.addEventListener('click', popupProfile);
closeButtonProfile.addEventListener('click', function () { togglePopup(popupEditProfile); });
addButton.addEventListener('click', addCard);
closeButtonCard.addEventListener('click', function () { togglePopup(popupCard); });
formElement.addEventListener('submit', handleFormSubmit);

createButton.addEventListener('click', createCard);
