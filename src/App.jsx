import React, { useState, useEffect, useContext } from 'react';
import { ColorContext } from './Context';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import "./style.css";
import { PLACES, COLORS, CHART_COLORS } from './constants';
import { loadJSON, saveJSON, isTokenExpired, authAtStrava, refreshToken, isNear } from './functions.js';

import Header from './Header.jsx';
import Unauthorized from './Unauthorized.jsx';
import Authorization from './Authorization.jsx';
import Activities from './Activities.jsx';
import Settings from './Settings.jsx';

function Mainpage({ authInfo }) {
    let { isAuth } = authInfo;
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/notauth");
        } else {
            navigate("./activities")
        }
    }, [isAuth])
    
    return (
        <div>
            MainPage
        </div>

    )
}

function App() {
    const [authInfo, setAuthInfo] = useState(loadJSON("StravaAuthInfo") || { "isAuth": false }); // При загрузке компонента читаем данные из хранилища. Если их нет - неавторизованы
    const [activityList, setActivityList] = useState([]);
    const [appColors, setAppColors] = useState(loadJSON("StravavisualAppColors") || COLORS);
    const [chartColors, setChartColors] = useState(loadJSON("StravavisualChartColors") || CHART_COLORS[0]);
    const [trainingPlaces, setTrainingPlaces] = useState(loadJSON("StravaTrainingPlaces") || PLACES); // Массив элементов вида     {name: 'Одинцово', latlng: [55.69, 37.25]}

    function saveTrainingPlaces(places) {
        setTrainingPlaces(places);
        saveJSON("StravaTrainingPlaces", places);
    }

    function addTrainingPlace(place) {
        let newPlaces = [...trainingPlaces];
        let isPlaceNew = true;
        newPlaces.forEach((el) => {
            if (el.latlng[0] == place.latlng[0] && el.latlng[1] == place.latlng[1]) {
                el.name = place.name; 
                isPlaceNew = false;
            }
        });
        if (isPlaceNew) newPlaces.push(place);
        saveTrainingPlaces(newPlaces);

        let newActivities = [...activityList];
        newActivities.forEach(activity => {
            if(isNear(activity.start_latlng, place)) {
                activity.stravavisualPlace = place.name;
            }
        });
        setActivityList(newActivities);
    }

    function changeAuthInfo(info) {
        setAuthInfo(info);
        saveJSON("StravaAuthInfo", info);
    }

    function signOut() {
        changeAuthInfo({ "isAuth": false });
    }
    function saveChartColors(colors) {
        setChartColors(colors);
        saveJSON("StravavisualChartColors", colors);
    }
    function saveAppColors(colors) {
        setAppColors(colors);
        saveJSON("StravavisualAppColors", colors);
    }
    
    // useEffect(() => setTimeout(() => {
    //     setAppColors({...appColors, "mainColor": "red"});
    // }, 5000), []);

    useEffect(() => {
        //Проверяем срок токена
        if (!authInfo.isAuth) return; //Если не авторизованы - выходим, проверять нечего.
        let tokenExpired = isTokenExpired(authInfo.expires_at);
        //console.log('Токен просрочен?: ', tokenExpired);
        if (tokenExpired) {
            //console.log("Обновляю токен, refresh_token: ", authInfo.refresh_token)
            refreshToken(authInfo.refresh_token)
                .then(data => {
                    //console.log('Получены данные с сервера: ', data);
                    changeAuthInfo({ ...authInfo, ...data});
                })
                .catch(error => console.log(error));
        } 
    }, []);
   
    return(
        <ColorContext.Provider value={{appColors}}>
            <BrowserRouter>
                <Header authInfo={authInfo} signOut={signOut} signIn={authAtStrava}/>
                <Routes>
                    <Route path="/" element={<Mainpage authInfo={authInfo} /> } /> 
                    <Route path="auth" element={<Authorization authInfo={authInfo} handleData={changeAuthInfo}/>} />
                    <Route path="map" element={<Map />} />
                    <Route path="notauth" element={<Unauthorized />} />
                    <Route path="activities" element={<Activities 
                        activityList={activityList}
                        setActivityList={setActivityList}
                        accessToken={authInfo.access_token}
                        chartColors={chartColors}
                        trainingPlaces={trainingPlaces}
                        addTrainingPlace={addTrainingPlace}
                        saveTrainingPlaces={saveTrainingPlaces} />} />
                    <Route path="secret" element={<Secret />} />  
                    <Route path="settings" element={<Settings colors={appColors} setColors={saveAppColors} setChartColors={saveChartColors} />} />  
                    <Route path="*" element={<NotFound />} />                 
                </Routes>
            </BrowserRouter>
        </ColorContext.Provider>
    )
}
const Secret = () => {
    return <div>I love you!</div>
}
const Map = () => {
    return <div>Здесь будут карты</div>
}
const NotFound = () => {
    return <div>Page not found</div>
}

ReactDOM.render(<App />, document.getElementById('root'));