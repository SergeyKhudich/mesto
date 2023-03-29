class Card {
    constructor(data, templateSelector, openImage) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._template = this._getTemplate();
        this._element = this._template.querySelector('.element');
        this._cardImage = this._element.querySelector('.element__mask');
        this._cardText = this._element.querySelector('.element__title');
        this._delete = this._element.querySelector('.element__trash');
        this._like = this._element.querySelector('.element__vector');
        this._openImage = openImage;
    };

    _getTemplate() {
        const cardElement = document//создали элемент
          .querySelector(this._templateSelector)//нашли темплит-элемент
          .content//извлекаем его содержимое
          //.querySelector(this._element)//в содержимом нашли элемент с классом element
          .cloneNode(true);//клонирование
    
        return cardElement;//возвращаем клонированный элемент
    };

    _setEventListeners() {
        this._like.addEventListener('click', () => { this._clickCardLike() }); //слушатель на кнопке лайк
        this._cardImage.addEventListener('click', () => { this._clickCardOpenImage() }); //слушатель на фотографии карточки
        this._delete.addEventListener('click', (evt) => { evt.target.closest('.element').remove()}); //слушатель на кнопке удаления (корзина)
    };

        _clickCardLike() { //Активный/неактивный лайк
            this._like.classList.toggle('element__button_active');
        };
        _clickCardOpenImage() { //открытие попапа с фотографией
            this._openImage(this._link, this._name);
        };

    generateCard() {//вставляем данные из массива
        this._element = this._template;
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardText.textContent = this._name;

        return this._element;
      };
};

export default Card;