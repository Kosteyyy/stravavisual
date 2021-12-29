import React, { useEffect, useState } from 'react';
import { getAddress } from './functions.js';

export default function Reset({ resetTrainingPlaces }) {
    
    return <div>
            <button onClick={resetTrainingPlaces}>Очистить Базу Локаций</button>
            {/* <ChidlrenTest>This is children</ChidlrenTest> */}
        </div>
}

function ChidlrenTest(props) {
    const { children } = props;
    console.log(children);

    return (
        <div>
            {children}
        </div>
    )
}