import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link, Routes, Route, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import axios from 'axios';
import "./style.css";
import STRAVA_GET_CODE_LINK from './constants';

import Header from './Header.jsx';


const PLACES = [
    {name: 'Митино Парк', latlng: [55.84, 37.37]},
    {name: 'Мещерский Парк', latlng: [55.66, 37.40]},
    {name: 'Стадион Зоркий', latlng: [55.84, 37.32]},
    {name: 'Одинцово', latlng: [55.69, 37.25]},
]

function isNear(latlng, place, radius=0.04) {
    let dist = Math.sqrt(Math.pow(latlng[0]-place.latlng[0], 2) + Math.pow(latlng[1]-place.latlng[1], 2));
    return (dist < radius);
}

function Unauthorized({setAuthData}) {
    //Отображается на стартовой странице если клиент не авторизован в страва
    return(
        <div className='unauth'>
            <div>This is Unauthorized</div>
            <div>Вы не авторизованы. При нажатии на кнопку вы перейдёте на сайт Strava для авторизации.</div>
            <button onClick={() => {
                setAuthData({status: "processing"});
                authAtStrava();
                }
            }>Авторизоваться в Strava</button>
        </div>
    )
}

function Authorization({ authData, handleData }) {
    //Сюда приходит переадресация со стравы и здесь мы получаем токены и обозначаем авторизацию
    let location = useLocation();
    let navigate = useNavigate();
    if (authData.status == "authorized") {
        navigate('/');
    }
    let params = new URLSearchParams(location.search);
    let clientCode = params.get("code"); // выделили код присланный Стравой из адреса
    const data = {code: clientCode};

    async function fetchAuthInfo() {
        if (authData.status !== "authorized") {
                fetch('/api/gettokenfromcode', {
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    console.log('fetchAuthInfo: response: ', res);
                    localStorage.setItem ("StravaAuthInfo", JSON.stringify(res));
                    handleData({status: "unauthorized", stravaAuthInfo: res}); //Чтобы избежать ререндеринга Роутера пока статус оставляем unauth, обработаем в App
                    navigate('/');
                });
            } else {
                //navigate('/');
            }
    }

    useEffect(() => fetchAuthInfo(), []);
  
    return(
        <div>
            <h1>This is Authorization</h1>
        </div>
    )
}

function ActivityForm({handleFormSubmit}) {
    const [before, setBefore] = useState('2021-10-20'); //{activityBefore, activityAfter}
    const [after, setAfter] = useState('2021-10-20');

    useEffect(() => {
        let date = new Date();
        let date1 =  new Date( Date.now() - 6700000000 );
        setBefore(date.toISOString().split('T')[0]);
        setAfter(date1.toISOString().split('T')[0]);

    },[])

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
        }
        handleFormSubmit(formData);
        //console.log(`Получим данные между ${dateBefore} и ${dateAfter}`);
        //console.log('formData: ', formData);
    }

    return(
        <form className='activity-form'>
            <fieldset>
                <legend>Дата начала</legend>
                <input type="date" id="start" name="activity-after"
                    value={after} onChange={handleStartDate}
                    min="2018-01-01"></input>
                <legend>Дата конца</legend>
                <input type="date" id="end" name="activity-before"
                    value={before} onChange={handleEndDate}
                    min="2018-01-01"></input>
            </fieldset>
            <button type="submit" onClick={handleSubmit}>Найти</button>

        </form>
    )
}

function ShowResults({resultList} = []) {
    return (
        <div>
            <div>Найдено: {resultList.length} </div>
            {resultList.map((res, i) => 
                <div className="result-list" key={i}>
                    {res.start_date.split('T')[0]} - {res.name} - {res.stravavisualPlace} - {res.start_latlng[0]}, {res.start_latlng[1]}
                </div>)}
        </div>
    )
}

