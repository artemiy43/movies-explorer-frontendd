import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React from 'react';

function Movies({MoviesList, isLoading, SavedMoviesPage, moviesPage, handleMoviesPage}) {
  React.useEffect(() => {
    handleMoviesPage(true);
  },[moviesPage, handleMoviesPage]);
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
