import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({handleSignOut, handleUpdateUser, isError}) {

  const [isInputActive, setIsInputActive] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  const {values, errors, isValid, handleChange, setValues, setIsValid} = useFormWithValidation();

  // забираем значения юзера
  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [setValues, currentUser]);

  // блокируем отправку формы если значения в полях и контексте одинаковые
  React.useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsValid(false);
    }
  }, [setIsValid, values, currentUser]);

  // блокируем поля если редактирование прошло успешно
  React.useEffect(() => {
    if (isError === false) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, isError]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values.name, values.email);
    setIsInputActive(false);
  };

  function handleRedactClick() {
    setIsInputActive(true);
  };


  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
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
              defaultValue={values.name || ''}
              onChange={handleChange}
              disabled={!isInputActive}
            />
            <span id="name-error" className='profile__error'>
              {errors.name ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
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
              defaultValue={values.email || ''}
              onChange={handleChange}
              disabled={!isInputActive}
            />
            <span id='email-error' className='profile__error'>
              {errors.email || ''}
            </span>
          </label>

          {isInputActive ? (
            <button
              className='profile__btn profile__btn_type_submit app__link'
              type='submit'
              disabled={!isValid }
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
                onClick={handleSignOut}
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
