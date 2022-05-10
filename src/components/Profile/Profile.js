import './Profile.css';
import React from 'react';


function Profile() {
  const [isInputActive, setIsInputActive] = React.useState(false);


  function handleRedactClick() {
    setIsInputActive(true);
  };

  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>Привет, Артём!</h2>
        <form className='profile__form'>
          <label className='profile__label'>Имя
            <input
              type='text'
              className='profile__input'
              name='name'
              minLength='2'
              maxLength='30'
              required
              title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              id='name'
              disabled={!isInputActive}
            />
            <span id="name-error" className='profile__error'>
            </span>
          </label>
          <label className='profile__label'>Email
            <input
              type='email'
              className='profile__input'
              name='email'
              minLength='2'
              maxLength='30'
              required
              id='email'
              disabled={!isInputActive}
            />
            <span id='email-error' className='profile__error'>
            </span>
          </label>

          {isInputActive ? (
            <button
              className='profile__btn profile__btn_type_submit app__link'
              type='submit'
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                className='profile__btn profile__btn_type_redact app__link'
                type='button'
                onClick={handleRedactClick}
              >
                Редактировать
              </button>
              <button
                className='profile__btn profile__btn_type_logout app__link'
                type='button'
              >
                Выйти из аккаунта
              </button>
            </>
          )}

        </form>
      </div>

    </section>
  );
};

export default Profile;
