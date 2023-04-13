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

api.getInitialCards()
  .then((result) => {
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });

api.getInfoUser()
  .then((result) => {
    userInfoInstance.setUserInfo(result);
  })
  .catch((err) => {
    console.log(err);
  });

function createCard(item) {
  const card = new Card(item, userInfoInstance.getUserInfo().name, '.elements__template', () => {
    popupPhoto.open(item);
  }, () => {
    openPopupCardDelet.open(item);
  },
    (id, elementClassList, likesAmount) => {
      api.likeCard(id)
        .then((result) => {
          elementClassList.toggle('elements__heart_active');
          likesAmount.textContent = result.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    (id, elementClassList, likesAmount) => { 
      api.dislikeCard(id)
        .then((result) => {
          elementClassList.toggle('elements__heart_active');
          likesAmount.textContent = result.likes.length > 0 ? result.likes.length : "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  );
  
  return card.generateCard();
}

function addCard(data, form, submitButton) {
  submitButton.textContent = 'Сохранение...';
  api.addNewCard(data)
    .then((result) => {
      const card = createCard(result);
      cardList.addItem(card, true);
      cardFormValidator.disableSubmitButton();
    })
    .catch((err) => {
      alert(`Ошибка при выполнении запроса (${err})`);
    })
    .finally(() => {
      popupAddCard.close();
      submitButton.textContent = 'Создать';
      form.reset();
    })
  
}

const popupPhoto = new PopupwithImage('.popup_type_photo');
popupPhoto.setEventListeners();

const popupFormProfile = new PopupWithForm(
  '.popup_type_profile',
  (data, form, submitButton) => {
    submitButton.textContent = 'Сохранение...';
    api.editProfile(data)
      .then((result) => {
        userInfoInstance.setUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormProfile.close();
        submitButton.textContent = 'Сохранить';
        form.reset();
      })
}
);
popupFormProfile.setEventListeners();

const popupAvatarChange = new PopupWithForm(
  '.popup_type_avatar-change',
  (data, form, submitButton) => {
    submitButton.textContent = 'Сохранение...';
    api.changeAvatar(data)
    .then((result) => {
      userInfoInstance.setUserInfo(result);
    })
    .catch((err) => {
      alert(`Ошибка при выполнении запроса (${err})`);
    })
    .finally(() => {
      popupAvatarChange.close();
      submitButton.textContent = 'Сохранить';
      form.reset();
      avatarFormValidator.disableSubmitButton();
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
  '.popup_type_card-delete',
  (id) => {
    api.deleteCard(id)
    .then((_result) => {
      let card = document.getElementById(id);
      card.remove();
      card = null;
    })
});
openPopupCardDelet.setEventListeners();

buttonEdit.addEventListener('click', openProfilePopup);
buttonAdd.addEventListener('click', () => { popupAddCard.open() });
avatarEdit.addEventListener('click', () => { popupAvatarChange.open() });
