import React, { useState, useEffect, useContext } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
import { secToHMS, getAddress } from './functions.js';
import { ColorContext } from "./Context.js";
import ToggleTextInput from './ToggleTextInput.jsx';
// ChartJS.register(ArcElement, Tooltip, Legend);
import Chart from "./Chart.jsx";
import { CHART_MAX_COUNT } from "./constants.js"

function ColorLabel({ labelColor, borderColor }) {
    return <span className="chartLabel" style={{backgroundColor: labelColor, borderColor: borderColor}}></span>
}

function ShowRes({ data, keyField, targetField, renameTrainingPlace, chartColors }) {
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [filter, setFilter] = useState({filterKey: "", filterValue: ""});

    // console.log("showRes. Data: ", data);
    // console.log("ShowRes. data: ", data);
 
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
                // console.log("nothing, ", targetField);
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
        setKeyField(e.target.value);
    }
    function handleTargetChange(e) {
        setTargetValue(e.target.value);
        setTargetField(e.target.value);
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
                    {/* <button style={{backgroundColor: appColors.secondaryColor}} onClick={handleClick}>
                        Применить
                    </button> */}
                    <span className="toggle" onClick={toggleShowForm}>...</span>
            </div>}
            {!showForm && <div id="selectChartData"><span className="toggle" onClick={toggleShowForm}>...</span></div>}
        </>
        
    
    )

}

export function Aggregate({activitiesList, chartColors, renameTrainingPlace}) {
    const [aggrData, setAggrData] = useState([]); //{"место": 11723, "место 2": 24003} переделываем в Массив [{name: "Место1", count: Number }]
    const [showChart, setShowChart] = useState(false); // пока данные не готовы мы не показываем график
    const [chartData, setChartData] = useState([]); //массив данных для диаграммы
    const [keyField, setKeyField] = useState('stravavisualPlace');
    const [targetField, setTargetField] = useState('distance');
    const [dataList, setDataList] = useState([]);


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

    useEffect(() => {
    //Вычисляем сводку при изменении исходного массива либо полей аггрегации
        if (activitiesList.length == 0) { 
            setShowChart(false);
            return;
        }
        let aggrArray = calcAggrData(activitiesList, keyField, targetField);
        // console.log("UseEffect 1, agrArray=", aggrArray);
        //aggrobject имеет вид {"место": 11723, "место 2": 24003}
        setAggrData(aggrArray);
    }, [activitiesList, keyField, targetField]);

    useEffect(() => {
        //Готовим данные для диаграммы
        // if (aggrData.length == 0) return;
        let chartDataArray = [...aggrData];
        let showResData = [...aggrData];
        if (chartDataArray.length == 0) return;
        if (chartDataArray.length > CHART_MAX_COUNT) chartDataArray = shorten(chartDataArray, CHART_MAX_COUNT);
        setChartData(chartDataArray);
        if (showResData.length > CHART_MAX_COUNT) {
            showResData.splice(CHART_MAX_COUNT-1, 0, chartDataArray[CHART_MAX_COUNT-1]);
        }
        setDataList(showResData);
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
                    <Chart results={chartData} chartColors={chartColors}  />
                </div>
            </div>
            <ShowRes data={dataList}
                keyField={keyField}
                targetField={targetField} 
                chartColors={chartColors}
                renameTrainingPlace={renameTrainingPlace}/>
        </div>
            
        : null
    )
}