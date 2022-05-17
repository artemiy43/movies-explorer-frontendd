import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {

  return (
    <section className='pageNotFound'>
      <h1 className='pageNotFound__title'>404</h1>
      <p className='pageNotFound__subtitle'>Страница не найдена</p>
      <Link to='/' class="pageNotFound__link">
        <p className='pageNotFound__text'>Назад</p>
      </Link>
    </section>
  );
};

export default PageNotFound;
