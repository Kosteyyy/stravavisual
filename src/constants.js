const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=74668&response_type=code&redirect_uri=https://stravavisual.herokuapp.com/auth&approval_prompt=force&scope=activity:read";
//const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=74668&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";

// const PLACES = [
//     {name: 'парк Митино', latlng: [55.84, 37.37]},
//     {name: 'Мещерский парк', latlng: [55.66, 37.40]},
//     {name: 'Стадион Зоркий', latlng: [55.84, 37.32]},
//     {name: 'Одинцово', latlng: [55.69, 37.25]},
// ];

const PLACES = [

];

const COLORS = {
    "mainColor": "#2176ae",
    "mainLight": "#57b8ff",
    "secondaryColor": "#ffb13c",
    "secondaryColorLight": "#fcc873",
    "secondaryDark": "#b66d0d"
}
const CHART_MAX_COUNT = 12;
const CHART_COLORS = [
    { colors: ['#2176ae',"#fbb13c","#57b8ff","#eee5e9","#493b2a","#d64933","#593f62","#684e32","#fe6847","#f75590","#fce4d8","#fbd87f"], borders: ["#2176ae","#a06403","#57b8ff","#b690a1","#493b2a","#d64933","#593f62","#684e32","#fe6847", "#f75590","#fce4d8","#fbd87f"] },
    { colors: ["#2f3061","#ffe66d","#6ca6c1","#f7fff7","#efa00b","#d65108","#a18276","#fbacbe","#fa9500"], borders: ["#2f3061","#ccaa00","#6ca6c1","#6ca6c1","#efa00b","#d65108","#a18276","#fbacbe","#fa9500"] },
    { colors: ["#f75590","#fce4d8","#fbd87f","#b5f8fe","#10ffcb","#074f57","#077187","#74a57f","#7cc6fe"], borders: ["#f75590","#fce4d8","#fbd87f","#b5f8fe","#10ffcb","#074f57","#077187","#74a57f","#7cc6fe"]},
    { colors: ['#6db8bb','#3c5b5c','#cae2e3','#c4cecf','#ba9607','#f4d75e','#91a0a1','#c1f6f7','#039ba1', '#f7dc9c','#e69f12','#8c784a'], borders: ['#6db8bb','#3c5b5c','#cae2e3','#c4cecf','#ba9607','#f4d75e','#91a0a1','#c1f6f7','#039ba1', '#f7dc9c','#e69f12','#8c784a'] },
    { colors: ['#6774c9','#f7d216','#f98365','#74d3ae','#a1dffb','#e8a628','#a7b1f2','#c7ac26','#64d9d7', '#6cb5e6','#c33124','#7c7b89'], borders: ['#6774c9','#f7d216','#f98365','#74d3ae','#a1dffb','#e8a628','#a7b1f2','#c7ac26','#64d9d7', '#6cb5e6','#c33124','#7c7b89'] },
    { colors: ['#645c9f','#eed102','#bc90ba','#563256','#a3b93e','#bfb24d','#737d28','#ccc7f2','#87a887', '#9e7dd4','#b37937','#247358'], borders: ['#645c9f','#eed102','#bc90ba','#563256','#a3b93e','#bfb24d','#737d28','#ccc7f2','#87a887', '#9e7dd4','#b37937','#247358'] },
];

// const COLORS = {
//     "mainColor": "red",
//     "mainLight": "pink",
//     "secondaryColor": "green",
//     "secondaryColorLight": "blue",
//     "secondaryDark": "lime"
// }

module.exports = { STRAVA_GET_CODE_LINK, PLACES, COLORS, CHART_COLORS, CHART_MAX_COUNT };