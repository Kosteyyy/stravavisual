import React, { useState, useEffect } from "react";
import URLSearchParams from 'url-search-params';
import { useLocation } from "react-router-dom";


import ActivityFilter from './ActivityFilter.jsx';
import { PLACES } from "./constants.js";
import ResultList from './ResultList.jsx';
import { isNear } from './functions.js';
import { AggregateDistanceToPlaces } from './Aggregate.jsx';
import Loading from "./Loading.jsx";

function translateType(type) {
    switch(type) {
        case 'Run': return 'Бег';
        case 'NordicSki': return 'Лыжи';
        case 'Ride': return 'Велосипед';
        case 'Swim': return 'Плавание';
    }
}

export default function Activities(props) { 
    let { activityList, setActivityList, accessToken, chartColors } = props;
    let currentLocation = useLocation();
    const [loading, setLoading] = useState(false);
    // console.log("rendering Activities");
    const [queryParams, setQueryParams] = useState({}); //{after: "2021-11-23", before: "2021-12-23", type: "Ride"}
    const [activities, setActivities] = useState([]); //Сохраняю в состоянии поскольку они отфильтрованы, возможно, надо заменить 
    // на входящий список с фильтром. пока что параметры фильтра сбрасываются при навигации, поэтому приходится делать новый запрос
    //console.log("ACTIVITIES: queryParams: ", queryParams, "loading: ", loading, "Activities.length: ", activities.length);

    async function getData(params, accessToken) {
        //console.log("ПОЛУЧАЮ ДАННЫЕ ПО ФИЛЬТРУ");
        //Готовит параметры запроса и получает постранично данные с сервера Страва
        let per_page = 30; 
        let page = 1;
        let result = [];
        let resultChunk = [];
        setLoading(true);
        //console.log("ACTIVITIES - getData. Изменился Loading. RERENDER. loading set to true", loading);
        do {
            let addParams = {
                per_page: per_page.toString(),
                page: page.toString(),
                before: (Date.parse(queryParams.before) / 1000 + 24 * 60 *60 ).toString(),
                after: (Date.parse(queryParams.after) / 1000).toString()
            };
            let fetchparams = {...params, ...addParams};
            //console.log(fetchparams);
            resultChunk = await fetchActivitiesFromStrava(fetchparams, accessToken);
            result = [...result, ...resultChunk];
            page += 1;
        } while (
            resultChunk.length == per_page
        );

        //Добавляем поле stravavisualPlace к активности, которое идентифицирует место тренировки
        result.forEach(res => {
            res.stravavisualCount = 1; // добавляем параметр число 1 к активности, чтобы потом посчитать можно было в аггрегации поэтому полю.
            let place = PLACES.find(place => isNear(res.start_latlng, place));
            if (place) {
                res.stravavisualPlace = place.name;
            } else {
                res.stravavisualPlace = 'Неизвестно';
            }
            res.type = translateType(res.type); //Меняем вид активности на вид на русском языке
        });
        setLoading(false);
        //console.log("ACTIVITIES - getData. Изменился Loading. RERENDER. loading set to false", loading);
        return result;
    }

    async function fetchActivitiesFromStrava(params, accessToken) {
        //присоединяем параметры запроса к основному адресу ресурса
        let url = new URL('https://www.strava.com/api/v3/athlete/activities');
        //let params = queryParams;
        url.search = new URLSearchParams(params).toString();
        //console.log("Fetching data, Activities component");
        let data = await fetch(url, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        });
        
        let result = await data.json();
        //console.log(result);
        return result;
    }

    function defineQueryParams() {
        // console.log("location: ", location.search);
        let params = new URLSearchParams(location.search);
        //console.log("Define queryParams. location: ", currentLocation);
        let queryObject = Object.assign({},
            params.get('type') ? {'type': params.get('type')} : '',
            params.get("before") ? { 'before': params.get('before')} : null, 
            params.get("after") ? { 'after': params.get('after')} : null, 
            );
        // console.log(queryObject);
        //console.log("ACTIVITIES - defineQueryParams. Изменился queryParams. RERENDER. queryParams now ", queryParams); 
        setQueryParams(queryObject);
    }

    useEffect(() => {
        //console.log("useEffect 1");
        defineQueryParams();
    }, [currentLocation]);

    // При изменении фильтра загружаем активности
    useEffect(() => {
        //console.log("useEffect 2");
        if (Object.keys(queryParams).length==0) return;
        //console.log("ДАТЫ ФИЛЬТРА ИЗМЕНИЛИСЬ (ИЛИ ПРИ РЕНДЕРЕ СЮДА ЗАШЛИ), БУДУ ПОЛУЧАТЬ ДАННЫЕ И УСТАНОВЛЮ ИХ В МАССИВ. Пока ререндера нет");
        //console.log("На сейчас длина Входящих данных ", activityList.length);
        getData(queryParams, accessToken)
            .then(res => setActivityList(res))
            .catch(err => console.log(err));
    }, [queryParams.before, queryParams.after]);

    // При изменении активностей применяем к ним фильтр и загружаем в стэйт
    useEffect(() => {
        //console.log("useEffect 3");
        //Если массив пустой то тоже фильтруем потому что может быть на сервере ничего не нашли и он пустой
        //А если пропустим, то отрендерится старый массив
        //console.log("МАССИВ ДАННЫХ ИЛИ ПАРАМЕТРЫ ПОИСКА ИЗМЕНИЛИСЬ, ПРИМЕНЯЮ ФИЛЬТР. РЕРЕНДЕР");
        //console.log("queryParams", queryParams, "activityList: ", activityList);
        setActivities(activityList.filter((el => queryParams.type ? (el.type == queryParams.type) : true))); // Здесь ещё будет применён фильтр
    }, [activityList, queryParams]);

    //console.log("Рендерю ACTIVITIES компонент.")
    return(
        <div id="activities" className="content">
            <ActivityFilter handleFormSubmit={defineQueryParams} filterParams={queryParams}/>
            {loading && <Loading />}
            {activities.length !== 0 && !loading ? <AggregateDistanceToPlaces activitiesList={activities} chartColors={chartColors}/> : null}
            {!loading && <ResultList resultList={activities} />}
            {/* <button onClick={getActivitiesFromStrava}>получить данные</button> */}
        </div>
     )
}