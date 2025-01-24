class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Array de datos
    this._renderer = renderer; // Función para renderizar cada item
    this._container = document.querySelector(containerSelector); // Contenedor donde agregar los elementos
  }

  // Método que renderiza todos los elementos usando la función `renderer`
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Llamamos al renderer para cada elemento
    });
  }

  // Método que agrega un solo item al contenedor
  addItem(element) {
    this._container.append(element); // Agrega el elemento al contenedor
  }
}
