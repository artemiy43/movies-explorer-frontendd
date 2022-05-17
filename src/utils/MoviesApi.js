class MoviesApi {
  constructor({contentType, baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  }

  getMovies() {                    // запрос на фильмы
    return fetch(this._baseUrl)
    .then((res) =>{
      return this._checkStatus(res);
    });
  };
}



export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});
