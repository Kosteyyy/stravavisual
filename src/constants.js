const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavisual.herokuapp.com/auth&approval_prompt=force&scope=activity:read";
//const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";

const PLACES = [
    {name: 'Митино Парк', latlng: [55.84, 37.37]},
    {name: 'Мещерский Парк', latlng: [55.66, 37.40]},
    {name: 'Стадион Зоркий', latlng: [55.84, 37.32]},
    {name: 'Одинцово', latlng: [55.69, 37.25]},
];

const COLORS = {
    "mainColor": "#2176ae",
    "mainLight": "#57b8ff",
    "secondaryColor": "#ffb13c",
    "secondaryColorLight": "#fcc873",
    "secondaryDark": "#b66d0d"
}

const CHART_COLORS = [
    ["#2f3061","#ffe66d","#6ca6c1","#f7fff7","#efa00b","#d65108","#a18276","#fbacbe","#fa9500"],
    ["#f75590","#fce4d8","#fbd87f","#b5f8fe","#10ffcb","#074f57","#077187","#74a57f","#7cc6fe"],
    ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
    ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'],
    ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'],
    ['#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4'],
    ['#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5','#c7eae5','#80cdc1','#35978f','#01665e']
];

// const COLORS = {
//     "mainColor": "red",
//     "mainLight": "pink",
//     "secondaryColor": "green",
//     "secondaryColorLight": "blue",
//     "secondaryDark": "lime"
// }

module.exports = { STRAVA_GET_CODE_LINK, PLACES, COLORS, CHART_COLORS };