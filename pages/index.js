import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const popupEditProfileSelector = ".popup";
const popupAddCardSelector = ".add-popup";
const popupImageSelector = ".image-popup";
const popupConfirmSelector = ".confirm-popup";

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

const api = new Api("https://around-api.es.tripleten-services.com/v1/", {
  Authorization: "1439adc7-0960-4dee-903b-22e0b673f7cc",
});

api
  .getUserInfo()
  .then((userData) => {
    if (userData) {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
    } else {
      console.warn("No user data received.");
    }
  })
  .catch((error) => {
    console.error("Error fetching user info:", error);
  });

const cardsSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardsSection.addItem(cardElement);
    },
  },
  ".cards"
);

api
  .getInitialCards()
  .then((cards) => {
    console.log("Cards received:", cards);
    if (cards && Array.isArray(cards) && cards.length > 0) {
      cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardsSection.addItem(cardElement);
      });
    } else {
      console.warn("No cards available to display.");
    }
  })
  .catch((error) => {
    console.error("Error fetching initial cards:", error);
  });

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const profilePopup = new PopupWithForm(
  popupEditProfileSelector,
  (inputValues) => {
    const newName = inputValues.name.trim();
    const newAbout = inputValues.about.trim();

    if (newName && newAbout) {
      api
        .updateUserInfo(newName, newAbout)
        .then((updatedUserData) => {
          if (updatedUserData) {
            userInfo.setUserInfo({
              name: updatedUserData.name,
              job: updatedUserData.about,
            });
            profilePopup.close();
          } else {
            console.warn("User data update failed.");
          }
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
        });
    } else {
      console.warn("Invalid input: Name and About fields cannot be empty.");
    }
  }
);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  const newCardName = inputValues.title.trim();
  const newCardLink = inputValues.link.trim();

  if (newCardName && newCardLink) {
    api
      .addNewCard(newCardName, newCardLink)
      .then((newCardData) => {
        if (newCardData) {
          const newCard = createCard(newCardData);
          cardsSection.addItem(newCard);
          addCardPopup.close();
        } else {
          console.warn("Failed to add new card.");
        }
      })
      .catch((error) => {
        console.error("Error adding new card:", error);
      });
  } else {
    console.warn("Invalid input: Name and Link fields cannot be empty.");
  }
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
  console.log("Creating card for:", data.name);
  const card = new Card(data, "#card__template");
  return card.getCard();
}
