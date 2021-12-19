/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var victory_pie__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! victory-pie */ "./node_modules/victory-pie/es/victory-pie.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url-search-params */ "./node_modules/url-search-params/build/url-search-params.node.js");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Header_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Header.jsx */ "./src/Header.jsx");









const PLACES = [{
  name: 'Митино Парк',
  latlng: [55.84, 37.37]
}, {
  name: 'Мещерский Парк',
  latlng: [55.66, 37.40]
}, {
  name: 'Стадион Зоркий',
  latlng: [55.84, 37.32]
}, {
  name: 'Одинцово',
  latlng: [55.69, 37.25]
}];

function isNear(latlng, place, radius = 0.04) {
  let dist = Math.sqrt(Math.pow(latlng[0] - place.latlng[0], 2) + Math.pow(latlng[1] - place.latlng[1], 2));
  return dist < radius;
}

function Unauthorized({
  setAuthData
}) {
  //Отображается на стартовой странице если клиент не авторизован в страва
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "unauth"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "This is Unauthorized"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u0412\u044B \u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B. \u041F\u0440\u0438 \u043D\u0430\u0436\u0430\u0442\u0438\u0438 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u0432\u044B \u043F\u0435\u0440\u0435\u0439\u0434\u0451\u0442\u0435 \u043D\u0430 \u0441\u0430\u0439\u0442 Strava \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: () => {
      setAuthData({
        status: "processing"
      });
      authAtStrava();
    }
  }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0432 Strava"));
}

function Authorization({
  authData,
  handleData
}) {
  //Сюда приходит переадресация со стравы и здесь мы получаем токены и обозначаем авторизацию
  let location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();

  if (authData.status == "authorized") {
    navigate('/');
  }

  let params = new (url_search_params__WEBPACK_IMPORTED_MODULE_2___default())(location.search);
  let clientCode = params.get("code"); // выделили код присланный Стравой из адреса

  const data = {
    code: clientCode
  };

  async function fetchAuthInfo() {
    if (authData.status !== "authorized") {
      fetch('/api/gettokenfromcode', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then(res => {
        console.log('fetchAuthInfo: response: ', res);
        localStorage.setItem("StravaAuthInfo", JSON.stringify(res));
        handleData({
          status: "unauthorized",
          stravaAuthInfo: res
        }); //Чтобы избежать ререндеринга Роутера пока статус оставляем unauth, обработаем в App

        navigate('/');
      }).catch(err => console.log(err));
    } else {//navigate('/');
    }
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => fetchAuthInfo(), []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "This is Authorization"));
}

function ActivityForm({
  handleFormSubmit
}) {
  const [before, setBefore] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('2021-10-20'); //{activityBefore, activityAfter}

  const [after, setAfter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('2021-10-20');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let date = new Date();
    let date1 = new Date(Date.now() - 6700000000);
    setBefore(date.toISOString().split('T')[0]);
    setAfter(date1.toISOString().split('T')[0]);
  }, []);

  function handleEndDate(e) {
    setBefore(e.target.value);
  }

  function handleStartDate(e) {
    setAfter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let dateBefore = (Date.parse(before) / 1000).toString();
    let dateAfter = (Date.parse(after) / 1000).toString();
    let formData = {
      before: dateBefore,
      after: dateAfter
    };
    handleFormSubmit(formData); //console.log(`Получим данные между ${dateBefore} и ${dateAfter}`);
    //console.log('formData: ', formData);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    className: "activity-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("legend", null, "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "date",
    id: "start",
    name: "activity-after",
    value: after,
    onChange: handleStartDate,
    min: "2018-01-01"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("legend", null, "\u0414\u0430\u0442\u0430 \u043A\u043E\u043D\u0446\u0430"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "date",
    id: "end",
    name: "activity-before",
    value: before,
    onChange: handleEndDate,
    min: "2018-01-01"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    onClick: handleSubmit
  }, "\u041D\u0430\u0439\u0442\u0438"));
}

function ShowResults({
  resultList
} = []) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u041D\u0430\u0439\u0434\u0435\u043D\u043E: ", resultList.length, " "), resultList.map((res, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "result-list",
    key: i
  }, res.start_date.split('T')[0], " - ", res.name, " - ", res.stravavisualPlace, " - ", res.start_latlng[0], ", ", res.start_latlng[1])));
}

function ShowAggregatedResults({
  activitiesList
}) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  function aggregateResultsPlaceDistance(data = []) {
    //Аггрегирует активности по местам и соответствующим дистанциям, на выходе объект
    let placedistobj = {};
    data.forEach(el => {
      if (placedistobj[el.stravavisualPlace] == undefined) placedistobj[el.stravavisualPlace] = 0;
      placedistobj[el.stravavisualPlace] += Number(el.distance);
    });
    return placedistobj;
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let aggrobject = aggregateResultsPlaceDistance(activitiesList);
    console.log('actList: ', activitiesList);
    console.log('aggr: ', aggrobject);
    let diaData = Object.keys(aggrobject).map(key => {
      return {
        x: key,
        y: aggrobject[key]
      };
    });
    setState(diaData);
    console.log('diaData: ', diaData);
  }, [activitiesList]); // const myData = [
  //     { x: "Group A", y: 900 },
  //     { x: "Group B", y: 400 },
  //     { x: "Group C", y: 300 },
  //   ];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, state.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0440\u0430\u0436\u0430 \u043F\u043E \u043C\u0435\u0441\u0442\u0443") : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(victory_pie__WEBPACK_IMPORTED_MODULE_8__["default"], {
    data: state,
    colorScale: ["BurlyWood", "LightSkyBlue", "LightCoral", "LightPink", "Teal"],
    radius: 100
  }));
}

