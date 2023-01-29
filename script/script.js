let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

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

function togglePopup() {
  if (!popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', handleFormSubmit);
