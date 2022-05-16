class MainApi {
  constructor({contentType, baseUrl}) {
    this._contentType = contentType;                      //контент тайп
    this._baseUrl = baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  register(name, email, password) {                    // функция для регистрации нового пользователя
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then((res) =>{
      return this._checkStatus(res);
    });
  };

  authorize(email, password) {                // функция для авторизации пользователя
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': this._contentType
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res) =>{
      return this._checkStatus(res);
    });
  };

  getContent(token) {                     // функция для проверки токена
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': this._contentType,
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((res) =>{
      return this._checkStatus(res);
    });
  };

  getUserMovies(token) {                                                        //метод для получения карточек
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': this._contentType
      }
    })
    .then((res) =>{
      return this._checkStatus(res);
    });
  }

  setUserInfo(name, email) {                                           //метод для установки новой информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': this._contentType
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
    })
    .then((res) => {
      return this._checkStatus(res);
    });
  }
}

export const mainApi = new MainApi({
  contentType: 'application/json',
  baseUrl: 'https://api.movies.bondar.student.nomoredomains.xyz/api'
});
