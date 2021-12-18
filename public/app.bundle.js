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
    }); //console.log("Найдено ", result.length, " результатов");
    //console.log(result);

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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ShowResults, {
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Header_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
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
  const firstAuthLink = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/report&approval_prompt=force&scope=activity:read";
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n    --header-bg-color: #5e5373;\r\n    --button-color: orange;\r\n    --main-bg-color: #13b5ca;\r\n    --header-link: white;\r\n    --main-text: #555;\r\n}\r\nbody {\r\n    display: flex;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-family: 'Nanum Gothic', sans-serif;\r\n    background-color: #eeebf0;\r\n    color: var(--main-text);\r\n}\r\n\r\n#wrapper {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    box-sizing: border-box;\r\n    font-family: 'Nanum Gothic', sans-serif\r\n}\r\n\r\n.container {\r\n    max-width: 800px;\r\n    margin: 0px auto;\r\n    padding: 0px 10px;\r\n}\r\n\r\n#root {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    padding: 100px 10px 10px 10px;\r\n}\r\n.unauth {\r\n    text-align: center;\r\n    margin: 20px;\r\n}\r\n\r\nbutton {\r\n    background-color: orange;\r\n    color: white;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    margin: 10px;\r\n    border-radius: 10px;\r\n}\r\n\r\n.header {\r\n    position: fixed;\r\n    width: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 50;\r\n    color: white;\r\n}\r\n\r\n.header:before{\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: var(--header-bg-color);\r\n}\r\n.header_body {\r\n    position: relative;\r\n    z-index: 2;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    height: 80px;\r\n    align-items: center;\r\n}\r\n\r\n.header a {\r\n    color: var(--header-link);\r\n    padding: 10px;\r\n}\r\n.header button {\r\n    font-size: .8em;\r\n    padding: 8px;\r\n}\r\n\r\n.header_userinfo {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n.header_avatar {\r\n    flex: 0 0 60px;\r\n    margin-right: 10px;\r\n    border-radius: 50%;\r\n    overflow: hidden;\r\n}\r\n.header_avatar img {\r\n    max-width: 100%;\r\n    display: block;\r\n}\r\n\r\n.activity-form input {\r\n    padding: 8px;\r\n    border: 1px solid var(--main-text);\r\n    border-radius: 5px;\r\n}\r\n.activity-form fieldtext {\r\n    color: var(--main-text);\r\n}\r\n.activity-form legend {\r\n    padding: 5px;\r\n}\r\n.activity-form fieldset {\r\n    width: 100%;\r\n}\r\n\r\n.result-list {\r\n    font-size: 0.8em;\r\n    line-height: 1em;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,0BAA0B;IAC1B,sBAAsB;IACtB,wBAAwB;IACxB,oBAAoB;IACpB,iBAAiB;AACrB;AACA;IACI,aAAa;IACb,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,uCAAuC;IACvC,yBAAyB;IACzB,uBAAuB;AAC3B;;AAEA;IACI,aAAa;IACb,WAAW;IACX,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB;AACJ;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,aAAa;IACb,WAAW;IACX,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,6BAA6B;AACjC;AACA;IACI,kBAAkB;IAClB,YAAY;AAChB;;AAEA;IACI,wBAAwB;IACxB,YAAY;IACZ,cAAc;IACd,aAAa;IACb,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,WAAW;IACX,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,wCAAwC;AAC5C;AACA;IACI,kBAAkB;IAClB,UAAU;IACV,aAAa;IACb,8BAA8B;IAC9B,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,yBAAyB;IACzB,aAAa;AACjB;AACA;IACI,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;AACA;IACI,cAAc;IACd,kBAAkB;IAClB,kBAAkB;IAClB,gBAAgB;AACpB;AACA;IACI,eAAe;IACf,cAAc;AAClB;;AAEA;IACI,YAAY;IACZ,kCAAkC;IAClC,kBAAkB;AACtB;AACA;IACI,uBAAuB;AAC3B;AACA;IACI,YAAY;AAChB;AACA;IACI,WAAW;AACf;;AAEA;IACI,gBAAgB;IAChB,gBAAgB;AACpB","sourcesContent":[":root {\r\n    --header-bg-color: #5e5373;\r\n    --button-color: orange;\r\n    --main-bg-color: #13b5ca;\r\n    --header-link: white;\r\n    --main-text: #555;\r\n}\r\nbody {\r\n    display: flex;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-family: 'Nanum Gothic', sans-serif;\r\n    background-color: #eeebf0;\r\n    color: var(--main-text);\r\n}\r\n\r\n#wrapper {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    align-items: center;\r\n    box-sizing: border-box;\r\n    font-family: 'Nanum Gothic', sans-serif\r\n}\r\n\r\n.container {\r\n    max-width: 800px;\r\n    margin: 0px auto;\r\n    padding: 0px 10px;\r\n}\r\n\r\n#root {\r\n    display: flex;\r\n    width: 100%;\r\n    max-width: 800px;\r\n    height: 100vh;\r\n    justify-content: center;\r\n    padding: 100px 10px 10px 10px;\r\n}\r\n.unauth {\r\n    text-align: center;\r\n    margin: 20px;\r\n}\r\n\r\nbutton {\r\n    background-color: orange;\r\n    color: white;\r\n    font-size: 1em;\r\n    padding: 10px;\r\n    margin: 10px;\r\n    border-radius: 10px;\r\n}\r\n\r\n.header {\r\n    position: fixed;\r\n    width: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 50;\r\n    color: white;\r\n}\r\n\r\n.header:before{\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: var(--header-bg-color);\r\n}\r\n.header_body {\r\n    position: relative;\r\n    z-index: 2;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    height: 80px;\r\n    align-items: center;\r\n}\r\n\r\n.header a {\r\n    color: var(--header-link);\r\n    padding: 10px;\r\n}\r\n.header button {\r\n    font-size: .8em;\r\n    padding: 8px;\r\n}\r\n\r\n.header_userinfo {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n.header_avatar {\r\n    flex: 0 0 60px;\r\n    margin-right: 10px;\r\n    border-radius: 50%;\r\n    overflow: hidden;\r\n}\r\n.header_avatar img {\r\n    max-width: 100%;\r\n    display: block;\r\n}\r\n\r\n.activity-form input {\r\n    padding: 8px;\r\n    border: 1px solid var(--main-text);\r\n    border-radius: 5px;\r\n}\r\n.activity-form fieldtext {\r\n    color: var(--main-text);\r\n}\r\n.activity-form legend {\r\n    padding: 5px;\r\n}\r\n.activity-form fieldset {\r\n    width: 100%;\r\n}\r\n\r\n.result-list {\r\n    font-size: 0.8em;\r\n    line-height: 1em;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvQXBwLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvSGVhZGVyLmpzeCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3N0cmF2YXZpc3VhbC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vc3RyYXZhdmlzdWFsL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9zdHJhdmF2aXN1YWwvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgTGluaywgUm91dGVzLCBSb3V0ZSwgQnJvd3NlclJvdXRlciwgdXNlTG9jYXRpb24sIHVzZU5hdmlnYXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBVUkxTZWFyY2hQYXJhbXMgZnJvbSAndXJsLXNlYXJjaC1wYXJhbXMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQgU1RSQVZBX0dFVF9DT0RFX0xJTksgZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlci5qc3gnO1xyXG5cclxuXHJcbmNvbnN0IFBMQUNFUyA9IFtcclxuICAgIHtuYW1lOiAn0JzQuNGC0LjQvdC+INCf0LDRgNC6JywgbGF0bG5nOiBbNTUuODQsIDM3LjM3XX0sXHJcbiAgICB7bmFtZTogJ9Cc0LXRidC10YDRgdC60LjQuSDQn9Cw0YDQuicsIGxhdGxuZzogWzU1LjY2LCAzNy40MF19LFxyXG4gICAge25hbWU6ICfQodGC0LDQtNC40L7QvSDQl9C+0YDQutC40LknLCBsYXRsbmc6IFs1NS44NCwgMzcuMzJdfSxcclxuICAgIHtuYW1lOiAn0J7QtNC40L3RhtC+0LLQvicsIGxhdGxuZzogWzU1LjY5LCAzNy4yNV19LFxyXG5dXHJcblxyXG5mdW5jdGlvbiBpc05lYXIobGF0bG5nLCBwbGFjZSwgcmFkaXVzPTAuMDQpIHtcclxuICAgIGxldCBkaXN0ID0gTWF0aC5zcXJ0KE1hdGgucG93KGxhdGxuZ1swXS1wbGFjZS5sYXRsbmdbMF0sIDIpICsgTWF0aC5wb3cobGF0bG5nWzFdLXBsYWNlLmxhdGxuZ1sxXSwgMikpO1xyXG4gICAgcmV0dXJuIChkaXN0IDwgcmFkaXVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gVW5hdXRob3JpemVkKHtzZXRBdXRoRGF0YX0pIHtcclxuICAgIC8v0J7RgtC+0LHRgNCw0LbQsNC10YLRgdGPINC90LAg0YHRgtCw0YDRgtC+0LLQvtC5INGB0YLRgNCw0L3QuNGG0LUg0LXRgdC70Lgg0LrQu9C40LXQvdGCINC90LUg0LDQstGC0L7RgNC40LfQvtCy0LDQvSDQsiDRgdGC0YDQsNCy0LBcclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndW5hdXRoJz5cclxuICAgICAgICAgICAgPGRpdj5UaGlzIGlzIFVuYXV0aG9yaXplZDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PtCS0Ysg0L3QtSDQsNCy0YLQvtGA0LjQt9C+0LLQsNC90YsuINCf0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC60L3QvtC/0LrRgyDQstGLINC/0LXRgNC10LnQtNGR0YLQtSDQvdCwINGB0LDQudGCIFN0cmF2YSDQtNC70Y8g0LDQstGC0L7RgNC40LfQsNGG0LjQuC48L2Rpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRBdXRoRGF0YSh7c3RhdHVzOiBcInByb2Nlc3NpbmdcIn0pO1xyXG4gICAgICAgICAgICAgICAgYXV0aEF0U3RyYXZhKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0+0JDQstGC0L7RgNC40LfQvtCy0LDRgtGM0YHRjyDQsiBTdHJhdmE8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gQXV0aG9yaXphdGlvbih7IGF1dGhEYXRhLCBoYW5kbGVEYXRhIH0pIHtcclxuICAgIC8v0KHRjtC00LAg0L/RgNC40YXQvtC00LjRgiDQv9C10YDQtdCw0LTRgNC10YHQsNGG0LjRjyDRgdC+INGB0YLRgNCw0LLRiyDQuCDQt9C00LXRgdGMINC80Ysg0L/QvtC70YPRh9Cw0LXQvCDRgtC+0LrQtdC90Ysg0Lgg0L7QsdC+0LfQvdCw0YfQsNC10Lwg0LDQstGC0L7RgNC40LfQsNGG0LjRjlxyXG4gICAgbGV0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcclxuICAgIGxldCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XHJcbiAgICBpZiAoYXV0aERhdGEuc3RhdHVzID09IFwiYXV0aG9yaXplZFwiKSB7XHJcbiAgICAgICAgbmF2aWdhdGUoJy8nKTtcclxuICAgIH1cclxuICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICBsZXQgY2xpZW50Q29kZSA9IHBhcmFtcy5nZXQoXCJjb2RlXCIpOyAvLyDQstGL0LTQtdC70LjQu9C4INC60L7QtCDQv9GA0LjRgdC70LDQvdC90YvQuSDQodGC0YDQsNCy0L7QuSDQuNC3INCw0LTRgNC10YHQsFxyXG4gICAgY29uc3QgZGF0YSA9IHtjb2RlOiBjbGllbnRDb2RlfTtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaEF1dGhJbmZvKCkge1xyXG4gICAgICAgIGlmIChhdXRoRGF0YS5zdGF0dXMgIT09IFwiYXV0aG9yaXplZFwiKSB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL2FwaS9nZXR0b2tlbmZyb21jb2RlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZldGNoQXV0aEluZm86IHJlc3BvbnNlOiAnLCByZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtIChcIlN0cmF2YUF1dGhJbmZvXCIsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZURhdGEoe3N0YXR1czogXCJ1bmF1dGhvcml6ZWRcIiwgc3RyYXZhQXV0aEluZm86IHJlc30pOyAvL9Cn0YLQvtCx0Ysg0LjQt9Cx0LXQttCw0YLRjCDRgNC10YDQtdC90LTQtdGA0LjQvdCz0LAg0KDQvtGD0YLQtdGA0LAg0L/QvtC60LAg0YHRgtCw0YLRg9GBINC+0YHRgtCw0LLQu9GP0LXQvCB1bmF1dGgsINC+0LHRgNCw0LHQvtGC0LDQtdC8INCyIEFwcFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlKCcvJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vbmF2aWdhdGUoJy8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiBmZXRjaEF1dGhJbmZvKCksIFtdKTtcclxuICBcclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aDE+VGhpcyBpcyBBdXRob3JpemF0aW9uPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gQWN0aXZpdHlGb3JtKHtoYW5kbGVGb3JtU3VibWl0fSkge1xyXG4gICAgY29uc3QgW2JlZm9yZSwgc2V0QmVmb3JlXSA9IHVzZVN0YXRlKCcyMDIxLTEwLTIwJyk7IC8ve2FjdGl2aXR5QmVmb3JlLCBhY3Rpdml0eUFmdGVyfVxyXG4gICAgY29uc3QgW2FmdGVyLCBzZXRBZnRlcl0gPSB1c2VTdGF0ZSgnMjAyMS0xMC0yMCcpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRlMSA9ICBuZXcgRGF0ZSggRGF0ZS5ub3coKSAtIDY3MDAwMDAwMDAgKTtcclxuICAgICAgICBzZXRCZWZvcmUoZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF0pO1xyXG4gICAgICAgIHNldEFmdGVyKGRhdGUxLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXSk7XHJcblxyXG4gICAgfSxbXSlcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVFbmREYXRlKGUpIHtcclxuICAgICAgICBzZXRCZWZvcmUoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXJ0RGF0ZShlKSB7XHJcbiAgICAgICAgc2V0QWZ0ZXIoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGxldCBkYXRlQmVmb3JlID0gKERhdGUucGFyc2UoYmVmb3JlKSAvIDEwMDApLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGRhdGVBZnRlciA9IChEYXRlLnBhcnNlKGFmdGVyKSAvIDEwMDApLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IGZvcm1EYXRhID0ge1xyXG4gICAgICAgICAgICBiZWZvcmU6IGRhdGVCZWZvcmUsXHJcbiAgICAgICAgICAgIGFmdGVyOiBkYXRlQWZ0ZXJcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFuZGxlRm9ybVN1Ym1pdChmb3JtRGF0YSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhg0J/QvtC70YPRh9C40Lwg0LTQsNC90L3Ri9C1INC80LXQttC00YMgJHtkYXRlQmVmb3JlfSDQuCAke2RhdGVBZnRlcn1gKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdmb3JtRGF0YTogJywgZm9ybURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybihcclxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9J2FjdGl2aXR5LWZvcm0nPlxyXG4gICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8bGVnZW5kPtCU0LDRgtCwINC90LDRh9Cw0LvQsDwvbGVnZW5kPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJzdGFydFwiIG5hbWU9XCJhY3Rpdml0eS1hZnRlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FmdGVyfSBvbkNoYW5nZT17aGFuZGxlU3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIG1pbj1cIjIwMTgtMDEtMDFcIj48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgPGxlZ2VuZD7QlNCw0YLQsCDQutC+0L3RhtCwPC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImVuZFwiIG5hbWU9XCJhY3Rpdml0eS1iZWZvcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtiZWZvcmV9IG9uQ2hhbmdlPXtoYW5kbGVFbmREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIG1pbj1cIjIwMTgtMDEtMDFcIj48L2lucHV0PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9PtCd0LDQudGC0Lg8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBTaG93UmVzdWx0cyh7cmVzdWx0TGlzdH0gPSBbXSkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PtCd0LDQudC00LXQvdC+OiB7cmVzdWx0TGlzdC5sZW5ndGh9IDwvZGl2PlxyXG4gICAgICAgICAgICB7cmVzdWx0TGlzdC5tYXAoKHJlcywgaSkgPT4gXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdC1saXN0XCIga2V5PXtpfT5cclxuICAgICAgICAgICAgICAgICAgICB7cmVzLnN0YXJ0X2RhdGUuc3BsaXQoJ1QnKVswXX0gLSB7cmVzLm5hbWV9IC0ge3Jlcy5zdHJhdmF2aXN1YWxQbGFjZX0gLSB7cmVzLnN0YXJ0X2xhdGxuZ1swXX0sIHtyZXMuc3RhcnRfbGF0bG5nWzFdfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufVxyXG5cclxuZnVuY3Rpb24gUGFnZSh7IGF1dGhEYXRhIH0pIHsgXHJcbiAgICBjb25zdCBbcXVlcnlQYXJhbXMsIHNldFF1ZXJ5UGFyYW1zXSA9IHVzZVN0YXRlKHtiZWZvcmU6ICcxNjM5ODMzNjQyJywgYWZ0ZXI6ICcxNjMzMDQ2NDAwJ30pXHJcbiAgICBjb25zdCBbYWN0aXZpdGllcywgc2V0QWN0aXZpdGllc10gPSB1c2VTdGF0ZShbXSk7XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRm9ybVN1Ym1pdChwYXJhbXMpIHtcclxuICAgICAgICBzZXRRdWVyeVBhcmFtcyhwYXJhbXMpO1xyXG4gICAgICAgIGxldCBwZXJfcGFnZSA9IDMwOyBcclxuICAgICAgICBsZXQgcGFnZSA9IDE7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCByZXN1bHRDaHVuayA9IFtdO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbGV0IGFkZFBhcmFtcyA9IHtwZXJfcGFnZTogcGVyX3BhZ2UudG9TdHJpbmcoKSwgcGFnZTogcGFnZS50b1N0cmluZygpfTtcclxuICAgICAgICAgICAgcGFyYW1zID0gey4uLnBhcmFtcywgLi4uYWRkUGFyYW1zfTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgICAgICByZXN1bHRDaHVuayA9IGF3YWl0IGdldEFjdGl2aXRpZXNGcm9tU3RyYXZhKHBhcmFtcyk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFsuLi5yZXN1bHQsIC4uLnJlc3VsdENodW5rXTtcclxuICAgICAgICAgICAgcGFnZSArPSAxO1xyXG4gICAgICAgIH0gd2hpbGUgKFxyXG4gICAgICAgICAgICByZXN1bHRDaHVuay5sZW5ndGggPT0gcGVyX3BhZ2VcclxuICAgICAgICApO1xyXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBwbGFjZSA9IFBMQUNFUy5maW5kKHBsYWNlID0+IGlzTmVhcihyZXMuc3RhcnRfbGF0bG5nLCBwbGFjZSkpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2UpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5zdHJhdmF2aXN1YWxQbGFjZSA9IHBsYWNlLm5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXMuc3RyYXZhdmlzdWFsUGxhY2UgPSAn0J3QtdC40LfQstC10YHRgtC90L4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcItCd0LDQudC00LXQvdC+IFwiLCByZXN1bHQubGVuZ3RoLCBcIiDRgNC10LfRg9C70YzRgtCw0YLQvtCyXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICBzZXRBY3Rpdml0aWVzKHJlc3VsdCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGxldCBhdXRoSW5mbyA9IGF1dGhEYXRhLnN0cmF2YUF1dGhJbmZvO1xyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEFjdGl2aXRpZXNGcm9tU3RyYXZhKHBhcmFtcykge1xyXG4gICAgICAgIC8v0L/RgNC40YHQvtC10LTQuNC90Y/QtdC8INC/0LDRgNCw0LzQtdGC0YDRiyDQt9Cw0L/RgNC+0YHQsCDQuiDQvtGB0L3QvtCy0L3QvtC80YMg0LDQtNGA0LXRgdGDINGA0LXRgdGD0YDRgdCwXHJcbiAgICAgICAgbGV0IHVybCA9IG5ldyBVUkwoJ2h0dHBzOi8vd3d3LnN0cmF2YS5jb20vYXBpL3YzL2F0aGxldGUvYWN0aXZpdGllcycpO1xyXG4gICAgICAgIC8vbGV0IHBhcmFtcyA9IHF1ZXJ5UGFyYW1zO1xyXG4gICAgICAgIHVybC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykudG9TdHJpbmcoKTtcclxuIFxyXG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZmV0Y2godXJsLCBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2F1dGhJbmZvLmFjY2Vzc190b2tlbn1gLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGRhdGEuanNvbigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybihcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8QWN0aXZpdHlGb3JtIGhhbmRsZUZvcm1TdWJtaXQ9e2hhbmRsZUZvcm1TdWJtaXR9Lz5cclxuICAgICAgICAgICAgPFNob3dSZXN1bHRzIHJlc3VsdExpc3Q9e2FjdGl2aXRpZXN9IC8+XHJcbiAgICAgICAgICAgIHsvKiA8YnV0dG9uIG9uQ2xpY2s9e2dldEFjdGl2aXRpZXNGcm9tU3RyYXZhfT7Qv9C+0LvRg9GH0LjRgtGMINC00LDQvdC90YvQtTwvYnV0dG9uPiAqL31cclxuICAgICAgICA8L2Rpdj5cclxuICAgICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIE1haW5wYWdlKHsgYXV0aERhdGEsIHNldEF1dGhEYXRhIH0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAge2F1dGhEYXRhLnN0YXR1cyA9PSBcInVuYXV0aG9yaXplZFwiID8gPFVuYXV0aG9yaXplZCBzZXRBdXRoRGF0YT17c2V0QXV0aERhdGF9IC8+IDogbnVsbH1cclxuICAgICAgICAgICAge2F1dGhEYXRhLnN0YXR1cyA9PSBcImF1dGhvcml6ZWRcIiA/IDxQYWdlIGF1dGhEYXRhPXthdXRoRGF0YX0gLz4gOiBudWxsfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIClcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEFwcCgpIHtcclxuICAgIGNvbnN0IFthdXRoRGF0YSwgc2V0QXV0aERhdGFdID0gdXNlU3RhdGUoe3N0YXR1czogXCJ1bmF1dGhvcml6ZWRcIiwgc3RyYXZhQXV0aEluZm86IHt9fSk7IC8vW1widW5hdXRob3JpemVkXCIsIFwiYXV0aG9yaXplZFwiLCBcInByb2Nlc3NpbmdcIl1cclxuXHJcbiAgICBmdW5jdGlvbiBzaWduT3V0KCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiU3RyYXZhQXV0aEluZm9cIik7XHJcbiAgICAgICAgLy9zZXRBdXRoRGF0YSh7c3RhdHVzOiBcInVuYXV0aG9yaXplZFwiLCBzdHJhdmFBdXRoSW5mbzoge319KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1Rva2VuRXhwaXJlZCh0b2tlbkV4cGlyZXNBdCkge1xyXG4gICAgICAgIGlmICgobmV3IERhdGUodG9rZW5FeHBpcmVzQXQgKiAxMDAwKSAtIERhdGUubm93KCkpIDwgMCApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2hUb2tlbih0b2tlbikge1xyXG4gICAgICAgIGxldCBkYXRhID0ge3JlZnJlc2hfdG9rZW46IHRva2VufTtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9yZWZyZXNodG9rZW4nLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3JlZnJlc2hUb2tlbjogcmVzcG9uc2U6ICcsIHJlc3VsdCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgLy/Qn9GA0L7QstC10YDRj9C10LwsINC/0L7Rj9Cy0LjQu9C40YHRjCDQu9C4INC00LDQvdC90YvQtSDQsiBzdHJhdmFBdXRoSW5mb1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ9Cf0YDQvtCy0LXRgNGP0Y4g0L3QsNC70LjRh9C40LUg0LTQsNC90L3Ri9GFINCyINCh0YLRgNCw0LLQsNCY0L3RhNC+Jyk7XHJcbiAgICAgICAgaWYgKGF1dGhEYXRhLnN0cmF2YUF1dGhJbmZvID09IHVuZGVmaW5lZCkge3JldHVybn1cclxuICAgICAgICBlbHNlIGlmIChPYmplY3Qua2V5cyhhdXRoRGF0YS5zdHJhdmFBdXRoSW5mbykubGVuZ3RoICE9PSAwICYmIGF1dGhEYXRhLnN0YXR1cyAhPT0gXCJhdXRob3JpemVkXCIpIHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IHsuLi5hdXRoRGF0YSwgc3RhdHVzOiBcImF1dGhvcml6ZWRcIn07XHJcbiAgICAgICAgICAgIHNldEF1dGhEYXRhKG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2F1dGhEYXRhXSk7XHJcblxyXG4gICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnQXBwLiDQmNC30LLQu9C10LrQsNC10Lwg0LTQsNC90L3Ri9C1INC40Lcg0LvQvtC60LDQu9GM0L3QvtCz0L4g0YXRgNCw0L3QuNC70LjRidCwLicpXHJcbiAgICAgICAgbGV0IG9iamVjdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0gKFwiU3RyYXZhQXV0aEluZm9cIikpO1xyXG4gICAgICAgIGlmIChvYmplY3QgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCfQkiDRhdGA0LDQvdC40LvQuNGJ0LUg0LTQsNC90L3Ri9GFINC90LXRgi4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKE9iamVjdC5rZXlzKG9iamVjdCkubGVuZ3RoID09IDApe1xyXG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCfQkiDRhdGA0LDQvdC40LvQuNGJ0LUg0LTQsNC90L3Ri9GFINC90LXRgi4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn0JTQsNC90L3Ri9C1INC/0L7Qu9GD0YfQtdC90Ys6ICcsIG9iamVjdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQotC+0LrQtdC9INC/0YDQvtGB0YDQvtGH0LXQvTogJywgaXNUb2tlbkV4cGlyZWQob2JqZWN0LmV4cGlyZXNfYXQpKTtcclxuICAgICAgICAgICAgaWYgKGlzVG9rZW5FeHBpcmVkKG9iamVjdC5leHBpcmVzX2F0KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLQntCx0L3QvtCy0LvRj9GOINGC0L7QutC10L0sIHJlZnJlc2hfdG9rZW46IFwiLCBvYmplY3QucmVmcmVzaF90b2tlbilcclxuICAgICAgICAgICAgICAgIHJlZnJlc2hUb2tlbihvYmplY3QucmVmcmVzaF90b2tlbilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihuZXdEYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Cf0L7Qu9GD0YfQtdC90Ysg0LTQsNC90L3Ri9C1INGBINGB0LXRgNCy0LXRgNCwOiAnLCBuZXdEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld09iamVjdCA9IHsgLi4ub2JqZWN0LCAuLi5uZXdEYXRhfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ9Ce0LHQvdC+0LLQu9GR0L3QvdGL0Lkg0L7QsdGK0LXQutGCINC00LDQvdC90YvRhTogJywgbmV3T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXV0aERhdGEoe3N0YXR1czogXCJhdXRob3JpemVkXCIsIHN0cmF2YUF1dGhJbmZvOiBuZXdPYmplY3R9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0gKFwiU3RyYXZhQXV0aEluZm9cIiwgSlNPTi5zdHJpbmdpZnkobmV3T2JqZWN0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRBdXRoRGF0YSh7c3RhdHVzOiBcImF1dGhvcml6ZWRcIiwgc3RyYXZhQXV0aEluZm86IG9iamVjdH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pXHJcbiAgIFxyXG5cclxuICAgIHJldHVybihcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8QnJvd3NlclJvdXRlcj5cclxuICAgICAgICAgICAgICAgIDxIZWFkZXIgYXV0aERhdGE9e2F1dGhEYXRhfSBzaWduT3V0PXtzaWduT3V0fSBzaWduSW49e2F1dGhBdFN0cmF2YX0vPlxyXG4gICAgICAgICAgICAgICAgPFJvdXRlcz5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIi9cIiBlbGVtZW50PXs8TWFpbnBhZ2UgYXV0aERhdGE9e2F1dGhEYXRhfSBzZXRBdXRoRGF0YT17c2V0QXV0aERhdGF9IC8+IH0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cImF1dGhcIiBlbGVtZW50PXs8QXV0aG9yaXphdGlvbiBhdXRoRGF0YT17YXV0aERhdGF9IGhhbmRsZURhdGE9e3NldEF1dGhEYXRhfSAvPn0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGUgcGF0aD1cIm1hcFwiIGVsZW1lbnQ9ezxNYXAgLz59IC8+XHJcbiAgICAgICAgICAgICAgICA8L1JvdXRlcz5cclxuICAgICAgICAgICAgPC9Ccm93c2VyUm91dGVyPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59XHJcblxyXG5jb25zdCBNYXAgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gPGRpdj7Ql9C00LXRgdGMINCx0YPQtNGD0YIg0LrQsNGA0YLRizwvZGl2PlxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGF1dGhBdFN0cmF2YSgpIHtcclxuICAgIGNvbnN0IGZpcnN0QXV0aExpbmsgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9yZXBvcnQmYXBwcm92YWxfcHJvbXB0PWZvcmNlJnNjb3BlPWFjdGl2aXR5OnJlYWRcIlxyXG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IFNUUkFWQV9HRVRfQ09ERV9MSU5LO1xyXG59XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoPEFwcCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7IiwiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIZWFkZXIoeyBhdXRoRGF0YSwgc2lnbk91dCwgc2lnbkluIH0pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJoZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2JvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyQXV0aEluZm8gYXV0aERhdGE9e2F1dGhEYXRhfSBzaWduT3V0PXtzaWduT3V0fSBzaWduSW49e3NpZ25Jbn0vPiBcclxuICAgICAgICAgICAgICAgICAgICA8TmF2IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IEF2YXRhciA9ICh7bGlua30pID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJfYXZhdGFyXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPXtsaW5rIHx8IG51bGx9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn1cclxuXHJcbmNvbnN0IFVzZXJOYW1lID0gKHtmaXJzdG5hbWUsIGxhc3RuYW1lfSkgPT4ge1xyXG4gICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cImhlYWRlcl91c2VybmFtZVwiPntmaXJzdG5hbWUgfHwgJyd9IHtsYXN0bmFtZSB8fCAnJ308L3NwYW4+XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBIZWFkZXJBdXRoSW5mbyh7IGF1dGhEYXRhLCBzaWduT3V0LCBzaWduSW4gfSkge1xyXG4gICAgbGV0IGF1dGhJbmZvID0gYXV0aERhdGEuc3RyYXZhQXV0aEluZm87XHJcbiAgICBsZXQgZGlzcGxheVVzZXJJbmZvID0gKGF1dGhEYXRhLnN0YXR1cyA9PSBcImF1dGhvcml6ZWRcIik7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJfdXNlcmluZm9cIj5cclxuICAgICAgICAgICAge2Rpc3BsYXlVc2VySW5mbyA/IFxyXG4gICAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgICAgICA8QXZhdGFyIGxpbms9e2F1dGhJbmZvLmF0aGxldGUucHJvZmlsZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8VXNlck5hbWUgZmlyc3RuYW1lPXthdXRoSW5mby5hdGhsZXRlLmZpcnN0bmFtZX0gbGFzdG5hbWU9e2F1dGhJbmZvLmF0aGxldGUubGFzdG5hbWV9IC8+IFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17c2lnbk91dH0+0JLRi9C50YLQuDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICAgICA6IDxidXR0b24gb25DbGljaz17c2lnbklufT7QktC+0LnRgtC4PC9idXR0b24+fVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIClcclxufVxyXG5cclxuY29uc3QgTmF2ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxuYXY+ICAgXHJcbiAgICAgICAgPExpbmsgdG89XCIvXCI+SG9tZTwvTGluaz58e1wiIFwifVxyXG4gICAgICAgIDxMaW5rIHRvPVwibWFwXCI+0JzQtdGB0YLQsDwvTGluaz4gXHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICApXHJcbn1cclxuIiwiY29uc3QgU1RSQVZBX0dFVF9DT0RFX0xJTksgPSBcImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vb2F1dGgvYXV0aG9yaXplP2NsaWVudF9pZD03NDY2OCZyZXNwb25zZV90eXBlPWNvZGUmcmVkaXJlY3RfdXJpPWh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hdXRoJmFwcHJvdmFsX3Byb21wdD1mb3JjZSZzY29wZT1hY3Rpdml0eTpyZWFkXCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNUUkFWQV9HRVRfQ09ERV9MSU5LOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcclxcbiAgICAtLWhlYWRlci1iZy1jb2xvcjogIzVlNTM3MztcXHJcXG4gICAgLS1idXR0b24tY29sb3I6IG9yYW5nZTtcXHJcXG4gICAgLS1tYWluLWJnLWNvbG9yOiAjMTNiNWNhO1xcclxcbiAgICAtLWhlYWRlci1saW5rOiB3aGl0ZTtcXHJcXG4gICAgLS1tYWluLXRleHQ6ICM1NTU7XFxyXFxufVxcclxcbmJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICdOYW51bSBHb3RoaWMnLCBzYW5zLXNlcmlmO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlYmYwO1xcclxcbiAgICBjb2xvcjogdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuI3dyYXBwZXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZlxcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gICAgbWF4LXdpZHRoOiA4MDBweDtcXHJcXG4gICAgbWFyZ2luOiAwcHggYXV0bztcXHJcXG4gICAgcGFkZGluZzogMHB4IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNyb290IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBwYWRkaW5nOiAxMDBweCAxMHB4IDEwcHggMTBweDtcXHJcXG59XFxyXFxuLnVuYXV0aCB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC1zaXplOiAxZW07XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIG1hcmdpbjogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciB7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgei1pbmRleDogNTA7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcjpiZWZvcmV7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGVhZGVyLWJnLWNvbG9yKTtcXHJcXG59XFxyXFxuLmhlYWRlcl9ib2R5IHtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICB6LWluZGV4OiAyO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIGhlaWdodDogODBweDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlciBhIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWhlYWRlci1saW5rKTtcXHJcXG4gICAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuLmhlYWRlciBidXR0b24ge1xcclxcbiAgICBmb250LXNpemU6IC44ZW07XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlYWRlcl91c2VyaW5mbyB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi5oZWFkZXJfYXZhdGFyIHtcXHJcXG4gICAgZmxleDogMCAwIDYwcHg7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciBpbWcge1xcclxcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uYWN0aXZpdHktZm9ybSBpbnB1dCB7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBmaWVsZHRleHQge1xcclxcbiAgICBjb2xvcjogdmFyKC0tbWFpbi10ZXh0KTtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gbGVnZW5kIHtcXHJcXG4gICAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG4uYWN0aXZpdHktZm9ybSBmaWVsZHNldCB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4ucmVzdWx0LWxpc3Qge1xcclxcbiAgICBmb250LXNpemU6IDAuOGVtO1xcclxcbiAgICBsaW5lLWhlaWdodDogMWVtO1xcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0Qix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLGlCQUFpQjtBQUNyQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHVDQUF1QztJQUN2Qyx5QkFBeUI7SUFDekIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCO0FBQ0o7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsNkJBQTZCO0FBQ2pDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFdBQVc7SUFDWCxNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixNQUFNO0lBQ04sT0FBTztJQUNQLFdBQVc7SUFDWCxZQUFZO0lBQ1osd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsWUFBWTtJQUNaLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0NBQWtDO0lBQ2xDLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gICAgLS1oZWFkZXItYmctY29sb3I6ICM1ZTUzNzM7XFxyXFxuICAgIC0tYnV0dG9uLWNvbG9yOiBvcmFuZ2U7XFxyXFxuICAgIC0tbWFpbi1iZy1jb2xvcjogIzEzYjVjYTtcXHJcXG4gICAgLS1oZWFkZXItbGluazogd2hpdGU7XFxyXFxuICAgIC0tbWFpbi10ZXh0OiAjNTU1O1xcclxcbn1cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZWJmMDtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcblxcclxcbiN3cmFwcGVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBmb250LWZhbWlseTogJ05hbnVtIEdvdGhpYycsIHNhbnMtc2VyaWZcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICAgIG1heC13aWR0aDogODAwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDBweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4jcm9vdCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgcGFkZGluZzogMTAwcHggMTBweCAxMHB4IDEwcHg7XFxyXFxufVxcclxcbi51bmF1dGgge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIG1hcmdpbjogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtc2l6ZTogMWVtO1xcclxcbiAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICBtYXJnaW46IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIge1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHotaW5kZXg6IDUwO1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXI6YmVmb3Jle1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1iZy1jb2xvcik7XFxyXFxufVxcclxcbi5oZWFkZXJfYm9keSB7XFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBoZWlnaHQ6IDgwcHg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXIgYSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1oZWFkZXItbGluayk7XFxyXFxuICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcbi5oZWFkZXIgYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiAuOGVtO1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi5oZWFkZXJfdXNlcmluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uaGVhZGVyX2F2YXRhciB7XFxyXFxuICAgIGZsZXg6IDAgMCA2MHB4O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLmhlYWRlcl9hdmF0YXIgaW1nIHtcXHJcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLmFjdGl2aXR5LWZvcm0gaW5wdXQge1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLW1haW4tdGV4dCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGR0ZXh0IHtcXHJcXG4gICAgY29sb3I6IHZhcigtLW1haW4tdGV4dCk7XFxyXFxufVxcclxcbi5hY3Rpdml0eS1mb3JtIGxlZ2VuZCB7XFxyXFxuICAgIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuLmFjdGl2aXR5LWZvcm0gZmllbGRzZXQge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlc3VsdC1saXN0IHtcXHJcXG4gICAgZm9udC1zaXplOiAwLjhlbTtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDFlbTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJhcHBcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3N0cmF2YXZpc3VhbFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtzdHJhdmF2aXN1YWxcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9BcHAuanN4XCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlJlYWN0RE9NIiwiTGluayIsIlJvdXRlcyIsIlJvdXRlIiwiQnJvd3NlclJvdXRlciIsInVzZUxvY2F0aW9uIiwidXNlTmF2aWdhdGUiLCJVUkxTZWFyY2hQYXJhbXMiLCJheGlvcyIsIlNUUkFWQV9HRVRfQ09ERV9MSU5LIiwiSGVhZGVyIiwiUExBQ0VTIiwibmFtZSIsImxhdGxuZyIsImlzTmVhciIsInBsYWNlIiwicmFkaXVzIiwiZGlzdCIsIk1hdGgiLCJzcXJ0IiwicG93IiwiVW5hdXRob3JpemVkIiwic2V0QXV0aERhdGEiLCJzdGF0dXMiLCJhdXRoQXRTdHJhdmEiLCJBdXRob3JpemF0aW9uIiwiYXV0aERhdGEiLCJoYW5kbGVEYXRhIiwibG9jYXRpb24iLCJuYXZpZ2F0ZSIsInBhcmFtcyIsInNlYXJjaCIsImNsaWVudENvZGUiLCJnZXQiLCJkYXRhIiwiY29kZSIsImZldGNoQXV0aEluZm8iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXMiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJzdHJhdmFBdXRoSW5mbyIsIkFjdGl2aXR5Rm9ybSIsImhhbmRsZUZvcm1TdWJtaXQiLCJiZWZvcmUiLCJzZXRCZWZvcmUiLCJhZnRlciIsInNldEFmdGVyIiwiZGF0ZSIsIkRhdGUiLCJkYXRlMSIsIm5vdyIsInRvSVNPU3RyaW5nIiwic3BsaXQiLCJoYW5kbGVFbmREYXRlIiwiZSIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU3RhcnREYXRlIiwiaGFuZGxlU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJkYXRlQmVmb3JlIiwicGFyc2UiLCJ0b1N0cmluZyIsImRhdGVBZnRlciIsImZvcm1EYXRhIiwiU2hvd1Jlc3VsdHMiLCJyZXN1bHRMaXN0IiwibGVuZ3RoIiwibWFwIiwiaSIsInN0YXJ0X2RhdGUiLCJzdHJhdmF2aXN1YWxQbGFjZSIsInN0YXJ0X2xhdGxuZyIsIlBhZ2UiLCJxdWVyeVBhcmFtcyIsInNldFF1ZXJ5UGFyYW1zIiwiYWN0aXZpdGllcyIsInNldEFjdGl2aXRpZXMiLCJwZXJfcGFnZSIsInBhZ2UiLCJyZXN1bHQiLCJyZXN1bHRDaHVuayIsImFkZFBhcmFtcyIsImdldEFjdGl2aXRpZXNGcm9tU3RyYXZhIiwiZm9yRWFjaCIsImZpbmQiLCJhdXRoSW5mbyIsInVybCIsIlVSTCIsIkFjY2VwdCIsImFjY2Vzc190b2tlbiIsIk1haW5wYWdlIiwiQXBwIiwic2lnbk91dCIsInJlbW92ZUl0ZW0iLCJpc1Rva2VuRXhwaXJlZCIsInRva2VuRXhwaXJlc0F0IiwicmVmcmVzaFRva2VuIiwidG9rZW4iLCJyZWZyZXNoX3Rva2VuIiwicmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJrZXlzIiwib2JqIiwib2JqZWN0IiwiZ2V0SXRlbSIsImV4cGlyZXNfYXQiLCJuZXdEYXRhIiwibmV3T2JqZWN0IiwiTWFwIiwiZmlyc3RBdXRoTGluayIsImRvY3VtZW50IiwiaHJlZiIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwic2lnbkluIiwiQXZhdGFyIiwibGluayIsIlVzZXJOYW1lIiwiZmlyc3RuYW1lIiwibGFzdG5hbWUiLCJIZWFkZXJBdXRoSW5mbyIsImRpc3BsYXlVc2VySW5mbyIsImF0aGxldGUiLCJwcm9maWxlIiwiTmF2IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=