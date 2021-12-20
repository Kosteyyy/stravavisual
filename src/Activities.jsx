import React, { useState, useEffect } from "react";
import URLSearchParams from 'url-search-params';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

import ActivityFilter from './ActivityFilter.jsx';
import { PLACES } from "./constants.js";
import ResultList from './ResultList.jsx';
import { isNear } from './functions.js';

// function ChartComponent({ data = [] }) {
//     const [showChart, setShowChart] = useState(false);
//     console.log('ChartComponent. data: ', data);


//     useEffect(() => {
//         const ctx = document.getElementById('myChart').getContext('2d');
//         if (data.labels.length == 0) return;
//         // const data = {
//         //     labels: labels,
//         //     datasets: [{
//         //       label: 'My First Dataset',
//         //       data: chartdata,
//         //       backgroundColor: [
//         //         'rgb(255, 99, 132)',
//         //         'rgb(54, 162, 235)',
//         //         'red',
//         //         'green',
                
//         //       ],
//         //       hoverOffset: 4
//         //     }]
//         //   };
//         const myChart = new Chart(ctx, {
//             type: 'pie',
//             data: data,
//         });
//         setShowChart(true);
//     }, [data])

//     // return <canvas id="myChart" width="400" height="400"></canvas>
//     return (
//         <canvas id="myChart" width="400" height="400"></canvas>
//     )

// }

function ShowAggregatedResults({activitiesList}) {
    const [aggrData, setAggrData] = useState([]);
    const [showChart, setShowChart] = useState(false);
    let startData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      };
    const [chartData, setChartData] = useState({})

    function calcAggrData(data, keyField, targetField ) {
        //Аггрегирует в массиве объектов data данные по полю объектов keyField, суммируя поля targetField
        let result = {};
        data.forEach(el => {
            if (result[el[keyField]] == undefined) result[el[keyField]] = 0;
            result[el[keyField]] += Number(el[targetField]);
        })
        return result;
    }

    useEffect(() => {
        if (activitiesList.length == 0) { 
            setShowChart(false);
            return;
        }
        //let aggrobject = aggregateResultsPlaceDistance(activitiesList);
        let aggrobject = calcAggrData(activitiesList, "stravavisualPlace", "distance");
        setAggrData(aggrobject);
    }, [activitiesList]);

    useEffect(() => {
        if (aggrData.length == 0) return
        let labels = Object.keys(aggrData);
        let data = Object.keys(aggrData).map(key => {
            return aggrData[key];
        })
        console.log('aggrData: ', aggrData);
        console.log('labels: ', labels, 'data: ', data);
        //labels = ["Один он", "two его"]
        let readyData = {
            labels: labels,
            datasets: [
              {
                label: "# of Votes",
                data: data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          };
        setChartData(readyData);
        setShowChart(true);
    }, [aggrData]);

    return(
        showChart ? 
            <div className="my-chart">
                <h1>Распределение километража по месту</h1> 
                <Pie data={chartData} />
            </div>
        : null
    )

}

export default function Activities({ activityList, setActivityList, accessToken }) { 
    console.log("rendering Activities");
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