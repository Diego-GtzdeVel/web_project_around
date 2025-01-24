class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Método para obtener información del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  // Método para establecer nueva información del usuario
  setUserInfo({ name, job }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (job) {
      this._jobElement.textContent = job;
    }
  }
}

// Ejemplo de uso:
const userInfo = new UserInfo({
  nameSelector: ".user-name",
  jobSelector: ".user-job",
});

// Obtener información del usuario
console.log(userInfo.getUserInfo());

// Actualizar información del usuario
userInfo.setUserInfo({
  name: "Juan Pérez",
  job: "Desarrollador Web",
});
