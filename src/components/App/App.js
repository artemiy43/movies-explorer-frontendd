import './App.css';
import React from 'react';
import { Redirect, Route, Switch, useHistory} from 'react-router-dom';
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);                                  // стоит true для просмотра всех страниц а так же для просмотра изменения навигации в header, если поставить false, то часть страниц будет недоступна и изменится header
  const [isInfoTooltipOpen, setInfoTooltipOpened] = React.useState(false);                //переменная для управления открытия popup infoTool
  const [moviesPage, setMoviesPage] = React.useState(false);
  const [error, setError] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});                             //переменная для текущего пользователя
  const [userMovies, setUserMovies] = React.useState([]);                                 //переменная для массива карточек

  const history = useHistory();
  const savedMoviesList = [                                                               // пробный массив с фильмами
    {
      "id": 1,
      "nameRU": "«Роллинг Стоунз» в изгнании",
      "nameEN": "Stones in Exile",
      "director": "Стивен Кайак ",
      "country": "США",
      "year": "2010",
      "duration": 61,
      "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
      "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
      "created_at": "2020-11-23T14:12:21.376Z",
      "updated_at": "2020-11-23T14:12:21.376Z",
      "image": {
          "id": 1,
          "name": "stones-in-exile",
          "alternativeText": "",
          "caption": "",
          "width": 512,
          "height": 279,
          "formats": {
              "thumbnail": {
                  "hash": "thumbnail_stones_in_exile_b2f1b8f4b7",
                  "ext": ".jpeg",
                  "mime": "image/jpeg",
                  "width": 245,
                  "height": 134,
                  "size": 8.79,
                  "path": null,
                  "url": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg"
              },
              "small": {
                  "hash": "small_stones_in_exile_b2f1b8f4b7",
                  "ext": ".jpeg",
                  "mime": "image/jpeg",
                  "width": 500,
                  "height": 272,
                  "size": 25.68,
                  "path": null,
                  "url": "/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
              }
          },
          "hash": "stones_in_exile_b2f1b8f4b7",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "size": 25.53,
          "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "created_at": "2020-11-23T14:11:57.313Z",
          "updated_at": "2020-11-23T14:11:57.313Z"
      }
    },
    {
      "id": 2,
      "nameRU": "All Tomorrow's Parties",
      "nameEN": "All Tomorrow's Parties",
      "director": " Джонатан Кауэтт",
      "country": "Великобритания",
      "year": "2009",
      "duration": 82,
      "description": "Хроники британского фестиваля, который первым нарушил монополию «Гластонбери», «Ридинга» и прочих пивных сборищ в чистом поле — и с тех пор прослыл одним из самых независимых и принципиальных. ATP из года в год проходит на базе отдыха в английской глуши, где артисты и их поклонники живут в одинаковых номерах, не бывает коммерческих спонсоров, программу составляют приглашенные кураторы (в разное время ими были Ник Кейв, Belle & Sebastian, Sonic Youth и даже Мэтт Грейнинг). И, главное, где не любят вздорных людей — основатель фестиваля Барри Хоган однажды сказал, что никогда больше не станет иметь дело с группой Killing Joke, «потому что они му...аки». Эта демократичность сказалась и на фильме: часть съемок сделана адептами фестиваля на мобильный телефон.",
      "trailerLink": "https://www.youtube.com/watch?v=D5fBhbEJxEU",
      "created_at": "2020-11-23T14:15:19.238Z",
      "updated_at": "2020-11-23T14:15:19.238Z",
      "image": {
          "id": 2,
          "name": "all-tommoros-parties",
          "alternativeText": "",
          "caption": "",
          "width": 699,
          "height": 266,
          "formats": {
              "thumbnail": {
                  "hash": "thumbnail_all_tommoros_parties_33a125248d",
                  "ext": ".jpeg",
                  "mime": "image/jpeg",
                  "width": 245,
                  "height": 93,
                  "size": 10.33,
                  "path": null,
                  "url": "/uploads/thumbnail_all_tommoros_parties_33a125248d.jpeg"
              },
              "small": {
                  "hash": "small_all_tommoros_parties_33a125248d",
                  "ext": ".jpeg",
                  "mime": "image/jpeg",
                  "width": 500,
                  "height": 190,
                  "size": 35.24,
                  "path": null,
                  "url": "/uploads/small_all_tommoros_parties_33a125248d.jpeg"
              }
          },
          "hash": "all_tommoros_parties_33a125248d",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "size": 67.06,
          "url": "/uploads/all_tommoros_parties_33a125248d.jpeg",
          "previewUrl": null,
          "provider": "local",
          "provider_metadata": null,
          "created_at": "2020-11-23T14:14:08.595Z",
          "updated_at": "2020-11-23T14:14:08.595Z"
      }
  },
  {
    "id": 3,
    "nameRU": " Без обратного пути",
    "nameEN": "No Distance Left to Run",
    "director": "Уилл Лавлейс, Дилан Сотерн",
    "country": "Великобритания",
    "year": "2010",
    "duration": 104,
    "description": "Затеянный по такому подозрительному поводу, как реюнион Blur в 2009-м году фильм начисто лишен присущего моменту пафоса и выхолощенности речей. Вернее, что-то похожее неизбежно возникает, когда ты видишь, как забитый до отказа Гайд-парк как в последний раз ревет «Song 2», но это лишь буквальное свидетельство того, что Blur — великая группа. К счастью, помимо прямых и косвенных свидетельств этого, в «No Distance Left to Run» хватает острых углов, неловких моментов и всего того сора, из которого рождаются по-настоящему отличные группы: помимо важных, но общеизвестных моментов (вроде соперничества с Oasis за первенство в том же бритпопе) визуализируются и те, что всегда оставались за кадром: наркотическая зависимость, неутихающие костры амбиций, ревность, обиды, слава — и все это блестяще снято на фоне истории того, что вообще происходило в Британии времен Блэра.",
    "trailerLink": "https://www.youtube.com/watch?v=6iYxdghpJZY",
    "created_at": "2020-11-23T14:17:23.257Z",
    "updated_at": "2020-11-23T14:17:23.257Z",
    "image": {
        "id": 3,
        "name": "blur",
        "alternativeText": "",
        "caption": "",
        "width": 460,
        "height": 298,
        "formats": {
            "thumbnail": {
                "hash": "thumbnail_blur_a43fcf463d",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 241,
                "height": 156,
                "size": 8.32,
                "path": null,
                "url": "/uploads/thumbnail_blur_a43fcf463d.jpeg"
            }
        },
        "hash": "blur_a43fcf463d",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "size": 21.07,
        "url": "/uploads/blur_a43fcf463d.jpeg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2020-11-23T14:17:01.702Z",
        "updated_at": "2020-11-23T14:17:01.702Z"
    }
  },
  {
    "id": 4,
    "nameRU": "Bassweight",
    "nameEN": "Bassweight",
    "director": "Сурид Хассан",
    "country": "Великобритания",
    "year": "2008",
    "duration": 61,
    "description": "Фильм про самую многообещающую музыкальную субкультуру нулевых использует тот же ассоциативный ряд, что и искомая музыка: низкое, затянутое облаками небо южного Лондона, приглушенный свет, массивный бас, удары которого отдаются в грудной клетке, негромкая речь людей, предпочитающих не показывать свои лица. Впрочем, все ключевые для дабстепа люди здесь, конечно, имеются — Бенга, Скрим, Kode 9, Мэри Энн Хоббс и прочие, а география не сводится к одному только Кройдону — следом за исторической родиной дабстепа режиссер фильма исследует и другие очаги возгорания, включая Бразилию и Японию.",
    "trailerLink": "https://www.youtube.com/watch?v=dgSyC6me-jQ",
    "created_at": "2020-12-02T16:48:01.794Z",
    "updated_at": "2020-12-02T16:48:01.794Z",
    "image": {
        "id": 4,
        "name": "загруженное",
        "alternativeText": "",
        "caption": "",
        "width": 276,
        "height": 183,
        "formats": {
            "thumbnail": {
                "hash": "thumbnail_zagruzhennoe_113f557116",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 235,
                "height": 156,
                "size": 6.59,
                "path": null,
                "url": "/uploads/thumbnail_zagruzhennoe_113f557116.jpeg"
            }
        },
        "hash": "zagruzhennoe_113f557116",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "size": 7.01,
        "url": "/uploads/zagruzhennoe_113f557116.jpeg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2020-12-02T16:47:22.972Z",
        "updated_at": "2020-12-02T16:47:22.972Z"
    }
  },
  {
    "id": 5,
    "nameRU": "Taqwacore: The Birth of Punk Islam",
    "nameEN": "Taqwacore: The Birth of Punk Islam",
    "director": " Омар Маджид",
    "country": "Канада",
    "year": "2009",
    "duration": 80,
    "description": "**Don't panic, we're Islamic!**\nПакистанские лесбиянки из Ванкувера, арабские хеви-металлисты из Чикаго, группа Vote Hezbollah, ведомая иранцем из Сан-Антонио, — все это невымышленные, сплошь настоящие персонажи, запечатленные в первом документальном свидетельстве о субкультуре исламского панка. Хотя до недавнего времени исламский панк, он же taqwacore, был художественным вымыслом, вышедшим из-под пера писателя-мусульманина Майкла Мухаммеда Найта, его книга сделала это явление вполне реальным, тогда как сам он стал главным героем фильма.\n",
    "trailerLink": "https://www.youtube.com/watch?v=JMZ8DO9F4Mo",
    "created_at": "2020-12-02T20:35:14.745Z",
    "updated_at": "2020-12-02T20:35:14.745Z",
    "image": {
        "id": 5,
        "name": "taqwacore2",
        "alternativeText": "",
        "caption": "",
        "width": 730,
        "height": 411,
        "formats": {
            "thumbnail": {
                "hash": "thumbnail_taqwacore2_2f487d2e74",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 245,
                "height": 138,
                "size": 7.01,
                "path": null,
                "url": "/uploads/thumbnail_taqwacore2_2f487d2e74.jpeg"
            },
            "small": {
                "hash": "small_taqwacore2_2f487d2e74",
                "ext": ".jpeg",
                "mime": "image/jpeg",
                "width": 500,
                "height": 282,
                "size": 16.29,
                "path": null,
                "url": "/uploads/small_taqwacore2_2f487d2e74.jpeg"
            }
        },
        "hash": "taqwacore2_2f487d2e74",
        "ext": ".jpeg",
        "mime": "image/jpeg",
        "size": 24.89,
        "url": "/uploads/taqwacore2_2f487d2e74.jpeg",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "created_at": "2020-12-02T20:34:50.858Z",
        "updated_at": "2020-12-02T20:34:50.858Z"
    }
  }
];
  function handleLogin() {                     // функция для изменения состояния loggedIn
    setLoggedIn(true);
  }

  React.useEffect(()=> {               //если меняется loggedIn
    if (loggedIn)                      // если true
      history.push('/movies');           // переходим
  },[loggedIn]);

  React.useEffect(()=> {               //при монтировании app
    tokenCheck();                      // проверяем токен
  },[]);

  function closePopup() {
    setInfoTooltipOpened(false);
  }

  function handleRegisterUser(name, email, password){
    setIsLoading(true);
    mainApi.register(name, email, password)                //регистрируемся
    .then((res)=> {
      handleAuthoriseUser(email, password);
    })
    .catch((err) => {
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
      tokenCheck();
    })
    .catch((err) => {
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
      Promise.all([mainApi.getContent(jwt), mainApi.getUserMovies(jwt)])                           // проверка токена и переход в Main
      .then(([ userInfo, movies ]) => {
        if (userInfo){
          setCurrentUser(userInfo);
          setUserMovies(movies);
          console.log('tokenCheck');
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsError(true);
        setInfoTooltipOpened(true);
      })
      .finally(()=> {
        setIsLoading(false);
      });
    }
  }

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    history.push('/');
  };

  function handleUpdateUser(name, email) {
    mainApi.setUserInfo(name, email)
      .then(data => {
        setCurrentUser(data);
        setError("Обновление прошло успешно!");
        setIsError(false);
        setInfoTooltipOpened(true);
      })
      .catch((err) => {
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
                MoviesList={savedMoviesList}
                isLoading={isLoading}
              />
              <ProtectedRoute
                path='/saved-movies'
                loggedIn={loggedIn}
                component={SavedMovies}
                SavedMoviesPage={true}
                SavedMoviesList={savedMoviesList}
                isLoading={isLoading}
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
