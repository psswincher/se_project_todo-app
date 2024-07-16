export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._formElement = form;
        this._setFormInputElements();
        this._setFormButtons();

    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
    }

    resetValidation() {
        this._disableButton();
        this._clearFormInputElements();
    }

    _showInputError = (inputElement) => {
        const errorElement = this._getErrorElement(inputElement);
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
      };

    _hideInputError = (inputElement) => {
        const errorElement = this._getErrorElement(inputElement);
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass);
        errorElement.textContent = "";
      };

      _checkFieldValidity = (inputElement) =>  {
        if (!inputElement.validity.valid) {
          this._showInputError(
            inputElement,
            inputElement.validationMessage,
          );
        } else {
          this._hideInputError(inputElement);
        }
      };

    _getErrorElement(inputElement) {
        return this._formElement.querySelector(`#${inputElement.id}-error`);
    }

    _checkInvalidInput() {
        return this._formInputElements.every((inputElement) => {
          if(inputElement.value.length === 0) {return false};
            return inputElement.validity.valid;         
        });
    }

    _setFormInputElements() {
        this._formInputElements = Array.from(
            this._formElement.querySelectorAll(this._settings.inputSelector),
        );
    }

    _clearFormInputElements() {
        this._formInputElements.forEach((inputElement) => {
            inputElement.value = "";
        });
    }

    _setFormButtons() {
        this._buttonElement = this._formElement.querySelector(
            this._settings.submitButtonSelector,
          );
    }

    _toggleSubmitButton() {
        this._checkInvalidInput() ? this._enableButton() : this._disableButton();
    }

    _disableButton() {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableButton() {
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _setEventListeners() {   
        this._toggleSubmitButton();
      
        this._formInputElements.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._checkFieldValidity(inputElement);
            this._toggleSubmitButton();
          });
        });
      };
}