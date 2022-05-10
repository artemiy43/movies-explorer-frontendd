import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';


function Register() {


  return (
    <section className='Register'>
      <Logo />
      <h2 className='Register__title'>Добро пожаловать!</h2>
      <form className='Register__form'>
        <label className='Register__label'>Имя
            <input
              id='name'
              type='text'
              className='Register__input'
              name='name'
              minLength='2'
              maxLength='30'
              required
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              value='Имя'
            />
            <span id='name-error' className='Register__error'>
              Ошибка...
            </span>
        </label>
        <label className='Register__label'>E-mail
          <input
            id='email'
            type='email'
            className='Register__input'
            name='email'
            minLength='2'
            maxLength='30'
            required
            value='почта'
          />
          <span id='email-error' className='Register__error'>
            Ошибка...
          </span>
        </label>
        <label className='Register__label'>Пароль
          <input
            id='password'
            type='password'
            className='Register__input'
            name='password'
            minLength='4'
            maxLength='20'
            required
            value='пароль'
          />
          <span id='password-error' className='Register__error'>
            Ошибка...
          </span>
        </label>

        <button
          className='Register__submit-button app__link'
          type='submit'
        >
          Зарегистрироваться
        </button>
        <p className='Register__text'>Уже зарегистрированы?
          <Link to='/signin' className='Register__link app__link'>Войти</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
