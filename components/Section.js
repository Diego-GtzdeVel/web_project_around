export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Almacena el array de datos.
    this._renderer = renderer; // Callback para renderizar cada elemento.
    this._container = document.querySelector(containerSelector); // Contenedor DOM.
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Llama al callback para renderizar cada elemento.
    });
  }
  addItem(element) {
    this._container.prepend(element); // Agrega el elemento al inicio del contenedor.
  }
}
