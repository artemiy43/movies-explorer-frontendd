import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import React from 'react';

function Login(props) {
  const {values, errors, isValid, handleChange} = useFormWithValidation();

  const history = useHistory();

  React.useEffect(()=> {               //если меняется loggedIn
    if (props.loggedIn)                      // если true
      history.push('/movies');           // переходим
  },[props.loggedIn, history]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values.email, values.password);
  };

  return (
    <section className='Login'>
      <Logo />
      <h2 className='Login__title'>Рады видеть!</h2>
      <form className='Login__form' onSubmit={handleSubmit}>
        <label className='Login__label'>E-mail
          <input
            id='email'
            type='email'
            className='Login__input'
            name='email'
            minLength='2'
            maxLength='30'
            required
            onChange={handleChange}
          />
          <span id='email-error' className='Login__error'>
            {errors.email || ''}
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
            onChange={handleChange}
          />
          <span id='password-error' className='Login__error'>
            {errors.password || ''}
          </span>
        </label>

        <button
          className='Login__submit-button app__link'
          type='submit'
          disabled={!isValid}
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
