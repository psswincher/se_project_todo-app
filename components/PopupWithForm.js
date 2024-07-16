import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor( { popupSelector, onSubmitCallback }) {
        super({ popupSelector });
        this._onSubmitCallback = onSubmitCallback;
        this._submitButton = this._popupElement.querySelector(".popup__button");
        this._inputFields = this._popupElement.querySelectorAll('.popup__input');
    }

    _getInputValues() { //TODO Make this work
        const inputValues = {}; 
        this._inputFields.forEach((field) => {
            inputValues[field.name] = field.value;
            });

        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._onSubmitCallback(this._getInputValues());
        });
    }

}