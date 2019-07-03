const express = require('express');

const api = express.Router();
const processOrder = require('../src/processOrder');

// test GET request
api.get('/order', (req, res, next) => {
  res.send('Order received');
});

// test POST request
api.post('/order', (req, res, next) => {
  res.json(processOrder(req));
});

module.exports = api;
