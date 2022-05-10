import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';


function Login() {


  return (
    <section className='Login'>
      <Logo />
      <h2 className='Login__title'>Рады видеть!</h2>
      <form className='Login__form'>
        <label className='Login__label'>E-mail
          <input
            id='email'
            type='email'
            className='Login__input'
            name='email'
            minLength='2'
            maxLength='30'
            required
            value='почта'
          />
          <span id='email-error' className='Login__error'>
            Ошибка...
          </span>
        </label>
        <label className='Login__label'>Пароль
          <input
            id='password'
            type='password'
            className='Login__input'
            name='password'
            minLength='4'
            maxLength='20'
            required
            value='пароль'
          />
          <span id='password-error' className='Login__error'>
            Ошибка...
          </span>
        </label>

        <button
          className='Login__submit-button app__link'
          type='submit'
        >
          Войти
        </button>
        <p className='Login__text'>Ещё не зарегестрированы?
          <Link to='/signup' className='Login__link app__link'>Регистрация</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
