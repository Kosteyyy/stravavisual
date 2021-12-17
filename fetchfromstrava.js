const fetch = require('node-fetch');

async function getFromStrava() {
	let data = await fetch('https://www.strava.com/api/v3/athlete/activities?after=1546293601&access_token=61271affb7ba87f08d2bd657c3918e62c12ebf27', 
	{
		method: 'GET',
	})
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