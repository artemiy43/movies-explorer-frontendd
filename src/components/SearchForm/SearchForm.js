import './SearchForm.css';


function SearchForm() {
  return (
    <div className='search-form'>
      <form className='search-form__form'>
        <div className='search-form__box'>
          <input
            type='text'
            placeholder='Фильм'
            className='search-form__input'
            name='query'
            value=''
            required
          />
          <button className='search-form__btn' type='submit'/>
        </div>
        <div className='search-form__checkbox'>
          <label class="search-form__switch">
              <input type="checkbox"/>
              <span class="search-form__slider"></span>
          </label>
          <p className='search-form__checkbox-name'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
