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

  profileName.firstChild.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", handleFormSubmit);
