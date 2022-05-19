import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import { Route } from 'react-router-dom';
const endpoints = ['/', '/profile', '/movies', '/saved-movies'];
function Header({loggedIn}) {
  return(
    <Route exact path={endpoints}>
      <header className={loggedIn ? `header header_loggedin` : `header header_loggedout`}>
        <Logo />
        <Navigation loggedIn={loggedIn}/>
      </header>
    </Route>
  );
}

export default Header;
