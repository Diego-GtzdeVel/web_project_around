import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".confirm-popup__button");
  }

  setConfirmHandler(confirmHandler) {
    this._confirmHandler = confirmHandler;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".confirm-popup__close")
      .addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });

    this._confirmButton.addEventListener("click", () => {
      if (this._confirmHandler) {
        this._confirmHandler();
      }
    });
  }
}
