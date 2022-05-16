import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function Movies({ SavedMoviesPage, MoviesList, isLoading }) {
  console.log('movies');
  return (
    <section className='movies'>
      <SearchForm/>
      <MoviesCardList
        isLoading={isLoading}
        list={MoviesList}
        SavedMoviesPage={SavedMoviesPage}
      />
    </section>
  );
}

export default Movies;
