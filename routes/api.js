const express = require('express');
const order = require('../controllers/orderController');

const api = express.Router();

// api/order POST request end point
api.post('/order', order.process);

module.exports = api;