function Page({
  authData
}) {
  const [queryParams, setQueryParams] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    before: '1639833642',
    after: '1633046400'
  });
  const [activities, setActivities] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  async function handleFormSubmit(params) {
    setQueryParams(params);
    let per_page = 30;
    let page = 1;
    let result = [];
    let resultChunk = [];

    do {
      let addParams = {
        per_page: per_page.toString(),
        page: page.toString()
      };
      params = { ...params,
        ...addParams
      }; //console.log(params);

      resultChunk = await getActivitiesFromStrava(params);
      result = [...result, ...resultChunk];
      page += 1;
    } while (resultChunk.length == per_page);

    result.forEach(res => {
      let place = PLACES.find(place => isNear(res.start_latlng, place));

      if (place) {
        res.stravavisualPlace = place.name;
      } else {
        res.stravavisualPlace = 'Неизвестно';
      }
    });
    setActivities(result);
  }

  let authInfo = authData.stravaAuthInfo;

  async function getActivitiesFromStrava(params) {
    //присоединяем параметры запроса к основному адресу ресурса
    let url = new URL('https://www.strava.com/api/v3/athlete/activities'); //let params = queryParams;

    url.search = new (url_search_params__WEBPACK_IMPORTED_MODULE_2___default())(params).toString();
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authInfo.access_token}`
      }
    });
    let result = await data.json(); //console.log(result);

    return result;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ActivityForm, {
    handleFormSubmit: handleFormSubmit
  }), activities ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ShowAggregatedResults, {
    activitiesList: activities
  }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ShowResults, {
    resultList: activities
  }));
}

function Mainpage({
  authData,
  setAuthData,
  startRedirect
}) {
  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (startRedirect) navigate("redirect");
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, authData.status == "unauthorized" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Unauthorized, {
    setAuthData: setAuthData
  }) : null, authData.status == "authorized" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Page, {
    authData: authData
  }) : null);
}

function RedirectTarget({
  disableRedirect
}) {
  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: () => {
      disableRedirect();
      navigate('/');
    }
  }, "disableRedirect ");
}

function App() {
  const [authData, setAuthData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    status: "unauthorized",
    stravaAuthInfo: {}
  }); //["unauthorized", "authorized", "processing"]

  const [startRedirect, setStartRedirect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  function disableRedirect() {
    setStartRedirect(false);
  }

  ;

  function signOut() {
    localStorage.removeItem("StravaAuthInfo"); //setAuthData({status: "unauthorized", stravaAuthInfo: {}});
  }

  function isTokenExpired(tokenExpiresAt) {
    if (new Date(tokenExpiresAt * 1000) - Date.now() < 0) {
      return true;
    } else return false;
  }

  async function refreshToken(token) {
    let data = {
      refresh_token: token
    };
    let response = await fetch('/api/refreshtoken', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    let result = await response.json(); //console.log('refreshToken: response: ', result);

    return result;
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    //Проверяем, появились ли данные в stravaAuthInfo
    //console.log('Проверяю наличие данных в СтраваИнфо');
    if (authData.stravaAuthInfo == undefined) {
      return;
    } else if (Object.keys(authData.stravaAuthInfo).length !== 0 && authData.status !== "authorized") {
      let obj = { ...authData,
        status: "authorized"
      };
      setAuthData(obj);
    }
  }, [authData]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    //console.log('App. Извлекаем данные из локального хранилища.')
    let object = JSON.parse(localStorage.getItem("StravaAuthInfo"));

    if (object == null) {//    console.log('В хранилище данных нет.');
    } else if (Object.keys(object).length == 0) {//    console.log('В хранилище данных нет.');
    } else {
      console.log('Данные получены: ', object);
      console.log('Токен просрочен: ', isTokenExpired(object.expires_at));

      if (isTokenExpired(object.expires_at)) {
        console.log("Обновляю токен, refresh_token: ", object.refresh_token);
        refreshToken(object.refresh_token).then(newData => {
          console.log('Получены данные с сервера: ', newData);
          let newObject = { ...object,
            ...newData
          };
          console.log('Обновлённый объект данных: ', newObject);
          setAuthData({
            status: "authorized",
            stravaAuthInfo: newObject
          });
          localStorage.setItem("StravaAuthInfo", JSON.stringify(newObject));
        });
      } else {
        setAuthData({
          status: "authorized",
          stravaAuthInfo: object
        });
      }
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Header_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    authData: authData,
    signOut: signOut,
    signIn: authAtStrava
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Mainpage, {
      authData: authData,
      setAuthData: setAuthData,
      startRedirect: startRedirect
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "auth",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Authorization, {
      authData: authData,
      handleData: setAuthData
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "map",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Map, null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Route, {
    path: "redirect",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RedirectTarget, {
      disableRedirect: disableRedirect
    })
  }))));
}

const Map = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0443\u0442 \u043A\u0430\u0440\u0442\u044B");
};

function authAtStrava() {
  // https://stravavusual.herokuapp.com/
  // const firstAuthLink = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavusual.herokuapp.com/report&approval_prompt=force&scope=activity:read"
  // const firstAuthLink = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/report&approval_prompt=force&scope=activity:read"
  document.location.href = (_constants__WEBPACK_IMPORTED_MODULE_5___default());
}

react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(App, null), document.getElementById('root'));

/***/ }),

/***/ "./src/Header.jsx":
/*!************************!*\
  !*** ./src/Header.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");


function Header({
  authData,
  signOut,
  signIn
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header", {
    className: "header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header_body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(HeaderAuthInfo, {
    authData: authData,
    signOut: signOut,
    signIn: signIn
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Nav, null))));
}

const Avatar = ({
  link
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header_avatar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: link || null
  }));
};

const UserName = ({
  firstname,
  lastname
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "header_username"
  }, firstname || '', " ", lastname || '');
};

function HeaderAuthInfo({
  authData,
  signOut,
  signIn
}) {
  let authInfo = authData.stravaAuthInfo;
  let displayUserInfo = authData.status == "authorized";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header_userinfo"
  }, displayUserInfo ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Avatar, {
    link: authInfo.athlete.profile
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(UserName, {
    firstname: authInfo.athlete.firstname,
    lastname: authInfo.athlete.lastname
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: signOut
  }, "\u0412\u044B\u0439\u0442\u0438")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: signIn
  }, "\u0412\u043E\u0439\u0442\u0438"));
}

const Nav = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("nav", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "/"
  }, "Home"), "|", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "map"
  }, "\u041C\u0435\u0441\u0442\u0430"));
};

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((module) => {

const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavusual.herokuapp.com/auth&approval_prompt=force&scope=activity:read"; // const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";

module.exports = STRAVA_GET_CODE_LINK;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n    --header-bg-color: #5e5373;\r\n    --button-color: orange;\r\n    --main-bg-color: #13b5ca;\r\n    --header-link: white;\r\n    --main-text: #555;\r\n}\r\nbody {\r\n    display: flex;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-family: 'Nanum Gothic', sans-serif;\r\n    background-color: #eeebf0;\r\n    color: var(--main-text);\r\n}\r\n\r\n#wrapper {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    box-sizing: border-box;\r\n    font-family: 'Nanum Gothic', sans-serif\r\n}\r\n\r\n.container {\r\n    max-width: 800px;\r\n    margin: 0px auto;\r\n    padding: 0px 10px;\r\n}\r\n\r\n#root {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    padding: 100px 10px 10px 10px;\r\n}\r\n.unauth {\r\n    text-align: center;\r\n    margin: 20px;\r\n}\r\n\r\nbutton {\r\n    background-color: orange;\r\n    color: white;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    margin: 10px;\r\n    border-radius: 10px;\r\n}\r\n\r\n.header {\r\n    position: fixed;\r\n    width: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 50;\r\n    color: white;\r\n}\r\n\r\n.header:before{\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: var(--header-bg-color);\r\n}\r\n.header_body {\r\n    position: relative;\r\n    z-index: 2;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    height: 80px;\r\n    align-items: center;\r\n}\r\n\r\n.header a {\r\n    color: var(--header-link);\r\n    padding: 10px;\r\n}\r\n.header button {\r\n    font-size: .8em;\r\n    padding: 8px;\r\n}\r\n\r\n.header_userinfo {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n.header_avatar {\r\n    flex: 0 0 60px;\r\n    margin-right: 10px;\r\n    border-radius: 50%;\r\n    overflow: hidden;\r\n}\r\n.header_avatar img {\r\n    max-width: 100%;\r\n    display: block;\r\n}\r\n\r\n.activity-form input {\r\n    padding: 8px;\r\n    border: 1px solid var(--main-text);\r\n    border-radius: 5px;\r\n}\r\n.activity-form fieldtext {\r\n    color: var(--main-text);\r\n}\r\n.activity-form legend {\r\n    padding: 5px;\r\n}\r\n.activity-form fieldset {\r\n    width: 100%;\r\n}\r\n\r\n.result-list {\r\n    font-size: 1em;\r\n    line-height: 1em;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,0BAA0B;IAC1B,sBAAsB;IACtB,wBAAwB;IACxB,oBAAoB;IACpB,iBAAiB;AACrB;AACA;IACI,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,uCAAuC;IACvC,yBAAyB;IACzB,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,WAAW;IACX,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB;AACJ;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,WAAW;IACX,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,6BAA6B;AACjC;AACA;IACI,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,wBAAwB;IACxB,YAAY;IACZ,cAAc;IACd,aAAa;IACb,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,WAAW;IACX,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,wCAAwC;AAC5C;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,yBAAyB;IACzB,aAAa;AACjB;AACA;IACI,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;AACA;IACI,cAAc;IACd,kBAAkB;IAClB,kBAAkB;IAClB,gBAAgB;AACpB;AACA;IACI,eAAe;IACf,cAAc;AAClB;;AAEA;IACI,YAAY;IACZ,kCAAkC;IAClC,kBAAkB;AACtB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,YAAY;AAChB;AACA;IACI,WAAW;AACf;;AAEA;IACI,cAAc;IACd,gBAAgB;AACpB","sourcesContent":[":root {\r\n    --header-bg-color: #5e5373;\r\n    --button-color: orange;\r\n    --main-bg-color: #13b5ca;\r\n    --header-link: white;\r\n    --main-text: #555;\r\n}\r\nbody {\r\n    display: flex;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-family: 'Nanum Gothic', sans-serif;\r\n    background-color: #eeebf0;\r\n    color: var(--main-text);\r\n}\r\n\r\n#wrapper {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    box-sizing: border-box;\r\n    font-family: 'Nanum Gothic', sans-serif\r\n}\r\n\r\n.container {\r\n    max-width: 800px;\r\n    margin: 0px auto;\r\n    padding: 0px 10px;\r\n}\r\n\r\n#root {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    padding: 100px 10px 10px 10px;\r\n}\r\n.unauth {\r\n    text-align: center;\r\n    margin: 20px;\r\n}\r\n\r\nbutton {\r\n    background-color: orange;\r\n    color: white;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    margin: 10px;\r\n    border-radius: 10px;\r\n}\r\n\r\n.header {\r\n    position: fixed;\r\n    width: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 50;\r\n    color: white;\r\n}\r\n\r\n.header:before{\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: var(--header-bg-color);\r\n}\r\n.header_body {\r\n    position: relative;\r\n    z-index: 2;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    height: 80px;\r\n    align-items: center;\r\n}\r\n\r\n.header a {\r\n    color: var(--header-link);\r\n    padding: 10px;\r\n}\r\n.header button {\r\n    font-size: .8em;\r\n    padding: 8px;\r\n}\r\n\r\n.header_userinfo {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n.header_avatar {\r\n    flex: 0 0 60px;\r\n    margin-right: 10px;\r\n    border-radius: 50%;\r\n    overflow: hidden;\r\n}\r\n.header_avatar img {\r\n    max-width: 100%;\r\n    display: block;\r\n}\r\n\r\n.activity-form input {\r\n    padding: 8px;\r\n    border: 1px solid var(--main-text);\r\n    border-radius: 5px;\r\n}\r\n.activity-form fieldtext {\r\n    color: var(--main-text);\r\n}\r\n.activity-form legend {\r\n    padding: 5px;\r\n}\r\n.activity-form fieldset {\r\n    width: 100%;\r\n}\r\n\r\n.result-list {\r\n    font-size: 1em;\r\n    line-height: 1em;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkstravavisual"] = self["webpackChunkstravavisual"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/App.jsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvQXBwLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvSGVhZGVyLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgVmljdG9yeVBpZSB9IGZyb20gXCJ2aWN0b3J5LXBpZVwiO1xyXG5pbXBvcnQgeyBMaW5rLCBSb3V0ZXMsIFJvdXRlLCBCcm93c2VyUm91dGVyLCB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICd1cmwtc2VhcmNoLXBhcmFtcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBTVFJBVkFfR0VUX0NPREVfTElOSyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyLmpzeCc7XHJcblxyXG5cclxuY29uc3QgUExBQ0VTID0gW1xyXG4gICAge25hbWU6ICfQnNC40YLQuNC90L4g0J/QsNGA0LonLCBsYXRsbmc6IFs1NS44NCwgMzcuMzddfSxcclxuICAgIHtuYW1lOiAn0JzQtdGJ0LXRgNGB0LrQuNC5INCf0LDRgNC6JywgbGF0bG5nOiBbNTUuNjYsIDM3LjQwXX0sXHJcbiAgICB7bmFtZTogJ9Ch0YLQsNC00LjQvtC9INCX0L7RgNC60LjQuScsIGxhdGxuZzogWzU1Ljg0LCAzNy4zMl19LFxyXG4gICAge25hbWU6ICfQntC00LjQvdGG0L7QstC+JywgbGF0bG5nOiBbNTUuNjksIDM3LjI1XX0sXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGlzTmVhcihsYXRsbmcsIHBsYWNlLCByYWRpdXM9MC4wNCkge1xyXG4gICAgbGV0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3cobGF0bG5nWzBdLXBsYWNlLmxhdGxuZ1swXSwgMikgKyBNYXRoLnBvdyhsYXRsbmdbMV0tcGxhY2UubGF0bG5nWzFdLCAyKSk7XHJcbiAgICByZXR1cm4gKGRpc3QgPCByYWRpdXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBVbmF1dGhvcml6ZWQoe3NldEF1dGhEYXRhfSkge1xyXG4gICAgLy/QntGC0L7QsdGA0LDQttCw0LXRgtGB0Y8g0L3QsCDRgdGC0LDRgNGC0L7QstC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQtdGB0LvQuCDQutC70LjQtdC90YIg0L3QtSDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9INCyINGB0YLRgNCw0LLQsFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1bmF1dGgnPlxyXG4gICAgICAgICAgICA8ZGl2PlRoaXMgaXMgVW5hdXRob3JpemVkPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+0JLRiyDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3Riy4g0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDINCy0Ysg0L/QtdGA0LXQudC00ZHRgtC1INC90LAg0YHQsNC50YIgU3RyYXZhINC00LvRjyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LjwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldEF1dGhEYXRhKHtzdGF0dXM6IFwicHJvY2Vzc2luZ1wifSk7XHJcbiAgICAgICAgICAgICAgICBhdXRoQXRTdHJhdmEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfT7QkNCy0YLQvtGA0LjQt9C+0LLQsNGC0YzRgdGPINCyIFN0cmF2YTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBdXRob3JpemF0aW9uKHsgYXV0aERhdGEsIGhhbmRsZURhdGEgfSkge1xyXG4gICAgLy/QodGO0LTQsCDQv9GA0LjRhdC+0LTQuNGCINC/0LXRgNC10LDQtNGA0LXRgdCw0YbQuNGPINGB0L4g0YHRgtGA0LDQstGLINC4INC30LTQtdGB0Ywg0LzRiyDQv9C+0LvRg9GH0LDQtdC8INGC0L7QutC10L3RiyDQuCDQvtCx0L7Qt9C90LDRh9Cw0LXQvCDQsNCy0YLQvtGA0LjQt9Cw0YbQuNGOXHJcbiAgICBsZXQgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xyXG4gICAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICAgIGlmIChhdXRoRGF0YS5zdGF0dXMgPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICBuYXZpZ2F0ZSgnLycpO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGxldCBjbGllbnRDb2RlID0gcGFyYW1zLmdldChcImNvZGVcIik7IC8vINCy0YvQtNC10LvQuNC70Lgg0LrQvtC0INC/0YDQuNGB0LvQsNC90L3Ri9C5INCh0YLRgNCw0LLQvtC5INC40Lcg0LDQtNGA0LXRgdCwXHJcbiAgICBjb25zdCBkYXRhID0ge2NvZGU6IGNsaWVudENvZGV9O1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoQXV0aEluZm8oKSB7XHJcbiAgICAgICAgaWYgKGF1dGhEYXRhLnN0YXR1cyAhPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvYXBpL2dldHRva2VuZnJvbWNvZGUnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2hBdXRoSW5mbzogcmVzcG9uc2U6ICcsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gKFwiU3RyYXZhQXV0aEluZm9cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRGF0YSh7c3RhdHVzOiBcInVuYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzogcmVzfSk7IC8v0KfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINGA0LXRgNC10L3QtNC10YDQuNC90LPQsCDQoNC+0YPRgtC10YDQsCDQv9C+0LrQsCDRgdGC0LDRgtGD0YEg0L7RgdGC0LDQstC70Y/QtdC8IHVuYXV0aCwg0L7QsdGA0LDQsdC+0YLQsNC10Lwg0LIgQXBwXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoJy8nKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSgnLycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IGZldGNoQXV0aEluZm8oKSwgW10pO1xyXG4gIFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMT5UaGlzIGlzIEF1dGhvcml6YXRpb248L2gxPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBY3Rpdml0eUZvcm0oe2hhbmRsZUZvcm1TdWJtaXR9KSB7XHJcbiAgICBjb25zdCBbYmVmb3JlLCBzZXRCZWZvcmVdID0gdXNlU3RhdGUoJzIwMjEtMTAtMjAnKTsgLy97YWN0aXZpdHlCZWZvcmUsIGFjdGl2aXR5QWZ0ZXJ9XHJcbiAgICBjb25zdCBbYWZ0ZXIsIHNldEFmdGVyXSA9IHVzZVN0YXRlKCcyMDIxLTEwLTIwJyk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGUxID0gIG5ldyBEYXRlKCBEYXRlLm5vdygpIC0gNjcwMDAwMDAwMCApO1xyXG4gICAgICAgIHNldEJlZm9yZShkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSk7XHJcbiAgICAgICAgc2V0QWZ0ZXIoZGF0ZTEudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdKTtcclxuXHJcbiAgICB9LFtdKVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVuZERhdGUoZSkge1xyXG4gICAgICAgIHNldEJlZm9yZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RhcnREYXRlKGUpIHtcclxuICAgICAgICBzZXRBZnRlcihlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IGRhdGVCZWZvcmUgPSAoRGF0ZS5wYXJzZShiZWZvcmUpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZGF0ZUFmdGVyID0gKERhdGUucGFyc2UoYWZ0ZXIpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZm9ybURhdGEgPSB7XHJcbiAgICAgICAgICAgIGJlZm9yZTogZGF0ZUJlZm9yZSxcclxuICAgICAgICAgICAgYWZ0ZXI6IGRhdGVBZnRlclxyXG4gICAgICAgIH1cclxuICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGZvcm1EYXRhKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGDQn9C+0LvRg9GH0LjQvCDQtNCw0L3QvdGL0LUg0LzQtdC20LTRgyAke2RhdGVCZWZvcmV9INC4ICR7ZGF0ZUFmdGVyfWApO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Zvcm1EYXRhOiAnLCBmb3JtRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT0nYWN0aXZpdHktZm9ybSc+XHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsZWdlbmQ+0JTQsNGC0LAg0L3QsNGH0LDQu9CwPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cInN0YXJ0XCIgbmFtZT1cImFjdGl2aXR5LWFmdGVyXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWZ0ZXJ9IG9uQ2hhbmdlPXtoYW5kbGVTdGFydERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMjAxOC0wMS0wMVwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPtCU0LDRgtCwINC60L7QvdGG0LA8L2xlZ2VuZD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZW5kXCIgbmFtZT1cImFjdGl2aXR5LWJlZm9yZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2JlZm9yZX0gb25DaGFuZ2U9e2hhbmRsZUVuZERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMjAxOC0wMS0wMVwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0+0J3QsNC50YLQuDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNob3dSZXN1bHRzKHtyZXN1bHRMaXN0fSA9IFtdKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXY+0J3QsNC50LTQtdC90L46IHtyZXN1bHRMaXN0Lmxlbmd0aH0gPC9kaXY+XHJcbiAgICAgICAgICAgIHtyZXN1bHRMaXN0Lm1hcCgocmVzLCBpKSA9PiBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0LWxpc3RcIiBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtyZXMuc3RhcnRfZGF0ZS5zcGxpdCgnVCcpWzBdfSAtIHtyZXMubmFtZX0gLSB7cmVzLnN0cmF2YXZpc3VhbFBsYWNlfSAtIHtyZXMuc3RhcnRfbGF0bG5nWzBdfSwge3Jlcy5zdGFydF9sYXRsbmdbMV19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBTaG93QWdncmVnYXRlZFJlc3VsdHMoe2FjdGl2aXRpZXNMaXN0fSkge1xyXG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBmdW5jdGlvbiBhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZShkYXRhID0gW10pIHtcclxuICAgICAgICAvL9CQ0LPQs9GA0LXQs9C40YDRg9C10YIg0LDQutGC0LjQstC90L7RgdGC0Lgg0L/QviDQvNC10YHRgtCw0Lwg0Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC8INC00LjRgdGC0LDQvdGG0LjRj9C8LCDQvdCwINCy0YvRhdC+0LTQtSDQvtCx0YrQtdC60YJcclxuICAgICAgICBsZXQgcGxhY2VkaXN0b2JqID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgaWYgKHBsYWNlZGlzdG9ialtlbC5zdHJhdmF2aXN1YWxQbGFjZV0gPT0gdW5kZWZpbmVkKSBwbGFjZWRpc3RvYmpbZWwuc3RyYXZhdmlzdWFsUGxhY2VdID0gMDtcclxuICAgICAgICAgICAgcGxhY2VkaXN0b2JqW2VsLnN0cmF2YXZpc3VhbFBsYWNlXSArPSBOdW1iZXIoZWwuZGlzdGFuY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxhY2VkaXN0b2JqO1xyXG4gICAgfVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgYWdncm9iamVjdCA9IGFnZ3JlZ2F0ZVJlc3VsdHNQbGFjZURpc3RhbmNlKGFjdGl2aXRpZXNMaXN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWN0TGlzdDogJywgYWN0aXZpdGllc0xpc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZ2dyOiAnLCBhZ2dyb2JqZWN0KTtcclxuICAgICAgICBsZXQgZGlhRGF0YSA9IE9iamVjdC5rZXlzKGFnZ3JvYmplY3QpLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICByZXR1cm4ge3g6IGtleSwgeTogYWdncm9iamVjdFtrZXldfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRTdGF0ZShkaWFEYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGlhRGF0YTogJywgZGlhRGF0YSk7XHJcbiAgICB9LCBbYWN0aXZpdGllc0xpc3RdKTtcclxuXHJcbiAgICAvLyBjb25zdCBteURhdGEgPSBbXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEFcIiwgeTogOTAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEJcIiwgeTogNDAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIENcIiwgeTogMzAwIH0sXHJcbiAgICAvLyAgIF07XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtzdGF0ZS5sZW5ndGggPyA8aDE+0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0LrQuNC70L7QvNC10YLRgNCw0LbQsCDQv9C+INC80LXRgdGC0YM8L2gxPiA6IG51bGwgfVxyXG4gICAgICAgICAgICA8VmljdG9yeVBpZVxyXG4gICAgICAgICAgICAgICAgZGF0YT17c3RhdGV9XHJcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlPXtbXCJCdXJseVdvb2RcIiwgXCJMaWdodFNreUJsdWVcIiwgXCJMaWdodENvcmFsXCIsIFwiTGlnaHRQaW5rXCIsIFwiVGVhbFwiXX1cclxuICAgICAgICAgICAgICAgIHJhZGl1cz17MTAwfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBQYWdlKHsgYXV0aERhdGEgfSkgeyBcclxuICAgIGNvbnN0IFtxdWVyeVBhcmFtcywgc2V0UXVlcnlQYXJhbXNdID0gdXNlU3RhdGUoe2JlZm9yZTogJzE2Mzk4MzM2NDInLCBhZnRlcjogJzE2MzMwNDY0MDAnfSlcclxuICAgIGNvbnN0IFthY3Rpdml0aWVzLCBzZXRBY3Rpdml0aWVzXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGb3JtU3VibWl0KHBhcmFtcykge1xyXG4gICAgICAgIHNldFF1ZXJ5UGFyYW1zKHBhcmFtcyk7XHJcbiAgICAgICAgbGV0IHBlcl9wYWdlID0gMzA7IFxyXG4gICAgICAgIGxldCBwYWdlID0gMTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHJlc3VsdENodW5rID0gW107XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBsZXQgYWRkUGFyYW1zID0ge3Blcl9wYWdlOiBwZXJfcGFnZS50b1N0cmluZygpLCBwYWdlOiBwYWdlLnRvU3RyaW5nKCl9O1xyXG4gICAgICAgICAgICBwYXJhbXMgPSB7Li4ucGFyYW1zLCAuLi5hZGRQYXJhbXN9O1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJlc3VsdENodW5rID0gYXdhaXQgZ2V0QWN0aXZpdGllc0Zyb21TdHJhdmEocGFyYW1zKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gWy4uLnJlc3VsdCwgLi4ucmVzdWx0Q2h1bmtdO1xyXG4gICAgICAgICAgICBwYWdlICs9IDE7XHJcbiAgICAgICAgfSB3aGlsZSAoXHJcbiAgICAgICAgICAgIHJlc3VsdENodW5rLmxlbmd0aCA9PSBwZXJfcGFnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2gocmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IHBsYWNlID0gUExBQ0VTLmZpbmQocGxhY2UgPT4gaXNOZWFyKHJlcy5zdGFydF9sYXRsbmcsIHBsYWNlKSk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0cmF2YXZpc3VhbFBsYWNlID0gcGxhY2UubmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdHJhdmF2aXN1YWxQbGFjZSA9ICfQndC10LjQt9Cy0LXRgdGC0L3Qvic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0QWN0aXZpdGllcyhyZXN1bHQpO1xyXG4gIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgbGV0IGF1dGhJbmZvID0gYXV0aERhdGEuc3RyYXZhQXV0aEluZm87XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0QWN0aXZpdGllc0Zyb21TdHJhdmEocGFyYW1zKSB7XHJcbiAgICAgICAgLy/Qv9GA0LjRgdC+0LXQtNC40L3Rj9C10Lwg0L/QsNGA0LDQvNC10YLRgNGLINC30LDQv9GA0L7RgdCwINC6INC+0YHQvdC+0LLQvdC+0LzRgyDQsNC00YDQtdGB0YMg0YDQtdGB0YPRgNGB0LBcclxuICAgICAgICBsZXQgdXJsID0gbmV3IFVSTCgnaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9hcGkvdjMvYXRobGV0ZS9hY3Rpdml0aWVzJyk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gcXVlcnlQYXJhbXM7XHJcbiAgICAgICAgdXJsLnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zKS50b1N0cmluZygpO1xyXG4gXHJcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh1cmwsIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YXV0aEluZm8uYWNjZXNzX3Rva2VufWAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZGF0YS5qc29uKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxBY3Rpdml0eUZvcm0gaGFuZGxlRm9ybVN1Ym1pdD17aGFuZGxlRm9ybVN1Ym1pdH0vPlxyXG4gICAgICAgICAgICB7YWN0aXZpdGllcyA/IDxTaG93QWdncmVnYXRlZFJlc3VsdHMgYWN0aXZpdGllc0xpc3Q9e2FjdGl2aXRpZXN9Lz4gOiBudWxsfVxyXG4gICAgICAgICAgICA8U2hvd1Jlc3VsdHMgcmVzdWx0TGlzdD17YWN0aXZpdGllc30gLz5cclxuICAgICAgICAgICAgey8qIDxidXR0b24gb25DbGljaz17Z2V0QWN0aXZpdGllc0Zyb21TdHJhdmF9PtC/0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1PC9idXR0b24+ICovfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gTWFpbnBhZ2UoeyBhdXRoRGF0YSwgc2V0QXV0aERhdGEsIHN0YXJ0UmVkaXJlY3QgfSkge1xyXG4gICAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge2lmIChzdGFydFJlZGlyZWN0KSBuYXZpZ2F0ZShcInJlZGlyZWN0XCIpO30sIFtdKVxyXG4gICAgXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHthdXRoRGF0YS5zdGF0dXMgPT0gXCJ1bmF1dGhvcml6ZWRcIiA/IDxVbmF1dGhvcml6ZWQgc2V0QXV0aERhdGE9e3NldEF1dGhEYXRhfSAvPiA6IG51bGx9XHJcbiAgICAgICAgICAgIHthdXRoRGF0YS5zdGF0dXMgPT0gXCJhdXRob3JpemVkXCIgPyA8UGFnZSBhdXRoRGF0YT17YXV0aERhdGF9IC8+IDogbnVsbH1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlZGlyZWN0VGFyZ2V0KHtkaXNhYmxlUmVkaXJlY3R9KSB7XHJcbiAgICBsZXQgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4ge2Rpc2FibGVSZWRpcmVjdCgpOyBuYXZpZ2F0ZSgnLycpfX0+ZGlzYWJsZVJlZGlyZWN0IDwvYnV0dG9uPlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBcHAoKSB7XHJcbiAgICBjb25zdCBbYXV0aERhdGEsIHNldEF1dGhEYXRhXSA9IHVzZVN0YXRlKHtzdGF0dXM6IFwidW5hdXRob3JpemVkXCIsIHN0cmF2YUF1dGhJbmZvOiB7fX0pOyAvL1tcInVuYXV0aG9yaXplZFwiLCBcImF1dGhvcml6ZWRcIiwgXCJwcm9jZXNzaW5nXCJdXHJcbiAgICBjb25zdCBbc3RhcnRSZWRpcmVjdCwgc2V0U3RhcnRSZWRpcmVjdF0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICAgIGZ1bmN0aW9uIGRpc2FibGVSZWRpcmVjdCgpIHtzZXRTdGFydFJlZGlyZWN0KGZhbHNlKX07XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnbk91dCgpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIlN0cmF2YUF1dGhJbmZvXCIpO1xyXG4gICAgICAgIC8vc2V0QXV0aERhdGEoe3N0YXR1czogXCJ1bmF1dGhvcml6ZWRcIiwgc3RyYXZhQXV0aEluZm86IHt9fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNUb2tlbkV4cGlyZWQodG9rZW5FeHBpcmVzQXQpIHtcclxuICAgICAgICBpZiAoKG5ldyBEYXRlKHRva2VuRXhwaXJlc0F0ICogMTAwMCkgLSBEYXRlLm5vdygpKSA8IDAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiByZWZyZXNoVG9rZW4odG9rZW4pIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHtyZWZyZXNoX3Rva2VuOiB0b2tlbn07XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvcmVmcmVzaHRva2VuJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdyZWZyZXNoVG9rZW46IHJlc3BvbnNlOiAnLCByZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIC8v0J/RgNC+0LLQtdGA0Y/QtdC8LCDQv9C+0Y/QstC40LvQuNGB0Ywg0LvQuCDQtNCw0L3QvdGL0LUg0LIgc3RyYXZhQXV0aEluZm9cclxuICAgICAgICAvL2NvbnNvbGUubG9nKCfQn9GA0L7QstC10YDRj9GOINC90LDQu9C40YfQuNC1INC00LDQvdC90YvRhSDQsiDQodGC0YDQsNCy0LDQmNC90YTQvicpO1xyXG4gICAgICAgIGlmIChhdXRoRGF0YS5zdHJhdmFBdXRoSW5mbyA9PSB1bmRlZmluZWQpIHtyZXR1cm59XHJcbiAgICAgICAgZWxzZSBpZiAoT2JqZWN0LmtleXMoYXV0aERhdGEuc3RyYXZhQXV0aEluZm8pLmxlbmd0aCAhPT0gMCAmJiBhdXRoRGF0YS5zdGF0dXMgIT09IFwiYXV0aG9yaXplZFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBvYmogPSB7Li4uYXV0aERhdGEsIHN0YXR1czogXCJhdXRob3JpemVkXCJ9O1xyXG4gICAgICAgICAgICBzZXRBdXRoRGF0YShvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFthdXRoRGF0YV0pO1xyXG5cclxuICAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ0FwcC4g0JjQt9Cy0LvQtdC60LDQtdC8INC00LDQvdC90YvQtSDQuNC3INC70L7QutCw0LvRjNC90L7Qs9C+INGF0YDQsNC90LjQu9C40YnQsC4nKVxyXG4gICAgICAgIGxldCBvYmplY3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtIChcIlN0cmF2YUF1dGhJbmZvXCIpKTtcclxuICAgICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZygn0JIg0YXRgNCw0L3QuNC70LjRidC1INC00LDQvdC90YvRhSDQvdC10YIuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChPYmplY3Qua2V5cyhvYmplY3QpLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZygn0JIg0YXRgNCw0L3QuNC70LjRidC1INC00LDQvdC90YvRhSDQvdC10YIuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ9CU0LDQvdC90YvQtSDQv9C+0LvRg9GH0LXQvdGLOiAnLCBvYmplY3QpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn0KLQvtC60LXQvSDQv9GA0L7RgdGA0L7Rh9C10L06ICcsIGlzVG9rZW5FeHBpcmVkKG9iamVjdC5leHBpcmVzX2F0KSk7XHJcbiAgICAgICAgICAgIGlmIChpc1Rva2VuRXhwaXJlZChvYmplY3QuZXhwaXJlc19hdCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7QsdC90L7QstC70Y/RjiDRgtC+0LrQtdC9LCByZWZyZXNoX3Rva2VuOiBcIiwgb2JqZWN0LnJlZnJlc2hfdG9rZW4pXHJcbiAgICAgICAgICAgICAgICByZWZyZXNoVG9rZW4ob2JqZWN0LnJlZnJlc2hfdG9rZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4obmV3RGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQn9C+0LvRg9GH0LXQvdGLINC00LDQvdC90YvQtSDRgSDRgdC10YDQstC10YDQsDogJywgbmV3RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdPYmplY3QgPSB7IC4uLm9iamVjdCwgLi4ubmV3RGF0YX07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQntCx0L3QvtCy0LvRkdC90L3Ri9C5INC+0LHRitC10LrRgiDQtNCw0L3QvdGL0YU6ICcsIG5ld09iamVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEF1dGhEYXRhKHtzdGF0dXM6IFwiYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzogbmV3T2JqZWN0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIChcIlN0cmF2YUF1dGhJbmZvXCIsIEpTT04uc3RyaW5naWZ5KG5ld09iamVjdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2V0QXV0aERhdGEoe3N0YXR1czogXCJhdXRob3JpemVkXCIsIHN0cmF2YUF1dGhJbmZvOiBvYmplY3R9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtdKVxyXG4gICBcclxuXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPEJyb3dzZXJSb3V0ZXI+XHJcbiAgICAgICAgICAgICAgICA8SGVhZGVyIGF1dGhEYXRhPXthdXRoRGF0YX0gc2lnbk91dD17c2lnbk91dH0gc2lnbkluPXthdXRoQXRTdHJhdmF9Lz5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZXM+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgZWxlbWVudD17PE1haW5wYWdlIGF1dGhEYXRhPXthdXRoRGF0YX0gc2V0QXV0aERhdGE9e3NldEF1dGhEYXRhfSBzdGFydFJlZGlyZWN0PXtzdGFydFJlZGlyZWN0fS8+IH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cImF1dGhcIiBlbGVtZW50PXs8QXV0aG9yaXphdGlvbiBhdXRoRGF0YT17YXV0aERhdGF9IGhhbmRsZURhdGE9e3NldEF1dGhEYXRhfSAvPn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIm1hcFwiIGVsZW1lbnQ9ezxNYXAgLz59IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJyZWRpcmVjdFwiIGVsZW1lbnQ9ezxSZWRpcmVjdFRhcmdldCBkaXNhYmxlUmVkaXJlY3Q9e2Rpc2FibGVSZWRpcmVjdH0gLz59IC8+XHJcbiAgICAgICAgICAgICAgICA8L1JvdXRlcz5cclxuICAgICAgICAgICAgPC9Ccm93c2VyUm91dGVyPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBNYXAgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gPGRpdj7Ql9C00LXRgdGMINCx0YPQtNGD0YIg0LrQsNGA0YLRizwvZGl2PlxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGF1dGhBdFN0cmF2YSgpIHtcclxuICAgIC8vIGh0dHBzOi8vc3RyYXZhdnVzdWFsLmhlcm9rdWFwcC5jb20vXHJcbiAgICAvLyBjb25zdCBmaXJzdEF1dGhMaW5rID0gXCJodHRwczovL3d3dy5zdHJhdmEuY29tL29hdXRoL2F1dGhvcml6ZT9jbGllbnRfaWQ9NzQ2NjgmcmVzcG9uc2VfdHlwZT1jb2RlJnJlZGlyZWN0X3VyaT1odHRwczovL3N0cmF2YXZ1c3VhbC5oZXJva3VhcHAuY29tL3JlcG9ydCZhcHByb3ZhbF9wcm9tcHQ9Zm9yY2Umc2NvcGU9YWN0aXZpdHk6cmVhZFwiXHJcbiAgICAvLyBjb25zdCBmaXJzdEF1dGhMaW5rID0gXCJodHRwczovL3d3dy5zdHJhdmEuY29tL29hdXRoL2F1dGhvcml6ZT9jbGllbnRfaWQ9NzQ2NjgmcmVzcG9uc2VfdHlwZT1jb2RlJnJlZGlyZWN0X3VyaT1odHRwOi8vbG9jYWxob3N0OjMwMDAvcmVwb3J0JmFwcHJvdmFsX3Byb21wdD1mb3JjZSZzY29wZT1hY3Rpdml0eTpyZWFkXCJcclxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBTVFJBVkFfR0VUX0NPREVfTElOSztcclxufVxyXG5cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpOyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVhZGVyKHsgYXV0aERhdGEsIHNpZ25PdXQsIHNpZ25JbiB9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl9ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEhlYWRlckF1dGhJbmZvIGF1dGhEYXRhPXthdXRoRGF0YX0gc2lnbk91dD17c2lnbk91dH0gc2lnbkluPXtzaWduSW59Lz4gXHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvaGVhZGVyPlxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBBdmF0YXIgPSAoe2xpbmt9KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2F2YXRhclwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz17bGluayB8fCBudWxsfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBVc2VyTmFtZSA9ICh7Zmlyc3RuYW1lLCBsYXN0bmFtZX0pID0+IHtcclxuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJoZWFkZXJfdXNlcm5hbWVcIj57Zmlyc3RuYW1lIHx8ICcnfSB7bGFzdG5hbWUgfHwgJyd9PC9zcGFuPlxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gSGVhZGVyQXV0aEluZm8oeyBhdXRoRGF0YSwgc2lnbk91dCwgc2lnbkluIH0pIHtcclxuICAgIGxldCBhdXRoSW5mbyA9IGF1dGhEYXRhLnN0cmF2YUF1dGhJbmZvO1xyXG4gICAgbGV0IGRpc3BsYXlVc2VySW5mbyA9IChhdXRoRGF0YS5zdGF0dXMgPT0gXCJhdXRob3JpemVkXCIpO1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX3VzZXJpbmZvXCI+XHJcbiAgICAgICAgICAgIHtkaXNwbGF5VXNlckluZm8gPyBcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgICAgPEF2YXRhciBsaW5rPXthdXRoSW5mby5hdGhsZXRlLnByb2ZpbGV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFVzZXJOYW1lIGZpcnN0bmFtZT17YXV0aEluZm8uYXRobGV0ZS5maXJzdG5hbWV9IGxhc3RuYW1lPXthdXRoSW5mby5hdGhsZXRlLmxhc3RuYW1lfSAvPiBcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3NpZ25PdXR9PtCS0YvQudGC0Lg8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICAgICAgOiA8YnV0dG9uIG9uQ2xpY2s9e3NpZ25Jbn0+0JLQvtC50YLQuDwvYnV0dG9uPn1cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IE5hdiA9ICgpID0+IHtcclxuICAgIHJldHVybihcclxuICAgICAgICA8bmF2PiAgIFxyXG4gICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+fHtcIiBcIn1cclxuICAgICAgICA8TGluayB0bz1cIm1hcFwiPtCc0LXRgdGC0LA8L0xpbms+IFxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgKVxyXG59XHJcbiIsImNvbnN0IFNUUkFWQV9HRVRfQ09ERV9MSU5LID0gXCJodHRwczovL3d3dy5zdHJhdmEuY29tL29hdXRoL2F1dGhvcml6ZT9jbGllbnRfaWQ9NzQ2NjgmcmVzcG9uc2VfdHlwZT1jb2RlJnJlZGlyZWN0X3VyaT1odHRwczovL3N0cmF2YXZ1c3VhbC5oZXJva3VhcHAuY29tL2F1dGgmYXBwcm92YWxfcHJvbXB0PWZvcmNlJnNjb3BlPWFjdGl2aXR5OnJlYWRcIjtcclxuLy8gY29uc3QgU1RSQVZBX0dFVF9DT0RFX0xJTksgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoJmFwcHJvdmFsX3Byb21wdD1mb3JjZSZzY29wZT1hY3Rpdml0eTpyZWFkXCI7XHJcbm1vZHVsZS5leHBvcnRzID0gU1RSQVZBX0dFVF9DT0RFX0xJTks7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxyXFxuICAgIC0taGVhZGVyLWJnLWNvbG9yOiAjNWU1MzczO1xcclxcbiAgICAtLWJ1dHRvbi1jb2xvcjogb3JhbmdlO1xcclxcbiAgICAtLW1haW4tYmctY29sb3I6ICMxM2I1Y2E7XFxyXFxuICAgIC0taGVhZGVyLWxpbms6IHdoaXRlO1xcclxcbiAgICAtLW1haW4tdGV4dDogIzU1NTtcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWY7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWViZjA7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1tYWluLXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4jd3JhcHBlciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOYW51bSBHb3RoaWMnLCBzYW5zLXNlcmlmXFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBtYXJnaW46IDBweCBhdXRvO1xcclxcbiAgICBwYWRkaW5nOiAwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3Jvb3Qge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDEwMHB4IDEwcHggMTBweCAxMHB4O1xcclxcbn1cXHJcXG4udW5hdXRoIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDIwcHg7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG4gICAgbWFyZ2luOiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIHtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB6LWluZGV4OiA1MDtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyOmJlZm9yZXtcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oZWFkZXItYmctY29sb3IpO1xcclxcbn1cXHJcXG4uaGVhZGVyX2JvZHkge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgaGVpZ2h0OiA4MHB4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIGEge1xcclxcbiAgICBjb2xvcjogdmFyKC0taGVhZGVyLWxpbmspO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbn1cXHJcXG4uaGVhZGVyIGJ1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogLjhlbTtcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyX3VzZXJpbmZvIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIge1xcclxcbiAgICBmbGV4OiAwIDAgNjBweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcbi5oZWFkZXJfYXZhdGFyIGltZyB7XFxyXFxuICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5hY3Rpdml0eS1mb3JtIGlucHV0IHtcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1tYWluLXRleHQpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGZpZWxkdGV4dCB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1tYWluLXRleHQpO1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBsZWdlbmQge1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGZpZWxkc2V0IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5yZXN1bHQtbGlzdCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBsaW5lLWhlaWdodDogMWVtO1xcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHVDQUF1QztJQUN2Qyx5QkFBeUI7SUFDekIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gICAgLS1oZWFkZXItYmctY29sb3I6ICM1ZTUzNzM7XFxyXFxuICAgIC0tYnV0dG9uLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIC0tbWFpbi1iZy1jb2xvcjogIzEzYjVjYTtcXHJcXG4gICAgLS1oZWFkZXItbGluazogd2hpdGU7XFxyXFxuICAgIC0tbWFpbi10ZXh0OiAjNTU1O1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWJmMDtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcblxcclxcbiN3cmFwcGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWZcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vdCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMTAwcHggMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcbi51bmF1dGgge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbjogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHotaW5kZXg6IDUwO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXI6YmVmb3Jle1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1iZy1jb2xvcik7XFxyXFxufVxcclxcbi5oZWFkZXJfYm9keSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBoZWlnaHQ6IDgwcHg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgYSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1oZWFkZXItbGluayk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcbi5oZWFkZXIgYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiAuOGVtO1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXJfdXNlcmluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciB7XFxyXFxuICAgIGZsZXg6IDAgMCA2MHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIgaW1nIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2aXR5LWZvcm0gaW5wdXQge1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLW1haW4tdGV4dCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGR0ZXh0IHtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGxlZ2VuZCB7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGRzZXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlc3VsdC1saXN0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYXBwXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzdHJhdmF2aXN1YWxcIl0gPSBzZWxmW1wid2VicGFja0NodW5rc3RyYXZhdmlzdWFsXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvQXBwLmpzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJSZWFjdERPTSIsIlZpY3RvcnlQaWUiLCJMaW5rIiwiUm91dGVzIiwiUm91dGUiLCJCcm93c2VyUm91dGVyIiwidXNlTG9jYXRpb24iLCJ1c2VOYXZpZ2F0ZSIsIlVSTFNlYXJjaFBhcmFtcyIsImF4aW9zIiwiU1RSQVZBX0dFVF9DT0RFX0xJTksiLCJIZWFkZXIiLCJQTEFDRVMiLCJuYW1lIiwibGF0bG5nIiwiaXNOZWFyIiwicGxhY2UiLCJyYWRpdXMiLCJkaXN0IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJVbmF1dGhvcml6ZWQiLCJzZXRBdXRoRGF0YSIsInN0YXR1cyIsImF1dGhBdFN0cmF2YSIsIkF1dGhvcml6YXRpb24iLCJhdXRoRGF0YSIsImhhbmRsZURhdGEiLCJsb2NhdGlvbiIsIm5hdmlnYXRlIiwicGFyYW1zIiwic2VhcmNoIiwiY2xpZW50Q29kZSIsImdldCIsImRhdGEiLCJjb2RlIiwiZmV0Y2hBdXRoSW5mbyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlcyIsImpzb24iLCJjb25zb2xlIiwibG9nIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmF2YUF1dGhJbmZvIiwiY2F0Y2giLCJlcnIiLCJBY3Rpdml0eUZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiYmVmb3JlIiwic2V0QmVmb3JlIiwiYWZ0ZXIiLCJzZXRBZnRlciIsImRhdGUiLCJEYXRlIiwiZGF0ZTEiLCJub3ciLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiaGFuZGxlRW5kRGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZVN0YXJ0RGF0ZSIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZGF0ZUJlZm9yZSIsInBhcnNlIiwidG9TdHJpbmciLCJkYXRlQWZ0ZXIiLCJmb3JtRGF0YSIsIlNob3dSZXN1bHRzIiwicmVzdWx0TGlzdCIsImxlbmd0aCIsIm1hcCIsImkiLCJzdGFydF9kYXRlIiwic3RyYXZhdmlzdWFsUGxhY2UiLCJzdGFydF9sYXRsbmciLCJTaG93QWdncmVnYXRlZFJlc3VsdHMiLCJhY3Rpdml0aWVzTGlzdCIsInN0YXRlIiwic2V0U3RhdGUiLCJhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZSIsInBsYWNlZGlzdG9iaiIsImZvckVhY2giLCJlbCIsInVuZGVmaW5lZCIsIk51bWJlciIsImRpc3RhbmNlIiwiYWdncm9iamVjdCIsImRpYURhdGEiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwieCIsInkiLCJQYWdlIiwicXVlcnlQYXJhbXMiLCJzZXRRdWVyeVBhcmFtcyIsImFjdGl2aXRpZXMiLCJzZXRBY3Rpdml0aWVzIiwicGVyX3BhZ2UiLCJwYWdlIiwicmVzdWx0IiwicmVzdWx0Q2h1bmsiLCJhZGRQYXJhbXMiLCJnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YSIsImZpbmQiLCJhdXRoSW5mbyIsInVybCIsIlVSTCIsIkFjY2VwdCIsImFjY2Vzc190b2tlbiIsIk1haW5wYWdlIiwic3RhcnRSZWRpcmVjdCIsIlJlZGlyZWN0VGFyZ2V0IiwiZGlzYWJsZVJlZGlyZWN0IiwiQXBwIiwic2V0U3RhcnRSZWRpcmVjdCIsInNpZ25PdXQiLCJyZW1vdmVJdGVtIiwiaXNUb2tlbkV4cGlyZWQiLCJ0b2tlbkV4cGlyZXNBdCIsInJlZnJlc2hUb2tlbiIsInRva2VuIiwicmVmcmVzaF90b2tlbiIsInJlc3BvbnNlIiwib2JqIiwib2JqZWN0IiwiZ2V0SXRlbSIsImV4cGlyZXNfYXQiLCJuZXdEYXRhIiwibmV3T2JqZWN0IiwiTWFwIiwiZG9jdW1lbnQiLCJocmVmIiwicmVuZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaWduSW4iLCJBdmF0YXIiLCJsaW5rIiwiVXNlck5hbWUiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsIkhlYWRlckF1dGhJbmZvIiwiZGlzcGxheVVzZXJJbmZvIiwiYXRobGV0ZSIsInByb2ZpbGUiLCJOYXYiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==