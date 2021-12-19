import { STRAVA_GET_CODE_LINK } from "./constants";


export const loadJSON = key => key && JSON.parse(localStorage.getItem(key));


export const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Если точка ближе радиуса от места возвращает true
export function isNear(latlng, place, radius=0.04) {
    let dist = Math.sqrt(Math.pow(latlng[0]-place.latlng[0], 2) + Math.pow(latlng[1]-place.latlng[1], 2));
    return (dist < radius);
}

//Принимает время истечения токена в секундах по Epoch
export function isTokenExpired(tokenExpiresAt) {
    if ((new Date(tokenExpiresAt * 1000) - Date.now()) < 0 ) {
        return true;
    }
    else return false;
}

//Запрашивает через наш сервер новый объект с токенами используя refresh_token
export async function refreshToken(token) {
    let data = {refresh_token: token};
    // try {
        const response = await fetch('/api/refreshtoken', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        const fetcheddata = await response.json();
        // if (!response.ok) {
        //     const message = 'Error with Status Code: ' + response.status;
        //     throw new Error(message);
        // }


    // } catch (error) {
    //     console.log('Error: ' + error);
    // }
    
    //console.log('refreshToken: response: ', result);
    return fetcheddata;
}

export function authAtStrava() {
    document.location.href = STRAVA_GET_CODE_LINK;
}
