/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Activities.jsx":
/*!****************************!*\
  !*** ./src/Activities.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Activities)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-search-params */ "./node_modules/url-search-params/build/url-search-params.node.js");
/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ActivityFilter_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActivityFilter.jsx */ "./src/ActivityFilter.jsx");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_constants_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ResultList_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ResultList.jsx */ "./src/ResultList.jsx");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions.js */ "./src/functions.js");







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

function Activities({
  activityList,
  setActivityList,
  accessToken
}) {
  const [queryParams, setQueryParams] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [activities, setActivities] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  async function getData(params, accessToken) {
    //Готовит параметры запроса и получает постранично данные с сервера Страва
    let per_page = 30;
    let page = 1;
    let result = [];
    let resultChunk = [];

    do {
      let addParams = {
        per_page: per_page.toString(),
        page: page.toString(),
        before: (Date.parse(queryParams.before) / 1000).toString(),
        after: (Date.parse(queryParams.after) / 1000).toString()
      };
      let fetchparams = { ...params,
        ...addParams
      };
      console.log(fetchparams);
      resultChunk = await fetchActivitiesFromStrava(fetchparams, accessToken);
      result = [...result, ...resultChunk];
      page += 1;
    } while (resultChunk.length == per_page); //Добавляем поле stravavisualPlace к активности, которое идентифицирует место тренировки


    result.forEach(res => {
      let place = _constants_js__WEBPACK_IMPORTED_MODULE_3__.PLACES.find(place => (0,_functions_js__WEBPACK_IMPORTED_MODULE_5__.isNear)(res.start_latlng, place));

      if (place) {
        res.stravavisualPlace = place.name;
      } else {
        res.stravavisualPlace = 'Неизвестно';
      }
    });
    return result;
  }

  async function fetchActivitiesFromStrava(params, accessToken) {
    //присоединяем параметры запроса к основному адресу ресурса
    let url = new URL('https://www.strava.com/api/v3/athlete/activities'); //let params = queryParams;

    url.search = new (url_search_params__WEBPACK_IMPORTED_MODULE_1___default())(params).toString();
    console.log("Fetching data, Activities component");
    let data = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    let result = await data.json(); //console.log(result);

    return result;
  } // При изменении фильтра загружаем активности


  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    getData(queryParams, accessToken).then(res => setActivityList(res)).catch(err => console.log(err));
  }, [queryParams]); // При изменении активностей применяем к ним фильтр и загружаем в стэйт

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setActivities(activityList); // Здесь ещё будет применён фильтр
  }, [activityList]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ActivityFilter_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
    handleFormSubmit: setQueryParams
  }), activities ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ShowAggregatedResults, {
    activitiesList: activities
  }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ResultList_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    resultList: activities
  }));
}

/***/ }),

/***/ "./src/ActivityFilter.jsx":
/*!********************************!*\
  !*** ./src/ActivityFilter.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActivityFilter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


const dateToYYYYMMDDString = date => date.toISOString().split('T')[0]; //Собирает данные формы и отдает их в виде объекта в handleFormSubmit


function ActivityFilter({
  handleFormSubmit
}) {
  let today = dateToYYYYMMDDString(new Date());
  let monthAgo = dateToYYYYMMDDString(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [before, setBefore] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(today); //{activityBefore, activityAfter}

  const [after, setAfter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(monthAgo); //Month ago

  function handleEndDate(e) {
    setBefore(e.target.value);
  }

  function handleStartDate(e) {
    setAfter(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // let dateBefore = (Date.parse(before) / 1000).toString();
    // let dateAfter = (Date.parse(after) / 1000).toString();

    let formData = {
      before: before,
      after: after
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

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions.js */ "./src/functions.js");
/* harmony import */ var _Header_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Header.jsx */ "./src/Header.jsx");
/* harmony import */ var _Unauthorized_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Unauthorized.jsx */ "./src/Unauthorized.jsx");
/* harmony import */ var _Authorization_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Authorization.jsx */ "./src/Authorization.jsx");
/* harmony import */ var _Activities_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Activities.jsx */ "./src/Activities.jsx");













function Mainpage({
  authInfo
}) {
  let {
    isAuth
  } = authInfo;
  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isAuth) navigate("/notauth");
  }, [isAuth]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "MainPage");
}

function App() {
  const [authInfo, setAuthInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)((0,_functions_js__WEBPACK_IMPORTED_MODULE_5__.loadJSON)("StravaAuthInfo") || {
    "isAuth": false
  }); // При загрузке компонента читаем данные из хранилища. Если их нет - неавторизованы

  const [activityList, setActivityList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  function changeAuthInfo(info) {
    setAuthInfo(info);
    (0,_functions_js__WEBPACK_IMPORTED_MODULE_5__.saveJSON)("StravaAuthInfo", info);
  }

  function signOut() {
    changeAuthInfo({
      "isAuth": false
    });
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    //Проверяем срок токена
    if (!authInfo.isAuth) return; //Если не авторизованы - выходим, проверять нечего.

    let tokenExpired = (0,_functions_js__WEBPACK_IMPORTED_MODULE_5__.isTokenExpired)(authInfo.expires_at);
    console.log('Токен просрочен?: ', tokenExpired);

    if (tokenExpired) {
      console.log("Обновляю токен, refresh_token: ", authInfo.refresh_token);
      (0,_functions_js__WEBPACK_IMPORTED_MODULE_5__.refreshToken)(authInfo.refresh_token).then(data => {
        console.log('Получены данные с сервера: ', data);
        changeAuthInfo({ ...authInfo,
          ...data
        });
      }).catch(error => console.log(error));
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Header_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    authInfo: authInfo,
    signOut: signOut,
    signIn: _functions_js__WEBPACK_IMPORTED_MODULE_5__.authAtStrava
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Mainpage, {
      authInfo: authInfo
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {
    path: "auth",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Authorization_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
      authInfo: authInfo,
      handleData: changeAuthInfo
    })
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {
    path: "map",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Map, null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {
    path: "notauth",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Unauthorized_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Route, {
    path: "activities",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Activities_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
      activityList: activityList,
      setActivityList: setActivityList,
      accessToken: authInfo.access_token
    })
  }))));
}

const Map = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0443\u0442 \u043A\u0430\u0440\u0442\u044B");
};

react_dom__WEBPACK_IMPORTED_MODULE_1__.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(App, null), document.getElementById('root'));

/***/ }),

