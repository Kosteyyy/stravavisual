import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorContext } from "./Context.js";

const dateToYYYYMMDDString = date => date.toISOString().split('T')[0];

//Собирает данные формы и отдает их в виде объекта в handleFormSubmit
export default function ActivityFilter({ handleFormSubmit, filterParams }) {
    let today = dateToYYYYMMDDString(new Date());
    let monthAgo = dateToYYYYMMDDString(new Date( Date.now() - 30 * 24 * 60 * 60 *1000 ));
    let navigate = useNavigate();

    const [dateBefore, setBefore] = useState(today); //{activityBefore, activityAfter}
    const [dateAfter, setAfter] = useState(monthAgo); //Month ago
    const [type, setType] = useState('');
    const {appColors} = useContext(ColorContext);
    //console.log("ActivityFilter: filterParams=", filterParams);

    useEffect(() => {
        //console.log("im in useEffect");
        if (Object.keys(filterParams).length==0) return;
        //console.log("setting state to filterParams");
        if (filterParams.type == "undefined") {
            setType('');
        } else if (filterParams.type!==undefined && filterParams.type!==type) setType(filterParams.type);
        if (filterParams.before && filterParams.before!==dateBefore) setBefore(filterParams.before);
        if (filterParams.after && filterParams.after!==dateAfter) setAfter(filterParams.after);
    }, [filterParams]);

    function handleEndDate(e) {
        setBefore(e.target.value);
    }

    function handleStartDate(e) {
        setAfter(e.target.value);
    }

    function onChangeType(e) {
        setType(e.target.value);
        //console.log("value of select ", e.target.value);
        }

    function handleSubmit(e) {
        e.preventDefault();
        // let dateBefore = (Date.parse(before) / 1000).toString();
        // let dateAfter = (Date.parse(after) / 1000).toString();
        // let formData = {
        //     before: before,
        //     dateAfter: after,
        //     type: type
        // }
        let queryString = `/activities?type=${type}&before=${dateBefore}&after=${dateAfter}`;
        navigate(queryString);

        //handleFormSubmit();
        //console.log(`Получим данные между ${dateBefore} и ${dateAfter}`);
        //console.log('formData: ', formData);
    }
    //console.log(`ActivityFilter: Render after=${dateAfter} before=${dateBefore} type=${type}`);
    return(
        <div className='actFilter component-card'>
            <h1>Фильтр</h1>
            <form className='activity-form'>
                <fieldset>
                    <div className="dateInput">
                        <div className="dateInputBlock">
                            <label htmlFor="start" className="label">с</label>
                            <input type="date" id="start" name="activity-after"
                                value={dateAfter} onChange={handleStartDate}
                                min="2018-01-01"></input>                            
                        </div>
                        <div className="dateInputBlock">
                            <label htmlFor="end" className="label">до</label>
                            <input type="date" id="end" name="activity-before"
                                value={dateBefore} onChange={handleEndDate}
                            min="2018-01-01"></input>                             
                        </div>
                    </div>


                <div className="typeInput">
                    <label htmlFor="typeSelect" className="label">вид</label>                    
                    <select id="typeSelect" onChange={onChangeType} value={type}>
                        <option value="">(Все)</option>
                        <option value="Бег">Бег</option>
                        <option value="Лыжи">Лыжи</option>
                        <option value="Велосипед">Велосипед</option>
                        <option value="Плавание">Плавание</option>
                    </select>
                </div>
                </fieldset>

                <button  style={{backgroundColor: appColors.secondaryColor}} type="submit" onClick={handleSubmit}>Найти</button>

            </form>
        </div>
    )
}