// 6 СПРИНТ
const validationList = ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    spanErrorClass: 'popup__input-span-active'
}); 
const showInputError = (formSelector, inputSelector, errorMessage, config) => { //Добавляем класс с ошибкой
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage; //используем стандартные браузерные тексты ошибок
    errorElement.classList.add(config.spanErrorClass);
};

const hideInputError = (formSelector, inputSelector, config) => { //Удаляем класс с ошибкой
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.spanErrorClass);
    errorElement.textContent = '';
};

const isValid = (formSelector, inputSelector, config) => { //ф-я проверяет валидность поля
    if(!inputSelector.validity.valid) { //если невалидно- покажем ошибку
        showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
    } else { //если валидно- скроем ошибку
        hideInputError(formSelector, inputSelector, config);
    }
};

const hasInvalidInput = (inputList) => { //ф-я проверяет все ли поля валидны, если хоть одно поле невалидно, то валидация не прошла
    return inputList.some((inputSelector) => {
        return !inputSelector.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, config) => { // ф-я делает кнопку сохранить/создать неактивной/активной
    if(hasInvalidInput(inputList)) { //если невалидно- делаем кнопку неактивной
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else { //иначе делаем активной
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = '';
    }
};

const setEventListeners = (formSelector, config) => { //добавляем слушатель событий всем полям ввода внутри формы
    const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector)); //нашли все поля ввода внутри формы, делаем из них массив
    const buttonElement = formSelector.querySelector(config.submitButtonSelector); //найдем в текущей форме кнопку отправки
    toggleButtonState(inputList, buttonElement, config); //делаем кнопку неактивной/активной с самого начала
    inputList.forEach((inputSelector) => { //обходим все элементы полученного массива inputList
        inputSelector.addEventListener('input', () => { //каждому полю добавим обработчик события input
            isValid(formSelector, inputSelector, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => { //ф-я находит и перебирает все формы на странице
    const formList = Array.from(document.querySelectorAll(config.formSelector)); //находим все формы с указанным классом и делаем из них массив
    formList.forEach((popupForm) => { //переберем полученную коллекцию
        setEventListeners(popupForm, config); //для каждой формы вызовем ф-ю setEventListeners, передав ей элемент формы
    });
};

enableValidation(validationList);