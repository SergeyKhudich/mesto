class FormValidator {
    constructor(setting, form) {
        this._form = form;
        this._setting = setting;
        this._inputs = Array.from(this._form.querySelectorAll(this._setting.inputSelector));
        this._button = this._form.querySelector(this._setting.submitButtonSelector);
    }

    _showInputError = (inputElement) => { // добавляем классы, показываем ошибку
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //поиск элемента
        inputElement.classList.add(this._setting.inputErrorClass); //добавляем красное подчеркивание
        errorElement.textContent = inputElement.validationMessage; //браузерная валидация
        errorElement.classList.add(this._setting.spanErrorClass); //показываем текст ошибки
    }

    _hideInputError = (inputElement) => { //удаляем классы, скрываем ошибку
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._setting.inputErrorClass); //удаляем красное подчеркивание
      errorElement.classList.remove(this._setting.spanErrorClass); //удаляем текст ошибки
      errorElement.textContent = "";
    };
  
    _isValid = (inputElement) => { //проверяем валидность поля
      if (!inputElement.validity.valid) { //если невалидно- покажем ошибку
        this._showInputError(inputElement); 
      } else { //если валидно- скроем ошибку
        this._hideInputError(inputElement);
      }
    };
  
    _hasInvalidInput = (inputList) => { //проверяем все ли поля валидны, если хоть одно поле невалидно, то валидация не прошла
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };
  
    _toggleButtonState = () => { //делаем кнопку сохранить/создать неактивной/активной
      if (this._hasInvalidInput(this._inputs)) { //если невалидно- делаем кнопку неактивной
        this._button.disabled = true;
        this._button.classList.add(this._setting.inactiveButtonClass);
      } else { //иначе делаем активной
        this._button.disabled = false;
        this._button.classList.remove(this._setting.inactiveButtonClass);
      }
    };

    _setEventListeners = () => { //слушатель полей ввода и их валидация
      this._inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._isValid(inputElement);
          this._toggleButtonState();
        });
      });
      this._toggleButtonState();
    };
  
    enableValidation() { //публичный метод, который включает валидацию формы
      this._setEventListeners();
    }
  }
  
export default FormValidator;