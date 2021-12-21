import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCaretRight} from '@fortawesome/free-solid-svg-icons'

function secToHMS(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 60 / 60);
    let minutes = Math.floor(timeInSeconds / 60) - (hours * 60);
    let seconds = timeInSeconds % 60;
    return hours + ' ч ' + minutes + ' мин';

}

export default function ResultList({resultList} = []) {
    const [showList, setShowList] = useState(false);
    const toggleShowList = () => {setShowList(!showList)};
    let totalCount, totalTime, totalDistance;
    if (resultList.length > 0) {
        totalCount = resultList.reduce((total, curr) => total + curr.stravavisualCount, 0);
        totalTime = secToHMS(resultList.reduce((total, curr) => total + curr.moving_time, 0));
        totalDistance = resultList.reduce((total, curr) => total + curr.distance, 0);
    }
    return (
        <div id="resultList" className="component-card">
            <h1>Найдено: {resultList.length} {resultList.length!==0 && <span onClick={toggleShowList} className="toggleButton">{showList ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</span>}</h1>
            {resultList.length!==0 && <ul className="totalResults">
                <li><FontAwesomeIcon icon={faCaretRight} /><span className="resultTitle">Всего тренировок: </span><span>{totalCount}</span></li>
                <li><FontAwesomeIcon icon={faCaretRight} /><span className="resultTitle">Общее время: </span><span>{totalTime}</span></li>
                <li><FontAwesomeIcon icon={faCaretRight} /><span className="resultTitle">Расстояние: </span><span>{(totalDistance / 1000).toFixed(2)} км</span></li>
            </ul>}


             { showList ? resultList.map((res, i) => <Activity activity={res} key={i} />) : null }
        </div>
    )
}

function Activity({ activity }) {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const toggleShowInfo = () => {setShowFullInfo(!showFullInfo)};
    return (
        <div className="activity">
            {activity.start_date.split('T')[0]} - {activity.name} - {activity.stravavisualPlace} - {activity.start_latlng[0]}, {activity.start_latlng[1]}
            <span onClick={toggleShowInfo} className="toggleButton">{showFullInfo ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}</span>
        </div>

    )
}