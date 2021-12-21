import React, { useState, useEffect } from 'react';

const dateToYYYYMMDDString = date => date.toISOString().split('T')[0];

//Собирает данные формы и отдает их в виде объекта в handleFormSubmit
export default function ActivityFilter({handleFormSubmit}) {
    let today = dateToYYYYMMDDString(new Date());
    let monthAgo = dateToYYYYMMDDString(new Date( Date.now() - 30 * 24 * 60 * 60 *1000 ));

    const [before, setBefore] = useState(today); //{activityBefore, activityAfter}
    const [after, setAfter] = useState(monthAgo); //Month ago
    const [type, setType] = useState('');
    function handleEndDate(e) {
        setBefore(e.target.value);
    }

    function handleStartDate(e) {
        setAfter(e.target.value);
    }

    function onChangeType(e) {
        setType(e.target.value);
        }

    function handleSubmit(e) {
        e.preventDefault();
        // let dateBefore = (Date.parse(before) / 1000).toString();
        // let dateAfter = (Date.parse(after) / 1000).toString();
        let formData = {
            before: before,
            after: after,
            type: type
        }
        handleFormSubmit(formData);
        //console.log(`Получим данные между ${dateBefore} и ${dateAfter}`);
        //console.log('formData: ', formData);
    }

    return(
        <div className='actFilter component-card'>
            <form className='activity-form'>
                <fieldset>
                    <div className="dateInput">

                        <label htmlFor="start" className="label">С</label>
                        <input type="date" id="start" name="activity-after"
                            value={after} onChange={handleStartDate}
                            min="2018-01-01"></input>
                            
                        <label htmlFor="end" className="label">до</label>
                        <input type="date" id="end" name="activity-before"
                            value={before} onChange={handleEndDate}
                        min="2018-01-01"></input>                        
                    </div>


                <div className="typeInput">
                    <label htmlFor="typeSelect" className="label">Вид активности:</label>                    
                    <select id="typeSelect" onChange={onChangeType}>
                        <option value="">(Все)</option>
                        <option value="Run">Бег</option>
                        <option value="NordicSki">Лыжи</option>
                        <option value="Ride">Велосипед</option>
                        <option value="Swim">Плавание</option>
                    </select>
                </div>
                </fieldset>

                <button type="submit" onClick={handleSubmit}>Найти</button>

            </form>
        </div>
    )
}