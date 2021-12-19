import React from 'react';
import { STRAVA_GET_CODE_LINK } from './constants';

export default function Unauthorized() {
    //Компонент отображается на стартовой странице если клиент не авторизован в страва по пути /notauth

    return(
        <div className='unauth'>
            <div>Вы не авторизованы. При нажатии на кнопку вы перейдёте на сайт Strava для авторизации.</div>
            <button onClick={() => {
                document.location.href = STRAVA_GET_CODE_LINK;
                }
            }>Авторизоваться в Strava</button>
        </div>
    )
}