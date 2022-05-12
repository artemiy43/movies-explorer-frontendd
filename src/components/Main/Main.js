import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import React from 'react';

function Main({moviesPage, handleMoviesPage}) {
  React.useEffect(() => {
    handleMoviesPage(false);
  },[moviesPage, handleMoviesPage]);

  return(
    <main className='Main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
