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

// Function to load all cards into the page using the template
function loadCards() {
  const cardsSection = document.querySelector(".cards");
  const cardTemplate = document.getElementById("card__template"); // Get the template

  initialCards.forEach((card) => {
    const cardClone = cardTemplate.content.cloneNode(true); // Clone the template content
    console.log(cardClone);

    // Get the elements inside the template
    const cardImage = cardClone.querySelector(".card__image");
    const cardDelete = cardClone.querySelector(".card__delete");
    const cardCheckbox = cardClone.querySelector(".card__description-checkbox");
    const cardLabel = cardClone.querySelector(".card__description-text");
    const cardLike = cardClone.querySelector(
      ".card__description-checkbox-icon"
    );
    console.log(cardLike);

    // Set the values for the cloned elements
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardCheckbox.id = card.name;
    cardLabel.setAttribute("for", card.name);
    cardLabel.textContent = card.name;
    cardLabel.appendChild(cardLike);

    // Append the cloned card to the cards section
    cardsSection.appendChild(cardClone);
  });
}

loadCards();
