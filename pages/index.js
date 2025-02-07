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
const popupAvatarSelector = ".avatar-popup";

const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const editProfileForm = document.querySelector(".popup__form");
const addCardForm = document.querySelector(".add-popup__form");
const editAvatarForm = document.querySelector(".avatar-popup__form");

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

const confirmPopup = new PopupWithConfirmation(popupConfirmSelector);
confirmPopup.setEventListeners();

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

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

api
  .getUserAndCards()
  .then(([userData, cards]) => {
    if (userData) {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
    }

    if (Array.isArray(cards) && cards.length > 0) {
      cards.forEach((cardData) => {
        const cardElement = createCard(cardData);
        cardsSection.addItem(cardElement);
      });
    } else {
      console.warn("No hay tarjetas disponibles.");
    }
  })
  .catch((error) => {
    console.error("Error al obtener datos del usuario y tarjetas:", error);
  });

const profilePopup = new PopupWithForm(
  popupEditProfileSelector,
  (inputValues) => {
    return api
      .updateUserInfo(inputValues.name.trim(), inputValues.about.trim())
      .then((updatedUserData) => {
        if (updatedUserData) {
          userInfo.setUserInfo({
            name: updatedUserData.name,
            job: updatedUserData.about,
          });
          profilePopup.close();
        }
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      })
      .finally(() => profilePopup.restoreButtonText());
  }
);
profilePopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(
  popupAvatarSelector,
  (inputValues) => {
    return api
      .updateUserAvatar(inputValues.avatar.trim())
      .then((updatedUserData) => {
        if (updatedUserData) {
          userInfo.setUserInfo({ avatar: updatedUserData.avatar });
          avatarEditPopup.close();
        }
      })
      .catch((error) => {
        console.error("Error al actualizar el avatar:", error);
      })
      .finally(() => avatarEditPopup.restoreButtonText());
  }
);
avatarEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  return api
    .addNewCard(inputValues.title.trim(), inputValues.link.trim())
    .then((newCardData) => {
      if (newCardData) {
        const newCard = createCard(newCardData);
        cardsSection.addItem(newCard);
        addCardPopup.close();
      }
    })
    .catch((error) => {
      console.error("Error al agregar la tarjeta:", error);
    })
    .finally(() => addCardPopup.restoreButtonText());
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners();

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

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#name").value = userData.name.trim();
  document.querySelector("#about").value = userData.job.trim();
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
});

const editProfileValidator = new FormValidator(editProfileForm, formConfig);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(addCardForm, formConfig);
addCardValidator.enableValidation();

const editAvatarValidator = new FormValidator(editAvatarForm, formConfig);
editAvatarValidator.enableValidation();

const handleLikeButtonClick = (cardId, isLiked) => {
  const likeApiCall = isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  likeApiCall
    .then((updatedCardData) => {
      document.querySelector(
        `[data-id='${cardId}'] .card__like-checkbox`
      ).checked = updatedCardData.isLiked;
    })
    .catch((error) => {
      console.error("Error al modificar el estado de 'Me gusta':", error);
    });
};

function createCard(data) {
  return new Card(data, "#card__template", confirmPopup, api).getCard();
}
