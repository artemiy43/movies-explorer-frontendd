import './Promo.css';
import landingLogo from '../../images/landing-logo.svg';


function Promo() {

  return (
    <section className='promo'>
      <img className='promo_picture' src={landingLogo} alt='Картинка с баннера' />
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <a className="promo__link" href="#AboutProject">Узнать больше</a>
    </section>
  );
};

export default Promo;
