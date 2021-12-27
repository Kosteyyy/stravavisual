const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavisual.herokuapp.com/auth&approval_prompt=force&scope=activity:read";
//const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";

const PLACES = [
    {name: 'парк Митино', latlng: [55.84, 37.37]},
    {name: 'Мещерский парк', latlng: [55.66, 37.40]},
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
    { colors: ["#2176ae","#fbb13c","#57b8ff","#eee5e9","#493b2a","#d64933","#593f62","#684e32","#fe6847"], borders: ["#2176ae","#a06403","#57b8ff","#b690a1","#493b2a","#d64933","#593f62","#684e32","#fe6847"] },
    { colors: ["#2f3061","#ffe66d","#6ca6c1","#f7fff7","#efa00b","#d65108","#a18276","#fbacbe","#fa9500"], borders: ["#2f3061","#ccaa00","#6ca6c1","#6ca6c1","#efa00b","#d65108","#a18276","#fbacbe","#fa9500"] },
    { colors: ["#f75590","#fce4d8","#fbd87f","#b5f8fe","#10ffcb","#074f57","#077187","#74a57f","#7cc6fe"], borders: ["#f75590","#fce4d8","#fbd87f","#b5f8fe","#10ffcb","#074f57","#077187","#74a57f","#7cc6fe"] },
    { colors: ['#fff7ec','#fdd49e','#fdbb84','#fc8d59','#ef6548','#fee8c8','#d7301f','#b30000','#7f0000'], borders: ["#fdbb84","#fdbb84","#fdbb84",'#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'] },
    { colors: ['#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4'], borders: ['#d73027','#f46d43','#f46d43','#fdae61','#fdae61','#74add1','#74add1','#74add1','#4575b4'] },
    { colors: ['#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5','#c7eae5','#80cdc1','#35978f','#01665e'], borders: ['#8c510a','#bf812d','#bf812d','#dfc27d','#dfc27d','#35978f','#35978f','#35978f','#01665e'] },
];

// const COLORS = {
//     "mainColor": "red",
//     "mainLight": "pink",
//     "secondaryColor": "green",
//     "secondaryColorLight": "blue",
//     "secondaryDark": "lime"
// }

module.exports = { STRAVA_GET_CODE_LINK, PLACES, COLORS, CHART_COLORS };