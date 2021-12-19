import React, { useState, useEffect } from 'react';

const dateToYYYYMMDDString = date => date.toISOString().split('T')[0];

//Собирает данные формы и отдает их в виде объекта в handleFormSubmit
export default function ActivityFilter({handleFormSubmit}) {
    let today = dateToYYYYMMDDString(new Date());
    let monthAgo = dateToYYYYMMDDString(new Date( Date.now() - 30 * 24 * 60 * 60 *1000 ));

    const [before, setBefore] = useState(today); //{activityBefore, activityAfter}
    const [after, setAfter] = useState(monthAgo); //Month ago

    function handleEndDate(e) {
        setBefore(e.target.value);
    }

    function handleStartDate(e) {
        setAfter(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // let dateBefore = (Date.parse(before) / 1000).toString();
        // let dateAfter = (Date.parse(after) / 1000).toString();
        let formData = {
            before: before,
            after: after
        }
        handleFormSubmit(formData);
        //console.log(`Получим данные между ${dateBefore} и ${dateAfter}`);
        //console.log('formData: ', formData);
    }

    return(
        <form className='activity-form'>
            <fieldset>
                <legend>Дата начала</legend>
                <input type="date" id="start" name="activity-after"
                    value={after} onChange={handleStartDate}
                    min="2018-01-01"></input>
                <legend>Дата конца</legend>
                <input type="date" id="end" name="activity-before"
                    value={before} onChange={handleEndDate}
                    min="2018-01-01"></input>
            </fieldset>
            <button type="submit" onClick={handleSubmit}>Найти</button>

        </form>
    )
}