const buttonEdit = document.querySelector('.profile__button-edit');
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const buttonAdd = document.querySelector('.profile__button-add');
const popupCard = document.querySelector('.popup_type_card');
const cardListSelector = '.elements';

const formProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_add-card');
const nameTitle = popupCard.querySelector('.form__item_name');
const linkInput = popupCard.querySelector('.form__item_link');

const settings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button-submit',
  inactiveButtonClass: 'form__button-submit_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__item-error_active'
};

export {
  buttonEdit,
  nameInput,
  jobInput,
  buttonAdd,
  cardListSelector,
  formProfile,
  formAddCard,
  nameTitle,
  linkInput,
  settings
}