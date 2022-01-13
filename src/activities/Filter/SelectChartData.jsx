import React from 'react';
import ChartKeySelector from './ChartKeySelector.jsx';
import ChartTargetSelector from './ChartTargetSelector.jsx';

export default function SelectChartData({ targetField, dispatch }) {
    return (
            <div id="selectChartData">
                <ChartKeySelector dispatch={dispatch} />
                <ChartTargetSelector targetField={targetField} dispatch={dispatch}/>
            </div>
    )
}