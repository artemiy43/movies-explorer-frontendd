import './App.css';
import React from 'react';
import { Route, Switch, useHistory} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);                               // стейт для показа прелоадера
  const [isError, setIsError] = React.useState(true);                                    // стейт для показа ошибки
  const [isErrorMovies, setIsErrorMovies] = React.useState(true);                        // стейт для ошибки при загрузки фильмов пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);                                 // стейт для авторизации
  const [isInfoTooltipOpen, setInfoTooltipOpened] = React.useState(false);                //переменная для управления открытия popup infoTool
  const [error, setError] = React.useState('');                                           // стейт для сообщения ошибки
  const [currentUser, setCurrentUser] = React.useState({});                             //переменная для текущего пользователя
  const [userMovies, setUserMovies] = React.useState([]);                               // стейт для фильмов пользователя
  const history = useHistory();

  React.useEffect(()=> {               //если меняется loggedIn
    if (loggedIn)                      // если true
      history.push('/movies');           // переходим
  },[loggedIn]);

  React.useEffect(()=> {               //при монтировании app
    tokenCheck();                      // проверяем токен
  },[]);

  function handleLogin() {                     // функция для изменения состояния loggedIn
    setLoggedIn(true);
  }

  function closePopup() {                      // закрытие попапа
    setInfoTooltipOpened(false);
  }

  function handleRegisterUser(name, email, password){
    setIsLoading(true);
    mainApi.register(name, email, password)                //регистрируемся
    .then((res)=> {
      handleAuthoriseUser(email, password);                // сразу авторизируемся
    })
    .catch((err) => {                                      // если возникает ошибка - показываем
      setError(err.message);
      setIsError(true);
      setInfoTooltipOpened(true);
    })
    .finally(()=> {
      setIsLoading(false);
    });
  }

  function handleAuthoriseUser(email, password) {
    setIsLoading(true);
    mainApi.authorize(email, password)            // авторизируемся
    .then((data) => {
      localStorage.setItem('jwt', data.token);   // сохраняем токен в хранилище
      tokenCheck();                              // проверяем токен
    })
    .catch((err) => {                              // если возникает ошибка - показываем
      setError(err.message);
      setIsError(true);
      setInfoTooltipOpened(true);
    })
    .finally(()=> {
      setIsLoading(false);
    });
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      setIsLoading(true);
      handleLogin();
      Promise.all([mainApi.getContent(jwt), mainApi.getUserMovies(jwt)])           // делаем запросы на информацию о пользователе и его любимых фильмах
      .then(([ userInfo, movies ]) => {
        if (userInfo){
          setCurrentUser(userInfo);
          setUserMovies(movies);
          setIsErrorMovies(false);
        }
      })
      .catch((err) => {                                                           // если возникает ошибка - показываем
        setError(err.message);
        setIsError(true);
        setInfoTooltipOpened(true);
        setIsErrorMovies(true);
      })
      .finally(()=> {
        setIsLoading(false);
      });
    }
  }

  function handleSignOut() {                               // выходим из аккаунта
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    history.push('/');
  };

  function handleUpdateUser(name, email) {                // обновление данных пользователя
    mainApi.setUserInfo(name, email)
      .then(data => {
        setCurrentUser(data);
        setError("Обновление прошло успешно!");           // выводим успешный ответ
        setIsError(false);
        setInfoTooltipOpened(true);
      })
      .catch((err) => {
        setError(err.message);
        setIsError(true);
        setInfoTooltipOpened(true);
      });
  }

  function handleSaveMovie(movie) {                        // сохранение фильма в избранное
    const jwt = localStorage.getItem('jwt');
    mainApi.saveUserMovie(movie, jwt)
      .then(newCard => {
        setUserMovies([newCard, ...userMovies]);            // добавляем в стейт
      })
      .catch((err) => {                                      // если возникает ошибка - показываем
        setError(err.message);
        setIsError(true);
        setInfoTooltipOpened(true);
      });
  }

  function handleDeleteMovie(movie) {                      // удаляем фильм из избранного
    const jwt = localStorage.getItem('jwt');
    mainApi.deleteMovie(movie._id, jwt)
    .then((res)=> {
      setUserMovies((movies) => movies.filter(function(item){  // обновляем стейт с фильмами  пользователя
        return item._id !== movie._id;
      }));
    })
    .catch((err) => {                                       // если возникает ошибка - показываем
      setError(err.message);
      setIsError(true);
      setInfoTooltipOpened(true);
    });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Header loggedIn={loggedIn} />
            <Switch>
              <ProtectedRoute
                path='/movies'
                loggedIn={loggedIn}
                component={Movies}
                SavedMoviesPage={false}
                SavedMoviesList={userMovies}
                onLikeClick={handleSaveMovie}
                onDeleteClick={handleDeleteMovie}
              />
              <ProtectedRoute
                path='/saved-movies'
                loggedIn={loggedIn}
                component={SavedMovies}
                SavedMoviesPage={true}
                SavedMoviesList={userMovies}
                isLoading={isLoading}
                isErrorMovies={isErrorMovies}
                onDeleteClick={handleDeleteMovie}
              />
              <ProtectedRoute
                path='/profile'
                loggedIn={loggedIn}
                component={Profile}
                handleSignOut={handleSignOut}
                handleUpdateUser={handleUpdateUser}
                isError={isError}
              />

              <Route exact path='/'>
                <Main />
              </Route>

              <Route path='/signup'>
                <Register onSubmit={handleRegisterUser} />
              </Route>

              <Route path='/signin'>
                <Login onSubmit={handleAuthoriseUser}/>
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>

            </Switch>
            <InfoTooltip isError={isError} isOpen={isInfoTooltipOpen} message={error} onClose={closePopup}/>
            <Footer />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
