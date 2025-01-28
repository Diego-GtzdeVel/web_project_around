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
const editProfileForm = document.querySelector(".popup__form");
const addCardForm = document.querySelector(".add-popup__form");

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
    link: "https://images.unsplash.com/photo-1575742112216-64b49e73a170?q=80",
  },
  {
    name: "Sequoia Park",
    link: "https://images.unsplash.com/photo-1709943517404-635ada23e41d?q=80",
  },
  {
    name: "Petra",
    link: "https://images.unsplash.com/photo-1705628078563-966777473473?q=80",
  },
  {
    name: "Zhangjiajie",
    link: "https://images.unsplash.com/photo-1567266565446-d9c40ccf59a4?q=80",
  },
  {
    name: "Amalfi Coast",
    link: "https://images.unsplash.com/photo-1533656338503-b22f63e96cd8?q=80",
  },
  {
    name: "Santorini",
    link: "https://images.unsplash.com/photo-1678266561093-324802646fb2?q=80",
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
      const card = createCard(cardData);
      cardsSection.addItem(card);
    },
  },
  ".cards"
);
cardsSection.renderItems();

const profilePopup = new PopupWithForm(
  popupEditProfileSelector,
  (inputValues) => {
    userInfo.setUserInfo({ name: inputValues.name, job: inputValues.about });
  }
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  const newCard = createCard({
    name: inputValues.title,
    link: inputValues.link,
  });
  cardsSection.addItem(newCard);
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#name").value = userData.name.trim();
  document.querySelector("#about").value = userData.job.trim();
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

document.querySelector(".cards").addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const cardElement = event.target.closest(".card");
    const cardImage = cardElement.querySelector(".card__image");
    const cardName = cardElement.querySelector(
      ".card__description-text"
    ).textContent;

    imagePopup.open(cardImage.src, cardImage.alt, cardName);
  }
});

const editProfileValidator = new FormValidator(editProfileForm, formConfig);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(addCardForm, formConfig);
addCardValidator.enableValidation();

function createCard(data) {
  const card = new Card(data, "#card__template");
  return card.getCard();
}
