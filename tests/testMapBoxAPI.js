const fetch = require('node-fetch');
var my_token = "***REMOVED***";
latlng = [55.85 , 37.34];

async function fetchFromMapBox(latlng, access_token) {
    let url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng[1]},${latlng[0]}.json?access_token=${access_token}`;


    let data = await fetch(url)
        .then(response => response.json())
        .catch(error => console.log("error", error));
    
    return data;

}

async function main() {
	const data = await fetchFromMapBox(latlng, my_token);
	console.log(data.features[0].place_name);

    
}
main()

