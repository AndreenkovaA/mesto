import './index.css';

import {
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
} from "../constans/constans.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupwithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const profileFormValidator = new FormValidator(settings, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(settings, formAddCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, formAvatar);
avatarFormValidator.enableValidation();

const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
  },
  cardListSelector
);

const userInfoInstance = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__text', avatarSelector: '.profile__avatar-img'});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '00668478-52bf-4681-a622-26a2a81018b3',
    'Content-Type': 'application/json'
  }
});

api.getInitData()
  .then(([initialCards, userData]) => {
    userInfoInstance.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const card = new Card(item, userInfoInstance.userId, '.elements__template', () => {
    popupPhoto.open(item);
  },
    openPopupCardDelet,
    (id) => {
      api.likeCard(id)
        .then((result) => {
          card.likeCard(result);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    (id) => { 
      api.dislikeCard(id)
        .then((result) => {
          card.dislikeCard(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (cardId) => {
      api.deleteCard(cardId)
        .then(() => {
          card.deleteCardElement();
          openPopupCardDelet.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  
  return card.generateCard();
}

function addCard(data) {
  popupAddCard.setLoadingState('Сохранение...');
  api.addNewCard(data)
    .then((result) => {
      const card = createCard(result);
      cardList.addItem(card, true);
      cardFormValidator.disableSubmitButton();
      popupAddCard.close();
    })
    .catch((err) => {
      alert(`Ошибка при выполнении запроса (${err})`);
    })
    .finally(() => {
      popupAddCard.setLoadingState('Создать');
    })
  
}

const popupPhoto = new PopupwithImage('.popup_type_photo');
popupPhoto.setEventListeners();

const popupFormProfile = new PopupWithForm(
  '.popup_type_profile',
  (data) => {
    popupFormProfile.setLoadingState('Сохранение...');
    api.editProfile(data)
      .then((result) => {
        userInfoInstance.setUserInfo(result);
        popupFormProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormProfile.setLoadingState('Сохранить');
      })
}
);
popupFormProfile.setEventListeners();

const popupAvatarChange = new PopupWithForm(
  '.popup_type_avatar-change',
  (data) => {
    popupAvatarChange.setLoadingState('Сохранение...');
    api.changeAvatar(data)
    .then((result) => {
      userInfoInstance.setUserInfo(result);
      popupAvatarChange.close();
      avatarFormValidator.disableSubmitButton();
    })
    .catch((err) => {
      alert(`Ошибка при выполнении запроса (${err})`);
    })
    .finally(() => {
      popupAvatarChange.setLoadingState('Сохранить');
    })
});
popupAvatarChange.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_card', addCard);
popupAddCard.setEventListeners();


function openProfilePopup() {
  const userInfo = userInfoInstance.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  profileFormValidator.dropAllErrors()
  popupFormProfile.open();
}

const openPopupCardDelet = new PopupCardDelete(
  '.popup_type_card-delete'
);
openPopupCardDelet.setEventListeners();

buttonEdit.addEventListener('click', openProfilePopup);
buttonAdd.addEventListener('click', () => { popupAddCard.open() });
avatarEdit.addEventListener('click', () => { popupAvatarChange.open() });
