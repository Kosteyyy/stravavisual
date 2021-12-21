import React from "react";

export default function ResultList({resultList} = []) {
    return (
        <div className="component-card">
            <div>Найдено: {resultList.length} </div>
            {(resultList.length !==0) ? resultList.map((res, i) => 
                <div className="result-list" key={i}>
                    {res.start_date.split('T')[0]} - {res.name} - {res.stravavisualPlace} - {res.start_latlng[0]}, {res.start_latlng[1]}
                </div>
            ) : null}
        </div>
    )
}