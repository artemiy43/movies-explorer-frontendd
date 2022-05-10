import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({SavedMoviesList, isLoading}) {

  return (
    <section className='savedMovies'>
      <SearchForm/>
      <MoviesCardList
        isLoading={isLoading}
        list={SavedMoviesList}
      />
    </section>
  );
}

export default SavedMovies;
