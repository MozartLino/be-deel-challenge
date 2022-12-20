const express = require('express');
const bodyParser = require('body-parser');
const routeContract = require('./routes/contract');
const routeJob = require('./routes/job');

const app = express();
app.use(bodyParser.json());

app.use(routeContract);
app.use(routeJob);

module.exports = app;
