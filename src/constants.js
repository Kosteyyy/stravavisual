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
    ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'],
    ['#ffffe5','#fff7bc','#fee391','#fec44f','#fe9929','#ec7014','#cc4c02','#993404','#662506'],
    ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'],
    ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'],
    ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'],
];

// const COLORS = {
//     "mainColor": "red",
//     "mainLight": "pink",
//     "secondaryColor": "green",
//     "secondaryColorLight": "blue",
//     "secondaryDark": "lime"
// }

module.exports = { STRAVA_GET_CODE_LINK, PLACES, COLORS, CHART_COLORS };