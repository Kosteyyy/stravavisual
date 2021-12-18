const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const bodyParser = require('body-parser');

const CLIENT_ID = "***REMOVED***";
const CLIENT_SECRET = "***REMOVED***";
const PORT = process.env.PORT || 3000;  //port for deploy or localhost
//let authUrl = "https://www.strava.com/oauth/token";

const app = express();

//app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static('public'));

app.post('/api/gettokenfromcode', function(req, res) {
    let codeString = JSON.stringify(req.body, null, 2);
    let codeObject = JSON.parse(codeString);
    //console.log('Got code:', codeObject);
    let data = authWithCode(codeObject.code).then(auth => res.send(auth));
})

app.post('/api/refreshtoken', function(req, res) {
    let bodyString = JSON.stringify(req.body, null, 2);
    let bodyObject = JSON.parse(bodyString);
    //console.log('Got refresh_token:', bodyObject);
    let data = authWithRefreshToken(bodyObject.refresh_token)
        .then(auth => res.send(auth));
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

async function authWithRefreshToken(token) {
    let authUrl = "https://www.strava.com/oauth/token";
    let a = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            client_id: "***REMOVED***",
            client_secret: "***REMOVED***",
            refresh_token: token,
            grant_type: "refresh_token"
    })
    }).then(res => res.json());
    //console.log(a);
    return a;
}

async function authWithCode(code) {
    let authUrl = "https://www.strava.com/oauth/token";
    let a = await fetch(authUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            client_id: "***REMOVED***",
            client_secret: "***REMOVED***",
            code: code,
            grant_type: "authorization_code"
    })
    }).then(res => res.json());
    //console.log('authWithCode: ', a);
    return a;
}


app.listen(PORT, function () {
    console.log(`App started at port ${PORT}`);
});