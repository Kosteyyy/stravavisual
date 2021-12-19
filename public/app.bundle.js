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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
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

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, state.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043A\u0438\u043B\u043E\u043C\u0435\u0442\u0440\u0430\u0436\u0430 \u043F\u043E \u043C\u0435\u0441\u0442\u0443") : null);
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
  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)(); //useEffect(() => {if (startRedirect) navigate("redirect");}, [])

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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Header_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
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

//const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavusual.herokuapp.com/auth&approval_prompt=force&scope=activity:read";
const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";
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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBLE1BQU1lLE1BQU0sR0FBRyxDQUNYO0FBQUNDLEVBQUFBLElBQUksRUFBRSxhQUFQO0FBQXNCQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUjtBQUE5QixDQURXLEVBRVg7QUFBQ0QsRUFBQUEsSUFBSSxFQUFFLGdCQUFQO0FBQXlCQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUjtBQUFqQyxDQUZXLEVBR1g7QUFBQ0QsRUFBQUEsSUFBSSxFQUFFLGdCQUFQO0FBQXlCQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUjtBQUFqQyxDQUhXLEVBSVg7QUFBQ0QsRUFBQUEsSUFBSSxFQUFFLFVBQVA7QUFBbUJDLEVBQUFBLE1BQU0sRUFBRSxDQUFDLEtBQUQsRUFBUSxLQUFSO0FBQTNCLENBSlcsQ0FBZjs7QUFPQSxTQUFTQyxNQUFULENBQWdCRCxNQUFoQixFQUF3QkUsS0FBeEIsRUFBK0JDLE1BQU0sR0FBQyxJQUF0QyxFQUE0QztBQUN4QyxNQUFJQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVRCxJQUFJLENBQUNFLEdBQUwsQ0FBU1AsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFVRSxLQUFLLENBQUNGLE1BQU4sQ0FBYSxDQUFiLENBQW5CLEVBQW9DLENBQXBDLElBQXlDSyxJQUFJLENBQUNFLEdBQUwsQ0FBU1AsTUFBTSxDQUFDLENBQUQsQ0FBTixHQUFVRSxLQUFLLENBQUNGLE1BQU4sQ0FBYSxDQUFiLENBQW5CLEVBQW9DLENBQXBDLENBQW5ELENBQVg7QUFDQSxTQUFRSSxJQUFJLEdBQUdELE1BQWY7QUFDSDs7QUFFRCxTQUFTSyxZQUFULENBQXNCO0FBQUNDLEVBQUFBO0FBQUQsQ0FBdEIsRUFBcUM7QUFDakM7QUFDQSxzQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJLHFGQURKLGVBRUksNGRBRkosZUFHSTtBQUFRLFdBQU8sRUFBRSxNQUFNO0FBQ25CQSxNQUFBQSxXQUFXLENBQUM7QUFBQ0MsUUFBQUEsTUFBTSxFQUFFO0FBQVQsT0FBRCxDQUFYO0FBQ0FDLE1BQUFBLFlBQVk7QUFDWDtBQUhMLDBHQUhKLENBREo7QUFXSDs7QUFFRCxTQUFTQyxhQUFULENBQXVCO0FBQUVDLEVBQUFBLFFBQUY7QUFBWUMsRUFBQUE7QUFBWixDQUF2QixFQUFpRDtBQUM3QztBQUNBLE1BQUlDLFFBQVEsR0FBR3ZCLDZEQUFXLEVBQTFCO0FBQ0EsTUFBSXdCLFFBQVEsR0FBR3ZCLDZEQUFXLEVBQTFCOztBQUNBLE1BQUlvQixRQUFRLENBQUNILE1BQVQsSUFBbUIsWUFBdkIsRUFBcUM7QUFDakNNLElBQUFBLFFBQVEsQ0FBQyxHQUFELENBQVI7QUFDSDs7QUFDRCxNQUFJQyxNQUFNLEdBQUcsSUFBSXZCLDBEQUFKLENBQW9CcUIsUUFBUSxDQUFDRyxNQUE3QixDQUFiO0FBQ0EsTUFBSUMsVUFBVSxHQUFHRixNQUFNLENBQUNHLEdBQVAsQ0FBVyxNQUFYLENBQWpCLENBUjZDLENBUVI7O0FBQ3JDLFFBQU1DLElBQUksR0FBRztBQUFDQyxJQUFBQSxJQUFJLEVBQUVIO0FBQVAsR0FBYjs7QUFFQSxpQkFBZUksYUFBZixHQUErQjtBQUMzQixRQUFJVixRQUFRLENBQUNILE1BQVQsS0FBb0IsWUFBeEIsRUFBc0M7QUFDOUJjLE1BQUFBLEtBQUssQ0FBQyx1QkFBRCxFQUEwQjtBQUMvQkMsUUFBQUEsTUFBTSxFQUFFLE1BRHVCO0FBRS9CQyxRQUFBQSxPQUFPLEVBQUU7QUFBRSwwQkFBZ0I7QUFBbEIsU0FGc0I7QUFHL0JDLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVSLElBQWY7QUFIeUIsT0FBMUIsQ0FBTCxDQUtDUyxJQUxELENBS01DLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxJQUFKLEVBTGIsRUFNQ0YsSUFORCxDQU1NQyxHQUFHLElBQUk7QUFDVEUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksMkJBQVosRUFBeUNILEdBQXpDO0FBQ0FJLFFBQUFBLFlBQVksQ0FBQ0MsT0FBYixDQUFzQixnQkFBdEIsRUFBd0NSLElBQUksQ0FBQ0MsU0FBTCxDQUFlRSxHQUFmLENBQXhDO0FBQ0FqQixRQUFBQSxVQUFVLENBQUM7QUFBQ0osVUFBQUEsTUFBTSxFQUFFLGNBQVQ7QUFBeUIyQixVQUFBQSxjQUFjLEVBQUVOO0FBQXpDLFNBQUQsQ0FBVixDQUhTLENBR2tEOztBQUMzRGYsUUFBQUEsUUFBUSxDQUFDLEdBQUQsQ0FBUjtBQUNILE9BWEQsRUFZQ3NCLEtBWkQsQ0FZT0MsR0FBRyxJQUFJTixPQUFPLENBQUNDLEdBQVIsQ0FBWUssR0FBWixDQVpkO0FBYUgsS0FkTCxNQWNXLENBQ0g7QUFDSDtBQUNSOztBQUVEdEQsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNc0MsYUFBYSxFQUFwQixFQUF3QixFQUF4QixDQUFUO0FBRUEsc0JBQ0ksMkVBQ0kscUZBREosQ0FESjtBQUtIOztBQUVELFNBQVNpQixZQUFULENBQXNCO0FBQUNDLEVBQUFBO0FBQUQsQ0FBdEIsRUFBMEM7QUFDdEMsUUFBTSxDQUFDQyxNQUFELEVBQVNDLFNBQVQsSUFBc0IzRCwrQ0FBUSxDQUFDLFlBQUQsQ0FBcEMsQ0FEc0MsQ0FDYzs7QUFDcEQsUUFBTSxDQUFDNEQsS0FBRCxFQUFRQyxRQUFSLElBQW9CN0QsK0NBQVEsQ0FBQyxZQUFELENBQWxDO0FBRUFDLEVBQUFBLGdEQUFTLENBQUMsTUFBTTtBQUNaLFFBQUk2RCxJQUFJLEdBQUcsSUFBSUMsSUFBSixFQUFYO0FBQ0EsUUFBSUMsS0FBSyxHQUFJLElBQUlELElBQUosQ0FBVUEsSUFBSSxDQUFDRSxHQUFMLEtBQWEsVUFBdkIsQ0FBYjtBQUNBTixJQUFBQSxTQUFTLENBQUNHLElBQUksQ0FBQ0ksV0FBTCxHQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsQ0FBRCxDQUFUO0FBQ0FOLElBQUFBLFFBQVEsQ0FBQ0csS0FBSyxDQUFDRSxXQUFOLEdBQW9CQyxLQUFwQixDQUEwQixHQUExQixFQUErQixDQUEvQixDQUFELENBQVI7QUFFSCxHQU5RLEVBTVAsRUFOTyxDQUFUOztBQVFBLFdBQVNDLGFBQVQsQ0FBdUJDLENBQXZCLEVBQTBCO0FBQ3RCVixJQUFBQSxTQUFTLENBQUNVLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxLQUFWLENBQVQ7QUFDSDs7QUFFRCxXQUFTQyxlQUFULENBQXlCSCxDQUF6QixFQUE0QjtBQUN4QlIsSUFBQUEsUUFBUSxDQUFDUSxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsS0FBVixDQUFSO0FBQ0g7O0FBRUQsV0FBU0UsWUFBVCxDQUFzQkosQ0FBdEIsRUFBeUI7QUFDckJBLElBQUFBLENBQUMsQ0FBQ0ssY0FBRjtBQUNBLFFBQUlDLFVBQVUsR0FBRyxDQUFDWixJQUFJLENBQUNhLEtBQUwsQ0FBV2xCLE1BQVgsSUFBcUIsSUFBdEIsRUFBNEJtQixRQUE1QixFQUFqQjtBQUNBLFFBQUlDLFNBQVMsR0FBRyxDQUFDZixJQUFJLENBQUNhLEtBQUwsQ0FBV2hCLEtBQVgsSUFBb0IsSUFBckIsRUFBMkJpQixRQUEzQixFQUFoQjtBQUNBLFFBQUlFLFFBQVEsR0FBRztBQUNYckIsTUFBQUEsTUFBTSxFQUFFaUIsVUFERztBQUVYZixNQUFBQSxLQUFLLEVBQUVrQjtBQUZJLEtBQWY7QUFJQXJCLElBQUFBLGdCQUFnQixDQUFDc0IsUUFBRCxDQUFoQixDQVJxQixDQVNyQjtBQUNBO0FBQ0g7O0FBRUQsc0JBQ0k7QUFBTSxhQUFTLEVBQUM7QUFBaEIsa0JBQ0ksZ0ZBQ0ksaUlBREosZUFFSTtBQUFPLFFBQUksRUFBQyxNQUFaO0FBQW1CLE1BQUUsRUFBQyxPQUF0QjtBQUE4QixRQUFJLEVBQUMsZ0JBQW5DO0FBQ0ksU0FBSyxFQUFFbkIsS0FEWDtBQUNrQixZQUFRLEVBQUVZLGVBRDVCO0FBRUksT0FBRyxFQUFDO0FBRlIsSUFGSixlQUtJLDJIQUxKLGVBTUk7QUFBTyxRQUFJLEVBQUMsTUFBWjtBQUFtQixNQUFFLEVBQUMsS0FBdEI7QUFBNEIsUUFBSSxFQUFDLGlCQUFqQztBQUNJLFNBQUssRUFBRWQsTUFEWDtBQUNtQixZQUFRLEVBQUVVLGFBRDdCO0FBRUksT0FBRyxFQUFDO0FBRlIsSUFOSixDQURKLGVBV0k7QUFBUSxRQUFJLEVBQUMsUUFBYjtBQUFzQixXQUFPLEVBQUVLO0FBQS9CLHNDQVhKLENBREo7QUFnQkg7O0FBRUQsU0FBU08sV0FBVCxDQUFxQjtBQUFDQyxFQUFBQTtBQUFELElBQWUsRUFBcEMsRUFBd0M7QUFDcEMsc0JBQ0ksMkVBQ0ksOEdBQWVBLFVBQVUsQ0FBQ0MsTUFBMUIsTUFESixFQUVLRCxVQUFVLENBQUNFLEdBQVgsQ0FBZSxDQUFDcEMsR0FBRCxFQUFNcUMsQ0FBTixrQkFDWjtBQUFLLGFBQVMsRUFBQyxhQUFmO0FBQTZCLE9BQUcsRUFBRUE7QUFBbEMsS0FDS3JDLEdBQUcsQ0FBQ3NDLFVBQUosQ0FBZWxCLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEIsQ0FBMUIsQ0FETCxTQUNzQ3BCLEdBQUcsQ0FBQ2hDLElBRDFDLFNBQ21EZ0MsR0FBRyxDQUFDdUMsaUJBRHZELFNBQzZFdkMsR0FBRyxDQUFDd0MsWUFBSixDQUFpQixDQUFqQixDQUQ3RSxRQUNvR3hDLEdBQUcsQ0FBQ3dDLFlBQUosQ0FBaUIsQ0FBakIsQ0FEcEcsQ0FESCxDQUZMLENBREo7QUFTSDs7QUFFRCxTQUFTQyxxQkFBVCxDQUErQjtBQUFDQyxFQUFBQTtBQUFELENBQS9CLEVBQWlEO0FBQzdDLFFBQU0sQ0FBQ0MsS0FBRCxFQUFRQyxRQUFSLElBQW9CM0YsK0NBQVEsQ0FBQyxFQUFELENBQWxDOztBQUNBLFdBQVM0Riw2QkFBVCxDQUF1Q3ZELElBQUksR0FBRyxFQUE5QyxFQUFrRDtBQUM5QztBQUNBLFFBQUl3RCxZQUFZLEdBQUcsRUFBbkI7QUFFQXhELElBQUFBLElBQUksQ0FBQ3lELE9BQUwsQ0FBYUMsRUFBRSxJQUFJO0FBQ2YsVUFBSUYsWUFBWSxDQUFDRSxFQUFFLENBQUNULGlCQUFKLENBQVosSUFBc0NVLFNBQTFDLEVBQXFESCxZQUFZLENBQUNFLEVBQUUsQ0FBQ1QsaUJBQUosQ0FBWixHQUFxQyxDQUFyQztBQUNyRE8sTUFBQUEsWUFBWSxDQUFDRSxFQUFFLENBQUNULGlCQUFKLENBQVosSUFBc0NXLE1BQU0sQ0FBQ0YsRUFBRSxDQUFDRyxRQUFKLENBQTVDO0FBQ0gsS0FIRDtBQUtBLFdBQU9MLFlBQVA7QUFDSDs7QUFDRDVGLEVBQUFBLGdEQUFTLENBQUMsTUFBTTtBQUNaLFFBQUlrRyxVQUFVLEdBQUdQLDZCQUE2QixDQUFDSCxjQUFELENBQTlDO0FBQ0F4QyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCdUMsY0FBekI7QUFDQXhDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0JpRCxVQUF0QjtBQUNBLFFBQUlDLE9BQU8sR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlILFVBQVosRUFBd0JoQixHQUF4QixDQUE2Qm9CLEdBQUQsSUFBUztBQUM5QyxhQUFPO0FBQUNDLFFBQUFBLENBQUMsRUFBRUQsR0FBSjtBQUFTRSxRQUFBQSxDQUFDLEVBQUVOLFVBQVUsQ0FBQ0ksR0FBRDtBQUF0QixPQUFQO0FBQ0osS0FGYSxDQUFkO0FBR0FaLElBQUFBLFFBQVEsQ0FBQ1MsT0FBRCxDQUFSO0FBQ0FuRCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCa0QsT0FBekI7QUFDSCxHQVRRLEVBU04sQ0FBQ1gsY0FBRCxDQVRNLENBQVQsQ0FiNkMsQ0F3QjdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQ0ksOERBQ0tDLEtBQUssQ0FBQ1IsTUFBTixnQkFBZSw2UEFBZixHQUE2RCxJQURsRSxDQURKO0FBVUg7O0FBRUQsU0FBU3dCLElBQVQsQ0FBYztBQUFFN0UsRUFBQUE7QUFBRixDQUFkLEVBQTRCO0FBQ3hCLFFBQU0sQ0FBQzhFLFdBQUQsRUFBY0MsY0FBZCxJQUFnQzVHLCtDQUFRLENBQUM7QUFBQzBELElBQUFBLE1BQU0sRUFBRSxZQUFUO0FBQXVCRSxJQUFBQSxLQUFLLEVBQUU7QUFBOUIsR0FBRCxDQUE5QztBQUNBLFFBQU0sQ0FBQ2lELFVBQUQsRUFBYUMsYUFBYixJQUE4QjlHLCtDQUFRLENBQUMsRUFBRCxDQUE1Qzs7QUFFQSxpQkFBZXlELGdCQUFmLENBQWdDeEIsTUFBaEMsRUFBd0M7QUFDcEMyRSxJQUFBQSxjQUFjLENBQUMzRSxNQUFELENBQWQ7QUFDQSxRQUFJOEUsUUFBUSxHQUFHLEVBQWY7QUFDQSxRQUFJQyxJQUFJLEdBQUcsQ0FBWDtBQUNBLFFBQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0EsUUFBSUMsV0FBVyxHQUFHLEVBQWxCOztBQUNBLE9BQUc7QUFDQyxVQUFJQyxTQUFTLEdBQUc7QUFBQ0osUUFBQUEsUUFBUSxFQUFFQSxRQUFRLENBQUNsQyxRQUFULEVBQVg7QUFBZ0NtQyxRQUFBQSxJQUFJLEVBQUVBLElBQUksQ0FBQ25DLFFBQUw7QUFBdEMsT0FBaEI7QUFDQTVDLE1BQUFBLE1BQU0sR0FBRyxFQUFDLEdBQUdBLE1BQUo7QUFBWSxXQUFHa0Y7QUFBZixPQUFULENBRkQsQ0FHQzs7QUFDQUQsTUFBQUEsV0FBVyxHQUFHLE1BQU1FLHVCQUF1QixDQUFDbkYsTUFBRCxDQUEzQztBQUNBZ0YsTUFBQUEsTUFBTSxHQUFHLENBQUMsR0FBR0EsTUFBSixFQUFZLEdBQUdDLFdBQWYsQ0FBVDtBQUNBRixNQUFBQSxJQUFJLElBQUksQ0FBUjtBQUNILEtBUEQsUUFRSUUsV0FBVyxDQUFDaEMsTUFBWixJQUFzQjZCLFFBUjFCOztBQVVBRSxJQUFBQSxNQUFNLENBQUNuQixPQUFQLENBQWUvQyxHQUFHLElBQUk7QUFDbEIsVUFBSTdCLEtBQUssR0FBR0osTUFBTSxDQUFDdUcsSUFBUCxDQUFZbkcsS0FBSyxJQUFJRCxNQUFNLENBQUM4QixHQUFHLENBQUN3QyxZQUFMLEVBQW1CckUsS0FBbkIsQ0FBM0IsQ0FBWjs7QUFDQSxVQUFJQSxLQUFKLEVBQVc7QUFDUDZCLFFBQUFBLEdBQUcsQ0FBQ3VDLGlCQUFKLEdBQXdCcEUsS0FBSyxDQUFDSCxJQUE5QjtBQUNILE9BRkQsTUFFTztBQUNIZ0MsUUFBQUEsR0FBRyxDQUFDdUMsaUJBQUosR0FBd0IsWUFBeEI7QUFDSDtBQUNKLEtBUEQ7QUFTQXdCLElBQUFBLGFBQWEsQ0FBQ0csTUFBRCxDQUFiO0FBRUg7O0FBSUQsTUFBSUssUUFBUSxHQUFHekYsUUFBUSxDQUFDd0IsY0FBeEI7O0FBRUEsaUJBQWUrRCx1QkFBZixDQUF1Q25GLE1BQXZDLEVBQStDO0FBQzNDO0FBQ0EsUUFBSXNGLEdBQUcsR0FBRyxJQUFJQyxHQUFKLENBQVEsa0RBQVIsQ0FBVixDQUYyQyxDQUczQzs7QUFDQUQsSUFBQUEsR0FBRyxDQUFDckYsTUFBSixHQUFhLElBQUl4QiwwREFBSixDQUFvQnVCLE1BQXBCLEVBQTRCNEMsUUFBNUIsRUFBYjtBQUVBLFFBQUl4QyxJQUFJLEdBQUcsTUFBTUcsS0FBSyxDQUFDK0UsR0FBRCxFQUN0QjtBQUNJOUUsTUFBQUEsTUFBTSxFQUFFLEtBRFo7QUFFSUMsTUFBQUEsT0FBTyxFQUFFO0FBQ0wrRSxRQUFBQSxNQUFNLEVBQUUsa0JBREg7QUFFTDdGLFFBQUFBLGFBQWEsRUFBRyxVQUFTMEYsUUFBUSxDQUFDSSxZQUFhO0FBRjFDO0FBRmIsS0FEc0IsQ0FBdEI7QUFTQSxRQUFJVCxNQUFNLEdBQUcsTUFBTTVFLElBQUksQ0FBQ1csSUFBTCxFQUFuQixDQWYyQyxDQWdCM0M7O0FBQ0EsV0FBT2lFLE1BQVA7QUFDSDs7QUFFRCxzQkFDSSwyRUFDSSxpREFBQyxZQUFEO0FBQWMsb0JBQWdCLEVBQUV4RDtBQUFoQyxJQURKLEVBRUtvRCxVQUFVLGdCQUFHLGlEQUFDLHFCQUFEO0FBQXVCLGtCQUFjLEVBQUVBO0FBQXZDLElBQUgsR0FBMEQsSUFGekUsZUFHSSxpREFBQyxXQUFEO0FBQWEsY0FBVSxFQUFFQTtBQUF6QixJQUhKLENBREo7QUFRSDs7QUFFRCxTQUFTYyxRQUFULENBQWtCO0FBQUU5RixFQUFBQSxRQUFGO0FBQVlKLEVBQUFBLFdBQVo7QUFBeUJtRyxFQUFBQTtBQUF6QixDQUFsQixFQUE0RDtBQUN4RCxNQUFJNUYsUUFBUSxHQUFHdkIsNkRBQVcsRUFBMUIsQ0FEd0QsQ0FHeEQ7O0FBRUEsc0JBQ0ksOERBQ0tvQixRQUFRLENBQUNILE1BQVQsSUFBbUIsY0FBbkIsZ0JBQW9DLGlEQUFDLFlBQUQ7QUFBYyxlQUFXLEVBQUVEO0FBQTNCLElBQXBDLEdBQWlGLElBRHRGLEVBRUtJLFFBQVEsQ0FBQ0gsTUFBVCxJQUFtQixZQUFuQixnQkFBa0MsaURBQUMsSUFBRDtBQUFNLFlBQVEsRUFBRUc7QUFBaEIsSUFBbEMsR0FBaUUsSUFGdEUsQ0FESjtBQU9IOztBQUVELFNBQVNnRyxjQUFULENBQXdCO0FBQUNDLEVBQUFBO0FBQUQsQ0FBeEIsRUFBMkM7QUFDdkMsTUFBSTlGLFFBQVEsR0FBR3ZCLDZEQUFXLEVBQTFCO0FBQ0Esc0JBQ0k7QUFBUSxXQUFPLEVBQUUsTUFBTTtBQUFDcUgsTUFBQUEsZUFBZTtBQUFJOUYsTUFBQUEsUUFBUSxDQUFDLEdBQUQsQ0FBUjtBQUFjO0FBQXpELHdCQURKO0FBR0g7O0FBRUQsU0FBUytGLEdBQVQsR0FBZTtBQUNYLFFBQU0sQ0FBQ2xHLFFBQUQsRUFBV0osV0FBWCxJQUEwQnpCLCtDQUFRLENBQUM7QUFBQzBCLElBQUFBLE1BQU0sRUFBRSxjQUFUO0FBQXlCMkIsSUFBQUEsY0FBYyxFQUFFO0FBQXpDLEdBQUQsQ0FBeEMsQ0FEVyxDQUM2RTs7QUFDeEYsUUFBTSxDQUFDdUUsYUFBRCxFQUFnQkksZ0JBQWhCLElBQW9DaEksK0NBQVEsQ0FBQyxJQUFELENBQWxEOztBQUNBLFdBQVM4SCxlQUFULEdBQTJCO0FBQUNFLElBQUFBLGdCQUFnQixDQUFDLEtBQUQsQ0FBaEI7QUFBd0I7O0FBQUE7O0FBRXBELFdBQVNDLE9BQVQsR0FBbUI7QUFDZjlFLElBQUFBLFlBQVksQ0FBQytFLFVBQWIsQ0FBd0IsZ0JBQXhCLEVBRGUsQ0FFZjtBQUNIOztBQUVELFdBQVNDLGNBQVQsQ0FBd0JDLGNBQXhCLEVBQXdDO0FBQ3BDLFFBQUssSUFBSXJFLElBQUosQ0FBU3FFLGNBQWMsR0FBRyxJQUExQixJQUFrQ3JFLElBQUksQ0FBQ0UsR0FBTCxFQUFuQyxHQUFpRCxDQUFyRCxFQUF5RDtBQUNyRCxhQUFPLElBQVA7QUFDSCxLQUZELE1BR0ssT0FBTyxLQUFQO0FBQ1I7O0FBRUQsaUJBQWVvRSxZQUFmLENBQTRCQyxLQUE1QixFQUFtQztBQUMvQixRQUFJakcsSUFBSSxHQUFHO0FBQUNrRyxNQUFBQSxhQUFhLEVBQUVEO0FBQWhCLEtBQVg7QUFDQSxRQUFJRSxRQUFRLEdBQUcsTUFBTWhHLEtBQUssQ0FBQyxtQkFBRCxFQUFzQjtBQUM1Q0MsTUFBQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDQyxNQUFBQSxPQUFPLEVBQUU7QUFBRSx3QkFBZ0I7QUFBbEIsT0FGbUM7QUFHNUNDLE1BQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVSLElBQWY7QUFIc0MsS0FBdEIsQ0FBMUI7QUFLQSxRQUFJNEUsTUFBTSxHQUFHLE1BQU11QixRQUFRLENBQUN4RixJQUFULEVBQW5CLENBUCtCLENBUS9COztBQUNBLFdBQU9pRSxNQUFQO0FBQ0g7O0FBRURoSCxFQUFBQSxnREFBUyxDQUFDLE1BQU07QUFDWjtBQUNBO0FBQ0EsUUFBSTRCLFFBQVEsQ0FBQ3dCLGNBQVQsSUFBMkIyQyxTQUEvQixFQUEwQztBQUFDO0FBQU8sS0FBbEQsTUFDSyxJQUFJSyxNQUFNLENBQUNDLElBQVAsQ0FBWXpFLFFBQVEsQ0FBQ3dCLGNBQXJCLEVBQXFDNkIsTUFBckMsS0FBZ0QsQ0FBaEQsSUFBcURyRCxRQUFRLENBQUNILE1BQVQsS0FBb0IsWUFBN0UsRUFBMkY7QUFDNUYsVUFBSStHLEdBQUcsR0FBRyxFQUFDLEdBQUc1RyxRQUFKO0FBQWNILFFBQUFBLE1BQU0sRUFBRTtBQUF0QixPQUFWO0FBQ0FELE1BQUFBLFdBQVcsQ0FBQ2dILEdBQUQsQ0FBWDtBQUNIO0FBQ0osR0FSUSxFQVFOLENBQUM1RyxRQUFELENBUk0sQ0FBVDtBQVVDNUIsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ2I7QUFDQSxRQUFJeUksTUFBTSxHQUFHOUYsSUFBSSxDQUFDZ0MsS0FBTCxDQUFXekIsWUFBWSxDQUFDd0YsT0FBYixDQUFzQixnQkFBdEIsQ0FBWCxDQUFiOztBQUNBLFFBQUlELE1BQU0sSUFBSSxJQUFkLEVBQW9CLENBQ3BCO0FBQ0MsS0FGRCxNQUVPLElBQUlyQyxNQUFNLENBQUNDLElBQVAsQ0FBWW9DLE1BQVosRUFBb0J4RCxNQUFwQixJQUE4QixDQUFsQyxFQUFvQyxDQUMzQztBQUNDLEtBRk0sTUFFQTtBQUNIakMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUN3RixNQUFqQztBQUNBekYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksbUJBQVosRUFBaUNpRixjQUFjLENBQUNPLE1BQU0sQ0FBQ0UsVUFBUixDQUEvQzs7QUFDQSxVQUFJVCxjQUFjLENBQUNPLE1BQU0sQ0FBQ0UsVUFBUixDQUFsQixFQUF1QztBQUNuQzNGLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlDQUFaLEVBQStDd0YsTUFBTSxDQUFDSCxhQUF0RDtBQUNBRixRQUFBQSxZQUFZLENBQUNLLE1BQU0sQ0FBQ0gsYUFBUixDQUFaLENBQ0t6RixJQURMLENBQ1UrRixPQUFPLElBQUk7QUFDYjVGLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaLEVBQTJDMkYsT0FBM0M7QUFDQSxjQUFJQyxTQUFTLEdBQUcsRUFBRSxHQUFHSixNQUFMO0FBQWEsZUFBR0c7QUFBaEIsV0FBaEI7QUFDQTVGLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDZCQUFaLEVBQTJDNEYsU0FBM0M7QUFDQXJILFVBQUFBLFdBQVcsQ0FBQztBQUFDQyxZQUFBQSxNQUFNLEVBQUUsWUFBVDtBQUF1QjJCLFlBQUFBLGNBQWMsRUFBRXlGO0FBQXZDLFdBQUQsQ0FBWDtBQUNBM0YsVUFBQUEsWUFBWSxDQUFDQyxPQUFiLENBQXNCLGdCQUF0QixFQUF3Q1IsSUFBSSxDQUFDQyxTQUFMLENBQWVpRyxTQUFmLENBQXhDO0FBQ0gsU0FQTDtBQVFILE9BVkQsTUFVTztBQUNIckgsUUFBQUEsV0FBVyxDQUFDO0FBQUNDLFVBQUFBLE1BQU0sRUFBRSxZQUFUO0FBQXVCMkIsVUFBQUEsY0FBYyxFQUFFcUY7QUFBdkMsU0FBRCxDQUFYO0FBQ0g7QUFDSjtBQUNKLEdBeEJTLEVBd0JQLEVBeEJPLENBQVQ7QUEyQkQsc0JBQ0ksaUhBQ0ksaURBQUMsMkRBQUQscUJBQ0ksaURBQUMsbURBQUQ7QUFBUSxZQUFRLEVBQUU3RyxRQUFsQjtBQUE0QixXQUFPLEVBQUVvRyxPQUFyQztBQUE4QyxVQUFNLEVBQUV0RztBQUF0RCxJQURKLGVBRUksaURBQUMsb0RBQUQscUJBQ0ksaURBQUMsbURBQUQ7QUFBTyxRQUFJLEVBQUMsR0FBWjtBQUFnQixXQUFPLGVBQUUsaURBQUMsUUFBRDtBQUFVLGNBQVEsRUFBRUUsUUFBcEI7QUFBOEIsaUJBQVcsRUFBRUosV0FBM0M7QUFBd0QsbUJBQWEsRUFBRW1HO0FBQXZFO0FBQXpCLElBREosZUFFSSxpREFBQyxtREFBRDtBQUFPLFFBQUksRUFBQyxNQUFaO0FBQW1CLFdBQU8sZUFBRSxpREFBQyxhQUFEO0FBQWUsY0FBUSxFQUFFL0YsUUFBekI7QUFBbUMsZ0JBQVUsRUFBRUo7QUFBL0M7QUFBNUIsSUFGSixlQUdJLGlEQUFDLG1EQUFEO0FBQU8sUUFBSSxFQUFDLEtBQVo7QUFBa0IsV0FBTyxlQUFFLGlEQUFDLEdBQUQ7QUFBM0IsSUFISixlQUlJLGlEQUFDLG1EQUFEO0FBQU8sUUFBSSxFQUFDLFVBQVo7QUFBdUIsV0FBTyxlQUFFLGlEQUFDLGNBQUQ7QUFBZ0IscUJBQWUsRUFBRXFHO0FBQWpDO0FBQWhDLElBSkosQ0FGSixDQURKLENBREo7QUFhSDs7QUFFRCxNQUFNaUIsR0FBRyxHQUFHLE1BQU07QUFDZCxzQkFBTyw2SkFBUDtBQUNILENBRkQ7O0FBTUEsU0FBU3BILFlBQVQsR0FBd0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0FxSCxFQUFBQSxRQUFRLENBQUNqSCxRQUFULENBQWtCa0gsSUFBbEIsR0FBeUJySSxtREFBekI7QUFDSDs7QUFFRFYsNkNBQUEsZUFBZ0IsaURBQUMsR0FBRCxPQUFoQixFQUF5QjhJLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixNQUF4QixDQUF6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5V0E7QUFDQTtBQUVlLFNBQVN0SSxNQUFULENBQWdCO0FBQUVnQixFQUFBQSxRQUFGO0FBQVlvRyxFQUFBQSxPQUFaO0FBQXFCbUIsRUFBQUE7QUFBckIsQ0FBaEIsRUFBK0M7QUFDMUQsc0JBQ0k7QUFBUSxhQUFTLEVBQUM7QUFBbEIsa0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJLGlEQUFDLGNBQUQ7QUFBZ0IsWUFBUSxFQUFFdkgsUUFBMUI7QUFBb0MsV0FBTyxFQUFFb0csT0FBN0M7QUFBc0QsVUFBTSxFQUFFbUI7QUFBOUQsSUFESixlQUVJLGlEQUFDLEdBQUQsT0FGSixDQURKLENBREosQ0FESjtBQVVIOztBQUVELE1BQU1DLE1BQU0sR0FBRyxDQUFDO0FBQUNDLEVBQUFBO0FBQUQsQ0FBRCxLQUFZO0FBQ3ZCLHNCQUNJO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0k7QUFBSyxPQUFHLEVBQUVBLElBQUksSUFBSTtBQUFsQixJQURKLENBREo7QUFLSCxDQU5EOztBQVFBLE1BQU1DLFFBQVEsR0FBRyxDQUFDO0FBQUNDLEVBQUFBLFNBQUQ7QUFBWUMsRUFBQUE7QUFBWixDQUFELEtBQTJCO0FBQ3hDLHNCQUFPO0FBQU0sYUFBUyxFQUFDO0FBQWhCLEtBQW1DRCxTQUFTLElBQUksRUFBaEQsT0FBcURDLFFBQVEsSUFBSSxFQUFqRSxDQUFQO0FBQ0gsQ0FGRDs7QUFLQSxTQUFTQyxjQUFULENBQXdCO0FBQUU3SCxFQUFBQSxRQUFGO0FBQVlvRyxFQUFBQSxPQUFaO0FBQXFCbUIsRUFBQUE7QUFBckIsQ0FBeEIsRUFBdUQ7QUFDbkQsTUFBSTlCLFFBQVEsR0FBR3pGLFFBQVEsQ0FBQ3dCLGNBQXhCO0FBQ0EsTUFBSXNHLGVBQWUsR0FBSTlILFFBQVEsQ0FBQ0gsTUFBVCxJQUFtQixZQUExQztBQUNBLHNCQUNJO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FDS2lJLGVBQWUsZ0JBQ1osaUhBQ0ksaURBQUMsTUFBRDtBQUFRLFFBQUksRUFBRXJDLFFBQVEsQ0FBQ3NDLE9BQVQsQ0FBaUJDO0FBQS9CLElBREosZUFFSSxpREFBQyxRQUFEO0FBQVUsYUFBUyxFQUFFdkMsUUFBUSxDQUFDc0MsT0FBVCxDQUFpQkosU0FBdEM7QUFBaUQsWUFBUSxFQUFFbEMsUUFBUSxDQUFDc0MsT0FBVCxDQUFpQkg7QUFBNUUsSUFGSixlQUdJO0FBQVEsV0FBTyxFQUFFeEI7QUFBakIsc0NBSEosQ0FEWSxnQkFNVjtBQUFRLFdBQU8sRUFBRW1CO0FBQWpCLHNDQVBWLENBREo7QUFZSDs7QUFFRCxNQUFNVSxHQUFHLEdBQUcsTUFBTTtBQUNkLHNCQUNJLDJFQUNBLGlEQUFDLGtEQUFEO0FBQU0sTUFBRSxFQUFDO0FBQVQsWUFEQSxPQUMwQixHQUQxQixlQUVBLGlEQUFDLGtEQUFEO0FBQU0sTUFBRSxFQUFDO0FBQVQsc0NBRkEsQ0FESjtBQU1ILENBUEQ7Ozs7Ozs7Ozs7QUM5Q0E7QUFDQSxNQUFNbEosb0JBQW9CLEdBQUcsNkpBQTdCO0FBQ0FtSixNQUFNLENBQUNDLE9BQVAsR0FBaUJwSixvQkFBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsaURBQWlELG1DQUFtQywrQkFBK0IsaUNBQWlDLDZCQUE2QiwwQkFBMEIsS0FBSyxVQUFVLHNCQUFzQixzQkFBc0IsZ0NBQWdDLDRCQUE0QixnREFBZ0Qsa0NBQWtDLGdDQUFnQyxLQUFLLGtCQUFrQixzQkFBc0Isb0JBQW9CLHlCQUF5QixzQkFBc0IsZ0NBQWdDLDRCQUE0QiwrQkFBK0Isb0RBQW9ELG9CQUFvQix5QkFBeUIseUJBQXlCLDBCQUEwQixLQUFLLGVBQWUsc0JBQXNCLG9CQUFvQix5QkFBeUIsc0JBQXNCLGdDQUFnQyxzQ0FBc0MsS0FBSyxhQUFhLDJCQUEyQixxQkFBcUIsS0FBSyxnQkFBZ0IsaUNBQWlDLHFCQUFxQix1QkFBdUIsc0JBQXNCLHFCQUFxQiw0QkFBNEIsS0FBSyxpQkFBaUIsd0JBQXdCLG9CQUFvQixlQUFlLGdCQUFnQixvQkFBb0IscUJBQXFCLEtBQUssdUJBQXVCLG9CQUFvQiwyQkFBMkIsZUFBZSxnQkFBZ0Isb0JBQW9CLHFCQUFxQixpREFBaUQsS0FBSyxrQkFBa0IsMkJBQTJCLG1CQUFtQixzQkFBc0IsdUNBQXVDLHFCQUFxQiw0QkFBNEIsS0FBSyxtQkFBbUIsa0NBQWtDLHNCQUFzQixLQUFLLG9CQUFvQix3QkFBd0IscUJBQXFCLEtBQUssMEJBQTBCLHNCQUFzQiw0QkFBNEIsS0FBSyxvQkFBb0IsdUJBQXVCLDJCQUEyQiwyQkFBMkIseUJBQXlCLEtBQUssd0JBQXdCLHdCQUF3Qix1QkFBdUIsS0FBSyw4QkFBOEIscUJBQXFCLDJDQUEyQywyQkFBMkIsS0FBSyw4QkFBOEIsZ0NBQWdDLEtBQUssMkJBQTJCLHFCQUFxQixLQUFLLDZCQUE2QixvQkFBb0IsS0FBSyxzQkFBc0IsdUJBQXVCLHlCQUF5QixLQUFLLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxNQUFNLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGlDQUFpQyxtQ0FBbUMsK0JBQStCLGlDQUFpQyw2QkFBNkIsMEJBQTBCLEtBQUssVUFBVSxzQkFBc0Isc0JBQXNCLGdDQUFnQyw0QkFBNEIsZ0RBQWdELGtDQUFrQyxnQ0FBZ0MsS0FBSyxrQkFBa0Isc0JBQXNCLG9CQUFvQix5QkFBeUIsc0JBQXNCLGdDQUFnQyw0QkFBNEIsK0JBQStCLG9EQUFvRCxvQkFBb0IseUJBQXlCLHlCQUF5QiwwQkFBMEIsS0FBSyxlQUFlLHNCQUFzQixvQkFBb0IseUJBQXlCLHNCQUFzQixnQ0FBZ0Msc0NBQXNDLEtBQUssYUFBYSwyQkFBMkIscUJBQXFCLEtBQUssZ0JBQWdCLGlDQUFpQyxxQkFBcUIsdUJBQXVCLHNCQUFzQixxQkFBcUIsNEJBQTRCLEtBQUssaUJBQWlCLHdCQUF3QixvQkFBb0IsZUFBZSxnQkFBZ0Isb0JBQW9CLHFCQUFxQixLQUFLLHVCQUF1QixvQkFBb0IsMkJBQTJCLGVBQWUsZ0JBQWdCLG9CQUFvQixxQkFBcUIsaURBQWlELEtBQUssa0JBQWtCLDJCQUEyQixtQkFBbUIsc0JBQXNCLHVDQUF1QyxxQkFBcUIsNEJBQTRCLEtBQUssbUJBQW1CLGtDQUFrQyxzQkFBc0IsS0FBSyxvQkFBb0Isd0JBQXdCLHFCQUFxQixLQUFLLDBCQUEwQixzQkFBc0IsNEJBQTRCLEtBQUssb0JBQW9CLHVCQUF1QiwyQkFBMkIsMkJBQTJCLHlCQUF5QixLQUFLLHdCQUF3Qix3QkFBd0IsdUJBQXVCLEtBQUssOEJBQThCLHFCQUFxQiwyQ0FBMkMsMkJBQTJCLEtBQUssOEJBQThCLGdDQUFnQyxLQUFLLDJCQUEyQixxQkFBcUIsS0FBSyw2QkFBNkIsb0JBQW9CLEtBQUssc0JBQXNCLHVCQUF1Qix5QkFBeUIsS0FBSyxtQkFBbUI7QUFDemtNO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ052QyxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7OztVQzFCN0U7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvQXBwLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvSGVhZGVyLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgVmljdG9yeVBpZSB9IGZyb20gXCJ2aWN0b3J5LXBpZVwiO1xyXG5pbXBvcnQgeyBMaW5rLCBSb3V0ZXMsIFJvdXRlLCBCcm93c2VyUm91dGVyLCB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICd1cmwtc2VhcmNoLXBhcmFtcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBTVFJBVkFfR0VUX0NPREVfTElOSyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyLmpzeCc7XHJcblxyXG5cclxuY29uc3QgUExBQ0VTID0gW1xyXG4gICAge25hbWU6ICfQnNC40YLQuNC90L4g0J/QsNGA0LonLCBsYXRsbmc6IFs1NS44NCwgMzcuMzddfSxcclxuICAgIHtuYW1lOiAn0JzQtdGJ0LXRgNGB0LrQuNC5INCf0LDRgNC6JywgbGF0bG5nOiBbNTUuNjYsIDM3LjQwXX0sXHJcbiAgICB7bmFtZTogJ9Ch0YLQsNC00LjQvtC9INCX0L7RgNC60LjQuScsIGxhdGxuZzogWzU1Ljg0LCAzNy4zMl19LFxyXG4gICAge25hbWU6ICfQntC00LjQvdGG0L7QstC+JywgbGF0bG5nOiBbNTUuNjksIDM3LjI1XX0sXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGlzTmVhcihsYXRsbmcsIHBsYWNlLCByYWRpdXM9MC4wNCkge1xyXG4gICAgbGV0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3cobGF0bG5nWzBdLXBsYWNlLmxhdGxuZ1swXSwgMikgKyBNYXRoLnBvdyhsYXRsbmdbMV0tcGxhY2UubGF0bG5nWzFdLCAyKSk7XHJcbiAgICByZXR1cm4gKGRpc3QgPCByYWRpdXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBVbmF1dGhvcml6ZWQoe3NldEF1dGhEYXRhfSkge1xyXG4gICAgLy/QntGC0L7QsdGA0LDQttCw0LXRgtGB0Y8g0L3QsCDRgdGC0LDRgNGC0L7QstC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQtdGB0LvQuCDQutC70LjQtdC90YIg0L3QtSDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9INCyINGB0YLRgNCw0LLQsFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1bmF1dGgnPlxyXG4gICAgICAgICAgICA8ZGl2PlRoaXMgaXMgVW5hdXRob3JpemVkPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+0JLRiyDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3Riy4g0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDINCy0Ysg0L/QtdGA0LXQudC00ZHRgtC1INC90LAg0YHQsNC50YIgU3RyYXZhINC00LvRjyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LjwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldEF1dGhEYXRhKHtzdGF0dXM6IFwicHJvY2Vzc2luZ1wifSk7XHJcbiAgICAgICAgICAgICAgICBhdXRoQXRTdHJhdmEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfT7QkNCy0YLQvtGA0LjQt9C+0LLQsNGC0YzRgdGPINCyIFN0cmF2YTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBdXRob3JpemF0aW9uKHsgYXV0aERhdGEsIGhhbmRsZURhdGEgfSkge1xyXG4gICAgLy/QodGO0LTQsCDQv9GA0LjRhdC+0LTQuNGCINC/0LXRgNC10LDQtNGA0LXRgdCw0YbQuNGPINGB0L4g0YHRgtGA0LDQstGLINC4INC30LTQtdGB0Ywg0LzRiyDQv9C+0LvRg9GH0LDQtdC8INGC0L7QutC10L3RiyDQuCDQvtCx0L7Qt9C90LDRh9Cw0LXQvCDQsNCy0YLQvtGA0LjQt9Cw0YbQuNGOXHJcbiAgICBsZXQgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xyXG4gICAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICAgIGlmIChhdXRoRGF0YS5zdGF0dXMgPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICBuYXZpZ2F0ZSgnLycpO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGxldCBjbGllbnRDb2RlID0gcGFyYW1zLmdldChcImNvZGVcIik7IC8vINCy0YvQtNC10LvQuNC70Lgg0LrQvtC0INC/0YDQuNGB0LvQsNC90L3Ri9C5INCh0YLRgNCw0LLQvtC5INC40Lcg0LDQtNGA0LXRgdCwXHJcbiAgICBjb25zdCBkYXRhID0ge2NvZGU6IGNsaWVudENvZGV9O1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoQXV0aEluZm8oKSB7XHJcbiAgICAgICAgaWYgKGF1dGhEYXRhLnN0YXR1cyAhPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvYXBpL2dldHRva2VuZnJvbWNvZGUnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2hBdXRoSW5mbzogcmVzcG9uc2U6ICcsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gKFwiU3RyYXZhQXV0aEluZm9cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRGF0YSh7c3RhdHVzOiBcInVuYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzogcmVzfSk7IC8v0KfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINGA0LXRgNC10L3QtNC10YDQuNC90LPQsCDQoNC+0YPRgtC10YDQsCDQv9C+0LrQsCDRgdGC0LDRgtGD0YEg0L7RgdGC0LDQstC70Y/QtdC8IHVuYXV0aCwg0L7QsdGA0LDQsdC+0YLQsNC10Lwg0LIgQXBwXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoJy8nKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSgnLycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IGZldGNoQXV0aEluZm8oKSwgW10pO1xyXG4gIFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMT5UaGlzIGlzIEF1dGhvcml6YXRpb248L2gxPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBY3Rpdml0eUZvcm0oe2hhbmRsZUZvcm1TdWJtaXR9KSB7XHJcbiAgICBjb25zdCBbYmVmb3JlLCBzZXRCZWZvcmVdID0gdXNlU3RhdGUoJzIwMjEtMTAtMjAnKTsgLy97YWN0aXZpdHlCZWZvcmUsIGFjdGl2aXR5QWZ0ZXJ9XHJcbiAgICBjb25zdCBbYWZ0ZXIsIHNldEFmdGVyXSA9IHVzZVN0YXRlKCcyMDIxLTEwLTIwJyk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGUxID0gIG5ldyBEYXRlKCBEYXRlLm5vdygpIC0gNjcwMDAwMDAwMCApO1xyXG4gICAgICAgIHNldEJlZm9yZShkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSk7XHJcbiAgICAgICAgc2V0QWZ0ZXIoZGF0ZTEudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdKTtcclxuXHJcbiAgICB9LFtdKVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVuZERhdGUoZSkge1xyXG4gICAgICAgIHNldEJlZm9yZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RhcnREYXRlKGUpIHtcclxuICAgICAgICBzZXRBZnRlcihlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IGRhdGVCZWZvcmUgPSAoRGF0ZS5wYXJzZShiZWZvcmUpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZGF0ZUFmdGVyID0gKERhdGUucGFyc2UoYWZ0ZXIpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZm9ybURhdGEgPSB7XHJcbiAgICAgICAgICAgIGJlZm9yZTogZGF0ZUJlZm9yZSxcclxuICAgICAgICAgICAgYWZ0ZXI6IGRhdGVBZnRlclxyXG4gICAgICAgIH1cclxuICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGZvcm1EYXRhKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGDQn9C+0LvRg9GH0LjQvCDQtNCw0L3QvdGL0LUg0LzQtdC20LTRgyAke2RhdGVCZWZvcmV9INC4ICR7ZGF0ZUFmdGVyfWApO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Zvcm1EYXRhOiAnLCBmb3JtRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT0nYWN0aXZpdHktZm9ybSc+XHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsZWdlbmQ+0JTQsNGC0LAg0L3QsNGH0LDQu9CwPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cInN0YXJ0XCIgbmFtZT1cImFjdGl2aXR5LWFmdGVyXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWZ0ZXJ9IG9uQ2hhbmdlPXtoYW5kbGVTdGFydERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMjAxOC0wMS0wMVwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPtCU0LDRgtCwINC60L7QvdGG0LA8L2xlZ2VuZD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZW5kXCIgbmFtZT1cImFjdGl2aXR5LWJlZm9yZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2JlZm9yZX0gb25DaGFuZ2U9e2hhbmRsZUVuZERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMjAxOC0wMS0wMVwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0+0J3QsNC50YLQuDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNob3dSZXN1bHRzKHtyZXN1bHRMaXN0fSA9IFtdKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXY+0J3QsNC50LTQtdC90L46IHtyZXN1bHRMaXN0Lmxlbmd0aH0gPC9kaXY+XHJcbiAgICAgICAgICAgIHtyZXN1bHRMaXN0Lm1hcCgocmVzLCBpKSA9PiBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0LWxpc3RcIiBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtyZXMuc3RhcnRfZGF0ZS5zcGxpdCgnVCcpWzBdfSAtIHtyZXMubmFtZX0gLSB7cmVzLnN0cmF2YXZpc3VhbFBsYWNlfSAtIHtyZXMuc3RhcnRfbGF0bG5nWzBdfSwge3Jlcy5zdGFydF9sYXRsbmdbMV19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBTaG93QWdncmVnYXRlZFJlc3VsdHMoe2FjdGl2aXRpZXNMaXN0fSkge1xyXG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBmdW5jdGlvbiBhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZShkYXRhID0gW10pIHtcclxuICAgICAgICAvL9CQ0LPQs9GA0LXQs9C40YDRg9C10YIg0LDQutGC0LjQstC90L7RgdGC0Lgg0L/QviDQvNC10YHRgtCw0Lwg0Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC8INC00LjRgdGC0LDQvdGG0LjRj9C8LCDQvdCwINCy0YvRhdC+0LTQtSDQvtCx0YrQtdC60YJcclxuICAgICAgICBsZXQgcGxhY2VkaXN0b2JqID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgaWYgKHBsYWNlZGlzdG9ialtlbC5zdHJhdmF2aXN1YWxQbGFjZV0gPT0gdW5kZWZpbmVkKSBwbGFjZWRpc3RvYmpbZWwuc3RyYXZhdmlzdWFsUGxhY2VdID0gMDtcclxuICAgICAgICAgICAgcGxhY2VkaXN0b2JqW2VsLnN0cmF2YXZpc3VhbFBsYWNlXSArPSBOdW1iZXIoZWwuZGlzdGFuY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxhY2VkaXN0b2JqO1xyXG4gICAgfVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgYWdncm9iamVjdCA9IGFnZ3JlZ2F0ZVJlc3VsdHNQbGFjZURpc3RhbmNlKGFjdGl2aXRpZXNMaXN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWN0TGlzdDogJywgYWN0aXZpdGllc0xpc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZ2dyOiAnLCBhZ2dyb2JqZWN0KTtcclxuICAgICAgICBsZXQgZGlhRGF0YSA9IE9iamVjdC5rZXlzKGFnZ3JvYmplY3QpLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICByZXR1cm4ge3g6IGtleSwgeTogYWdncm9iamVjdFtrZXldfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRTdGF0ZShkaWFEYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGlhRGF0YTogJywgZGlhRGF0YSk7XHJcbiAgICB9LCBbYWN0aXZpdGllc0xpc3RdKTtcclxuXHJcbiAgICAvLyBjb25zdCBteURhdGEgPSBbXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEFcIiwgeTogOTAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEJcIiwgeTogNDAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIENcIiwgeTogMzAwIH0sXHJcbiAgICAvLyAgIF07XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtzdGF0ZS5sZW5ndGggPyA8aDE+0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0LrQuNC70L7QvNC10YLRgNCw0LbQsCDQv9C+INC80LXRgdGC0YM8L2gxPiA6IG51bGwgfVxyXG4gICAgICAgICAgICB7LyogPFZpY3RvcnlQaWVcclxuICAgICAgICAgICAgICAgIGRhdGE9e3N0YXRlfVxyXG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZT17W1wiQnVybHlXb29kXCIsIFwiTGlnaHRTa3lCbHVlXCIsIFwiTGlnaHRDb3JhbFwiLCBcIkxpZ2h0UGlua1wiLCBcIlRlYWxcIl19XHJcbiAgICAgICAgICAgICAgICByYWRpdXM9ezEwMH1cclxuICAgICAgICAgICAgLz4gKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFBhZ2UoeyBhdXRoRGF0YSB9KSB7IFxyXG4gICAgY29uc3QgW3F1ZXJ5UGFyYW1zLCBzZXRRdWVyeVBhcmFtc10gPSB1c2VTdGF0ZSh7YmVmb3JlOiAnMTYzOTgzMzY0MicsIGFmdGVyOiAnMTYzMzA0NjQwMCd9KVxyXG4gICAgY29uc3QgW2FjdGl2aXRpZXMsIHNldEFjdGl2aXRpZXNdID0gdXNlU3RhdGUoW10pO1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUZvcm1TdWJtaXQocGFyYW1zKSB7XHJcbiAgICAgICAgc2V0UXVlcnlQYXJhbXMocGFyYW1zKTtcclxuICAgICAgICBsZXQgcGVyX3BhZ2UgPSAzMDsgXHJcbiAgICAgICAgbGV0IHBhZ2UgPSAxO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgcmVzdWx0Q2h1bmsgPSBbXTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGxldCBhZGRQYXJhbXMgPSB7cGVyX3BhZ2U6IHBlcl9wYWdlLnRvU3RyaW5nKCksIHBhZ2U6IHBhZ2UudG9TdHJpbmcoKX07XHJcbiAgICAgICAgICAgIHBhcmFtcyA9IHsuLi5wYXJhbXMsIC4uLmFkZFBhcmFtc307XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocGFyYW1zKTtcclxuICAgICAgICAgICAgcmVzdWx0Q2h1bmsgPSBhd2FpdCBnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YShwYXJhbXMpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LCAuLi5yZXN1bHRDaHVua107XHJcbiAgICAgICAgICAgIHBhZ2UgKz0gMTtcclxuICAgICAgICB9IHdoaWxlIChcclxuICAgICAgICAgICAgcmVzdWx0Q2h1bmsubGVuZ3RoID09IHBlcl9wYWdlXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaChyZXMgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGxhY2UgPSBQTEFDRVMuZmluZChwbGFjZSA9PiBpc05lYXIocmVzLnN0YXJ0X2xhdGxuZywgcGxhY2UpKTtcclxuICAgICAgICAgICAgaWYgKHBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RyYXZhdmlzdWFsUGxhY2UgPSBwbGFjZS5uYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0cmF2YXZpc3VhbFBsYWNlID0gJ9Cd0LXQuNC30LLQtdGB0YLQvdC+JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZXRBY3Rpdml0aWVzKHJlc3VsdCk7XHJcbiAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBsZXQgYXV0aEluZm8gPSBhdXRoRGF0YS5zdHJhdmFBdXRoSW5mbztcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YShwYXJhbXMpIHtcclxuICAgICAgICAvL9C/0YDQuNGB0L7QtdC00LjQvdGP0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LfQsNC/0YDQvtGB0LAg0Log0L7RgdC90L7QstC90L7QvNGDINCw0LTRgNC10YHRgyDRgNC10YHRg9GA0YHQsFxyXG4gICAgICAgIGxldCB1cmwgPSBuZXcgVVJMKCdodHRwczovL3d3dy5zdHJhdmEuY29tL2FwaS92My9hdGhsZXRlL2FjdGl2aXRpZXMnKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBxdWVyeVBhcmFtcztcclxuICAgICAgICB1cmwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpLnRvU3RyaW5nKCk7XHJcbiBcclxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKHVybCwgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthdXRoSW5mby5hY2Nlc3NfdG9rZW59YCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBkYXRhLmpzb24oKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPEFjdGl2aXR5Rm9ybSBoYW5kbGVGb3JtU3VibWl0PXtoYW5kbGVGb3JtU3VibWl0fS8+XHJcbiAgICAgICAgICAgIHthY3Rpdml0aWVzID8gPFNob3dBZ2dyZWdhdGVkUmVzdWx0cyBhY3Rpdml0aWVzTGlzdD17YWN0aXZpdGllc30vPiA6IG51bGx9XHJcbiAgICAgICAgICAgIDxTaG93UmVzdWx0cyByZXN1bHRMaXN0PXthY3Rpdml0aWVzfSAvPlxyXG4gICAgICAgICAgICB7LyogPGJ1dHRvbiBvbkNsaWNrPXtnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YX0+0L/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LU8L2J1dHRvbj4gKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBNYWlucGFnZSh7IGF1dGhEYXRhLCBzZXRBdXRoRGF0YSwgc3RhcnRSZWRpcmVjdCB9KSB7XHJcbiAgICBsZXQgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xyXG5cclxuICAgIC8vdXNlRWZmZWN0KCgpID0+IHtpZiAoc3RhcnRSZWRpcmVjdCkgbmF2aWdhdGUoXCJyZWRpcmVjdFwiKTt9LCBbXSlcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICB7YXV0aERhdGEuc3RhdHVzID09IFwidW5hdXRob3JpemVkXCIgPyA8VW5hdXRob3JpemVkIHNldEF1dGhEYXRhPXtzZXRBdXRoRGF0YX0gLz4gOiBudWxsfVxyXG4gICAgICAgICAgICB7YXV0aERhdGEuc3RhdHVzID09IFwiYXV0aG9yaXplZFwiID8gPFBhZ2UgYXV0aERhdGE9e2F1dGhEYXRhfSAvPiA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBSZWRpcmVjdFRhcmdldCh7ZGlzYWJsZVJlZGlyZWN0fSkge1xyXG4gICAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtkaXNhYmxlUmVkaXJlY3QoKTsgbmF2aWdhdGUoJy8nKX19PmRpc2FibGVSZWRpcmVjdCA8L2J1dHRvbj5cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gQXBwKCkge1xyXG4gICAgY29uc3QgW2F1dGhEYXRhLCBzZXRBdXRoRGF0YV0gPSB1c2VTdGF0ZSh7c3RhdHVzOiBcInVuYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzoge319KTsgLy9bXCJ1bmF1dGhvcml6ZWRcIiwgXCJhdXRob3JpemVkXCIsIFwicHJvY2Vzc2luZ1wiXVxyXG4gICAgY29uc3QgW3N0YXJ0UmVkaXJlY3QsIHNldFN0YXJ0UmVkaXJlY3RdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgICBmdW5jdGlvbiBkaXNhYmxlUmVkaXJlY3QoKSB7c2V0U3RhcnRSZWRpcmVjdChmYWxzZSl9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25PdXQoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJTdHJhdmFBdXRoSW5mb1wiKTtcclxuICAgICAgICAvL3NldEF1dGhEYXRhKHtzdGF0dXM6IFwidW5hdXRob3JpemVkXCIsIHN0cmF2YUF1dGhJbmZvOiB7fX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVG9rZW5FeHBpcmVkKHRva2VuRXhwaXJlc0F0KSB7XHJcbiAgICAgICAgaWYgKChuZXcgRGF0ZSh0b2tlbkV4cGlyZXNBdCAqIDEwMDApIC0gRGF0ZS5ub3coKSkgPCAwICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaFRva2VuKHRva2VuKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7cmVmcmVzaF90b2tlbjogdG9rZW59O1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3JlZnJlc2h0b2tlbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncmVmcmVzaFRva2VuOiByZXNwb25zZTogJywgcmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAvL9Cf0YDQvtCy0LXRgNGP0LXQvCwg0L/QvtGP0LLQuNC70LjRgdGMINC70Lgg0LTQsNC90L3Ri9C1INCyIHN0cmF2YUF1dGhJbmZvXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygn0J/RgNC+0LLQtdGA0Y/RjiDQvdCw0LvQuNGH0LjQtSDQtNCw0L3QvdGL0YUg0LIg0KHRgtGA0LDQstCw0JjQvdGE0L4nKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEuc3RyYXZhQXV0aEluZm8gPT0gdW5kZWZpbmVkKSB7cmV0dXJufVxyXG4gICAgICAgIGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhEYXRhLnN0cmF2YUF1dGhJbmZvKS5sZW5ndGggIT09IDAgJiYgYXV0aERhdGEuc3RhdHVzICE9PSBcImF1dGhvcml6ZWRcIikge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gey4uLmF1dGhEYXRhLCBzdGF0dXM6IFwiYXV0aG9yaXplZFwifTtcclxuICAgICAgICAgICAgc2V0QXV0aERhdGEob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbYXV0aERhdGFdKTtcclxuXHJcbiAgICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBcHAuINCY0LfQstC70LXQutCw0LXQvCDQtNCw0L3QvdGL0LUg0LjQtyDQu9C+0LrQsNC70YzQvdC+0LPQviDRhdGA0LDQvdC40LvQuNGJ0LAuJylcclxuICAgICAgICBsZXQgb2JqZWN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSAoXCJTdHJhdmFBdXRoSW5mb1wiKSk7XHJcbiAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ9CSINGF0YDQsNC90LjQu9C40YnQtSDQtNCw0L3QvdGL0YUg0L3QtdGCLicpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ9CSINGF0YDQsNC90LjQu9C40YnQtSDQtNCw0L3QvdGL0YUg0L3QtdGCLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQlNCw0L3QvdGL0LUg0L/QvtC70YPRh9C10L3RizogJywgb2JqZWN0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ci0L7QutC10L0g0L/RgNC+0YHRgNC+0YfQtdC9OiAnLCBpc1Rva2VuRXhwaXJlZChvYmplY3QuZXhwaXJlc19hdCkpO1xyXG4gICAgICAgICAgICBpZiAoaXNUb2tlbkV4cGlyZWQob2JqZWN0LmV4cGlyZXNfYXQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0LHQvdC+0LLQu9GP0Y4g0YLQvtC60LXQvSwgcmVmcmVzaF90b2tlbjogXCIsIG9iamVjdC5yZWZyZXNoX3Rva2VuKVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRva2VuKG9iamVjdC5yZWZyZXNoX3Rva2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKG5ld0RhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0J/QvtC70YPRh9C10L3RiyDQtNCw0L3QvdGL0LUg0YEg0YHQtdGA0LLQtdGA0LA6ICcsIG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3T2JqZWN0ID0geyAuLi5vYmplY3QsIC4uLm5ld0RhdGF9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0J7QsdC90L7QstC70ZHQvdC90YvQuSDQvtCx0YrQtdC60YIg0LTQsNC90L3Ri9GFOiAnLCBuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBdXRoRGF0YSh7c3RhdHVzOiBcImF1dGhvcml6ZWRcIiwgc3RyYXZhQXV0aEluZm86IG5ld09iamVjdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSAoXCJTdHJhdmFBdXRoSW5mb1wiLCBKU09OLnN0cmluZ2lmeShuZXdPYmplY3QpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldEF1dGhEYXRhKHtzdGF0dXM6IFwiYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzogb2JqZWN0fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbXSlcclxuICAgXHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxCcm93c2VyUm91dGVyPlxyXG4gICAgICAgICAgICAgICAgPEhlYWRlciBhdXRoRGF0YT17YXV0aERhdGF9IHNpZ25PdXQ9e3NpZ25PdXR9IHNpZ25Jbj17YXV0aEF0U3RyYXZhfS8+XHJcbiAgICAgICAgICAgICAgICA8Um91dGVzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxNYWlucGFnZSBhdXRoRGF0YT17YXV0aERhdGF9IHNldEF1dGhEYXRhPXtzZXRBdXRoRGF0YX0gc3RhcnRSZWRpcmVjdD17c3RhcnRSZWRpcmVjdH0vPiB9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJhdXRoXCIgZWxlbWVudD17PEF1dGhvcml6YXRpb24gYXV0aERhdGE9e2F1dGhEYXRhfSBoYW5kbGVEYXRhPXtzZXRBdXRoRGF0YX0gLz59IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJtYXBcIiBlbGVtZW50PXs8TWFwIC8+fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwicmVkaXJlY3RcIiBlbGVtZW50PXs8UmVkaXJlY3RUYXJnZXQgZGlzYWJsZVJlZGlyZWN0PXtkaXNhYmxlUmVkaXJlY3R9IC8+fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9Sb3V0ZXM+XHJcbiAgICAgICAgICAgIDwvQnJvd3NlclJvdXRlcj5cclxuICAgICAgICA8Lz5cclxuICAgIClcclxufVxyXG5cclxuY29uc3QgTWFwID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIDxkaXY+0JfQtNC10YHRjCDQsdGD0LTRg9GCINC60LDRgNGC0Ys8L2Rpdj5cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBhdXRoQXRTdHJhdmEoKSB7XHJcbiAgICAvLyBodHRwczovL3N0cmF2YXZ1c3VhbC5oZXJva3VhcHAuY29tL1xyXG4gICAgLy8gY29uc3QgZmlyc3RBdXRoTGluayA9IFwiaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9vYXV0aC9hdXRob3JpemU/Y2xpZW50X2lkPTc0NjY4JnJlc3BvbnNlX3R5cGU9Y29kZSZyZWRpcmVjdF91cmk9aHR0cHM6Ly9zdHJhdmF2dXN1YWwuaGVyb2t1YXBwLmNvbS9yZXBvcnQmYXBwcm92YWxfcHJvbXB0PWZvcmNlJnNjb3BlPWFjdGl2aXR5OnJlYWRcIlxyXG4gICAgLy8gY29uc3QgZmlyc3RBdXRoTGluayA9IFwiaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9vYXV0aC9hdXRob3JpemU/Y2xpZW50X2lkPTc0NjY4JnJlc3BvbnNlX3R5cGU9Y29kZSZyZWRpcmVjdF91cmk9aHR0cDovL2xvY2FsaG9zdDozMDAwL3JlcG9ydCZhcHByb3ZhbF9wcm9tcHQ9Zm9yY2Umc2NvcGU9YWN0aXZpdHk6cmVhZFwiXHJcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gU1RSQVZBX0dFVF9DT0RFX0xJTks7XHJcbn1cclxuXHJcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTsiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYWRlcih7IGF1dGhEYXRhLCBzaWduT3V0LCBzaWduSW4gfSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJfYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxIZWFkZXJBdXRoSW5mbyBhdXRoRGF0YT17YXV0aERhdGF9IHNpZ25PdXQ9e3NpZ25PdXR9IHNpZ25Jbj17c2lnbklufS8+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxOYXYgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2hlYWRlcj5cclxuICAgIClcclxufVxyXG5cclxuY29uc3QgQXZhdGFyID0gKHtsaW5rfSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl9hdmF0YXJcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9e2xpbmsgfHwgbnVsbH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuY29uc3QgVXNlck5hbWUgPSAoe2ZpcnN0bmFtZSwgbGFzdG5hbWV9KSA9PiB7XHJcbiAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwiaGVhZGVyX3VzZXJuYW1lXCI+e2ZpcnN0bmFtZSB8fCAnJ30ge2xhc3RuYW1lIHx8ICcnfTwvc3Bhbj5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEhlYWRlckF1dGhJbmZvKHsgYXV0aERhdGEsIHNpZ25PdXQsIHNpZ25JbiB9KSB7XHJcbiAgICBsZXQgYXV0aEluZm8gPSBhdXRoRGF0YS5zdHJhdmFBdXRoSW5mbztcclxuICAgIGxldCBkaXNwbGF5VXNlckluZm8gPSAoYXV0aERhdGEuc3RhdHVzID09IFwiYXV0aG9yaXplZFwiKTtcclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl91c2VyaW5mb1wiPlxyXG4gICAgICAgICAgICB7ZGlzcGxheVVzZXJJbmZvID8gXHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxBdmF0YXIgbGluaz17YXV0aEluZm8uYXRobGV0ZS5wcm9maWxlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxVc2VyTmFtZSBmaXJzdG5hbWU9e2F1dGhJbmZvLmF0aGxldGUuZmlyc3RuYW1lfSBsYXN0bmFtZT17YXV0aEluZm8uYXRobGV0ZS5sYXN0bmFtZX0gLz4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtzaWduT3V0fT7QktGL0LnRgtC4PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIDogPGJ1dHRvbiBvbkNsaWNrPXtzaWduSW59PtCS0L7QudGC0Lg8L2J1dHRvbj59XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBOYXYgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPG5hdj4gICBcclxuICAgICAgICA8TGluayB0bz1cIi9cIj5Ib21lPC9MaW5rPnx7XCIgXCJ9XHJcbiAgICAgICAgPExpbmsgdG89XCJtYXBcIj7QnNC10YHRgtCwPC9MaW5rPiBcclxuICAgICAgICA8L25hdj5cclxuICAgIClcclxufVxyXG4iLCIvL2NvbnN0IFNUUkFWQV9HRVRfQ09ERV9MSU5LID0gXCJodHRwczovL3d3dy5zdHJhdmEuY29tL29hdXRoL2F1dGhvcml6ZT9jbGllbnRfaWQ9NzQ2NjgmcmVzcG9uc2VfdHlwZT1jb2RlJnJlZGlyZWN0X3VyaT1odHRwczovL3N0cmF2YXZ1c3VhbC5oZXJva3VhcHAuY29tL2F1dGgmYXBwcm92YWxfcHJvbXB0PWZvcmNlJnNjb3BlPWFjdGl2aXR5OnJlYWRcIjtcclxuY29uc3QgU1RSQVZBX0dFVF9DT0RFX0xJTksgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoJmFwcHJvdmFsX3Byb21wdD1mb3JjZSZzY29wZT1hY3Rpdml0eTpyZWFkXCI7XHJcbm1vZHVsZS5leHBvcnRzID0gU1RSQVZBX0dFVF9DT0RFX0xJTks7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxyXFxuICAgIC0taGVhZGVyLWJnLWNvbG9yOiAjNWU1MzczO1xcclxcbiAgICAtLWJ1dHRvbi1jb2xvcjogb3JhbmdlO1xcclxcbiAgICAtLW1haW4tYmctY29sb3I6ICMxM2I1Y2E7XFxyXFxuICAgIC0taGVhZGVyLWxpbms6IHdoaXRlO1xcclxcbiAgICAtLW1haW4tdGV4dDogIzU1NTtcXHJcXG59XFxyXFxuYm9keSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWY7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWViZjA7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1tYWluLXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4jd3JhcHBlciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOYW51bSBHb3RoaWMnLCBzYW5zLXNlcmlmXFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBtYXJnaW46IDBweCBhdXRvO1xcclxcbiAgICBwYWRkaW5nOiAwcHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuI3Jvb3Qge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIHBhZGRpbmc6IDEwMHB4IDEwcHggMTBweCAxMHB4O1xcclxcbn1cXHJcXG4udW5hdXRoIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDIwcHg7XFxyXFxufVxcclxcblxcclxcbmJ1dHRvbiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG4gICAgbWFyZ2luOiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIHtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB6LWluZGV4OiA1MDtcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyOmJlZm9yZXtcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oZWFkZXItYmctY29sb3IpO1xcclxcbn1cXHJcXG4uaGVhZGVyX2JvZHkge1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgaGVpZ2h0OiA4MHB4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyIGEge1xcclxcbiAgICBjb2xvcjogdmFyKC0taGVhZGVyLWxpbmspO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbn1cXHJcXG4uaGVhZGVyIGJ1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogLjhlbTtcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVyX3VzZXJpbmZvIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIge1xcclxcbiAgICBmbGV4OiAwIDAgNjBweDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcbi5oZWFkZXJfYXZhdGFyIGltZyB7XFxyXFxuICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5hY3Rpdml0eS1mb3JtIGlucHV0IHtcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1tYWluLXRleHQpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGZpZWxkdGV4dCB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1tYWluLXRleHQpO1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBsZWdlbmQge1xcclxcbiAgICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGZpZWxkc2V0IHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5yZXN1bHQtbGlzdCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBsaW5lLWhlaWdodDogMWVtO1xcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHVDQUF1QztJQUN2Qyx5QkFBeUI7SUFDekIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gICAgLS1oZWFkZXItYmctY29sb3I6ICM1ZTUzNzM7XFxyXFxuICAgIC0tYnV0dG9uLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIC0tbWFpbi1iZy1jb2xvcjogIzEzYjVjYTtcXHJcXG4gICAgLS1oZWFkZXItbGluazogd2hpdGU7XFxyXFxuICAgIC0tbWFpbi10ZXh0OiAjNTU1O1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWJmMDtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcblxcclxcbiN3cmFwcGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWZcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vdCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMTAwcHggMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcbi51bmF1dGgge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbjogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHotaW5kZXg6IDUwO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXI6YmVmb3Jle1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1iZy1jb2xvcik7XFxyXFxufVxcclxcbi5oZWFkZXJfYm9keSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBoZWlnaHQ6IDgwcHg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgYSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1oZWFkZXItbGluayk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcbi5oZWFkZXIgYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiAuOGVtO1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXJfdXNlcmluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciB7XFxyXFxuICAgIGZsZXg6IDAgMCA2MHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIgaW1nIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2aXR5LWZvcm0gaW5wdXQge1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLW1haW4tdGV4dCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGR0ZXh0IHtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGxlZ2VuZCB7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGRzZXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlc3VsdC1saXN0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYXBwXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzdHJhdmF2aXN1YWxcIl0gPSBzZWxmW1wid2VicGFja0NodW5rc3RyYXZhdmlzdWFsXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvQXBwLmpzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJSZWFjdERPTSIsIlZpY3RvcnlQaWUiLCJMaW5rIiwiUm91dGVzIiwiUm91dGUiLCJCcm93c2VyUm91dGVyIiwidXNlTG9jYXRpb24iLCJ1c2VOYXZpZ2F0ZSIsIlVSTFNlYXJjaFBhcmFtcyIsImF4aW9zIiwiU1RSQVZBX0dFVF9DT0RFX0xJTksiLCJIZWFkZXIiLCJQTEFDRVMiLCJuYW1lIiwibGF0bG5nIiwiaXNOZWFyIiwicGxhY2UiLCJyYWRpdXMiLCJkaXN0IiwiTWF0aCIsInNxcnQiLCJwb3ciLCJVbmF1dGhvcml6ZWQiLCJzZXRBdXRoRGF0YSIsInN0YXR1cyIsImF1dGhBdFN0cmF2YSIsIkF1dGhvcml6YXRpb24iLCJhdXRoRGF0YSIsImhhbmRsZURhdGEiLCJsb2NhdGlvbiIsIm5hdmlnYXRlIiwicGFyYW1zIiwic2VhcmNoIiwiY2xpZW50Q29kZSIsImdldCIsImRhdGEiLCJjb2RlIiwiZmV0Y2hBdXRoSW5mbyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlcyIsImpzb24iLCJjb25zb2xlIiwibG9nIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInN0cmF2YUF1dGhJbmZvIiwiY2F0Y2giLCJlcnIiLCJBY3Rpdml0eUZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiYmVmb3JlIiwic2V0QmVmb3JlIiwiYWZ0ZXIiLCJzZXRBZnRlciIsImRhdGUiLCJEYXRlIiwiZGF0ZTEiLCJub3ciLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiaGFuZGxlRW5kRGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZVN0YXJ0RGF0ZSIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZGF0ZUJlZm9yZSIsInBhcnNlIiwidG9TdHJpbmciLCJkYXRlQWZ0ZXIiLCJmb3JtRGF0YSIsIlNob3dSZXN1bHRzIiwicmVzdWx0TGlzdCIsImxlbmd0aCIsIm1hcCIsImkiLCJzdGFydF9kYXRlIiwic3RyYXZhdmlzdWFsUGxhY2UiLCJzdGFydF9sYXRsbmciLCJTaG93QWdncmVnYXRlZFJlc3VsdHMiLCJhY3Rpdml0aWVzTGlzdCIsInN0YXRlIiwic2V0U3RhdGUiLCJhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZSIsInBsYWNlZGlzdG9iaiIsImZvckVhY2giLCJlbCIsInVuZGVmaW5lZCIsIk51bWJlciIsImRpc3RhbmNlIiwiYWdncm9iamVjdCIsImRpYURhdGEiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwieCIsInkiLCJQYWdlIiwicXVlcnlQYXJhbXMiLCJzZXRRdWVyeVBhcmFtcyIsImFjdGl2aXRpZXMiLCJzZXRBY3Rpdml0aWVzIiwicGVyX3BhZ2UiLCJwYWdlIiwicmVzdWx0IiwicmVzdWx0Q2h1bmsiLCJhZGRQYXJhbXMiLCJnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YSIsImZpbmQiLCJhdXRoSW5mbyIsInVybCIsIlVSTCIsIkFjY2VwdCIsImFjY2Vzc190b2tlbiIsIk1haW5wYWdlIiwic3RhcnRSZWRpcmVjdCIsIlJlZGlyZWN0VGFyZ2V0IiwiZGlzYWJsZVJlZGlyZWN0IiwiQXBwIiwic2V0U3RhcnRSZWRpcmVjdCIsInNpZ25PdXQiLCJyZW1vdmVJdGVtIiwiaXNUb2tlbkV4cGlyZWQiLCJ0b2tlbkV4cGlyZXNBdCIsInJlZnJlc2hUb2tlbiIsInRva2VuIiwicmVmcmVzaF90b2tlbiIsInJlc3BvbnNlIiwib2JqIiwib2JqZWN0IiwiZ2V0SXRlbSIsImV4cGlyZXNfYXQiLCJuZXdEYXRhIiwibmV3T2JqZWN0IiwiTWFwIiwiZG9jdW1lbnQiLCJocmVmIiwicmVuZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaWduSW4iLCJBdmF0YXIiLCJsaW5rIiwiVXNlck5hbWUiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsIkhlYWRlckF1dGhJbmZvIiwiZGlzcGxheVVzZXJJbmZvIiwiYXRobGV0ZSIsInByb2ZpbGUiLCJOYXYiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==