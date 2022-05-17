import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navigation({ loggedIn }) {

  const [isClicked, setIsClicked] = useState(false);

  function handleMenuOpen() {
    setIsClicked(true)
  };

  function handleMenuClose() {
    setIsClicked(false)
  };

  return (
    <nav className={`menu ${isClicked ? 'menu_open' : ''}`}>
      {loggedIn ? (
        <>
          <button
            className={`menu__btn ${isClicked ? 'menu__btn_type_close' : 'menu__btn_type_burger'} `}
            onClick={isClicked ? handleMenuClose : handleMenuOpen}
          />

          <div className={`menu__box ${isClicked ? 'menu__box_open' : ''}`}>
            <NavLink exact to='/' activeClassName='menu__film-link_active' className='menu__film-link app__link'
            onClick={handleMenuClose}>
              Главная
            </NavLink>
            <NavLink to='/movies' activeClassName='menu__film-link_active' className='menu__film-link app__link'
            onClick={handleMenuClose}>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' activeClassName='menu__film-link_active' className='menu__film-link app__link'
            onClick={handleMenuClose}>
              Сохраненные фильмы
            </NavLink>
            <Link to='/profile' className='menu__link menu__link_type_profile app__link'
            onClick={handleMenuClose}>
              <p className='menu__link-text'>Аккаунт</p>
              <div className='menu__icon-container'>
                <div className='menu__icon'></div>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to='/signup' className='menu__link app__link'>Регистрация</Link>
          <Link to='/signin' className='menu__link menu__link_type_signin app__link'>Войти</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
