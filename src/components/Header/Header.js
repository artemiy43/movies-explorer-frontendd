import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import { Route } from 'react-router-dom';
const endpoints = ['/', '/profile', '/movies', '/saved-movies'];
function Header({moviesPage, loggedIn}) {
  return(
    <Route exact path={endpoints}>
      <header className={moviesPage ? `header header_loggedin` : `header header_loggedout`}>
        <Logo />
        <Navigation loggedIn={moviesPage}/>
      </header>
    </Route>
  );
}

export default Header;
