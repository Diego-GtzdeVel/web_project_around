export default class Api {
  constructor(baseUrl, headers = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Método para obtener la información del usuario
  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => ({
        success: false,
        error:
          err.message || "Error desconocido al comunicarse con el servidor",
      }));
  }

  // Método para obtener las tarjetas iniciales
  getInitialCards() {
    return fetch(`${this.baseUrl}cards/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => ({
        success: false,
        error:
          err.message || "Error desconocido al comunicarse con el servidor",
      }));
  }
}