/***/ "./src/Authorization.jsx":
/*!*******************************!*\
  !*** ./src/Authorization.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Authorization)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/index.js");


function Authorization({
  authInfo,
  handleData
}) {
  //Сюда приходит переадресация со стравы и здесь мы получаем токены и обозначаем авторизацию
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  let location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation)(); //для выделения кода авторизации из адреса

  let navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();
  let params = new URLSearchParams(location.search);
  let clientCode = params.get("code"); // выделили код присланный Стравой из адреса

  const data = {
    code: clientCode
  };

  async function fetchAuthInfo() {
    if (!authInfo.isAuth) {
      fetch('/api/gettokenfromcode', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then(res => {
        console.log('fetchAuthInfo: response: ', res);

        if (res.errors) {
          setMessage('Ошибка авторизации');
          setTimeout(() => {
            navigate('/notauth');
          }, 5000);
          console.log("Ошибка: ", res.message, ' ', res.errors);
        } else {
          handleData({
            isAuth: true,
            ...res
          }); //Чтобы избежать ререндеринга Роутера пока статус оставляем unauth, обработаем в App

          navigate('/activities');
        }
      }).catch(err => {
        console.log(err);
        navigate('/');
      });
    } else {
      navigate('/');
    }
  }

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => fetchAuthInfo(), []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, message));
}

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
  authInfo,
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
    authInfo: authInfo,
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
  authInfo,
  signOut,
  signIn
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "header_userinfo"
  }, authInfo.isAuth ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Avatar, {
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
  }, "\u041C\u0435\u0441\u0442\u0430"), "|", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "activities"
  }, "\u0422\u0440\u0435\u043D\u0438\u0440\u043E\u0432\u043A\u0438"));
};

/***/ }),

/***/ "./src/ResultList.jsx":
/*!****************************!*\
  !*** ./src/ResultList.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResultList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

function ResultList({
  resultList
} = []) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u041D\u0430\u0439\u0434\u0435\u043D\u043E: ", resultList.length, " "), resultList.map((res, i) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "result-list",
    key: i
  }, res.start_date.split('T')[0], " - ", res.name, " - ", res.stravavisualPlace, " - ", res.start_latlng[0], ", ", res.start_latlng[1])));
}

/***/ }),

/***/ "./src/Unauthorized.jsx":
/*!******************************!*\
  !*** ./src/Unauthorized.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Unauthorized)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_1__);


function Unauthorized() {
  //Компонент отображается на стартовой странице если клиент не авторизован в страва по пути /notauth
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "unauth"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, "\u0412\u044B \u043D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B. \u041F\u0440\u0438 \u043D\u0430\u0436\u0430\u0442\u0438\u0438 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u0432\u044B \u043F\u0435\u0440\u0435\u0439\u0434\u0451\u0442\u0435 \u043D\u0430 \u0441\u0430\u0439\u0442 Strava \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: () => {
      document.location.href = _constants__WEBPACK_IMPORTED_MODULE_1__.STRAVA_GET_CODE_LINK;
    }
  }, "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0432 Strava"));
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((module) => {

//const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavusual.herokuapp.com/auth&approval_prompt=force&scope=activity:read";
const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";
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
module.exports = {
  STRAVA_GET_CODE_LINK,
  PLACES
};

/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadJSON": () => (/* binding */ loadJSON),
/* harmony export */   "saveJSON": () => (/* binding */ saveJSON),
/* harmony export */   "isNear": () => (/* binding */ isNear),
/* harmony export */   "isTokenExpired": () => (/* binding */ isTokenExpired),
/* harmony export */   "refreshToken": () => (/* binding */ refreshToken),
/* harmony export */   "authAtStrava": () => (/* binding */ authAtStrava)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_0__);

const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data)); // Если точка ближе радиуса от места возвращает true

function isNear(latlng, place, radius = 0.04) {
  let dist = Math.sqrt(Math.pow(latlng[0] - place.latlng[0], 2) + Math.pow(latlng[1] - place.latlng[1], 2));
  return dist < radius;
} //Принимает время истечения токена в секундах по Epoch

function isTokenExpired(tokenExpiresAt) {
  if (new Date(tokenExpiresAt * 1000) - Date.now() < 0) {
    return true;
  } else return false;
} //Запрашивает через наш сервер новый объект с токенами используя refresh_token

