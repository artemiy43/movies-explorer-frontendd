import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React from 'react';


function MoviesCardList({
  isLoading,
  list,
  SavedMoviesPage,
}) {

  return (
    <section className='movies-list'>
      {isLoading ? (
        <Preloader />
      ) : (
          <>
            <div className={SavedMoviesPage ? `movies-list__box movies-list__box_saved-page` : `movies-list__box`}>
              {list.map((item) => (
                  <MoviesCard
                    key={item.id}
                    card={{ ...item, _id: item.id }}
                    liked={false}
                    savedPage={SavedMoviesPage}
                  />))}
            </div>
            <button
              className={SavedMoviesPage ? `movies-list__more-btn movies-list__more-btn_hidden` : `movies-list__more-btn`}
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
