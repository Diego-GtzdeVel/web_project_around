import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__description");
  }

  open(imageSrc, imageAlt, caption) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageAlt;
    this._captionElement.textContent = caption;

    super.open();
  }

  close() {
    super.close();
  }

  setEventListeners() {
    this._popup
      .querySelector(".image-popup__close")
      .addEventListener("click", () => this.close());
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
