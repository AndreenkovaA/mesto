let editButton = document.querySelector('.profile__button-edit');
let form = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close');

function showForm() {
  form.classList.add('popup_opened');
}

function hideForm() {
  form.classList.remove('popup_opened');
}

editButton.addEventListener('click', showForm);
closeButton.addEventListener('click', hideForm);

let formElement = document.querySelector('.popup__container');
let submit = formElement.querySelector('.form__button-submit');
let nameInputList = formElement.querySelectorAll('.form__item');
let nameInput = nameInputList[0];
let jobInput = nameInputList[1];

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  let name = nameInput.value;
  let job = jobInput.value;
  let profile = document.querySelectorAll('p');
  let profileName = profile[0];
  let profileText = profile[1];
  profileName.textContent = name;
  profileText.textContent = job;
  hideForm();
}

formElement.addEventListener('submit', handleFormSubmit);
