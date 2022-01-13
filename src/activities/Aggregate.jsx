import React, { useState, useEffect, useContext } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
import { secToHMS, getAddress } from '../functions.js';
import ToggleTextInput from './ToggleTextInput.jsx';
// ChartJS.register(ArcElement, Tooltip, Legend);
import Chart from "./Chart.jsx";
import { CHART_MAX_COUNT } from "../constants.js"

function ColorLabel({ labelColor, borderColor }) {
    return <span className="chartLabel" style={{backgroundColor: labelColor, borderColor: borderColor}}></span>
}

function ShowRes({ data, keyField, targetField, renameTrainingPlace, chartColors }) {

    function formatFieldData(data, targetField) {
        switch(targetField) {
            case 'distance':
                //console.log("distance");
                return (data.toFixed(2) + ' км');
            case 'moving_time':
                return secToHMS(data);
            case 'stravavusualCount':
                return data;
            default:
                // console.log("nothing, ", targetField);
                return data;
        }
    }

  
    if (data.length == 0) {
        return
    } else {
        return (
            <div className="dataList">
                <ul>
                    {data.map(
                        (item, i) => {
                            return <li key={i}>
                                <div className="label">
                                    {i < CHART_MAX_COUNT ? <ColorLabel key={i} labelColor={chartColors.colors[i]} borderColor={chartColors.borders[i]} /> : null }
                                </div>
                                <div className="field">
                                    {keyField == "stravavisualPlace" ? <ToggleTextInput text={item.name} handleSubmit={renameTrainingPlace} /> : item.name }
                                </div>
                                <div className="fieldData">
                                    {formatFieldData(item.count, targetField)}
                                </div>
                            </li>
                        }
                    )}
                </ul>
            {/* <span onClick={toggleShowInfo} className="toggleButton"><FontAwesomeIcon icon={faAngleUp} /></span> */}

        </div>
        )
    }
}

export function Aggregate({activitiesList, chartColors, renameTrainingPlace, keyField, targetField}) {

    function calcAggrData(data, keyField, targetField ) {
        //Аггрегирует в массиве объектов data данные по полю объектов keyField, суммируя поля targetField
        //возвращает объект {"key1": 1234, "key2": 23532, ...} Массив [{name: "Место1", count: Number }]
        let result = [];
        data.forEach(el => {
            let resultIndex = result.findIndex(item => item.name == el[keyField]);
            if (resultIndex == -1) {
                result.push({name: el[keyField], count: el[targetField]});
            } else {
                result[resultIndex].count += Number(el[targetField]);
            }
        });

        //Если аггрегируется дистанция, приводим результат к виду 112.12 
        result.forEach(item => {
            if (targetField == 'distance') {
                item.count = Math.floor(item.count/10)/100;
            }
        });
        result.sort((a, b) => b.count-a.count);
        // console.log("calcAggrData, result: ", result);
        return result.filter(el => el.count !== 0);
    }

    function shorten(dataArray, length) {
        //укорачивает массив до length неизмененных значений и одного суммарного из остатков
        //делаем из объекта массив пар [key, value]
        let arr = [...dataArray];
        let newArr = arr.splice(0, length-1);
        newArr.push({name: "Прочее", count: arr.reduce((total, curr) => total + curr.count, 0)});
        return newArr;
    }

    let aggrArray = calcAggrData(activitiesList, keyField, targetField);
    let chartDataArray = [...aggrArray];
    let showResData = [...aggrArray];
    // if (chartDataArray.length == 0) return;
    if (chartDataArray.length > CHART_MAX_COUNT) chartDataArray = shorten(chartDataArray, CHART_MAX_COUNT); //Укорачиваем массив, добавляя в конец Итог прочего
    // setChartData(chartDataArray);
    if (showResData.length > CHART_MAX_COUNT) {
        showResData.splice(CHART_MAX_COUNT-1, 0, chartDataArray[CHART_MAX_COUNT-1]);//Вставляем в массив Прочее перед списком Прочего
    }

    return(
        <div id="aggregate" className="component-card">
            {/* <h1>Анализ</h1> */}
            <div className="chart-container">
                <div className="my-chart">
                    {/* <Pie data={chartData} /> */}
                    <Chart results={chartDataArray} chartColors={chartColors}  />
                </div>
            </div>
            <ShowRes data={showResData}
                keyField={keyField}
                targetField={targetField} 
                chartColors={chartColors}
                renameTrainingPlace={renameTrainingPlace}/>
        </div>
    )
}