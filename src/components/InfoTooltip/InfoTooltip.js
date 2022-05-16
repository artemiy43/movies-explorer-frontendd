import './InfoTooltip.css';
import imageDeclinedPath from '../../images/declined.svg';
import imageAcceptedPath from '../../images/accepted.svg';

function InfoTooltip({isError, isOpen, onClose, message}) {
  return(
    <div className={isOpen ? `popup popup_opened` : `popup`}  >
      <div className="popup__container">
      <button onClick={onClose} aria-label="Закрыть" type="button" className="popup__close-button"></button>
      <img alt="Картинка" className="popup__image" src={isError ? imageDeclinedPath : imageAcceptedPath}/>
      <p className="popup__text">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
