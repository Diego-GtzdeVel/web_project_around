class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector); // Llamamos al constructor de la clase padre (Popup)
    this._submitCallback = submitCallback; // Guardamos el callback de submit
    this._form = this._popup.querySelector("form");
    this._inputList = Array.from(this._form.querySelectorAll("input"));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners(); // Llamamos a setEventListeners() de la clase padre

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitCallback(inputValues);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  // Método para rellenar el formulario con los valores actuales
  fillForm(name, description) {
    this._form.querySelector('input[name="name"]').value = name;
    this._form.querySelector('input[name="description"]').value = description;
  }
}

// Callback para manejar el envío del formulario
function handleProfileFormSubmit(inputValues) {
  // Actualizamos los valores del perfil con los datos del formulario
  document.querySelector(".profile__name").textContent = inputValues.name;
  document.querySelector(".profile__description").textContent =
    inputValues.description;
  console.log("Formulario enviado:", inputValues);
}

// Crear una instancia de PopupWithForm
const popupWithForm = new PopupWithForm(
  ".popup-edit-profile",
  handleProfileFormSubmit
);

// Establecer los event listeners
popupWithForm.setEventListeners();

// Al hacer clic en el botón de editar, abrimos el popup con los valores actuales
document.querySelector(".profile__edit").addEventListener("click", () => {
  const currentName = document.querySelector(".profile__name").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;

  // Rellenamos el formulario con los valores actuales
  popupWithForm.fillForm(currentName, currentDescription);
  popupWithForm.open();
});
