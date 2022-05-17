import './SearchForm.css';
import React from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({ onSearchClick, savedMoviesPage, shortFilms, onCheckbox }) {
  const {values, errors, isValid, setValues, handleChange, setIsValid} = useFormWithValidation();

  React.useEffect(() => {
    if (!savedMoviesPage) {
      const keyword = localStorage.getItem('keyword');
      if (keyword) {
        setValues({keyword : keyword});
        setIsValid(true);
      }
    }
  }, [savedMoviesPage, setValues, setIsValid]);


  function handleSubmit(e) {
    e.preventDefault();
    onSearchClick(values.keyword);
  };

  return (
    <div className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmit}>
        <div className='search-form__box'>
          <input
            type='text'
            placeholder='Фильм'
            className='search-form__input'
            name='keyword'
            value={values.keyword || ''}
            onChange={handleChange}
            required
          />
          <span id='email-error' className='search-form__error'>
            {errors.keyword ? 'Нужно ввести ключевое слово' : ''}
          </span>
          <button className='search-form__btn' type='submit' disabled={!isValid}/>
        </div>
        <div className='search-form__checkbox'>
          <label className={`search-form__switch
            ${shortFilms === 'on' ? 'search-form__switch_active' : null}`
          }>
            <input className='search-form__radio search-form__radio_off'
              type='radio'
              name='shortFilms'
              value='off'
              checked={shortFilms === 'off' ? true : false}
              onChange={onCheckbox}
            />
            <input className='search-form__radio search-form__radio_on'
              type='radio'
              name='shortFilms'
              value='on'
              checked={shortFilms === 'on' ? true : false}
              onChange={onCheckbox}
            />
            <span className='search-form__slider'></span>
          </label>
          <p className='search-form__checkbox-name'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
