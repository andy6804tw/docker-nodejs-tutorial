'use strict';
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT + ` (${process.env.NODE_ENV})`);
