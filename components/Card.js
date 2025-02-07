export default class Card {
  constructor(cardData, templateSelector, popupWithConfirmation, api) {
    this.cardData = cardData;
    this.template = document.querySelector(templateSelector);
    this.popupWithConfirmation = popupWithConfirmation;
    this.api = api;
    this.cardElement = this._createCard();
  }

  _createCardMarkup() {
    const cardClone = this.template.content.cloneNode(true);
    const cardImage = cardClone.querySelector(".card__image");
    const cardCheckbox = cardClone.querySelector(".card__description-checkbox");
    const cardLabel = cardClone.querySelector(".card__description-text");
    const cardLike = cardClone.querySelector(
      ".card__description-checkbox-icon"
    );
    const cardDeleteButton = cardClone.querySelector(".card__delete");

    const name = this.cardData.name || "Sin título";
    const link = this.cardData.link || "https://via.placeholder.com/150";

    cardImage.src = link;
    cardImage.alt = name;
    cardCheckbox.id = name;
    cardLabel.setAttribute("for", name);
    cardLabel.textContent = name;
    cardLabel.appendChild(cardLike);

    const cardElement = cardClone.querySelector(".card");

    cardDeleteButton.addEventListener("click", () => {
      this.popupWithConfirmation.open(() => this._handleDelete());
    });

    return cardElement;
  }

  _handleDelete() {
    this.api
      .deleteCard(this.cardData._id)
      .then(() => {
        if (this.cardElement) {
          this.cardElement.remove();
          this.cardElement = null;
        }
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  getCard() {
    return this.cardElement;
  }

  _createCard() {
    return this._createCardMarkup();
  }
}
