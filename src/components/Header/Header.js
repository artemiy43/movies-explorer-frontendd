import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';
import { Route } from 'react-router';
const endpoints = ['/', '/profile', '/movies', '/saved-movies'];
function Header(props) {
  return(
    <Route exact path={endpoints}>
      <header className={props.loggedIn ? `header header_loggedin` : `header header_loggedout`}>
        <Logo />
        <Navigation loggedIn={props.loggedIn}/>
      </header>
    </Route>
  );
}

export default Header;
