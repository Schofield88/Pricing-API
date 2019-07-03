const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/order', (req, res, next) => {
  res.send('Order received');
});

router.post('/order', (req, res, next) => {
  res.send('You have sent me some json');
});

module.exports = router;
