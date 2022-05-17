import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';
import { filterOnWord } from '../../utils/utils';

function SavedMovies({ SavedMoviesPage, SavedMoviesList, isLoading, isErrorMovies, onDeleteClick}) {

  const [keyword, setKeyword] = React.useState('');
  const [shortFilms, setShortFilms] = React.useState('off');
  const [filteredMovies, setFilteredMovies] = React.useState(SavedMoviesList);

  React.useEffect(() => {
    const arr = filterOnWord(SavedMoviesList, keyword, shortFilms);
    setFilteredMovies(arr);
  }, [keyword, shortFilms, SavedMoviesList]);

  // обработчик отправки формы
  function handleSearchSubmit(value) {
    setKeyword(value);
    const resultList = filterOnWord(SavedMoviesList, keyword, shortFilms);
    setFilteredMovies(resultList);
  };

  // обработчик клика по чекбоксу
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
  };

  return (
    <section className='savedMovies'>
      <SearchForm
        onSearchClick={handleSearchSubmit}
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
        savedMoviesPage={true}
      />
      <MoviesCardList
        isLoading={isLoading}
        list={filteredMovies}
        SavedMoviesPage={SavedMoviesPage}
        onDeleteClick={onDeleteClick}
        isError={isErrorMovies}
      />
    </section>
  );
}

export default SavedMovies;
