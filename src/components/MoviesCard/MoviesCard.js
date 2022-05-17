import './MoviesCard.css';
import { getTime } from '../../utils/utils';
import pic from '../../images/pic_1.png';      // для пробного просмотра

function MoviesCard({ card, onLike, onDelete, liked, savedPage }) {
  function handleLikeClick() {
    onLike(card);
  };

  function handleDeleteClick() {
    onDelete(card);
  };

  return (
    <article className='movie'>
      <a className='movie__link' href={card.trailer || card.trailerLink} target='_blank' rel='noreferrer'>
        <img className='movie__pic' src={pic} alt='Фильм'/>
      </a>
      <div className='movie__bottom'>
        <div className='movie__info'>
          <h2 className='movie__title'>{card.nameRU}</h2>
          <button
          className={`movie__btn ${savedPage ? 'movie__delete-btn' : 'movie__save-btn'} ${liked && !savedPage ? 'movie__save-btn_active' : ''}`}
          type='button'
          onClick={savedPage || liked ? handleDeleteClick : handleLikeClick}
          />
        </div>
        <p className='movie__duration'>{getTime(card.duration)}</p>
      </div>
    </article>
  );
};

export default MoviesCard;
