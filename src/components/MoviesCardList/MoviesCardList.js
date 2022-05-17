import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { getSavedMovie } from '../../utils/utils';

function MoviesCardList({
  isLoading,
  list,
  SavedMoviesPage,
  isError,
  onLikeClick,
  onDeleteClick,
  SavedMoviesList
}) {
  const width = useWindowWidth();                                                      // ширина экрана
  const [showList, setShowList] = React.useState([]);                                  // список который будет показан
  const [cardsShowParams, setCardsShowParams] = React.useState({shown: 0, hidden: 0}); // объект который устанавливает количество скрытых и количество показанных карточек в cardList


  // задаем значения для отображения карточек при изменении ширины экрана
  React.useEffect(() => {
    if (width > 1027) {
      setCardsShowParams({ shown: 16, hidden: 4});
    } else if (width <=1027 && width > 629){
      setCardsShowParams({shown: 8, hidden: 2});
    } else if (width <= 629){
      setCardsShowParams({shown: 5, hidden: 2});
    }
  }, [width]);

  // задаем массив отображаемых карточек на странице всех фильмов
  React.useEffect(() => {
    if(list.length && !SavedMoviesPage){
      const res = list.filter((item, index) => index < cardsShowParams.shown);
      setShowList(res);
    }
  }, [list, SavedMoviesPage, cardsShowParams.shown]);

  // обработчик клика по кнопке "Еще"
  function handleClickMoreMovies () {
    const start = showList.length;
    const end = start + cardsShowParams.hidden;
    const difference = list.length - start;

    if(difference > 0){
      const newCards = list.slice(start, end);
      setShowList([...showList, ...newCards]);
    }
  };

  // создания массива избранных карточек
  function getSavedMoviesPage() {
    return list.map((item) => (
      <MoviesCard
        key={item._id}
        card={item}
        savedPage={SavedMoviesPage}
        onDelete={onDeleteClick}
      />
    ))
  };

  // создания массива стандартных карточек
  function getInitialMoviesPage() {
    return showList.map((item) => {
      const likedMovieCard = getSavedMovie(SavedMoviesList, item.id);
      const likedMovieId = likedMovieCard ? likedMovieCard._id : null;
      return (
        <MoviesCard
          key={item.id}
          card={{ ...item, _id: likedMovieId }}
          onLike={onLikeClick}
          onDelete={onDeleteClick}
          liked={likedMovieCard ? true : false}
        />)
    })
  };

  return (
    <section className='movies-list'>
      {isLoading ? (
        <Preloader />
      ) : (
        (list.length===0 || isError) ? (
          <p className={`movies-list__message ${isError && 'movies-list__message_type_err'}`}>
            {isError ? `Во время запроса произошла ошибка.
              Возможно, проблема с соединением или сервер недоступен.
              Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
          </p>
        ) : (
          <>
            <div className={SavedMoviesPage ? `movies-list__box movies-list__box_saved-page` : `movies-list__box`}>
              {SavedMoviesPage ? getSavedMoviesPage() : getInitialMoviesPage()}
            </div>
            <button
              className={(SavedMoviesPage || list.length===0 || showList.length === list.length )? `movies-list__more-btn movies-list__more-btn_hidden` : `movies-list__more-btn`}
              type='button'
              onClick={handleClickMoreMovies}
            >
              Ещё
            </button>
          </>
        )
      )}
    </section>
  );
};

export default MoviesCardList;
