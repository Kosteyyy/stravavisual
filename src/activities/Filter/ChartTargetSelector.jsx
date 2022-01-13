import React, { useRef, useEffect } from 'react';

export default function ChartTargetSelector({ targetField, dispatch }) {

    function handleChange(e) {
        dispatch({type: "SET_TARGET_FIELD", payload: e.target.value});
        console.log(e.target.value)};
    return (
        <div className='chartTargetSelector'>
            <fieldset onChange={handleChange}>
            {/* <legend>Please select your preferred contact method:</legend> */}
                <input
                    type="radio"
                    id="choice1"
                    name="distance"
                    value="distance"
                    checked={targetField == "distance"}
                />
                <label htmlFor="choice1">Дистанция</label>

                <input 
                    type="radio"
                    id="choice2"
                    name="time"
                    value="moving_time"
                    checked={targetField == "moving_time"}
                />
                <label htmlFor="choice2">Время</label>

                <input 
                    type="radio" 
                    id="choice3" 
                    name="count" 
                    value="stravavisualCount" 
                    checked={targetField == "stravavisualCount"}
                />
                <label htmlFor="choice3">Количество</label>
            </fieldset>
        </div>
    )
}