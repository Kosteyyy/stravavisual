const fetch = require('node-fetch');
var my_token = "94d6978a820a1ed10e3fe43d50ebac7c78eaf86a";
latlng = [55.84 , 37.37];

// var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
// var token = "94d6978a820a1ed10e3fe43d50ebac7c78eaf86a";
// var query = { lat: 55.84, lon: 37.34 };

// var options = {
//     method: "POST",
//     mode: "cors",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": "Token " + token
//     },
//     body: JSON.stringify(query)
// }



// fetch(url, options)
// .then(response => response.json())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));



async function fetchFromDadata(latlng, access_token) {

    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
    var token = "94d6978a820a1ed10e3fe43d50ebac7c78eaf86a";
    var query = { lat: latlng[0], lon: latlng[1] };

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify(query)
    }

    let data = await fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log("error", error));
    
    return data;

}

async function main() {
	const data = await fetchFromDadata(latlng);
    ({ city, street_with_type } = data.suggestions[0].data);
	// console.log(data);
    console.log(city + ', ' + street_with_type);
    console.log(data.suggestions[0]);
    
}
main()

// const fetch = require('node-fetch');

// async function getFromStrava() {
// 	// let data = await fetch('https://www.strava.com/api/v3/athlete/activities?after=1546293601&access_token=4144a3ea4a05caa903c5c52c50c26340b68aa5e0', 
// 	// {
// 	// 	method: 'GET',
		
// 	// })

// 	console.log("Задаю параметры URL");
// 	let url = new URL('https://www.strava.com/api/v3/athlete/activities');

// 	let params = {after: '1546293601'};
	
// 	url.search = new URLSearchParams(params).toString();
// 	console.log(url);

// 	let data = await fetch('https://www.strava.com/api/v3/athlete/activities?after=1546293601', 
// 	{
// 		method: 'GET',
// 		headers: {
// 			Accept: 'application/json',
// 			Authorization: 'Bearer 4144a3ea4a05caa903c5c52c50c26340b68aa5e0',
// 		}
// 	});

// 	//console.log(data.json());
// 	result = await data.json();
// 	//console.log(result.length);
// 	return result;
// }

// async function main() {
// 	const data = await getFromStrava();
// 	console.log(data);
// }
// main();