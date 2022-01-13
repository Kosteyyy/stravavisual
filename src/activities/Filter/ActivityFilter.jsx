import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DateRangePicker from './DateRangePicker.jsx';
import TypePicker from './TypePicker.jsx';
import SelectChartData from './SelectChartData.jsx';

//Собирает данные формы и отдает их в виде объекта в handleFormSubmit
export default function ActivityFilter({ filterParams, targetField, dispatch }) {
    const [type, setType] = useState('');
    const [before, setBefore] = useState('');
    const [after, setAfter] = useState('');
    const navigate = useNavigate();

    //console.log("ActivityFilter: filterParams=", filterParams);
    function setDates(after, before) {
        setAfter(after);
        setBefore(before);
    }
    //Если параметры адресной строки поменялись извне, например, браузером назад или вручную, отображаем текущие данные
    useEffect(() => {
        if (filterParams.after) setAfter(filterParams.after);
        if (filterParams.before) setBefore(filterParams.before);
        if (filterParams.type) setType(filterParams.type);
    }, [filterParams]);

    useEffect(() => {
        console.log("Activity filter. Parameters changed ", after, before, type);
        let queryString = `/activities?type=${type}&before=${before}&after=${after}`;
        if (before || after) navigate(queryString);
    }, [after, before, type]);

    function onChangeType(e) {
        setType(e.target.value);
        }

    return(
        <div className='actFilter component-card'>
            <DateRangePicker currentAfter={filterParams.after} currentBefore={filterParams.before} setDates={setDates}/>
            <TypePicker type={type} onChangeType={onChangeType} />
            <SelectChartData targetField={targetField} dispatch={dispatch}/>
        </div>
    )
}