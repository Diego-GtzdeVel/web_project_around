import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imagePopupTemplate) {
    super(popupSelector);
    this._imagePopupTemplate = imagePopupTemplate;
    this._imageElement = this._popup.querySelector(".popup__image");
    this._captionElement = this._popup.querySelector(".popup__caption");
  }

  open(imageSrc, imageAlt, caption) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageAlt;
    this._captionElement.textContent = caption;
    super.open();
  }
}
