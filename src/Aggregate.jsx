import React, { useState, useEffect, useContext } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
import { secToHMS, getAddress } from './functions.js';
import { ColorContext } from "./Context.js";
import ToggleTextInput from './ToggleTextInput.jsx';
// ChartJS.register(ArcElement, Tooltip, Legend);
import Chart from "./Chart.jsx";

function ShowRes({ data, targetField, keyField, actFilter, filterAdd, filterRemove, trainingPlaces, renameTrainingPlace }) {
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [filter, setFilter] = useState({filterKey: "", filterValue: ""});
 
    // принимает данные в формате {"место": 11723, "место 2": 24003}
    // и выводит иx в рендер виде ключ: значение.
    // useEffect(() => {
    //     if (Object.keys(actFilter).length == 0 && isFilterApplied) removeFilter();
    // }, [actFilter]);

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

    // function getLatlng(placesArray, name) {
    //     let place = placesArray.filter(el => el.name == name)[0];
    //     // console.log("I'm getLatlng. name = ", name, " place = ", place);
    //     return place.latlng;
    // }
    function handleClick(fieldText) {
        return;
        // if (!isFilterApplied || fieldText !== filter.filterValue) {
        //     let filterObject = {};
        //     filterObject[keyField] = fieldText;
        //     filterAdd(filterObject);
        //     setFilter({filterKey: keyField, filterValue: fieldText});
        //     setIsFilterApplied(true);
        // } else {
        //     removeFilter();
        // }
    }

    // function removeFilter() {
    //     if (!isFilterApplied) return;
    //     filterRemove(filter.filterKey);
    //     setIsFilterApplied(false);
    //     setFilter({filterKey: "", filterValue: ""});
    // }

    // useEffect(() => {
    //     if (!isFilterApplied) return;
    //     if (keyField !== filter.filterKey) removeFilter();
    // }, [keyField]);

    if (Object.keys(data).length == 0) {
        return
    } else {
        return (
            <div className="dataList">
                <ul>
                    {Object.keys(data).map(
                        (key, i) => {
                            return <li key={i}>
                                <div className={filter.filterValue==key ? "field filter" : "field"} onClick={() => handleClick(key)}>
                                    <ToggleTextInput text={key} handleSubmit={renameTrainingPlace} /><p>:</p>
                                </div>
                                <div className="fieldData">
                                    {formatFieldData(data[key], targetField)}
                                </div>
                            </li>
                        }
                    )}
                </ul>
            {/* <span onClick={toggleShowInfo} className="toggleButton"><FontAwesomeIcon icon={faAngleUp} /></span> */}
            {isFilterApplied && <button onClick={removeFilter}>Сбросить</button>}
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

export function Aggregate({activitiesList, chartColors, filter, filterAdd, filterRemove, trainingPlaces, renameTrainingPlace}) {
    const [aggrData, setAggrData] = useState({}); //{"место": 11723, "место 2": 24003}
    const [showChart, setShowChart] = useState(false); // пока данные не готовы мы не показываем график
    const [chartData, setChartData] = useState([]); //объект данных для диаграммы
    const [keyField, setKeyField] = useState('stravavisualPlace');
    const [targetField, setTargetField] = useState('distance');


    function calcAggrData(data, keyField, targetField ) {
        //Аггрегирует в массиве объектов data данные по полю объектов keyField, суммируя поля targetField
        //возвращает объект {"key1": 1234, "key2": 23532, ...}
        let result = {};
        data.forEach(el => {
            if (result[el[keyField]] == undefined) result[el[keyField]] = 0;
            result[el[keyField]] += Number(el[targetField]);
        })
        //Если аггрегируется дистанция, приводим результат к виду 112.12 
        Object.keys(result).forEach(key => {
            if (targetField == 'distance') {
                result[key] = Math.floor(result[key]/10)/100;
            }
        });
        result = deleteZero(result);
        return result;
    }
    function deleteZero(data) {
        //Удаляет из объекта значение ключ-значение, значение которого ноль.
        let newData = {...data};
        Object.keys(newData).forEach(key => {
          if (newData[key] == 0) delete newData[key];
        })
        return newData;
      }

    function shorten(dataObject, length) {
        //укорачивает объект до length неизмененных значений и одного суммарного из остатков
        //делаем из объекта массив пар [key, value]
        let arr = Object.keys(dataObject).map(key => [key, dataObject[key]]);
        arr.sort((a, b) => b[1] - a[1]); 
        let newArr = arr.splice(0, length-1);
        newArr.push(["Прочее", arr.reduce((total, curr) => total + curr[1], 0)]);
        let resultObject = {};
        newArr.forEach(el => {
            let key = el[0];  
            resultObject[key] = el[1];
            });
        return resultObject;
        }

    useEffect(() => {
    //Вычисляем сводку при изменении исходного массива либо полей аггрегации
        if (activitiesList.length == 0) { 
            setShowChart(false);
            return;
        }
        let aggrobject = calcAggrData(activitiesList, keyField, targetField);
        //aggrobject имеет вид {"место": 11723, "место 2": 24003}
        setAggrData(aggrobject);
    }, [activitiesList, keyField, targetField]);

    useEffect(() => {
        //Готовим данные для диаграммы
        let chartDataObject = {...aggrData};
        if (Object.keys(chartDataObject).length == 0) return;
        if (Object.keys(chartDataObject).length > 8) chartDataObject = shorten(chartDataObject, 8);
        let chartDataArray = Object.keys(chartDataObject).map(key => {return {"name": key, "count": chartDataObject[key]}
        });
        // let labels = Object.keys(chartData);
        // let data = Object.keys(chartData).map(key => chartData[key]);
        // let readyData = {
        //     labels: labels,
        //     datasets: [
        //       {
        //         label: "# of Votes",
        //         data: data,
        //         backgroundColor: chartColors.colors,                
        //         borderColor: chartColors.borders,
        //         borderWidth: 1
        //       }
        //     ]
        //   };
        setChartData(chartDataArray);
        setShowChart(true);
    }, [aggrData]);


    return(
        showChart ? 
        <div id="aggregate" className="component-card">
            {/* <h1>Анализ</h1> */}
            <SelectChartData setKeyField={setKeyField} setTargetField={setTargetField}/>
            <div className="chart-container">
                <div className="my-chart">
                    {/* <Pie data={chartData} /> */}
                    <Chart results={chartData} fillColors={chartColors.colors} borderColors={chartColors.borders}  />
                </div>
            </div>
            <ShowRes data={aggrData}
                targetField={targetField} 
                keyField={keyField} 
                actFilter={filter} 
                filterAdd={filterAdd} 
                filterRemove={filterRemove} 
                trainingPlaces={trainingPlaces}
                renameTrainingPlace={renameTrainingPlace}/>
        </div>
            
        : null
    )
}