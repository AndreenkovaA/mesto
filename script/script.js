let editButton = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.form');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

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
