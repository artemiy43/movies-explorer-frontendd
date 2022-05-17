import './AboutProject.css';

function AboutProject() {

  return (
    <section className='project section__content' id='AboutProject'>
      <h2 className='section__title'>О проекте</h2>
      <div className='project__about'>
        <div className='project__description'>
          <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='project__description'>
          <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='project__duration'>
        <p className='project__line-time project__line-time_type_short'>1 неделя</p>
        <p className='project__line-time project__line-time_type_long'>4 недели</p>
        <p className='project__line-time project__part'>Back-end</p>
        <p className='project__line-time project__part'>Front-end</p>
      </div>
  </section>
  );
};

export default AboutProject;
