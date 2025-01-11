export function openPopup(
  popupElement,
  nameInput,
  aboutInput,
  profileName,
  profileDescription
) {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent.trim();
  aboutInput.value = profileDescription.textContent.trim();
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

export function handleFormSubmit(
  evt,
  nameInput,
  aboutInput,
  profileName,
  profileDescription,
  popupElement
) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup(popupElement);
}

export function handleOutsideClick(evt, popupElement) {
  if (evt.target === popupElement) {
    closePopup(popupElement);
  }
}

export function createImagePopup(card, imagePopupTemplate) {
  const popupClone = imagePopupTemplate.content.cloneNode(true);
  const popupElement = popupClone.querySelector(".image-popup");

  const imagePopupImage = popupClone.querySelector(".image-popup__image");
  const imagePopupDescription = popupClone.querySelector(
    ".image-popup__description"
  );
  const imagePopupClose = popupClone.querySelector(".image-popup__close");

  const cardImage = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__description-text").textContent;

  if (cardImage && imagePopupImage) {
    imagePopupImage.src = cardImage.src;
    imagePopupImage.alt = cardName;
  }

  imagePopupDescription.textContent = cardName;
  imagePopupClose.addEventListener("click", () =>
    closeImagePopup(popupElement)
  );

  popupElement.addEventListener("click", (event) => {
    if (event.target === popupElement) {
      closeImagePopup(popupElement);
    }
  });

  document.body.appendChild(popupElement);
  popupElement.classList.add("image-popup_opened");
}

export function closeImagePopup(popupElement) {
  popupElement.classList.remove("image-popup_opened");
  popupElement.remove();
}

export function handleEscClose(evt, activePopup) {
  if (evt.key === "Escape" && activePopup) {
    closePopup(activePopup);
  }
}

export function handleImagePopupEscClose(evt, imagePopup) {
  if (evt.key === "Escape" && imagePopup) {
    closeImagePopup(imagePopup);
  }
}
