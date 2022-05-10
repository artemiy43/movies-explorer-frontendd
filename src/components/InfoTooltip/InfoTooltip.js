import './InfoTooltip.css';
import imageDeclinedPath from '../../images/declined.svg';
function InfoTooltip(props) {
  return(
    <div className={props.isOpen ? `popup popup_opened` : `popup`}  >
      <div className="popup__container">
      <button onClick={props.onClose} aria-label="Закрыть" type="button" className="popup__close-button"></button>
      <img alt="Картинка" className="popup__image" src={imageDeclinedPath}/>
      <p className="popup__text">{'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
