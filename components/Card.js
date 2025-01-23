export default class Card {
  constructor(cardData, templateSelector) {
    this.cardData = cardData;
    this.template = document.querySelector(templateSelector);
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

    cardImage.src = this.cardData.link;
    cardImage.alt = this.cardData.name;
    cardCheckbox.id = this.cardData.name;
    cardLabel.setAttribute("for", this.cardData.name);
    cardLabel.textContent = this.cardData.name;
    cardLabel.appendChild(cardLike);

    cardDeleteButton.addEventListener("click", this._handleDelete);

    return cardClone;
  }

  _handleDelete = (event) => {
    const card = event.target.closest(".card");
    if (card) {
      card.remove();
    }
  };

  getCard() {
    return this.cardElement;
  }

  _createCard() {
    return this._createCardMarkup();
  }
}
