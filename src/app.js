const express = require('express');
const bodyParser = require('body-parser');
const routeContract = require('./routes/contract');

const app = express();
app.use(bodyParser.json());

app.use(routeContract);

module.exports = app;
