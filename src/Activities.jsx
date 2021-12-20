import React, { useState, useEffect } from "react";
import URLSearchParams from 'url-search-params';
import { Chart, BarElement, BarController, LinearScale, CategoryScale, registerables } from 'chart.js';
// Chart.register();
Chart.register(BarElement, LinearScale, BarController, CategoryScale);


import ActivityFilter from './ActivityFilter.jsx';
import { PLACES } from "./constants.js";
import ResultList from './ResultList.jsx';
import { isNear } from './functions.js';

function ChartComponent() {
    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, [])
    

return <canvas id="myChart" width="400" height="400"></canvas>

}

function ShowAggregatedResults({activitiesList}) {
    const [state, setState] = useState([]);
    // function aggregateResultsPlaceDistance(data = []) {
    //     //Аггрегирует активности по местам и соответствующим дистанциям, на выходе объект
    //     let placedistobj = {};
        
    //     data.forEach(el => {
    //         if (placedistobj[el.stravavisualPlace] == undefined) placedistobj[el.stravavisualPlace] = 0;
    //         placedistobj[el.stravavisualPlace] += Number(el.distance);
    //     });

    //     return placedistobj;
    // }

    function aggrData(data, keyField, targetField ) {
        //Аггрегирует в массиве объектов data данные по полю объектов keyField, суммируя поля targetField
        let result = {};
        data.forEach(el => {
            if (result[el[keyField]] == undefined) result[el[keyField]] = 0;
            result[el[keyField]] += Number(el[targetField]);
        })
        return result;
    }

    useEffect(() => {
        //let aggrobject = aggregateResultsPlaceDistance(activitiesList);
        let aggrobject = aggrData(activitiesList, "stravavisualPlace", "distance");
        console.log('arrgobject1: ', aggrobject);
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
            <ChartComponent />
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