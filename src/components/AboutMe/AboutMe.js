import './AboutMe.css';
import me from '../../images/me.jpg';


function AboutMe() {

  //---РАЗМЕТКА JSX---
  return (
    <section className='about-me section__content'>
      <h2 className='section__title'>Студент</h2>
      <article className='about-me__article'>
        <div className='about-me__text-box'>
          <div className='about-me__main-info'>
            <h3 className='about-me__title'>Артемий</h3>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 22 года</p>
            <p className='about-me__text'>Родился и живу в Уфе, в данный момент учусь в УГАТУ, но планирую переезжать в Санкт-Петербург для поиска работы веб-разработчиком и начала самостоятельной жизни. Моя мечта - посетить множество интересных стран по всему миру.
            </p>
          </div>
          <ul className='about-me__contacts'>
            <li className='about-me__contact'>
              <a className='about-me__link app__link-outside' href='https://t.me/UFA_Artemiy_Bondar' target='_blank' rel='noopener noreferrer'>Facebook</a>
            </li>
            <li className='about-me__contact'>
              <a className='about-me__link app__link-outside' href='https://github.com/artemiy43' target='_blank' rel='noopener noreferrer'>Github</a>
            </li>
          </ul>
        </div>
        <div className='about-me__photo-box'>
          <img className='about-me__photo' src={me} alt='Фото студента' />
        </div>
      </article>
    </section>
  );
};

export default AboutMe;
