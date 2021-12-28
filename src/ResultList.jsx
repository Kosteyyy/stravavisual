import React, { useState, useContext, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCaretRight, faSkiingNordic, faRunning, faBiking, faSwimmer, faEdit, faSave, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { secToHMS } from './functions.js';
import { ColorContext } from "./Context.js";



function ActivityIcon({activityType}) {
    switch (activityType) {
        case 'Бег': return <FontAwesomeIcon icon={faRunning} />;
        case 'Лыжи': return <FontAwesomeIcon icon={faSkiingNordic} />;
        case 'Плавание': return <FontAwesomeIcon icon={faSwimmer} />;
        case 'Велосипед': return <FontAwesomeIcon icon={faBiking} />;
        default: return ('');
    }
}

export default function ResultList({resultList = [], addTrainingPlace }) {
    const [showList, setShowList] = useState(false);
    const toggleShowList = () => {setShowList(!showList)};
    let totalCount, totalTime, totalDistance;
    const {appColors} = useContext(ColorContext);

    if (resultList.length > 0) {
        totalCount = resultList.reduce((total, curr) => total + curr.stravavisualCount, 0);
        totalTime = secToHMS(resultList.reduce((total, curr) => total + curr.moving_time, 0));
        totalDistance = resultList.reduce((total, curr) => total + curr.distance, 0);
    }
    return (
        <div id="resultList" className="component-card">
            <h1>Найдено: {resultList.length} {resultList.length!==0 && <span  style={{color: appColors.mainLight}} onClick={toggleShowList} className="toggleButton">{showList ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</span>}</h1>
            {resultList.length!==0 && <ul className="totalResults">
                {/* <li><FontAwesomeIcon icon={faCaretRight} /><span className="resultTitle">Всего тренировок: </span><span>{totalCount}</span></li> */}
                <li><FontAwesomeIcon icon={faCaretRight}  style={{color: appColors.mainLight}}/><span className="resultTitle">Общее время: </span><span>{totalTime}</span></li>
                <li><FontAwesomeIcon icon={faCaretRight}  style={{color: appColors.mainLight}}/><span className="resultTitle">Дистанция: </span><span>{(totalDistance / 1000).toFixed(2)} км</span></li>
            </ul>}


             { showList ? resultList.map((res, i) => <Activity activity={res} key={i} addTrainingPlace={addTrainingPlace}/>) : null }
        </div>
    )
}
function ToggleTextInput({ text, addTrainingPlace, activity }) {
    const [editMode, setEditMode] = useState(false);
    const {appColors} = useContext(ColorContext);
    const [inputText, setInputText] = useState(text);
    // const [showLocationSelect, setShowLocationSelect]
    const InputRef = useRef(null);

    function handleInputChange(e) {
        setInputText(e.target.value);
    }

    function handleSave() {
        let place = {name: inputText, latlng: activity.start_latlng};
        addTrainingPlace(place);
        setEditMode(false);
    }
    
    useEffect(() => {
        if (!editMode) return;
        InputRef.current.focus();
        setInputText(text);
    }, [editMode]);

    if (!editMode) return (
        <span className="toggleTextInput"><p>{text}</p><span><FontAwesomeIcon icon={faEdit} onClick={()=>{setEditMode(true)}} style={{color: appColors.mainColor}}/></span></span>
    )
    return(
        <div>
            <div className="toggleTextInput edit">
                <input type={text} placeholder={text} value={inputText} ref={InputRef} onChange={handleInputChange}/>
                <span>
                    <FontAwesomeIcon icon={faSave} onClick={handleSave} style={{color: appColors.mainColor}}/> 
                </span>
                <span>
                    <FontAwesomeIcon icon={faWindowClose} onClick={() => {setEditMode(false)}} style={{color: appColors.mainColor}}/> 
                </span>
                
            </div>
            <div className="coords">Координаты {activity.start_latlng[0]} , {activity.start_latlng[1]}</div>
        </div>
        
    )
}
function Activity({ activity, addTrainingPlace }) {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const toggleShowInfo = () => {setShowFullInfo(!showFullInfo)};
    const {appColors} = useContext(ColorContext);

    if (!showFullInfo) {
        return (
            <div className="activity"  style={{borderColor: appColors.mainColor}}>
                <span className="activityIcon" style={{color: appColors.mainColor}}><ActivityIcon activityType={activity.type} /></span>
                <div className="actInfo">
                {activity.start_date.split('T')[0]} - {activity.name} - {(activity.distance / 1000).toFixed(2)} км - <ToggleTextInput text={activity.stravavisualPlace} addTrainingPlace={addTrainingPlace} activity={activity}/>
                </div>
                
                <span onClick={toggleShowInfo} className="toggleButton"><FontAwesomeIcon icon={faAngleDown}  style={{color: appColors.mainLight}}/></span>
            </div>
        )
    } else {
            return (
            <div className="activity fullView">
                <span className="activityIcon" style={{color: appColors.mainColor}} ><ActivityIcon activityType={activity.type}/></span>
                <ul>
                    <li><div className="field">Дата:</div><div className="fieldData">{activity.start_date.split('T')[0]}</div></li>
                    <li><div className="field">Название:</div><div className="fieldData">{activity.name}</div></li>
                    <li><div className="field">Место:</div><div className="fieldData"><ToggleTextInput text={activity.stravavisualPlace} addTrainingPlace={addTrainingPlace} activity={activity}/></div></li>
                    {/* <li><div className="field">Координаты старта <br/> (Д, Ш):</div><div className="fieldData">{activity.start_latlng[0]} , {activity.start_latlng[1]}</div></li> */}
                    <li><div className="field">Время тренировки:</div><div className="fieldData">{secToHMS(activity.moving_time)}</div></li>
                    <li><div className="field">Дистанция:</div><div className="fieldData">{(activity.distance / 1000).toFixed(2)} км </div></li>
                </ul>
                <span onClick={toggleShowInfo} className="toggleButton"><FontAwesomeIcon icon={faAngleUp} /></span>
            </div>
        )
    }
   
}
