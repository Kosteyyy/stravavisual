import React, { useState, useEffect } from "react";
import URLSearchParams from 'url-search-params';

import ActivityFilter from './ActivityFilter.jsx';
import { PLACES } from "./constants.js";
import ResultList from './ResultList.jsx';
import { isNear } from './functions.js';
import { AggregateDistanceToPlaces } from './Aggregate.jsx';



export default function Activities({ activityList, setActivityList, accessToken }) { 
    // console.log("rendering Activities");
    const [queryParams, setQueryParams] = useState({}); //{after: "2021-11-20", before: "2021-12-20"}
    const [activities, setActivities] = useState([]); //Сохраняю в состоянии поскольку они отфильтрованы, возможно, надо заменить 
    // на входящий список с фильтром. пока что параметры фильтра сбрасываются при навигации, поэтому приходится делать новый запрос

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
            res.stravavisualCount = 1;
            let place = PLACES.find(place => isNear(res.start_latlng, place));
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

    // При изменении фильтра загружаем активности
    useEffect(() => {
        getData(queryParams, accessToken)
            .then(res => setActivityList(res))
            .catch(err => console.log(err));
    }, [queryParams]);

    // При изменении активностей применяем к ним фильтр и загружаем в стэйт
    useEffect(() => {
        setActivities(activityList.filter((el => queryParams.type ? (el.type == queryParams.type) : true))); // Здесь ещё будет применён фильтр
    }, [activityList]);

    return(
        <div id="activities" className="content">
            <ActivityFilter handleFormSubmit={setQueryParams}/>
            {activities ? <AggregateDistanceToPlaces activitiesList={activities}/> : null}
            <ResultList resultList={activities} />
            {/* <button onClick={getActivitiesFromStrava}>получить данные</button> */}
        </div>
     )
}