async function refreshToken(token) {
  let data = {
    refresh_token: token
  }; // try {

  const response = await fetch('/api/refreshtoken', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const fetcheddata = await response.json(); // if (!response.ok) {
  //     const message = 'Error with Status Code: ' + response.status;
  //     throw new Error(message);
  // }
  // } catch (error) {
  //     console.log('Error: ' + error);
  // }
  //console.log('refreshToken: response: ', result);

  return fetcheddata;
}
function authAtStrava() {
  document.location.href = _constants__WEBPACK_IMPORTED_MODULE_0__.STRAVA_GET_CODE_LINK;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9BY3Rpdml0aWVzLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvQWN0aXZpdHlGaWx0ZXIuanN4Iiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9BcHAuanN4Iiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9BdXRob3JpemF0aW9uLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvSGVhZGVyLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvUmVzdWx0TGlzdC5qc3giLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL1VuYXV0aG9yaXplZC5qc3giLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAndXJsLXNlYXJjaC1wYXJhbXMnO1xyXG5cclxuaW1wb3J0IEFjdGl2aXR5RmlsdGVyIGZyb20gJy4vQWN0aXZpdHlGaWx0ZXIuanN4JztcclxuaW1wb3J0IHsgUExBQ0VTIH0gZnJvbSBcIi4vY29uc3RhbnRzLmpzXCI7XHJcbmltcG9ydCBSZXN1bHRMaXN0IGZyb20gJy4vUmVzdWx0TGlzdC5qc3gnO1xyXG5pbXBvcnQgeyBpc05lYXIgfSBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XHJcblxyXG5mdW5jdGlvbiBTaG93QWdncmVnYXRlZFJlc3VsdHMoe2FjdGl2aXRpZXNMaXN0fSkge1xyXG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgICBmdW5jdGlvbiBhZ2dyZWdhdGVSZXN1bHRzUGxhY2VEaXN0YW5jZShkYXRhID0gW10pIHtcclxuICAgICAgICAvL9CQ0LPQs9GA0LXQs9C40YDRg9C10YIg0LDQutGC0LjQstC90L7RgdGC0Lgg0L/QviDQvNC10YHRgtCw0Lwg0Lgg0YHQvtC+0YLQstC10YLRgdGC0LLRg9GO0YnQuNC8INC00LjRgdGC0LDQvdGG0LjRj9C8LCDQvdCwINCy0YvRhdC+0LTQtSDQvtCx0YrQtdC60YJcclxuICAgICAgICBsZXQgcGxhY2VkaXN0b2JqID0ge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgaWYgKHBsYWNlZGlzdG9ialtlbC5zdHJhdmF2aXN1YWxQbGFjZV0gPT0gdW5kZWZpbmVkKSBwbGFjZWRpc3RvYmpbZWwuc3RyYXZhdmlzdWFsUGxhY2VdID0gMDtcclxuICAgICAgICAgICAgcGxhY2VkaXN0b2JqW2VsLnN0cmF2YXZpc3VhbFBsYWNlXSArPSBOdW1iZXIoZWwuZGlzdGFuY2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxhY2VkaXN0b2JqO1xyXG4gICAgfVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsZXQgYWdncm9iamVjdCA9IGFnZ3JlZ2F0ZVJlc3VsdHNQbGFjZURpc3RhbmNlKGFjdGl2aXRpZXNMaXN0KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWN0TGlzdDogJywgYWN0aXZpdGllc0xpc3QpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZ2dyOiAnLCBhZ2dyb2JqZWN0KTtcclxuICAgICAgICBsZXQgZGlhRGF0YSA9IE9iamVjdC5rZXlzKGFnZ3JvYmplY3QpLm1hcCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICByZXR1cm4ge3g6IGtleSwgeTogYWdncm9iamVjdFtrZXldfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRTdGF0ZShkaWFEYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGlhRGF0YTogJywgZGlhRGF0YSk7XHJcbiAgICB9LCBbYWN0aXZpdGllc0xpc3RdKTtcclxuXHJcbiAgICAvLyBjb25zdCBteURhdGEgPSBbXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEFcIiwgeTogOTAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIEJcIiwgeTogNDAwIH0sXHJcbiAgICAvLyAgICAgeyB4OiBcIkdyb3VwIENcIiwgeTogMzAwIH0sXHJcbiAgICAvLyAgIF07XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIHtzdGF0ZS5sZW5ndGggPyA8aDE+0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0LrQuNC70L7QvNC10YLRgNCw0LbQsCDQv9C+INC80LXRgdGC0YM8L2gxPiA6IG51bGwgfVxyXG4gICAgICAgICAgICB7LyogPFZpY3RvcnlQaWVcclxuICAgICAgICAgICAgICAgIGRhdGE9e3N0YXRlfVxyXG4gICAgICAgICAgICAgICAgY29sb3JTY2FsZT17W1wiQnVybHlXb29kXCIsIFwiTGlnaHRTa3lCbHVlXCIsIFwiTGlnaHRDb3JhbFwiLCBcIkxpZ2h0UGlua1wiLCBcIlRlYWxcIl19XHJcbiAgICAgICAgICAgICAgICByYWRpdXM9ezEwMH1cclxuICAgICAgICAgICAgLz4gKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFjdGl2aXRpZXMoeyBhY3Rpdml0eUxpc3QsIHNldEFjdGl2aXR5TGlzdCwgYWNjZXNzVG9rZW4gfSkgeyBcclxuICAgIGNvbnN0IFtxdWVyeVBhcmFtcywgc2V0UXVlcnlQYXJhbXNdID0gdXNlU3RhdGUoe30pXHJcbiAgICBjb25zdCBbYWN0aXZpdGllcywgc2V0QWN0aXZpdGllc10gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShwYXJhbXMsIGFjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgLy/Qk9C+0YLQvtCy0LjRgiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LfQsNC/0YDQvtGB0LAg0Lgg0L/QvtC70YPRh9Cw0LXRgiDQv9C+0YHRgtGA0LDQvdC40YfQvdC+INC00LDQvdC90YvQtSDRgSDRgdC10YDQstC10YDQsCDQodGC0YDQsNCy0LBcclxuICAgICAgICBsZXQgcGVyX3BhZ2UgPSAzMDsgXHJcbiAgICAgICAgbGV0IHBhZ2UgPSAxO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgcmVzdWx0Q2h1bmsgPSBbXTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGxldCBhZGRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwZXJfcGFnZTogcGVyX3BhZ2UudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHBhZ2U6IHBhZ2UudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGJlZm9yZTogKERhdGUucGFyc2UocXVlcnlQYXJhbXMuYmVmb3JlKSAvIDEwMDApLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBhZnRlcjogKERhdGUucGFyc2UocXVlcnlQYXJhbXMuYWZ0ZXIpIC8gMTAwMCkudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgZmV0Y2hwYXJhbXMgPSB7Li4ucGFyYW1zLCAuLi5hZGRQYXJhbXN9O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmZXRjaHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJlc3VsdENodW5rID0gYXdhaXQgZmV0Y2hBY3Rpdml0aWVzRnJvbVN0cmF2YShmZXRjaHBhcmFtcywgYWNjZXNzVG9rZW4pO1xyXG4gICAgICAgICAgICByZXN1bHQgPSBbLi4ucmVzdWx0LCAuLi5yZXN1bHRDaHVua107XHJcbiAgICAgICAgICAgIHBhZ2UgKz0gMTtcclxuICAgICAgICB9IHdoaWxlIChcclxuICAgICAgICAgICAgcmVzdWx0Q2h1bmsubGVuZ3RoID09IHBlcl9wYWdlXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL9CU0L7QsdCw0LLQu9GP0LXQvCDQv9C+0LvQtSBzdHJhdmF2aXN1YWxQbGFjZSDQuiDQsNC60YLQuNCy0L3QvtGB0YLQuCwg0LrQvtGC0L7RgNC+0LUg0LjQtNC10L3RgtC40YTQuNGG0LjRgNGD0LXRgiDQvNC10YHRgtC+INGC0YDQtdC90LjRgNC+0LLQutC4XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2gocmVzID0+IHtcclxuICAgICAgICAgICAgbGV0IHBsYWNlID0gUExBQ0VTLmZpbmQocGxhY2UgPT4gaXNOZWFyKHJlcy5zdGFydF9sYXRsbmcsIHBsYWNlKSk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0cmF2YXZpc3VhbFBsYWNlID0gcGxhY2UubmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdHJhdmF2aXN1YWxQbGFjZSA9ICfQndC10LjQt9Cy0LXRgdGC0L3Qvic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaEFjdGl2aXRpZXNGcm9tU3RyYXZhKHBhcmFtcywgYWNjZXNzVG9rZW4pIHtcclxuICAgICAgICAvL9C/0YDQuNGB0L7QtdC00LjQvdGP0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LfQsNC/0YDQvtGB0LAg0Log0L7RgdC90L7QstC90L7QvNGDINCw0LTRgNC10YHRgyDRgNC10YHRg9GA0YHQsFxyXG4gICAgICAgIGxldCB1cmwgPSBuZXcgVVJMKCdodHRwczovL3d3dy5zdHJhdmEuY29tL2FwaS92My9hdGhsZXRlL2FjdGl2aXRpZXMnKTtcclxuICAgICAgICAvL2xldCBwYXJhbXMgPSBxdWVyeVBhcmFtcztcclxuICAgICAgICB1cmwuc2VhcmNoID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGZXRjaGluZyBkYXRhLCBBY3Rpdml0aWVzIGNvbXBvbmVudFwiKTtcclxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKHVybCwgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGRhdGEuanNvbigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vINCf0YDQuCDQuNC30LzQtdC90LXQvdC40Lgg0YTQuNC70YzRgtGA0LAg0LfQsNCz0YDRg9C20LDQtdC8INCw0LrRgtC40LLQvdC+0YHRgtC4XHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGdldERhdGEocXVlcnlQYXJhbXMsIGFjY2Vzc1Rva2VuKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gc2V0QWN0aXZpdHlMaXN0KHJlcykpXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICB9LCBbcXVlcnlQYXJhbXNdKTtcclxuXHJcbiAgICAvLyDQn9GA0Lgg0LjQt9C80LXQvdC10L3QuNC4INCw0LrRgtC40LLQvdC+0YHRgtC10Lkg0L/RgNC40LzQtdC90Y/QtdC8INC6INC90LjQvCDRhNC40LvRjNGC0YAg0Lgg0LfQsNCz0YDRg9C20LDQtdC8INCyINGB0YLRjdC50YJcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgc2V0QWN0aXZpdGllcyhhY3Rpdml0eUxpc3QpOyAvLyDQl9C00LXRgdGMINC10YnRkSDQsdGD0LTQtdGCINC/0YDQuNC80LXQvdGR0L0g0YTQuNC70YzRgtGAXHJcbiAgICB9LCBbYWN0aXZpdHlMaXN0XSk7XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxBY3Rpdml0eUZpbHRlciBoYW5kbGVGb3JtU3VibWl0PXtzZXRRdWVyeVBhcmFtc30vPlxyXG4gICAgICAgICAgICB7YWN0aXZpdGllcyA/IDxTaG93QWdncmVnYXRlZFJlc3VsdHMgYWN0aXZpdGllc0xpc3Q9e2FjdGl2aXRpZXN9Lz4gOiBudWxsfVxyXG4gICAgICAgICAgICA8UmVzdWx0TGlzdCByZXN1bHRMaXN0PXthY3Rpdml0aWVzfSAvPlxyXG4gICAgICAgICAgICB7LyogPGJ1dHRvbiBvbkNsaWNrPXtnZXRBY3Rpdml0aWVzRnJvbVN0cmF2YX0+0L/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LU8L2J1dHRvbj4gKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgKVxyXG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBkYXRlVG9ZWVlZTU1ERFN0cmluZyA9IGRhdGUgPT4gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcblxyXG4vL9Ch0L7QsdC40YDQsNC10YIg0LTQsNC90L3Ri9C1INGE0L7RgNC80Ysg0Lgg0L7RgtC00LDQtdGCINC40YUg0LIg0LLQuNC00LUg0L7QsdGK0LXQutGC0LAg0LIgaGFuZGxlRm9ybVN1Ym1pdFxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBY3Rpdml0eUZpbHRlcih7aGFuZGxlRm9ybVN1Ym1pdH0pIHtcclxuICAgIGxldCB0b2RheSA9IGRhdGVUb1lZWVlNTUREU3RyaW5nKG5ldyBEYXRlKCkpO1xyXG4gICAgbGV0IG1vbnRoQWdvID0gZGF0ZVRvWVlZWU1NRERTdHJpbmcobmV3IERhdGUoIERhdGUubm93KCkgLSAzMCAqIDI0ICogNjAgKiA2MCAqMTAwMCApKTtcclxuXHJcbiAgICBjb25zdCBbYmVmb3JlLCBzZXRCZWZvcmVdID0gdXNlU3RhdGUodG9kYXkpOyAvL3thY3Rpdml0eUJlZm9yZSwgYWN0aXZpdHlBZnRlcn1cclxuICAgIGNvbnN0IFthZnRlciwgc2V0QWZ0ZXJdID0gdXNlU3RhdGUobW9udGhBZ28pOyAvL01vbnRoIGFnb1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUVuZERhdGUoZSkge1xyXG4gICAgICAgIHNldEJlZm9yZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RhcnREYXRlKGUpIHtcclxuICAgICAgICBzZXRBZnRlcihlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0KGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gbGV0IGRhdGVCZWZvcmUgPSAoRGF0ZS5wYXJzZShiZWZvcmUpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyBsZXQgZGF0ZUFmdGVyID0gKERhdGUucGFyc2UoYWZ0ZXIpIC8gMTAwMCkudG9TdHJpbmcoKTtcclxuICAgICAgICBsZXQgZm9ybURhdGEgPSB7XHJcbiAgICAgICAgICAgIGJlZm9yZTogYmVmb3JlLFxyXG4gICAgICAgICAgICBhZnRlcjogYWZ0ZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFuZGxlRm9ybVN1Ym1pdChmb3JtRGF0YSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhg0J/QvtC70YPRh9C40Lwg0LTQsNC90L3Ri9C1INC80LXQttC00YMgJHtkYXRlQmVmb3JlfSDQuCAke2RhdGVBZnRlcn1gKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdmb3JtRGF0YTogJywgZm9ybURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybihcclxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9J2FjdGl2aXR5LWZvcm0nPlxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPtCU0LDRgtCwINC90LDRh9Cw0LvQsDwvbGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJzdGFydFwiIG5hbWU9XCJhY3Rpdml0eS1hZnRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FmdGVyfSBvbkNoYW5nZT17aGFuZGxlU3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIG1pbj1cIjIwMTgtMDEtMDFcIj48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgPGxlZ2VuZD7QlNCw0YLQsCDQutC+0L3RhtCwPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImVuZFwiIG5hbWU9XCJhY3Rpdml0eS1iZWZvcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiZWZvcmV9IG9uQ2hhbmdlPXtoYW5kbGVFbmREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIG1pbj1cIjIwMTgtMDEtMDFcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9PtCd0LDQudGC0Lg8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBWaWN0b3J5UGllIH0gZnJvbSBcInZpY3RvcnktcGllXCI7XHJcbmltcG9ydCB7IExpbmssIFJvdXRlcywgUm91dGUsIEJyb3dzZXJSb3V0ZXIsIHVzZUxvY2F0aW9uLCB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQgeyBTVFJBVkFfR0VUX0NPREVfTElOSywgUExBQ0VTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBsb2FkSlNPTiwgc2F2ZUpTT04sIGlzVG9rZW5FeHBpcmVkLCBhdXRoQXRTdHJhdmEsIHJlZnJlc2hUb2tlbiB9IGZyb20gJy4vZnVuY3Rpb25zLmpzJztcclxuXHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9IZWFkZXIuanN4JztcclxuaW1wb3J0IFVuYXV0aG9yaXplZCBmcm9tICcuL1VuYXV0aG9yaXplZC5qc3gnO1xyXG5pbXBvcnQgQXV0aG9yaXphdGlvbiBmcm9tICcuL0F1dGhvcml6YXRpb24uanN4JztcclxuaW1wb3J0IEFjdGl2aXRpZXMgZnJvbSAnLi9BY3Rpdml0aWVzLmpzeCc7XHJcblxyXG5mdW5jdGlvbiBNYWlucGFnZSh7IGF1dGhJbmZvIH0pIHtcclxuICAgIGxldCB7IGlzQXV0aCB9ID0gYXV0aEluZm87XHJcbiAgICBsZXQgbmF2aWdhdGUgPSB1c2VOYXZpZ2F0ZSgpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7aWYgKCFpc0F1dGgpIG5hdmlnYXRlKFwiL25vdGF1dGhcIik7fSwgW2lzQXV0aF0pXHJcbiAgICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgTWFpblBhZ2VcclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFwcCgpIHtcclxuICAgIGNvbnN0IFthdXRoSW5mbywgc2V0QXV0aEluZm9dID0gdXNlU3RhdGUobG9hZEpTT04oXCJTdHJhdmFBdXRoSW5mb1wiKSB8fCB7IFwiaXNBdXRoXCI6IGZhbHNlIH0pOyAvLyDQn9GA0Lgg0LfQsNCz0YDRg9C30LrQtSDQutC+0LzQv9C+0L3QtdC90YLQsCDRh9C40YLQsNC10Lwg0LTQsNC90L3Ri9C1INC40Lcg0YXRgNCw0L3QuNC70LjRidCwLiDQldGB0LvQuCDQuNGFINC90LXRgiAtINC90LXQsNCy0YLQvtGA0LjQt9C+0LLQsNC90YtcclxuICAgIGNvbnN0IFthY3Rpdml0eUxpc3QsIHNldEFjdGl2aXR5TGlzdF0gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlQXV0aEluZm8oaW5mbykge1xyXG4gICAgICAgIHNldEF1dGhJbmZvKGluZm8pO1xyXG4gICAgICAgIHNhdmVKU09OKFwiU3RyYXZhQXV0aEluZm9cIiwgaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnbk91dCgpIHtcclxuICAgICAgICBjaGFuZ2VBdXRoSW5mbyh7IFwiaXNBdXRoXCI6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIC8v0J/RgNC+0LLQtdGA0Y/QtdC8INGB0YDQvtC6INGC0L7QutC10L3QsFxyXG4gICAgICAgIGlmICghYXV0aEluZm8uaXNBdXRoKSByZXR1cm47IC8v0JXRgdC70Lgg0L3QtSDQsNCy0YLQvtGA0LjQt9C+0LLQsNC90YsgLSDQstGL0YXQvtC00LjQvCwg0L/RgNC+0LLQtdGA0Y/RgtGMINC90LXRh9C10LPQvi5cclxuICAgICAgICBsZXQgdG9rZW5FeHBpcmVkID0gaXNUb2tlbkV4cGlyZWQoYXV0aEluZm8uZXhwaXJlc19hdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ9Ci0L7QutC10L0g0L/RgNC+0YHRgNC+0YfQtdC9PzogJywgdG9rZW5FeHBpcmVkKTtcclxuICAgICAgICBpZiAodG9rZW5FeHBpcmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7QsdC90L7QstC70Y/RjiDRgtC+0LrQtdC9LCByZWZyZXNoX3Rva2VuOiBcIiwgYXV0aEluZm8ucmVmcmVzaF90b2tlbilcclxuICAgICAgICAgICAgcmVmcmVzaFRva2VuKGF1dGhJbmZvLnJlZnJlc2hfdG9rZW4pXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn0J/QvtC70YPRh9C10L3RiyDQtNCw0L3QvdGL0LUg0YEg0YHQtdGA0LLQtdGA0LA6ICcsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUF1dGhJbmZvKHsgLi4uYXV0aEluZm8sIC4uLmRhdGF9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcclxuICAgICAgICB9IFxyXG4gICAgfSwgW10pO1xyXG4gICBcclxuICAgIHJldHVybihcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8QnJvd3NlclJvdXRlcj5cclxuICAgICAgICAgICAgICAgIDxIZWFkZXIgYXV0aEluZm89e2F1dGhJbmZvfSBzaWduT3V0PXtzaWduT3V0fSBzaWduSW49e2F1dGhBdFN0cmF2YX0vPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlcz5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8TWFpbnBhZ2UgYXV0aEluZm89e2F1dGhJbmZvfSAvPiB9IC8+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiYXV0aFwiIGVsZW1lbnQ9ezxBdXRob3JpemF0aW9uIGF1dGhJbmZvPXthdXRoSW5mb30gaGFuZGxlRGF0YT17Y2hhbmdlQXV0aEluZm99Lz59IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJtYXBcIiBlbGVtZW50PXs8TWFwIC8+fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibm90YXV0aFwiIGVsZW1lbnQ9ezxVbmF1dGhvcml6ZWQgLz59IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJhY3Rpdml0aWVzXCIgZWxlbWVudD17PEFjdGl2aXRpZXMgYWN0aXZpdHlMaXN0PXthY3Rpdml0eUxpc3R9IHNldEFjdGl2aXR5TGlzdD17c2V0QWN0aXZpdHlMaXN0fSBhY2Nlc3NUb2tlbj17YXV0aEluZm8uYWNjZXNzX3Rva2VufSAvPn0gLz5cclxuICAgICAgICAgICAgICAgIDwvUm91dGVzPlxyXG4gICAgICAgICAgICA8L0Jyb3dzZXJSb3V0ZXI+XHJcbiAgICAgICAgPC8+XHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IE1hcCA9ICgpID0+IHtcclxuICAgIHJldHVybiA8ZGl2PtCX0LTQtdGB0Ywg0LHRg9C00YPRgiDQutCw0YDRgtGLPC9kaXY+XHJcbn1cclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEF1dGhvcml6YXRpb24oeyBhdXRoSW5mbywgaGFuZGxlRGF0YSB9KSB7XHJcbiAgICAvL9Ch0Y7QtNCwINC/0YDQuNGF0L7QtNC40YIg0L/QtdGA0LXQsNC00YDQtdGB0LDRhtC40Y8g0YHQviDRgdGC0YDQsNCy0Ysg0Lgg0LfQtNC10YHRjCDQvNGLINC/0L7Qu9GD0YfQsNC10Lwg0YLQvtC60LXQvdGLINC4INC+0LHQvtC30L3QsNGH0LDQtdC8INCw0LLRgtC+0YDQuNC30LDRhtC40Y5cclxuXHJcbiAgICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZSgpO1xyXG4gICAgbGV0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTsgLy/QtNC70Y8g0LLRi9C00LXQu9C10L3QuNGPINC60L7QtNCwINCw0LLRgtC+0YDQuNC30LDRhtC40Lgg0LjQtyDQsNC00YDQtdGB0LBcclxuICAgIGxldCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XHJcblxyXG4gICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGxldCBjbGllbnRDb2RlID0gcGFyYW1zLmdldChcImNvZGVcIik7IC8vINCy0YvQtNC10LvQuNC70Lgg0LrQvtC0INC/0YDQuNGB0LvQsNC90L3Ri9C5INCh0YLRgNCw0LLQvtC5INC40Lcg0LDQtNGA0LXRgdCwXHJcbiAgICBjb25zdCBkYXRhID0ge2NvZGU6IGNsaWVudENvZGV9O1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoQXV0aEluZm8oKSB7XHJcbiAgICAgICAgaWYgKCFhdXRoSW5mby5pc0F1dGgpIHtcclxuICAgICAgICAgICAgZmV0Y2goJy9hcGkvZ2V0dG9rZW5mcm9tY29kZScsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmZXRjaEF1dGhJbmZvOiByZXNwb25zZTogJywgcmVzKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgn0J7RiNC40LHQutCwINCw0LLRgtC+0YDQuNC30LDRhtC40LgnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7bmF2aWdhdGUoJy9ub3RhdXRoJyl9LCA1MDAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsDogXCIsIHJlcy5tZXNzYWdlLCAnICcsIHJlcy5lcnJvcnMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRGF0YSh7aXNBdXRoOiB0cnVlLCAuLi5yZXN9KTsgLy/Qp9GC0L7QsdGLINC40LfQsdC10LbQsNGC0Ywg0YDQtdGA0LXQvdC00LXRgNC40L3Qs9CwINCg0L7Rg9GC0LXRgNCwINC/0L7QutCwINGB0YLQsNGC0YPRgSDQvtGB0YLQsNCy0LvRj9C10LwgdW5hdXRoLCDQvtCx0YDQsNCx0L7RgtCw0LXQvCDQsiBBcHBcclxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZSgnL2FjdGl2aXRpZXMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7Y29uc29sZS5sb2coZXJyKTsgbmF2aWdhdGUoJy8nKX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRlKCcvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiBmZXRjaEF1dGhJbmZvKCksIFtdKTtcclxuICBcclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aDE+e21lc3NhZ2V9PC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVhZGVyKHsgYXV0aEluZm8sIHNpZ25PdXQsIHNpZ25JbiB9KSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl9ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEhlYWRlckF1dGhJbmZvIGF1dGhJbmZvPXthdXRoSW5mb30gc2lnbk91dD17c2lnbk91dH0gc2lnbkluPXtzaWduSW59Lz4gXHJcbiAgICAgICAgICAgICAgICAgICAgPE5hdiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvaGVhZGVyPlxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBBdmF0YXIgPSAoe2xpbmt9KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2F2YXRhclwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz17bGluayB8fCBudWxsfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBVc2VyTmFtZSA9ICh7Zmlyc3RuYW1lLCBsYXN0bmFtZX0pID0+IHtcclxuICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJoZWFkZXJfdXNlcm5hbWVcIj57Zmlyc3RuYW1lIHx8ICcnfSB7bGFzdG5hbWUgfHwgJyd9PC9zcGFuPlxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gSGVhZGVyQXV0aEluZm8oeyBhdXRoSW5mbywgc2lnbk91dCwgc2lnbkluIH0pIHtcclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlcl91c2VyaW5mb1wiPlxyXG4gICAgICAgICAgICB7YXV0aEluZm8uaXNBdXRoID8gXHJcbiAgICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgICAgIDxBdmF0YXIgbGluaz17YXV0aEluZm8uYXRobGV0ZS5wcm9maWxlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxVc2VyTmFtZSBmaXJzdG5hbWU9e2F1dGhJbmZvLmF0aGxldGUuZmlyc3RuYW1lfSBsYXN0bmFtZT17YXV0aEluZm8uYXRobGV0ZS5sYXN0bmFtZX0gLz4gXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtzaWduT3V0fT7QktGL0LnRgtC4PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICAgIDogPGJ1dHRvbiBvbkNsaWNrPXtzaWduSW59PtCS0L7QudGC0Lg8L2J1dHRvbj59XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBOYXYgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPG5hdj4gICBcclxuICAgICAgICA8TGluayB0bz1cIi9cIj5Ib21lPC9MaW5rPnx7XCIgXCJ9XHJcbiAgICAgICAgPExpbmsgdG89XCJtYXBcIj7QnNC10YHRgtCwPC9MaW5rPnx7XCIgXCJ9XHJcbiAgICAgICAgPExpbmsgdG89XCJhY3Rpdml0aWVzXCI+0KLRgNC10L3QuNGA0L7QstC60Lg8L0xpbms+IFxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgKVxyXG59XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlc3VsdExpc3Qoe3Jlc3VsdExpc3R9ID0gW10pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGRpdj7QndCw0LnQtNC10L3Qvjoge3Jlc3VsdExpc3QubGVuZ3RofSA8L2Rpdj5cclxuICAgICAgICAgICAge3Jlc3VsdExpc3QubWFwKChyZXMsIGkpID0+IFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHQtbGlzdFwiIGtleT17aX0+XHJcbiAgICAgICAgICAgICAgICAgICAge3Jlcy5zdGFydF9kYXRlLnNwbGl0KCdUJylbMF19IC0ge3Jlcy5uYW1lfSAtIHtyZXMuc3RyYXZhdmlzdWFsUGxhY2V9IC0ge3Jlcy5zdGFydF9sYXRsbmdbMF19LCB7cmVzLnN0YXJ0X2xhdGxuZ1sxXX1cclxuICAgICAgICAgICAgICAgIDwvZGl2Pil9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn0iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTVFJBVkFfR0VUX0NPREVfTElOSyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVuYXV0aG9yaXplZCgpIHtcclxuICAgIC8v0JrQvtC80L/QvtC90LXQvdGCINC+0YLQvtCx0YDQsNC20LDQtdGC0YHRjyDQvdCwINGB0YLQsNGA0YLQvtCy0L7QuSDRgdGC0YDQsNC90LjRhtC1INC10YHQu9C4INC60LvQuNC10L3RgiDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L0g0LIg0YHRgtGA0LDQstCwINC/0L4g0L/Rg9GC0LggL25vdGF1dGhcclxuXHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VuYXV0aCc+XHJcbiAgICAgICAgICAgIDxkaXY+0JLRiyDQvdC1INCw0LLRgtC+0YDQuNC30L7QstCw0L3Riy4g0J/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDINCy0Ysg0L/QtdGA0LXQudC00ZHRgtC1INC90LAg0YHQsNC50YIgU3RyYXZhINC00LvRjyDQsNCy0YLQvtGA0LjQt9Cw0YbQuNC4LjwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBTVFJBVkFfR0VUX0NPREVfTElOSztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfT7QkNCy0YLQvtGA0LjQt9C+0LLQsNGC0YzRgdGPINCyIFN0cmF2YTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59IiwiLy9jb25zdCBTVFJBVkFfR0VUX0NPREVfTElOSyA9IFwiaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9vYXV0aC9hdXRob3JpemU/Y2xpZW50X2lkPTc0NjY4JnJlc3BvbnNlX3R5cGU9Y29kZSZyZWRpcmVjdF91cmk9aHR0cHM6Ly9zdHJhdmF2dXN1YWwuaGVyb2t1YXBwLmNvbS9hdXRoJmFwcHJvdmFsX3Byb21wdD1mb3JjZSZzY29wZT1hY3Rpdml0eTpyZWFkXCI7XHJcbmNvbnN0IFNUUkFWQV9HRVRfQ09ERV9MSU5LID0gXCJodHRwczovL3d3dy5zdHJhdmEuY29tL29hdXRoL2F1dGhvcml6ZT9jbGllbnRfaWQ9NzQ2NjgmcmVzcG9uc2VfdHlwZT1jb2RlJnJlZGlyZWN0X3VyaT1odHRwOi8vbG9jYWxob3N0OjMwMDAvYXV0aCZhcHByb3ZhbF9wcm9tcHQ9Zm9yY2Umc2NvcGU9YWN0aXZpdHk6cmVhZFwiO1xyXG5cclxuY29uc3QgUExBQ0VTID0gW1xyXG4gICAge25hbWU6ICfQnNC40YLQuNC90L4g0J/QsNGA0LonLCBsYXRsbmc6IFs1NS44NCwgMzcuMzddfSxcclxuICAgIHtuYW1lOiAn0JzQtdGJ0LXRgNGB0LrQuNC5INCf0LDRgNC6JywgbGF0bG5nOiBbNTUuNjYsIDM3LjQwXX0sXHJcbiAgICB7bmFtZTogJ9Ch0YLQsNC00LjQvtC9INCX0L7RgNC60LjQuScsIGxhdGxuZzogWzU1Ljg0LCAzNy4zMl19LFxyXG4gICAge25hbWU6ICfQntC00LjQvdGG0L7QstC+JywgbGF0bG5nOiBbNTUuNjksIDM3LjI1XX0sXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgU1RSQVZBX0dFVF9DT0RFX0xJTkssIFBMQUNFUyB9OyIsImltcG9ydCB7IFNUUkFWQV9HRVRfQ09ERV9MSU5LIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRKU09OID0ga2V5ID0+IGtleSAmJiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBzYXZlSlNPTiA9IChrZXksIGRhdGEpID0+IGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG5cclxuLy8g0JXRgdC70Lgg0YLQvtGH0LrQsCDQsdC70LjQttC1INGA0LDQtNC40YPRgdCwINC+0YIg0LzQtdGB0YLQsCDQstC+0LfQstGA0LDRidCw0LXRgiB0cnVlXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05lYXIobGF0bG5nLCBwbGFjZSwgcmFkaXVzPTAuMDQpIHtcclxuICAgIGxldCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGgucG93KGxhdGxuZ1swXS1wbGFjZS5sYXRsbmdbMF0sIDIpICsgTWF0aC5wb3cobGF0bG5nWzFdLXBsYWNlLmxhdGxuZ1sxXSwgMikpO1xyXG4gICAgcmV0dXJuIChkaXN0IDwgcmFkaXVzKTtcclxufVxyXG5cclxuLy/Qn9GA0LjQvdC40LzQsNC10YIg0LLRgNC10LzRjyDQuNGB0YLQtdGH0LXQvdC40Y8g0YLQvtC60LXQvdCwINCyINGB0LXQutGD0L3QtNCw0YUg0L/QviBFcG9jaFxyXG5leHBvcnQgZnVuY3Rpb24gaXNUb2tlbkV4cGlyZWQodG9rZW5FeHBpcmVzQXQpIHtcclxuICAgIGlmICgobmV3IERhdGUodG9rZW5FeHBpcmVzQXQgKiAxMDAwKSAtIERhdGUubm93KCkpIDwgMCApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vL9CX0LDQv9GA0LDRiNC40LLQsNC10YIg0YfQtdGA0LXQtyDQvdCw0Ygg0YHQtdGA0LLQtdGAINC90L7QstGL0Lkg0L7QsdGK0LXQutGCINGBINGC0L7QutC10L3QsNC80Lgg0LjRgdC/0L7Qu9GM0LfRg9GPIHJlZnJlc2hfdG9rZW5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hUb2tlbih0b2tlbikge1xyXG4gICAgbGV0IGRhdGEgPSB7cmVmcmVzaF90b2tlbjogdG9rZW59O1xyXG4gICAgLy8gdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3JlZnJlc2h0b2tlbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGZldGNoZWRkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIC8vIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAvLyAgICAgY29uc3QgbWVzc2FnZSA9ICdFcnJvciB3aXRoIFN0YXR1cyBDb2RlOiAnICsgcmVzcG9uc2Uuc3RhdHVzO1xyXG4gICAgICAgIC8vICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJyArIGVycm9yKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy9jb25zb2xlLmxvZygncmVmcmVzaFRva2VuOiByZXNwb25zZTogJywgcmVzdWx0KTtcclxuICAgIHJldHVybiBmZXRjaGVkZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhBdFN0cmF2YSgpIHtcclxuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBTVFJBVkFfR0VUX0NPREVfTElOSztcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXHJcXG4gICAgLS1oZWFkZXItYmctY29sb3I6ICM1ZTUzNzM7XFxyXFxuICAgIC0tYnV0dG9uLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIC0tbWFpbi1iZy1jb2xvcjogIzEzYjVjYTtcXHJcXG4gICAgLS1oZWFkZXItbGluazogd2hpdGU7XFxyXFxuICAgIC0tbWFpbi10ZXh0OiAjNTU1O1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWJmMDtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcblxcclxcbiN3cmFwcGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWZcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vdCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMTAwcHggMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcbi51bmF1dGgge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbjogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHotaW5kZXg6IDUwO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXI6YmVmb3Jle1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1iZy1jb2xvcik7XFxyXFxufVxcclxcbi5oZWFkZXJfYm9keSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBoZWlnaHQ6IDgwcHg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgYSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1oZWFkZXItbGluayk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcbi5oZWFkZXIgYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiAuOGVtO1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXJfdXNlcmluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciB7XFxyXFxuICAgIGZsZXg6IDAgMCA2MHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIgaW1nIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2aXR5LWZvcm0gaW5wdXQge1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLW1haW4tdGV4dCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGR0ZXh0IHtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGxlZ2VuZCB7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGRzZXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlc3VsdC1saXN0IHtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSwwQkFBMEI7SUFDMUIsc0JBQXNCO0lBQ3RCLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIsaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsdUNBQXVDO0lBQ3ZDLHlCQUF5QjtJQUN6Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztJQUNYLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEI7QUFDSjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2Qiw2QkFBNkI7QUFDakM7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLFlBQVk7SUFDWixjQUFjO0lBQ2QsYUFBYTtJQUNiLFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLE1BQU07SUFDTixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixPQUFPO0lBQ1AsV0FBVztJQUNYLFlBQVk7SUFDWix3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGFBQWE7QUFDakI7QUFDQTtJQUNJLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksY0FBYztJQUNkLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsY0FBYztBQUNsQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQ0FBa0M7SUFDbEMsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSx1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLFlBQVk7QUFDaEI7QUFDQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcclxcbiAgICAtLWhlYWRlci1iZy1jb2xvcjogIzVlNTM3MztcXHJcXG4gICAgLS1idXR0b24tY29sb3I6IG9yYW5nZTtcXHJcXG4gICAgLS1tYWluLWJnLWNvbG9yOiAjMTNiNWNhO1xcclxcbiAgICAtLWhlYWRlci1saW5rOiB3aGl0ZTtcXHJcXG4gICAgLS1tYWluLXRleHQ6ICM1NTU7XFxyXFxufVxcclxcbmJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOYW51bSBHb3RoaWMnLCBzYW5zLXNlcmlmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlYmYwO1xcclxcbiAgICBjb2xvcjogdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuI3dyYXBwZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZlxcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgbWFyZ2luOiAwcHggYXV0bztcXHJcXG4gICAgcGFkZGluZzogMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNyb290IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiAxMDBweCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuLnVuYXV0aCB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIG1hcmdpbjogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgei1pbmRleDogNTA7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcjpiZWZvcmV7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGVhZGVyLWJnLWNvbG9yKTtcXHJcXG59XFxyXFxuLmhlYWRlcl9ib2R5IHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB6LWluZGV4OiAyO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIGhlaWdodDogODBweDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciBhIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWhlYWRlci1saW5rKTtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuLmhlYWRlciBidXR0b24ge1xcclxcbiAgICBmb250LXNpemU6IC44ZW07XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcl91c2VyaW5mbyB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi5oZWFkZXJfYXZhdGFyIHtcXHJcXG4gICAgZmxleDogMCAwIDYwcHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciBpbWcge1xcclxcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uYWN0aXZpdHktZm9ybSBpbnB1dCB7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBmaWVsZHRleHQge1xcclxcbiAgICBjb2xvcjogdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gbGVnZW5kIHtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBmaWVsZHNldCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVzdWx0LWxpc3Qge1xcclxcbiAgICBmb250LXNpemU6IDFlbTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDFlbTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJhcHBcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3N0cmF2YXZpc3VhbFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzdHJhdmF2aXN1YWxcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9BcHAuanN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlVSTFNlYXJjaFBhcmFtcyIsIkFjdGl2aXR5RmlsdGVyIiwiUExBQ0VTIiwiUmVzdWx0TGlzdCIsImlzTmVhciIsIlNob3dBZ2dyZWdhdGVkUmVzdWx0cyIsImFjdGl2aXRpZXNMaXN0Iiwic3RhdGUiLCJzZXRTdGF0ZSIsImFnZ3JlZ2F0ZVJlc3VsdHNQbGFjZURpc3RhbmNlIiwiZGF0YSIsInBsYWNlZGlzdG9iaiIsImZvckVhY2giLCJlbCIsInN0cmF2YXZpc3VhbFBsYWNlIiwidW5kZWZpbmVkIiwiTnVtYmVyIiwiZGlzdGFuY2UiLCJhZ2dyb2JqZWN0IiwiY29uc29sZSIsImxvZyIsImRpYURhdGEiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwieCIsInkiLCJsZW5ndGgiLCJBY3Rpdml0aWVzIiwiYWN0aXZpdHlMaXN0Iiwic2V0QWN0aXZpdHlMaXN0IiwiYWNjZXNzVG9rZW4iLCJxdWVyeVBhcmFtcyIsInNldFF1ZXJ5UGFyYW1zIiwiYWN0aXZpdGllcyIsInNldEFjdGl2aXRpZXMiLCJnZXREYXRhIiwicGFyYW1zIiwicGVyX3BhZ2UiLCJwYWdlIiwicmVzdWx0IiwicmVzdWx0Q2h1bmsiLCJhZGRQYXJhbXMiLCJ0b1N0cmluZyIsImJlZm9yZSIsIkRhdGUiLCJwYXJzZSIsImFmdGVyIiwiZmV0Y2hwYXJhbXMiLCJmZXRjaEFjdGl2aXRpZXNGcm9tU3RyYXZhIiwicmVzIiwicGxhY2UiLCJmaW5kIiwic3RhcnRfbGF0bG5nIiwibmFtZSIsInVybCIsIlVSTCIsInNlYXJjaCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJqc29uIiwidGhlbiIsImNhdGNoIiwiZXJyIiwiZGF0ZVRvWVlZWU1NRERTdHJpbmciLCJkYXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsImhhbmRsZUZvcm1TdWJtaXQiLCJ0b2RheSIsIm1vbnRoQWdvIiwibm93Iiwic2V0QmVmb3JlIiwic2V0QWZ0ZXIiLCJoYW5kbGVFbmREYXRlIiwiZSIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU3RhcnREYXRlIiwiaGFuZGxlU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJmb3JtRGF0YSIsIlJlYWN0RE9NIiwiVmljdG9yeVBpZSIsIkxpbmsiLCJSb3V0ZXMiLCJSb3V0ZSIsIkJyb3dzZXJSb3V0ZXIiLCJ1c2VMb2NhdGlvbiIsInVzZU5hdmlnYXRlIiwiYXhpb3MiLCJTVFJBVkFfR0VUX0NPREVfTElOSyIsImxvYWRKU09OIiwic2F2ZUpTT04iLCJpc1Rva2VuRXhwaXJlZCIsImF1dGhBdFN0cmF2YSIsInJlZnJlc2hUb2tlbiIsIkhlYWRlciIsIlVuYXV0aG9yaXplZCIsIk1haW5wYWdlIiwiYXV0aEluZm8iLCJpc0F1dGgiLCJuYXZpZ2F0ZSIsIkFwcCIsInNldEF1dGhJbmZvIiwiY2hhbmdlQXV0aEluZm8iLCJpbmZvIiwic2lnbk91dCIsInRva2VuRXhwaXJlZCIsImV4cGlyZXNfYXQiLCJyZWZyZXNoX3Rva2VuIiwiZXJyb3IiLCJhY2Nlc3NfdG9rZW4iLCJNYXAiLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaGFuZGxlRGF0YSIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwibG9jYXRpb24iLCJjbGllbnRDb2RlIiwiZ2V0IiwiY29kZSIsImZldGNoQXV0aEluZm8iLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9ycyIsInNldFRpbWVvdXQiLCJzaWduSW4iLCJBdmF0YXIiLCJsaW5rIiwiVXNlck5hbWUiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsIkhlYWRlckF1dGhJbmZvIiwiYXRobGV0ZSIsInByb2ZpbGUiLCJOYXYiLCJyZXN1bHRMaXN0IiwiaSIsInN0YXJ0X2RhdGUiLCJocmVmIiwibGF0bG5nIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwicmFkaXVzIiwiZGlzdCIsIk1hdGgiLCJzcXJ0IiwicG93IiwidG9rZW5FeHBpcmVzQXQiLCJ0b2tlbiIsInJlc3BvbnNlIiwiZmV0Y2hlZGRhdGEiXSwic291cmNlUm9vdCI6IiJ9