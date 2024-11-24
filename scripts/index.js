const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".form__input-name");
const aboutInput = document.querySelector(".form__input-about");
const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");

  nameInput.placeholder = profileName.textContent;
  aboutInput.placeholder = profileDescription.textContent;
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});
