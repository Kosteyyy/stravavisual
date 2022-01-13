import React, { useState, useContext } from 'react';
import { ColorContext } from '../../Context';

export default function ChartKeySelector({ dispatch, disabled = false }) {
    const [isChecked, setIsChecked] = useState(true);
    const {appColors} = useContext(ColorContext);

    function handleChange(e) {
        if (disabled) return;
        let value = e.target.checked ? "stravavisualPlace" : "type";
        dispatch({type: "SET_KEY_FIELD", payload: value});
        setIsChecked(value => !value);
    }

    return (
        <div className='chartKeySelector'>
            <span>Вид</span>
            <input 
                className={disabled ? "disabled" : null} 
                style={{background: disabled ? "#c6c6c6" : appColors.mainColor}} 
                type="checkbox" 
                onChange={handleChange} 
                name="" checked={isChecked} 
            />
            <span>Место</span>
        </div>
    )
}