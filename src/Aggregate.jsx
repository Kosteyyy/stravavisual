import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export function AggregateDistanceToPlaces({activitiesList}) {
    const [aggrData, setAggrData] = useState([]);
    const [showChart, setShowChart] = useState(false);
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
        
        let aggrobject = calcAggrData(activitiesList, "stravavisualPlace", "distance");
        //Для агрегированного объекта надо поделить расстояние на 1000
        //aggrobject имеет вид {"место": 11723, "место 2": 24003}
        Object.keys(aggrobject).forEach(key => aggrobject[key] /= 1000);
        setAggrData(aggrobject);
    }, [activitiesList]);

    useEffect(() => {
        if (aggrData.length == 0) return
        let labels = Object.keys(aggrData);
        let data = Object.keys(aggrData).map(key => {
            return aggrData[key];
        })
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
        <div id="aggregate" className="component-card">
            <div className="my-chart">
                <h1>Распределение километража по месту</h1> 
                <Pie data={chartData} />
            </div>
        </div>
            
        : null
    )
}