class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._errorClass = settings._errorClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._formEl = formEl;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._settings.inputSelector)
    );

    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        console.log(1);
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, buttonElement, this._settings);
      });
    });
  }

  _toggleButtonState() {
    // this function receives the inputsList, therefore we need to go through the list and check are all inputs valid.
    // if yes - button is enabled, otherwise - not
    if (
      this._inputList.every((item) => {
        return item.valid;
      })
    ) {
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.disabled = true;
    }
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }
}

export default FormValidator;
