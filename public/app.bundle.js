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
      });
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
  setAuthData
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, authData.status == "unauthorized" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Unauthorized, {
    setAuthData: setAuthData
  }) : null, authData.status == "authorized" ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Page, {
    authData: authData
  }) : null);
}

function App() {
  const [authData, setAuthData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    status: "unauthorized",
    stravaAuthInfo: {}
  }); //["unauthorized", "authorized", "processing"]

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
      setAuthData: setAuthData
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQSxNQUFNZSxNQUFNLEdBQUcsQ0FDWDtBQUFDQyxFQUFBQSxJQUFJLEVBQUUsYUFBUDtBQUFzQkMsRUFBQUEsTUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLEtBQVI7QUFBOUIsQ0FEVyxFQUVYO0FBQUNELEVBQUFBLElBQUksRUFBRSxnQkFBUDtBQUF5QkMsRUFBQUEsTUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLEtBQVI7QUFBakMsQ0FGVyxFQUdYO0FBQUNELEVBQUFBLElBQUksRUFBRSxnQkFBUDtBQUF5QkMsRUFBQUEsTUFBTSxFQUFFLENBQUMsS0FBRCxFQUFRLEtBQVI7QUFBakMsQ0FIVyxFQUlYO0FBQUNELEVBQUFBLElBQUksRUFBRSxVQUFQO0FBQW1CQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUjtBQUEzQixDQUpXLENBQWY7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkQsTUFBaEIsRUFBd0JFLEtBQXhCLEVBQStCQyxNQUFNLEdBQUMsSUFBdEMsRUFBNEM7QUFDeEMsTUFBSUMsSUFBSSxHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVUQsSUFBSSxDQUFDRSxHQUFMLENBQVNQLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBVUUsS0FBSyxDQUFDRixNQUFOLENBQWEsQ0FBYixDQUFuQixFQUFvQyxDQUFwQyxJQUF5Q0ssSUFBSSxDQUFDRSxHQUFMLENBQVNQLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBVUUsS0FBSyxDQUFDRixNQUFOLENBQWEsQ0FBYixDQUFuQixFQUFvQyxDQUFwQyxDQUFuRCxDQUFYO0FBQ0EsU0FBUUksSUFBSSxHQUFHRCxNQUFmO0FBQ0g7O0FBRUQsU0FBU0ssWUFBVCxDQUFzQjtBQUFDQyxFQUFBQTtBQUFELENBQXRCLEVBQXFDO0FBQ2pDO0FBQ0Esc0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSSxxRkFESixlQUVJLDRkQUZKLGVBR0k7QUFBUSxXQUFPLEVBQUUsTUFBTTtBQUNuQkEsTUFBQUEsV0FBVyxDQUFDO0FBQUNDLFFBQUFBLE1BQU0sRUFBRTtBQUFULE9BQUQsQ0FBWDtBQUNBQyxNQUFBQSxZQUFZO0FBQ1g7QUFITCwwR0FISixDQURKO0FBV0g7O0FBRUQsU0FBU0MsYUFBVCxDQUF1QjtBQUFFQyxFQUFBQSxRQUFGO0FBQVlDLEVBQUFBO0FBQVosQ0FBdkIsRUFBaUQ7QUFDN0M7QUFDQSxNQUFJQyxRQUFRLEdBQUd2Qiw2REFBVyxFQUExQjtBQUNBLE1BQUl3QixRQUFRLEdBQUd2Qiw2REFBVyxFQUExQjs7QUFDQSxNQUFJb0IsUUFBUSxDQUFDSCxNQUFULElBQW1CLFlBQXZCLEVBQXFDO0FBQ2pDTSxJQUFBQSxRQUFRLENBQUMsR0FBRCxDQUFSO0FBQ0g7O0FBQ0QsTUFBSUMsTUFBTSxHQUFHLElBQUl2QiwwREFBSixDQUFvQnFCLFFBQVEsQ0FBQ0csTUFBN0IsQ0FBYjtBQUNBLE1BQUlDLFVBQVUsR0FBR0YsTUFBTSxDQUFDRyxHQUFQLENBQVcsTUFBWCxDQUFqQixDQVI2QyxDQVFSOztBQUNyQyxRQUFNQyxJQUFJLEdBQUc7QUFBQ0MsSUFBQUEsSUFBSSxFQUFFSDtBQUFQLEdBQWI7O0FBRUEsaUJBQWVJLGFBQWYsR0FBK0I7QUFDM0IsUUFBSVYsUUFBUSxDQUFDSCxNQUFULEtBQW9CLFlBQXhCLEVBQXNDO0FBQzlCYyxNQUFBQSxLQUFLLENBQUMsdUJBQUQsRUFBMEI7QUFDL0JDLFFBQUFBLE1BQU0sRUFBRSxNQUR1QjtBQUUvQkMsUUFBQUEsT0FBTyxFQUFFO0FBQUUsMEJBQWdCO0FBQWxCLFNBRnNCO0FBRy9CQyxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUixJQUFmO0FBSHlCLE9BQTFCLENBQUwsQ0FLQ1MsSUFMRCxDQUtNQyxHQUFHLElBQUlBLEdBQUcsQ0FBQ0MsSUFBSixFQUxiLEVBTUNGLElBTkQsQ0FNTUMsR0FBRyxJQUFJO0FBQ1RFLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDJCQUFaLEVBQXlDSCxHQUF6QztBQUNBSSxRQUFBQSxZQUFZLENBQUNDLE9BQWIsQ0FBc0IsZ0JBQXRCLEVBQXdDUixJQUFJLENBQUNDLFNBQUwsQ0FBZUUsR0FBZixDQUF4QztBQUNBakIsUUFBQUEsVUFBVSxDQUFDO0FBQUNKLFVBQUFBLE1BQU0sRUFBRSxjQUFUO0FBQXlCMkIsVUFBQUEsY0FBYyxFQUFFTjtBQUF6QyxTQUFELENBQVYsQ0FIUyxDQUdrRDs7QUFDM0RmLFFBQUFBLFFBQVEsQ0FBQyxHQUFELENBQVI7QUFDSCxPQVhEO0FBWUgsS0FiTCxNQWFXLENBQ0g7QUFDSDtBQUNSOztBQUVEL0IsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNc0MsYUFBYSxFQUFwQixFQUF3QixFQUF4QixDQUFUO0FBRUEsc0JBQ0ksMkVBQ0kscUZBREosQ0FESjtBQUtIOztBQUVELFNBQVNlLFlBQVQsQ0FBc0I7QUFBQ0MsRUFBQUE7QUFBRCxDQUF0QixFQUEwQztBQUN0QyxRQUFNLENBQUNDLE1BQUQsRUFBU0MsU0FBVCxJQUFzQnpELCtDQUFRLENBQUMsWUFBRCxDQUFwQyxDQURzQyxDQUNjOztBQUNwRCxRQUFNLENBQUMwRCxLQUFELEVBQVFDLFFBQVIsSUFBb0IzRCwrQ0FBUSxDQUFDLFlBQUQsQ0FBbEM7QUFFQUMsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ1osUUFBSTJELElBQUksR0FBRyxJQUFJQyxJQUFKLEVBQVg7QUFDQSxRQUFJQyxLQUFLLEdBQUksSUFBSUQsSUFBSixDQUFVQSxJQUFJLENBQUNFLEdBQUwsS0FBYSxVQUF2QixDQUFiO0FBQ0FOLElBQUFBLFNBQVMsQ0FBQ0csSUFBSSxDQUFDSSxXQUFMLEdBQW1CQyxLQUFuQixDQUF5QixHQUF6QixFQUE4QixDQUE5QixDQUFELENBQVQ7QUFDQU4sSUFBQUEsUUFBUSxDQUFDRyxLQUFLLENBQUNFLFdBQU4sR0FBb0JDLEtBQXBCLENBQTBCLEdBQTFCLEVBQStCLENBQS9CLENBQUQsQ0FBUjtBQUVILEdBTlEsRUFNUCxFQU5PLENBQVQ7O0FBUUEsV0FBU0MsYUFBVCxDQUF1QkMsQ0FBdkIsRUFBMEI7QUFDdEJWLElBQUFBLFNBQVMsQ0FBQ1UsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLEtBQVYsQ0FBVDtBQUNIOztBQUVELFdBQVNDLGVBQVQsQ0FBeUJILENBQXpCLEVBQTRCO0FBQ3hCUixJQUFBQSxRQUFRLENBQUNRLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxLQUFWLENBQVI7QUFDSDs7QUFFRCxXQUFTRSxZQUFULENBQXNCSixDQUF0QixFQUF5QjtBQUNyQkEsSUFBQUEsQ0FBQyxDQUFDSyxjQUFGO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLENBQUNaLElBQUksQ0FBQ2EsS0FBTCxDQUFXbEIsTUFBWCxJQUFxQixJQUF0QixFQUE0Qm1CLFFBQTVCLEVBQWpCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLENBQUNmLElBQUksQ0FBQ2EsS0FBTCxDQUFXaEIsS0FBWCxJQUFvQixJQUFyQixFQUEyQmlCLFFBQTNCLEVBQWhCO0FBQ0EsUUFBSUUsUUFBUSxHQUFHO0FBQ1hyQixNQUFBQSxNQUFNLEVBQUVpQixVQURHO0FBRVhmLE1BQUFBLEtBQUssRUFBRWtCO0FBRkksS0FBZjtBQUlBckIsSUFBQUEsZ0JBQWdCLENBQUNzQixRQUFELENBQWhCLENBUnFCLENBU3JCO0FBQ0E7QUFDSDs7QUFFRCxzQkFDSTtBQUFNLGFBQVMsRUFBQztBQUFoQixrQkFDSSxnRkFDSSxpSUFESixlQUVJO0FBQU8sUUFBSSxFQUFDLE1BQVo7QUFBbUIsTUFBRSxFQUFDLE9BQXRCO0FBQThCLFFBQUksRUFBQyxnQkFBbkM7QUFDSSxTQUFLLEVBQUVuQixLQURYO0FBQ2tCLFlBQVEsRUFBRVksZUFENUI7QUFFSSxPQUFHLEVBQUM7QUFGUixJQUZKLGVBS0ksMkhBTEosZUFNSTtBQUFPLFFBQUksRUFBQyxNQUFaO0FBQW1CLE1BQUUsRUFBQyxLQUF0QjtBQUE0QixRQUFJLEVBQUMsaUJBQWpDO0FBQ0ksU0FBSyxFQUFFZCxNQURYO0FBQ21CLFlBQVEsRUFBRVUsYUFEN0I7QUFFSSxPQUFHLEVBQUM7QUFGUixJQU5KLENBREosZUFXSTtBQUFRLFFBQUksRUFBQyxRQUFiO0FBQXNCLFdBQU8sRUFBRUs7QUFBL0Isc0NBWEosQ0FESjtBQWdCSDs7QUFFRCxTQUFTTyxXQUFULENBQXFCO0FBQUNDLEVBQUFBO0FBQUQsSUFBZSxFQUFwQyxFQUF3QztBQUNwQyxzQkFDSSwyRUFDSSw4R0FBZUEsVUFBVSxDQUFDQyxNQUExQixNQURKLEVBRUtELFVBQVUsQ0FBQ0UsR0FBWCxDQUFlLENBQUNsQyxHQUFELEVBQU1tQyxDQUFOLGtCQUNaO0FBQUssYUFBUyxFQUFDLGFBQWY7QUFBNkIsT0FBRyxFQUFFQTtBQUFsQyxLQUNLbkMsR0FBRyxDQUFDb0MsVUFBSixDQUFlbEIsS0FBZixDQUFxQixHQUFyQixFQUEwQixDQUExQixDQURMLFNBQ3NDbEIsR0FBRyxDQUFDaEMsSUFEMUMsU0FDbURnQyxHQUFHLENBQUNxQyxpQkFEdkQsU0FDNkVyQyxHQUFHLENBQUNzQyxZQUFKLENBQWlCLENBQWpCLENBRDdFLFFBQ29HdEMsR0FBRyxDQUFDc0MsWUFBSixDQUFpQixDQUFqQixDQURwRyxDQURILENBRkwsQ0FESjtBQVNIOztBQUVELFNBQVNDLHFCQUFULENBQStCO0FBQUNDLEVBQUFBO0FBQUQsQ0FBL0IsRUFBaUQ7QUFDN0MsUUFBTSxDQUFDQyxLQUFELEVBQVFDLFFBQVIsSUFBb0J6RiwrQ0FBUSxDQUFDLEVBQUQsQ0FBbEM7O0FBQ0EsV0FBUzBGLDZCQUFULENBQXVDckQsSUFBSSxHQUFHLEVBQTlDLEVBQWtEO0FBQzlDO0FBQ0EsUUFBSXNELFlBQVksR0FBRyxFQUFuQjtBQUVBdEQsSUFBQUEsSUFBSSxDQUFDdUQsT0FBTCxDQUFhQyxFQUFFLElBQUk7QUFDZixVQUFJRixZQUFZLENBQUNFLEVBQUUsQ0FBQ1QsaUJBQUosQ0FBWixJQUFzQ1UsU0FBMUMsRUFBcURILFlBQVksQ0FBQ0UsRUFBRSxDQUFDVCxpQkFBSixDQUFaLEdBQXFDLENBQXJDO0FBQ3JETyxNQUFBQSxZQUFZLENBQUNFLEVBQUUsQ0FBQ1QsaUJBQUosQ0FBWixJQUFzQ1csTUFBTSxDQUFDRixFQUFFLENBQUNHLFFBQUosQ0FBNUM7QUFDSCxLQUhEO0FBS0EsV0FBT0wsWUFBUDtBQUNIOztBQUNEMUYsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ1osUUFBSWdHLFVBQVUsR0FBR1AsNkJBQTZCLENBQUNILGNBQUQsQ0FBOUM7QUFDQXRDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUJxQyxjQUF6QjtBQUNBdEMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksUUFBWixFQUFzQitDLFVBQXRCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUgsVUFBWixFQUF3QmhCLEdBQXhCLENBQTZCb0IsR0FBRCxJQUFTO0FBQzlDLGFBQU87QUFBQ0MsUUFBQUEsQ0FBQyxFQUFFRCxHQUFKO0FBQVNFLFFBQUFBLENBQUMsRUFBRU4sVUFBVSxDQUFDSSxHQUFEO0FBQXRCLE9BQVA7QUFDSixLQUZhLENBQWQ7QUFHQVosSUFBQUEsUUFBUSxDQUFDUyxPQUFELENBQVI7QUFDQWpELElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUJnRCxPQUF6QjtBQUNILEdBVFEsRUFTTixDQUFDWCxjQUFELENBVE0sQ0FBVCxDQWI2QyxDQXdCN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFDSSw4REFDS0MsS0FBSyxDQUFDUixNQUFOLGdCQUFlLDZQQUFmLEdBQTZELElBRGxFLGVBRUksaURBQUMsbURBQUQ7QUFDSSxRQUFJLEVBQUVRLEtBRFY7QUFFSSxjQUFVLEVBQUUsQ0FBQyxXQUFELEVBQWMsY0FBZCxFQUE4QixZQUE5QixFQUE0QyxXQUE1QyxFQUF5RCxNQUF6RCxDQUZoQjtBQUdJLFVBQU0sRUFBRTtBQUhaLElBRkosQ0FESjtBQVVIOztBQUVELFNBQVNnQixJQUFULENBQWM7QUFBRTNFLEVBQUFBO0FBQUYsQ0FBZCxFQUE0QjtBQUN4QixRQUFNLENBQUM0RSxXQUFELEVBQWNDLGNBQWQsSUFBZ0MxRywrQ0FBUSxDQUFDO0FBQUN3RCxJQUFBQSxNQUFNLEVBQUUsWUFBVDtBQUF1QkUsSUFBQUEsS0FBSyxFQUFFO0FBQTlCLEdBQUQsQ0FBOUM7QUFDQSxRQUFNLENBQUNpRCxVQUFELEVBQWFDLGFBQWIsSUFBOEI1RywrQ0FBUSxDQUFDLEVBQUQsQ0FBNUM7O0FBRUEsaUJBQWV1RCxnQkFBZixDQUFnQ3RCLE1BQWhDLEVBQXdDO0FBQ3BDeUUsSUFBQUEsY0FBYyxDQUFDekUsTUFBRCxDQUFkO0FBQ0EsUUFBSTRFLFFBQVEsR0FBRyxFQUFmO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLENBQVg7QUFDQSxRQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUNBLFFBQUlDLFdBQVcsR0FBRyxFQUFsQjs7QUFDQSxPQUFHO0FBQ0MsVUFBSUMsU0FBUyxHQUFHO0FBQUNKLFFBQUFBLFFBQVEsRUFBRUEsUUFBUSxDQUFDbEMsUUFBVCxFQUFYO0FBQWdDbUMsUUFBQUEsSUFBSSxFQUFFQSxJQUFJLENBQUNuQyxRQUFMO0FBQXRDLE9BQWhCO0FBQ0ExQyxNQUFBQSxNQUFNLEdBQUcsRUFBQyxHQUFHQSxNQUFKO0FBQVksV0FBR2dGO0FBQWYsT0FBVCxDQUZELENBR0M7O0FBQ0FELE1BQUFBLFdBQVcsR0FBRyxNQUFNRSx1QkFBdUIsQ0FBQ2pGLE1BQUQsQ0FBM0M7QUFDQThFLE1BQUFBLE1BQU0sR0FBRyxDQUFDLEdBQUdBLE1BQUosRUFBWSxHQUFHQyxXQUFmLENBQVQ7QUFDQUYsTUFBQUEsSUFBSSxJQUFJLENBQVI7QUFDSCxLQVBELFFBUUlFLFdBQVcsQ0FBQ2hDLE1BQVosSUFBc0I2QixRQVIxQjs7QUFVQUUsSUFBQUEsTUFBTSxDQUFDbkIsT0FBUCxDQUFlN0MsR0FBRyxJQUFJO0FBQ2xCLFVBQUk3QixLQUFLLEdBQUdKLE1BQU0sQ0FBQ3FHLElBQVAsQ0FBWWpHLEtBQUssSUFBSUQsTUFBTSxDQUFDOEIsR0FBRyxDQUFDc0MsWUFBTCxFQUFtQm5FLEtBQW5CLENBQTNCLENBQVo7O0FBQ0EsVUFBSUEsS0FBSixFQUFXO0FBQ1A2QixRQUFBQSxHQUFHLENBQUNxQyxpQkFBSixHQUF3QmxFLEtBQUssQ0FBQ0gsSUFBOUI7QUFDSCxPQUZELE1BRU87QUFDSGdDLFFBQUFBLEdBQUcsQ0FBQ3FDLGlCQUFKLEdBQXdCLFlBQXhCO0FBQ0g7QUFDSixLQVBEO0FBU0F3QixJQUFBQSxhQUFhLENBQUNHLE1BQUQsQ0FBYjtBQUVIOztBQUlELE1BQUlLLFFBQVEsR0FBR3ZGLFFBQVEsQ0FBQ3dCLGNBQXhCOztBQUVBLGlCQUFlNkQsdUJBQWYsQ0FBdUNqRixNQUF2QyxFQUErQztBQUMzQztBQUNBLFFBQUlvRixHQUFHLEdBQUcsSUFBSUMsR0FBSixDQUFRLGtEQUFSLENBQVYsQ0FGMkMsQ0FHM0M7O0FBQ0FELElBQUFBLEdBQUcsQ0FBQ25GLE1BQUosR0FBYSxJQUFJeEIsMERBQUosQ0FBb0J1QixNQUFwQixFQUE0QjBDLFFBQTVCLEVBQWI7QUFFQSxRQUFJdEMsSUFBSSxHQUFHLE1BQU1HLEtBQUssQ0FBQzZFLEdBQUQsRUFDdEI7QUFDSTVFLE1BQUFBLE1BQU0sRUFBRSxLQURaO0FBRUlDLE1BQUFBLE9BQU8sRUFBRTtBQUNMNkUsUUFBQUEsTUFBTSxFQUFFLGtCQURIO0FBRUwzRixRQUFBQSxhQUFhLEVBQUcsVUFBU3dGLFFBQVEsQ0FBQ0ksWUFBYTtBQUYxQztBQUZiLEtBRHNCLENBQXRCO0FBU0EsUUFBSVQsTUFBTSxHQUFHLE1BQU0xRSxJQUFJLENBQUNXLElBQUwsRUFBbkIsQ0FmMkMsQ0FnQjNDOztBQUNBLFdBQU8rRCxNQUFQO0FBQ0g7O0FBRUQsc0JBQ0ksMkVBQ0ksaURBQUMsWUFBRDtBQUFjLG9CQUFnQixFQUFFeEQ7QUFBaEMsSUFESixFQUVLb0QsVUFBVSxnQkFBRyxpREFBQyxxQkFBRDtBQUF1QixrQkFBYyxFQUFFQTtBQUF2QyxJQUFILEdBQTBELElBRnpFLGVBR0ksaURBQUMsV0FBRDtBQUFhLGNBQVUsRUFBRUE7QUFBekIsSUFISixDQURKO0FBUUg7O0FBRUQsU0FBU2MsUUFBVCxDQUFrQjtBQUFFNUYsRUFBQUEsUUFBRjtBQUFZSixFQUFBQTtBQUFaLENBQWxCLEVBQTZDO0FBQ3pDLHNCQUNJLDhEQUNLSSxRQUFRLENBQUNILE1BQVQsSUFBbUIsY0FBbkIsZ0JBQW9DLGlEQUFDLFlBQUQ7QUFBYyxlQUFXLEVBQUVEO0FBQTNCLElBQXBDLEdBQWlGLElBRHRGLEVBRUtJLFFBQVEsQ0FBQ0gsTUFBVCxJQUFtQixZQUFuQixnQkFBa0MsaURBQUMsSUFBRDtBQUFNLFlBQVEsRUFBRUc7QUFBaEIsSUFBbEMsR0FBaUUsSUFGdEUsQ0FESjtBQU9IOztBQUdELFNBQVM2RixHQUFULEdBQWU7QUFDWCxRQUFNLENBQUM3RixRQUFELEVBQVdKLFdBQVgsSUFBMEJ6QiwrQ0FBUSxDQUFDO0FBQUMwQixJQUFBQSxNQUFNLEVBQUUsY0FBVDtBQUF5QjJCLElBQUFBLGNBQWMsRUFBRTtBQUF6QyxHQUFELENBQXhDLENBRFcsQ0FDNkU7O0FBRXhGLFdBQVNzRSxPQUFULEdBQW1CO0FBQ2Z4RSxJQUFBQSxZQUFZLENBQUN5RSxVQUFiLENBQXdCLGdCQUF4QixFQURlLENBRWY7QUFDSDs7QUFFRCxXQUFTQyxjQUFULENBQXdCQyxjQUF4QixFQUF3QztBQUNwQyxRQUFLLElBQUlqRSxJQUFKLENBQVNpRSxjQUFjLEdBQUcsSUFBMUIsSUFBa0NqRSxJQUFJLENBQUNFLEdBQUwsRUFBbkMsR0FBaUQsQ0FBckQsRUFBeUQ7QUFDckQsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUdLLE9BQU8sS0FBUDtBQUNSOztBQUVELGlCQUFlZ0UsWUFBZixDQUE0QkMsS0FBNUIsRUFBbUM7QUFDL0IsUUFBSTNGLElBQUksR0FBRztBQUFDNEYsTUFBQUEsYUFBYSxFQUFFRDtBQUFoQixLQUFYO0FBQ0EsUUFBSUUsUUFBUSxHQUFHLE1BQU0xRixLQUFLLENBQUMsbUJBQUQsRUFBc0I7QUFDNUNDLE1BQUFBLE1BQU0sRUFBRSxNQURvQztBQUU1Q0MsTUFBQUEsT0FBTyxFQUFFO0FBQUUsd0JBQWdCO0FBQWxCLE9BRm1DO0FBRzVDQyxNQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUixJQUFmO0FBSHNDLEtBQXRCLENBQTFCO0FBS0EsUUFBSTBFLE1BQU0sR0FBRyxNQUFNbUIsUUFBUSxDQUFDbEYsSUFBVCxFQUFuQixDQVArQixDQVEvQjs7QUFDQSxXQUFPK0QsTUFBUDtBQUNIOztBQUVEOUcsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ1o7QUFDQTtBQUNBLFFBQUk0QixRQUFRLENBQUN3QixjQUFULElBQTJCeUMsU0FBL0IsRUFBMEM7QUFBQztBQUFPLEtBQWxELE1BQ0ssSUFBSUssTUFBTSxDQUFDQyxJQUFQLENBQVl2RSxRQUFRLENBQUN3QixjQUFyQixFQUFxQzJCLE1BQXJDLEtBQWdELENBQWhELElBQXFEbkQsUUFBUSxDQUFDSCxNQUFULEtBQW9CLFlBQTdFLEVBQTJGO0FBQzVGLFVBQUl5RyxHQUFHLEdBQUcsRUFBQyxHQUFHdEcsUUFBSjtBQUFjSCxRQUFBQSxNQUFNLEVBQUU7QUFBdEIsT0FBVjtBQUNBRCxNQUFBQSxXQUFXLENBQUMwRyxHQUFELENBQVg7QUFDSDtBQUNKLEdBUlEsRUFRTixDQUFDdEcsUUFBRCxDQVJNLENBQVQ7QUFVQzVCLEVBQUFBLGdEQUFTLENBQUMsTUFBTTtBQUNiO0FBQ0EsUUFBSW1JLE1BQU0sR0FBR3hGLElBQUksQ0FBQzhCLEtBQUwsQ0FBV3ZCLFlBQVksQ0FBQ2tGLE9BQWIsQ0FBc0IsZ0JBQXRCLENBQVgsQ0FBYjs7QUFDQSxRQUFJRCxNQUFNLElBQUksSUFBZCxFQUFvQixDQUNwQjtBQUNDLEtBRkQsTUFFTyxJQUFJakMsTUFBTSxDQUFDQyxJQUFQLENBQVlnQyxNQUFaLEVBQW9CcEQsTUFBcEIsSUFBOEIsQ0FBbEMsRUFBb0MsQ0FDM0M7QUFDQyxLQUZNLE1BRUE7QUFDSC9CLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDa0YsTUFBakM7QUFDQW5GLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaLEVBQWlDMkUsY0FBYyxDQUFDTyxNQUFNLENBQUNFLFVBQVIsQ0FBL0M7O0FBQ0EsVUFBSVQsY0FBYyxDQUFDTyxNQUFNLENBQUNFLFVBQVIsQ0FBbEIsRUFBdUM7QUFDbkNyRixRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQ0FBWixFQUErQ2tGLE1BQU0sQ0FBQ0gsYUFBdEQ7QUFDQUYsUUFBQUEsWUFBWSxDQUFDSyxNQUFNLENBQUNILGFBQVIsQ0FBWixDQUNLbkYsSUFETCxDQUNVeUYsT0FBTyxJQUFJO0FBQ2J0RixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWixFQUEyQ3FGLE9BQTNDO0FBQ0EsY0FBSUMsU0FBUyxHQUFHLEVBQUUsR0FBR0osTUFBTDtBQUFhLGVBQUdHO0FBQWhCLFdBQWhCO0FBQ0F0RixVQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWixFQUEyQ3NGLFNBQTNDO0FBQ0EvRyxVQUFBQSxXQUFXLENBQUM7QUFBQ0MsWUFBQUEsTUFBTSxFQUFFLFlBQVQ7QUFBdUIyQixZQUFBQSxjQUFjLEVBQUVtRjtBQUF2QyxXQUFELENBQVg7QUFDQXJGLFVBQUFBLFlBQVksQ0FBQ0MsT0FBYixDQUFzQixnQkFBdEIsRUFBd0NSLElBQUksQ0FBQ0MsU0FBTCxDQUFlMkYsU0FBZixDQUF4QztBQUNILFNBUEw7QUFRSCxPQVZELE1BVU87QUFDSC9HLFFBQUFBLFdBQVcsQ0FBQztBQUFDQyxVQUFBQSxNQUFNLEVBQUUsWUFBVDtBQUF1QjJCLFVBQUFBLGNBQWMsRUFBRStFO0FBQXZDLFNBQUQsQ0FBWDtBQUNIO0FBQ0o7QUFDSixHQXhCUyxFQXdCUCxFQXhCTyxDQUFUO0FBMkJELHNCQUNJLGlIQUNJLGlEQUFDLDJEQUFELHFCQUNJLGlEQUFDLG1EQUFEO0FBQVEsWUFBUSxFQUFFdkcsUUFBbEI7QUFBNEIsV0FBTyxFQUFFOEYsT0FBckM7QUFBOEMsVUFBTSxFQUFFaEc7QUFBdEQsSUFESixlQUVJLGlEQUFDLG9EQUFELHFCQUNJLGlEQUFDLG1EQUFEO0FBQU8sUUFBSSxFQUFDLEdBQVo7QUFBZ0IsV0FBTyxlQUFFLGlEQUFDLFFBQUQ7QUFBVSxjQUFRLEVBQUVFLFFBQXBCO0FBQThCLGlCQUFXLEVBQUVKO0FBQTNDO0FBQXpCLElBREosZUFFSSxpREFBQyxtREFBRDtBQUFPLFFBQUksRUFBQyxNQUFaO0FBQW1CLFdBQU8sZUFBRSxpREFBQyxhQUFEO0FBQWUsY0FBUSxFQUFFSSxRQUF6QjtBQUFtQyxnQkFBVSxFQUFFSjtBQUEvQztBQUE1QixJQUZKLGVBR0ksaURBQUMsbURBQUQ7QUFBTyxRQUFJLEVBQUMsS0FBWjtBQUFrQixXQUFPLGVBQUUsaURBQUMsR0FBRDtBQUEzQixJQUhKLENBRkosQ0FESixDQURKO0FBWUg7O0FBRUQsTUFBTWdILEdBQUcsR0FBRyxNQUFNO0FBQ2Qsc0JBQU8sNkpBQVA7QUFDSCxDQUZEOztBQU1BLFNBQVM5RyxZQUFULEdBQXdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBK0csRUFBQUEsUUFBUSxDQUFDM0csUUFBVCxDQUFrQjRHLElBQWxCLEdBQXlCL0gsbURBQXpCO0FBQ0g7O0FBRURWLDZDQUFBLGVBQWdCLGlEQUFDLEdBQUQsT0FBaEIsRUFBeUJ3SSxRQUFRLENBQUNHLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBekI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFdBO0FBQ0E7QUFFZSxTQUFTaEksTUFBVCxDQUFnQjtBQUFFZ0IsRUFBQUEsUUFBRjtBQUFZOEYsRUFBQUEsT0FBWjtBQUFxQm1CLEVBQUFBO0FBQXJCLENBQWhCLEVBQStDO0FBQzFELHNCQUNJO0FBQVEsYUFBUyxFQUFDO0FBQWxCLGtCQUNJO0FBQUssYUFBUyxFQUFDO0FBQWYsa0JBQ0k7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDSSxpREFBQyxjQUFEO0FBQWdCLFlBQVEsRUFBRWpILFFBQTFCO0FBQW9DLFdBQU8sRUFBRThGLE9BQTdDO0FBQXNELFVBQU0sRUFBRW1CO0FBQTlELElBREosZUFFSSxpREFBQyxHQUFELE9BRkosQ0FESixDQURKLENBREo7QUFVSDs7QUFFRCxNQUFNQyxNQUFNLEdBQUcsQ0FBQztBQUFDQyxFQUFBQTtBQUFELENBQUQsS0FBWTtBQUN2QixzQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNJO0FBQUssT0FBRyxFQUFFQSxJQUFJLElBQUk7QUFBbEIsSUFESixDQURKO0FBS0gsQ0FORDs7QUFRQSxNQUFNQyxRQUFRLEdBQUcsQ0FBQztBQUFDQyxFQUFBQSxTQUFEO0FBQVlDLEVBQUFBO0FBQVosQ0FBRCxLQUEyQjtBQUN4QyxzQkFBTztBQUFNLGFBQVMsRUFBQztBQUFoQixLQUFtQ0QsU0FBUyxJQUFJLEVBQWhELE9BQXFEQyxRQUFRLElBQUksRUFBakUsQ0FBUDtBQUNILENBRkQ7O0FBS0EsU0FBU0MsY0FBVCxDQUF3QjtBQUFFdkgsRUFBQUEsUUFBRjtBQUFZOEYsRUFBQUEsT0FBWjtBQUFxQm1CLEVBQUFBO0FBQXJCLENBQXhCLEVBQXVEO0FBQ25ELE1BQUkxQixRQUFRLEdBQUd2RixRQUFRLENBQUN3QixjQUF4QjtBQUNBLE1BQUlnRyxlQUFlLEdBQUl4SCxRQUFRLENBQUNILE1BQVQsSUFBbUIsWUFBMUM7QUFDQSxzQkFDSTtBQUFLLGFBQVMsRUFBQztBQUFmLEtBQ0sySCxlQUFlLGdCQUNaLGlIQUNJLGlEQUFDLE1BQUQ7QUFBUSxRQUFJLEVBQUVqQyxRQUFRLENBQUNrQyxPQUFULENBQWlCQztBQUEvQixJQURKLGVBRUksaURBQUMsUUFBRDtBQUFVLGFBQVMsRUFBRW5DLFFBQVEsQ0FBQ2tDLE9BQVQsQ0FBaUJKLFNBQXRDO0FBQWlELFlBQVEsRUFBRTlCLFFBQVEsQ0FBQ2tDLE9BQVQsQ0FBaUJIO0FBQTVFLElBRkosZUFHSTtBQUFRLFdBQU8sRUFBRXhCO0FBQWpCLHNDQUhKLENBRFksZ0JBTVY7QUFBUSxXQUFPLEVBQUVtQjtBQUFqQixzQ0FQVixDQURKO0FBWUg7O0FBRUQsTUFBTVUsR0FBRyxHQUFHLE1BQU07QUFDZCxzQkFDSSwyRUFDQSxpREFBQyxrREFBRDtBQUFNLE1BQUUsRUFBQztBQUFULFlBREEsT0FDMEIsR0FEMUIsZUFFQSxpREFBQyxrREFBRDtBQUFNLE1BQUUsRUFBQztBQUFULHNDQUZBLENBREo7QUFNSCxDQVBEOzs7Ozs7Ozs7O0FDOUNBLE1BQU01SSxvQkFBb0IsR0FBRywwS0FBN0IsRUFDQTs7QUFDQTZJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjlJLG9CQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxpREFBaUQsbUNBQW1DLCtCQUErQixpQ0FBaUMsNkJBQTZCLDBCQUEwQixLQUFLLFVBQVUsc0JBQXNCLHNCQUFzQixnQ0FBZ0MsNEJBQTRCLGdEQUFnRCxrQ0FBa0MsZ0NBQWdDLEtBQUssa0JBQWtCLHNCQUFzQixvQkFBb0IseUJBQXlCLHNCQUFzQixnQ0FBZ0MsNEJBQTRCLCtCQUErQixvREFBb0Qsb0JBQW9CLHlCQUF5Qix5QkFBeUIsMEJBQTBCLEtBQUssZUFBZSxzQkFBc0Isb0JBQW9CLHlCQUF5QixzQkFBc0IsZ0NBQWdDLHNDQUFzQyxLQUFLLGFBQWEsMkJBQTJCLHFCQUFxQixLQUFLLGdCQUFnQixpQ0FBaUMscUJBQXFCLHVCQUF1QixzQkFBc0IscUJBQXFCLDRCQUE0QixLQUFLLGlCQUFpQix3QkFBd0Isb0JBQW9CLGVBQWUsZ0JBQWdCLG9CQUFvQixxQkFBcUIsS0FBSyx1QkFBdUIsb0JBQW9CLDJCQUEyQixlQUFlLGdCQUFnQixvQkFBb0IscUJBQXFCLGlEQUFpRCxLQUFLLGtCQUFrQiwyQkFBMkIsbUJBQW1CLHNCQUFzQix1Q0FBdUMscUJBQXFCLDRCQUE0QixLQUFLLG1CQUFtQixrQ0FBa0Msc0JBQXNCLEtBQUssb0JBQW9CLHdCQUF3QixxQkFBcUIsS0FBSywwQkFBMEIsc0JBQXNCLDRCQUE0QixLQUFLLG9CQUFvQix1QkFBdUIsMkJBQTJCLDJCQUEyQix5QkFBeUIsS0FBSyx3QkFBd0Isd0JBQXdCLHVCQUF1QixLQUFLLDhCQUE4QixxQkFBcUIsMkNBQTJDLDJCQUEyQixLQUFLLDhCQUE4QixnQ0FBZ0MsS0FBSywyQkFBMkIscUJBQXFCLEtBQUssNkJBQTZCLG9CQUFvQixLQUFLLHNCQUFzQix1QkFBdUIseUJBQXlCLEtBQUssT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLE1BQU0sTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksaUNBQWlDLG1DQUFtQywrQkFBK0IsaUNBQWlDLDZCQUE2QiwwQkFBMEIsS0FBSyxVQUFVLHNCQUFzQixzQkFBc0IsZ0NBQWdDLDRCQUE0QixnREFBZ0Qsa0NBQWtDLGdDQUFnQyxLQUFLLGtCQUFrQixzQkFBc0Isb0JBQW9CLHlCQUF5QixzQkFBc0IsZ0NBQWdDLDRCQUE0QiwrQkFBK0Isb0RBQW9ELG9CQUFvQix5QkFBeUIseUJBQXlCLDBCQUEwQixLQUFLLGVBQWUsc0JBQXNCLG9CQUFvQix5QkFBeUIsc0JBQXNCLGdDQUFnQyxzQ0FBc0MsS0FBSyxhQUFhLDJCQUEyQixxQkFBcUIsS0FBSyxnQkFBZ0IsaUNBQWlDLHFCQUFxQix1QkFBdUIsc0JBQXNCLHFCQUFxQiw0QkFBNEIsS0FBSyxpQkFBaUIsd0JBQXdCLG9CQUFvQixlQUFlLGdCQUFnQixvQkFBb0IscUJBQXFCLEtBQUssdUJBQXVCLG9CQUFvQiwyQkFBMkIsZUFBZSxnQkFBZ0Isb0JBQW9CLHFCQUFxQixpREFBaUQsS0FBSyxrQkFBa0IsMkJBQTJCLG1CQUFtQixzQkFBc0IsdUNBQXVDLHFCQUFxQiw0QkFBNEIsS0FBSyxtQkFBbUIsa0NBQWtDLHNCQUFzQixLQUFLLG9CQUFvQix3QkFBd0IscUJBQXFCLEtBQUssMEJBQTBCLHNCQUFzQiw0QkFBNEIsS0FBSyxvQkFBb0IsdUJBQXVCLDJCQUEyQiwyQkFBMkIseUJBQXlCLEtBQUssd0JBQXdCLHdCQUF3Qix1QkFBdUIsS0FBSyw4QkFBOEIscUJBQXFCLDJDQUEyQywyQkFBMkIsS0FBSyw4QkFBOEIsZ0NBQWdDLEtBQUssMkJBQTJCLHFCQUFxQixLQUFLLDZCQUE2QixvQkFBb0IsS0FBSyxzQkFBc0IsdUJBQXVCLHlCQUF5QixLQUFLLG1CQUFtQjtBQUN6a007QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnZDLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQW1HO0FBQ25HO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsc0ZBQU87Ozs7QUFJNkM7QUFDckUsT0FBTyxpRUFBZSxzRkFBTyxJQUFJLDZGQUFjLEdBQUcsNkZBQWMsWUFBWSxFQUFDOzs7Ozs7O1VDMUI3RTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NKQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvQXBwLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvSGVhZGVyLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgVmljdG9yeVBpZSB9IGZyb20gXCJ2aWN0b3J5LXBpZVwiO1xyXG5pbXBvcnQgeyBMaW5rLCBSb3V0ZXMsIFJvdXRlLCBCcm93c2VyUm91dGVyLCB1c2VMb2NhdGlvbiwgdXNlTmF2aWdhdGUgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICd1cmwtc2VhcmNoLXBhcmFtcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBTVFJBVkFfR0VUX0NPREVfTElOSyBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyLmpzeCc7XHJcblxyXG5cclxuY29uc3QgUExBQ0VTID0gW1xyXG4gICAge25hbWU6ICfQnNC40YLQuNC90L4g0J/QsNGA0LonLCBsYXRsbmc6IFs1NS44NCwgMzcuMzddfSxcclxuICAgIHtuYW1lOiAn0JzQtdGJ0LXRgNGB0LrQuNC5INCf0LDRgNC6JywgbGF0bG5nOiBbNTUuNjYsIDM3LjQwXX0sXHJcbiAgICB7bmFtZTogJ9Ch0YLQsNC00LjQvtC9INCX0L7RgNC60LjQuScsIGxhdGxuZzogWzU1Ljg0LCAzNy4zMl19LFxyXG4gICAge25hbWU6ICfQntC00LjQvdGG0L7QstC+JywgbGF0bG5nOiBbNTUuNjksIDM3LjI1XX0sXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGlzTmVhcihsYXRsbmcsIHBsYWNlLCByYWRpdXM9MC4wNCkge1xyXG4gICAgbGV0IGRpc3QgPSBNYXRoLnNxcnQoTWF0aC5wb3cobGF0bG5nWzBdLXBsYWNlLmxhdGxuZ1swXSwgMikgKyBNYXRoLnBvdyhsYXRsbmdbMV0tcGxhY2UubGF0bG5nWzFdLCAyKSk7XHJcbiAgICByZXR1cm4gKGRpc3QgPCByYWRpdXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBVbmF1dGhvcml6ZWQoe3NldEF1dGhEYXRhfSkge1xyXG4gICAgLy/QntGC0L7QsdGA0LDQttCw0LXRgtGB0Y8g0L3QsCDRgdGC0LDRgNGC0L7QstC+0Lkg0YHRgtGA0LDQvdC40YbQtSDQtdGB0LvQuCDQutC70LjQtdC90YIg0L3QtSDQsNCy0YLQvtGA0LjQt9C+0LLQsNC9INCyINGB0YLRgNCw0LLQsFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd1bmF1dGgnPlxyXG4gICAgICAgICAgICA8ZGl2PlRoaXMgaXMgVW5hdXRob3JpemVkPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXY+0JLRiyDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3Riy4g0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDINCy0Ysg0L/QtdGA0LXQudC00ZHRgtC1INC90LAg0YHQsNC50YIgU3RyYXZhINC00LvRjyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LjwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIHNldEF1dGhEYXRhKHtzdGF0dXM6IFwicHJvY2Vzc2luZ1wifSk7XHJcbiAgICAgICAgICAgICAgICBhdXRoQXRTdHJhdmEoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfT7QkNCy0YLQvtGA0LjQt9C+0LLQsNGC0YzRgdGPINCyIFN0cmF2YTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBdXRob3JpemF0aW9uKHsgYXV0aERhdGEsIGhhbmRsZURhdGEgfSkge1xyXG4gICAgLy/QodGO0LTQsCDQv9GA0LjRhdC+0LTQuNGCINC/0LXRgNC10LDQtNGA0LXRgdCw0YbQuNGPINGB0L4g0YHRgtGA0LDQstGLINC4INC30LTQtdGB0Ywg0LzRiyDQv9C+0LvRg9GH0LDQtdC8INGC0L7QutC10L3RiyDQuCDQvtCx0L7Qt9C90LDRh9Cw0LXQvCDQsNCy0YLQvtGA0LjQt9Cw0YbQuNGOXHJcbiAgICBsZXQgbG9jYXRpb24gPSB1c2VMb2NhdGlvbigpO1xyXG4gICAgbGV0IG5hdmlnYXRlID0gdXNlTmF2aWdhdGUoKTtcclxuICAgIGlmIChhdXRoRGF0YS5zdGF0dXMgPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICBuYXZpZ2F0ZSgnLycpO1xyXG4gICAgfVxyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGxldCBjbGllbnRDb2RlID0gcGFyYW1zLmdldChcImNvZGVcIik7IC8vINCy0YvQtNC10LvQuNC70Lgg0LrQvtC0INC/0YDQuNGB0LvQsNC90L3Ri9C5INCh0YLRgNCw0LLQvtC5INC40Lcg0LDQtNGA0LXRgdCwXHJcbiAgICBjb25zdCBkYXRhID0ge2NvZGU6IGNsaWVudENvZGV9O1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoQXV0aEluZm8oKSB7XHJcbiAgICAgICAgaWYgKGF1dGhEYXRhLnN0YXR1cyAhPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvYXBpL2dldHRva2VuZnJvbWNvZGUnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmV0Y2hBdXRoSW5mbzogcmVzcG9uc2U6ICcsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gKFwiU3RyYXZhQXV0aEluZm9cIiwgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRGF0YSh7c3RhdHVzOiBcInVuYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzogcmVzfSk7IC8v0KfRgtC+0LHRiyDQuNC30LHQtdC20LDRgtGMINGA0LXRgNC10L3QtNC10YDQuNC90LPQsCDQoNC+0YPRgtC10YDQsCDQv9C+0LrQsCDRgdGC0LDRgtGD0YEg0L7RgdGC0LDQstC70Y/QtdC8IHVuYXV0aCwg0L7QsdGA0LDQsdC+0YLQsNC10Lwg0LIgQXBwXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGUoJy8nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9uYXZpZ2F0ZSgnLycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IGZldGNoQXV0aEluZm8oKSwgW10pO1xyXG4gIFxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMT5UaGlzIGlzIEF1dGhvcml6YXRpb248L2gxPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBBY3Rpdml0eUZvcm0oe2hhbmRsZUZvcm1TdWJtaXR9KSB7XHJcbiAgICBjb25zdCBbYmVmb3JlLCBzZXRCZWZvcmVdID0gdXNlU3RhdGUoJzIwMjEtMTAtMjAnKTsgLy97YWN0aXZpdHlCZWZvcmUsIGFjdGl2aXR5QWZ0ZXJ9XHJcbiAgICBjb25zdCBbYWZ0ZXIsIHNldEFmdGVyXSA9IHVzZVN0YXRlKCcyMDIxLTEwLTIwJyk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGUxID0gIG5ldyBEYXRlKCBEYXRlLm5vdygpIC0gNjcwMDAwMDAwMCApO1xyXG4gICAgICAgIHNldEJlZm9yZShkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSk7XHJcbiAgICAgICAgc2V0QWZ0ZXIoZGF0ZTEudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdKTtcclxuXHJcbiAgICB9LFtdKVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVuZERhdGUoZSkge1xyXG4gICAgICAgIHNldEJlZm9yZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RhcnREYXRlKGUpIHtcclxuICAgICAgICBzZXRBZnRlcihlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0IGRhdGVCZWZvcmUgPSAoRGF0ZS5wYXJzZShiZWZvcmUpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZGF0ZUFmdGVyID0gKERhdGUucGFyc2UoYWZ0ZXIpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZm9ybURhdGEgPSB7XHJcbiAgICAgICAgICAgIGJlZm9yZTogZGF0ZUJlZm9yZSxcclxuICAgICAgICAgICAgYWZ0ZXI6IGRhdGVBZnRlclxyXG4gICAgICAgIH1cclxuICAgICAgICBoYW5kbGVGb3JtU3VibWl0KGZvcm1EYXRhKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGDQn9C+0LvRg9GH0LjQvCDQtNCw0L3QvdGL0LUg0LzQtdC20LTRgyAke2RhdGVCZWZvcmV9INC4ICR7ZGF0ZUFmdGVyfWApO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Zvcm1EYXRhOiAnLCBmb3JtRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT0nYWN0aXZpdHktZm9ybSc+XHJcbiAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgIDxsZWdlbmQ+0JTQsNGC0LAg0L3QsNGH0LDQu9CwPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cInN0YXJ0XCIgbmFtZT1cImFjdGl2aXR5LWFmdGVyXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YWZ0ZXJ9IG9uQ2hhbmdlPXtoYW5kbGVTdGFydERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMjAxOC0wMS0wMVwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPtCU0LDRgtCwINC60L7QvdGG0LA8L2xlZ2VuZD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZW5kXCIgbmFtZT1cImFjdGl2aXR5LWJlZm9yZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2JlZm9yZX0gb25DaGFuZ2U9e2hhbmRsZUVuZERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMjAxOC0wMS0wMVwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0+0J3QsNC50YLQuDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNob3dSZXN1bHRzKHtyZXN1bHRMaXN0fSA9IFtdKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXY+0J3QsNC50LTQtdC90L46IHtyZXN1bHRMaXN0Lmxlbmd0aH0gPC9kaXY+XHJcbiAgICAgICAgICAgIHtyZXN1bHRMaXN0Lm1hcCgocmVzLCBpKSA9PiBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVzdWx0LWxpc3RcIiBrZXk9e2l9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtyZXMuc3RhcnRfZGF0ZS5zcGxpdCgnVCcpWzBdfSAtIHtyZXMubmFtZX0gLSB7cmVzLnN0cmF2YXZpc3VhbFBsYWNlfSAtIHtyZXMuc3RhcnRfbGF0bG5nWzBdfSwge3Jlcy5zdGFydF9sYXRsbmdbMV19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBTaG93QWdncmVnYXRlZFJlc3VsdHMoe2FjdGl2aXRpZXNMaXN0fSkge1xyXG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBmdW5jdGlvbiBhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZShkYXRhID0gW10pIHtcclxuICAgICAgICAvL9CQ0LPQs9GA0LXQs9C40YDRg9C10YIg0LDQutGC0LjQstC90L7RgdGC0Lgg0L/QviDQvNC10YHRgtCw0Lwg0Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC8INC00LjRgdGC0LDQvdGG0LjRj9C8LCDQvdCwINCy0YvRhdC+0LTQtSDQvtCx0YrQtdC60YJcclxuICAgICAgICBsZXQgcGxhY2VkaXN0b2JqID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgaWYgKHBsYWNlZGlzdG9ialtlbC5zdHJhdmF2aXN1YWxQbGFjZV0gPT0gdW5kZWZpbmVkKSBwbGFjZWRpc3RvYmpbZWwuc3RyYXZhdmlzdWFsUGxhY2VdID0gMDtcclxuICAgICAgICAgICAgcGxhY2VkaXN0b2JqW2VsLnN0cmF2YXZpc3VhbFBsYWNlXSArPSBOdW1iZXIoZWwuZGlzdGFuY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxhY2VkaXN0b2JqO1xyXG4gICAgfVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgYWdncm9iamVjdCA9IGFnZ3JlZ2F0ZVJlc3VsdHNQbGFjZURpc3RhbmNlKGFjdGl2aXRpZXNMaXN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWN0TGlzdDogJywgYWN0aXZpdGllc0xpc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZ2dyOiAnLCBhZ2dyb2JqZWN0KTtcclxuICAgICAgICBsZXQgZGlhRGF0YSA9IE9iamVjdC5rZXlzKGFnZ3JvYmplY3QpLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICByZXR1cm4ge3g6IGtleSwgeTogYWdncm9iamVjdFtrZXldfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRTdGF0ZShkaWFEYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGlhRGF0YTogJywgZGlhRGF0YSk7XHJcbiAgICB9LCBbYWN0aXZpdGllc0xpc3RdKTtcclxuXHJcbiAgICAvLyBjb25zdCBteURhdGEgPSBbXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEFcIiwgeTogOTAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEJcIiwgeTogNDAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIENcIiwgeTogMzAwIH0sXHJcbiAgICAvLyAgIF07XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtzdGF0ZS5sZW5ndGggPyA8aDE+0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0LrQuNC70L7QvNC10YLRgNCw0LbQsCDQv9C+INC80LXRgdGC0YM8L2gxPiA6IG51bGwgfVxyXG4gICAgICAgICAgICA8VmljdG9yeVBpZVxyXG4gICAgICAgICAgICAgICAgZGF0YT17c3RhdGV9XHJcbiAgICAgICAgICAgICAgICBjb2xvclNjYWxlPXtbXCJCdXJseVdvb2RcIiwgXCJMaWdodFNreUJsdWVcIiwgXCJMaWdodENvcmFsXCIsIFwiTGlnaHRQaW5rXCIsIFwiVGVhbFwiXX1cclxuICAgICAgICAgICAgICAgIHJhZGl1cz17MTAwfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBQYWdlKHsgYXV0aERhdGEgfSkgeyBcclxuICAgIGNvbnN0IFtxdWVyeVBhcmFtcywgc2V0UXVlcnlQYXJhbXNdID0gdXNlU3RhdGUoe2JlZm9yZTogJzE2Mzk4MzM2NDInLCBhZnRlcjogJzE2MzMwNDY0MDAnfSlcclxuICAgIGNvbnN0IFthY3Rpdml0aWVzLCBzZXRBY3Rpdml0aWVzXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVGb3JtU3VibWl0KHBhcmFtcykge1xyXG4gICAgICAgIHNldFF1ZXJ5UGFyYW1zKHBhcmFtcyk7XHJcbiAgICAgICAgbGV0IHBlcl9wYWdlID0gMzA7IFxyXG4gICAgICAgIGxldCBwYWdlID0gMTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IHJlc3VsdENodW5rID0gW107XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBsZXQgYWRkUGFyYW1zID0ge3Blcl9wYWdlOiBwZXJfcGFnZS50b1N0cmluZygpLCBwYWdlOiBwYWdlLnRvU3RyaW5nKCl9O1xyXG4gICAgICAgICAgICBwYXJhbXMgPSB7Li4ucGFyYW1zLCAuLi5hZGRQYXJhbXN9O1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJlc3VsdENodW5rID0gYXdhaXQgZ2V0QWN0aXZpdGllc0Zyb21TdHJhdmEocGFyYW1zKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gWy4uLnJlc3VsdCwgLi4ucmVzdWx0Q2h1bmtdO1xyXG4gICAgICAgICAgICBwYWdlICs9IDE7XHJcbiAgICAgICAgfSB3aGlsZSAoXHJcbiAgICAgICAgICAgIHJlc3VsdENodW5rLmxlbmd0aCA9PSBwZXJfcGFnZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2gocmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IHBsYWNlID0gUExBQ0VTLmZpbmQocGxhY2UgPT4gaXNOZWFyKHJlcy5zdGFydF9sYXRsbmcsIHBsYWNlKSk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0cmF2YXZpc3VhbFBsYWNlID0gcGxhY2UubmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdHJhdmF2aXN1YWxQbGFjZSA9ICfQndC10LjQt9Cy0LXRgdGC0L3Qvic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0QWN0aXZpdGllcyhyZXN1bHQpO1xyXG4gIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgbGV0IGF1dGhJbmZvID0gYXV0aERhdGEuc3RyYXZhQXV0aEluZm87XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0QWN0aXZpdGllc0Zyb21TdHJhdmEocGFyYW1zKSB7XHJcbiAgICAgICAgLy/Qv9GA0LjRgdC+0LXQtNC40L3Rj9C10Lwg0L/QsNGA0LDQvNC10YLRgNGLINC30LDQv9GA0L7RgdCwINC6INC+0YHQvdC+0LLQvdC+0LzRgyDQsNC00YDQtdGB0YMg0YDQtdGB0YPRgNGB0LBcclxuICAgICAgICBsZXQgdXJsID0gbmV3IFVSTCgnaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9hcGkvdjMvYXRobGV0ZS9hY3Rpdml0aWVzJyk7XHJcbiAgICAgICAgLy9sZXQgcGFyYW1zID0gcXVlcnlQYXJhbXM7XHJcbiAgICAgICAgdXJsLnNlYXJjaCA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zKS50b1N0cmluZygpO1xyXG4gXHJcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaCh1cmwsIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YXV0aEluZm8uYWNjZXNzX3Rva2VufWAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZGF0YS5qc29uKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxBY3Rpdml0eUZvcm0gaGFuZGxlRm9ybVN1Ym1pdD17aGFuZGxlRm9ybVN1Ym1pdH0vPlxyXG4gICAgICAgICAgICB7YWN0aXZpdGllcyA/IDxTaG93QWdncmVnYXRlZFJlc3VsdHMgYWN0aXZpdGllc0xpc3Q9e2FjdGl2aXRpZXN9Lz4gOiBudWxsfVxyXG4gICAgICAgICAgICA8U2hvd1Jlc3VsdHMgcmVzdWx0TGlzdD17YWN0aXZpdGllc30gLz5cclxuICAgICAgICAgICAgey8qIDxidXR0b24gb25DbGljaz17Z2V0QWN0aXZpdGllc0Zyb21TdHJhdmF9PtC/0L7Qu9GD0YfQuNGC0Ywg0LTQsNC90L3Ri9C1PC9idXR0b24+ICovfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gTWFpbnBhZ2UoeyBhdXRoRGF0YSwgc2V0QXV0aERhdGEgfSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICB7YXV0aERhdGEuc3RhdHVzID09IFwidW5hdXRob3JpemVkXCIgPyA8VW5hdXRob3JpemVkIHNldEF1dGhEYXRhPXtzZXRBdXRoRGF0YX0gLz4gOiBudWxsfVxyXG4gICAgICAgICAgICB7YXV0aERhdGEuc3RhdHVzID09IFwiYXV0aG9yaXplZFwiID8gPFBhZ2UgYXV0aERhdGE9e2F1dGhEYXRhfSAvPiA6IG51bGx9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gQXBwKCkge1xyXG4gICAgY29uc3QgW2F1dGhEYXRhLCBzZXRBdXRoRGF0YV0gPSB1c2VTdGF0ZSh7c3RhdHVzOiBcInVuYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzoge319KTsgLy9bXCJ1bmF1dGhvcml6ZWRcIiwgXCJhdXRob3JpemVkXCIsIFwicHJvY2Vzc2luZ1wiXVxyXG5cclxuICAgIGZ1bmN0aW9uIHNpZ25PdXQoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJTdHJhdmFBdXRoSW5mb1wiKTtcclxuICAgICAgICAvL3NldEF1dGhEYXRhKHtzdGF0dXM6IFwidW5hdXRob3JpemVkXCIsIHN0cmF2YUF1dGhJbmZvOiB7fX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVG9rZW5FeHBpcmVkKHRva2VuRXhwaXJlc0F0KSB7XHJcbiAgICAgICAgaWYgKChuZXcgRGF0ZSh0b2tlbkV4cGlyZXNBdCAqIDEwMDApIC0gRGF0ZS5ub3coKSkgPCAwICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVmcmVzaFRva2VuKHRva2VuKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB7cmVmcmVzaF90b2tlbjogdG9rZW59O1xyXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3JlZnJlc2h0b2tlbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygncmVmcmVzaFRva2VuOiByZXNwb25zZTogJywgcmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAvL9Cf0YDQvtCy0LXRgNGP0LXQvCwg0L/QvtGP0LLQuNC70LjRgdGMINC70Lgg0LTQsNC90L3Ri9C1INCyIHN0cmF2YUF1dGhJbmZvXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygn0J/RgNC+0LLQtdGA0Y/RjiDQvdCw0LvQuNGH0LjQtSDQtNCw0L3QvdGL0YUg0LIg0KHRgtGA0LDQstCw0JjQvdGE0L4nKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEuc3RyYXZhQXV0aEluZm8gPT0gdW5kZWZpbmVkKSB7cmV0dXJufVxyXG4gICAgICAgIGVsc2UgaWYgKE9iamVjdC5rZXlzKGF1dGhEYXRhLnN0cmF2YUF1dGhJbmZvKS5sZW5ndGggIT09IDAgJiYgYXV0aERhdGEuc3RhdHVzICE9PSBcImF1dGhvcml6ZWRcIikge1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gey4uLmF1dGhEYXRhLCBzdGF0dXM6IFwiYXV0aG9yaXplZFwifTtcclxuICAgICAgICAgICAgc2V0QXV0aERhdGEob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbYXV0aERhdGFdKTtcclxuXHJcbiAgICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdBcHAuINCY0LfQstC70LXQutCw0LXQvCDQtNCw0L3QvdGL0LUg0LjQtyDQu9C+0LrQsNC70YzQvdC+0LPQviDRhdGA0LDQvdC40LvQuNGJ0LAuJylcclxuICAgICAgICBsZXQgb2JqZWN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSAoXCJTdHJhdmFBdXRoSW5mb1wiKSk7XHJcbiAgICAgICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ9CSINGF0YDQsNC90LjQu9C40YnQtSDQtNCw0L3QvdGL0YUg0L3QtdGCLicpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmtleXMob2JqZWN0KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ9CSINGF0YDQsNC90LjQu9C40YnQtSDQtNCw0L3QvdGL0YUg0L3QtdGCLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQlNCw0L3QvdGL0LUg0L/QvtC70YPRh9C10L3RizogJywgb2JqZWN0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ci0L7QutC10L0g0L/RgNC+0YHRgNC+0YfQtdC9OiAnLCBpc1Rva2VuRXhwaXJlZChvYmplY3QuZXhwaXJlc19hdCkpO1xyXG4gICAgICAgICAgICBpZiAoaXNUb2tlbkV4cGlyZWQob2JqZWN0LmV4cGlyZXNfYXQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0LHQvdC+0LLQu9GP0Y4g0YLQvtC60LXQvSwgcmVmcmVzaF90b2tlbjogXCIsIG9iamVjdC5yZWZyZXNoX3Rva2VuKVxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaFRva2VuKG9iamVjdC5yZWZyZXNoX3Rva2VuKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKG5ld0RhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0J/QvtC70YPRh9C10L3RiyDQtNCw0L3QvdGL0LUg0YEg0YHQtdGA0LLQtdGA0LA6ICcsIG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3T2JqZWN0ID0geyAuLi5vYmplY3QsIC4uLm5ld0RhdGF9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0J7QsdC90L7QstC70ZHQvdC90YvQuSDQvtCx0YrQtdC60YIg0LTQsNC90L3Ri9GFOiAnLCBuZXdPYmplY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRBdXRoRGF0YSh7c3RhdHVzOiBcImF1dGhvcml6ZWRcIiwgc3RyYXZhQXV0aEluZm86IG5ld09iamVjdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSAoXCJTdHJhdmFBdXRoSW5mb1wiLCBKU09OLnN0cmluZ2lmeShuZXdPYmplY3QpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNldEF1dGhEYXRhKHtzdGF0dXM6IFwiYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzogb2JqZWN0fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LCBbXSlcclxuICAgXHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxCcm93c2VyUm91dGVyPlxyXG4gICAgICAgICAgICAgICAgPEhlYWRlciBhdXRoRGF0YT17YXV0aERhdGF9IHNpZ25PdXQ9e3NpZ25PdXR9IHNpZ25Jbj17YXV0aEF0U3RyYXZhfS8+XHJcbiAgICAgICAgICAgICAgICA8Um91dGVzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGVsZW1lbnQ9ezxNYWlucGFnZSBhdXRoRGF0YT17YXV0aERhdGF9IHNldEF1dGhEYXRhPXtzZXRBdXRoRGF0YX0gLz4gfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiYXV0aFwiIGVsZW1lbnQ9ezxBdXRob3JpemF0aW9uIGF1dGhEYXRhPXthdXRoRGF0YX0gaGFuZGxlRGF0YT17c2V0QXV0aERhdGF9IC8+fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibWFwXCIgZWxlbWVudD17PE1hcCAvPn0gLz5cclxuICAgICAgICAgICAgICAgIDwvUm91dGVzPlxyXG4gICAgICAgICAgICA8L0Jyb3dzZXJSb3V0ZXI+XHJcbiAgICAgICAgPC8+XHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IE1hcCA9ICgpID0+IHtcclxuICAgIHJldHVybiA8ZGl2PtCX0LTQtdGB0Ywg0LHRg9C00YPRgiDQutCw0YDRgtGLPC9kaXY+XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gYXV0aEF0U3RyYXZhKCkge1xyXG4gICAgLy8gaHR0cHM6Ly9zdHJhdmF2dXN1YWwuaGVyb2t1YXBwLmNvbS9cclxuICAgIC8vIGNvbnN0IGZpcnN0QXV0aExpbmsgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHBzOi8vc3RyYXZhdnVzdWFsLmhlcm9rdWFwcC5jb20vcmVwb3J0JmFwcHJvdmFsX3Byb21wdD1mb3JjZSZzY29wZT1hY3Rpdml0eTpyZWFkXCJcclxuICAgIC8vIGNvbnN0IGZpcnN0QXV0aExpbmsgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXBvcnQmYXBwcm92YWxfcHJvbXB0PWZvcmNlJnNjb3BlPWFjdGl2aXR5OnJlYWRcIlxyXG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IFNUUkFWQV9HRVRfQ09ERV9MSU5LO1xyXG59XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXIoeyBhdXRoRGF0YSwgc2lnbk91dCwgc2lnbkluIH0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2JvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyQXV0aEluZm8gYXV0aERhdGE9e2F1dGhEYXRhfSBzaWduT3V0PXtzaWduT3V0fSBzaWduSW49e3NpZ25Jbn0vPiBcclxuICAgICAgICAgICAgICAgICAgICA8TmF2IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IEF2YXRhciA9ICh7bGlua30pID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJfYXZhdGFyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPXtsaW5rIHx8IG51bGx9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IFVzZXJOYW1lID0gKHtmaXJzdG5hbWUsIGxhc3RuYW1lfSkgPT4ge1xyXG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImhlYWRlcl91c2VybmFtZVwiPntmaXJzdG5hbWUgfHwgJyd9IHtsYXN0bmFtZSB8fCAnJ308L3NwYW4+XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBIZWFkZXJBdXRoSW5mbyh7IGF1dGhEYXRhLCBzaWduT3V0LCBzaWduSW4gfSkge1xyXG4gICAgbGV0IGF1dGhJbmZvID0gYXV0aERhdGEuc3RyYXZhQXV0aEluZm87XHJcbiAgICBsZXQgZGlzcGxheVVzZXJJbmZvID0gKGF1dGhEYXRhLnN0YXR1cyA9PSBcImF1dGhvcml6ZWRcIik7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJfdXNlcmluZm9cIj5cclxuICAgICAgICAgICAge2Rpc3BsYXlVc2VySW5mbyA/IFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8QXZhdGFyIGxpbms9e2F1dGhJbmZvLmF0aGxldGUucHJvZmlsZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8VXNlck5hbWUgZmlyc3RuYW1lPXthdXRoSW5mby5hdGhsZXRlLmZpcnN0bmFtZX0gbGFzdG5hbWU9e2F1dGhJbmZvLmF0aGxldGUubGFzdG5hbWV9IC8+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17c2lnbk91dH0+0JLRi9C50YLQuDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICA6IDxidXR0b24gb25DbGljaz17c2lnbklufT7QktC+0LnRgtC4PC9idXR0b24+fVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIClcclxufVxyXG5cclxuY29uc3QgTmF2ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxuYXY+ICAgXHJcbiAgICAgICAgPExpbmsgdG89XCIvXCI+SG9tZTwvTGluaz58e1wiIFwifVxyXG4gICAgICAgIDxMaW5rIHRvPVwibWFwXCI+0JzQtdGB0YLQsDwvTGluaz4gXHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICApXHJcbn1cclxuIiwiY29uc3QgU1RSQVZBX0dFVF9DT0RFX0xJTksgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHBzOi8vc3RyYXZhdnVzdWFsLmhlcm9rdWFwcC5jb20vYXV0aCZhcHByb3ZhbF9wcm9tcHQ9Zm9yY2Umc2NvcGU9YWN0aXZpdHk6cmVhZFwiO1xyXG4vLyBjb25zdCBTVFJBVkFfR0VUX0NPREVfTElOSyA9IFwiaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9vYXV0aC9hdXRob3JpemU/Y2xpZW50X2lkPTc0NjY4JnJlc3BvbnNlX3R5cGU9Y29kZSZyZWRpcmVjdF91cmk9aHR0cDovL2xvY2FsaG9zdDozMDAwL2F1dGgmYXBwcm92YWxfcHJvbXB0PWZvcmNlJnNjb3BlPWFjdGl2aXR5OnJlYWRcIjtcclxubW9kdWxlLmV4cG9ydHMgPSBTVFJBVkFfR0VUX0NPREVfTElOSzsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXHJcXG4gICAgLS1oZWFkZXItYmctY29sb3I6ICM1ZTUzNzM7XFxyXFxuICAgIC0tYnV0dG9uLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIC0tbWFpbi1iZy1jb2xvcjogIzEzYjVjYTtcXHJcXG4gICAgLS1oZWFkZXItbGluazogd2hpdGU7XFxyXFxuICAgIC0tbWFpbi10ZXh0OiAjNTU1O1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWJmMDtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcblxcclxcbiN3cmFwcGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWZcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vdCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMTAwcHggMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcbi51bmF1dGgge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbjogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHotaW5kZXg6IDUwO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXI6YmVmb3Jle1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1iZy1jb2xvcik7XFxyXFxufVxcclxcbi5oZWFkZXJfYm9keSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBoZWlnaHQ6IDgwcHg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgYSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1oZWFkZXItbGluayk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcbi5oZWFkZXIgYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiAuOGVtO1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXJfdXNlcmluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciB7XFxyXFxuICAgIGZsZXg6IDAgMCA2MHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIgaW1nIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2aXR5LWZvcm0gaW5wdXQge1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLW1haW4tdGV4dCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGR0ZXh0IHtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGxlZ2VuZCB7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGRzZXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlc3VsdC1saXN0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsdUNBQXVDO0lBQ3ZDLHlCQUF5QjtJQUN6Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2Qiw2QkFBNkI7QUFDakM7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUNiLFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLE1BQU07SUFDTixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7SUFDWix3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGFBQWE7QUFDakI7QUFDQTtJQUNJLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksY0FBYztJQUNkLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQ0FBa0M7SUFDbEMsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSx1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcclxcbiAgICAtLWhlYWRlci1iZy1jb2xvcjogIzVlNTM3MztcXHJcXG4gICAgLS1idXR0b24tY29sb3I6IG9yYW5nZTtcXHJcXG4gICAgLS1tYWluLWJnLWNvbG9yOiAjMTNiNWNhO1xcclxcbiAgICAtLWhlYWRlci1saW5rOiB3aGl0ZTtcXHJcXG4gICAgLS1tYWluLXRleHQ6ICM1NTU7XFxyXFxufVxcclxcbmJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOYW51bSBHb3RoaWMnLCBzYW5zLXNlcmlmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlYmYwO1xcclxcbiAgICBjb2xvcjogdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuI3dyYXBwZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZlxcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgbWFyZ2luOiAwcHggYXV0bztcXHJcXG4gICAgcGFkZGluZzogMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNyb290IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiAxMDBweCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuLnVuYXV0aCB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIG1hcmdpbjogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgei1pbmRleDogNTA7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcjpiZWZvcmV7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGVhZGVyLWJnLWNvbG9yKTtcXHJcXG59XFxyXFxuLmhlYWRlcl9ib2R5IHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB6LWluZGV4OiAyO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIGhlaWdodDogODBweDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciBhIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWhlYWRlci1saW5rKTtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuLmhlYWRlciBidXR0b24ge1xcclxcbiAgICBmb250LXNpemU6IC44ZW07XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcl91c2VyaW5mbyB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi5oZWFkZXJfYXZhdGFyIHtcXHJcXG4gICAgZmxleDogMCAwIDYwcHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciBpbWcge1xcclxcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uYWN0aXZpdHktZm9ybSBpbnB1dCB7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBmaWVsZHRleHQge1xcclxcbiAgICBjb2xvcjogdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gbGVnZW5kIHtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBmaWVsZHNldCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVzdWx0LWxpc3Qge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDFlbTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJhcHBcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3N0cmF2YXZpc3VhbFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzdHJhdmF2aXN1YWxcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9BcHAuanN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlJlYWN0RE9NIiwiVmljdG9yeVBpZSIsIkxpbmsiLCJSb3V0ZXMiLCJSb3V0ZSIsIkJyb3dzZXJSb3V0ZXIiLCJ1c2VMb2NhdGlvbiIsInVzZU5hdmlnYXRlIiwiVVJMU2VhcmNoUGFyYW1zIiwiYXhpb3MiLCJTVFJBVkFfR0VUX0NPREVfTElOSyIsIkhlYWRlciIsIlBMQUNFUyIsIm5hbWUiLCJsYXRsbmciLCJpc05lYXIiLCJwbGFjZSIsInJhZGl1cyIsImRpc3QiLCJNYXRoIiwic3FydCIsInBvdyIsIlVuYXV0aG9yaXplZCIsInNldEF1dGhEYXRhIiwic3RhdHVzIiwiYXV0aEF0U3RyYXZhIiwiQXV0aG9yaXphdGlvbiIsImF1dGhEYXRhIiwiaGFuZGxlRGF0YSIsImxvY2F0aW9uIiwibmF2aWdhdGUiLCJwYXJhbXMiLCJzZWFyY2giLCJjbGllbnRDb2RlIiwiZ2V0IiwiZGF0YSIsImNvZGUiLCJmZXRjaEF1dGhJbmZvIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGVuIiwicmVzIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic3RyYXZhQXV0aEluZm8iLCJBY3Rpdml0eUZvcm0iLCJoYW5kbGVGb3JtU3VibWl0IiwiYmVmb3JlIiwic2V0QmVmb3JlIiwiYWZ0ZXIiLCJzZXRBZnRlciIsImRhdGUiLCJEYXRlIiwiZGF0ZTEiLCJub3ciLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiaGFuZGxlRW5kRGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZVN0YXJ0RGF0ZSIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiZGF0ZUJlZm9yZSIsInBhcnNlIiwidG9TdHJpbmciLCJkYXRlQWZ0ZXIiLCJmb3JtRGF0YSIsIlNob3dSZXN1bHRzIiwicmVzdWx0TGlzdCIsImxlbmd0aCIsIm1hcCIsImkiLCJzdGFydF9kYXRlIiwic3RyYXZhdmlzdWFsUGxhY2UiLCJzdGFydF9sYXRsbmciLCJTaG93QWdncmVnYXRlZFJlc3VsdHMiLCJhY3Rpdml0aWVzTGlzdCIsInN0YXRlIiwic2V0U3RhdGUiLCJhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZSIsInBsYWNlZGlzdG9iaiIsImZvckVhY2giLCJlbCIsInVuZGVmaW5lZCIsIk51bWJlciIsImRpc3RhbmNlIiwiYWdncm9iamVjdCIsImRpYURhdGEiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwieCIsInkiLCJQYWdlIiwicXVlcnlQYXJhbXMiLCJzZXRRdWVyeVBhcmFtcyIsImFjdGl2aXRpZXMiLCJzZXRBY3Rpdml0aWVzIiwicGVyX3BhZ2UiLCJwYWdlIiwicmVzdWx0IiwicmVzdWx0Q2h1bmsiLCJhZGRQYXJhbXMiLCJnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YSIsImZpbmQiLCJhdXRoSW5mbyIsInVybCIsIlVSTCIsIkFjY2VwdCIsImFjY2Vzc190b2tlbiIsIk1haW5wYWdlIiwiQXBwIiwic2lnbk91dCIsInJlbW92ZUl0ZW0iLCJpc1Rva2VuRXhwaXJlZCIsInRva2VuRXhwaXJlc0F0IiwicmVmcmVzaFRva2VuIiwidG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwicmVzcG9uc2UiLCJvYmoiLCJvYmplY3QiLCJnZXRJdGVtIiwiZXhwaXJlc19hdCIsIm5ld0RhdGEiLCJuZXdPYmplY3QiLCJNYXAiLCJkb2N1bWVudCIsImhyZWYiLCJyZW5kZXIiLCJnZXRFbGVtZW50QnlJZCIsInNpZ25JbiIsIkF2YXRhciIsImxpbmsiLCJVc2VyTmFtZSIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwiSGVhZGVyQXV0aEluZm8iLCJkaXNwbGF5VXNlckluZm8iLCJhdGhsZXRlIiwicHJvZmlsZSIsIk5hdiIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9