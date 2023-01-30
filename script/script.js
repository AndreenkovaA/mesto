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

const elements = document.querySelector('.elements');

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
  const card = document.createElement('div');
  card.classList.add('elements__element');

  const cardPhoto = document.createElement('img');
  cardPhoto.classList.add('elements__photo');
  cardPhoto.src = element.link;
  cardPhoto.alt = element.name;

  const cardElements = document.createElement('div');
  cardElements.classList.add('elements__group');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('elements__title');
  cardTitle.textContent = element.name;
  
  const cardBtnLike = document.createElement('button');
  cardBtnLike.classList.add('elements__heart');
  cardBtnLike.type = "button";

  cardElements.append(cardTitle);
  cardElements.append(cardBtnLike);
  card.append(cardPhoto);
  card.append(cardElements);
  elements.append(card);
});

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

editButton.addEventListener('click', popupProfile);
closeButtonProfile.addEventListener('click', function () { togglePopup(popupEditProfile); });
addButton.addEventListener('click', function () { togglePopup(popupCard); });
closeButtonCard.addEventListener('click', function () { togglePopup(popupCard); });
formElement.addEventListener('submit', handleFormSubmit);
