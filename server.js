'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


docker run -e "GIT_URL = https://github.com/andy6804tw/docker-node-demo" -p 3000:8080 -e"PORT=8080" -e "APP_HOME=." -e "APP_STARTUP=server.js"   lucasjellema/node-app-runner
docker run - e “GIT_URL = https://github.com/lucasjellema/nodejs-serversentevents-quickstart”  -p 8010:8888 -e”PORT=8888″ -e “APP_HOME=.”  -e “APP_STARTUP=app.js”   lucasjellema/node-app-runner

docker run - e “GIT_URL = https://github.com/lucasjellema/nodejs-serversentevents-quickstart”  -p 8010:8888 -e”PORT=8888″ -e “APP_HOME=.”  -e “APP_STARTUP=app.js”   lucasjellema/node-app-runner
