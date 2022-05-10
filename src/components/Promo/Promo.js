import './Promo.css';
// import NavTab from '../NavTab/NavTab';
import landingLogo from '../../images/landing-logo.svg';


function Promo() {

  return (
    <section className='promo'>
      <img className='promo_picture' src={landingLogo} alt='Картинка с баннера' />
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      {/* <NavTab /> */}
      <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
      <a class="promo__link" href="#AboutProject">Узнать больше</a>
    </section>
  );
};

export default Promo;
