import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__button");
    this._handleConfirm = null;
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }

  close() {
    super.close();
    this._handleConfirm = null;
  }

  setEventListeners() {
    this._popup
      .querySelector(".confirm-popup__close")
      .addEventListener("click", () => this.close());

    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });

    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
      this.close();
    });
  }
}
