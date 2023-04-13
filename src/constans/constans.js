const buttonEdit = document.querySelector('.profile__button-edit');
const avatarEdit = document.querySelector('.profile__avatar')
const nameInput = document.getElementById('name');
const jobInput = document.getElementById('about');
const buttonAdd = document.querySelector('.profile__button-add');
const cardListSelector = '.elements';

const formProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_add-card');
const formAvatar = document.querySelector('.form_type_avatar-change');

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
  avatarEdit,
  nameInput,
  jobInput,
  buttonAdd,
  cardListSelector,
  formProfile,
  formAddCard,
  formAvatar,
  settings
}