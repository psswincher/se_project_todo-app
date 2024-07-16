export default class Popup {
    constructor( { popupSelector } ) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupSelector = popupSelector;
        this._handleEscapeClose = this._handleEscapeClose.bind(this); 
        this._closeButton = this._popupElement.querySelector(".popup__close");
    }

    open() {
        this._popupElement.classList.add("popup_visible");
        this._setEscapeListener(true);
    }

    close() {
        console.log('close called');
        this._popupElement.classList.remove("popup_visible");
        this._setEscapeListener(false);
    }

    _handleEscapeClose(evt) {
        if(evt.key === 'Escape') {
            this.close(); 
        };
    }

    _setEscapeListener(bool) {
        bool ? document.addEventListener('keydown',this._handleEscapeClose) : document.removeEventListener('keydown',this._handleEscapeClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
    }

}