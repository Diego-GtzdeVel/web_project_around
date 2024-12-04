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
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
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
        console.log("Tarjeta eliminada:", card);
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
