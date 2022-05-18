import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import React from 'react';

function Register(props) {
  const {values, errors, isValid, handleChange} = useFormWithValidation();

  const history = useHistory();

  React.useEffect(()=> {               //если меняется loggedIn
    if (props.loggedIn)                      // если true
      history.push('/movies');           // переходим
  },[props.loggedIn, history]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values.name, values.email, values.password);
  };

  return (
    <section className='Register'>
      <Logo />
      <h2 className='Register__title'>Добро пожаловать!</h2>
      <form className='Register__form' onSubmit={handleSubmit}>
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
              onChange={handleChange}
            />
            <span id='name-error' className='Register__error'>
              {errors.name || ''}
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
            pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
            onChange={handleChange}
          />
          <span id='email-error' className='Register__error'>
            {errors.email || ''}
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
            onChange={handleChange}
          />
          <span id='password-error' className='Register__error'>
            {errors.password || ''}
          </span>
        </label>

        <button
          className='Register__submit-button app__link'
          type='submit'
          disabled={!isValid}
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
