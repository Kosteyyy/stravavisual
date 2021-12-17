const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const CLIENT_ID = "***REMOVED***";
const CLIENT_SECRET = "***REMOVED***";
//let authUrl = "https://www.strava.com/oauth/token";

const app = express();

app.use(express.static('public'));
app.get('/exchange_token', (req,res) => {
    //let code = req.query.code;
    //console.log('get, code=', code);
    //let data = authWithRefreshToken().then(auth => res.send(auth));
    let data = authWithCode(req.query.code).then(auth => res.send(auth));
    //let authUrl = "https://www.strava.com/oauth/token?client_id=***REMOVED***&client_secret=***REMOVED***&refresh_token=bc9e8ff97fbeed95288b64ddc1873e060650e34a&grant_type=refresh_token";
    // let authUrl = `https://www.strava.com/oauth/token?client_id=***REMOVED***&client_secret=***REMOVED***&code=${req.query.code}&grant_type=authorization_code`;
    // fetch(authUrl, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'},
    //     // query: JSON.stringify({
    //     //     client_id: "***REMOVED***",
    //     //     client_secret: "***REMOVED***",
    //     //     code: req.query.code,
    //     //     grant_type: "authorization_code"
    //     // })
    // }).then(auth => auth.json()).then(data => res.send(data));
    console.log('data 1', data);
    //res.send(data);
});

app.get("/index1",function (request, response) {
    response.redirect("/about")
  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

async function authWithRefreshToken() {
    let authUrl = "https://www.strava.com/oauth/token";
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
    return a;
}

async function authWithCode(code) {
    //let authCode = code.toString();
    //console.log('authWithCode, authCode:', authCode);
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
    console.log('authWithCode: ', a);
    return a;
}


app.listen(3000, function () {
    console.log('App started at port 3000');
});