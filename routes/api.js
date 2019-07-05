const express = require('express');

const api = express.Router();
const Processor = require('../src/processor');

const processor = new Processor();

// test POST request
api.post('/order', (req, res, next) => {
  res.json(processor.process(req.body));
});

module.exports = api;
