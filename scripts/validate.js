// 6 СПРИНТ
validationList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    spanErrorClass: 'popup__input-span-active'
}; 
const showInputError = (formElement, inputElement, errorMessage) => { //Добавляем класс с ошибкой
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationList.inputErrorClass);
    errorElement.textContent = errorMessage; //используем стандартные браузерные тексты ошибок
    errorElement.classList.add(validationList.spanErrorClass);
};

const hideInputError = (formElement, inputElement) => { //Удаляем класс с ошибкой
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationList.inputErrorClass);
    errorElement.classList.remove(validationList.spanErrorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => { //ф-я проверяет валидность поля
    if(!inputElement.validity.valid) { //если невалидно- покажем ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else { //если валидно- скроем ошибку
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => { //ф-я проверяет все ли поля валидны, если хоть одно поле невалидно, то валидация не прошла
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => { // ф-я делает кнопку сохранить/создать неактивной/активной
    if(hasInvalidInput(inputList)) { //если невалидно- делаем кнопку неактивной
        buttonElement.classList.add(validationList.inactiveButtonClass);
        buttonElement.disabled = true;
    } else { //иначе делаем активной
        buttonElement.classList.remove(validationList.inactiveButtonClass);
        buttonElement.disabled = '';
    }
};

const setEventListeners = (formElement) => { //добавляем слушатель событий всем полям ввода внутри формы
    const inputList = Array.from(formElement.querySelectorAll(validationList.inputSelector)); //нашли все поля ввода внутри формы, делаем из них массив
    const buttonElement = formElement.querySelector(validationList.submitButtonSelector); //найдем в текущей форме кнопку отправки
    toggleButtonState(inputList, buttonElement); //делаем кнопку неактивной/активной с самого начала
    inputList.forEach((inputElement) => { //обходим все элементы полученного массива inputList
        inputElement.addEventListener('input', () => { //каждому полю добавим обработчик события input
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (validationList) => { //ф-я находит и перебирает все формы на странице
    const formList = Array.from(document.querySelectorAll(validationList.formSelector)); //находим все формы с указанным классом и делаем из них массив
    formList.forEach((formElement) => { //переберем полученную коллекцию
        setEventListeners(formElement); //для каждой формы вызовем ф-ю setEventListeners, передав ей элемент формы
    });
};

enableValidation(validationList);