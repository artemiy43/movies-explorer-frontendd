import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import { filterOnWord, filterOnDuration, customizeImagesUrl } from '../../utils/utils';
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ SavedMoviesPage, SavedMoviesList, onLikeClick, onDeleteClick }) {
  const checkboxState = localStorage.getItem('shortFilms') === 'on' ? 'on' : 'off';   // берём состояние чекбокса из локал сторедж или ставим off по дефолту

  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);   // стейт для прилоадера
  const [keyword, setKeyword] = React.useState('');                   // стейт для слова по которому будет фильтрация
  const [shortFilms, setShortFilms] = React.useState(checkboxState);     // стейт для состояния чекбокса
  const [filteredMovies, setFilteredMovies] = React.useState([]);        // стейт для фильтрованных фильмов
  const [allMovies, setAllMovies] = React.useState([]);                  // стейт для всех фильмов
  const [isError, setIsError] = React.useState(false);                  // стейт для ошибки при запросе к beatfilms


  // проверяем есть ли данные в хранилище
  React.useEffect(() => {
    const array = JSON.parse(localStorage.getItem('movies'));
    if (array && !keyword) {
      setShortFilms(localStorage.getItem('shortFilms'));
      setFilteredMovies(shortFilms === 'on' ? filterOnDuration(array) : array);
    }
  }, [shortFilms, keyword])

  // по новому запросу фильтруем фильмы
  React.useEffect(() => {
    if (keyword) {
      const array = filterOnWord(allMovies, keyword, shortFilms);
      setFilteredMovies(array);
    }
  }, [keyword, shortFilms, allMovies])


  // фильтрация фильмов и сохранение в локал сторедж
  function handleSetFilteredMovies (movies, query, checkbox) {
    const moviesList = filterOnWord(movies, query);
    setFilteredMovies(checkbox === 'on' ? filterOnDuration(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function handleSearchSubmit(value) {
    setIsMoviesLoading(true);
    setKeyword(value);
    localStorage.setItem('keyword', value);
    localStorage.setItem('shortFilms', shortFilms);

    if (!allMovies.length) {
      moviesApi.getMovies()
        .then((data) => {
          customizeImagesUrl(data);
          setAllMovies(data);
          handleSetFilteredMovies(data, value, shortFilms);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
        .finally(() => setIsMoviesLoading(false))
    } else {
      handleSetFilteredMovies(allMovies, value, shortFilms);
      setIsMoviesLoading(false);
    }
  }

  // обработчик клика по чекбоксу
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
    localStorage.setItem('shortFilms', e.target.value);
	}

  return (
    <section className='movies'>
      <SearchForm
        onSearchClick={handleSearchSubmit}
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
      />
      <MoviesCardList
        isLoading={isMoviesLoading}
        list={filteredMovies}
        SavedMoviesPage={SavedMoviesPage}
        isError={isError}
        SavedMoviesList={SavedMoviesList}
        onLikeClick={onLikeClick}
        onDeleteClick={onDeleteClick}
      />
    </section>
  );
}

export default Movies;
