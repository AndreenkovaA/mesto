let editButton = document.querySelector('.profile__button-edit');
let popupEditProfile = document.querySelector('.popup_type_profile');
let popupCard = document.querySelector('.popup_type_card');
let closeButtonProfile = document.querySelector('.popup__button-close_profile');
let closeButtonCard = document.querySelector('.popup__button-close_card');
let closeButtonPhoto = document.querySelector('.popup__button-close_photo');
let formElement = document.querySelector('.form');
let formAddCard = document.querySelector('.form_add_card');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let addButton = document.querySelector('.profile__button-add');

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

const popupPhoto = document.querySelector('.popup_type_photo');

function createCard(nameValue, linkValue) {
  const elementTemplate = document.querySelector('.elements__template').content;
  const elementCard = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonDelete = elementCard.querySelector('.elements__button-delete');

  elementCard.querySelector('.elements__title').textContent = nameValue;
  elementCard.querySelector('.elements__photo').style.backgroundImage = 'url(' + linkValue + ')';

  elementCard.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_active');
  });
  
  buttonDelete.addEventListener('click', function () {
    const deleteCard = buttonDelete.closest('.elements__element');
    deleteCard.remove();
  });

  elementCard.querySelector('.elements__photo').addEventListener('click', function () {
    if (!popupPhoto.classList.contains('popup_opened')) {
      document.querySelector('.container__img').src = linkValue;
      document.querySelector('.container__img').alt = nameValue;
      document.querySelector('.container__caption').textContent = nameValue;
    }
    togglePopup(popupPhoto);
  })

  return elementCard;
}

initialCards.forEach((element) => {
  const cards = createCard(element.name, element.link);
  elements.append(cards);
});

function addCard(evt) {
  evt.preventDefault();
  const card = createCard(nameTitle.value, link.value);
  elements.prepend(card);
  togglePopup(popupCard);
  nameTitle.value = '';
  link.value = '';
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

editButton.addEventListener('click', popupProfile);
closeButtonProfile.addEventListener('click', function () { togglePopup(popupEditProfile); });
addButton.addEventListener('click', function () { togglePopup(popupCard); });
closeButtonCard.addEventListener('click', function () { togglePopup(popupCard); });
closeButtonPhoto.addEventListener('click', function () { togglePopup(popupPhoto); });

formElement.addEventListener('submit', handleFormSubmit);
formAddCard.addEventListener('submit', addCard);


