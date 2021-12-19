let authUrl = "https://www.strava.com/oauth/token";
async function authWithRefreshToken() {
    let a = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            client_id: "***REMOVED***",
            client_secret: "***REMOVED***",
            refresh_token: "bc9e8ff97fbeed95288b64ddc1873e060650e34a",
            grant_type: "refresh_token"
})
}).then(res => res.json());
console.log(a);
}

console.log("hello!");
authWithRefreshToken();