function Page({ authData }) { 
    const [queryParams, setQueryParams] = useState({before: '1639833642', after: '1633046400'})
    const [activities, setActivities] = useState([]);

    async function handleFormSubmit(params) {
        setQueryParams(params);
        let per_page = 30; 
        let page = 1;
        let result = [];
        let resultChunk = [];
        do {
            let addParams = {per_page: per_page.toString(), page: page.toString()};
            params = {...params, ...addParams};
            //console.log(params);
            resultChunk = await getActivitiesFromStrava(params);
            result = [...result, ...resultChunk];
            page += 1;
        } while (
            resultChunk.length == per_page
        );
        result.forEach(res => {
            let place = PLACES.find(place => isNear(res.start_latlng, place));
            if (place) {
                res.stravavisualPlace = place.name;
            } else {
                res.stravavisualPlace = 'Неизвестно';
            }
        });
        //console.log("Найдено ", result.length, " результатов");
        //console.log(result);
        setActivities(result);    
    }

    let authInfo = authData.stravaAuthInfo;

    async function getActivitiesFromStrava(params) {
        //присоединяем параметры запроса к основному адресу ресурса
        let url = new URL('https://www.strava.com/api/v3/athlete/activities');
        //let params = queryParams;
        url.search = new URLSearchParams(params).toString();
 
        let data = await fetch(url, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authInfo.access_token}`,
            }
        });
        
        let result = await data.json();
        //console.log(result);
        return result;
    }

    return(
        <div>
            <ActivityForm handleFormSubmit={handleFormSubmit}/>
            <ShowResults resultList={activities} />
            {/* <button onClick={getActivitiesFromStrava}>получить данные</button> */}
        </div>
     )
}

function Mainpage({ authData, setAuthData }) {
    return (
        <div>
            {authData.status == "unauthorized" ? <Unauthorized setAuthData={setAuthData} /> : null}
            {authData.status == "authorized" ? <Page authData={authData} /> : null}
        </div>

    )
}


function App() {
    const [authData, setAuthData] = useState({status: "unauthorized", stravaAuthInfo: {}}); //["unauthorized", "authorized", "processing"]

    function signOut() {
        localStorage.removeItem("StravaAuthInfo");
        //setAuthData({status: "unauthorized", stravaAuthInfo: {}});
    }

    function isTokenExpired(tokenExpiresAt) {
        if ((new Date(tokenExpiresAt * 1000) - Date.now()) < 0 ) {
            return true;
        }
        else return false;
    }

    async function refreshToken(token) {
        let data = {refresh_token: token};
        let response = await fetch('/api/refreshtoken', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        let result = await response.json();
        //console.log('refreshToken: response: ', result);
        return result
    }

    useEffect(() => {
        //Проверяем, появились ли данные в stravaAuthInfo
        //console.log('Проверяю наличие данных в СтраваИнфо');
        if (authData.stravaAuthInfo == undefined) {return}
        else if (Object.keys(authData.stravaAuthInfo).length !== 0 && authData.status !== "authorized") {
            let obj = {...authData, status: "authorized"};
            setAuthData(obj);
        }
    }, [authData]);

     useEffect(() => {
        //console.log('App. Извлекаем данные из локального хранилища.')
        let object = JSON.parse(localStorage.getItem ("StravaAuthInfo"));
        if (object == null) {
        //    console.log('В хранилище данных нет.');
        } else if (Object.keys(object).length == 0){
        //    console.log('В хранилище данных нет.');
        } else {
            console.log('Данные получены: ', object);
            console.log('Токен просрочен: ', isTokenExpired(object.expires_at));
            if (isTokenExpired(object.expires_at)) {
                console.log("Обновляю токен, refresh_token: ", object.refresh_token)
                refreshToken(object.refresh_token)
                    .then(newData => {
                        console.log('Получены данные с сервера: ', newData);
                        let newObject = { ...object, ...newData};
                        console.log('Обновлённый объект данных: ', newObject);
                        setAuthData({status: "authorized", stravaAuthInfo: newObject});
                        localStorage.setItem ("StravaAuthInfo", JSON.stringify(newObject));
                    });
            } else {
                setAuthData({status: "authorized", stravaAuthInfo: object});
            }
        }
    }, [])
   

    return(
        <>
            <BrowserRouter>
                <Header authData={authData} signOut={signOut} signIn={authAtStrava}/>
                <Routes>
                    <Route path="/" element={<Mainpage authData={authData} setAuthData={setAuthData} /> } />
                    <Route path="auth" element={<Authorization authData={authData} handleData={setAuthData} />} />
                    <Route path="map" element={<Map />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const Map = () => {
    return <div>Здесь будут карты</div>
}



function authAtStrava() {
    const firstAuthLink = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/report&approval_prompt=force&scope=activity:read"
    document.location.href = STRAVA_GET_CODE_LINK;
}

ReactDOM.render(<App />, document.getElementById('root'));