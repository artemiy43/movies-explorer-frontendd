import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({MoviesList, isLoading}) {

  return (
    <section className='movies'>
      <SearchForm/>
      <MoviesCardList
        isLoading={isLoading}
        list={MoviesList}
      />
    </section>
  );
}

export default Movies;
