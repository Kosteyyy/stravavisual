const fetch = require('node-fetch');

async function getFromStrava() {
	// let data = await fetch('https://www.strava.com/api/v3/athlete/activities?after=1546293601&access_token=4144a3ea4a05caa903c5c52c50c26340b68aa5e0', 
	// {
	// 	method: 'GET',
		
	// })

	console.log("Задаю параметры URL");
	let url = new URL('https://www.strava.com/api/v3/athlete/activities');

	let params = {after: '1546293601'};
	
	url.search = new URLSearchParams(params).toString();
	console.log(url);

	let data = await fetch('https://www.strava.com/api/v3/athlete/activities?after=1546293601', 
	{
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: 'Bearer 4144a3ea4a05caa903c5c52c50c26340b68aa5e0',
		}
	});

	//console.log(data.json());
	result = await data.json();
	//console.log(result.length);
	return result;
}

async function main() {
	const data = await getFromStrava();
	console.log(data);
}
main();