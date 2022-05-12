import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function SavedMovies({SavedMoviesList, isLoading, SavedMoviesPage, moviesPage, handleMoviesPage}) {
  React.useEffect(() => {
    handleMoviesPage(true);
    console.log(moviesPage);
  },[moviesPage, handleMoviesPage]);

  return (
    <section className='savedMovies'>
      <SearchForm/>
      <MoviesCardList
        isLoading={isLoading}
        list={SavedMoviesList}
        SavedMoviesPage={SavedMoviesPage}
      />
    </section>
  );
}

export default SavedMovies;
