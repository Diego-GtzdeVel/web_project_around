const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".popup__close");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileDescription.textContent.trim();
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);

const initialCards = [
  {
    name: "Andermatt",
    link: "https://images.unsplash.com/photo-1575742112216-64b49e73a170?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sequoia Park",
    link: "https://images.unsplash.com/photo-1709943517404-635ada23e41d?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Petra",
    link: "https://images.unsplash.com/photo-1705628078563-966777473473?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Zhangjiajie",
    link: "https://images.unsplash.com/photo-1567266565446-d9c40ccf59a4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amalfi Coast",
    link: "https://images.unsplash.com/photo-1533656338503-b22f63e96cd8?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Santorini",
    link: "https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.getElementById("card__template");

function createCard(cardData) {
  const cardClone = cardTemplate.content.cloneNode(true);

  const cardImage = cardClone.querySelector(".card__image");
  const cardCheckbox = cardClone.querySelector(".card__description-checkbox");
  const cardLabel = cardClone.querySelector(".card__description-text");
  const cardLike = cardClone.querySelector(".card__description-checkbox-icon");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCheckbox.id = cardData.name;
  cardLabel.setAttribute("for", cardData.name);
  cardLabel.textContent = cardData.name;
  cardLabel.appendChild(cardLike);

  return cardClone;
}

function loadCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardsContainer.appendChild(cardElement);
  });
}

loadCards();

function initializeCardDeletion() {
  cardsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__delete")) {
      const card = event.target.closest(".card");
      if (card) {
        card.remove();
      }
    }
  });
}

initializeCardDeletion();

const addPopup = document.querySelector(".add-popup");
const addPopupForm = document.querySelector(".add-popup__form");
const addButton = document.querySelector(".profile__add");
const closeAddButton = document.querySelector(".add-popup__close");

function openAddPopup() {
  addPopup.classList.add("add-popup_opened");
}

function closeAddPopup() {
  addPopup.classList.remove("add-popup_opened");
}

addButton.addEventListener("click", openAddPopup);
closeAddButton.addEventListener("click", closeAddPopup);

addPopupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput = document.querySelector("#title").value.trim();
  const linkInput = document.querySelector("#link").value.trim();

  if (titleInput && linkInput) {
    const newCard = createCard({ name: titleInput, link: linkInput });
    cardsContainer.prepend(newCard);
    closeAddPopup();
  }
});

const imagePopupTemplate = document.querySelector("#image__popup");
let activePopup = null;

function createImagePopup(card) {
  const popupClone = imagePopupTemplate.content.cloneNode(true);
  const popupElement = popupClone.querySelector(".image-popup");

  const imagePopupImage = popupClone.querySelector(".image-popup__image");
  const imagePopupDescription = popupClone.querySelector(
    ".image-popup__description"
  );
  const imagePopupClose = popupClone.querySelector(".image-popup__close");

  const cardImage = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__description-text").textContent;

  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardName;
  imagePopupDescription.textContent = cardName;

  imagePopupClose.addEventListener("click", () =>
    closeImagePopup(popupElement)
  );

  document.body.appendChild(popupElement);

  activePopup = popupElement;

  popupElement.classList.add("image-popup_opened");
}

function closeImagePopup(popupElement) {
  popupElement.classList.remove("image-popup_opened");
  popupElement.remove();
  activePopup = null;
}

cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const card = event.target.closest(".card");
    createImagePopup(card);
  }
});
