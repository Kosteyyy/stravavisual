import { useState, useEffect, useContext } from "react";
import { ColorContext } from '../../Context';
import React from 'react';

const dateToYYYYMMDDString = date => date.toISOString().split('T')[0];

export default function DateRangePicker ({ currentAfter, currentBefore, setDates }) {
    const [dateAfter, setAfter] = useState(dateToYYYYMMDDString(new Date( Date.now() - 30 * 24 * 60 * 60 *1000 ))); //Month ago
    const [dateBefore, setBefore] = useState(dateToYYYYMMDDString(new Date())); //Today

    const {appColors} = useContext(ColorContext);

    useEffect(() => {
        if (currentAfter) setAfter(currentAfter);
        if (currentBefore) setBefore(currentBefore);
    }, [currentAfter, currentBefore]);

    function handleEndDate(e) {
        setBefore(e.target.value);
    }

    function handleStartDate(e) {
        setAfter(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setDates(dateAfter, dateBefore);
    }

    return ( 
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
                    </fieldset>
        <button  style={{backgroundColor: appColors.secondaryColor}} type="submit" onClick={handleSubmit}>Найти</button>
        </form>
    )
}