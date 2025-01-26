import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupEditProfileSelector = ".popup";
const popupAddCardSelector = ".add-popup";
const popupImageSelector = ".image-popup";

const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");

const formConfig = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card__template");
      cardsSection.addItem(card.getCard());
    },
  },
  ".cards"
);

cardsSection.renderItems();

const editProfileValidator = new FormValidator(editProfileform, formConfig);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(addCardForm, formConfig);
addCardValidator.enableValidation();

const profilePopup = new PopupWithForm(
  popupEditProfileSelector,
  (inputValues) => {
    userInfo.setUserInfo({ name: inputValues.name, job: inputValues.about });
  }
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  const newCard = new Card(
    { name: inputValues.title, link: inputValues.link },
    "#card__template"
  );
  cardsSection.addItem(newCard.getCard());
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(
  popupImageSelector,
  document.querySelector("#image-popup-template")
);
imagePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#name").value = userData.name;
  document.querySelector("#about").value = userData.job;
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

document.querySelector(".cards").addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const cardElement = event.target.closest(".card");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(
      ".card__description-text"
    ).textContent;

    imagePopup.open(cardImage.src, cardImage.alt, cardTitle);
  }
});
