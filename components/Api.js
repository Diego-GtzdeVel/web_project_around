export default class Api {
  constructor(baseUrl, headers = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
        return null;
      });
  }

  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error updating user profile:", err);
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error fetching cards:", err);
      });
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => {
        console.error("Error adding new card:", err);
      });
  }
}
