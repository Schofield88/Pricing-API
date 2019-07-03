const express = require('express');

const api = express.Router();

// test GET request
api.get('/order', (req, res, next) => {
  res.send('Order received');
});

// test POST request
api.post('/order', (req, res, next) => {
  res.send('You have sent me some json');
});

module.exports = api;
