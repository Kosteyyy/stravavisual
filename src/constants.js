//const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=https://stravavisual.herokuapp.com/auth&approval_prompt=force&scope=activity:read";
const STRAVA_GET_CODE_LINK = "https://www.strava.com/oauth/authorize?client_id=***REMOVED***&response_type=code&redirect_uri=http://localhost:3000/auth&approval_prompt=force&scope=activity:read";

const PLACES = [
    {name: 'Митино Парк', latlng: [55.84, 37.37]},
    {name: 'Мещерский Парк', latlng: [55.66, 37.40]},
    {name: 'Стадион Зоркий', latlng: [55.84, 37.32]},
    {name: 'Одинцово', latlng: [55.69, 37.25]},
];

module.exports = { STRAVA_GET_CODE_LINK, PLACES };