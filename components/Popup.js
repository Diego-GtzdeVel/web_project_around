class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); // Asegura el contexto de "this"
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado para cerrar el popup al presionar la tecla Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Método público para agregar los event listeners
  setEventListeners() {
    // Cerrar al hacer clic en el botón de cierre
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });

    // Cerrar al hacer clic fuera del contenido del popup (área sombreada)
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}

// Ejemplo de uso:
const popup = new Popup(".popup");

// Agregar los event listeners
popup.setEventListeners();

// Abrir el popup al hacer clic en un botón
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    popup.open();
  });
