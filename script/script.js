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

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let submit = formElement.querySelector('.form__button-submit');
let nameInputList = formElement.querySelectorAll('.form__item');
let nameInput = nameInputList[0];
let jobInput = nameInputList[1];

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
 

    // Выберите элементы, куда должны быть вставлены значения полей
  let profile = document.querySelectorAll('p');
  let profileName = profile[0];
  let profileText = profile[1];
    // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileText.textContent = job;
  hideForm();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
