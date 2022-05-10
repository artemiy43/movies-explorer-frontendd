import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React from 'react';


function MoviesCardList({
  isLoading,
  list,
  savedMoviesPage,
}) {

  return (
    <section className='movies-list'>
      {isLoading ? (
        <Preloader />
      ) : (
          <>
            <div className='movies-list__box'>
              {list.map((item) => (
                  <MoviesCard
                    key={item.id}
                    card={{ ...item, _id: item.id }}
                    liked={true}
                  />))}
            </div>
            <button
              className='movies-list__more-btn'
              type='button'
            >
              Ещё
            </button>
          </>
        // )
      )}
    </section>
  );
};

export default MoviesCardList;
