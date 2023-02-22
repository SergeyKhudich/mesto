const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const profileEditButton = document.querySelector('.profile__edit'); //объявили кнопку изменения профиля
const popup = document.querySelector('#popup__profile-edit'); //объявили секцию popup, куда будем добавлять и удалять по клику класс .popup_opened 
const popupCloseButton = document.querySelector('.popup__button-close'); // объявили кнопку закрытия popup
const profileTitle = document.querySelector('.profile__title'); // объявили заголовок имени профиля
const profileSubtitle = document.querySelector('.profile__subtitle'); //объявили инфо профиля
const popupInputName = document.querySelector('.popup__input_form_name'); //объявили строку имени профиля
const popupInputInfo = document.querySelector('.popup__input_form_info'); //объявили строку инфо профиля
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
//5 СПРИНТ
const profileAddButton = document.querySelector('.profile__add'); //объявили кнопку добавления карточки (ПЛЮС)
const popupProfileAdd = document.querySelector('#popup__profile-add'); //объявили секцию popup добавления карточки, куда будем добавлять и удалять по клику класс .popup_opened 
const popupProfileAddCloseButton = popupProfileAdd.querySelector('.popup__button-close'); // объявили кнопку закрытия popup добавления карточки
const popupProfileAddSaveButton = popupProfileAdd.querySelector('.popup__form'); //объявили форму сохраниения карточки
const placeInput = popupProfileAdd.querySelector('.popup__input_form_place');
const linkInput = popupProfileAdd.querySelector('.popup__input_form_link');
//ф-я добавления и удаления класса .popup_opened в секцию popupAdd
const openClosePopupAdd = () => {
    popupProfileAdd.classList.toggle('popup_opened');
}
const popupProfileAddFormSubmit = function(evt) { //ф-я отправки формы и добавления карточки
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
    addCardToElements(createCard(placeInput.value, linkInput.value)); // создаём карточку
    openClosePopupAdd(); // закрываем попап вызовом этой функции
}
popupProfileAddSaveButton.addEventListener('submit', popupProfileAddFormSubmit); //вызываем ф-ю отправки формы и добавления карточки
profileAddButton.addEventListener('click', openClosePopupAdd); //по клику на кнопку в профиле выполнится ф-я добавления класса (открытие попап добавления карточки)
popupProfileAddCloseButton.addEventListener('click', openClosePopupAdd); //по клику на кнопку крестик в попапе добавления карточки выполнится ф-я удаления класса (закрытие попап)
// ф-я удаления карточки 
const trashCard = (evt) => {
    evt.target.closest('.element').remove();
}
//объявляем попап открытия фотографии
const popupImg = document.querySelector('#popup__img');
const popupImage = popupImg.querySelector('.popup__image');
const popupImageName = popupImg.querySelector('.popup__image-name');
const closePopupImgButton = popupImg.querySelector('#popup__img-close');
// Вставка карточек
const template = document.querySelector('#item-template').content;
function createCard(name, link) {
    const item = template.querySelector('.element').cloneNode(true); //клонируем разметку (.element) и её детей (true)
    const itemImg= item.querySelector('.element__mask'); //объявили куда будем вставлять картинку
    const itemTitle = item.querySelector('.element__title'); //объявили куда будем вставлять текст названия карточки
    item.querySelector('.element__vector').addEventListener('click', function (event) { //ф-я лайка, добавления класса с активным "сердцем"
        event.target.classList.toggle('element__button_active')
    });
    const deleteButton = item.querySelector('.element__trash');
    deleteButton.addEventListener('click', trashCard); //по клику на "корзину" удаляем карточку
    itemImg.src = link; //вставляем ссылку на картинку из link
    itemImg.alt = name; //вставляем название картинки, если она не прогрузится
    itemTitle.textContent = name; //вставляем текст имени карточки
    const openImage = () => { //ф-я открытия картинки из карточки
        function openPopupImg() {
            popupImg.classList.add('popup_opened');
        };
        openPopupImg();
        popupImage.src = link;
        popupImage.alt = name;
        popupImageName.textContent = name;
    };
    itemImg.addEventListener('click', openImage);
    return item;
};
closePopupImgButton.addEventListener('click', closePopupImg = () => {popupImg.classList.remove('popup_opened');});//по клику по крестик закрываем фотографию карточки
const elements = document.querySelector('.elements')
const addCardToElements = (card) => {elements.prepend(card)}; //ф-я вставки разметки для новой карточки
initialCards.forEach((item) => {addCardToElements (createCard(item.name, item.link))}); //вставляем карточки из коробки