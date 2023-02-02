const buttonEdit = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_profile');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const buttonCloseProfile = document.querySelector('.popup__button-close_type_profile');

const popupPhoto = document.querySelector('.popup_type_photo');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const buttonCloseCard = document.querySelector('.popup__button-close_type_card');
const buttonClosePhoto = document.querySelector('.popup__button-close_type_photo');
const gallery = document.querySelector('.elements');
const nameTitle = popupCard.querySelector('.form__item_name');
const link = popupCard.querySelector('.form__item_link');
const img = document.querySelector('.container__img');
const caption = document.querySelector('.container__caption');
const formProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_add-card');

function openForm(formOpen) { 
  formOpen.classList.add('popup_opened'); 
}

function hideForm(formHide) { 
  formHide.classList.remove('popup_opened'); 
} 

function openPopupProfile() {
  if (!popupEditProfile.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
  }

  openForm(popupEditProfile);
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  hideForm(popupEditProfile);
}

function createCard(nameValue, linkValue) {
  const elementTemplate = document.querySelector('#elements__template').content;
  const elementCard = elementTemplate.querySelector('.elements__element').cloneNode(true);
  const buttonDelete = elementCard.querySelector('.elements__button-delete');
  const elementPhoto = elementCard.querySelector('.elements__photo');

  elementCard.querySelector('.elements__title').textContent = nameValue;
  elementPhoto.style.backgroundImage = 'url(' + linkValue + ')';

  elementCard.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_active');
  });
  
  buttonDelete.addEventListener('click', function (event) {
    event.stopPropagation();
    const deleteCard = buttonDelete.closest('.elements__element');
    deleteCard.remove();
  });

  elementPhoto.addEventListener('click', function () {
    if (!popupPhoto.classList.contains('popup_opened')) {
      img.src = linkValue;
      img.alt = nameValue;
      caption.textContent = nameValue;
    }
    openForm(popupPhoto);
  })
  
  return elementCard;
}

function addCard(evt) {
  evt.preventDefault();
  const card = createCard(nameTitle.value, link.value);
  gallery.prepend(card);
  hideForm(popupCard);
  formAddCard.reset();
}

initialCards.forEach((element) => {
  const cards = createCard(element.name, element.link);
  gallery.append(cards);
});

buttonEdit.addEventListener('click', openPopupProfile);
buttonCloseProfile.addEventListener('click', function () { hideForm(popupEditProfile); });
buttonAdd.addEventListener('click', function () { openForm(popupCard); });
buttonCloseCard.addEventListener('click', function () { hideForm(popupCard); });
buttonClosePhoto.addEventListener('click', function () { hideForm(popupPhoto); });
formProfile.addEventListener('submit', handleFormSubmit);
formAddCard.addEventListener('submit', addCard);