let editButton = document.querySelector('.profile__button-edit');
let form = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__container');
let submit = formElement.querySelector('.form__button-submit');
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('job');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

function showForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  form.classList.add('popup_opened');
}

function hideForm() {
  form.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  hideForm();
}

editButton.addEventListener('click', showForm);
closeButton.addEventListener('click', hideForm);
formElement.addEventListener('submit', handleFormSubmit);
