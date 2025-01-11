import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  handleFormSubmit,
  handleOutsideClick,
  handleEscClose,
  createImagePopup,
  handleImagePopupEscClose,
} from "./utils.js";

const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".popup__close");

const addPopup = document.querySelector(".add-popup");
const addPopupForm = document.querySelector(".add-popup__form");
const addButton = document.querySelector(".profile__add");
const closeAddButton = document.querySelector(".add-popup__close");

const imagePopupTemplate = document.querySelector("#image__popup");
let activePopup = null;
let imagePopup = null;

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

function loadCards() {
  initialCards.forEach((card) => {
    const cardInstance = new Card(card, "#card__template");
    cardsContainer.appendChild(cardInstance.getCard());
  });
}

loadCards();

editButton.addEventListener("click", () =>
  openPopup(popup, nameInput, aboutInput, profileName, profileDescription)
);
closeButton.addEventListener("click", () => closePopup(popup));

popupForm.addEventListener("submit", (evt) =>
  handleFormSubmit(
    evt,
    nameInput,
    aboutInput,
    profileName,
    profileDescription,
    popup
  )
);

const formConfig = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formElements = Array.from(
  document.querySelectorAll(formConfig.formSelector)
);
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(formElement, formConfig);
  formValidator.enableValidation();
});

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
    const newCard = new Card(
      { name: titleInput, link: linkInput },
      "#card__template"
    );
    cardsContainer.prepend(newCard.getCard());
    closeAddPopup();
  }
});

cardsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const card = event.target.closest(".card");
    createImagePopup(card, imagePopupTemplate);
  }
});

document.addEventListener("keydown", (evt) => handleEscClose(evt, popup));
document.addEventListener("keydown", (evt) => handleEscClose(evt, addPopup));
document.addEventListener("keydown", (evt) =>
  handleImagePopupEscClose(evt, imagePopup)
);
