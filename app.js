const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { type } = require('os');
const port = 3000;

app.use(bodyParser.json());

// use as x-api-key header when making requests to api
const apiKey = '9e97415a-c1b8-40ff-bd3a-3f48d2ad16a4'
const baseUrl = 'https://api.thecatapi.com/v1'

// make request to TheCatAPI for the breeds data
let breeds;
const apiRequest = https.get(baseUrl + '/breeds', {headers: {'x-api-key': apiKey}}, (apiResponse) => {
  let chunks = [];
  apiResponse.on('data', (chunk) => {
    chunks.push(chunk);
  });

  apiResponse.on('end', () => {
    let body = Buffer.concat(chunks);
    breeds = JSON.parse(body.toString());
  });
});
apiRequest.end();

app.get('/', (req, res) => {
  console.log(breeds[0].name);
  res.json('meow');
});

app.listen(port, () => {
  console.log(`Cat app listening at http://localhost:${port}`);
});