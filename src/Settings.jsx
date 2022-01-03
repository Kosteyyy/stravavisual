import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, CHART_COLORS } from './constants.js';
import { hslToHex, hexToHSL, loadJSON, saveJSON } from './functions.js'


function ColorInput({ color, colorHandler, id, name, text, disabled }) {
    return (
        <div className='inputColorBlock'>
            <label htmlFor={id}>{text}:</label>
            <input disabled={disabled} type="color" id={id} name={name} value={color} onChange={colorHandler}/> 
        </div>
    )
}

function ColorSettings({ colors, setColors }) {
    const [connectColors, setConnectColors] = useState(false);

    function changeMainColor(e) {
        if (!connectColors) {
            setColors({...colors, mainColor: e.target.value});
        } else {
            let color1 = e.target.value;
            let color1hsl = hexToHSL(color1);
            let color2hsl = {...color1hsl};
            color2hsl.l = Math.min(color2hsl.l*1.4, 100);
            color2hsl.s = 100;
            let color2 = hslToHex(...Object.values(color2hsl));
            let color3hsl = {...color1hsl};
            color3hsl.h = color3hsl.h > 180 ? color3hsl.h - 180 : color3hsl.h + 180; 
            color3hsl.l = Math.min(color2hsl.l*1.2, 100);
            let color3 = hslToHex(...Object.values(color3hsl));
            setColors({mainColor: color1, mainLight: color2, secondaryColor: color3 })
        }
            

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
            <div id="colorSettings">
                <h1>Цвет интерфейса</h1>
                <ColorInput color={colors.mainColor} colorHandler={changeMainColor} id="mainColor" name="mainColor" text="Основной цвет" />
                <ColorInput disabled={connectColors} color={colors.mainLight} colorHandler={changeMainLight} id="mainLight" name="mainLight" text="Цвет 2" /> 
                <ColorInput disabled={connectColors} color={colors.secondaryColor} colorHandler={changeSecondaryColor} id="secondaryColor" name="secondaryColor" text="Цвет кнопок" /> 
                <div className="checkBoxInput">
                    <input 
                        type="checkbox"
                        id="connectColors"
                        name="connectColors"
                        checked={connectColors}
                        onChange={() => {setConnectColors(!connectColors)}}
                    />
                    <label htmlFor="connectColors">Связанные цвета</label>
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
    )

}

function ChartColorPicker({ color, index, checkedIndex, handleInput }) {

    return (
        <div className='chartColorPicker'>
            <div className='colorPalette'>
                {color.map((item, i) => {
                    return <div key={i} className='colorSample' style={{backgroundColor: item}}></div>
                    }   
                )}
            </div>
            <div className='colorInput'>
                <input type="radio" id={"scheme" + index.toString()} name="chartPalette" value={index}
                        checked = {index == checkedIndex ? true : false} onChange={handleInput}/>
                {/* <label htmlFor={"scheme" + index.toString()}>label</label> */}
            </div>
        </div>
    )
}

function ChartColorSettings({ setColors }) {
    let [checkedIndex, setCheckedIndex] = useState(loadJSON("StravavisualChartPaletteIndex") || 0);
    let navigate = useNavigate();
    function handleInput(e) {
        setCheckedIndex(e.target.value);
        setColors(CHART_COLORS[e.target.value]);
        saveJSON("StravavisualChartPaletteIndex", e.target.value);
    }
    return (
        <div id="chartColorSettings">
                <h1>Цвета диаграммы</h1>
                {CHART_COLORS.map(
                    (color, i) => <ChartColorPicker color={color.colors} key={i} index={i} checkedIndex={checkedIndex} handleInput={handleInput}/>
                )}
                <button onClick={() => {navigate('/')}}>Сохранить</button>
        </div>
    )

}
export default function Settings({ colors, setColors, setChartColors }) {
    
 return (
        <div id="settings" className='component-card'>
            <ChartColorSettings setColors={setChartColors}/>
            <ColorSettings colors={colors} setColors={setColors} />
        </div>
    )
   
}