import React, { useState, useEffect } from "react";
import URLSearchParams from 'url-search-params';

import ActivityFilter from './ActivityFilter.jsx';
import { PLACES } from "./constants.js";
import ResultList from './ResultList.jsx';
import { isNear } from './functions.js';

function ShowAggregatedResults({activitiesList}) {
    const [state, setState] = useState([]);
    function aggregateResultsPlaceDistance(data = []) {
        //Аггрегирует активности по местам и соответствующим дистанциям, на выходе объект
        let placedistobj = {};
        
        data.forEach(el => {
            if (placedistobj[el.stravavisualPlace] == undefined) placedistobj[el.stravavisualPlace] = 0;
            placedistobj[el.stravavisualPlace] += Number(el.distance);
        });

        return placedistobj;
    }
    useEffect(() => {
        let aggrobject = aggregateResultsPlaceDistance(activitiesList);
        console.log('actList: ', activitiesList);
        console.log('aggr: ', aggrobject);
        let diaData = Object.keys(aggrobject).map((key) => {
             return {x: key, y: aggrobject[key]};
        });
        setState(diaData);
        console.log('diaData: ', diaData);
    }, [activitiesList]);

    // const myData = [
    //     { x: "Group A", y: 900 },
    //     { x: "Group B", y: 400 },
    //     { x: "Group C", y: 300 },
    //   ];

    return(
        <div>
            {state.length ? <h1>Распределение километража по месту</h1> : null }
            {/* <VictoryPie
                data={state}
                colorScale={["BurlyWood", "LightSkyBlue", "LightCoral", "LightPink", "Teal"]}
                radius={100}
            /> */}
        </div>
    )
}

export default function Activities({ activityList, setActivityList, accessToken }) { 
    const [queryParams, setQueryParams] = useState({})
    const [activities, setActivities] = useState([]);

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
            console.log(fetchparams);
            resultChunk = await fetchActivitiesFromStrava(fetchparams, accessToken);
            result = [...result, ...resultChunk];
            page += 1;
        } while (
            resultChunk.length == per_page
        );
        //Добавляем поле stravavisualPlace к активности, которое идентифицирует место тренировки
        result.forEach(res => {
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
        console.log("Fetching data, Activities component");
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
        setActivities(activityList); // Здесь ещё будет применён фильтр
    }, [activityList]);

    return(
        <div>
            <ActivityFilter handleFormSubmit={setQueryParams}/>
            {activities ? <ShowAggregatedResults activitiesList={activities}/> : null}
            <ResultList resultList={activities} />
            {/* <button onClick={getActivitiesFromStrava}>получить данные</button> */}
        </div>
     )
}