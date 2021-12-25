import React from 'react';
import { COLORS } from './constants.js';

export default function Settings({ colors, setColors }) {
    console.log("mainColor: ", colors.mainColor);
    function changeMainColor(e) {
        setColors({...colors, mainColor: e.target.value});
    }
    function changeMainLight(e) {
        setColors({...colors, mainLight: e.target.value});
    }
    function changeSecondaryColor(e) {
        setColors({...colors, secondaryColor: e.target.value});
    }

    function setDefaultColors() {
        setColors(COLORS);
    }

    return (
        <div id="settings" className='component-card'>
            <div id="colorSettings">
                <h1>Настройки цвета</h1>
                <div className='inputColorBlock'>
                    <label htmlFor="favcolor">Основной цвет:</label>
                    <input type="color" id="mainColor" name="mainColor" value={colors.mainColor} onChange={changeMainColor}/> 
                </div>
                <div className='inputColorBlock'>
                    <label htmlFor="favcolor">Основной светлый:</label>
                    <input type="color" id="mainLight" name="mainLight" value={colors.mainLight} onChange={changeMainLight}/> 
                </div>
                <div className='inputColorBlock'>
                    <label htmlFor="favcolor">Цвет кнопок:</label>
                    <input type="color" id="secondaryColor" name="secondaryColor" value={colors.secondaryColor} onChange={changeSecondaryColor}/> 
                </div>
                {/* <div className='inputColorBlock'>
                    <label htmlFor="favcolor">Основной цвет:</label>
                    <input type="color" id="mainColor" name="MainColor" value={colors.mainColor} onChange={changeMainColor}/> 
                </div>
                <div className='inputColorBlock'>
                    <label htmlFor="favcolor">Основной цвет:</label>
                    <input type="color" id="mainColor" name="MainColor" value={colors.mainColor} onChange={changeMainColor}/> 
                </div> */}
                <button style={{backgroundColor: colors.secondaryColor}} onClick={setDefaultColors}>Сбросить</button>
            </div>

        </div>
    )
}