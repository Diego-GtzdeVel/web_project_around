class PopupWithImage extends Popup {
  constructor(popupSelector, imagePopupTemplate) {
    super(popupSelector); // Llamamos al constructor de la clase padre (Popup)
    this._imagePopupTemplate = imagePopupTemplate; // Guardamos el template
    this._image = this._popup.querySelector(".popup__image");
    this._description = this._popup.querySelector(".popup__description");
  }

  // Sobreescribimos el método open() para agregar una imagen y descripción
  open(imageSrc, imageAlt, descriptionText) {
    // Llamamos al método open() de la clase padre
    super.open();

    // Actualizamos el src, alt y la descripción
    this._image.src = imageSrc;
    this._image.alt = imageAlt;
    this._description.textContent = descriptionText;
  }

  // Función para crear y abrir el popup de imagen
  createImagePopup(card) {
    const popupClone = this._imagePopupTemplate.content.cloneNode(true);
    const popupElement = popupClone.querySelector(".image-popup");

    const imagePopupImage = popupClone.querySelector(".image-popup__image");
    const imagePopupDescription = popupClone.querySelector(
      ".image-popup__description"
    );
    const imagePopupClose = popupClone.querySelector(".image-popup__close");

    const cardImage = card.querySelector(".card__image");
    const cardName = card.querySelector(".card__description-text").textContent;

    if (cardImage && imagePopupImage) {
      imagePopupImage.src = cardImage.src;
      imagePopupImage.alt = cardName;
    }

    imagePopupDescription.textContent = cardName;

    imagePopupClose.addEventListener("click", () => this.close());

    popupElement.addEventListener("click", (event) => {
      if (event.target === popupElement) {
        this.close();
      }
    });

    document.body.appendChild(popupElement);
    popupElement.classList.add("image-popup_opened");
  }
}
