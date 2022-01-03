import { STRAVA_GET_CODE_LINK } from "./constants";


export const loadJSON = key => key && JSON.parse(localStorage.getItem(key));

export function secToHMS(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 60 / 60);
    let minutes = Math.floor(timeInSeconds / 60) - (hours * 60);
    let seconds = timeInSeconds % 60;
    return hours + 'ч' + minutes + 'мин'; // + seconds + 'с'
}

export const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Если точка ближе радиуса от места возвращает true
export function isNear(latlng, place, radius=0.02) {
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

//Запрашивает через наш сервер адрес по latlng вида [55.74, 77.32]
export async function getAddress(latlng) {
  let data = {latlng: latlng};
  // try {
      const response = await fetch('/api/getaddress', {
          method: 'post',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data),
      });
      const fetcheddata = await response.text();
  return fetcheddata;
}
export async function getAddressFromMapBox(latlng) {
  let data = {latlng: latlng};
  // try {
      const response = await fetch('/api/getaddressfrommapbox', {
          method: 'post',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data),
      });
      const fetcheddata = await response.text();
  return fetcheddata;
}

export function authAtStrava() {
    document.location.href = STRAVA_GET_CODE_LINK;
}

export function hexToHSL(hex) {
    // [360, 100, 100]
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let r = parseInt(result[1], 16);
      let g = parseInt(result[2], 16);
      let b = parseInt(result[3], 16);
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      if(max == min){
        h = s = 0; // achromatic
      }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
    var HSL = new Object();
    HSL['h']=h * 360;
    HSL['s']=s * 100;
    HSL['l']=l * 100;
    return HSL;
  }

  export function hslToHex(h, s, l) {
      // получает 360, 100, 100
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

export function shuffle(arrayData) {
    let array = [...arrayData];
    if (array.length == 1) {
        return [array[0]];
        } else {
            let index = Math.floor( Math.random() * (array.length + 1) )
            let el = array.splice(index, 1);
            return ([...el, ...shuffle(array)]);
        }
}