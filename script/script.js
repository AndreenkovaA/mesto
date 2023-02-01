const buttonEdit = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_profile');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const buttonCloseProfile = document.querySelector('.popup__button-close_profile');

const popupPhoto = document.querySelector('.popup_type_photo');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const buttonCloseCard = document.querySelector('.popup__button-close_card');
const buttonClosePhoto = document.querySelector('.popup__button-close_photo');
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
const formElement = document.querySelector('.form');
const formAddCard = document.querySelector('.form_add_card');

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

function createCard(nameValue, linkValue) {
  const elementTemplate = document.querySelector('#elements__template').content;
  const elementCard = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonDelete = elementCard.querySelector('.elements__button-delete');

  elementCard.querySelector('.elements__title').textContent = nameValue;
  elementCard.querySelector('.elements__photo').style.backgroundImage = 'url(' + linkValue + ')';

  elementCard.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_active');
  });
  
  buttonDelete.addEventListener('click', function (event) {
    event.stopPropagation();
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

function addCard(evt) {
  evt.preventDefault();
  const card = createCard(nameTitle.value, link.value);
  elements.prepend(card);
  togglePopup(popupCard);
  nameTitle.value = '';
  link.value = '';
}

initialCards.forEach((element) => {
  const cards = createCard(element.name, element.link);
  elements.append(cards);
});

buttonEdit.addEventListener('click', popupProfile);
buttonCloseProfile.addEventListener('click', function () { togglePopup(popupEditProfile); });
buttonAdd.addEventListener('click', function () { togglePopup(popupCard); });
buttonCloseCard.addEventListener('click', function () { togglePopup(popupCard); });
buttonClosePhoto.addEventListener('click', function () { togglePopup(popupPhoto); });
formElement.addEventListener('submit', handleFormSubmit);
formAddCard.addEventListener('submit', addCard);