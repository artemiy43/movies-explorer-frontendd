import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function SavedMovies({ SavedMoviesPage, SavedMoviesList, isLoading }) {
  console.log('saved-movies');
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
