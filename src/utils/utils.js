// преобразование времени фильма
export function getTime(mins) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}ч ${minutes}м`;
}
// фильтрация по длительности
export function filterOnDuration(movies){
  return movies.filter((item) => item.duration < 40);
};

// фильтрации по запросу и длительности
export function filterOnWord(movies, searchQuery, shortFilms) {
  const moviesByQuery =  movies.filter((item) => {
    const strRu = String(item.nameRU).toLowerCase();
    const strEn = String(item.nameEN).toLowerCase();
    const searchStr = searchQuery.toLowerCase().trim();
    return (strRu.indexOf(searchStr) !== -1 || strEn.indexOf(searchStr) !== -1);
  });

  if(shortFilms === true){
    return filterOnDuration(moviesByQuery);
  }
  return moviesByQuery;
};


export function getSavedMovie(arr, id) {
  return arr.find((item) => {
    return item.movieId === id;
  });
};

// настройка изображений
export function customizeImagesUrl(movies) {
  movies.forEach(movie => {
    if(movie.image){
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
      movie.image = `https://api.nomoreparties.co${movie.image.url}`
    } else {
      movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80';
      movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80'
    }
  });
};
