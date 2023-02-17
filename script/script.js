const buttonEdit = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_profile');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const buttonCloseProfile = document.querySelector('.popup__button-close_type_profile');

const elementTemplate = document.querySelector('#elements__template').content;
const elementCard = elementTemplate.querySelector('.elements__element');
const popupPhoto = document.querySelector('.popup_type_photo');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const buttonCloseCard = document.querySelector('.popup__button-close_type_card');
const buttonClosePhoto = document.querySelector('.popup__button-close_type_photo');
const gallery = document.querySelector('.elements');
const nameTitle = popupCard.querySelector('.form__item_name');
const linkInput = popupCard.querySelector('.form__item_link');
const popupPhotoImageElement = document.querySelector('.container__img');
const popupPhotoCaption = document.querySelector('.container__caption');
const formProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_add-card');

const popupList = Array.from(document.querySelectorAll('.popup'));
const popupContainerList = Array.from(document.querySelectorAll('.popup__container'));

function openPopup(popup) { 
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
}

function hidePopup(popup) { 
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
}

function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(popupEditProfile);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  hidePopup(popupEditProfile);
}

function createCard(cardData) {
  const elementCardClone = elementCard.cloneNode(true);
  const buttonDelete = elementCardClone.querySelector('.elements__button-delete');
  const elementPhoto = elementCardClone.querySelector('.elements__photo');

  elementCardClone.querySelector('.elements__title').textContent = cardData.name;
  elementPhoto.style.backgroundImage = 'url(' + cardData.link + ')';

  elementCardClone.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_active');
  });
  
  buttonDelete.addEventListener('click', function (event) {
    event.stopPropagation();
    const card = buttonDelete.closest('.elements__element');
    card.remove();
  });

  elementPhoto.addEventListener('click', function () {
    popupPhotoImageElement.src = cardData.link;
    popupPhotoImageElement.alt = cardData.name;
    popupPhotoCaption.textContent = cardData.name;
    openPopup(popupPhoto);
  })
  
  return elementCardClone;
}

function addCard(evt) {
  evt.preventDefault();
  const card = createCard({name: nameTitle.value, link: linkInput.value});
  gallery.prepend(card);
  hidePopup(popupCard);
  formAddCard.reset();
}

function handleClosePopupByEsc(evt) {
  const popupItem = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
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

initialCards.forEach((element) => {
  const card = createCard(element);
  gallery.append(card);
});

buttonEdit.addEventListener('click', openPopupProfile);
buttonCloseProfile.addEventListener('click', function () { hidePopup(popupEditProfile); });
buttonAdd.addEventListener('click', function () { openPopup(popupCard); });
buttonCloseCard.addEventListener('click', function () { hidePopup(popupCard); });
buttonCloseCard.addEventListener('click', function () { formAddCard.reset(); });
buttonClosePhoto.addEventListener('click', function () { hidePopup(popupPhoto); });
formProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', addCard);