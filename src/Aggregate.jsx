import React, { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { secToHMS } from './functions.js';
import { ColorContext } from "./Context.js";
ChartJS.register(ArcElement, Tooltip, Legend);



function ShowRes({ data, targetField }) {
    // принимает данные в формате {"место": 11723, "место 2": 24003}
    // и выводит иx в рендер виде ключ: значение.
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
                console.log("nothing, ", targetField);
                return data;
        }
    }

    if (Object.keys(data).length == 0) {
        return
    } else {
        return (
            <div className="dataList">
                <ul>
                    {Object.keys(data).map(
                        (key, i) => {
                            return <li key={i}><div className="field">{key}:</div><div className="fieldData">{formatFieldData(data[key], targetField)}</div></li>
                        }
                    )}
                </ul>
            {/* <span onClick={toggleShowInfo} className="toggleButton"><FontAwesomeIcon icon={faAngleUp} /></span> */}
        </div>
        )
    }
}

function SelectChartData({ setKeyField, setTargetField }) {
    const [keyValue, setKeyValue] = useState('stravavisualPlace');
    const [targetValue, setTargetValue] = useState('distance');
    const [showForm, setShowForm] = useState(false);
    const {appColors} = useContext(ColorContext);

    function toggleShowForm() {
        setShowForm(!showForm);
    }

    function handleKeyChange(e) {
        setKeyValue(e.target.value);
    }
    function handleTargetChange(e) {
        setTargetValue(e.target.value);
    }

    function handleClick(e) {
        setKeyField(keyValue);
        setTargetField(targetValue);
    }

    // if (!showForm) return (
    //     <div><span onClick={toggleShowForm}>...</span></div>
    // )
    return (
        <>
            {showForm && <div id="selectChartData">

                <div className="typeInput">
                        {/* <label htmlFor="typeSelect" className="label">Поле 1:</label>                     */}
                        <select id="keySelect" onChange={handleKeyChange} value={keyValue}>
                            <option value="stravavisualPlace">Место</option>
                            <option value="type">Вид активности</option>
                        </select>
                    </div>
                    <div className="typeInput">
                        {/* <label htmlFor="typeSelect" className="label">Поле 2</label>                     */}
                        <select id="targetSelect" onChange={handleTargetChange} value={targetValue}>
                            <option value="distance">Дистанция</option>
                            <option value="stravavisualCount">Количество</option>
                            <option value="moving_time">Время</option>
                        </select>
                    </div>
                    <button style={{backgroundColor: appColors.secondaryColor}} onClick={handleClick}>
                        Применить
                    </button>
                    <span className="toggle" onClick={toggleShowForm}>...</span>
            </div>}
            {!showForm && <div id="selectChartData"><span className="toggle" onClick={toggleShowForm}>...</span></div>}
        </>
        
    
    )

}

export function AggregateDistanceToPlaces({activitiesList, chartColors}) {
    const [aggrData, setAggrData] = useState({}); //{"место": 11723, "место 2": 24003}
    const [showChart, setShowChart] = useState(false); // пока данные не готовы мы не показываем график
    const [chartData, setChartData] = useState({}); //объект данных для диаграммы
    const [keyField, setKeyField] = useState('stravavisualPlace');
    const [targetField, setTargetField] = useState('distance');

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
        
        let aggrobject = calcAggrData(activitiesList, keyField, targetField);
        //Для агрегированного объекта надо поделить расстояние на 1000
        //aggrobject имеет вид {"место": 11723, "место 2": 24003}
        Object.keys(aggrobject).forEach(key => {
            if (targetField == 'distance') {
                aggrobject[key] = Math.floor(aggrobject[key]/10)/100;
            }
        });
        setAggrData(aggrobject);
    }, [activitiesList, keyField, targetField]);

    useEffect(() => {
        if (Object.keys(aggrData).length == 0) return
        let labels = Object.keys(aggrData);
        let data = Object.keys(aggrData).map(key => aggrData[key]);
        let readyData = {
            labels: labels,
            datasets: [
              {
                label: "# of Votes",
                data: data,
                backgroundColor: chartColors.colors,                
                borderColor: chartColors.borders,
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
            {/* <h1>Анализ</h1> */}
            <SelectChartData setKeyField={setKeyField} setTargetField={setTargetField}/>
            <div className="chart-container">
                <div className="my-chart">
                    <Pie data={chartData} />
                </div>
            </div>
            <ShowRes data={aggrData} targetField={targetField} />
        </div>
            
        : null
    )
}