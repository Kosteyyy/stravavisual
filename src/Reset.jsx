import React, { useEffect, useState } from 'react';
import { getAddress } from './functions.js';
import { useNavigate } from 'react-router-dom';

export default function Reset({ resetTrainingPlaces }) {
    let navigate = useNavigate();

    function handleClick() {
        resetTrainingPlaces();
        navigate('/');
    }
    
    return <div>
            <button onClick={handleClick}>Очистить Базу Локаций</button>
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