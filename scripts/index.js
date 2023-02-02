const profileEditButton = document.querySelector('.profile__edit-button'); //объявили кнопку изменения профиля
const popup = document.querySelector('.popup'); //объявили секцию popup, куда будем добавлять и удалять по клику класс .popup_opened 
const popupCloseButton = document.querySelector('.popup__button-close'); // объявили кнопку закрытия popup

const profileTitle = document.querySelector('.profile__title'); // объявили заголовок имени профиля
const profileSubtitle = document.querySelector('.profile__subtitle'); //объявили инфо профиля
const popupInputName = document.querySelector('.popup__input_name'); //объявили строку имени профиля
const popupInputInfo = document.querySelector('.popup__input_info'); //объявили строку инфо профиля

const popupSaveButton = document.querySelector('.popup__container'); //объявили кнопку сохранения


const openPopup = () => { // ф-я добавления класса .popup_opened в секцию popup
    popupInputName.value = profileTitle.textContent; //получаем значение заголовка имени профиля
    popupInputInfo.value = profileSubtitle.textContent; //получаем знач инфы профиля
    popup.classList.add('popup_opened'); // добавляем класс стилей в HTML
}
const closePopup = () => { // ф-я удаления класса .popup_opened из секции popup
    popup.classList.remove('popup_opened'); // удаляем класс стилей из HTML
}

const popupFormSubmit = function(evt) { //ф-я отправки формы
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
    profileTitle.textContent = popupInputName.value; // вставляем значение строки с именем в HTML
    profileSubtitle.textContent = popupInputInfo.value; // вставляем значение строки с инфо в HTML
    closePopup(); // закрываем попап вызовом этой функции
}

profileEditButton.addEventListener('click', openPopup); //по клику на кнопку в профиле выполнится ф-я добавления класса (открытие попап)
popupCloseButton.addEventListener('click', closePopup); //по клику на кнопку крестик в попапе выполнится ф-я удаления класса (закрытие попап)
popupSaveButton.addEventListener('submit', popupFormSubmit); //сохраняем измененные данные на странице, нажав конопку, либо enter